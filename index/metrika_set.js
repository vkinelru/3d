var copyright_text = 'MIT License' +
'Copyright (c) 2022 Slava Borodin-Atamanov <mitdev@borodin-atamanov.ru>' +
'Permission is hereby granted, free of charge, to any person obtaining a copy' +
'of this software and associated documentation files (the "Software"), to deal' +
'in the Software without restriction, including without limitation the rights' +
'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell' +
'copies of the Software, and to permit persons to whom the Software is' +
'furnished to do so, subject to the following conditions:' +
'The above copyright notice and this permission notice shall be included in all' +
'copies or substantial portions of the Software.' +
'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR' +
'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,' +
'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE' +
'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER' +
'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,' +
'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE' +
'SOFTWARE.' +
'Author: Slava Borodin-Atamanov' +
'Important GET-parameters:' +
'metrika_counter_id' +
'Required parameter, integer' +
'user_id' +
'setUserID method from metrika' +
'reach_goal' +
'reachGoal in metrika (goal must bu in your metrika\'s settings)' +
'Any other GET-parameters will add to metrika\'s visit parametrs';

// console.log (copyright_text);

function get_query_params(qs)
{
	/*  function decode parameters from GET */
	qs = qs.split('+').join(' ');

	var params = {},
	tokens, re = /[?&]?([^=]+)=([^&]*)/g;

	while (tokens = re.exec(qs))
	{
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}

	return params;
}

function init_after_page_loaded()
{
	var get_params = get_query_params(document.location.search);
	
	//	Get metrika counter
	if (!get_params['metrika_counter_id'])
	{
		// Critical error
		console.error('metrika_counter_id is the required parameter!');
		return false;
	}
	//	Init yandex metrika counter	
	metrika_counter_id = get_params['metrika_counter_id']; 
	yandex_metrika_init(metrika_counter_id);
	window.metrika_counter_id = metrika_counter_id;
	console.log('metrika_counter_id='+metrika_counter_id);

	// set UserID (if it set)
	if (get_params['user_id'])
	{
		ym(metrika_counter_id, 'setUserID', get_params['user_id']);
		console.log('setUserID='+get_params['user_id']);
	}
	
	//	split yandex metrika goals with delimiters
	if (get_params['reach_goal'])
	{
		//	TODO split goals to array, reach every goal
		//	var all_goals = split(/\,|\s/);
		//	for (c = 0; c < all_goals.length; c++) 
		//	{
		//		ym(metrika_counter_id, 'reachGoal', all_goals[c]);
		//	}
		ym(metrika_counter_id, 'reachGoal', get_params['reach_goal']);
		console.log('reachGoal='+get_params['reach_goal']);
	}

	delete get_params['metrika_counter_id'];
	delete get_params['user_id'];
	delete get_params['reach_goal'];
	// add all parameters from GET-request to metrika visit parameters
	ym(metrika_counter_id, 'params', get_params);
	console.dir(get_params);
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

