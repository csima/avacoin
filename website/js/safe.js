let account, interval
let token_address = "0x535a4955237783AD0fE37464e1693588EdEE3B43";
let access_address = "0xb88BA53981aA1995D9b2486Fd46FDB435B241f62";
let access_abi = JSON.parse('[{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"avaTokenAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"avaToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"payme","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"letmeIn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_avatoken","type":"address"},{"name":"_wallet","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"error","type":"bool"},{"indexed":false,"name":"message","type":"string"}],"name":"Log","type":"event"}]');
let token_abi = JSON.parse('[{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]')
var token_instance = web3.eth.contract(token_abi).at(token_address);  
var access_instance = web3.eth.contract(access_abi).at(access_address);
//var log_event = access_instance.Log({}, {fromBlock: 0, toBlock: 'latest'});  
//log_event.watch(function(err, result){console.log(result);}); 
var event = access_instance.Log().watch(function(error, result) {
  if (!error)
      console.log(result);
});

window.addEventListener('load', setup)

web3.eth.getTransactionReceiptMined = function getTransactionReceiptMined(txHash, interval) {
  const self = this;
  var count = 0;
  const transactionReceiptAsync = function(resolve, reject) {
      self.getTransactionReceipt(txHash, (error, receipt) => {
          if (error) {
              reject(error);
          } else if (receipt == null) {
              count++;
              console.log("Waiting on confirmation of tx:" + txHash)
              console.log("count: " + count)
              $('#tx_status').text("Waiting on confirmation of tx:" + txHash)
              $('#processing').text("." + new Array(count % 10).join('.'))

              setTimeout(
                  () => transactionReceiptAsync(resolve, reject),
                  interval ? interval : 500);
          } else {
              resolve(receipt);
          }
      });
  };

  if (Array.isArray(txHash)) {
      return Promise.all(txHash.map(
          oneTxHash => self.getTransactionReceiptMined(oneTxHash, interval)));
  } else if (typeof txHash === "string") {
      return new Promise(transactionReceiptAsync);
  } else {
      throw new Error("Invalid Type: " + txHash);
  }
};

function setupGraphics() {
  // Background image
  $.backstretch('images/safe.jpg');

  // Fade in
  $('.fade-in').css({ position: 'relative', opacity: 0, top: -14 });
  setTimeout(function(){
    $('#preload-content').fadeOut(400, function(){
      $('#preload').fadeOut(800);
      setTimeout(function(){
        $('.fade-in').each(function(index) {
          $(this).delay(400*index).animate({ top : 0, opacity: 1 }, 800);
        });
      }, 800);
    });
  }, 400);
}

function setup() {
  setupGraphics();
 
  if (typeof window.web3 === 'undefined') {
    $('#mc_embed_signup').html('')
    $('#subtitle').html('<a href="https://metamask.io/"><img src="images/download_metamask.png"></a>')
    $('#conversion').html('<a href="https://metamask.io">Download MetaMask</a> or ' + '<a href="https://github.com/ethereum/mist/releases">Mist</a> to view this page. Otherwise send ETH to ' + crowd_address + " to recieve your AVA Coin. Ratio is 100 AVA to 1 ETH")    
    
  } else {

    console.log("token address: " + token_instance.address);

    pollForAccountChange()    
  }
}

function pollForAccountChange() {
  console.log('beginning account change polling...')
  if (!interval) {
    interval = setInterval(getBalance, 1000)
  }
} 

function renderAvaBalance(account) {
  token_instance.balanceOf(account, (err, balance) => {
    if (err) return console.log("AVA balance: " + err.message)
    const ether = web3.fromWei(balance, 'ether')
    $('#balance').text(` AVA Balance: ${ether.toFixed(0).toString()}`)
  })
}

$('#approvetoken').submit(function() {   
  sendAvaCoin();
});

$('#sendtoken').click(function() {   
  access_instance.letmeIn((err, res) => {
    if (err) {
      console.log("Error: " + err.message);
      return;
    }
    console.log("txid letmeIn: " + res);

  });
});

function sendAvaCoin() {
  token_instance.approve(access_address, web3.toWei(.01,"ether"), (err, res) => {
    $('body').toggleClass('modal--opened');
    $.backstretch('resize');

    if (err) {
      console.log("ERROR:" + err.message)
      $('#tx_status').text("Error! " + err.message)    
      return        
    }

    return web3.eth.getTransactionReceiptMined(res).then(function (receipt) {
      console.log(receipt);
      $('#tx_status').text("Transaction Confirmed!")      
      console.log("receipt length: " + receipt.logs.length);

    })

  })
    renderAvaBalance(account)
}

function getBalance() {
  const newAccount = web3.eth.accounts[0]
  
  if (!newAccount) {
     return render('.subtitle', 'No account selected.') 
  }
  
  if (newAccount === account) {
    return console.log('account unchanged, returning.')
  }
  
  account = newAccount
  renderAvaBalance(account)
  
}


    
