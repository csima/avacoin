window.addEventListener('load', setup)
let token_instance, account, interval
let token_address = "0xf58cfa1a4c60326a5508df7ca3f07e9760f57587";
let token_abi = JSON.parse('[{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]')

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
    $('#token_address').text(token_address)
    token_instance = web3.eth.contract(token_abi).at(token_address);
    
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

$('#sendtoken').submit(function() {   
  //sendAvaCoin(web3.toWei(1,"ether"));
  console.log("click")
  $('body').toggleClass('modal--opened');
  e.preventDefault();
  $.backstretch('resize');
});

function sendAvaCoin(amount) {
  var to_address = main_address;
  
  token_instance.transfer(to_address, amount, (err, res) => {
    if (err) return console.log("ERROR")
    console.log("return of transfer: " + res)
    renderAvaBalance(account)
  });

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


    
