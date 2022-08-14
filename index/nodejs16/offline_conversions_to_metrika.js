console.log(123123);

const https = require('https');
const metrikaCounterId=51096746;     // номер счетчика
t0ken = '';
var UserID = '9608273355';

function send_offline_conversions_to_yandex_metrika (metrikaCounterId, yandexOAuthToken, typeOfID, userID, goal)
{
    // Function send data about offline conversions to Yandex Metrika, uses API
    // metrikaCounterId like "51093137"
    // yandexOAuthToken like "y0_AQAAAAAun1tKAAhSNQAAAADLYs5_uRqSBcakQt4uySx9JLqYo5Jh2w9"
    // typeOfID - ClientID, UserID, yclid
    // userID like "user4321235"
    // goal like "form_submit"


    // https://api-metrika.yandex.ru/management/v1/counter/$counter/offline_conversions/upload?client_id_type=$client_id_type
    // https://yandex.ru/dev/metrika/doc/api2/practice/offline-conv.html
    // https://yandex.ru/dev/metrika/doc/api2/management/offline_conversion/upload.html#upload
    var boundary = "656123603645665345315234";

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

    var cur_date = Math.floor(new Date().getTime() / 1000);
    console.info (data, new Date(), cur_date);

    var data = '';
    data += "\r\n\r\n--" + boundary + "\r\n";
    data += 'Content-Disposition: form-data; name="file'+cur_date+'"; filename="data'+cur_date+'.csv"'+"\r\n" +
    "Content-Type: text/csv" + "\r\n\r\n";

    data += "UserId,Target,DateTime\r\n";
    data += UserID+",scroll10,"+cur_date+"\r\n";
    data += "--" + boundary + "--";

    var options = {
        hostname: 'api-metrika.yandex.ru',
        port: 443,
        path: '/management/v1/counter/'+metrikaCounterId+'/offline_conversions/upload?client_id_type=USER_ID',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data; boundary='+boundary,
            "Authorization": "OAuth "+t0ken ,
            'Content-Length': data.length,
        }
    };

    console.info (options);
    console.info (data);

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

