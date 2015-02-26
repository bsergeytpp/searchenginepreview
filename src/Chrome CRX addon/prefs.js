
function setStorageItem(it, val) {
	localStorage[it] = val;
	return 1;
}

function getStorageItem(it) {
	return localStorage[it];
}

function LoadPrefs() {
	var e, o;
	o = getStorageItem("previewpic") || 0;
	if (e = document.getElementById("previewpic")) {
		e[o].selected = true;
	}
	o = getStorageItem("previewurl") || 1;
	if (e = document.getElementById("previewurl")) {
		e[o].selected = true;
	}
}

function SavePrefs() {
	var e;
	if (e = document.getElementById("previewpic")) {
		setStorageItem("previewpic", e.selectedIndex);
	}
	console.log("e-selected " + e.selectedIndex);
	if (e = document.getElementById("previewurl")) {
		setStorageItem("previewurl", e.selectedIndex);
	}
	//console.log("e-selected " + e.selectedIndex);
	//console.log("Saving options");
}

// activate only on options page
if (document.querySelector("#options")) {
	LoadPrefs();
	document.addEventListener("DOMContentLoaded", LoadPrefs, false);
	document.addEventListener("unload", SavePrefs, false);
	document.querySelector("#savebutton").addEventListener("click", function () {
		SavePrefs();
	}, false);
}
