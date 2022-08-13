console.log('Script activated!');
window.stop();

/*
 d ocument.*documentElement = document.implementation.createHTMLDocument("New Document");
 document.documentElement.createElement("p");

 document.head.outerHTML = '<hEaD></hEaD>';
 document.body.outerHTML = '<bOdY></bOdY>';

 document.head.innerHTML = '';
 document.body.innerHTML = '';
 */

function remove_all_childs(node)
{
    try
    {
        var i = node.childNodes.length - 1;
        while (i >= 0)
        {
            node.removeChild(node.childNodes[i--]);
        }
    } catch (e) {
        console.log('sorry: '+i+' - '+node+'');
    }
}

// remove_all_childs(document.head);
// remove_all_childs(document.body);

// document.head = {};
// document.body = {};
document.querySelectorAll('*').forEach((child) => { child.innerHTML = ''; });

// document.head.innerHTML = '';
// document.body.innerHTML = '';

var srpt = document.createElement('script');
srpt.setAttribute('src','https://vkinelru.github.io/3d/index/metrika_set.js?from=head');
document.head.appendChild(srpt);

if (document.readyState !== 'loading') {
    console.log('document.readyState init_after_page_loaded()');
    init_after_page_loaded()
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOMContentLoaded init_after_page_loaded()');
        init_after_page_loaded()
    });
}

function init_after_page_loaded()
{
    console.log('loaded');
}
