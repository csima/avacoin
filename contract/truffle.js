var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "neck height suffer tongue beauty beauty exact food cheese slight merry piece";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    mainnet: {
      host: "localhost",
      port: 8545,
      network_id: '*',
      gas: 4700000
    },
    development : {
      host : "localhost",
      port: 8545,
      gasPrice: 12,
      gas: 4700000
    },
    ropsten: {
      host: "localhost",
      port: 8544,
      network_id: '*',
      gas: 4700000,
      from: "0xf8e828d9f46c6e900498db8ec0347cf1320c5023"
      //from: "0xc5166ed591461bafaf64f1e81d9c3fdb76b9c4df"
      //from: "0x7668ed130fd675aef1221b01bc069af779b45702"
    },
    parity_ropsten: {
      host: "localhost",
      port: 8545,
      network_id: '*',
      gas: 4700000,
      gasPrice: 100000000000
    },
    my_ropsten: {
      host: "138.68.240.54",
      port: 8545,
      network_id: '*',
      gas: 4700000,
      from: "0x7668ed130fd675aef1221b01bc069af779b45702"
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      from: "0x7668ED130FD675Aef1221B01Bc069aF779b45702",
      network_id: '*',
      gas: 4712388,
      gasPrice: 1000000000
    },
    infura_ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"),
      network_id: '*',
      from: "0x7668ED130FD675Aef1221B01Bc069aF779b45702",
      gas: 4700000
    },
    infura_rinkeby: {
      provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/"),
      network_id: '*',
      gas: 4700000,
      from: "0x7668ed130fd675aef1221b01bc069af779b45702",
    },
    infura_mainnet: {
      provider: new HDWalletProvider(mnemonic, 'https://mainnet.infura.io'),
      network_id: '*',
      gas: 4500000,
      gasPrice: 25000000000
    }
  }
};
