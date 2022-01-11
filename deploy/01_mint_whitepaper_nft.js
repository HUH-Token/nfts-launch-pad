export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments
    const { deployer, first, second, third, fourth } = await getNamedAccounts()
    const eRC721PresetMinterPauserAutoIdContract = await deployments.get('ERC721PresetMinterPauserAutoId')
    const eRC721PresetMinterPauserAutoId = await ethers.getContractAt('ERC721PresetMinterPauserAutoId', eRC721PresetMinterPauserAutoIdContract.address)
    // await eRC721PresetMinterPauserAutoId.mint(deployer, {from: deployer})
    const minterRole = await eRC721PresetMinterPauserAutoId.MINTER_ROLE.call()
    console.log(minterRole)
    const hasRole = [
        await eRC721PresetMinterPauserAutoId.hasRole(minterRole, deployer),
        await eRC721PresetMinterPauserAutoId.hasRole(minterRole, first),
        await eRC721PresetMinterPauserAutoId.hasRole(minterRole, second),
        await eRC721PresetMinterPauserAutoId.hasRole(minterRole, third),
        await eRC721PresetMinterPauserAutoId.hasRole(minterRole, fourth)
    ]
    console.log(deployer, first, second, third, fourth)
    console.log(hasRole)

  }
//   export const tags = ['ERC721PresetMinterPauserAutoId']
  module.exports.dependencies = ['ERC721PresetMinterPauserAutoId']