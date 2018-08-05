function Main()
{
  this.db = null;
  this.view = null;
  this.add = null;
  this.write = null;
  this.queryPrev = '';
  this.queryCur = '';

  this.install = function()
  {
    this.db = new Wrap(DATABASE);
    this.db.install();
    this.view = new View();
    this.view.install();
    this.add = new Add();
    this.add.install();
    this.write = new Write();
    this.write.install();

    var escape = document.getElementById("escape");
    escape.onclick = function()
    {
      main.load(main.queryPrev);
    }
  }

  this.start = function()
  {
    this.load(window.document.location.hash);
    this.view.stats(this.db.stats());
  }

  this.load = function(target)
  {
    document.activeElement.blur();
    if (this.queryCur != 'add')
    {
      this.queryPrev = this.queryCur;
    }
    
    target = target.substr(0,1) == "#" ? target.substr(1,target.length-1) : target;
    this.queryCur = target.trim();

    if (window.location.hash != this.queryCur)
    {
      window.location.hash = this.queryCur;
    }

    if (this.queryCur == 'add')
    {
      this.add.show();
    }
    else
    {
      this.view.display(this.db.filter(this.queryCur));
    }
  }
}

window.addEventListener("hashchange", function() { main.load(window.document.location.hash); });