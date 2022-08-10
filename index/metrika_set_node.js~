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

const puppeteer = require('puppeteer');
const querystring = require('querystring');
const url = require('url');

module.exports.handler = async function (event, context) 
{

var target_url = event.queryStringParameters.url;
target_url = decodeURI(target_url);

try 
{
    urlo = new URL(target_url);
} 
catch (_) 
{
    return {
        statusCode: 400,
        body: 'Invalid url parameter🤷‍♂️ '+target_url,
    };
}

var parameters = JSON.parse(JSON.stringify(event.queryStringParameters));

let debug=0;
if (event.queryStringParameters.debug)
{
	debug=1;
}

delete parameters['url'];
const searchParams = new URLSearchParams(parameters);
var request_parametr_str = searchParams.toString();
target_url = target_url + '?' +request_parametr_str;

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setDefaultNavigationTimeout(0);
await page.setUserAgent('Mozilla/5.0 AppleWebKit/537.37 (KHTML, like Gecko)Chrome/107.0.1984.923 dev@Borodin-Atamanov.ru');
await page.goto(target_url, {waitUntil: 'networkidle2'});
await page.waitForSelector('#absolute_ready', {visible: true});

const page_content = await page.content();

var body_str = 'Ok';
if (debug)
{
    body_str = 
    'Target url="'+target_url+'"\n'+
    'request_parametr_str="'+request_parametr_str+'"\n' +
    JSON.stringify(parameters, null, ' ')+'\n'+
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

