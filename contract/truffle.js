var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = process.env.MNEMONIC

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
    },
    parity_ropsten: {
      host: "localhost",
      port: 8545,
      network_id: '*',
      gas: 4700000,
      gasPrice: 100000000000
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: '*',
      gas: 4712388,
      gasPrice: 1000000000
    },
    infura_ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"),
      network_id: '*',
      gas: 4700000
    },
    infura_rinkeby: {
      provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/"),
      network_id: '*',
      gas: 4700000,
    },
    infura_mainnet: {
      provider: new HDWalletProvider(mnemonic, 'https://mainnet.infura.io'),
      network_id: '*',
      gas: 4500000,
      gasPrice: 25000000000
    }
  }
};
