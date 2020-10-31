const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.res = '';
  }

  _transform(chunk, encoding, callback) {
    const arr = chunk.toString().split(os.EOL);
    arr.forEach((v, i) => {
      this.res += v;
      if (i === arr.length - 1) {
        return;
      } else {
        this.push(this.res);
        this.res = '';
      }
    })
    callback();
  }

  _flush(callback) {
    callback(null, this.res);
  }
}

module.exports = LineSplitStream;
