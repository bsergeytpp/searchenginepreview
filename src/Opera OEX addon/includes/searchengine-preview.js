// ==UserScript==
// @name            Searchengine preview
// @author          Lilo von Hanffstengel aka GwenDragon
// @version         1.4.5.1
// @published       2009-09-25 10:28 CEST
// @modified        2014-08-29
// @copyright       (c)2009-now Lilo von Hanffstengel (GwenDragon)
// @license         GPLv3, see http://www.gnu.org/licenses/
// @description     Shows preview of webpage in search engine's results
// @download        https://github.com/GwenDragon/searchenginepreview
// @documentation   https://github.com/GwenDragon/searchenginepreview
// @changelog       https://github.com/GwenDragon/searchenginepreview/blob/master/CHANGELOG
// @include         *ask.com/web*
// @include         *bing.*/search*
// @include         *clusty.com/search*
// @include    		*duckduckgo.com/*
// @include         *ecosia.org/search*
// @include         *forestle.org/search*
// @include         http://search.excite.*/*
// @include         *google.*/*
// @include         *google.*/search*
// @include         *google.*/custom*
// @include         *google.*/images*
// @include         *google.*/linux*
// @include         *google.*/mac*
// @include         *goodsearch.*/search*
// @include         *ixquick.com/do/search*
// @include         http://search.live.*/results*
// @include         *metager.de/meta*
// @include         *metacrawler.de/*
// @include         http://m*.rrzn.uni-hannover.de/meta*
// @include         http://search.msn.*/results*
// @include         *startpage.com/do/search*
// @include         *search.yahoo.*/search*
// @include         *yippy.com/search*
// @include         *yandex.ru/yandsearch*
// @include         *yandex.com/yandsearch*
// @include         *zotspot.*/search/*
// ==/UserScript==


// CHANGELOG
//   see https://github.com/GwenDragon/searchenginepreview/blob/master/CHANGELOG

// KNOWN ISSUES
// * On some searchengines the previews are not shown with activated referrer;
//     please deactiveate referrer in Opera!
// * Not shown previews if redirected links (especially by overture.com) to webpages
// * Slow interaction on some search websites using jQuery or YUI

// THANKSGIVING
// Script inspired by many authors
// Thanks to Edward Ackroyd (c)2006 http://ackroyd.de/googlepreview/
// Thanks to Oliver Roth (from http://erweiterungen.de) for creating the first localizable version with German and English
// Thanks to Carlo Zottmann for inspiring to improve GooglePreview
// Thanks to Nickko (http://my.opera.com/community/forums/topic.dml?id=257506)
// Thanks to Alexs (http://my.opera.com/alexs/) for bug reports and searchengine links: google mac, ask, ixquick
// Thanks to RocknRolf (http://my.opera.com/RocknRolf/) for searchengine: google linux
// Thanks to Heidrun for searchengine: clusty, yippy
// Thanks to Furba, dapxin and others for hint about oAutoPagerize and other pager scripts
// Thanks to Vercingetorix (http://opera-info.de/forum/) for hints about problems of some previews in MetaGer
// Thanks to BigMike (http://opera-info.de/forum/) for DuckDuckGo
// Thanks to David Sottimano (http://www.distilled.net/blog/uncategorized/google-cctlds-and-associated-languages-codes-reference-sheet/) for Googles TLDs
// Thanks to Karsten "kawime" Mehrhoff (†2014) (http://opera-info.de/)
// Thanks to all beta testers


