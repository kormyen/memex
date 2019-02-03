"use strict";
function Seer()
{
  this.verbose = false
  this.quota = 0;
  this.limbo = false;
  
  this.timeBegin = null;
  this.timeRef = null;
  this.book = null;

  this.install = function(verbose, quota)
  {
    this.verbose = verbose;
    this.quota = quota;
  	this.rebirth();
  }

  this.rebirth = function()
  {
    this.timeBegin = Date.now();
    this.timeRef = Date.now();
    this.book = [];
    this.limbo = false;
  }

  this.note = function(desc)
  {
    if (this.limbo)
    {
      this.rebirth();
    }

    var entry = [desc, (Date.now() - this.timeRef)];
    this.book.push(entry);
    if (this.verbose)
    {
      console.log(entry[1] + ' ms to ' + entry[0]);
    }
    this.timeRef = Date.now();
  }

  this.report = function()
  {
    let total = (Date.now() - this.timeBegin);
    console.log('Completed in: ' + total + ' ms');
    if (this.quota > 0)
    {
      this.book.sort(function(a, b)
      {
        return a[1] + b[1];
      });
      for (var i = 0; i < Math.min(this.quota, this.book.length); i++)
      {
        let percentage = ((this.book[i][1] / total) * 100).toFixed(1);
        console.log(percentage + ' % of time spent on: ' + this.book[i][0]);
      }
    }
    console.log('_____________________________');
    this.limbo = true;
  }
}