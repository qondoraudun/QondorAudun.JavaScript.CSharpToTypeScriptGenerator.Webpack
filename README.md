# Installing
```shell
npm install --save-dev @fluffy-spoon/javascript.csharp-to-typescript-generator.webpack
```

# Use
```javascript
var gulp = require('gulp');
var poco = require('@fluffy-spoon/javascript.csharp-to-typescript-generator.webpack');

var webpackConfig = {
  plugins: [
    poco(
      "dist/typings",
      ["Models/*.cs"],
      {
        //options go here
      })
  ]
};
```

To see what options are available, go here: https://github.com/ffMathy/FluffySpoon.JavaScript.CSharpToTypeScriptGenerator
