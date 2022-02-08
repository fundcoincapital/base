SmartApp = (function (SmartApp, $, window) {
    "use strict";
    
    let _des = "ether"; //Des = 18
	//let _des = "gwei"; //Des = 9
	var loginWallet = null;
	var isConnect;
	
	
	const Web3Modal = window.Web3Modal.default;
	const WalletConnectProvider = window.WalletConnectProvider.default;
	const Fortmatic = window.Fortmatic;
	const evmChains = window.evmChains;
	
	//var provider = "https://bsc-dataseed.binance.org";
	var provider;
	var web3os;
	var web3Modal;

    var BlockchainCom =  {};

    SmartApp.Blockchain = {};
    
    SmartApp.Blockchain.loadContract = async function(address, abi) {
			var web3Connect = await SmartApp.Blockchain.getWeb3();
		    let contract = await new web3Connect.eth.Contract(abi, address, {from:loginWallet})

		    return contract;
    };

    SmartApp.Blockchain.getWeb3 = async () => {
    	return web3os;
    };
    SmartApp.Blockchain.keccak256 = (data) => {
    	return web3os.utils.keccak256(data);
    };

    

    SmartApp.Blockchain.Socket = (url) => {
    	var socket = io.connect(url, {transports : ['polling'],reconnect: true});
    	//var socket = io.connect('http://127.0.0.1:7000', {transports : ['polling'],reconnect: true});
    	return socket;
    }

    SmartApp.Blockchain.toWei = (amount) => {
    	var numBer = web3os.utils.toWei(amount.toString(),_des);
    	return numBer;
    }
    SmartApp.Blockchain.fromWei = (amount) => {
    	var numBer = web3os.utils.fromWei(amount.toString(),_des);
    	return numBer;
    }
    
    SmartApp.Blockchain.getGasPrice = async() => {
    	var numBer = await web3os.eth.getGasPrice();
    	return numBer;
    }
    SmartApp.Blockchain.estimateGas = async(obj) => {
    	var numBer = await web3os.eth.estimateGas(obj);
    	return numBer;
    }
    SmartApp.Blockchain.login_wallet = async () => {
    		//await SmartApp.Blockchain.connect();
			//let networkId = await web3os.eth.net.getId();

			const accounts = await web3os.eth.getAccounts();
			//console.log(accounts.length);
			//let loginWallet = null;
			if(accounts.length == 0 && loginWallet == null){
				//this.web3.eth.enable();
				//await ethereum.enable();
				
				isConnect = false;
				return;
			}else{
				loginWallet = web3os.utils.toChecksumAddress(accounts[0]);

				isConnect = true;
				$("#btn-connect").parent().html('<a class="btn btn-md btn-round btn-outline btn-auto btn-primary btn-with-icon walletLimit" id="btn-disconnect"><span id="walletAddress">'+loginWallet+'</span> <em class="icon  ti ti-lock"></em></a>');
				document.querySelector("#btn-disconnect").addEventListener("click", async function(){
					await SmartApp.Blockchain.disconnect();

				});
			}
			
			if(loginWallet == null) {
				console.log("NULL Login");
				return false;
			}
			
			return loginWallet;
		};
	SmartApp.Blockchain.disconnect = async () => {
			
			console.log("Killing the wallet connection", provider);

			  // TODO: Which providers have close method?
			  //if(provider.close) {
			    //await provider.close();

			    // If the cached provider is not cleared,
			    // WalletConnect will default to the existing session
			    // and does not allow to re-scan the QR code with a new wallet.
			    // Depending on your use case you may want or want not his behavir.
			    await web3Modal.clearCachedProvider();
			    $("#btn-disconnect").parent().html('<a class="btn btn-md btn-round btn-outline btn-auto btn-primary btn-with-icon walletLimit" id="btn-connect"><span id="walletAddress">Connect</span> <em class="icon  ti ti-lock"></em></a>');
			    provider = null;
			    window.location.reload();
			  //}
		};
	SmartApp.Blockchain.isStatus = async () => {
			return isConnect;
		};
	SmartApp.Blockchain.connect = async () => {
			//if(await SmartApp.Blockchain.isStatus() == true) return;
			var reload = false;
			if(!web3Modal.cachedProvider){
			    reload = true;
			}
			try {
			    provider = await web3Modal.connect();
			    web3os = new Web3(provider);
			    isConnect = true;
			    
			    if(reload == true){
			    	window.location.reload();
			    }
			  } catch(e) {
			    console.log("Could not get a wallet connection", e);
			    SmartApp.Blockchain.notify("Could not get a wallet connection");
			    return;
			  }
			await SmartApp.Blockchain.login_wallet();
		};
	SmartApp.Blockchain.notify = function(msg){
	        $('.toast').find(".toast-body").html(msg);
	        $('.toast').addClass("toast-error");
	        $('.toast').toast('show');
	    };
	SmartApp.Blockchain.notifyWait = function(msg){
			$("body #notifyWait").remove();
	        $("body").append('<div id="notifyWait"><div class="preloader"><span class="spinner spinner-round"></span></div></div>');
	    };
	SmartApp.Blockchain.getLoginWallet = async () => {
			return loginWallet;
		};
	
	
	SmartApp.Blockchain.addToken = async (TokenAddress, tokenSymbol, tokenDecimals, tokenImage) => {
			
		    await web3os.givenProvider.sendAsync({
		        method: 'metamask_watchAsset',
		        params: {
		          type: 'ERC20', // Initially only supports ERC20, but eventually more!
		          options: {
		            address: TokenAddress, // The address that the token is at.
		            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
		            decimals: tokenDecimals, // The number of decimals in the token
		            image: tokenImage, // A string url of the token logo
		          },
		        },
		    });
		};
	
    SmartApp.Blockchain.init = async () => {
    	//BlockchainCom = SmartApp.Blockchain;
    	//SmartApp.Blockchain.login_wallet();
    	

		  // Tell Web3modal what providers we have available.
		  // Built-in web browser provider (only one can exist as a time)
		  // like MetaMask, Brave or Opera is added automatically by Web3modal
		 const providerOptions = {
		    walletconnect: {
		      package: WalletConnectProvider,
		      options: {
		        // Mikko's test key - don't copy as your mileage may vary
		        infuraId: "669981d1b5994165bcaedcc5cd1f6da4",
		      }
		    },

		    fortmatic: {
		      package: Fortmatic,
		      options: {
		        // Mikko's TESTNET api key
		        key: "pk_test_391E26A3B43A3350"
		      }
		    }
		  };

		web3Modal = new Web3Modal({
		    cacheProvider: true, // optional
		    providerOptions, // required
		    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
		    theme: {
			    background: "rgb(39, 49, 56)",
			    main: "rgb(199, 199, 199)",
			    secondary: "rgb(136, 136, 136)",
			    border: "rgba(195, 195, 195, 0.14)",
			    hover: "rgb(16, 26, 32)"
			  }
		  });
		//web3os = new Web3(web3Modal);

		document.querySelector("#btn-connect").addEventListener("click", async function(){
			await SmartApp.Blockchain.connect();
		});
		
  		//document.querySelector("#btn-disconnect").addEventListener("click", SmartApp.Blockchain.disconnect());

		/*
    	if(loginWallet == null) {
			loginWallet = await SmartApp.Blockchain.login_wallet();
			//console.log("Load Contract : ",loginWallet);
		}
		*/

		
		if(web3Modal.cachedProvider){
			await SmartApp.Blockchain.connect();
			
			provider.on("accountsChanged", (accounts) => {
			  console.log("Chain Account",accounts);
			  window.location.reload();
			});

			// Subscribe to chainId change
			provider.on("chainChanged", (chainId) => {
			  console.log("Chain ID",chainId);
			  if(chainId != 56){
			  		SmartApp.Blockchain.notify("Plz select BSC Network mainnet");
			  }
			  //window.location.reload();
			});

			// Subscribe to provider connection
			provider.on("connect", (info) => {
			  console.log("Connect ",info);
			});

			// Subscribe to provider disconnection
			provider.on("disconnect", (error) => {
			  console.log("Disconnect ",error);
			  SmartApp.Blockchain.disconnect();
			  window.location.reload();
			});
			provider.on("receipt", (error) => {
				console.log("receipt", error);
			});
			
			
		}else{
			window.ethereum.on('accountsChanged', () => window.location.reload());
      		window.ethereum.on('chainChanged', () => window.location.reload());
		}
		

    }
    SmartApp.components.winLoad.push(SmartApp.Blockchain.init);
 	return SmartApp;
})(SmartApp, jQuery, window);
