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
'Author: Slava Borodin-Atamanov' +
'Script sends get request to url;'+
'url is required parameter, other GET-paramaters will send to url transparently.'+
'';

module.exports.handler = async function (event, context)
{

    const puppeteer = require('puppeteer');
    const querystring = require('querystring');
    const url = require('url');
    const buffer = require('node:buffer');

    function get_query_params(qs)
    {
        /*  function decode parameters from POST, GET-request  */
        qs = qs.split('+').join(' ');
        var params = {},
        tokens, re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs))
        {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    }

    var all_messages = {}; var mes='';
    function mylog(mes)
    {
        // if (debug) 	console.error(mes);
        if (debug) 	console.log(mes);
        all_messages[Object.keys(all_messages).length] = mes;
    }

    var target_url = event.queryStringParameters.url;
    target_url = decodeURI(target_url);

    try
    {
        urlo = new URL(target_url);
        mes = 'target_url is ok, target_url='+target_url; mylog(mes);
    }
    catch (e)
    {
        mes = 'Invalid url parameter🤷‍♂️ ='+target_url+' '+e; mylog(mes);
        return {
            statusCode: 400,
            body: mes
        };
    }

    var parameters = JSON.parse(JSON.stringify(event.queryStringParameters));

    var body_str = 'Ok';
    var debug=0;
    if (event.queryStringParameters.debug)
    {
        debug=1;
    }
    delete parameters['debug'];

    var post_data = event['body'];
    if (post_data)
    {
        mes = 'event.body.length='+event.body.length; mylog(mes);

        //  create object to convert string from base64decoded
        post_data = new Buffer.from(post_data, 'base64');
        mes = 'base64decoded post_data.length='+post_data.length; mylog(mes);
        //  get query string
        post_data_str = post_data.toString('latin1');
        //  Change vendor's mistake in data
        // post_data_str = post_data_str.split('×tamp').join('&');
        post_data_str = post_data_str.replaceAll('×tamp', '&');
        post_data_str = post_data_str.replaceAll("×", '&');

        mes = 'string post_data.length='+post_data_str.length; mylog(mes);
        //parse key:value object from string
        post_data = get_query_params(post_data_str);
        mes = 'URLSearchParams object post_data='+JSON.stringify(post_data)+'\n'; mylog(mes);

        //  URLdecode one variable
        var page_with_parameters = decodeURI(post_data['page_with_parameters']);   // str
        mes = 'page_with_parameters='+JSON.stringify(page_with_parameters); mylog(mes);
        //parse key:value object from string
        var page_with_parameters_obj = get_query_params(page_with_parameters);
        mes = 'page_with_parameters_obj object post_data='+JSON.stringify(page_with_parameters_obj)+'\n'; mylog(mes);

        parameters['user_id'] = post_data['yid'] || page_with_parameters_obj['yclid'];
        mes = "user_id from post_data['yid']="+ post_data['yid']+", user_id from from page_with_parameters_obj['yclid']="+page_with_parameters_obj['yclid']; mylog(mes);
        if (!parameters['user_id'])
        {
            mes = 'user_id is undefined from post_data!'; mylog(mes);
            delete parameters['user_id'];
        }
        else
        {
            mes = 'from post_data user_id=['+parameters['user_id']+']'; mylog(mes);
        }
        var post_data_obj = new URLSearchParams(post_data);
        var post_data_str = post_data_obj.toString();
        mes = 'post_data_str=['+JSON.stringify(post_data_str)+']'; mylog(mes);
    }
    else
    {
        mes = 'No post_data!'; mylog(mes);
        post_data = '';
    }
    delete parameters['url'];
    const parameters_obj = new URLSearchParams(parameters);
    var request_parametr_str = parameters_obj.toString();
    mes = 'request_parametr_str=['+JSON.stringify(request_parametr_str)+']'; mylog(mes);

    // TODO change yid parameter to UserID
    //target_url = target_url + '?' +request_parametr_str + '&' + post_data;
    target_url = target_url + '?' +request_parametr_str + '&' + post_data_str;

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--headless'],
    });
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(21111);
    await page.setDefaultTimeout(23333);
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/89.0.4389.116 Safari/534.24 XiaoMi/MiuiBrowser/13.2.1');

    try
    {
        // await page.goto(target_url, {waitUntil: 'networkidle2', timeout: 19999});
        await page.goto(target_url);
        await page.waitForSelector('#absolute_ready', {visible: true, timeout: 3777});
        mes = 'target_url is ok, target_url=['+target_url+']'; mylog(mes);
    }
    catch (e)
    {
        var page_content = await page.content();
        mes = 'Something went wrong while opening page🤷‍♂️\ntarget_url='+target_url+'\n '+e+'\n\n'+page_content; mylog(mes);
        return {
            statusCode: 400,
            body: mes
        };
    }

    var page_content = await page.content();

    if (debug)
    {
        body_str =
        'Target url="'+target_url+'"\n'+
        'all_messages \n'+
        JSON.stringify(all_messages, null, ' ')+'\n'+
        'parameters \n'+
        JSON.stringify(parameters, null, ' ')+'\n'+
        'event \n'+
        JSON.stringify(event, null, ' ')+'\n\n\n'+
        page_content;
    }

    setTimeout( () => {
        browser.close();
    }, 7444)

    return {
        statusCode: 200,
        body: body_str,
    };

};

