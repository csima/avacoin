// url:https://blog.zeppelin.solutions/how-to-create-token-and-initial-coin-offering-contracts-using-truffle-openzeppelin-1b7a5dae99b6

var AvaCoinCrowdsale = artifacts.require("./AvaCoinCrowdsale.sol");
var AvaAccess = artifacts.require("./AvaAccess.sol");

module.exports = function(deployer, network, accounts) {
  console.log("Network: " + network);
  return liveDeploy(deployer, accounts);
};

function latestTime(){
  return web3.eth.getBlock('latest').timestamp;
}

const duration = {
  seconds: function(val) { return val},
  minutes: function(val) { return val * this.seconds(60) },
  hours: function(val) {return val * this.minutes(60) },
  days: function(val) {return val * this.hours(24) },
  weeks: function(val) {return val * this.days(7) },
  years: function(val) {return val * this.days(365) }
};

async function liveDeploy(deployer, accounts){
  const BigNumber = web3.BigNumber;
  const RATE = new web3.BigNumber(100);
  const startTime = latestTime() + duration.seconds(10);
  const endTime =   startTime + duration.days(30);
  const walletAccount = accounts[0]
  
  console.log("Start Time: " + startTime);
  console.log("End Time: " + endTime);
  console.log("Rate: " + RATE);
  console.log("Wallet: " + walletAccount);
  return deployer.deploy(AvaCoinCrowdsale, startTime, endTime, RATE, walletAccount).then( async () => {
    const instance = await AvaCoinCrowdsale.deployed();
    const token = await instance.token.call();
    console.log('Token Address: ', token);

    return deployer.deploy(AvaAccess, token, walletAccount).then(async () => {
      const access = await AvaAccess.deployed();
      const access_addr = await access.address;
      console.log("AvaAccess Address: " + access_addr);
    })

  })
}
