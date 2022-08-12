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

/*
 # this will create new .format() function for Date object
 # there is auto localization from Intl, but you can also set language as a 2nd argument
 # all possible values were tested and compared on Apache server with PHP 8 date() function
 # you can find minified version in the first comment
 # examples:
 new Date().format('d.m.Y H:i:s') // 25.07.2022 09:11
 new Date().format( 'l, j. F Y', 'de' ) // Montag, 25. Juli 2022
 */

(function(){
    var replaceChars = {
        // day
        d: function(){ return ( '0' + this.getDate() ).slice(-2) },
 D: function( locale ){ return new Intl.DateTimeFormat( locale, { weekday: 'short' } ).format( this ) },
 j: function(){ return this.getDate() },
 l: function( locale ){ return new Intl.DateTimeFormat( locale, { weekday: 'long' } ).format( this ) },
 N: function(){
     let day = this.getDay();
     return day === 0 ? 7 : day;
 },
 S: function(){
     let date = this.getDate();
     return date % 10 === 1 && date !== 11 ? 'st' : ( date % 10 === 2 && date !== 12 ? 'nd' : ( date % 10 === 3 && date !== 13 ? 'rd' : 'th' ) );
 },
 w: function(){ return this.getDay() },
 z: function(){ return Math.floor( ( this - new Date( this.getFullYear(), 0, 1 ) ) / 86400000 ) },
 // week
 W: function(){
     let target = new Date( this.valueOf() );
     let dayNr = ( this.getDay() + 6 ) % 7;
     target.setDate( target.getDate() - dayNr + 3 );
     let firstThursday = target.valueOf();
     target.setMonth( 0, 1 );
     if( target.getDay() !== 4 ){
         target.setMonth( 0, 1 + ( ( 4 - target.getDay() ) + 7 ) % 7 );
     }
     return Math.ceil( ( firstThursday - target ) / 604800000 ) + 1;
 },
 // month
 F: function( locale ){ return new Intl.DateTimeFormat( locale, { month: 'long' } ).format( this ) },
 m: function(){ return ( '0' + ( this.getMonth() + 1 ) ).slice(-2) },
 M: function( locale ){ return new Intl.DateTimeFormat( locale, { month: 'short' } ).format( this ) },
 n: function(){ return this.getMonth() + 1 },
 t: function(){
     let year = this.getFullYear();
     let nextMonth = this.getMonth() + 1;
     if( nextMonth === 12 ){
         year = year++;
         nextMonth = 0;
     }
     return new Date( year, nextMonth, 0 ).getDate();
 },
 // year
 L: function(){
     let year = this.getFullYear();
     return year % 400 === 0 || ( year % 100 !== 0 && year % 4 === 0 ) ? 1 : 0;
 },
 o: function(){
     let date = new Date( this.valueOf() );
     date.setDate( date.getDate() - ( ( this.getDay() + 6 ) % 7 ) + 3 );
     return date.getFullYear();
 },
 Y: function(){ return this.getFullYear() },
 y: function(){ return ( '' + this.getFullYear() ).slice(-2) },
 // time
 a: function(){ return this.getHours() < 12 ? 'am' : 'pm' },
 A: function(){ return this.getHours() < 12 ? 'AM' : 'PM' },
 B: function(){
     return ( '00' + Math.floor( ( ( ( this.getUTCHours() + 1 ) % 24 ) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600 ) * 1000 / 24 ) ).slice(-3);
 },
 g: function(){ return this.getHours() % 12 || 12 },
 G: function(){ return this.getHours() },
 h: function(){ return ( '0' + ( this.getHours() % 12 || 12 ) ).slice(-2) },
 H: function(){ return ( '0' + this.getHours() ).slice(-2) },
 i: function(){ return ( '0' + this.getMinutes() ).slice(-2) },
 s: function(){ return ( '0' + this.getSeconds() ).slice(-2) },
 v: function(){ return ( '00' + this.getMilliseconds() ).slice(-3) },
 // Timezone
 e: function(){ return Intl.DateTimeFormat().resolvedOptions().timeZone },
 I: function(){
     let DST = null;
     for( let i = 0; i < 12; ++i ){
         let d = new Date( this.getFullYear(), i, 1 );
         let offset = d.getTimezoneOffset();
         if( DST === null ){
             DST = offset;
         }else if( offset < DST ){
             DST = offset;
             break;
         }else if( offset > DST ){
             break;
         }
     }
     return ( this.getTimezoneOffset() === DST ) | 0;
 },
 O: function(){
     let timezoneOffset = this.getTimezoneOffset();
     return ( -timezoneOffset < 0 ? '-' : '+' ) + ( '0' + Math.floor( Math.abs( timezoneOffset / 60 ) ) ).slice(-2) + ( '0' + Math.abs( timezoneOffset % 60 ) ).slice(-2);
 },
 P: function(){
     let timezoneOffset = this.getTimezoneOffset();
     return ( -timezoneOffset < 0 ? '-' : '+' ) + ( '0' + Math.floor( Math.abs( timezoneOffset / 60 ) ) ).slice(-2) + ':' + ( '0' + Math.abs( timezoneOffset % 60 ) ).slice(-2);
 },
 T: function( locale ){
     let timeString = this.toLocaleTimeString( locale, { timeZoneName: 'short' } ).split(' ');
     let abbr = timeString[ timeString.length - 1 ];
     return abbr == 'GMT+1' ? 'CET' : ( abbr == 'GMT+2' ? 'CEST' : abbr );
 },
 Z: function(){ return -this.getTimezoneOffset() * 60 },
 // Full Date/Time
 c: function(){ return this.format('Y-m-d\\TH:i:sP') },
 r: function(){ return this.format('D, d M Y H:i:s O') },
 U: function(){ return Math.floor( this.getTime() / 1000 ) }
    }

    Date.prototype.format = function( formatStr, locale = navigator.language ){
        var date = this;
        return formatStr.replace( /(\\?)(.)/g, function( _, esc, chr ){
            return esc === '' && replaceChars[ chr ] ? replaceChars[ chr ].call( date, locale ) : chr
        })
    }
}).call( this );

