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
    
    view += `<div id="content">${displayEntries(DB)}</div>`;

    html.innerHTML = view;
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
    	var idEntry = "entry";
	    if (typeof value.REVI !== 'undefined')
		{
			if (value.REVI == "true")
			{
				idEntry = "entryImportant";
			}
		}

	    entries += `<div id="${idEntry}">`;
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