const path = require("path");//引用它，才能使用__dirname变量

module.exports =  {    

    // entry: __dirname+'/src/index.js',
    entry: path.join(__dirname,'themes/Boiling/source/js','sketch.js'),    //入口文件。path.join( , , )是一种写法。


    output:{
    
        path: __dirname+'themes/Boiling/source/js', //这里要写绝对地址,所以会用到变量。 这也是另一种path的写法。
        filename:'main.js'
    }
    

//     module:{
//         rules: [{
//             test:/\.css$/, //支持正则表达
//             use:['style-loader','css-loader']
//         }
// 
//         ]
// 
//     }
    }