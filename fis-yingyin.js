var fis = module.exports = require('fis');
var fs = require('fs');
var iconv = require('iconv-lite');

fis.cli.name = 'fis-yingyin';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
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
            html: 'html-minifier'
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

    var manifestfile = './app.manifest';
    var version = new Date().getTime();

    var manifesthead = "CACHE MANIFEST";
    var manifestversion ="\r\n\r\n#"+ version;
    var manifestcache ="";//"\r\n\r\nCACHE:";
    if(ret.map && ret.map.pkg){
        for(pkg in ret.map.pkg){
            var _temppath = '\r\n' + ret.map.pkg[pkg]["uri"];
            manifestcache += _temppath;
        }
    }
    if(ret.map && ret.map.res){
        for(res in ret.map.res){
            var _temppath = '\r\n' + ret.map.res[res]["uri"];
            manifestcache += _temppath;
        }
    }


    var network = '\r\n' + 'NETWORK:';
    network +='\r\n*'



    var manifestcontent = manifesthead + manifestversion + manifestcache + network;
    var arr = iconv.encode(manifestcontent, 'utf-8');


    // appendFile，如果文件不存在，会自动创建新文件
    // 如果用writeFile，那么会删除旧文件，直接写新文件
    fs.writeFile(manifestfile, arr, function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("manifest updated");
    });
    var file = fis.file(fis.project.getProjectPath(), '/app.manifest');
                 ret.pkg[file.subpath] = file;
                 //file.setContent(content);
}
















