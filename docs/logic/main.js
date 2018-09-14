function Main()
{
  this.db = null;
  this.view = null;
  this.add = null;
  this.write = null;
  this.queryCur = '';
  this.queryPrev = '';
  this.queryPrevAdd = '';
  this.theme = new Theme();
  var parent = this;
  const FILELOCATION = 'content/data.ndtl';

  this.install = function()
  {
    this.theme.install();

    var oReq = new XMLHttpRequest();
    oReq.open('GET', FILELOCATION);
    oReq.overrideMimeType("text/plain");
    oReq.addEventListener("load", function() { parent.setup(this.responseText); } );
    oReq.send();
  }

  this.setup = function(data)
  {
    this.db = new Wrap();
    this.db.install(data);
    this.view = new View();
    this.view.install();

    if (window.showAdd != undefined && window.showAdd)
    {
      this.add = new Add();
      this.add.install();
      // var escape = document.getElementById("escape");
      // escape.onclick = function()
      // {
      //   main.add.close();
      // }
    }

    this.start();
  }

  this.start = function()
  {
    this.theme.start();
    this.load(window.document.location.hash);
    this.view.stats(this.db.stats());
  }

  this.load = function(target)
  {
    console.log('main.load: ' + target)

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