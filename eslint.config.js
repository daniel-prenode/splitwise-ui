// // @ts-check
// const eslint = require('@eslint/js');
// const tseslint = require('typescript-eslint');
// const angular = require('angular-eslint');

// module.exports = tseslint.config(
//   {
//     files: ['**/*.ts'],
//     extends: [
//       eslint.configs.recommended,
//       ...tseslint.configs.recommended,
//       ...tseslint.configs.stylistic,
//       ...angular.configs.tsRecommended,
//     ],
//     processor: angular.processInlineTemplates,
//     rules: {
//       // Angular specific rules
//       '@angular-eslint/directive-selector': [
//         'error',
//         {
//           type: 'attribute',
//           prefix: 'app',
//           style: 'camelCase',
//         },
//       ],
//       '@angular-eslint/component-selector': [
//         'error',
//         {
//           type: 'element',
//           prefix: 'app',
//           style: 'kebab-case',
//         },
//       ],
//       '@angular-eslint/no-empty-lifecycle-method': 'error',
//       '@angular-eslint/use-lifecycle-interface': 'error',
//       '@angular-eslint/use-pipe-transform-interface': 'error',
//       '@angular-eslint/no-input-rename': 'error',
//       '@angular-eslint/no-output-rename': 'error',
//       '@angular-eslint/no-output-on-prefix': 'error',
//       '@angular-eslint/no-conflicting-lifecycle': 'error',
//       '@angular-eslint/contextual-lifecycle': 'error',

//       // TypeScript specific rules
//       '@typescript-eslint/no-unused-vars': [
//         'error',
//         { argsIgnorePattern: '^_' },
//       ],
//       '@typescript-eslint/no-explicit-any': 'warn',
//       '@typescript-eslint/explicit-function-return-type': 'off',
//       '@typescript-eslint/explicit-module-boundary-types': 'off',
//       '@typescript-eslint/no-inferrable-types': 'error',
//       '@typescript-eslint/no-var-requires': 'error',
//       '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
//       '@typescript-eslint/array-type': ['error', { default: 'array' }],
//       '@typescript-eslint/member-ordering': [
//         'error',
//         {
//           default: [
//             'static-field',
//             'instance-field',
//             'static-method',
//             'instance-method',
//           ],
//         },
//       ],

//       // General ESLint rules
//       'no-console': ['warn', { allow: ['warn', 'error'] }],
//       'no-debugger': 'error',
//       'prefer-const': 'error',
//       'no-var': 'error',
//       eqeqeq: ['error', 'always'],
//       curly: ['error', 'all'],
//       complexity: ['warn', 10],
//       'max-lines': ['warn', 300],
//       'max-params': ['warn', 4],
//       'no-duplicate-imports': 'error',
//       'no-unused-expressions': 'error',
//       'prefer-template': 'error',
//       'object-shorthand': 'error',
//     },
//   },
//   {
//     files: ['**/*.html'],
//     extends: [
//       ...angular.configs.templateRecommended,
//       ...angular.configs.templateAccessibility,
//     ],
//     rules: {
//       // Angular template rules
//       '@angular-eslint/template/no-negated-async': 'error',
//       '@angular-eslint/template/use-track-by-function': 'warn',
//       '@angular-eslint/template/conditional-complexity': [
//         'warn',
//         { maxComplexity: 3 },
//       ],
//       '@angular-eslint/template/cyclomatic-complexity': [
//         'warn',
//         { maxComplexity: 5 },
//       ],
//       '@angular-eslint/template/no-call-expression': 'warn',
//       '@angular-eslint/template/no-any': 'warn',
//       '@angular-eslint/template/button-has-type': 'error',
//       '@angular-eslint/template/click-events-have-key-events': 'error',
//       '@angular-eslint/template/mouse-events-have-key-events': 'error',
//     },
//   }
// );
