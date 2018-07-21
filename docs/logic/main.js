function Main()
{
  // REFERENCE
  this.db = null;
  this.view = null;

  this.install = function()
  {
    this.db = new Wrap(DATABASE);
    this.db.install();

    this.view = new View();
    this.view.install();
  }

  this.start = function()
  {
    this.load(window.document.location.hash == "" ? 'home' : window.document.location.hash);
    this.view.doStats(this.db.getStats());
  }

  this.load = function(target = "home")
  {
    target = target.substr(0,1) == "#" ? target.substr(1,target.length-1) : target
    target = target.trim() == "" ? "home" : target

    if (target === '')
    {
      window.history.replaceState(undefined, undefined, "#" + target)
    }
    else 
    {
      window.location.hash = target;
    }

    var entries = this.db.filter(target);
    this.view.doEntries(entries);
  }
}

window.addEventListener("hashchange", navigate);

function navigate()
{
  main.load(window.document.location.hash);
}