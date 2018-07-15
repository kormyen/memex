this.DB = new Indental(DATABASE.memex).parse();
let keys = Object.keys(DB);
let page = 0;
let lastEntry = -1;
let postPerPage = 1000;

function Main()
{
    let view = ``;
    let html = document.body;
    
    view += `<div class="grid">`;
    view += `${displayEntries(DB)}`;
    view += `</div>`;

    html.innerHTML = view;

    var msnry = new Masonry( '.grid', {
		itemSelector: '.grid-item',
		columnWidth: 350,
		gutter: 20,
		fitWidth: true,
		transitionDuration: 0,
	});

	console.log(DB);
}

function displayEntries()
{
    let entries = ``;
    page += postPerPage;
	var i = lastEntry + 1;
	while (i < Math.min(keys.length, page)) 
	{
	    entries += buildEntry(i);
        lastEntry = i;
        i += 1;
	}

    entries += doPagination();
    return entries;
}

function buildEntry(id)
{
	var value = this.DB[keys[id]];

	var entry = `<div class="grid-item">`;
    entry += `<div class="title">${keys[id].toProperCase()}</div>`;

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
		entry += `<div class="link"><i class="fas fa-link textIcon"></i><a href="${String(value.LINK)}" id="${idUrl}">${extractRootDomain(value.LINK)}</a></div>`;
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
		var  tags = value.TAGS.split(",");
		for (var i = 0; i < tags.length; i++)
		{
			tags[i] = tags[i].trim().toLowerCase();
		}

		this.DB[keys[id]].TAGS = tags;

		entry += `<div class="tags"><i class="fas fa-tag textIcon"></i>`;
		for (var i = 0; i < tags.length; i++)
		{
			entry += `<a href=#tag:${tags[i]}>${tags[i]}</a>`;
			if (i+1 != tags.length)
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

	return entry;
}

function doPagination()
{
    return `
    <div id="pagination">
        <a id="loadmore" onClick="loadMore();">${lastEntry < keys.length -1 ? `Load more ▼` : ``}</a>
    </div>
    `
}

function loadMore()
{
    pagination.remove();
    document.getElementById("content").innerHTML += doJournal(DB);
}

String.prototype.toProperCase = function () 
{
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
function extractHostname(url) 
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

// Source: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
function extractRootDomain(url) 
{
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}