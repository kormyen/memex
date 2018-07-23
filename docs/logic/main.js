function Main()
{
  this.db = null;
  this.view = null;
  this.queryPrev = '';
  this.queryCur = '';

  this.install = function()
  {
    this.db = new Wrap(DATABASE);
    this.db.install();
    this.view = new View();
    this.view.install();
  }

  this.start = function()
  {
    this.load(window.document.location.hash);
    this.view.stats(this.db.stats());
  }

  this.load = function(target)
  {
    this.queryPrev = this.queryCur;
    target = target.substr(0,1) == "#" ? target.substr(1,target.length-1) : target;
    this.queryCur = target.trim();

    if (window.location.hash != this.queryCur)
    {
      window.location.hash = this.queryCur;
    }

    if (this.queryCur == 'add')
    {
      this.view.add();
    }
    else
    {
      this.view.display(this.db.filter(this.queryCur));
    }
  }
}

window.addEventListener("hashchange", function() { main.load(window.document.location.hash); });

document.onkeydown = function(evt) 
{
  evt = evt || window.event;
  var isEscape = false;
  
  if ("key" in evt)
  {
    isEscape = (evt.key == "Escape" || evt.key == "Esc");
  }
  else
  {
    isEscape = (evt.keyCode == 27);
  }
  
  if (isEscape)
  {
    if (main.queryCur == 'add')
    {
      main.load(main.queryPrev);
    }
  }
};