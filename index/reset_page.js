console.log('Script activated!');
window.stop();

// document.head = {};
// document.body = {};
document.querySelectorAll('*').forEach((child) => { child.innerHTML = ''; });

// document.head.innerHTML = '';
// document.body.innerHTML = '';

/*
var srpt = document.createElement('script');
srpt.setAttribute('src','https://vkinelru.github.io/3d/index/metrika_set.js?from=head');
document.head.appendChild(srpt);
*/

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
    console.log('reseted page loaded');

}
