// Custom Babel plugin to strip .js extensions from imports
function stripJsExtensions() {
  return {
    visitor: {
      'ImportDeclaration|ExportDeclaration'(path) {
        const node = path.node;
        if (node.source && typeof node.source.value === 'string') {
          const value = node.source.value;
          if (value.endsWith('.js')) {
            node.source.value = value.slice(0, -3);
          }
        }
      },
    },
  };
}

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [stripJsExtensions],
};