// from https://stackoverflow.com/questions/19846078/how-to-read-from-chromes-console-in-javascript
if (console.all === undefined) {
    console.all = {};
    function genKey(){
        // return (new Date).toLocaleString("sv", { timeZone: 'UTC' }) + "Z"
        return (new Date).format('Y-m-d-H-i-s-v')+'-'+Object.keys(console.all).length;
    }

    function hookLogType(logType) {
        const original=console[logType].bind(console)
        console['orig_'+logType] = console[logType].bind(console);

        return function(){
            //console.all.push({
            logValue = Array.from(arguments);
            if (logValue.length == 1)
            {
                logValue = logValue[0];
            }
            else
            {
                logValue = logValue.join(', ');
            }
            console.all[genKey()+logType] = logValue;
            // original.apply(console, arguments)
            console['orig_'+logType].apply(console, arguments);
        }
    }

    ['log', 'error', 'warn', 'debug'].forEach(logType=>{
        console[logType] = hookLogType(logType)
    })


    window.onerror = function (line, error, url)
    {
        erroro=[ line, error, url ];
        console.all[genKey()+'exception'] = erroro.join(', ');
        return false;
    }
    window.onunhandledrejection = function (e)
    {
        //console.all.push({
        console.all[genKey()+'promiseRejection'] = { e };
    }


}

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

	ym(metrika_counter_id, 'setUserID', get_params['user_id']);

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

function yandex_metrika_init(yametrika_id, UserID, get_params)
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
    // https://yandex.ru/support/metrica/code/counter-initialize.html
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
    userParams: get_params,
    params: get_params,
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
    var log = document.createElement('pre');
    document.body.appendChild(log);
    log.outerHTML = '<pre id="absolute_ready">'+JSON.stringify(window.console.all, null, ' ')+'</pre>';
    var elem = document.createElement('div');
	document.body.appendChild(elem);
	elem.outerHTML = '<div id="absolute_ready">'+copyright_text+'</div>';
}


