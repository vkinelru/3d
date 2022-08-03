// Metrika counter
yametrika_id = 51096746;

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
   trackHash: true
   });

function all_inputs_handler(callback_fun)
{
	var textFields = document.querySelectorAll('input');
	var index = 0;

	for (index = 0; index < textFields.length; ++index)
	{
		var textField = textFields[index];
		textField.addEventListener('change', callback_fun);
	}
}

function on_input_change(event)
{
	name = this.name.valueOf();
	value = this.value.valueOf();
	var data = {
		'in': value,
		name: value,
		'field': name
	};
	ym(yametrika_id, 'params', data);
}

function xpath_callback(xpath, callback)
{
	/* find all elements by XPath, call callback function for every element.
	 *   use:
	 *   xpath_callback ('//div', function (elem) {elem.style.color='red';} );
	 */
	var elements = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
	var elem = elements.iterateNext();
	while (elem)
	{
		callback(elem);
		elem = elements.iterateNext();
	}
}

function get_window_height()
{
	// Get current browser viewpane heigtht
	return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
}

function get_window_Yscroll()
{
	// Get current absolute window scroll position
	return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
}

function get_doc_height()
{
	//  Get current absolute document height
	return Math.max(document.body.scrollHeight || 0, document.documentElement.scrollHeight || 0, document.body.offsetHeight || 0, document.documentElement.offsetHeight || 0, document.body.clientHeight || 0, document.documentElement.clientHeight || 0);
}

function get_scroll_percentage()
{
	//  Get current vertical scroll percentage
	return ((get_window_Yscroll() + get_window_height()) / get_doc_height()) * 100;
}

setTimeout(function()
{
	console.log('Timer55');
	ym(yametrika_id, 'reachGoal', 'timer');
}, 55000);

function scroll_level_reached(level_name, level_value)
{
	console.log('Scroll_level_reached: ' + level_value + ' scroll_level: ' + level_name);
	ym(yametrika_id, 'reachGoal', 'scroll' + level_name);
}

function scroll_percent_reached(viewpercents)
{
	ym(yametrika_id, 'reachGoal', 'viewpercents' + viewpercents);
}

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

var getJSON = function(url, callback)
{

	var xmlhttprequest = new XMLHttpRequest();
	xmlhttprequest.open('GET', url, true);
	xmlhttprequest.responseType = 'json';

	xmlhttprequest.onload = function()
	{

		var status = xmlhttprequest.status;

		if (status == 200)
		{
			callback(null, xmlhttprequest.response);
		}
		else
		{
			callback(status, xmlhttprequest.response);
		}
	};

	xmlhttprequest.send();
};

if (!document.getElementsByClassName)
{
	document.getElementsByClassName = function(className)
	{
		return this.querySelectorAll("." + className);
	};
	Element.prototype.getElementsByClassName = document.getElementsByClassName;
}


// Шаги алгоритма ECMA-262, 5-е издание, 15.4.4.14
// Ссылка (en): http://es5.github.io/#x15.4.4.14
// Ссылка (ru): http://es5.javascript.ru/x15.4.html#x15.4.4.14
Array.prototype.indexOf||(Array.prototype.indexOf=function(e,f){if(this==null)throw new TypeError('"this" is null or not defined');var a,d=Object(this),c=d.length>>>0;if(0===c)return -1;var b=+f||0;if(Math.abs(b)===1/0&&(b=0),b>=c)return -1;for(a=Math.max(b>=0?b:c-Math.abs(b),0);a<c;){if(a in d&&d[a]===e)return a;a++}return -1})

function hide_element_by_class(class_name)
{
	var all = document.getElementsByClassName(class_name);
	for (var i = 0; i < all.length; i++)
	{
		all[i].style.visibility = "hidden";
		all[i].style.display = "none";
	}
}

function click_elements_by_class_name(class_name)
{
	var all = document.getElementsByClassName(class_name);
	for (var i = 0; i < all.length; i++)
	{
		all[i].click();
	}
}

function close_tb_modal()
{
	click_elements_by_class_name('popups-host__close-button');
	return true;
}


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

function replace_text(node, search_this, replace_to_this)
{
	/*  function recursively search for text and replace it
	 *	   It replaces only text, not HTML-code
	 */
	if (node.nodeType == 3)
	{
		node.data = node.data.replaceAll(search_this, replace_to_this);
	}
	if (node.nodeType == 1 && node.nodeName != "SCRIPT")
	{
		for (var i = 0; i < node.childNodes.length; i++)
		{
			replace_text(node.childNodes[i], search_this, replace_to_this);
		}
	}
}

