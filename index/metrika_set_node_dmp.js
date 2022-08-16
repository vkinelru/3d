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
    const https = require('https');


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

    function send_offline_conversions_to_yandex_metrika (metrikaCounterId, yandexOAuthToken, typeOfID, yID, targetGoal)
    {
        // Function send data about offline conversions to Yandex Metrika, uses API
        // metrikaCounterId like "51093137"
        // yandexOAuthToken like "y0_AQAAAAAun1tKAAhSNQAAAADLYs5_uRqSBcakQt4uySx9JLqYo5Jh2w9"
        // typeOfID - ClientID, UserID, yclid
        // yID like "user4321235"
        // targetGoal like "form_submit"

        metrikaCounterId = parseInt (metrikaCounterId);
        if (!metrikaCounterId)
        {
            console.error ('metrikaCounterId must be integer!');
            return false;
        }

        if (!yandexOAuthToken)
        {
            console.error ('yandexOAuthToken is not set!');
            return false;
        }

        if (!typeOfID)
        {
            console.error ('typeOfID must be "ClientID", "UserID" or "Yclid"!');
            return false;
        }

        typeOfID = String(typeOfID);
        typeOfID = typeOfID.toUpperCase();
        var typeOfIDForCSV = 'Yclid';

        if (typeOfID.includes('CLIENT'))
        {
            typeOfID="CLIENT_ID";
            typeOfIDForCSV = 'ClientId';    //  type of ID for Yandex CSV file
        }
        else if (typeOfID.includes('USER'))
        {
            typeOfID="USER_ID";
            typeOfIDForCSV = 'UserId';    //  type of ID for Yandex CSV file
        }
        else
        {
            typeOfID="YCLID";
            typeOfIDForCSV = 'Yclid';    //  type of ID for Yandex CSV file
        }


        if (!yID)
        {
            console.error ('yID (string) is not set!');
            return false;
        }
        yID = String(yID);

        if (!targetGoal)
        {
            console.error ('targetGoal (string) is not set!');
            return false;
        }
        targetGoal = String(targetGoal);

        // console.log ('metrikaCounterId='+metrikaCounterId);
        let argms = {};
        for (const arg of ['metrikaCounterId', 'yandexOAuthToken', 'typeOfID', 'yID', 'targetGoal', 'typeOfIDForCSV']) {
            let key=arg;
            let value = eval (''+key+';');
            argms[key]=value;
        }

        // https://api-metrika.yandex.ru/management/v1/counter/$counter/offline_conversions/upload?client_id_type=$client_id_type  - request
        // https://yandex.ru/dev/metrika/doc/api2/practice/offline-conv.html
        // https://yandex.ru/dev/metrika/doc/api2/management/offline_conversion/upload.html#upload

        /*
         * POST https://api-metrika.yandex.net/management/v1/counter/{counterId}/offline_conversions/upload?client_id_type=CLIENT_ID
         * Content-Type: multipart/form-data; boundary=------------------------7zDUQOAIAE9hEWoV
         * Context-Length: 253
         *
         * --------------------------7zDUQOAIAE9hEWoV
         * Content-Disposition: form-data; name="file"; filename="data.csv"
         * Content-Type: text/csv
         *
         * ClientId,Target,DateTime,Price,Currency
         * 133591247640966458,GOAL1,1481718166,123.45,RUB
         * 133591247640966458,GOAL2,1481718142,678.90,RUB
         * 133591247640966458,GOAL3,1481718066,123.45,RUB
         * 579124169844706072,GOAL3,1481718116,678.90,RUB
         * 148059425477661429,GOAL2,1481718126,123.45,RUB
         * 148059425477661429,GOAL3,1481714026,678.90,RUB
         * --------------------------7zDUQOAIAE9hEWoV--
         */

        var cur_date = Math.floor(new Date().getTime() / 1000); //  Date in UTC, timezone +0
        console.info (new Date(), cur_date);

        var boundary = "656123603645665345315234"+cur_date;

        var data = '';
        data += "\r\n\r\n--" + boundary + "\r\n";
        data += 'Content-Disposition: form-data; name="file"; filename="data.csv"'+"\r\n" +
        "Content-Type: text/csv" + "\r\n\r\n";

        data += typeOfIDForCSV+",Target,DateTime\r\n"; // CSV header for Yandex
        data += yID+","+targetGoal+","+cur_date+"\r\n";   //  ID of user of any type
        data += "--" + boundary + "--";

        var options = {
            hostname: 'api-metrika.yandex.ru',
            port: 443,
            path: '/management/v1/counter/'+metrikaCounterId+'/offline_conversions/upload?client_id_type='+typeOfID,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; boundary='+boundary,
                "Authorization": "OAuth "+yandexOAuthToken ,
                'Content-Length': data.length,
            }
        };

        console.dir ({argms, options, data});


        var req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });

        req.on('error', (e) => {
            console.error(e);
        });

        req.write(data);
        req.end();

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

    var t0ken = '';

    t0ken = 'secret token';
    t0ken = 'y0_AQAAAAAun1tKAAhSNQAAAADLYs4_uRqSAcakQt2uySx9JLqYo5Jh1w8';

    try
    {
        //  metrikaCounterId, yandexOAuthToken, typeOfID, yID, targetGoal
        send_offline_conversions_to_yandex_metrika (parameters['metrika_counter_id'], t0ken, 'userid', parameters['user_id'], parameters['reach_goal'])
        mes = 'send_offline_conversions_to_yandex_metrika()'; mylog(mes);
        send_offline_conversions_to_yandex_metrika (parameters['metrika_counter_id'], t0ken, 'yclid', parameters['user_id'], parameters['reach_goal'])
        mes = 'send_offline_conversions_to_yandex_metrika()'; mylog(mes);
    }
    catch (e)
    {
        mes = 'Something went wrong while send offline conversions to Yandex Metrika 🤷‍♂️'; mylog(mes);
    }

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

