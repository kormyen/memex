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
    this.database.start()
    .then((db) => {
      seer.note('process db');
      
      this.resetPage();
      this.updateQuery();

      seer.note('prep query');
      return this.database.filter(db, this.queryCur);
    })
    .then((filtered) => {
      seer.note('filter db');
      return this.grid.buildAllArticles(filtered);
    })
    .then((html) => {
      seer.note('build html');

      let stats = this.database.stats();
      seer.note('calc stats');

      this.nav.display(stats);
      seer.note('render stats');

      this.grid.newDisplay(html);
      // seer.note('render html');

      seer.report();

      document.querySelector('.loading-wave').style.display = 'none';
    })
    .catch((error) => {
      console.log('ERROR:', error);
    })
    // this.load(window.document.location.hash);
    // 
  }

  this.load = function()
  {

  }

//   this.load = function(target)
//   {
//     lightbox.close();
//     document.activeElement.blur();
//     if (this.queryCur !== 'add')
//     {
//       this.queryPrev = this.queryCur;
//     }

//     target = target.substr(0,1) === "#" ? target.substr(1,target.length-1) : target;
//     this.queryCur = target.trim();

//     if (window.location.hash != this.queryCur)
//     {
//       window.location.hash = this.queryCur;
//     }

//     if (this.queryCur === 'add')
//     {
//       if (window.showAdd != undefined && window.showAdd)
//       {
//         this.add.show();
//       }
//       else
//       {
//         window.location.hash = this.queryPrev;
//       }
//     }
//     else
//     {
//       this.grid.display(this.db.filter(this.queryCur));
//     }
//   }
}

// window.addEventListener("hashchange", function() { main.load(window.document.location.hash); });