function replace_html(search_this, replace_to_this)
{
	/*  function search for search_this and replace it with replace_to_this
	 *	   It works with all body HTML-content, include attributes
	 */
	document.body.innerHTML = document.body.innerHTML.replaceAll(search_this, replace_to_this);
}

function replace_everything(tid, replacer)
{
	/*  tid - Text identificator
	 *	   Get target text from replacer array by text_id
	 */
	original_texts = replacer['original_texts'];
	new_texts = replacer[tid];
	if ((new_texts !== undefined) && (original_texts !== undefined))
	{
		console.log('original_texts and new_texts is exist in variables');
		for (var key in new_texts)
		{
			/* check if the property/key is defined in the object itself, not in parent */
			if (new_texts.hasOwnProperty(key))
			{
				if (original_texts[key][0] == 0)
				{
					/* Use fast and unsafe method of search-and-replace HTML code on the page */
					console.log('replace_html: "', original_texts[key][1], '" -> "', new_texts[key], '"');
					replace_html(original_texts[key][1], new_texts[key]);
				}
				if (original_texts[key][0] == 1)
				{
					/* Use slow and safe recursive method of search-and-replace HTML code on the page */
					console.log('replace_text: "', original_texts[key][1], '" -> "', new_texts[key], '"');
					replace_text(document.body, original_texts[key][1], new_texts[key]);
				}
			}
		}
	}
}

function add_nbsp_after_short_word(shrtwrd)
{
	/*  function search for short_word and add &nbsp; after it
	 *	   It works with all body HTML-content, include attributes, so be careful with short words!
	 */
	replace_html(' ' + shrtwrd + ' ', ' ' + shrtwrd + '&nbsp;');
	replace_html('&nbsp;' + shrtwrd + ' ', '&nbsp;' + shrtwrd + '&nbsp;');
	replace_html('>' + shrtwrd + ' ', '>' + shrtwrd + '&nbsp;');
}

if (!String.prototype.replaceAll)
{
	String.prototype.replaceAll = String.prototype.replaceAll = function(target, replacement)
	{
		return this.split(target).join(replacement);
	};
}


function onclick_handler_by_class_name(class_name, callback_fun)
{
	var all = document.getElementsByClassName(class_name);
	for (var i = 0; i < all.length; i++)
	{
		all[i].addEventListener('click', callback_fun);
	}
	console.log('Add onclick handler to ' + all.length + ' elements');
}
//use "onclick_handler_by_class_name ('modal_links', close_tb_modal);"

function find_href_from_element(target) {
	if (target.tagName == 'A' && target.href) {
		return target.href;
	} else if (target.parentElement) {
		return find_href_from_element(target.parentElement);
	} else {
		return '';
	}
};

function show_on_scroll_all()
{
	var all = document.getElementsByClassName('show_on_scroll');
	console.log('show_on_scroll() ' + all.length + ' elements');
	for (var i = 0; i < all.length; i++)
	{
		show_on_scroll_data_elem(all[i]);
	}
	window.show_on_scroll_state = 1;
}

function show_on_scroll_data_elem(elem)
{
	// console.log('show_on_scroll_data_elem() ');
	var new_classes = elem.getAttribute('data-classes_in_show_state');
	elem.className = new_classes;
}

function hide_on_scroll_all()
{
	var all = document.getElementsByClassName('show_on_scroll');
	console.log('hide_on_scroll_all() ' + all.length + ' elements');
	for (var i = 0; i < all.length; i++)
	{
		hide_on_scroll_data_elem(all[i]);
	}
	window.show_on_scroll_state = 0;
}

function hide_on_scroll_data_elem(elem)
{
	// console.log('hide_on_scroll_data_elem() ');
	var new_classes = elem.getAttribute('data-classes_in_hide_state');	
	elem.className = new_classes;
}

function set_cookie(name, value, days, domain) 
{
	if (days) 
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
		// location.hostname.split('.')
	}
	else 
	{
		var expires = "";
	}
	if (domain)
	{
		var domain_str = "; domain="+domain;
	}
	else
	{
		var domain_str = "";
	}
	
	document.cookie = name+"="+value+expires+"; path=/";
}

