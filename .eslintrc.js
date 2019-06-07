module.exports = {
    // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
    root: true,
    // 对Babel解析器的包装使其与 ESLint 兼容。
    parserOptions: {
        "parser": "babel-eslint",
        // 代码是 ECMAScript 模块
        // parser: 'babel-eslint',
        sourceType: 'module'
    },
    // "parserOptions": {
    //     "parser": "babel-eslint"
    // },
    env: {
        // 预定义的全局变量，这里是浏览器环境
        browser: true,
        node: true
    },
    // 扩展一个流行的风格指南，即 eslint-config-standard
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: [ 'plugin:vue/recommended','standard'],
    globals: {
        __static: true
    },

    // required to lint *.vue files
    plugins: [
        // 此插件用来识别.html 和 .vue文件中的js代码
        'html',
        // standard风格的依赖包
        "standard",
        // standard风格的依赖包
        "promise"
    ],
    // add your custom rules here
    'rules': {
        // 允许箭头函数参数使用括号
        'arrow-parens': 0,
        // 允许方法之间加星号
        'generator-star-spacing': 0,
        // 允许在开发环境下使用debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 要求花括号内有空格
        'object-curly-spacing': ["error", "always"],
        // 强制使用单引号
        'quotes': ["error", "single"],
        // 强制两个空格缩进
        'indent': ["error", 2],
        //暂时忽略所有错误
        'eqeqeq': 0,
        'one-var': 0,
        'no-unused-vars': 0,
        'handle-callback-err': 0,
        'no-mixed-operators': 0,
        'no-useless-escape': 0,
        'no-return-assign': 0,
        'no-undef': 0,
        'prefer-promise-reject-errors': 0,
        'no-control-regex': 0,
        'no-new': 0
    }
}
