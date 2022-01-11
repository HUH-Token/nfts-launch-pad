export default async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  await deploy('ERC721PresetMinterPauserAutoId', {
    from: deployer,
    proxy: true,
    args: ["HUH Nation Directive NFT","HNDNFT", "https://whitepaper.huh.social"],
    log: true
  })
  console.log(deployer)
}
export const tags = ['ERC721PresetMinterPauserAutoId']
