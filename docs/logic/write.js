
function Write()
{

  this.install = function()
  {
  }

  this.insert = function(data)
  {
    let position = 5; // get insert position

    let foo = fs.openSync('foo.txt','r+');
    let buf = new Buffer("hello");
    fs.writeSync(foo, buf, 0, buf.length, position);
    fs.close(foo);
  }
}

// fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// }); 