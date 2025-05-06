import js from '@eslint/js';
import ts from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import esLintImport from 'eslint-plugin-import';
import nodePkg from 'eslint-plugin-node';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

const customRules = {
  // eslint
  'max-len': ['warn', { code: 100 }],
  semi: [2, 'always'],

  // eslint-plugin-simple-import-sort
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',

  // eslint-plugin-import
  'import/first': 'error',
  'import/newline-after-import': 'error',
  'import/no-duplicates': 'error',
  'import/max-dependencies': ['warn', { max: 10, ignoreTypeImports: true }],

  // no-unused-vars
  'no-unused-vars': 'off',

  // '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
    },
  ],
};

const baseConfig = {
  ignores: ['dist'],
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
};

const jsConfig = {
  ...js.configs.recommended,
  files: ['**/*.js'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
    ecmaVersion: 2024,
    sourceType: 'module',
  },
  plugins: {
    node: nodePkg,
    import: esLintImport,
  },
};

const tsConfig = {
  files: ['**/*.ts'],
  languageOptions: {
    parser: ts,
    ecmaVersion: 2024,
    globals: {
      ...globals.node,
    },
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
      sourceType: 'module',
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: {
    node: nodePkg,
    import: esLintImport,
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...prettier.rules,
    ...customRules,
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
};

const tsTypeCheckedConfig = tsEslint.configs.strictTypeChecked.map(config => {
  if (config.rules) {
    return {
      ...config,
      files: ['**/*.{ts,tsx}'],
    };
  }
  return config;
});

export default [baseConfig, jsConfig, tsConfig, ...tsTypeCheckedConfig];
