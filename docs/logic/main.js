function Main()
{
  this.util = null;
  this.database = null;
  this.grid = null;
  this.nav = null;
  this.add = null;
  this.write = null;

  this.queryCur = '';
  this.queryPrev = '';
  this.queryPrevAdd = '';
  var parent = this;

  this.install = function()
  {
    seer.note('load all js files');

    this.util = new Util();
    this.database = new Wrap();
    this.database.install(DATABASE);
    this.grid = new Grid();
    this.grid.install(
      document.querySelector('main'),
      document.querySelector('.page-overlay'),
      'main',
      'article');
    this.nav = new Nav();
    this.nav.install(document.querySelector('nav'));

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

    seer.note('install main');
  }

  this.resetPage = function()
  {
    lightbox.close();
    document.activeElement.blur();
  }

  this.updateQuery = function()
  {
    let target = window.document.location.hash;
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
  }

  this.start = function()
  {
    this.database.start();
    seer.note('process db');
    this.load();
  }

  this.load = function()
  {
    this.resetPage();
    this.updateQuery();
    seer.note('prep query');

    let filtered = this.database.filter(this.queryCur);
    seer.note('filter db');
    
    this.grid.buildAllArticles(filtered)
    .then((html) =>
    {
      seer.note('build html');

      let stats = this.database.stats();
      seer.note('calc stats');

      this.nav.display(stats);
      seer.note('render stats');

      this.grid.newDisplay(html);
      seer.report();
    });
    document.querySelector('.loading-wave').style.display = 'none';
  }
}

window.addEventListener("hashchange", function() { main.load(); });