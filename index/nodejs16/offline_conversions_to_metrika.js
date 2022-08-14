console.log(123123);

const https = require('https');
const metrika_counter_id=51096746;     // номер счетчика
var UserID = '9608273355';

// https://api-metrika.yandex.ru/management/v1/counter/$counter/offline_conversions/upload?client_id_type=$client_id_type
// https://yandex.ru/dev/metrika/doc/api2/practice/offline-conv.html
// https://yandex.ru/dev/metrika/doc/api2/management/offline_conversion/upload.html#upload
var boundary = "--656123603645665345315234";

/*
POST https://api-metrika.yandex.net/management/v1/counter/{counterId}/offline_conversions/upload?client_id_type=CLIENT_ID
Content-Type: multipart/form-data; boundary=------------------------7zDUQOAIAE9hEWoV
Context-Length: 253

--------------------------7zDUQOAIAE9hEWoV
Content-Disposition: form-data; name="file"; filename="data.csv"
Content-Type: text/csv

ClientId,Target,DateTime,Price,Currency
133591247640966458,GOAL1,1481718166,123.45,RUB
133591247640966458,GOAL2,1481718142,678.90,RUB
133591247640966458,GOAL3,1481718066,123.45,RUB
579124169844706072,GOAL3,1481718116,678.90,RUB
148059425477661429,GOAL2,1481718126,123.45,RUB
148059425477661429,GOAL3,1481714026,678.90,RUB
--------------------------7zDUQOAIAE9hEWoV--
*/

var cur_date = Math.floor(new Date().getTime() / 1000);
var data = '';
data += "\n\n" + boundary + "\n";
data += 'Content-Disposition: form-data; name="file"; filename="data.csv"; location="../.."'+"\n" +
"Content-Type: text/csv" + "\n\n";

data += "ClientId,Target,DateTime\n";
data += UserID+",scroll10,"+cur_date+"\n";
data += "" + boundary + "\n\n";

console.info (data);

var options = {
    hostname: 'api-metrika.yandex.ru',
    port: 443,
    path: '/management/v1/counter/'+metrika_counter_id+'/offline_conversions/upload?client_id_type=USER_ID',
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data; boundary='+boundary,
        "Authorization": "OAuth "+t0ken ,
        'Content-Length': data.length,
    }
};

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
