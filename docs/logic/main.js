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

  this.timeStore = Date.now();
  this.curTime = null;

  var parent = this;

  this.install = function()
  {
    this.util = new Util();
    this.database = new Wrap();
    // this.database.install(DATABASE);
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
  }

  this.timediff = function(label)
    {
      this.curTime = Date.now();
      console.log((this.curTime - this.timeStore) + ' ms to ' + label);
      this.timeStore = this.curTime;
    }

  this.start = function()
  {
    this.timediff('call start');
    this.database.start(new Indental(DATABASE).parse())
    .then((db) => {
      this.timediff('process db');
      return this.grid.buildAllArticles(db);
    })
    .then((html) => {
      this.timediff('build html');
      document.querySelector('main').innerHTML = html;
      this.timediff('render html');
    })
    .catch((error) => {
      console.log('ERROR:', error);
    })
    // this.load(window.document.location.hash);
    // this.nav.display(this.db.stats());
  }

  this.load = function(target)
  {
    lightbox.close();

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
      // this.db.filter(this.queryCur)
      //   .then(function(results){ 
      //     // Map our array of entries to
      //     // an array of template promises.
      //     // This makes sure they all template in parallel.
      //     return results.map(this.grid.templateEntry)
      //       .reduce(function(sequence, chapterPromise) {
      //         // Use reduce to chain the promises together,
      //         // adding content to the page for each entry
      //         return sequence.then(function() {
      //           // Wait for everything in the sequence so far,
      //           // then wait for this template to arrive.
      //           return chapterPromise;
      //         }).then(function(article) {
      //           this.grid.addHtmlToPage(article.html);
      //         });
      //       }, Promise.resolve());  
      //   })
      //   .then(function() { console.log("done"); })
      //   .catch(function(err) { console.log("error: " + err.message); });
      //   .then(function() { console.log("stop loading anim"); })
      
      // see: https://developers.google.com/web/fundamentals/primers/promises#whats-all-the-fuss-about

      // this.db.filter(this.queryCur)
      //   .then(function(results){
      //     return this.grid.templateEntry(results[0]);
      //   }).then(function(article) {
      //     this.grid.addHtmlToPage(article.html);
      //   }).catch(function() {
      //     console.log("error: " + err.message);
      //   }).then(function() {
      //     console.log("stop loading anim");
      //   })

      // see: https://developers.google.com/web/fundamentals/primers/promises#whats-all-the-fuss-about

      this.grid.display(this.db.filter(this.queryCur));
    }
  }
}

window.addEventListener("hashchange", function() { main.load(window.document.location.hash); });