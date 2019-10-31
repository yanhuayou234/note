### webpack4.x基本使用

​	1、运行 npm init -y 快速初始化项目

​	2、在项目根目录创建 src 源代码目录和 dist 产品目录

​	3、在src目录下创建一个index.html

​	4、使用 cnpm 安装webpack，运行 cnpm i webpack webpack-cli -D

​	5、项目根路径下新建webpack.config.js 文件（webpack配置文件），配置文件新增mode属性，值为development（开发模式）或 production（生产模式）

​	6、src 目录下新建 index.js 文件，webpack 4.x中，提供了**约定大于配置**的概念，默认的打包**入口路径**是src目录下的index.js，打包的输**出文件是** dist 目录下main.js

```js
module.exports = {
    mode: 'development', //development   production
}
```

​	7、运行 webpack 命令，在dist目录下回生成一个main.js 文件





### webpack-dev-server的基本使用

​	1、安装webpack-dev-server

​		运行 cnpm i webpack-dev-server -D

​	2、安装完成后，这个工具的用法和webpack命令的用法完全一样

​	3、由于我们是在项目中本地安装的webpack-dev-server，所有，无法把它当作脚本命令在powershell终端中直接运行；（只有安装到全局 -g 的工具才能在终端中正常执行）；需要配置package.json文件，scripts 里面新增配置 "dev": "webpack-dev-server" ，以后就可以在终端通过运行 npm run dev 命令运行webpack-dev-server，实现保存自动打包

​	4、注意：webpack-dev-server 这个工具，如果想正常运行，要求在本地项目中必须安装webpack

​	5、webpack-dev-server 帮我们打包生成的 main.js文件并没有存放到实际的物理磁盘上，而是直接托管到了电脑的内存中，所以我们在项目根目录中，根本找不到这个打包好的main.js

​	6、我们可以认为，webpack-dev-server把打包好的文件以一种虚拟的形式托管到了项目的根目录中，我们可以认为和dist、src、node_modules平级有一个看不见的文件 main.js

​	7、webpack-dev-server的常用命令参数

​	配置pack.json文件，scripts

​	"dev"： "webpack-dev-server --open --port 3000 --contentBase src --hot" 

​	--open： 自动打开浏览器

​	--port 3000： 设置端口为3000

​	--contentBase src：  自动进入src目录（进入首页）

​	--hot： 只是更新更改的代码，实现页面无刷新加载代码

### html-webpack-plugin

​	1、安装html-webpack-plugin，运行 cnpm i html-webpack-plugin -D 

​	2、配置webpack.config.js文件

```js
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')//引入包

module.exports = {
    mode: 'development',   //development   production
    //在webpack 4.x中，约定大于配置，默认的打包入口路径是src->index.js
    plugins: [//配置插件节点
        new htmlWebpackPlugin({//创建一个内存中生成HTML页面的插件
            template: path.join(__dirname, './src/index.html'),  //指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html' //指定生成的页面名称
        })
    ]
}
```

当使用了 html-webpack-plugin 之后，我们不再需要手动处理main.js的引用路径了，因为这个插件已经帮我们自动创建了合适的script，并且引用了正确的路径

**html-webpack-plugin插件了两个作用**

​	1、自动在内存中根据指定的页面生成一个内存的页面

​	2、自动把打包好的main.js追加到页面中去

### 配置处理css样式表的第三方loader

webpack默认只能处理JS类型的文件，无法处理其他的非JS 类型的文件；如果要处理非JS类型的文件，我们需要手动安装一些合适的第三方loader加载器；

**1、处理css文件**

​	1、安装 cnpm i style-loader css-loader -D

​	2、打开webpack.config.js这个配置文件，在里面新增一个配置节点  module  ，它是个对象，在这个module对象身上有个rules属性，这个rules属性是个数组，这个数组中存放了所有第三方文件的匹配和处理规则（rules第一项就是配合css文件的第三方loader规则）

```js
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',   //development   production
    //在webpack 4.x中，约定大于配置，默认的打包入口路径是src->index.js
    plugins: [//配置插件节点
        new htmlWebpackPlugin({//创建一个内存中生成HTML页面的插件
            template: path.join(__dirname, './src/index.html'),  //指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html' //指定生成的页面名称
        })
    ],
    module: {//配置所有的第三方模块加载器
        rules: [//所有第三方模块的匹配规则
            {test: /\.css$/, use: ['style-loader', 'css-loader']},    //配置处理.css文件的第三方loader规则
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},//配置处理.less文件的第三方loader规则
            {test: /\.(jpg|png|gig|bmp|jpeg)$/, use: 'url-loader?limit=102400&name=[hash:5]-[name].[ext]'}//配置处理图片路径的loader
        ]
    }
}
```

webpack处理第三方文件类型的过程

​	1、发现这个要处理的文件不是JS文件，然后就去配置文件中查找有没有对应的第三方loader规则

​	2、如果能找到对应的规则就会调用对应的loader处理这种文件类型

