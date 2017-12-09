window.addEventListener('load', setup)
let token_instance, account, interval, crowd_instance, crowd_address, token_address
crowd_address = "0xF0a0e204caE94CAEC6948893c9f9f12C2989CAD7";
token_address = "0x0641C201b2FBeDa7cE477cBEbfEAe10639A967B5";
let crowd_abi = JSON.parse('[{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reclaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"hasEnded","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_startTime","type":"uint256"},{"name":"_endTime","type":"uint256"},{"name":"_rate","type":"uint256"},{"name":"_wallet","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenPurchase","type":"event"}]')
let token_abi = JSON.parse('[{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]');
global.fetch = require('node-fetch')
const cc = require('cryptocompare')

function convert_ava(avacoin_amount) {
  let ethcoin_amount, usdcoin_amount
  ethcoin_amount = avacoin_amount / 100;
  // 1 avacoin = 1/100 (0.1) ETH = 0.1 x (current eth price)
  cc.price('ETH', 'USD')
  .then(prices => {
    usdcoin_amount = (ethcoin_amount * prices.USD).toFixed(2);
    console.log("USD Amount: " + usdcoin_amount);
    $('#conversion').text("ETH: " + ethcoin_amount + " USD: $" + usdcoin_amount)    
  })
  .catch(console.error)
  console.log("AVA Amount: " + avacoin_amount);
  console.log("ETH Amount: " + ethcoin_amount);   
}

$( "#coin-amount" ).keyup(function(e) {
  var avacoin_amount = $('#coin-amount').val();  
  if (avacoin_amount >= 1) {
    $('#conversion').text("Calculating conversion rates...")
    convert_ava(avacoin_amount);  
  } else {
    $('#coin-amount').val("")
  }
});

function setupGraphics() {
  var isMobile = false; //initiate as false
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

  // Background image
  if (isMobile) {
    console.log('mobile')
    $.backstretch('images/background-mobile.png');
  } else {
    console.log('desktop')
    $.backstretch('images/background-2.jpg');
  }

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
    
  // Snowfall
  var $overlay = $('.overlay');
  $overlay.snowfall({
    flakeCount : 50,
    maxSize : 7,
    round: true
  });
  $(window).bind('resize orientationchange', function() {
    $overlay.snowfall('clear');
    $overlay.snowfall({
      flakeCount : 50,
      maxSize : 7,
      round: true
    });
  });

  // Modal
  $('#modal-open, #modal-close').on('click', function(e){
    $('body').toggleClass('modal--opened');
    e.preventDefault();
    $.backstretch('resize');
  });
}

function setup() {
  setupGraphics();
 
  if (typeof window.web3 === 'undefined') {
    $('#mc_embed_signup').html('')
    $('#subtitle').html('<a href="https://metamask.io/"><img src="images/download_metamask.png"></a>')
    $('#conversion').html('<a href="https://metamask.io">Download MetaMask</a> or ' + '<a href="https://github.com/ethereum/mist/releases">Mist</a> to view this page. Otherwise send ETH to ' + crowd_address + " to recieve your AVA Coin. Ratio is 100 AVA to 1 ETH")    
    
  } else {

    $('#token_address').text(token_address)
    $('#crowd_address').text(crowd_address)
    createClickable("address", "crowd_address_url", "Crowd Contract: ", crowd_address);
    createClickable("address", "token_address_url", "Token Contract: ", token_address);

    crowd_instance = web3.eth.contract(crowd_abi).at(crowd_address);
    token_instance = web3.eth.contract(token_abi).at(token_address);

    // Display length of crowd fund
    crowd_instance.endTime((err, val) => {
      if (err) console.log(err.message)
      var timestamp = convertTimstamp(val)
      var launchDay = new Date(timestamp)
      $('#timer').countdown({
        until: launchDay,
        format: 'dHMS'
      });
    })
    
    console.log("token address: " + token_instance.address);
    console.log("crowd address: " + crowd_instance.address);

    pollForAccountChange()
  }
}

function pollForAccountChange() {
  console.log('beginning account change polling...')
  if (!interval) {
    interval = setInterval(getBalance, 1000)
  }
}

function convertTimstamp(unixtimestamp){
   var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   // Convert timestamp to milliseconds
   var date = new Date(unixtimestamp*1000);
   var year = date.getFullYear();
   var month = months_arr[date.getMonth()];
   var day = date.getDate();
   var hours = date.getHours();
   var minutes = "0" + date.getMinutes();
   var seconds = "0" + date.getSeconds();
   // Display date time in MM-dd-yyyy h:m:s format
   var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
   return convdataTime
}

function renderAvaBalance(account) {
  token_instance.balanceOf(account, (err, balance) => {
    if (err) return console.log("AVA balance: " + err.message)
    const ether = web3.fromWei(balance, 'ether')
    var existval = $('#balance').text();
    $('#balance').text(existval + ` AVA: ${ether.toString()}`)
  })
}

$('#mc-embedded-subscribe-form').submit(function() {    
  var avacoin_amount = $('#coin-amount').val(); 
  if (avacoin_amount >= 1) {
    buyCoins(avacoin_amount);
  } else {
    $('#coin-amount').val("");
  }
});

function createClickable(urlType, idAttribute, text, hash) {
  var domain = "https://etherscan.io"
  var txURL = "/tx/";
  var addressURL = "/address/";
  var url, html;

  if (urlType == "tx") {
    url = domain + txURL;
  } else {
    url = domain + addressURL;
  }
  url = url + hash;
  html = '<a href="' + url + '" class="modal-note" target="_blank">' + text + hash + '</a>';
  $('#' + idAttribute).html(html);  
}

function buyCoins(amount) {
  const account = web3.eth.accounts[0]  
  var ethcoin_amount = amount / 100;
  var to_address = crowd_address;
  var from_address = account;

  web3.eth.sendTransaction({
    to: to_address,
    from: from_address,
    value: web3.toWei(ethcoin_amount,"ether"),
    gas:210000
  }, (err, txHash) => {
    if (err) {
      console.log("purchase error: " + err.message)
      $('#subtitle').text(err.message)  
      return    
    }
    renderAvaBalance(from_address)
    $('#subtitle').text("Congratulations! You bought " + amount + " Ava Coin ")
    createClickable("tx", "etherscan", "tx: ", txHash);
  })
}

function getBalance() {
  const newAccount = web3.eth.accounts[0]
  
  if (!newAccount) {
    $('#subtitle').text("No account selected")    
  }
  
  if (newAccount === account) {
    return console.log('account unchanged, returning.')
  }
  
  account = newAccount
  
  web3.eth.getBalance(account, (err, balance) => {
    if (err) return $('#subtitle').text(err.message)
    const ether = web3.fromWei(balance, 'ether')
    $('#balance').text(`Your balance: ETH: ${ether.toString()}`)    
  })
  
  renderAvaBalance(account)
}


    
