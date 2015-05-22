var data = require("sdk/self").data;
var buttons = require('./buttons.js');
var tabs = require("sdk/tabs");
var notifications = require("sdk/notifications");
var ss = require("sdk/simple-storage").storage;
var filePicker = require("./filepicker.js");
var cm = require("sdk/context-menu");

var formats = {
    "audios": ['mp3', 'm4u', 'aac', 'ogg'],
    "videos": ['mp4', 'avi', 'mkv'],
    "customs": ['mp3', 'mp4']
};


if (!ss.options)
    ss.options = formats;

var button = buttons.createButton("Save as playlist", function () {
    handleClick("");
});



function handleClick(state) {
    work = tabs.activeTab.attach({
        contentScriptFile: data.url("araf.js")
    });

    work.port.emit('do', [state, ss.options]);

    work.port.on("p1", function (m) {
        name = require("sdk/preferences/service").get('browser.download.lastDir') + "\\";

        if (!ss.options.dir) {
            var pth = filePicker.choose("folder", "Where you want to save your playlist:");
            if (pth) {
                name = pth;
                ss.options.dir = name + '\\';
            }
        } else
            name = ss.options.dir;


        if (name.substr(name.length - 1) != '\\')
            name += '\\';
        path = name + m.fileName + '.m3u';
        writeTextToFile(m.content, path);


        notifications.notify({
            title: "Success!",
            text: "Saved as " + path + ".",
            data: "Saved as " + path,
            iconURL: "./icon-64.jpg",
            onClick: function (data) {
                //console.log("Clicked!");
                // console.log(this.data) would produce the same result.
            }
        });

    });

}

//tabs.open("http://dl.filmak2.ir/uplod%20film/3D/47.Ronin.2013.1080p.3D.HSBS.BluRay.x264.YIFY/");
var monolink = cm.Item({
    label: "Save this single file as playlist",
    context: cm.SelectorContext("a"),
    contentScript: 'self.on("click", function (node, data) {' +
        ' self.postMessage(node.href);' +
        '});',

    onMessage: function (k) {
        //console.log(k.href);
        handleClick(k);
    }
});

var settings = cm.Item({
    label: "Settings",
    contentScript: 'self.on("click", function (node, data) {' +
        ' self.postMessage(null);' +
        '});',

    onMessage: function (k) {
        openSettings();

    }
});



function openSettings() {
    tabs.open({
        url: "./settings.html",
        onReady: function (tab) {
            var worker = tab.attach({
                contentScriptFile: ["./angular.min.js", "./settings.js"]
            });

            worker.port.emit('formats', ss.options);

            worker.port.on("sms", function (s) {
                ss.options = s;

            });

            worker.port.on("dir", function (s) {
                var dr = filePicker.choose("folder", "Choose a folder to save your playlists: ");
                worker.port.emit('nDir', dr);
            });
        }
    });
}


function writeTextToFile(text, filename) {
    var fileIO = require("sdk/io/file");
    var TextWriter = fileIO.open(filename, "w");
    if (!TextWriter.closed) {
        TextWriter.write(text);
        TextWriter.close();
    }
}