# Koop Local FS
*A filesystem plugin for koop that supports setting a root directory for all actions*

[![npm][npm-img]][npm-url]
[![travis][travis-image]][travis-url]

## Project goal

In order to allow different koop modules to write to local disk without specifying a machine specific absolute path, this module resolves all relative paths to the same base directory. So you can call`koop.fs.createReadStream('foo.txt')` and always know that you can open foo without changing the working directory.

## Usage

### In `default.json`

```json
{
  "filesystem": {
    "local": {
      "rootDir": "/var/koop/files"
    }
  }
}
```

### In `server.js`

```javascript
const config = require('config')
const koop = require('koop')(config)
const LocalFs = require('koop-localfs')

koop.register(LocalFs)
```

## Supported functions

- stat - Get information about a file
- createReadStream: create a readable stream from a file on disk
- createWriteStream: create a writeable stream you can pipe to
- writeFile: write a file to disk
- readFile: read a file from disk
- unlink: delete a file
- mkdir: make a directory
- rmdir: remove an empty directory
- rmdirp: recursively remove a directory and its contents
- realpathSync: resolve the absolute path when given a relative path


[npm-img]: https://img.shields.io/npm/v/koop-localfs.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/koop-localfs
[travis-image]: https://img.shields.io/travis/koopjs/koop-localfs.svg?style=flat-square
[travis-url]: https://travis-ci.org/koopjs/koop-localfs


