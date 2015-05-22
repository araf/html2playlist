self.port.on('ml', function (l) {
    console.log(l);
})

/*function isMedia(url) {
    url = url.toLowerCase();
    ext = ['mp4', 'mkv', 'mp3', 'm4u', 'avi', 'mpg', 'mpeg'];
    boo = false;
    for (i = 0; i < ext.length; i++) {
        if (url.split('.' + ext[i]).length > 1) {
            boo = true;
            break;
        }
    }
    return boo;
}

links = document.links;
m3u = '#EXTM3U';
indx = 0;

for (j = 0; j < links.length; j++) {
    l = decodeURIComponent(links[j].href);
    k = l.split('/');
    name = k[k.length - 1];
    if (isMedia(l)) {
        m3u += '\n#EXTINF:' + indx + ', ' + name + '\n' + l;
        indx++;
    }
}

v1 = decodeURIComponent(location.href);
v2 = v1.split('/');
name = v2[v2.length - 1];
if (name == '')
    name = v2[v2.length - 2];

file = {
    fileName: name.split('.').join('_'),
    content: m3u.split('\n').join('\r\n')
}

self.port.emit("p1", file);*/