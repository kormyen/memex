function Main()
{
  this.util = null;
  this.wrap = null;
  this.articles = null;
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
    this.wrap = new Wrap();
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

  this.start = function()
  {
    this.articles = this.wrap.start(DATABASE);
    seer.note('process db');

    let stats = this.wrap.stats(this.articles);
    seer.note('calc stats');
    this.nav.display(stats);
    seer.note('render stats');

    this.load();
  }

  this.test = function()
  {
    this.grid.clear();
    document.querySelector('.loading-wave').style.display = 'inline-block';
    setTimeout(this.load(), 1000);
  }

  this.load = function()
  {
    // this.grid.clear();
    // document.querySelector('.loading-wave').style.display = 'inline-block';

    this.resetPage();
    this.updateQuery();

    let filtered = this.wrap.filter(this.queryCur, this.articles);
    seer.note('filter db');
    
    let html = this.grid.buildAllArticles(filtered)
    seer.note('build html');

    this.grid.display(html);
    seer.report();

    document.querySelector('.loading-wave').style.display = 'none';
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
}

window.addEventListener("hashchange", function() { main.test(); });