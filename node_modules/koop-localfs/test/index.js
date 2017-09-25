const test = require('tape')
const nativeFs = require('fs')
const Filesystem = require('../')
const pathModule = require('path')

const root = pathModule.join(__dirname, 'files')
const fs = new Filesystem({rootDir: root})

test('Resolving a relative path', (t) => {
  const path = fs.realpathSync('foo/bar')
  t.equal(path, pathModule.join(root, '/foo/bar'))
  t.end()
})

test('Resolving an absolute path', (t) => {
  const path = fs.realpathSync('/foo/bar')
  t.equal(path, pathModule.join(root, '/foo/bar'))
  t.end()
})

test('Ending a write stream properly', (t) => {
  const writeStream = fs.createWriteStream('test.txt')
  writeStream.end('foobar')
  writeStream.on('finish', () => {
    const filePath = fs.realpathSync('test.txt')
    const written = nativeFs.readFileSync(filePath).toString()
    t.equal(written, 'foobar')
    try {
      nativeFs.unlinkSync(filePath)
    } catch (e) {
      console.error('could not unlink test file at', filePath)
    }
    t.end()
  })
})
