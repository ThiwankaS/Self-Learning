module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2021': true,
    'jest' : true
  },
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': ['.eslintrc.{js,cjs}'],
    }
  ],
  'parser' : 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': {
    'indent': ['error',2],
    'linebreak-style': ['error','unix'],
    'quotes': ['error','single'],
    'semi': ['error','never'],
    'eqeqeq':'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'no-console': 0
  }
}