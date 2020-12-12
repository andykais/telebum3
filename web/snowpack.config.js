// Consult https://www.snowpack.dev to learn about these options
module.exports = {
  extends: '@sveltejs/snowpack-config',
  mount: {
    'src/components': '/_components',
    'src/client': '/_client',
  },
  alias: {
    $components: './src/components',
  },
  externalPackage: require('module').builtinModules,
}
