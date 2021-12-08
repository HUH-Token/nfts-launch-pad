import 'hardhat-deploy'

import '@nomiclabs/hardhat-solhint'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import 'solidity-coverage'
import 'hardhat-gas-reporter'

const fs = require('fs')
const path = require('path')

for (const f of fs.readdirSync(path.join(__dirname, 'hardhat'))) {
  require(path.join(__dirname, 'hardhat', f))
}

const enableGasReport = !!process.env.ENABLE_GAS_REPORT
const enableProduction = process.env.COMPILE_MODE === 'production'

const { MNEMONIC, PKD, PK1, PK2, PK3, PK4, INFURA_KEY, TENDERLY_USERNAME, TENDERLY_PROJECT } = process.env
const DEFAULT_MNEMONIC = 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'

const sharedNetworkConfig = {}
if (PKD && PK1 && PK2 && PK3 && PK4) {
  sharedNetworkConfig.accounts = [PKD, PK1, PK2, PK3, PK4]
} else {
  sharedNetworkConfig.accounts = {
    mnemonic: MNEMONIC || DEFAULT_MNEMONIC
  }
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  paths: {
    sources: 'contracts',
    artifacts: 'artifacts'
  },
  solidity: {
    compilers: [
      {
        version: '0.6.12',
        settings: {
          optimizer: {
            enabled: enableGasReport || enableProduction,
            runs: 200
          }
        }
      },
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: enableGasReport || enableProduction,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    ganache: {
      url: 'http://localhost:8545'
    },
    hardhat: {
      blockGasLimit: 10000000
    },
    mumbai: {
      ...sharedNetworkConfig,
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`
    },
    polygon: {
      chainID: 137,
      ...sharedNetworkConfig,
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`
    }
  },
  namedAccounts: {
    deployer: 0,
    first: 1,
    second: 2,
    third: 3,
    fourth: 4
  },
  gasReporter: {
    enable: enableGasReport,
    currency: 'USD',
    outputFile: process.env.CI ? 'gas-report.txt' : undefined
  },
  tenderly: {
    username: TENDERLY_USERNAME,
    project: TENDERLY_PROJECT
  }
}
