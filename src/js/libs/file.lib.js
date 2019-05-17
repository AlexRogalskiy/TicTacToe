'use strict';

/**
 * Module dependencies
 */
import fs from 'mz/fs';
import path from 'path';

import { isNullOrUndefined, isString, isArray, isObject, isPositive } from './helpers.lib';
import Logger from './logger.lib';

/**
 *  returns collection of files in directory by extension
 */
const async findFilesRecursive = (extension, dirPath): string => {
  let files = await fs.readdir(dirPath)
  let results = await Promise.all(files.map(async file => {
    const filePath = path.join(dirPath, file)
    // handle is match
    if (file.endsWith(`.${extension}`)) {
      return [filePath]
    }
    // handle dir
    const stat = await fs.stat(filePath)
    if (stat.isDirectory()) {
      return findFilesRecursive(extension, filePath)
    }
    // not match
    return []
  }))
  const result = []
  for (const arr of results) {
    result.push(...arr)
  }
  return result
};

//console.log(getFiles('path/to/dir'))
const getFiles = (dir, files_): Array<any> => {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
};


//walkSync('path/to/root/dir', function(filePath, stat) {
//    // do something with "filePath"...
//});
let walk = function walk_(currentDirPath, callback) {
    var fs = require('fs'),
        path = require('path');
    fs.readdir(currentDirPath, function (err, files) {
        if (err) {
            throw new Error(err);
        }
        files.forEach(function (name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walk_(filePath, callback);
            }
        });
    });
};

export {
	findFilesRecursive
);