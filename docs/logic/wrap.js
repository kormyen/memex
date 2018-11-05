function Wrap()
{
  this.database = null;
  this.keys = null;

  this.install = function(data)
  {
    this.database = new Indental(data).parse();
    this.keys = Object.keys(this.database);
  }

  this.start = function(data)
  {
    return new Promise(function(resolve, reject) 
    {
      let commaSplit = function(data)
      {
        if (data !== undefined)
        {
          var result = data.split(",");
          for (var c = 0; c < result.length; c++)
          {
            result[c] = result[c].trim().toLowerCase();
          }
          return result;
        }
        return data;  
      }

      let objectSplit = function(data)
      {
        if (typeof data == 'object')
        {
          for (let o = 0; o < data.length; o++)
          {
            if (data[o].substr(0,2) == '> ')
            {
              data[o] = data[o].substr(2,data[o].length-1);
            }
          }
        }
        return data;
      }

      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++)
      {
        let entry = data[keys[i]];

        entry.AUTH = commaSplit(entry.AUTH);
        entry.TAGS = commaSplit(entry.TAGS);
        entry.TYPE = commaSplit(entry.TYPE);
        entry.PROJ = commaSplit(entry.PROJ);

        entry.LINK = objectSplit(entry.LINK);
        entry.FILE = objectSplit(entry.FILE);

        data[keys[i]].DIID = i;
      }
      resolve(data);
    });
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
      for (let i = 0; i < this.keys.length; i++)
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
        let tagRequest = decodeURI(splitTarget[1]);
        for (let i = 0; i < this.keys.length; i++) 
        {
          let value = this.database[this.keys[i]];
          if (typeof value.TAGS !== 'undefined')
          {
            for (let t = 0; t < value.TAGS.length; t++)
            {
              if (value.TAGS[t] == tagRequest)
              {
                tempDatabase[this.keys[i]] = this.database[this.keys[i]];
              }
            }
          }
        }
      }
      if (splitTarget[0] == 'proj')
      {
        // PROJECT
        let projectRequest = decodeURI(splitTarget[1]);
        for (let i = 0; i < this.keys.length; i++) 
        { 
          let value = this.database[this.keys[i]];
          if (typeof value.PROJ !== 'undefined')
          {
            for (let p = 0; p < value.PROJ.length; p++)
            {
              if (value.PROJ[p] == projectRequest)
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
        let typeRequest = decodeURI(splitTarget[1]);
        for (let i = 0; i < this.keys.length; i++) 
        { 
          let value = this.database[this.keys[i]];
          if (typeof value.TYPE !== 'undefined')
          {
            if (typeof value.TYPE == 'object')
            {
              // This entry has multiple types
              for (let t = 0; t < value.TYPE.length; t++)
              {
                if (value.TYPE[t] == typeRequest)
                {
                  tempDatabase[this.keys[i]] = this.database[this.keys[i]];
                }
              }
            }
            else
            {
              // This entry has a single type
              if (value.TYPE == typeRequest)
              {
                tempDatabase[this.keys[i]] = this.database[this.keys[i]];
              }
            }
          }
        }
      }
      else if (splitTarget[0] == 'done')
      {
        // DONE
        let doneValue = decodeURI(splitTarget[1]);
        for (let i = 0; i < this.keys.length; i++) 
        { 
          let value = this.database[this.keys[i]];
          if (doneValue == 'true')
          {
            // true
            if (typeof value.DONE !== 'undefined')
            {
              if (value.DONE == 'true')
              {
                tempDatabase[this.keys[i]] = this.database[this.keys[i]];
              }
            }
          }
          else
          {
            // false
            if (typeof value.DONE === 'undefined')
            {
              tempDatabase[this.keys[i]] = this.database[this.keys[i]];
            }
            else if (value.DONE == false)
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
      done: 0
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
        let count = 0;
        for (var t = 0; t < db[dbKeys[i]].TERM.length; t++)
        {
          if (db[dbKeys[i]].TERM[t].substr(0,2) == '> ')
          {
            count++;
          }
        }

        stats.terms += count;
      }

      // DONE
      if (typeof db[dbKeys[i]].DONE !== 'undefined')
      {
        if (db[dbKeys[i]].DONE == 'true')
        {
          stats.done ++;
        } 
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

  this.commaSplit = function(data)
  {
    if (data !== undefined)
    {
      var result = data.split(",");
      for (var t = 0; t < result.length; t++)
      {
        result[t] = result[t].trim().toLowerCase();
      }
      return result;
    }
    return data;
  }
}