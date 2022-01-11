export default async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  await deploy('ERC721PresetMinterPauserAutoId', {
    from: deployer,
    proxy: true,
    args: ["HUH Logo Blue Background","HUHLBB", "https://huh.social/images/huh-logo-blue-bg.svg"],
    log: true
  })
}
export const tags = ['ERC721PresetMinterPauserAutoId']
