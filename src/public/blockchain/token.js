SmartApp = (function (SmartApp, $, window) {
    "use strict";
    let GAS = 21000; 
    let blockchain = SmartApp.Blockchain;
    let login_wallet;
    let TokenAddress = "{token_address}";
    let Abi = JSON.parse({token_abi});
    let Token;
    SmartApp.Token = {};
    
    SmartApp.Token.loadContracts = async () => {

            Token = await blockchain.loadContract(TokenAddress,Abi);
            login_wallet = await blockchain.getLoginWallet();
    }
    
    SmartApp.Token.init = async () => {
        await blockchain.init();
        await SmartApp.Token.loadContracts();
    }
    SmartApp.components.docReady.push(SmartApp.Token.init);
    return SmartApp;
})(SmartApp, jQuery, window);