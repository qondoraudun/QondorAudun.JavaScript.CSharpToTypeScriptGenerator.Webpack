# Purpose

This is a fork of https://github.com/ffMathy/FluffySpoon.JavaScript.CSharpToTypeScriptGenerator.Webpack to add support for webpack 5

# Installing
```shell
npm install --save-dev @qondoraudun/csharp-to-typescript-generator.webpack
```

# Use
```javascript
var poco = require('@qondoraudun/csharp-to-typescript-generator.webpack');

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
