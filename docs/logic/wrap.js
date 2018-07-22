function Wrap()
{
  this.database = null;
  this.keys = null;

  this.install = function()
  {
    this.database = new Indental(DATABASE).parse();
    this.keys = Object.keys(this.database);
    this.process();
  }

  this.process = function()
  {
    for (i = 0; i < this.keys.length; i++) 
    { 
      let value = this.database[this.keys[i]];

      // TAGS
      if (typeof value.TAGS !== 'undefined')
      {
        var tags = value.TAGS.split(",");

        for (var t = 0; t < tags.length; t++)
        {
          tags[t] = tags[t].trim().toLowerCase();
        }

        this.database[this.keys[i]].TAGS = tags;
      }

      // TERMS
      if (typeof value.TERM !== 'undefined')
      {
        let termRunic = new Runic(value.TERM).raw;
        let formattedTerms = [];

        for (var t = 0; t < termRunic.length; t++) 
        {
          term = termRunic[t].substr(2).split(':');
          for (var e = 0; e < term.length; e++) 
          {
            term[e] = term[e].trim();
          }
          formattedTerms.push(term);
        }

        this.database[this.keys[i]].TERM = formattedTerms;
      }

      this.database[this.keys[i]].DIID = i;
    }
  }

  this.filter = function(target)
  {
    var tempDatabase = {};
    if (target == '')
    {
      tempDatabase = this.database;
    }
    else if (target == 'term')
    {
      for (i = 0; i < this.keys.length; i++) 
      { 
        let value = this.database[this.keys[i]];
        if (typeof value.TERM !== 'undefined')
        {
          tempDatabase[this.keys[i]] = this.database[this.keys[i]];
        }
      }
    }
    else
    {
      var splitTarget = target.split("-");
      if (splitTarget[0] == 'tag')
      {
        // TAG
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
      }
      else if (splitTarget[0] == 'type')
      {
        // TYPE
        var tempDatabase = {}
        for (i = 0; i < this.keys.length; i++) 
        { 
          let value = this.database[this.keys[i]];
          if (typeof value.TYPE !== 'undefined')
          {
            if (value.TYPE == splitTarget[1])
            {
              tempDatabase[this.keys[i]] = this.database[this.keys[i]];
            }
          }
        }
      }
    }
    return tempDatabase;
  }

  this.stats = function(db = this.database)
  {
    // CALCULATE
    let dbKeys = Object.keys(db);
    var stats = 
    {
      total: this.keys.length,
      types: {},
      tags: {},
      terms: 0,
    };

    for (var i = 0; i < dbKeys.length; i++)
    {
      // TYPE
      if (typeof db[dbKeys[i]].TYPE !== 'undefined')
      {
        if (typeof stats.types[db[dbKeys[i]].TYPE] !== 'undefined')
        {
          stats.types[db[dbKeys[i]].TYPE] ++;
        }
        else
        {
          stats.types[db[dbKeys[i]].TYPE] = 1;
        }
      }

      // TAGS
      if (typeof db[dbKeys[i]].TAGS !== 'undefined')
      {
        for (var t = 0; t < db[dbKeys[i]].TAGS.length; t++) 
        {
          if (typeof stats.tags[db[dbKeys[i]].TAGS[t]] !== 'undefined')
          {
            stats.tags[db[dbKeys[i]].TAGS[t]] ++;
          }
          else
          {
            stats.tags[db[dbKeys[i]].TAGS[t]] = 1;
          }
        }
      }

      // TERM
      if (typeof db[dbKeys[i]].TERM !== 'undefined')
      {
        stats.terms += db[dbKeys[i]].TERM.length;
      }
    } 

    // SORT TYPES, TAKE TOP X
    // Create items array
    var typeItems = Object.keys(stats.types).map(function(key) 
    {
      return [key, stats.types[key]];
    });
    // Sort the array based on the second element
    typeItems.sort(function(first, second) 
    {
      return second[1] - first[1];
    });
    stats.types = typeItems;

    // SORT TAGS, TAKE TOP X
    // Create items array
    var tagItems = Object.keys(stats.tags).map(function(key) 
    {
      return [key, stats.tags[key]];
    });
    // Sort the array based on the second element
    tagItems.sort(function(first, second) 
    {
      return second[1] - first[1];
    });
    stats.tags = tagItems;

    return stats;
  }
}