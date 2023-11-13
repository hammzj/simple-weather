/* eslint-env node */
module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        "react-app",
        "react-app/jest"
    ],
    plugins: ['@typescript-eslint'],
    root: true,
}
