    ext = ['mp4', 'mp3', 'm4u', 'avi', 'mpg', 'mpeg'];


    function isMedia(url) {
        url = url.toLowerCase();
        boo = false;
        for (i = 0; i < ext.length; i++) {
            if (url.split('.' + ext[i]).length > 1) {
                boo = true;
                break;
            }
        }
        return boo;
    }


    function formFile() {
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

        return m3u;
    }



    function formName(href) {
        v2 = href.split('/');
        name = v2[v2.length - 1];
        if (name == '')
            name = v2[v2.length - 2];
        return name;
    }

    self.port.on('do', function (g) {
        opt = g[1];
        g = g[0];

        ext = [];
        ext = ext.concat(opt.audios, opt.videos);
        if (g == "") {
            links = document.links;
            href = decodeURIComponent(location.href);
        } else {
            links = [{
                href: g
        }];
            href = decodeURIComponent(g.split('.').join('_'));
        }



        m3u = formFile(links);
        name = formName(href);

        file = {
            fileName: name.split('.').join('_'),
            content: m3u.split('\n').join('\r\n')
        }


        self.port.emit("p1", file);
    });