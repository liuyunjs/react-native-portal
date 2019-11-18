/**
 * @Description : rollup config
 * @Create on : 2019/11/18 23:55
 * @author liuyunjs
 * @version 0.0.1
 **/

import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

const typescriptConfig = {
  cacheRoot: 'tmp/.rpt2_cache',
  typescript: require('typescript')
};

const noDeclarationConfig = Object.assign({}, typescriptConfig, {
  tsconfigOverride: { compilerOptions: { declaration: false } }
});

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
};

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});

const config = {
  input: 'index.ts',
  external: makeExternalPredicate(deps.concat(peerDeps))
};

export default (Object.assign({}, config, {
  output: {
    file: pkg.main,
    format: 'es',
    exports: 'named'
  },
  plugins: [
    typescript(noDeclarationConfig),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ]
}));