​	3、在调用loader时候，是从后往前调用的

​	4、当最后一个loader调用完毕，会把处理的结果直接将webpack进行打包合并，最终输出到main.js中去



**2、处理less文件的loader**

​	1、安装 less-loader和less，运行 cnpm i less-loader less -D（less-loader依赖less）

​	2、配置webpack.config.js（代码参见上面）

**3、处理scss文件的loader**

​	1、安装sass-loader和node-sass，运行 cnpm i sass-loader node-sass -D

​	2、配置webpack.config.js（代码参见上面）

**4、配置处理图片路径的loader**

​	1、安装url-loader和file-loader，运行 cnpm i url-loader file-loader -D

​	2、配置webpack.config.js（代码参见上面）

​	3、用?传参，limit给定的值是图片的大小，单位是byte，如果我们引用的图片大于或等于给定的limit值，是不会被转为base64格式的字符串，如果图片小于给定的limit值，则会被转为base64格式的字符串

​	4、设置输出后的名字

​		{test: /\.(jpg|png|gig|bmp|jpeg)$/, use: 'url-loader?limit=102400&name=[hash:5]-[name].[ext]'}

​		hash的位数，hash后面跟原来的名字

**5、配置处理字体图标的loader**

​	{test: /\.(ttf|eot|svg|woff|woff2)$/,use: 'url-loader'}//配置处理字体图标的loader 

**6、webpack中babel的配置**

在webpack中默认只能处理一部分ES6的新语法，一些高级的ES6语法或者ES7语法，webpack是处理不了的，这时候就需要借助第三方的loader来帮助webpack处理这些高级的语法，当第三方loader把高级语法转为低级的语法之后，会把结果交给webpack去打包到main.js中。

**1、**通过Babel，可以帮我们将高级的语法转换为低级的语法，安装如下两套包，安装Babel相关的loader功能

​	1、cnpm i babel-core babel-loader babel-plugin-transform-runtime -D

​	2、cnpm i babel-preset-env babel-preset-stage-0 -D

​	(cnpm i babel-preset-react -D)

**2、**配置webpack.config.js文件，在module节点的rules数组中，添加一个新的匹配规则

​	{test: /\.js|.jsx$/, use: 'babel-loader', exclude: /node_modules/}

​	注意：在配置babel的loader规则时，必须把node_modules目录，通过exclude选项排除掉，原因是：

​	1、如果不排除node_modules，则babel会把node_modules中所有的第三方JS文件，都打包编译，这样会非常消耗CPU，同时，打包速度非常慢

​	2、即使babel把所有的node_modules中的JS转换完毕，项目也无法正常运行

**3、**在项目根目录中新建一个叫做.babelrc的babel配置文件，这个配置文件属于JSON格式，所有在写.babelrc配置的时候，必须符合JSON 语法规范，在.babelrc文件写如下配置：

​	{

   		 "presets": ["env", "stage-0"],

   		 "plugins": ["transform-runtime"]

​	}	

**7、引入组件时省略.js/.jsx后缀名**

resolve: {

​	extensions: ['.js', '.jsx', 'json']//表示这几类文件可以省略后缀名

}

**8、配置webpack设置跟目录**

resolve: {

​	extensions: ['.js', '.jsx', 'json'],//表示这几类文件可以省略后缀名

​	alias: {

​		'@': path.join(__dirname, './src')  //这样，@就表示项目根目录中src这一层路径

​	}

}





**react组件，为普通样式表通过modules参数启用模块化**

1、配置webpack.config.js，css-loader之后通过 ? 追加参数，其中有个固定的参数，叫做modules，为普通的css样式启用模块化

```js
module: {
        rules: [//所有第三方模块的匹配规则
            {test: /\.css$/, use: ['style-loader', 'css-loader?modules']}
        ]
    }
```

2、在需要的组件中，import导入样式表，并接收模块化的CSS样式对象：

​	import cssObj from '../css/CmtList.css'

3、在需要的HTML标签上，使用className指定模块化的样式：

​	<h1 className={cssObj.title}>评论列表组件</h1>

**使用localIdentName自定义生成的类名格式，可选的参数有：**

​	[path]  表示样式表相对于项目根路径所在路径

​	[name]  表示表文件名称

​	[local]  表示样式的类名定义名称

​	[hash:length]  表示32位的hash值

例子： { test: /\\.css$/, use: ['style-loader', 'css-loader?modules&localIdentName=\[path\]\[name\]-[local]-[hash:5]'] }



**使用:local()和:gobal()**

:local()包裹的类名，是被模块化的类名，只能通过className={cssObj.类名} 来使用，同时，:local()默认可以不写，这样，默认在样式表中定义的类名都是被模块化的类名

:global()包裹的类名，是全局生效的，不会被css-modules控制，定义的类名是什么，就是使用定义的类名className="类名"

注意：只有.title这样的类样式选择器，才会被模块化控制，类似于body这样的标签选择器，不会被模块化控制

:globa(.test){

​	font-size: 12px;

}