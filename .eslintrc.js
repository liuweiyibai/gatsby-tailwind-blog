/**
 * eslint 的主要配置文件，下面分别详述各项功能
 */
module.exports = {
  ignorePatterns: ['./src/typings.d.ts'],
  env: {
    browser: true,
    es2021: true,
  },

  // 继承哪些规范，这里我们选择继承alloyTeam 的
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  // 使用哪个解析器
  parser: '@typescript-eslint/parser',

  // 指定 ESLint 可以解析 JSX 语法
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    // class 中使用 public 等修饰符定义属性或者方法
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    'max-params': [0, 5], //函数最多只能有5个参数

    // 允许props传递 组件
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],

    // 将逻辑使用可选链表达式来表达
    // @typescript-eslint/prefer-optional-chain:"off"
  },
};
