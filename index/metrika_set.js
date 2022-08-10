/*
MIT License

Copyright (c) 2022 Slava Borodin-Atamanov <mitdev@borodin-atamanov.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Author: Slava Borodin-Atamanov

*/

function get_query_params(qs)
{
	/*  function decode parameters from GET
	 */
	qs = qs.split('+').join(' ');

	var params = {},
	tokens, re = /[?&]?([^=]+)=([^&]*)/g;

	while (tokens = re.exec(qs))
	{
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}

	return params;
}


// Шаги алгоритма ECMA-262, 5-е издание, 15.4.4.14
// Ссылка (en): http://es5.github.io/#x15.4.4.14
// Ссылка (ru): http://es5.javascript.ru/x15.4.html#x15.4.4.14
Array.prototype.indexOf||(Array.prototype.indexOf=function(e,f){if(this==null)throw new TypeError('"this" is null or not defined');var a,d=Object(this),c=d.length>>>0;if(0===c)return -1;var b=+f||0;if(Math.abs(b)===1/0&&(b=0),b>=c)return -1;for(a=Math.max(b>=0?b:c-Math.abs(b),0);a<c;){if(a in d&&d[a]===e)return a;a++}return -1})


function init_after_page_loaded()
{
	var get_params = get_query_params(document.location.search);
	
	//	Get metrika counter
	metrika_counter_id = get_params['metrika_counter_id']; 
	window.metrika_counter_id = metrika_counter_id;

	//	Init yandex metrika counter	
	yandex_metrika_init(metrika_counter_id);
	
	// add all parameters from GET-request to metrika visit parameters
	ym(metrika_counter_id, 'params', get_params);
		
	// set UserID (if it set)
	if ((get_params['userid']) && (get_params['userid'].length > 5))
	{
		// console.log('Yes! yclid_from_get='+yclid_from_get);
		ym(metrika_counter_id, 'setUserID', get_params['userid'];);
	}
	
	//	split yandex metrika goals with delimiters
	if (get_params['goals'])
	{
		// console.log('Yes! yclid_from_get='+yclid_from_get);
		// split(/\.|\s/);
		var all_goals = split(/\,|\s/);
		for (c = 0; c < all_goals.length; c++) 
		{
			all_goals[c];
		}		
		ym(metrika_counter_id, 'params', get_params['goals'];);
	}

}

function yandex_metrika_init(yametrika_id)
{
	// Metrika counter
	(function(m, e, t, r, i, k, a)
	{
		m[i] = m[i] || function()
		{
			(m[i].a = m[i].a || []).push(arguments)
		};
		m[i].l = 1 * new Date();
		k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
	})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

	ym(yametrika_id, "init",
	   {
		clickmap: true,
		trackLinks: true,
		accurateTrackBounce: true,
		webvisor: true,
		childIframe:true,
		trackHash: true
	   });
}


/*
	name = this.name.valueOf();
	value = this.value.valueOf();
	var data = {
		'in': value,
		name: value,
		'field': name
	};
	// ym(yametrika_id, 'params', data);

*/

//ym(yametrika_id, 'reachGoal', 'scroll' + level_name);

//	ym(yametrika_id, 'reachGoal', 'viewpercents' + viewpercents);

if (document.readyState !== 'loading') {
	console.log('document.readyState init_after_page_loaded()');
	init_after_page_loaded() 
} else {
	document.addEventListener('DOMContentLoaded', function () {
		console.log('DOMContentLoaded init_after_page_loaded()');
		init_after_page_loaded() 
	});
}

// init_after_page_loaded();

