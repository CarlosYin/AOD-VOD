'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const args = require('optimist').argv;

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

//生成版本号
exports.generateVersion = function () {
	//指定版本号  node build/build.js -v 1.2.0
	if (args.v) return args.v;

	//原版本号
	var version = packageConfig.version,
		versions = packageConfig.version.split('.');

	//自增版本号  node build/build.js --auto 1
	if (args.auto) {
		//默认自增次版本号  1：主版本号  2：次版本号  3：修订版本号
		var autoIndex = (args.auto || 2) - 1;

		//生成新版本号
		if (autoIndex === 2) {
			versions.splice(autoIndex, 1, ++versions[autoIndex]);
			version = versions.join('.');
		} else if (autoIndex === 1) {
			version = `${versions[0]}.${+versions[1] + 1}.0`;
		} else {
			version = `${+versions[0] + 1}.0.0`;
		}

		//当前版本号
		console.log('current version: ', version);

		//更新package版本信息
		packageConfig.version = version;
		fs.writeFile(path.resolve(__dirname, '../package.json'), JSON.stringify(packageConfig, null, 4), function (err) {
			console.error(err);
		})
	}

	return version;
}
