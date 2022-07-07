// Metrika counter
yametrika_id = 51096746;

(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(yametrika_id, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true });


(function(m, e, t, r, i, k, a) {
    m[i] = m[i] || function() {
        (m[i].a = m[i].a || []).push(arguments)
    }
    ;
    m[i].l = 1 * new Date();
    k = e.createElement(t),
 a = e.getElementsByTagName(t)[0],
 k.async = 1,
 k.src = r,
 a.parentNode.insertBefore(k, a)
}
)(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(yametrika_id, "init", {
    clickmap: true,
   trackLinks: true,
   accurateTrackBounce: true,
   webvisor: true,
   trackHash: true,
   ecommerce: "dataLayer"
});

function all_inputs_handler(callback_fun) {
    var textFields = document.querySelectorAll('input');
    var index = 0;

    for (index = 0; index < textFields.length; ++index) {
        var textField = textFields[index];
        textField.addEventListener('change', callback_fun);
    }
}

function on_input_change(event) {
    name = this.name.valueOf();
    value = this.value.valueOf();
    var data = {
        'in': value,
        name: value,
        'field': name
    };
    ym(yametrika_id, 'params', data);
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        all_inputs_handler(on_input_change);
    }, 1111);
}, false);

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
        }
        ;if (changedSource) {
            console.log('Переопределён источник скрипта для виджета !!!')
        }
        document.addEventListener('clever-loaded', function() {
            if (window.cleversiteEvent) {
                window.cleversiteEvent.trigger('init', 118692, 181620)
            }
        }
        );
        window.clever_magic_var = 1;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        console.log('cleversite_init();');
        cleversite_init();
    }, 5555);
}, false);

function xpath_callback(xpath, callback) {
    /* find all elements by XPath, call callback function for every element.
     *   use:
     *   xpath_callback ('//div', function (elem) {elem.style.color='red';} );
     */
    var elements = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    var elem = elements.iterateNext();
    while (elem) {
        callback(elem);
        elem = elements.iterateNext();
    }
}

/**
 * Get current browser viewpane heigtht
 */
function get_window_height() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
}

/**
 * Get current absolute window scroll position
 */
function get_window_Yscroll() {
    return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
}

/**
 * Get current absolute document height
 */
function get_doc_height() {
    return Math.max(document.body.scrollHeight || 0, document.documentElement.scrollHeight || 0, document.body.offsetHeight || 0, document.documentElement.offsetHeight || 0, document.body.clientHeight || 0, document.documentElement.clientHeight || 0);
}

/**
 * Get current vertical scroll percentage
 */
function get_scroll_percentage() {
    return ((get_window_Yscroll() + get_window_height()) / get_doc_height()) * 100;
}

setTimeout(function() {
    console.log('Timer55');
    ym(yametrika_id, 'reachGoal', 'timer');
}, 55000);

var scroll_levels = [1000000, 300000, 100000, 30000, 10000, 3000, 1000, 300, 100, 30, 0];

var scroll_percents = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];

var scrolls_count = 0;

function scroll_level_reached(level_name, level_value) {
    console.log('Scroll_level_reached: ' + level_value + ' scroll_level: ' + level_name);
    ym(yametrika_id, 'reachGoal', 'scroll' + level_name);
}

function scroll_percent_reached(viewpercents, currentpercent) {
    console.log('Scroll_percent_reached: ' + viewpercents + ' current percentage of view=' + currentpercent);
    ym(yametrika_id, 'reachGoal', 'viewpercents' + viewpercents);
}

window.addEventListener('scroll', function() {
    scrolls_count = scrolls_count + 1;
    for (var i = 0; i < scroll_levels.length; i++) {
        var level_name = scroll_levels.length - i;
        var level_value = scroll_levels[i]
        if (scrolls_count >= level_value) {
            /* Delete current level from scroll_levels array */
            scroll_levels.pop();
            scroll_level_reached(level_name, level_value);
        }
    }

    currentpercent = get_scroll_percentage();
    for (var i = 0; i < scroll_percents.length; i++) {
        var viewpercent = scroll_percents[i]
        if (currentpercent >= scroll_percents[i]) {
            /* Delete current level from scroll_percents array */
            scroll_percents.pop();
            scroll_percent_reached(viewpercent, currentpercent);
        }
    }

});

function get_query_params(qs) {
    /*  function decode parameters from GET
     */
    qs = qs.split('+').join(' ');

    var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
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
    }
    ;

    xmlhttprequest.send();
};

document.addEventListener('DOMContentLoaded', function() {
    getJSON('https://api.ipify.org?format=json', function(err, data) {
        if (err != null) {
            console.error(err);
        } else {
            var ip_str = data.ip.valueOf();
            var ipdash = ip_str.replaceAll('.', '-');
            var ipspace = ip_str.replaceAll('.', ' ');
            var ip_data = {
                'ipspace': ipspace,
            'ip': ip_str,
            'ipdash': ipdash,
            };
            ym(yametrika_id, 'params', ip_data);
        }
        console.dir(ip_data);
    });
}, false);

