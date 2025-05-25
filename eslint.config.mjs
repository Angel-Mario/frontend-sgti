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
    },
  }),
  ...oxlint.configs['flat/recommended'],

)