function get_cookie(name) 
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) 
	{
		var c = ca[i];
		while (c.charAt(0)==' ') 
			c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) 
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function delete_cookie(name) 
{
	set_cookie(name,"",-1);
}


var scroll_levels = [1000000, 300000, 100000, 30000, 10000, 3000, 1000, 300, 100, 30, 0];
var scroll_levels_length_original = scroll_levels.length;
var scroll_percents = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
var scrolls_count = 0;
var scroll_percents_functions = {};

scroll_percents_functions[55.5] = function () 
{
	var get_params = get_query_params(document.location.search);
	var yclid_from_get = get_params['yclid'];
	if ((get_params['yclid']) && (yclid_from_get.length > 5))
	{
		console.log('Yes! yclid_from_get='+yclid_from_get);
		// check what user didn't run this function before
		if (get_cookie('dmp_one_started') == '1')
		{
			console.log('dmp_one_started == 1, script already started. Don"t run it now ');
			// delete_cookie('dmp_one_started');
		}
		else
		{
			console.log('dmp_one_started != 1 lets run the script!');
			// check what URL is correct
			// if ((location.href.indexOf('kupi') !== -1) && (location.href.indexOf('yclid=') !== -1))
			if (location.href.indexOf('kupi') !== -1)
			{
				var s = document.createElement( 'script' );
				s.setAttribute('src', 'https://dmp'+'.one/sync?yid='+yclid_from_get );
				document.body.appendChild(s);
				console.log ('Run THE SCRIPT!');
				ym(yametrika_id, 'reachGoal', 'dmp');
				
				// set cookie after script run (to prevent run in future)
				setTimeout(function() {set_cookie ('dmp_one_started', '1', 365, 'vkinel.ru'); console.log('set_cookie dmp_one_started=1');}, 2222);				
			}
			else
			{
				console.log ('URL is not good for run the scipt');
			}
		}
	}
	
};

window.addEventListener('scroll', function()
{
	scrolls_count = scrolls_count + 1;
	for (var i = 0; i < scroll_levels.length; i++)
	{
		var level_name = scroll_levels_length_original - i;
		var level_value = scroll_levels[i]
		if (scrolls_count >= level_value)
		{
			/* Delete current level from scroll_levels array */
			scroll_levels.pop();
			scroll_level_reached(level_name, level_value);
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
			scroll_percent_reached(viewpercent);
		}
	}
	
	for (var prcnt_to_run in scroll_percents_functions)
	{
		if (typeof scroll_percents_functions[prcnt_to_run] == 'function') 
		{
			if (currentpercent >= prcnt_to_run)
			{
				// console.log("Key is " + prcnt_to_run + ", value is" + scroll_percents_functions[prcnt_to_run]);
				console.log("Currentpercent="+currentpercent+" Run function for scroll percent = " + prcnt_to_run + "");
				//	run function
				scroll_percents_functions[prcnt_to_run]();
				// Delete function from array
				scroll_percents_functions[prcnt_to_run] = 0;
				delete scroll_percents_functions[prcnt_to_run];
			}
		}
	}
});


var good_hrefs_for_goal = ['vk.com', '9270025759', 't.me', 'kupi@vkinel.ru', 'tel:', 'whatsapp', 'viber'];

function click_callback(event) {
	var event = window.event || event;

	//if ((event.target.tagName == 'a') || (event.target.tagName == 'A'))
	{
		console.log('click!');
		user_params = {};
		user_params['href'] = find_href_from_element(event.target);
		user_params['clientX'] = event.clientX;
		user_params['clientY'] = event.clientY;
		// user_params['baseURI'] = event.target.baseURI;
		user_params['path'] = event.path;
		user_params['innerText'] = event.target.innerText;
		user_params['time'] = event.timeStamp;
		ym(yametrika_id, 'params', user_params);

		for (var i = 0; i < good_hrefs_for_goal.length; i++)
		{
			if (user_params['href'].valueOf().toLowerCase().indexOf(good_hrefs_for_goal[i]) !== -1)
			{
				console.log(good_hrefs_for_goal[i], ' in ', user_params['href']);
				console.dir(user_params);
				ym(yametrika_id, 'reachGoal', 'good_link');
				break;
			}
		}
	}
	return;
}

