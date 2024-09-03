// @ts-check

import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['coverage/**', 'dist/**', 'example/dist/**', '__tests__/**'],
    },
    {
        plugins: {
            react,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
    },
    ...tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, prettierConfig),
    ...tseslint.config({
        files: ['__tests__/**'],
        plugins: { jest },
        ...jest.configs['flat/recommended'],
        ...jestDom.configs['flat/recommended'],
    }),
];
