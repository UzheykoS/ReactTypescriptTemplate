"use strict"
var fs = require('fs');
var path = require('path');
var ncp = require('ncp').ncp;
var chalk = require('chalk');

const node_env = process.env.NODE_ENV;
if (node_env != "raw_install") {
    let files = ["karma.conf.js", "readme.md", "tests.webpack.ts", "tsconfig.json", "webpack.common.ts", "webpack.config.ts", "webpack.test.ts"];
    let source;
    let target = path.join(__dirname, "../../");
    
    //region COPY CONFIGURATION FILES 
    files.forEach(function(fileName) {
        copyFile(fileName);
    }, this);
    
    function copyFile(fileName, newFileName) {
        source = path.join(__dirname, fileName);
        let dest = path.join(target, newFileName ? newFileName : fileName);
        let readStream = fs.createReadStream(source);
    
        readStream.once('error', (err) => {
            console.log(err);
        });
    
        readStream.once('end', () => {
            console.log(`File copying finished${chalk.green('(' + fileName + ')')}`);
        });
    
        readStream.pipe(fs.createWriteStream(dest));
    }
    //endregion
    
    //region COPY SOURCE FILES
    ncp(path.join(__dirname, "src"), path.join(target, "src"));
    console.log(`Folder copying finished${chalk.green('(src)')}`);
    ncp(path.join(__dirname, "test"), path.join(target, "test"));
    console.log(`Folder copying finished${chalk.green('(test)')}`);
    //endregion
    
    //region COPY PACKAGE JSON WITH LATEST DEPENDENCIES
    var sourceFile = require('./package.json');
    var targetFile = require('./package_eject.json');
    
    targetFile.version = sourceFile.version;
    targetFile.name = sourceFile.name;
    targetFile.devDependencies = sourceFile.devDependencies;
    targetFile.dependencies = sourceFile.dependencies;
    delete targetFile.dependencies["ncp"];
    delete targetFile.dependencies["chalk"];
    
    fs.writeFileSync('package_eject.json', JSON.stringify(targetFile, null, 2));
    copyFile("package_eject.json", "package.json");
    console.log(`${chalk.yellow('package.json')} file updated`);
    //endregion
    
    //region DELETE TEMPLATE PACKAGE JSON FILE TO PREVENT EJECTING ON FUTURE INSTALLS
    fs.unlinkSync('./package.json');
    //endregion
    
    console.log(chalk.blue('Template eject finished!'));
    console.log(chalk.blue(`You can remove ${chalk.yellow('vertice-frontend-template')} from dependencies now if it exists`));
} else {
    console.log(chalk.blue('Dependencies installation finished!'));
}