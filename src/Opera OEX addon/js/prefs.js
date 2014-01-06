function LoadPrefs() {
    var e, o;    
    o = widget.preferences["previewpic"];
    if (!o)
        widget.preferences["previewpic"] = 0;
    if (e = document.getElementById("previewpic"))
        e[widget.preferences["previewpic"]].selected = true;
    
    o = widget.preferences["previewurl"];
    if (!o)
        widget.preferences["previewurl"] = 1;
    if (e = document.getElementById("previewurl"))
        e[widget.preferences["previewurl"]].selected = true;
    
    o = widget.preferences["showbutton"];
    if (!o)
        widget.preferences["showbutton"] = 1;
    if (e = document.getElementById("showbutton"))
        e.checked = (widget.preferences["showbutton"] == 1);
}

function SavePrefs() {
    var e;    
    if (e = document.getElementById("previewpic"))
        widget.preferences["previewpic"] = e.selectedIndex;
    
    if (e = document.getElementById("previewurl"))
        widget.preferences["previewurl"] = e.selectedIndex;
    
    if (e = document.getElementById("showbutton")) {
        widget.preferences["showbutton"] = (e.checked ? 1 : 0);
        var tbar = opera.extension.bgProcess.toolbar;
        (widget.preferences["showbutton"] == 1) ? tbar.addItem(opera.extension.bgProcess.button) : tbar.removeItem(opera.extension.bgProcess.button);
    }
}

window.addEventListener("DOMContentLoaded", LoadPrefs, false);
window.addEventListener("unload", SavePrefs, false);

savebutton = document.getElementById("savebutton");
savebutton.addEventListener("click", function () {
    SavePrefs();
    window.close();
}, false);
