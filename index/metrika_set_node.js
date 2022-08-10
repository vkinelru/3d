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
'Script sends get request to url;'+
'url required parameter, other GET-paramaters will send to url transparently.'+
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
delete parameters['url'];
const searchParams = new URLSearchParams(parameters);
var request_parametr_str = searchParams.toString();
target_url = target_url + '?' +request_parametr_str;

const browser = await puppeteer.launch();
const page = await browser.newPage();
// await page.goto(target_url);
await page.setDefaultNavigationTimeout(0);
await page.goto(target_url, {waitUntil: 'networkidle2'});


var body_str = 'Ok';
if (event.queryStringParameters.debug)
{
    body_str = request_parametr_str+ '\n' + JSON.stringify(parameters, null, ' ')+'\nTarget url="'+target_url+'"\n\n'+JSON.stringify(event, null, ' ');
}

setTimeout( () => {
    browser.close();
}, 4444)

return {
    statusCode: 200,
    body: body_str,
};

};

