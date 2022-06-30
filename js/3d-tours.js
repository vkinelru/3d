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
            var ip_data = {'ip':ip_str, 'ipdash':ipdash, 'ipspace':ipspace};
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