document.addEventListener('DOMContentLoaded', function() {
    var get_params = get_query_params(document.location.search);
    ym(yametrika_id, 'params', get_params);

    user_params = {};
    var screen_params_names =
    ["width","height","availWidth","availHeight","pixelDepth","colorDepth"];
    for (var i = 0; i < screen_params_names.length; i++)
    {
        param_name = screen_params_names[i];
        user_params[param_name] = screen[param_name];
    }
    user_params['agent'] = navigator.userAgent;
    ym(yametrika_id, 'params', user_params);
});

if (!document.getElementsByClassName) {
    document.getElementsByClassName = function(className) {
        return this.querySelectorAll("." + className);
    }
    ;
    Element.prototype.getElementsByClassName = document.getElementsByClassName;
}

function hide_element_by_class(class_name) {
    var all = document.getElementsByClassName(class_name);
    for (var i = 0; i < all.length; i++) {
        all[i].style.visibility = "hidden";
        all[i].style.display = "none";
    }
}

function click_elements_by_class_name(class_name) {
    var all = document.getElementsByClassName(class_name);
    for (var i = 0; i < all.length; i++) {
        all[i].click();
    }
}

function close_tb_modal() {
    click_elements_by_class_name('popups-host__close-button');
    return true;
}

function onclick_handler_by_class_name(class_name, callback_fun) {
    var all = document.getElementsByClassName(class_name);
    for (var i = 0; i < all.length; i++) {
        all[i].addEventListener('click', callback_fun);
    }
    console.log('Add onclick handler to ' + all.length + ' elements');
}

//use "onclick_handler_by_class_name ('modal_links', close_tb_modal);"

document.addEventListener('DOMContentLoaded', function() {
    hide_element_by_class('s-footer');
    hide_element_by_class('s-back-to-top__icon');
    hide_element_by_class('s-back-to-top__image');
    hide_element_by_class('s-back-to-top');
    console.log('loaded');
}, false);
/* Copyright (c) 2022 Borodin-Atamanov */

function get_query_params(qs) {
    /*  function decode parameters from GET
     */
    qs = qs.split('+').join(' ');

    var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function replace_text(node, search_this, replace_to_this) {
    /*  function recursively search for text and replace it
     *       It replaces only text, not HTML-code
     */
    if (node.nodeType == 3) {
        node.data = node.data.replaceAll(search_this, replace_to_this);
    }
    if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
        for (var i = 0; i < node.childNodes.length; i++) {
            replace_text(node.childNodes[i], search_this, replace_to_this);
        }
    }
}

function replace_html(search_this, replace_to_this) {
    /*  function search for search_this and replace it with replace_to_this
     *       It works with all body HTML-content, include attributes
     */
    document.body.innerHTML = document.body.innerHTML.replaceAll(search_this, replace_to_this);
}

function replace_everything(tid, replacer) {
    /*  tid - Text identificator
     *       Get target text from replacer array by text_id
     */
    original_texts = replacer['original_texts'];
    new_texts = replacer[tid];
    if ((new_texts !== undefined) && (original_texts !== undefined)) {
        console.log('original_texts and new_texts is exist in variables');
        for (var key in new_texts) {
            /* check if the property/key is defined in the object itself, not in parent */
            if (new_texts.hasOwnProperty(key)) {
                if (original_texts[key][0] == 0) {
                    /* Use fast and unsafe method of search-and-replace HTML code on the page */
                    console.log('replace_html: "', original_texts[key][1], '" -> "', new_texts[key], '"');
                    replace_html(original_texts[key][1], new_texts[key]);
                }
                if (original_texts[key][0] == 1) {
                    /* Use slow and safe recursive method of search-and-replace HTML code on the page */
                    console.log('replace_text: "', original_texts[key][1], '" -> "', new_texts[key], '"');
                    replace_text(document.body, original_texts[key][1], new_texts[key]);
                }
            }
        }
    }
}

function add_nbsp_after_short_word(shrtwrd) {
    /*  function search for short_word and add &nbsp; after it
     *       It works with all body HTML-content, include attributes, so be careful with short words!
     */
    replace_html(' ' + shrtwrd + ' ', ' ' + shrtwrd + '&nbsp;');
    replace_html('&nbsp;' + shrtwrd + ' ', '&nbsp;' + shrtwrd + '&nbsp;');
    replace_html('>' + shrtwrd + ' ', '>' + shrtwrd + '&nbsp;');
}

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = String.prototype.replaceAll = function(target, replacement) {
        return this.split(target).join(replacement);
    }
    ;
}

