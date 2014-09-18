var fis = module.exports = require('fis');

fis.cli.name = 'fis-yingyin';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
    modules: {
        parser: {
            css: 'less',
            less: 'less'
        },
        postprocessor: {
            js: 'jswrapper,require-async',
            html: "require-async",
            tpl: "require-async",
        },

        postpackager: ['autoload',  opermanifest],
        spriter: 'csssprites',
        optimizer: {
            tpl: 'html-minifier',
        }
    },
    settings: {
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        postpackager: {
            autoload: {
                useInlineMap: true,
                include: '/page/**',
                optDeps: false
            }
        }
    }
});

function opermanifest(ret, conf, settings, opt){
}
















