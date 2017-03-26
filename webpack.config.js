var path = require('path')
module.exports = {
    entry:"./test.js",
    output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
    module:{
      loaders:[
          {test:/test.js/,loader:"babel-loader"}
      ]
    }
}
