module.exports = {
    norpc: true,
    testCommand: 'npm test',
    compileCommand: 'npm run compile',
    skipFiles: [
        'abdk-libraries-solidity',
        'ERC20Mock.sol',
        'UChildAdministrableERC20.sol',
        'UChildERC20Proxy.sol',
    ],
    providerOptions: {
        default_balance_ether: '10000000000000000000000000',
    },
    mocha: {
        fgrep: '[skip-on-coverage]',
        invert: true,
    },
}
