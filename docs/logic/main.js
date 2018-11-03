function Main()
{
  this.db = null;
  this.view = null;
  this.add = null;
  this.write = null;

  this.queryCur = '';
  this.queryPrev = '';
  this.queryPrevAdd = '';

  var parent = this;

  this.install = function()
  {
    this.db = new Wrap();
    this.db.install(DATABASE);
    this.view = new View();
    this.view.install(
      document.querySelector('nav'), 
      document.querySelector('.container'),
      document.querySelector('main'),
      document.querySelector('.page-overlay'));

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
      //     return results.map(this.view.templateEntry)
      //       .reduce(function(sequence, chapterPromise) {
      //         // Use reduce to chain the promises together,
      //         // adding content to the page for each entry
      //         return sequence.then(function() {
      //           // Wait for everything in the sequence so far,
      //           // then wait for this template to arrive.
      //           return chapterPromise;
      //         }).then(function(article) {
      //           this.view.addHtmlToPage(article.html);
      //         });
      //       }, Promise.resolve());  
      //   })
      //   .then(function() { console.log("done"); })
      //   .catch(function(err) { console.log("error: " + err.message); });
      //   .then(function() { console.log("stop loading anim"); })
      
      // see: https://developers.google.com/web/fundamentals/primers/promises#whats-all-the-fuss-about

      // this.db.filter(this.queryCur)
      //   .then(function(results){
      //     return this.view.templateEntry(results[0]);
      //   }).then(function(article) {
      //     this.view.addHtmlToPage(article.html);
      //   }).catch(function() {
      //     console.log("error: " + err.message);
      //   }).then(function() {
      //     console.log("stop loading anim");
      //   })

      // see: https://developers.google.com/web/fundamentals/primers/promises#whats-all-the-fuss-about

      this.view.display(this.db.filter(this.queryCur));
    }
  }
}

window.addEventListener("hashchange", function() { main.load(window.document.location.hash); });