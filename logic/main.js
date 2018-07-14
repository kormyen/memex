this.DB = new Indental(DATABASE.memex).parse();
let keys = Object.keys(DB);
let page = 0;
let lastEntry = -1;
let postPerPage = 1000;

function Main()
{
	console.log(DB);

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
}

function displayEntries(db)
{
    let entries = ``;
    page += postPerPage;

	var i = lastEntry+1;
	var value;
	while (i < Math.min(keys.length, page)) 
	{
	    value = db[keys[i]];

    	// ENTRY
	    entries += `<div class="grid-item">`;
	    entries += `${keys[i].toProperCase()}`;

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
			entries += `<div id="link"><a href="${String(value.LINK)}" id="${idUrl}">${extractRootDomain(value.LINK)}</a></div>`;
		}

		// TYPE
		if (typeof value.TYPE !== 'undefined')
		{
			entries += `<div id="type">`;
			if (value.TYPE == 'article')
			{
				entries += `<i class="far fa-newspaper"></i>`;
			}
			else if (value.TYPE == 'podcast')
			{
				entries += `<i class="fas fa-podcast"></i>`;
			}
			else if (value.TYPE == 'video')
			{
				entries += `<i class="fas fa-tv"></i>`;
			}
			else if (value.TYPE == 'list')
			{
				entries += `<i class="fas fa-file-alt"></i>`;
			}
			else if (value.TYPE == 'book')
			{
				entries += `<i class="fas fa-book-open"></i>`;
			}
			else if (value.TYPE == 'game')
			{
				entries += `<i class="fas fa-gamepad"></i>`;
			}
			else if (value.TYPE == 'service')
			{
				entries += `<i class="fas fa-server"></i>`;
			}
			else if (value.TYPE == 'lecture')
			{
				entries += `<i class="fas fa-chalkboard-teacher"></i>`;
			}
			else if (value.TYPE == 'quote')
			{
				entries += `<i class="fas fa-comment"></i>`;
			}
			else if (value.TYPE == 'tool')
			{
				entries += `<i class="fas fa-wrench"></i>`;
			}
			else if (value.TYPE == 'music')
			{
				entries += `<i class="fas fa-music"></i>`;
			}
			 
			entries += `</div>`;
		}

		// TAGS
		if (typeof value.TAGS !== 'undefined')
		{
			entries += `<div id="tags">${value.TAGS.toLowerCase()}</div>`;
		}

		// NOTE
		if (typeof value.NOTE !== 'undefined')
		{
			entries += `<div id="note">NOTE: ${value.NOTE}</div>`;
		}

		// QUOTE
		if (typeof value.QOTE !== 'undefined')
		{
			entries += `<div id="quote">QUOTE: ${value.QOTE}</div>`;
		}

		// TERM
		if (typeof value.TERM !== 'undefined')
		{
			entries += `<div id="term">TERM(S): ${value.TERM}</div>`;
		}

		entries += `</div>`;

        lastEntry = i;
        i += 1;
	}

    entries += doPagination();
    return entries;
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