function get_query_params(qs) {
    /*  function decode parameters from GET
     */
    qs = qs.split('+').join(' ');

    var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function replace_text(node, search_this, replace_to_this) {
    /*  function recursively search for text and replace it
     *     I *t replaces only text, not HTML-code
     */
    if (node.nodeType == 3) {
        node.data = node.data.replaceAll(search_this, replace_to_this);
    }
    if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
        for (var i = 0; i < node.childNodes.length; i++) {
            replace_text(node.childNodes[i], search_this, replace_to_this);
        }
    }
}

function replace_html(search_this, replace_to_this) {
    /*  function search for search_this and replace it with replace_to_this
     *     I *t works with all body HTML-content, include attributes
     */
    document.body.innerHTML = document.body.innerHTML.replaceAll(search_this, replace_to_this);
}

function replace_everything(tid, replacer) {
    /*  tid - Text identificator
     *     G *et target text from replacer array by text_id
     */
    original_texts = replacer['original_texts'];
    new_texts = replacer[tid];
    if ((new_texts !== undefined) && (original_texts !== undefined)) {
        console.log('original_texts and new_texts is exist in variables');
        for (var key in new_texts) {
            /* check if the property/key is defined in the object itself, not in parent */
            if (new_texts.hasOwnProperty(key)) {
                if (original_texts[key][0] == 0) {
                    /* Use fast and unsafe method of search-and-replace HTML code on the page */
                    console.log('replace_html: "', original_texts[key][1], '" -> "', new_texts[key], '"');
                    replace_html(original_texts[key][1], new_texts[key]);
                }
                if (original_texts[key][0] == 1) {
                    /* Use slow and safe recursive method of search-and-replace HTML code on the page */
                    console.log('replace_text: "', original_texts[key][1], '" -> "', new_texts[key], '"');
                    replace_text(document.body, original_texts[key][1], new_texts[key]);
                }
            }
        }
    }
}

function add_nbsp_after_short_word(shrtwrd) {
    /*  function search for short_word and add &nbsp; after it
     *     I *t works with all body HTML-content, include attributes, so be careful with short words!
     */
    replace_html(' ' + shrtwrd + ' ', ' ' + shrtwrd + '&nbsp;');
    replace_html('&nbsp;' + shrtwrd + ' ', '&nbsp;' + shrtwrd + '&nbsp;');
    replace_html('>' + shrtwrd + ' ', '>' + shrtwrd + '&nbsp;');
}

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = String.prototype.replaceAll = function(target, replacement) {
        return this.split(target).join(replacement);
    }
    ;
}

function get_query_params(qs) {
    /*  function decode parameters from GET
     */
    qs = qs.split('+').join(' ');

    var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function replace_text(node, search_this, replace_to_this) {
    /*  function recursively search for text and replace it
     *     I *t replaces only text, not HTML-code
     */
    if (node.nodeType == 3) {
        node.data = node.data.replaceAll(search_this, replace_to_this);
    }
    if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
        for (var i = 0; i < node.childNodes.length; i++) {
            replace_text(node.childNodes[i], search_this, replace_to_this);
        }
    }
}

function replace_html(search_this, replace_to_this) {
    /*  function search for search_this and replace it with replace_to_this
     *     I *t works with all body HTML-content, include attributes
     */
    document.body.innerHTML = document.body.innerHTML.replaceAll(search_this, replace_to_this);
}

function replace_everything(tid, replacer) {
    /*  tid - Text identificator
     *     G *et target text from replacer array by text_id
     */
    original_texts = replacer['original_texts'];
    new_texts = replacer[tid];
    if ((new_texts !== undefined) && (original_texts !== undefined)) {
        console.log('original_texts and new_texts is exist in variables');
        for (var key in new_texts) {
            /* check if the property/key is defined in the object itself, not in parent */
            if (new_texts.hasOwnProperty(key)) {
                if (original_texts[key][0] == 0) {
                    /* Use fast and unsafe method of search-and-replace HTML code on the page */
                    console.log('replace_html: "', original_texts[key][1], '" -> "', new_texts[key], '"');
                    replace_html(original_texts[key][1], new_texts[key]);
                }
                if (original_texts[key][0] == 1) {
                    /* Use slow and safe recursive method of search-and-replace HTML code on the page */
                    console.log('replace_text: "', original_texts[key][1], '" -> "', new_texts[key], '"');
                    replace_text(document.body, original_texts[key][1], new_texts[key]);
                }
            }
        }
    }
}

function add_nbsp_after_short_word(shrtwrd) {
    /*  function search for short_word and add &nbsp; after it
     *     I *t works with all body HTML-content, include attributes, so be careful with short words!
     */
    replace_html(' ' + shrtwrd + ' ', ' ' + shrtwrd + '&nbsp;');
    replace_html('&nbsp;' + shrtwrd + ' ', '&nbsp;' + shrtwrd + '&nbsp;');
    replace_html('>' + shrtwrd + ' ', '>' + shrtwrd + '&nbsp;');
}

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = String.prototype.replaceAll = function(target, replacement) {
        return this.split(target).join(replacement);
    }
    ;
}
