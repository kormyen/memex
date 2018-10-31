function Main()
{
  this.db = null;
  this.view = null;
  this.add = null;
  this.write = null;
  this.lightbox = null;

  this.queryCur = '';
  this.queryPrev = '';
  this.queryPrevAdd = '';

  var parent = this;

  this.install = function()
  {
    this.db = new Wrap();
    this.db.install(DATABASE);
    this.view = new View();
    this.view.install();
    this.lightbox = new Lightbox;
    this.lightbox.install();

    if (window.showAdd !== undefined && window.showAdd)
    {
      this.add = new Add();
      this.add.install();
      // var escape = document.getElementById("escape");
      // escape.onclick = function()
      // {
      //   main.add.close();
      // }
    }
  }

  this.start = function()
  {
    this.load(window.document.location.hash);
    this.view.stats(this.db.stats());
  }

  this.load = function(target)
  {
    this.lightbox.close();

    document.activeElement.blur();
    if (this.queryCur !== 'add')
    {
      this.queryPrev = this.queryCur;
    }

    target = target.substr(0,1) === "#" ? target.substr(1,target.length-1) : target;
    this.queryCur = target.trim();

    if (window.location.hash != this.queryCur)
    {
      window.location.hash = this.queryCur;
    }

    if (this.queryCur === 'add')
    {
      if (window.showAdd != undefined && window.showAdd)
      {
        this.add.show();
      }
      else
      {
        window.location.hash = this.queryPrev;
      }
    }
    else
    {
      this.view.display(this.db.filter(this.queryCur));
    }
  }
}

window.addEventListener("hashchange", function() { main.load(window.document.location.hash); });