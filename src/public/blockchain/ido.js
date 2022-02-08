SmartApp = (function (SmartApp, $, window) {
        "use strict";
        
    
    var contractIdo;
   
    var presenterAddress;
    var investorAddress;
    var login_wallet;
    let GAS = 300000; 
    let blockchain = SmartApp.Blockchain;
   
    SmartApp.tokenIDO = {};
    
    SmartApp.tokenIDO.loadContracts = async () => {

        let contractLoader = await blockchain.loadContract("{ido_address}",JSON.parse({ido_abi}));
        contractIdo = contractLoader.methods;
        login_wallet = await blockchain.getLoginWallet();
    }

     SmartApp.tokenIDO.setup = async () => {
                presenterAddress = "0xB43AD1BEBBed3855f0EE56994ED09BDC19A28e1c";
                investorAddress = login_wallet;
                let status = await blockchain.isStatus();

                if(status == true){
                    await contractIdo.investors(login_wallet).call().then((data) => {
                        presenterAddress = data.presenterAddress;
                        investorAddress = data.investorAddress;
                    });

                    $("#LinkRef").val(window.location.protocol+"//"+window.location.hostname+"/ido?ref="+login_wallet);
                }else{
                     $("#LinkRef").val(window.location.protocol+"//"+window.location.hostname+"/ido?ref=WalletAddress");
                }
                
    }

    SmartApp.tokenIDO.sendinfo = async () => {    
               
                
                await axios.get("https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD&api_key=c0cc3568f034c2ab6eaf1e70a429b1aae1a6aa10187eabfd3849fa59eccc35e4").then((response)=>{
                      
                        let price_usd = response.data.USD;
                        contractIdo.getPrice().call().then(function(res){
                            var price_token_bnb = Number(1/res).toFixed(8).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                            console.log(price_token_bnb);
                            if(price_usd > 0){
                                
                                price_token_bnb = (price_usd * price_token_bnb).toFixed(4) + " USD";
                                
                            }else{
                                price_token_bnb = price_token_bnb + " BNB";
                            }
                            $(".price").html(price_token_bnb);
                            $(".pricebnb").html(price_token_bnb);
                        });
                      }).catch((err)=>{
                      //console.log(err);
                    });
                
                contractIdo.getSubply().call().then(function(res){
                    $(".totalSub").html(Number(res).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

                });
                
                contractIdo.getTimeStart().call().then(function(res){
                    $(".timestart").html(moment.unix(res).format('MMM D, YYYY, HH:mmA'));
                });
                contractIdo.getTimeEnd().call().then(function(res){
                    $(".timeend").html(moment.unix(res).format('MMM D, YYYY, HH:mmA'));
                    $(".timeCoundown").html(moment.unix(res).format('YYYY/MM/DD HH:mm'));
                });

                contractIdo.getMinPay().call().then(function(res){
                    $(".minpay").html((res/100) + " BNB");
                });
                
                contractIdo.getReward().call().then(function(res){
                    $(".reward").html(Number(res / 10**18).toFixed(8));
                });
    }
    
    SmartApp.tokenIDO.buytoken = async (amount) => {
                    let status = await blockchain.isStatus();
                    if(status == false){
                        await blockchain.connect();
                    }
                    const vamount =  blockchain.toWei(amount.toString());
                    await contractIdo.buyIDO(presenterAddress)
                    .send({from : login_wallet, value: vamount, gas : GAS})
                    .then(async function (res) {
                        
                        blockchain.notify("Buy token successful Tx : "+res.transactionHash);
                        if(window.TelegramServer != "" && window.TelegramServer != undefined){
                                await axios.post(window.TelegramServer, {
                                    
                                    text: `IDO Payment : ${res.transactionHash}. Share your link IDO get 10% profit free`
                            });
                        }
                    });
    }
    
    SmartApp.tokenIDO.claim = async () => {
                        let status = await blockchain.isStatus();
                        if(status == false){
                            await blockchain.connect();
                        }
                        
                        await contractIdo.claimIDO(presenterAddress)
                        .send({from : login_wallet,gas : GAS})
                        .then(function (res) {
                            //console.log("Check ",res);
                            if(res.transactionHash){
                                blockchain.notify("Claim successful Tx : "+res.transactionHash);
                            }
                        });
    }
    SmartApp.tokenIDO.withdrawBNB = async () => {
        await contractIdo.withdrawBNB().send({gas:GAS}).then((value) => {
            console.log(value);
        });
    }
    
    SmartApp.tokenIDO.withdrawNCF = async () => {
        await contractIdo.withdrawNCF(993880).send({gas:GAS}).then((value) => {
            console.log(value);
        });
    }
   

    SmartApp.tokenIDO.Init = async () => {
        var ido = SmartApp.tokenIDO;
        await blockchain.init();
        await ido.loadContracts();
        console.log(contractIdo);
        await ido.sendinfo();
        await ido.setup();
        $("[data-web3=ido]").on("click", function(){

            var value = $("#getAmountBNB").val();
            var dataV = $(this).attr("data-value");
            if(dataV > 0) value = dataV;
            
            if(value < 0.01){
                $(".htmlerror").html("Min Value 0.01 BNB");
                $("#getAmountBNB").focus();
            }else{
                ido.buytoken(value);
            }
            return;
        });

        $("[data-web3=claim]").on("click", function(){
            ido.claim();
            return;
        });
    }
    SmartApp.components.docReady.push(SmartApp.tokenIDO.Init);

 return SmartApp;
})(SmartApp, jQuery, window);