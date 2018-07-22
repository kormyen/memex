function Main()
{
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
    this.load(window.document.location.hash);
    this.view.stats(this.db.stats());
  }

  this.load = function(target)
  {
    target = target.substr(0,1) == "#" ? target.substr(1,target.length-1) : target;
    target = target.trim();
    var entries = this.db.filter(target);
    this.view.display(entries);
  }
}

window.addEventListener("hashchange", function() { main.load(window.document.location.hash); });