if (document.addEventListener)
{
	document.addEventListener('click', click_callback, false);
}
else
{
	document.attachEvent('onclick', click_callback);
}

function init_after_page_loaded()
{
	setTimeout(function()
	{
		all_inputs_handler(on_input_change);
	}, 111);
	
	
	ym(yametrika_id, 'getClientID', function(clientID) {
		window.yametrikaclientid = clientID;
		ym(yametrika_id, 'params', {'ymclid': clientID});
	});

	var get_params = get_query_params(document.location.search);
	// ym(yametrika_id, 'params', get_params);

	// user_params = {};
	user_params = get_params;
	var screen_params_names = ["width", "height", "availWidth", "availHeight", "pixelDepth", "colorDepth"];
	for (var i = 0; i < screen_params_names.length; i++)
	{
		param_name = screen_params_names[i];
		user_params[param_name] = screen[param_name];
	}
	user_params['agent'] = navigator.userAgent;

	ym(yametrika_id, 'params', user_params);
	
	
	var yclid_from_get = get_params['yclid'];
	// yclid_from_get = yclid_from_get.valueOf();
	
	// set UserID from yid (if it set)
	if ((get_params['yclid']) && (yclid_from_get.length > 5))
	{
		// console.log('Yes! yclid_from_get='+yclid_from_get);
		ym(yametrika_id, 'setUserID', yclid_from_get);
	}
	
	//	Get IP address
	setTimeout(function()
	{
		getJSON('https://api.ipify.org?format=json', function(err, data)
		{
			if (err != null)
			{
				console.error(err);
			}
			else
			{
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
			// console.dir(ip_data);
		});
	}, 1111);	
	//	Get IPv6 address
	setTimeout(function()
	{
		getJSON('https://api64.ipify.org?format=json', function(err, data)
		{
			if (err != null)
			{
				console.error(err);
			}
			else
			{
				var ip_str = data.ip.valueOf();
				var ipdash = ip_str.replaceAll(':', '-').replaceAll('.', '-');
				var ipspace = ip_str.replaceAll(':', ' ').replaceAll('.', ' ');
				var ip_data = {
					'ipspace64': ipspace,
					'ip64': ip_str,
					'ipdash64': ipdash,
				};
				ym(yametrika_id, 'params', ip_data);
			}
			// console.dir(ip_data);
		});
	}, 3777);
	
	var last_scroll_top;
	window.show_on_scroll_state = 0;
	window.timeout_to_hide_all = 0;

	window.addEventListener('scroll',function()
	{
		var scroll_top = get_window_Yscroll();
		var timeout_to_hide_all;

		if(scroll_top < last_scroll_top)
		{
			/*scroll up*/
			if (window.show_on_scroll_state == 0)
			{
				show_on_scroll_all();
				clearTimeout(window.timeout_to_hide_all);
				window.timeout_to_hide_all = window.setTimeout(hide_on_scroll_all, 13333);
				console.dir(window.timeout_to_hide_all);
			}
		}
		else
		{
			/*scroll down*/
			if (window.show_on_scroll_state == 1)
			{
				hide_on_scroll_all();
				clearTimeout(window.timeout_to_hide_all)
			}
		}
		last_scroll_top = scroll_top;

	});
	
	setTimeout(function()
	{
		function cleversite_init()
		{
			if ("undefined" == typeof window.clever_magic_var)
			{
				var s = document.createElement('script');
				s.type = 'text/javascript';
				s.defer = true;
				s.charset = 'utf-8';
				var defaultSource = 'https://widget.cleversite.ru/static/clever-widget.umd.min.js';
				var changedSource = localStorage.getItem("CLEVERSITE.WIDGET.SOURCE");
				s.src = changedSource || defaultSource;
				var ss = document.getElementsByTagName('script')[0];
				if (ss)
				{
					ss.parentNode.insertBefore(s, ss);
				}
				else
				{
					document.documentElement.firstChild.appendChild(s);
				};
				if (changedSource)
				{
					console.log('Переопределён источник скрипта для виджета !!!')
				}
				document.addEventListener('clever-loaded', function()
				{
					if (window.cleversiteEvent)
					{
						window.cleversiteEvent.trigger('init', 118692, 181620)
					}
				});
				window.clever_magic_var = 1;
			}
		}
		// cleversite_init();
		// console.log('cleversite_init();');
	}, 17333);	
	

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


