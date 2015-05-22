var {
    Cc, Ci
} = require("chrome");


function promptFor(what, Dialog) {
    var window = require("sdk/window/utils").getMostRecentBrowserWindow();
    const nsIFilePicker = Ci.nsIFilePicker;

    var fp = Cc["@mozilla.org/filepicker;1"]
        .createInstance(nsIFilePicker);

    if (what == 'file')
        mode = 'modeOpen';
    else
        mode = 'modeGetFolder';

    fp.init(window, Dialog, nsIFilePicker[mode]);
    fp.appendFilters(nsIFilePicker.filterAll | nsIFilePicker.filterText);

    var rv = fp.show();
    if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
        var file = fp.file;
        var path = fp.file.path;
    }
    return path;
}



exports.choose = promptFor;