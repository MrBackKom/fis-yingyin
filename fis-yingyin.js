var fis = module.exports = require('fis');

fis.cli.name = 'fis-yingyin';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
    roadmap : {
        path : [
            {
                //一级通用组件组件，可以引用短路径，比如common/searchbox/searchbox.js
                //直接引用为var searchbox = require('searchbox');
                reg : /^\/common\/([^\/]+)\/\1\.(js)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //id为文件夹名
                id : '$1'
            },
            {
                //设置common模块的图片产出路径
                reg:/common\/.+?.(jpeg|png|jpg|gif)$/i,
                release:'images/'+'$&'
            },
            {
                //一级业务模块，可以引用短路径，比如modules/carton/carton.js
                //直接引用为var carton = require('carton');
                reg : /^\/modules\/([^\/]+)\/\1\.(js)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //id为文件夹名
                id : '$1'
            },
            {
                //设置common模块的图片产出路径
                reg:/modules\/.+?.(jpeg|png|jpg|gif)$/i,
                release:'images/'+'$&'
            },
            {
                //其他css文件
                reg : "**.css",
                //css文件会做csssprite处理
                useSprite : true
            },
            {
                reg: '**.tmpl',
                isJsLike: true,
                release: false
            },
        ]
    },
    modules: {
        parser: {
            tmpl: 'utc',
            css: 'less',
            less: 'less'
        },
        postprocessor: {
            css:'require-async',
            js: 'jswrapper,require-async',
            html: "require-async"
        },

        postpackager: ['autoload','simple',  opermanifest],
        spriter: 'csssprites',
        optimizer: {
            html: 'html-minifier',
        }
    },
    settings: {
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        postpackager:{
            autoload:{
                useSiteMap:true,
                useInlineMap:true,
                scriptTag:'<!--SCRIPT_PLACEHOLDER-->',
                styleTag: '<!--STYLE_PLACEHOLDER-->',
                resourceMapTag:'<!--RESOURCEMAP_PLACEHOLDER-->'
            }
            ,
            simple:{
                autoCombine:true,
                autoReflow:true
            }
        }

    }
});

function opermanifest(ret, conf, settings, opt){
    //console.log("opermanifest function called")

    
}
















