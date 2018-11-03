function Nav()
{
  this.container = null;

  this.install = function(container)
  {
    this.container = container;
  }

  this.display = function(value)
  {
    let navContent = ``;
    if (window.showAdd !== undefined && window.showAdd)
    {
      // ADD
      navContent += `<div class="nav-itemgroup">`;
      navContent += `<a href='#add' class="nav-item">`;
      navContent += `<b>a</b>dd`;
      navContent += `</a>`;
      navContent += `</div>`;
    }

    // TOTAL
    navContent += `<div class="nav-itemgroup">`;
    navContent += `<a href='#' class="nav-item">`;
    navContent += `<div class="nav-itemcount">${value.total}</div>`;
    navContent += `<i title="all" class="nav-itemicon fas fa-asterisk"></i>`;
    navContent += `</a>`;
    navContent += `</div>`;

    // DONE
    if (SETTINGS.SHOWDONE)
    {
      navContent += `<div class="nav-itemgroup">`;
      navContent += `<a href='#done-true' class="nav-item">`;
      navContent += `<div class="nav-itemcount">${value.done}</div>`;
      navContent += `<i title="done" class="nav-itemicon ${main.util.getIcon('true')}"></i>`;
      navContent += `</a>`;
      navContent += `<a href='#done-false' class="nav-item">`;
      navContent += `<div class="nav-itemcount">${value.total - value.done}</div>`;
      navContent += `<i title="to do" class="nav-itemicon ${main.util.getIcon('false')}"></i>`;
      navContent += `</a>`;
      navContent += `</div>`;
    }

    navContent += `<div class="nav-itemgroup">`;
    for (let ty = 0; ty < Math.min(value.types.length, SETTINGS.STATSNUMTYPE); ty++) 
    {
      const type = value.types[ty][0];
      const count = value.types[ty][1];
      const icon = main.util.getIcon(type);
      navContent += `<a href='#type-${type}' class="nav-item">`;
      navContent += `<div class="nav-itemcount">${count}</div>`;
      navContent += `<i title="${type}" class="nav-itemicon ${icon}"></i>`;
      navContent += `</a>`;
    }
    navContent += `</div>`;

    // TERM
    navContent += `<div class="nav-itemgroup">`;
    if (value.terms > 0)
    {
      navContent += `<a href='#term' class="nav-item">`;
      navContent += `<div class="nav-itemcount">${value.terms}</div>`;
      navContent += `<i title="terms" class="nav-itemicon fas fa-ribbon"></i>`;
      navContent += `</a>`;
    }
    navContent += `</div>`;

    // TAGS
    navContent += `<div class="nav-itemgroup">`;
    if (value.tags.length > 0)
    {
      navContent += `<div class="nav-tagcontainer">`;
      navContent += `<i title="tags" class="nav-tagicon fas fa-tag"></i>`;
      for (var t = 0; t < Math.min(value.tags.length, SETTINGS.STATSNUMTAGS); t++) 
      {
        navContent += `<a class="nav-tag" href='#tag-${value.tags[t][0]}'>`;
        navContent += `<div class="nav-tagcount">${value.tags[t][1]}</div>`;
        navContent += `<div class="nav-taglabel">${value.tags[t][0]}</div>`;
        navContent += `</a>`;
      }
      navContent += `</div>`;
    }
    navContent += `</div>`;
    this.container.innerHTML = navContent;
  }
}