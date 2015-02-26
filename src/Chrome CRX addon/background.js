chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.method == "getLocalStorage") {
		sendResponse({
			data : localStorage[request.key]
		});
		//console.log("Sending " + request.key + ":" + localStorage[request.key] );
	} else
		sendResponse({});
});
