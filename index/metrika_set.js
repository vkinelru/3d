var copyright_text = 'MIT License\n' +
'Copyright (c) 2022 Slava Borodin-Atamanov <mitdev@borodin-atamanov.ru>\n' +
'Permission is hereby granted, free of charge, to any person obtaining a copy ' +
'of this software and associated documentation files (the "Software"), to deal ' +
'in the Software without restriction, including without limitation the rights ' +
'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell ' +
'copies of the Software, and to permit persons to whom the Software is ' +
'furnished to do so, subject to the following conditions: ' +
'The above copyright notice and this permission notice shall be included in all ' +
'copies or substantial portions of the Software. ' +
'The software is provided "as is", without warranty of any kind, express or ' +
'implied, including but not limited to the warranties of merchantability, ' +
'fitness for a particular purpose and noninfringement. in no event shall the ' +
'authors or copyright holders be liable for any claim, damages or other ' +
'liability, whether in an action of contract, tort or otherwise, arising from, ' +
'out of or in connection with the software or the use or other dealings in the software. ' +

'<pre>' +
'\nAuthor: Slava Borodin-Atamanov' +
'\nImportant GET-parameters:' +
'\nmetrika_counter_id' +
'\nRequired parameter, integer' +
'\nuser_id' +
'\nsetUserID method from metrika' +
'\nreach_goal' +
'\nreachGoal in metrika (goal must be in your metrika\'s settings)' +
'\nwait_for_die' +
'\nSleep <wait_for_die> ms before end' +
'\nAny other GET-parameters will add to metrika\'s visit parametrs';
'</pre>';

function mylog(mes)
{
	console.log(mes);
	var elem = document.createElement('div');
	document.body.appendChild(elem);
	elem.innerHTML = mes;
}

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

	//	Get metrika counter id
	if (!get_params['metrika_counter_id'])
	{
		// Critical error
        mes = 'metrika_counter_id is the required GET-parameter!'; mylog(mes);
        console.error(mes);
        return false;
	}

	// Get metrika UserID (if it present)
    if (!get_params['user_id'])
    {
        // Critical error
        mes = 'user_id is the required GET-parameter!'; mylog(mes);
        console.error(mes);
        return false;
    }

	// enable Metrika debug mode
	window['_ym_debug']=1;

	metrika_counter_id = get_params['metrika_counter_id'];
    mylog('metrika_counter_id='+metrika_counter_id);
    get_params['UserID'] = get_params['user_id'];
    mylog('setUserID='+get_params['user_id']);
    //	Init yandex metrika counter
    yandex_metrika_init(metrika_counter_id, get_params['UserID'], get_params);
    //  window.metrika_counter_id = metrika_counter_id;

    ym(metrika_counter_id, 'setUserID', get_params['user_id']);

    //	yandex metrika goals
	if (get_params['reach_goal'])
	{
		//	TODO split goals to array, reach every goal
		//	var all_goals = split(/\,|\s/);
		//	for (c = 0; c < all_goals.length; c++)
		//	{
		//		ym(metrika_counter_id, 'reachGoal', all_goals[c]);
		//	}
		ym(metrika_counter_id, 'reachGoal', get_params['reach_goal']);
		mylog('reachGoal='+get_params['reach_goal']);
	}

	// add all parameters from GET-request to metrika visit parameters and user parameters
	console.dir(get_params);
    delete get_params['metrika_counter_id'];
    delete get_params['user_id'];
    delete get_params['reach_goal'];
    delete get_params['wait_for_die'];
    ym(metrika_counter_id, 'userParams', get_params);
    ym(metrika_counter_id, 'params', get_params);

    //	Is wait for die ms time set?
    if (get_params['wait_for_die'])
    {
        var wait_for_die = parseInt(get_params['wait_for_die']);
        if (isNaN(wait_for_die)) wait_for_die=377;
        wait_for_die = wait_for_die + 1;
    }
    else
    {
        var wait_for_die=377;
    }
    mylog('wait_for_die='+wait_for_die);

	setTimeout(function()
	{
		mylog('finalize_page()');
		finalize_page();
	}, wait_for_die);
}

function yandex_metrika_init(yametrika_id, UserID, params)
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
    // https://yandex.ru/support/metrica/code/counter-initialize.html?lang=en
    // clickmap: true,
    // accurateTrackBounce: true,
    // defer
    // ecommerce
    // params
    // userParams
    // trackHash
    // trackLinks
    // trustedDomains
    // type
    // webvisor
    // triggerEvent
    // childIframe
    // childIframe
    // childIframe:true,
    trackLinks: true,
    triggerEvent: true,
    webvisor: true,
    trackHash: true,

    // includes UserID
    userParams: params,
    params: params,
    });
}

if (document.readyState !== 'loading')
{
	console.log('document.readyState init_after_page_loaded()');
	init_after_page_loaded();
}
else
{
	document.addEventListener('DOMContentLoaded', function () {
		console.log('DOMContentLoaded init_after_page_loaded()');
		init_after_page_loaded();
	});
}

// init_after_page_loaded();

function finalize_page()
{
	var elem = document.createElement('div');
	document.body.appendChild(elem);
	elem.outerHTML = '<div id="absolute_ready">'+copyright_text+'</div>';
}


