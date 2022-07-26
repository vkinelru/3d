// Metrika
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(51096746, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true, ecommerce:"dataLayer" });


function cleversite_init() {
    if ("undefined" == typeof window.clever_magic_var) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.defer = true;
        s.charset = 'utf-8';
        var defaultSource = 'https://widget.cleversite.ru/static/clever-widget.umd.min.js';
        var changedSource = localStorage.getItem("CLEVERSITE.WIDGET.SOURCE");
        s.src = changedSource || defaultSource;
        var ss = document.getElementsByTagName('script')[0];
        if (ss) {
            ss.parentNode.insertBefore(s, ss);
        } else {
            document.documentElement.firstChild.appendChild(s);
        };
        if (changedSource) {
            console.log('Переопределён источник скрипта для виджета !!!')
        }
        document.addEventListener('clever-loaded', () => {
            if (window.cleversiteEvent) {
                window.cleversiteEvent.trigger('init', 118692, 181728)
            }
        });
        window.clever_magic_var = 1;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // console.log('cleversite_init();');
    // cleversite_init();
}, false);

function get_query_params(qs)
{
    /*  function decode parameters from GET
     */
    qs = qs.split('+').join(' ');

    var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs))
    {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

var getJSON = function(url, callback) {

    var xmlhttprequest = new XMLHttpRequest();
    xmlhttprequest.open('GET', url, true);
    xmlhttprequest.responseType = 'json';

    xmlhttprequest.onload = function() {

        var status = xmlhttprequest.status;

        if (status == 200) {
            callback(null, xmlhttprequest.response);
        } else {
            callback(status, xmlhttprequest.response);
        }
    };

    xmlhttprequest.send();
};

document.addEventListener('DOMContentLoaded', function() {
    getJSON('https://api.ipify.org?format=json',  function(err, data) {
        if (err != null)
        {
            console.error(err);
        } else {
            var ip_str = data.ip.valueOf();
            var ipdash=ip_str.replaceAll('.', '-');
            var ipspace=ip_str.replaceAll('.', ' ');
            var ip_data = {'ipspace':ipspace, 'ip':ip_str, 'ipdash':ipdash};
            ym(51096746, 'params', ip_data);
        }
        console.dir(ip_data);
    });
}, false);

document.addEventListener('DOMContentLoaded', function() {
    var get_params = get_query_params(document.location.search);
    ym(51096746, 'params', get_params);
    console.dir(get_params);
});

if(!document.getElementsByClassName)
{
    document.getElementsByClassName = function(className)
    {
        return this.querySelectorAll("." + className);
    };
    Element.prototype.getElementsByClassName = document.getElementsByClassName;
}
