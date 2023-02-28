import { Emitter, EmitOptions } from '@fluffy-spoon/csharp-to-typescript-generator';

import glob = require('glob');
import path = require('path');
import fs = require('fs');
import process = require('process');

function Plugin(outputDirectory: string, paths: string[]|string, options: EmitOptions, extension?: "d.ts"|"ts") {
    if(!paths)
        throw new Error('Must specify paths to use for C# to TypeScript conversion.');

    if(!outputDirectory)
        throw new Error('Must specify the output directory to use for C# to TypeScript conversion.');
    
    if(!extension)
        extension = "d.ts";

    if(!Array.isArray(paths))
        paths = [paths];

    var newPaths = [];
    for(var path of paths) {
        newPaths.push(...glob.sync(path));
    }

    if(outputDirectory.startsWith(process.cwd()))
        outputDirectory = outputDirectory.substr(process.cwd().length + 1);

    this.extension = extension;
    this.outputDirectory = outputDirectory;
    this.paths = newPaths;
    this.options = options;
}

Plugin.prototype.apply = function(compiler) {
    var that = this;
    compiler.hooks.emit.tapAsync('CSharpToTypescriptGeneratorPlugin', function(compilation, callback) {				
        for(let filePath of that.paths) {
            console.log("Generating TypeScript for C# file " + filePath);

            var csharpCode = fs.readFileSync(filePath, 'utf8');
            
            var emitter = new Emitter(csharpCode);
            var typescriptCode = emitter.emit(that.options);
            
            var fileName = path.basename(filePath);
            var outputFilePath = path
                .join(
                    that.outputDirectory, 
                    fileName.substring(0, fileName.length - 2) + that.extension);

            (function (outputPath, ts) {
                compilation.assets[outputPath] = {
                    source: function() {
                        return ts;
                    },
                    size: function() {
                        return ts.length;
                    }
                };
            })(outputFilePath, typescriptCode);
        }

        callback();
    });
};

function createPlugin(outputDirectory, paths, options) {
    return new Plugin(outputDirectory, paths, options);
}

export = createPlugin;
