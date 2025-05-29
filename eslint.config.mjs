// @ts-check
import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    // ...@antfu/eslint-config options
    rules: {
      'n/prefer-global/process': 'off',
      'no-console': 'warn',
      '@stylistic/indent': 'off',
      'style/no-mixed-spaces-and-tabs': 'off',
      'style/no-tabs': 'off',
      '@stylistic/no-tabs': 'off',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  }),
  ...oxlint.configs['flat/recommended'],
)
