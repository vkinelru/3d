console.log(123123);

const https = require('https');
const metrikaCounterId=51096746;     // номер счетчика
var t0ken = '';
t0ken = 'secret token';
t0ken = 'y0_AQAAAAAun1tKAAhSNQAAAADLYs4_uRqSAcakQt2uySx9JLqYo5Jh1w8';
var UserID = '9608273355';

yID='new9608273355';
targetGoal='scroll10';

send_offline_conversions_to_yandex_metrika (metrikaCounterId, t0ken, 'userid', yID, targetGoal)

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

