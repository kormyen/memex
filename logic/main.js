function Main()
{
  this.database = null;
  this.keys = null;
  this.page = 0;
  this.lastEntry = -1;
  this.postPerPage = 1000;
  this.msnry = null;
  this.grid = null;

  this.install = function()
  {
    this.database = new Indental(DATABASE).parse();
    this.keys = Object.keys(this.database);
    this.processDatabase();

    this.grid = document.getElementById("grid");
    this.msnry = new Masonry( '.grid', {
        itemSelector: '.grid-item',
        columnWidth: 350,
        gutter: 20,
        fitWidth: true,
        transitionDuration: 0,
      });
  }

  this.start = function()
  {
    this.load(window.document.location.hash == "" ? 'Home' : window.document.location.hash);
  }

  this.load = function(target = "Home")
  {
    target = target.substr(0,1) == "#" ? target.substr(1,target.length-1) : target
    target = target.trim() == "" ? "home" : target

    if(target === '')
    {
      window.history.replaceState(undefined, undefined, "#" + target)
    }
    else 
    {
      // window.location.hash = target.to_url()
      window.location.hash = target;
    }

    if (target == 'home')
    {
      console.log('home');

      this.displayEntries(this.database);
      this.msnry.layout();

      console.log(this.database);
    }
    else
    {
      var splitTarget = target.split("-");
      if (splitTarget[0] == 'tag')
      {
        console.log('tag-'+splitTarget[1]);

        var tempDatabase = {}
        for (i = 0; i < this.keys.length; i++) 
        { 
          let value = this.database[this.keys[i]];
          if (typeof value.TAGS !== 'undefined')
          {
            for (var t = 0; t < value.TAGS.length; t++)
            {
              if (value.TAGS[t] == splitTarget[1])
              {
                tempDatabase[this.keys[i]] = this.database[this.keys[i]];
              }
            }
          }
        }
        console.log(tempDatabase);

        this.grid.innerHTML = '';
        this.displayEntries(tempDatabase);
        this.msnry.layout();
      }
      else if (splitTarget[0] == 'type')
      {
        console.log('type');
      }
    }
  }

  this.processDatabase = function()
  {
    var tempDatabase = this.database;
    var dbKeys = Object.keys(this.database);

    for (i = 0; i < dbKeys.length; i++) 
    { 
      let value = this.database[dbKeys[i]];
      if (typeof value.TAGS !== 'undefined')
      {
        var tags = value.TAGS.split(",");

        for (var t = 0; t < tags.length; t++)
        {
          tags[t] = tags[t].trim().toLowerCase();
        }

        this.database[dbKeys[i]].TAGS = tags;
      }
    }
  }

  this.missing = function(target)
  {
    console.warn(`Could not find ${target}.`);
    //this.el.innerHTML = `<page><p>Could not find page ${target}</p></page>`;
  }

  this.touch = function(target)
  {
    var link = target.getAttribute("href") ? target.getAttribute("href") : target.parentNode.getAttribute("href")

    if(!link){ return; }
    if(link.substr(0,1) != "#"){ return; }

    this.load(link.substr(1,link.length-1));
  }

  document.addEventListener('mouseup',  (e)=>{ this.touch(e.target); e.preventDefault(); });

  this.displayEntries = function(db)
  {
    var dbKeys = Object.keys(db);

    this.page += this.postPerPage;
    var i = this.lastEntry + 1;
    while (i < Math.min(dbKeys.length, this.page)) 
    {
      this.buildEntry(db, dbKeys[i]);
      this.lastEntry = i;
      i += 1;
    }
    // entries += this.doPagination();
  }

  this.buildEntry = function(db, key)
  {
    let value = db[key];
    let entry = `<div class="grid-item">`;
    entry += `<div class="title">${key.to_properCase()}</div>`;

    // LINK
    if (typeof value.LINK !== 'undefined')
    {
      var idUrl = "url";
      if (typeof value.SEEN !== 'undefined')
      {
        if (value.SEEN == "true")
        {
          idUrl = "urlseen";
        }
      }
      entry += `<div class="link"><i class="fas fa-link textIcon"></i><a href="${String(value.LINK)}" id="${idUrl}">${this.extractRootDomain(value.LINK)}</a></div>`;
    }

    // TYPE
    if (typeof value.TYPE !== 'undefined')
    {
      entry += `<div id="type">`;
      entry += `<a href='#type:${String(value.TYPE)}'>`;
      if (value.TYPE == 'article')
      {
        entry += `<i class="far fa-newspaper"></i>`;
      }
      else if (value.TYPE == 'podcast')
      {
        entry += `<i class="fas fa-podcast"></i>`;
      }
      else if (value.TYPE == 'video')
      {
        entry += `<i class="fas fa-tv"></i>`;
      }
      else if (value.TYPE == 'list')
      {
        entry += `<i class="fas fa-file-alt"></i>`;
      }
      else if (value.TYPE == 'book')
      {
        entry += `<i class="fas fa-book-open"></i>`;
      }
      else if (value.TYPE == 'game')
      {
        entry += `<i class="fas fa-gamepad"></i>`;
      }
      else if (value.TYPE == 'service')
      {
        entry += `<i class="fas fa-server"></i>`;
      }
      else if (value.TYPE == 'lecture')
      {
        entry += `<i class="fas fa-chalkboard-teacher"></i>`;
      }
      else if (value.TYPE == 'quote')
      {
        entry += `<i class="fas fa-comment"></i>`;
      }
      else if (value.TYPE == 'tool')
      {
        entry += `<i class="fas fa-wrench"></i>`;
      }
      else if (value.TYPE == 'music')
      {
        entry += `<i class="fas fa-music"></i>`;
      }
       
      entry += `</a>`;
      entry += `</div>`;
    }

    // TAGS
    if (typeof value.TAGS !== 'undefined')
    {
      entry += `<div class="tags"><i class="fas fa-tag textIcon"></i>`;
      for (var i = 0; i < value.TAGS.length; i++)
      {
        entry += `<a href=#tag-${value.TAGS[i]}>${value.TAGS[i]}</a>`;
        if (i+1 != value.TAGS.length)
        {
          entry += `, `;
        }
      };
      entry += `</div>`;
    }

    // NOTE
    if (typeof value.NOTE !== 'undefined')
    {
      entry += `<div class="note"><i class="fas fa-sticky-note textIcon"></i>${value.NOTE}</div>`;
    }

    // QUOTE
    if (typeof value.QOTE !== 'undefined')
    {
      entry += `<div class="quote"><i class="fas fa-comment textIcon"></i>${value.QOTE}</div>`;
    }

    // TERM
    if (typeof value.TERM !== 'undefined')
    {
      entry += `<div class="term"><i class="fas fa-ribbon textIcon"></i>${value.TERM}</div>`;
    }

    // PROGRESS
    if (typeof value.PROG !== 'undefined')
    {
      entry += `<div class="prog"><i class="fas fa-clock textIcon"></i>${value.PROG}</div>`;
    }

    entry += `</div>`;

    this.grid.innerHTML += entry;
  }

  // this.doPagination = function()
  // {
  //   return `
  //   <div id="pagination">
  //     <a id="loadmore" onClick="loadMore();">${this.lastEntry < this.keys.length -1 ? `Load more ▼` : ``}</a>
  //   </div>
  //   `
  // }

  // this.loadMore = function()
  // {
  //   pagination.remove();
  //   document.getElementById("content").innerHTML += doJournal(this.database);
  // }

  String.prototype.to_url = function()
  {
    return this.toLowerCase().replace(/ /g,"+").replace(/[^0-9a-z\+]/gi,"").trim();
  }

  String.prototype.to_properCase = function()
  {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  // Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
  this.extractRootDomain = function(url)
  {
    var domain = this.extractHostname(url),
    splitArr = domain.split('.'),
    arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) 
    {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2)
      {
        //this is using a ccTLD
        domain = splitArr[arrLen - 3] + '.' + domain;
      }
    }
    return domain;
  }

  // Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
  this.extractHostname = function(url)
  {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
    }
    else {
      hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }
}

// var detectBackOrForward = function(onBack, onForward)
// {
//   hashHistory = [window.location.hash];
//   historyLength = window.history.length;

//   return function()
//   {
//     var hash = window.location.hash, length = window.history.length;
//     if (hashHistory.length && historyLength == length) {
//       if (hashHistory[hashHistory.length - 2] == hash) {
//         hashHistory = hashHistory.slice(0, -1);
//         onBack();
//       } else {
//         hashHistory.push(hash);
//         onForward();
//       }
//     } else {
//       hashHistory.push(hash);
//       historyLength = length;
//     }
//   }
// };

// window.addEventListener("hashchange", detectBackOrForward(
//   function() { console.log("back"); main.load(); },
//   function() { console.log("forward"); main.load(); }
// ));