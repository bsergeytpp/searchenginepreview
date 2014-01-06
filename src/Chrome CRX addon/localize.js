
// convert i18n
function localizeAll() {
	var elems = document.getElementsByTagName('*');

	for (var i=0;i<=elems.length;i++) {
		var e = elems[i];
		if (!e || !e.getAttribute) continue;
		
		var m;
		if (m = e.getAttribute('data-i18n')) { 
			e.innerHTML = chrome.i18n.getMessage(m);
		}
		if (m = e.getAttribute('data-i18n-value')) { 
			e.value = chrome.i18n.getMessage(m);
		}

		switch(e.getAttribute('id')) {
			case 'app-name': 	e.innerHTML = chrome.app.getDetails().name; 
								break;
			case 'app-version': e.innerHTML = chrome.app.getDetails().version; 
								break;
		}
		
	}
}

localizeAll();
