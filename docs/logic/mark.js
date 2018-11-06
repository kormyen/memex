function Mark()
{
  this.timeBegin = null;
  this.timeStore = null;
  this.curTime = null;
  this.specialDesc = null;
  this.specialTime = null;

  this.install = function()
  {
  	this.timeBegin = Date.now();
    this.timeStore = Date.now();
  }

  this.note = function(desc)
  {
    this.curTime = Date.now();
    console.log((this.curTime - this.timeStore) + ' ms to ' + desc);
    this.timeStore = this.curTime;
  }

  this.special = function(desc)
  {
    this.specialDesc = desc;
    this.specialTime = Date.now() - this.timeStore;
    this.note(desc);
  }

  this.complete = function()
  {
    let total = (Date.now() - this.timeBegin);
    console.log('TOTAL TIME: ' + total + ' ms');
    if (this.specialDesc != null)
    {
      console.log(((this.specialTime / total)*100).toFixed(0) + ' % of time spent on: ' + this.specialDesc);
    }
  }
}