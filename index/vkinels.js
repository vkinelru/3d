// Metrika counter
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(51096746, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true, ecommerce:"dataLayer" });


// calltouch
(function(w,d,n,c){w.CalltouchDataObject=n;w[n]=function(){w[n]["callbacks"].push(arguments)};if(!w[n]["callbacks"]){w[n]["callbacks"]=[]}w[n]["loaded"]=false;if(typeof c!=="object"){c=[c]}w[n]["counters"]=c;for(var i=0;i<c.length;i+=1){p(c[i])}function p(cId){var a=d.getElementsByTagName("script")[0],s=d.createElement("script"),i=function(){a.parentNode.insertBefore(s,a)},m=typeof Array.prototype.find === 'function',n=m?"init-min.js":"init.js";s.type="text/javascript";s.async=true;s.src="https://mod.calltouch.ru/"+n+"?id="+cId;if(w.opera=="[object Opera]"){d.addEventListener("DOMContentLoaded",i,false)}else{i()}}})(window,document,"ct","663gyaf5");
</script>
<!-- calltouch -->

<script>

/**
 * Get current browser viewpane heigtht
 */
function get_window_height() {
    return window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight || 0;
}

/**
 * Get current absolute window scroll position
 */
function get_window_Yscroll() {
    return window.pageYOffset ||
    document.body.scrollTop ||
    document.documentElement.scrollTop || 0;
}

/**
 * Get current absolute document height
 */
function get_doc_height() {
    return Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0,
        document.documentElement.clientHeight || 0
    );
}


/**
 * Get current vertical scroll percentage
 */
function get_scroll_percentage() {
    return (
        (get_window_Yscroll() + get_window_height()) / get_doc_height()
    ) * 100;
}

setTimeout(function ()
{
    console.log('Timer55');
    ym(51096746, 'reachGoal','timer');
}, 55000);

var scroll_levels =
[
1000000,
300000,
100000,
30000,
10000,
3000,
1000,
300,
100,
30,
0
];

var scroll_percents =
[
100,
99,
95,
90,
80,
70,
60,
50,
40,
30,
20,
10,
5,
3,
1,
0
];


var scrolls_count=0;

function scroll_level_reached (level_name, level_value)
{
    console.log('Scroll_level_reached: ' + level_value + ' scroll_level: ' + level_name);
    ym(51096746, 'reachGoal','scroll'+level_name);
}

function scroll_percent_reached (viewpercents, currentpercent)
{
    console.log('Scroll_percent_reached: ' + viewpercents +' current percentage of view='+currentpercent);
    ym(51096746, 'reachGoal','viewpercents='+viewpercents);
}

window.addEventListener('scroll', function()
{
    scrolls_count=scrolls_count+1;
    for (var i = 0; i < scroll_levels.length; i++)
    {
        var level_name = scroll_levels.length - i;
        var level_value = scroll_levels[i]
        if (scrolls_count >= level_value)
        {
            /* Delete current level from scroll_levels array */
            scroll_levels.pop();
            scroll_level_reached (level_name, level_value);
        }
    }

    currentpercent = get_scroll_percentage();
    for (var i = 0; i < scroll_percents.length; i++)
    {
        var viewpercent = scroll_percents[i]
        if (currentpercent >= scroll_percents[i])
        {
            /* Delete current level from scroll_percents array */
            scroll_percents.pop();
            scroll_percent_reached (viewpercent, currentpercent);
        }
    }

});

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

function hide_element_by_class (class_name)
{
    var all = document.getElementsByClassName(class_name);
    for (var i = 0; i < all.length; i++)
    {
        all[i].style.visibility="hidden";
        all[i].style.display="none";
    }
}

function click_elements_by_class_name (class_name)
{
    var all = document.getElementsByClassName(class_name);
    for (var i = 0; i < all.length; i++)
    {
        all[i].click();
    }
}

function close_tb_modal ()
{
    click_elements_by_class_name ('popups-host__close-button');
    return true;
}


function onclick_handler_by_class_name (class_name, callback_fun)
{
    var all = document.getElementsByClassName(class_name);
    for (var i = 0; i < all.length; i++)
    {
        all[i].addEventListener('click', callback_fun );
    }
    console.log('Add onclick handler to ' + all.length + ' elements');
}

//use "onclick_handler_by_class_name ('modal_links', close_tb_modal);"

document.addEventListener('DOMContentLoaded', function() {
    hide_element_by_class ('s-footer');
    hide_element_by_class ('s-back-to-top__icon');
    hide_element_by_class ('s-back-to-top__image');
    hide_element_by_class ('s-back-to-top');
    console.log('loaded');
}, false);
</script>


<style>
.s-footer, .s-back-to-top__icon, .s-back-to-top__image, .s-back-to-top
{
    visibility:hidden !important;
    display:none !important;
    transform: scale(0)  !important;
    clip-path: circle(0) !important;
    position: absolute !important;
    left: -999px !important;
    height: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
}

.full-width
{
    position: relative;
    width: 99.4vw;
    margin-top: 0px;
    margin-left: -50vw;
    left: 50%;
    text-align:center;
    vertical-align: middle;
    overflow: hidden;
    border: 0;
}

.full-height
{
    position: relative;
    height:99.4vh;
    text-align:center;
    vertical-align: middle;
    overflow: hidden;
    border: 0;
}

.full-screen
{
    width:99.4vw;
    height:99.4vh;
    text-align:center;
    overflow: hidden;
    border: 0;
}

.width-screen
{
    width:99.4vw;
    max-height:99.4vh;
    text-align:center;
    overflow: hidden;
    border: 0;
}

.max-full-screen
{
    max-width:99.4vw;
    max-height:99.4vh;
    text-align:center;
    vertical-align: middle;
    overflow: hidden;
    border: 0;
}

.messengers-icon
{
    width:0.8em;
    height:0.8em;
    position: relative !important;
    opacity:100% !important;
    text-decoration: none;
}

a:hover
{
    text-decoration: underline !important;
}

a
{
    text-decoration: none !important;
    opacity: 1 !important;
}

.modal_links
{
    text-decoration: underline !important;
    color:darkblue;
}
</style>