(function GwASePv1342676rt074a4711() {
	var ENABLE_IMAGE_INSERT = 1,
	ENABLE_PREVIEW_ICON = 0;

	const IMG_MW = 'data:image/gif;base64,R0lGODlhbwBSAOYAAPQLC/Dz8WZmZsRfWswzM8SwrKokJMOloMk+OtjV0/9fXv8kJP86OszMzN4oKf+Li/+lo/9SUt8kJL6GgMhUUv8zM+rs6fqNi/+8u/9mZtaMi/GpqO8oKf729fNQTvHc2v9JSeTHxP+ZmcBzctVJRvAvLv8pKct6ef/m5P98fP+sq+G7uf/MzO87OuiPjf9cW+UvLf9COsxmZt+BgPokJMyZmfYpKvXz8eTSz/jMyugoKcdFQ/S1sv/e2/90c+/y8MyHhfny8f+TkcWAe8+wrcNYV8Jycf///+yTkvj7+fqSkM9AP7MkJP+0s/+qp8xmZt/b2evp5syZmcaIhf9mZv+hn/9eX/9BQe/39/+Af//t7MW1rdA+O9PRzuckJPLIxr96dfguLtJvbvT39c6MhP+Zmc+zrveUlM5KQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQUAP8ALAAAAABvAFIAAAf/gEeCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goYw9GE4ipxA5oqugLBAPKRkZCla1ViKfAACsnFoqDxkRVwzExFcgyKqKuoW7icy8mShVPhEMFdhh2tgVxGE8y9BH4ofk0ZRaIj4g2CYm3BXu8CZfz7q794P3zuPOzP/89unDR9DcJmrsKixQEGEBtoUN4THogKhgP0PQMhK82MzfPo2eWKSI8DCDIBALFp502M5FRUEeB+bjCJBjv5niPvLb9EDBNRM+CIFQQOiFO3ctgpTrCDMmzY0gnw4MhWLdwyaKkLCsYGPFUkJRo0ptStZmzk4YFFzhZgLroRpM/7Rps6Hh69SmOAM6xSv25k5NVayxpQHBEBADOuDZEHOuMSIhIK5xWxC0UBEv8LjKcMyZkBDJD7MgyrC1AgfGnTs7mfdAkY+jJnQAiWbwUe1IPd49rELISN1BM2hkc0AkdaTbkUDAXoDryAgmEpQIAhNXG4clUMpB3SnwIsC8fLl3v3tpg+6HSk5UX3BBvdwwEqYk0e79L9mPUsM6NYc8kofzCkkQxmQCyqXDDglUtB1YApEDkn5l8WcfJR+UAGBmmXFAQAH21HdXTR9uNFZfNmESAgw2DIghN2HoQMABAYRTVoQi0jjifhNyggMJOqSoYgVycSDBDgX8sAiJ+DkYE/+E4THFyQ01cOGADhxUWaUDCEzQxXzGMdIfJ1GYMcQAFFAwABgHdBFjl+F8+UkAFsQ5Bpt01mnnnXjmqeeefPbp55+ABirooIQWauihlgggAKKgKOqoo0coaoikkVBKKaOXRrpoJ5kemumjm2o6yKOTQiopqIKQWgiqkI7aqqWhchorrKlu2qmrhNBa66652uprqaIG68mnvwaraq+6XgpqrMYWq+mrrX5CLK/KRuvqqc7eimuz1PqqrSbTctsrItjyKiyzyRZbrSjhpnurqtV6y6y48a7LaDTf3ivtvKvkq6+s//Lib8DgHmvwossirK276v46sMDOdouquOOKSiuUw/w6hrG56R4Cr8MN33lxyN2ai2zIHds5csksf2tvuRTTufG5JAN7bagTP0ywyTsPm3HPQBeqc9CSDL3nx/UqjPPHu+YMrbAqz0pyyjDryu3EIkvd8tQKs/ysqT+z2S7XJacM9dlZV0w1yjUrC7XRrCC99NbRYg2t1WjfCzfRjuzN99+ABy744IQXbvjhiCeueCiBAAA7';
	const IMG_LOADING = 'data:image/gif;base64,R0lGODlhbwBSAIAAAMzMzP///yH5BAQUAP8ALAAAAABvAFIAAALhjI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1ioUALttAN/ulhLNeLhnxBajRa4O63X2H5c34YVxOu/d8PdPO5/VW1hcISLh0qIgI6OeXaBjpGMlYd9fmNigIR7mJd1bxCaqFObogapqq6kG3B8dZmNkYeOT4uDVZOZuUK8tpO4ibp9SLeFdpPCzMe2x8i0b5iJyc05qsSZuGKf3cg7rK8A0+Tl5ufo6err7O3u7+Dh8vP09fb3+Pn6+/z9/vL1MAADs=';
	const IMG_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
	const IMG_PRVICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAMAAADH72RtAAADAFBMVEUDRv8ERf8OXf8jdv8+of9m vP/e7v//TgP/dg//li//mR//vEn/yGb/2Iv/3p3/8+f///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAADneq79AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2QkZCwkG7RBsvgAA AAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdo dACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAAL dEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D 6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAAb0lEQVR4nF2PWw6EMAwD +6TepIXe/7Q4YVGB+fMotpQwv4S51eJko2w0pT7JZl4kM6+V2xxCAFlGHezLoEtXjNVixiVmpMl2 oqJgr/+NzTIK2mA2MzpH9Af1H7xFGq4dMzWRhpZiDCFUGkeOx+9fTkfPC8aqu6C3AAAAAElFTkSu QmCC';

	var thumbService = '';

	////////////////////////////////////////////////////////////////////////////////////////

	var isAmazonCOM = function (href) {
		return href.toLowerCase().match(/^https?:\/\/www\.amazon\.com\//);
	}
	var isAmazonUK = function (href) {
		return href.toLowerCase().match(/^https?:\/\/www\.amazon\.co\.uk\//);
	}
	var isAmazonDE = function (href) {
		return href.toLowerCase().match(/^https?:\/\/www\.amazon\.de\//);
	}
	var isAmazonFR = function (href) {
		return href.toLowerCase().match(/^https?:\/\/www\.amazon\.fr\//);
	}

	var isAmazon = function (href) {
		return (isAmazonCOM(href) || isAmazonUK(href) || isAmazonDE(href) || isAmazonFR(href));
	}

	var isYippy = function (href) {
		return (href.indexOf('yippy.com/search') >= 0);
	}

	var isYandex = function (href) {
		return (
			href.indexOf('yandex.ru/yandsearch') >= 0
			 || href.indexOf('yandex.com/yandsearch') >= 0);
	}

	var isGoogle = function (href) {
		return (href.indexOf('.google.') == -1 || href.indexOf('news.google.') >= 0 || href.indexOf('blogsearch.google.') >= 0 || href.indexOf('images.google.') >= 0) ? false : true;
	}

	var isAsk = function (href) {
		return href.match(/http:\/\/.*ask\.com\/web/i);
	}

	var isIxquick = function (href) {
		return href.match(/https?\:\/\/.*ixquick\.com\/do\/search/i);
	}

	var isStartpage = function (href) {
		return href.match(/https?\:\/\/.*startpage\.com\/do\/search/i);
	}

	var isYahoo = function (href) {
		return href.match(/https?:\/\/.*search\.yahoo\.com\//i);
	}

	var isBingMSN = function (href) {
		return href.match(/https?:\/\/.*bing\.com/i);
	}

	var isMetager = function (href) {
		return href.match(/https:\/\/.*metager\.de\/meta\//i);
	}

	var isGoodsearch = function (href) {
		return href.match(/http:\/\/.*goodsearch\.com\/search/i);
	}

	var isClusty = function (href) {
		return href.match(/http:\/\/.*clusty\.com\/search/i);
	}

	var isForestle = function (href) {
		return (href.match(/http:\/\/.*forestle\.org\/search/i) || href.match(/http:\/\/.*ecosia\.org\/search/i));
	}

	var isExcite = function (href) {
		return href.match(/http:\/\/search\.excite\../i);
	}

	var isDuckDuckGo = function (href) {
		return href.match(/https?:\/\/.*duckduckgo\.com\//i);
	}

	var isMetacrawler = function (href) {
		return href.match(/https?:\/\/.*metacrawler\.de\//i);
	}

	// ++++++++++++++++++++++++++++++++++

	var getASIN = function (href) {
		if (href.match(/astore\.amazon/i))
			return null;

		var asin = href.match(/amazon\..+\W+([0-9A-Z]{10})(\W+|$)/);
		return asin ? asin[1] : null;
	}

	var getAPath = function (href) {
		var tokens = href.split("/exec/obidos/");
		return (tokens.length == 2) ? tokens[1] : href;
	}

	var getGPSub = function (href) {
		var site = getFullDomain(href);
		site = site.toLowerCase();
		if (site.indexOf('https://') == 0)
			site = site.substring(8, site.length);
		else if (site.indexOf('http://') == 0)
			site = site.substring(7, site.length);
		if (site.indexOf('www.') == 0)
			site = site.substring(4, site.length);
		return site.length > 0 ? '' + site.charAt(0) : 'a';
	}

	var getImageURL = function (href, psiz) {
		var mw = href.match(/http:\/\/www\.google\..*\/interstitial\?url=/i);
		if (mw)
			return IMG_MW;

		var fullDomain = getFullDomain(href);
		var protocol = 'unknown';
		var site = fullDomain;
		if (site.indexOf('http://') == 0) {
			site = site.substring(7, site.length);
			protocol = 'http://';
		} else if (site.indexOf('https://') == 0) {
			site = site.substring(8, site.length);
			protocol = 'https://';
		}

		if (isSSL())
			protocol = 'https://'; // check search website has SSL

		var preview;
		switch (thumbService) {
		case "2":
			preview = 'http://immediatenet.com/t/m?Size=1024x768&URL=' + site; // Service may be closed in near future!
			break;
		case "0":
			preview = 'http://api.thumbalizr.com/?width=120&url=' + site; // thumbalizr is very slow; not rellay usable!
			break;
		case "1":
		default:
			//http://api.webthumbnail.org?width=500&height=400&screen=1024&url=http://gwendragon.de/blog/
			preview = 'http://api.webthumbnail.org?height=95&width=110&screen=1024&url=' + site;
			break;
		}

		if (!isAmazon(href))
			return preview;

		var isbn = getASIN(href);
		if (isbn != null) {
			var p = psiz ? 'L' : 'T';
			p += 'ZZZZZZZ.jpg';
			if (isAmazonCOM(href))
				return 'http://images.amazon.com/images/P/' + isbn + '.01.' + p;
			else if (isAmazonDE(href))
				return 'http://images-eu.amazon.com/images/P/' + isbn + '.03.' + p;
			else if (isAmazonUK(href))
				return 'http://images-eu.amazon.com/images/P/' + isbn + '.02.' + p;
			else if (isAmazonFR(href))
				return 'http://images-eu.amazon.com/images/P/' + isbn + '.08.' + p;
		}
		return preview;
	}

	var amazonifiy = function () {
		var allLinks = document.getElementsByTagName('a');
		for (i = 0; i < allLinks.length; i++) {
			var href = allLinks[i].href;

			//amazonify done
			if (allLinks[i].getAttribute('amazonified') == 'yupp')
				continue;

			//never ever touch a tagged amazon affiliate URL
			var lowerURL = href.toLowerCase();
			if (lowerURL.indexOf('tag=') > 0 || lowerURL.indexOf('tag%3d') > 0)
				continue;

			href = getRealURL(href);
			var n;
			if (isAmazonCOM(href) && href.indexOf('gp04-20') == -1) {
				n = 'http://www.amazon.com/exec/obidos/redirect?tag=gp04-20&path=' + escape(getAPath(href));
				allLinks[i].setAttribute('href', n);
				allLinks[i].setAttribute('amazonified', 'yupp');
			} else if (isAmazonDE(href) && href.indexOf('gp0409-21') == -1) {
				n = 'http://www.amazon.de/exec/obidos/redirect?tag=gp0409-21&path=' + escape(getAPath(href));
				allLinks[i].setAttribute('href', n);
				allLinks[i].setAttribute('amazonified', 'yupp');
			} else if (isAmazonUK(href) && href.indexOf('gp04-21') == -1) {
				n = 'http://www.amazon.co.uk/exec/obidos/redirect?tag=gp04-21&path=' + escape(getAPath(href));
				allLinks[i].setAttribute('href', n);
				allLinks[i].setAttribute('amazonified', 'yupp');
			} else if (isAmazonFR(href) && href.indexOf('googleprevi02-21') == -1) {
				n = 'http://www.amazon.fr/exec/obidos/redirect?tag=googleprevi02-21&path=' + escape(getAPath(href));
				allLinks[i].setAttribute('href', n);
				allLinks[i].setAttribute('amazonified', 'yupp');
			}
		}
	}

	var stockify = function () {
		var images = document.getElementsByTagName('img');
		for (i = 0; i < images.length; i++) {
			if (images[i].getAttribute('src') == '/images/stock_img.gif') {
				var parent = images[i].parentNode;
				if (!parent)
					return;
				var href = parent.getAttribute('href');
				if (!href)
					return;
				var tokens = href.split("stocks:");
				if (tokens.length >= 2) {
					images[i].setAttribute('src', 'http://ichart.yahoo.com/t?s=' + tokens[1]);
					images[i].setAttribute('width', '192px');
					images[i].setAttribute('height', '96px');
				}
			}
		}
	}

	var getFullDomain = function (href) {
        //  fix ugly http://www.google.at/url?url=http://de.wikipedia.org/wiki/Ex&amp;rct=j&amp;q=&amp;esrc=s&amp;sa=U&amp;ei=m4sAVJHdOqGz0QXt2YHoCw&amp;ved=0CBMQFjAA&amp;usg=AFQjCNGapzi3IaiDqrS1VJs9PrlQjJ4rRw
		var d1 = href.match(/url=(http(?:s)?:\/\/[^\/]+)/i);      
		var d2 = href.match(/(http(?:s)?:\/\/[^\/]+)/i);      
		return d1 ? d1[1].toLowerCase() : d2 ? d2[1].toLowerCase() : href;
	}

	var getRealURL = function (href) {
		if (getFullDomain(href).match(/(.*wrs|\.rds|rds|r)\.yahoo\.com/i)) {
			var nhref = href.match(/\*\*.+$/);
			if (nhref) {
				href = unescape(nhref[0].substr(2));
				//de does some special click through
				if (href.match(/http.*\.yahoo.com\/click/i))
					href = unescape(href.match(/u=(.*)&y=/)[1]);
			}
		}
		return href;
	}

	var createThumbnail = function (href) {
		var rhref = getRealURL(href);
		var thumb = document.createElement('img');
		thumb.style = 'float:left;clear:left';
		if (!getASIN(rhref)) {
			thumb.setAttribute('height', '82px');
			thumb.setAttribute('width', '111px');
			thumb.setAttribute('src', getImageURL(rhref, 0));
			thumb.style.width = '111px';
			thumb.style.height = '82px';
			thumb.style.backgroundImage = 'url(' + IMG_LOADING + ')';
			thumb.style.backgroundPosition = 'center';
			thumb.style.border = '1px solid #BBBBBB';
		} else {
			thumb.setAttribute('width', '115px');
			thumb.setAttribute('src', IMG_PIXEL);
			thumb.style.margin = '2px 0px 2px 0px';
			thumb.style.width = '115px';
			thumb.style.height = 'auto';
			thumb.style.backgroundImage = 'url(' + getImageURL(rhref, 0) + ')';
			thumb.style.backgroundPosition = 'top';
			thumb.style.border = '1px solid #FFFFFF';
			thumb.addEventListener('mouseover', function () {
				thumb.style.width = '500px';
				thumb.style.backgroundImage = 'url(' + getImageURL(rhref, 1) + ')';
			}, true);
			thumb.addEventListener('mouseout', function () {
				thumb.style.width = '115px';
				thumb.style.backgroundImage = 'url(' + getImageURL(rhref, 0) + ')';
			}, true);
		}
		thumb.style.backgroundRepeat = 'no-repeat';
		thumb.style.margin = '2px 4px 5px 0px';
		return thumb;
	}

	var createThumb = function (elem, url) {
		var thumb = createThumbnail(url);
		thumb.setAttribute('alt', '');
		var linka = document.createElement('a');
		linka.href = url;
		linka.appendChild(thumb);
		linka.style.display = 'none';
		return linka;
	}

	var addThumb = function (elem, url) {
		var linka = null;
		if (ENABLE_IMAGE_INSERT) {
			linka = createThumb(elem, url);
			linka.style.display = 'inline';
			linka.style.marginLeft = '0';
			elem.insertBefore(linka, elem.firstChild);
		} else if (ENABLE_PREVIEW_ICON) {
			var linkico = document.createElement('a');
			linkico.href = url;
			var im = document.createElement('img');
			im.setAttribute('alt', '');
			im.src = IMG_PRVICON;
			im.setAttribute('style', 'height:16px !important;width:17px !important');
			linkico.appendChild(im);
			elem.insertBefore(linkico, elem.firstChild);
			linkico.addEventListener('mouseover', function () {
				if (!linka) {
					linka = createThumb(elem, url);
					elem.insertBefore(linka, elem.firstChild.nextSibling);
				}
				linka.style.display = 'block';

				if (isAmazon(url)) {
					var thumb = linka.firstChild;
					thumb.removeEventListener('mouseover');
					thumb.removeEventListener('mouseout');
					thumb.style.width = '500px';
					thumb.style.backgroundImage = 'url(' + getImageURL(getRealURL(url), 1) + ')';
				}

			}, true);
			linkico.addEventListener('mouseout', function () {
				var thumb = linka.firstChild;
				linka.style.display = 'none';
			}, true);

		}
		return elem.firstChild;
	}

	var thumbshots = function (url) {
		//if (document.getElementsByTagName('head')[0].getAttribute('searchenginepreview') == 'done') return;
		var a;
		var t = 0;
		var i = 0;
		var href = null;
		var aParent;

		if (isYandex(url)) {
			while (a = document.getElementsByTagName('a')[i++]) {
				if (a.getAttribute('class')
					 && a.getAttribute('class').match(/serp-item__title-link/)
					 && a.getAttribute('searchenginepreview') != 'done') {
					a.setAttribute('searchenginepreview', 'done');
					href = a.href;
					aParent = a.parentNode;
					var p = addThumb(aParent, href);
					p.style.display = 'inline-block';
					p.style.clear = 'both';
				}
			}
		} else if (isMetacrawler(url)) {
			var box = document.getElementById('statbox');
			while (s = box.getElementsByTagName('span')[i++]) {
				if (s.getAttribute('class') == 'uschr2') {
					var picdiv = document.createElement('p');
					var e = s;
					while ((e = e.nextElementSibling) && e.nodeName != 'A'
						 && e.getAttribute('class') == 'dublaulink'
						 && e.getAttribute('searchenginepreview') != 'done') {
						1;
						/* noop */
					}
					if (e) {
						s.parentNode.replaceChild(picdiv, s);
						aParent = picdiv;
						picdiv.style.display = 'run-in';
						e.setAttribute('searchenginepreview', 'done');
						t++;
						addThumb(aParent, e.href);
					}

				}
			}
		} else if (isYippy(url)) {
			while (a = document.getElementsByTagName('a')[i++]) {
				href = a.href;
				if (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) {
					aParent = a.parentNode;
					if (aParent.getAttribute('class') == 'document-header'
						 && a.firstChild.getAttribute('class') == 'title'
						 && a.getAttribute('searchenginepreview') != 'done') {
						a.setAttribute('searchenginepreview', 'done');
						t++;
						var p = addThumb(aParent, href);
						p.style.display = 'inline';
						aParent.parentNode.parentNode.style.listStylePosition = 'inside';
					}
				}
			}
		} else if (isExcite(url)) {
			while (a = document.getElementsByTagName('a')[i++]) {
				href = a.href;
				if (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) {
					aParent = a.parentNode;
					if (aParent.parentNode.getAttribute('class') == 'websearch'
						 && a.getAttribute('class') == 'free'
						 && a.getAttribute('searchenginepreview') != 'done') {
						if (a.text != null && a.text.length > 0) {
							a.setAttribute('searchenginepreview', 'done');
							t++;
							addThumb(a, href);
						}
					}
				}
			}
		} else if (isForestle(url)) { // and Ecosia
			while (a = document.getElementsByTagName('a')[i++]) {
				href = a.href;
				if (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) {
					aParent = a.parentNode;
					if (aParent.parentNode.getAttribute('class') == 'result_wrapper'
						 && a.getAttribute('class').match(/opentab/)
						 && a.getAttribute('searchenginepreview') != 'done') {
						if (a.text != null && a.text.length > 0) {
							if (href.match(/forestle\.org/)) { // fix for forestle.org
								/* link is like http://forestle.org/goto.php?url=http%3A%2F%2Fwww.gwendragon.de%2F */
								href = unescape(href.substr(33));
							} else if (href.match(/ecosia\.org/)) { // fix for ecosia.org
							}

							a.setAttribute('searchenginepreview', 'done');
							t++;
							addThumb(aParent, href);
						}
					}
				}
			}
		} else if (isClusty(url)) {
			while (a = document.getElementsByTagName('a')[i++]) {
				href = a.href;
				if (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) {
					aParent = a.parentNode;
					if (aParent.getAttribute('class') == 'document-header'
						 && a.getAttribute('searchenginepreview') != 'done') {
						if (a.text != null && a.text.length > 0) {
							a.setAttribute('searchenginepreview', 'done');
							t++;
							addThumb(aParent, href);
						}
					}
				}
			}
		} else if (isGoodsearch(url)) {
			// good search uses Frames
			while (a = document.getElementsByTagName('a')[i++]) {
				href = a.href;
				if (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) {
					aParent = a.parentNode;
					if (a.id.match(/link\-\d+/)
						 && a.getArribute('class').match(/yschttl/)
						 && a.getAttribute('searchenginepreview') != 'done') {
						if (a.text != null && a.text.length > 0) {
							a.setAttribute('searchenginepreview', 'done');
							t++;
							addThumb(aParent, href);
						}
					}
				}
			}
		} else if (isIxquick(url)) {
			while (a = document.getElementsByTagName('a')[i++]) {
				href = a.href;
				if (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) {
					aParent = a.parentNode;
					if (a.id.match(/title_\d+/) && a.getAttribute('searchenginepreview') != 'done') {
						if (a.text != null && a.text.length > 0) {
							var ap = aParent.parentNode;
							ap.style.minHeight = 82 + "px"; // parent div must have minheight of pic
							ap.style.maxHeight = "auto";

							// no target on link!
							if (a.getAttribute('target'))
								a.removeAttribute('target');
							a.setAttribute('searchenginepreview', 'done');
							t++;
							addThumb(ap, href);
						}
					}
				}
			}
		} else if (isStartpage(url)) {
			while (a = document.getElementsByTagName('a')[i++]) {
				href = a.href;
				if (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) {
					aParent = a.parentNode;
					if (a.id.match(/title_\d+/) && a.getAttribute('searchenginepreview') != 'done') {
						if (a.text != null && a.text.length > 0) {
							var ap = aParent.parentNode;
							ap.style.minHeight = 82 + "px"; // parent div must have minheight of pic
							ap.style.maxHeight = "auto";

							// no target on link!
							if (a.getAttribute('target'))
								a.removeAttribute('target');
							a.setAttribute('searchenginepreview', 'done');
							t++;
							addThumb(ap, href);
						}
					}
				}
			}
		} else if (isAsk(url)) {
			while (a = document.getElementsByTagName('a')[i++]) {
				href = a.href;
				if (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) {
					aParent = a.parentNode;
					if (a.id.match(/r\d+_t/) && a.getAttribute('searchenginepreview') != 'done') {
						if (a.text != null && a.text.length > 0) {
							a.setAttribute('searchenginepreview', 'done');
							t++;
							addThumb(aParent, href);
							aParent.parentNode.style.minHeight = "100px";
							aParent.parentNode.style.maxHeight = "auto";
						}
					}
				}

			}
		} else if (isGoogle(url)) {
			var prevA = false;

			// disable in Picture search!
			if (url.match(/http:\/\/(?:www\.)?google\.[^\/]+\/search\?.*&tbm=isch/i)) {
				console.log("Searchengine preview disabled at Googles's picture search!");
				t++;
			} else {
				while (a = document.getElementsByTagName('a')[i++]) {
					href = a.href;
					url = href.match(/http:\/\/(?:www\.)?google\.[^\/]+\/url\?.*&q=(http:.+)$/i);
					if (url)
						href = unescape(url[1]);

					if (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) {
						aParent = a.parentNode;
						if (a.getAttribute('searchenginepreview') != 'done'
							/* fix Google 2012-04-25 */
							//&& a.getAttribute('class') == 'l'
							 &&
							(
								(aParent.getAttribute('class') == 'r'
									 && ((aParent.parentNode.getAttribute('class') == 'g')
										 || (aParent.parentNode.getAttribute('class') == 'g w0')
										 || (aParent.parentNode.getAttribute('class') == 'g w1')))
								//
								 || // check link (Google changed web page!)
								aParent.getAttribute('class') == 'r'
								//
								 || // check link in Google custom search
								aParent.getAttribute('class') == 'g')) {
							if (a.text != null && a.text.length > 0) {
								a.setAttribute('searchenginepreview', 'done');
								t++;
								addThumb(aParent.parentNode, href);

								// fix for problems with text in wrong position (below image)
								aParent.style.whiteSpace = 'normal';

								aParent.parentNode.style.clear = 'left';
								aParent.parentNode.style.marginLeft = '0';
								if (t > 1 && prevA == null)
									aParent.parentNode.style.paddingTop = '12px';

								prevA = getASIN(getRealURL(href));
							}
						}
					}
				}
				var hrs = document.getElementsByTagName('hr');
				if (hrs != null && hrs.length > 0) {
					hrs[0].style.clear = 'left';
					hrs[0].style.marginTop = '35px';
				}
				// 2014-03-05 fix bad CSS height for translate links with class .kv
				var i = 0;
				var divs;
				while (divs = document.getElementsByClassName('kv')[i++]) {
					divs.style.height = 'auto';
				}

			}
		} else if (isYahoo(url)) { //just com
			while (a = document.getElementsByTagName('a')[i++]) {
				href = a.href;
				if (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) {
					aParent = a.parentNode;
					if ((a.getAttribute('class') == 'yschttl'
							 || a.getAttribute('class') == 'yschttl spt'
							 || a.getAttribute('class') == 'rt')
						 && a.getAttribute('searchenginepreview') != 'done') {
						if (a.text != null && a.text.length > 0) {
							a.setAttribute('searchenginepreview', 'done');
							t++;
							var p = addThumb(aParent, href);
							p.style.clear = "both";
						}
					}
				}
			}
			head = document.getElementsByTagName('head')[0];
			style = document.createElement('style');
			style.setAttribute('type', 'text/css');
			style.innerHTML = "\n#yschweb>OL>LI{height:105px;clear:both}\n";
			style.innerHTML += "\n#west>OL>LI{height:105px;clear:both}\n";
			head.insertBefore(style, head.lastChild);
		} else if (isBingMSN(url)) {
			var res = document.getElementById('results');
			var iterator = document.evaluate(
					"//a[starts-with(@href,'http:') or starts-with(@href,'https:')]",
					res,
					null,
					window.XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);
			var knoten,
			l = [];
			while (knoten = iterator.snapshotItem(i)) {
				l[i++] = knoten;
			}
			i = 0;
			while (a = l[i++]) {
				href = a.href;
				aParent = a.parentNode; // h3
				if (aParent.parentNode.getAttribute('class') == 'sb_tlst'
					 && !a.href.match(/microsofttranslator\.com/)
					 && a.getAttribute('searchenginepreview') != 'done') {
					if (a.text != null && a.text.length > 0) {
						a.setAttribute('searchenginepreview', 'done');
						t++;
						addThumb(aParent, href);
					}
				}
			}
		} else if (isMetager(url)) {
			var i = 0;
			while (d = document.getElementsByTagName('div')[i++]) {
				if (!d.className || !d.className.match(/ergebnisbox/))
					continue;

				a = d.getElementsByTagName('a')[0];
				if (a && a.getAttribute('searchenginepreview') != 'done') {
					aParent = d.firstChild;
					d.style.minHeight = '85px';
					href = a.href;
					if (a.text != null && a.text.length > 0) {
						a.setAttribute('searchenginepreview', 'done');
						if (href.match(/fastbot\.de/)) { // redirected by fastbot
							href = href.substring(1 + href.indexOf('+'));
						} else if (href.match(/netzsuchende\.de/)) { // redirected by Netzsuchende
							href = href.substring(2 + href.indexOf('q='));
						}
						a.href = href;
						a.style.display = "inline-block";
						a.style.float = "left";
						a.style.clear = "both";
						t++;
						addThumb(aParent, href);
					}
				}
			}
		} else if (isDuckDuckGo(url)) {
			while (a = document.getElementsByTagName('a')[i++]) {
				href = a.href;
				if (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) {
					aParent = a.parentNode.parentNode;
					aGrandParent = a.parentNode.parentNode.parentNode;
					if (a.getAttribute('class') == 'result__a' // ist ein deep link
						 && a.getAttribute('searchenginepreview') != 'done') {
						a.setAttribute('searchenginepreview', 'done');
						t++;
						addThumb(aGrandParent, href);
						aParent.style.minHeight = "85px";
					}
				}
			}
		}

		//
		if (t > 0)
			document.getElementsByTagName('head')[0].setAttribute('searchenginepreview', 'done');
	}

	var isEngine = function (href) {
		return (isGoogle(href)
			 || isYahoo(href)
			 || isBingMSN(href)
			 || isMetager(href)
			 || isMetacrawler(href)
			 || isAsk(href)
			 || isStartpage(href)
			 || isIxquick(href)
			 || isGoodsearch(href)
			 || isClusty(href)
			 || isAmazon(href)
			 || isForestle(href)
			 || isExcite(href)
			 || isYippy(href)
			 || isYandex(href)
			 || isDuckDuckGo(href));
	}

	var isSSL = function () {
		return window.document.location.href.match(/^https:\/\//);
	}

	var PreviewsInWebpage = function (generate) {
		if (!generate)
			return;

		var url = window.document.location.href;
		if (!isEngine(url))
			return;

		amazonifiy();

		if (ENABLE_IMAGE_INSERT) {
			if (isGoogle(url))
				stockify();
		}
		thumbshots(url);
	}

	var fetchOptions = function () {
		// insert Preview or show preview Icon; not both!
		if (ENABLE_PREVIEW_ICON)
			ENABLE_IMAGE_INSERT = 0;
		if (ENABLE_IMAGE_INSERT)
			ENABLE_PREVIEW_ICON = 0;
		if (!ENABLE_PREVIEW_ICON && !ENABLE_IMAGE_INSERT) {
			ENABLE_IMAGE_INSERT = 1;
			ENABLE_PREVIEW_ICON = 0;
		}

		var pref = widget.preferences.previewpic;
		ENABLE_PREVIEW_ICON = (pref == 1);
		ENABLE_IMAGE_INSERT = (pref == 0);

		thumbService = widget.preferences.previewurl;
	}

	/* === init all === */
	fetchOptions();

	window.addEventListener('DOMContentLoaded', function (e) {
		PreviewsInWebpage(true);
	}, false);

	if (!window.document.location.href.match(/search\.yahoo\.com/))
		window.addEventListener('DOMNodeInserted', function (e) {
			PreviewsInWebpage(true);
		}, false);
})();
