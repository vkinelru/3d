// Vkinel.ru price calc data and functions 

var prices =
{
    'liverpool' :
    {
        'weekend':  {'min_price':25000,   'min_guests':15, 'max_guests':60, 'next_person_price':1000 },
        'trivial':  {'min_price':14500,   'min_guests':10, 'max_guests':60, 'next_person_price':1000 },
        'gentive_name': 'аренды коттеджа Ливерпуль на&nbsp;сутки'
    },
    'singapur' :
    {
        'weekend':  {'min_price':25000,   'min_guests':15, 'max_guests':60, 'next_person_price':1000 },
        'trivial':  {'min_price':14500,   'min_guests':10, 'max_guests':60, 'next_person_price':1000 },
        'gentive_name': 'аренды коттеджа Сингапур на&nbsp;сутки'
    },
    'malta' :
    {
        'weekend':  {'min_price':25000,   'min_guests':15, 'max_guests':60, 'next_person_price':1000 },
        'trivial':  {'min_price':14500,   'min_guests':10, 'max_guests':60, 'next_person_price':1000 },
        'gentive_name': 'аренды коттеджа Мальта на&nbsp;сутки'
    },
    'valencia' :
    {
        'weekend':  {'min_price':25000,   'min_guests':15, 'max_guests':60, 'next_person_price':1000 },
        'trivial':  {'min_price':14500,   'min_guests':10, 'max_guests':60, 'next_person_price':1000 },
        'gentive_name': 'аренды коттеджа Валенсия на&nbsp;сутки'
    },
    'kipr' :
    {
        'weekend':  {'min_price':10600,   'min_guests':6, 'max_guests':15, 'next_person_price':800 },
        'trivial':  {'min_price':10600,   'min_guests':6, 'max_guests':15, 'next_person_price':800 },
        'gentive_name': 'аренды коттеджа Кипр на&nbsp;сутки'
    },
    'kipr1' :
    {
        'weekend':  {'min_price':3800,   'min_guests':2, 'max_guests':4, 'next_person_price':800 },
        'trivial':  {'min_price':3800,   'min_guests':2, 'max_guests':4, 'next_person_price':800 },
        'gentive_name': 'аренды номера&nbsp;1 в&nbsp;коттедже Кипр на&nbsp;сутки'
    },
    'kipr2' :
    {
        'weekend':  {'min_price':3400,   'min_guests':2, 'max_guests':3, 'next_person_price':800 },
        'trivial':  {'min_price':3400,   'min_guests':2, 'max_guests':3, 'next_person_price':800 },
        'gentive_name': 'аренды номера&nbsp;2 в&nbsp;коттедже Кипр на&nbsp;сутки'
    },
    'kipr3' :
    {
        'weekend':  {'min_price':3400,   'min_guests':2, 'max_guests':2, 'next_person_price':800 },
        'trivial':  {'min_price':3400,   'min_guests':2, 'max_guests':2, 'next_person_price':800 },
        'gentive_name': 'аренды номера&nbsp;3 в&nbsp;коттедже Кипр на&nbsp;сутки'
    },
    'banzal' :
    {
        'weekend':  {'min_price':15000,   'min_guests':20, 'max_guests':120, 'next_person_price':400 },
        'trivial':  {'min_price':15000,   'min_guests':20, 'max_guests':120, 'next_person_price':400 },
        'gentive_name': 'аренды банкетного зала на&nbsp;день'
    },
    'banya' :
    {
        'weekend':  {'min_price':4000,   'min_guests':6, 'max_guests':15, 'next_person_price':500 },
        'trivial':  {'min_price':4000,   'min_guests':6, 'max_guests':15, 'next_person_price':500 },
        'gentive_name': 'аренды русской бани на&nbsp;дровах на&nbsp;3&nbsp;часа'
    },
    'sauna' :
    {
        'weekend':  {'min_price':5000,   'min_guests':15, 'max_guests':15, 'next_person_price':1000 },
        'trivial':  {'min_price':5000,   'min_guests':15, 'max_guests':15, 'next_person_price':1000 },
        'gentive_name': 'аренды сауны с&nbsp;бассейном на&nbsp;3&nbsp;часа'
    },
    'banquet' :
    {
        'weekend':  {'min_price':25500,   'min_guests':15, 'max_guests':120, 'next_person_price':1700 },
        'trivial':  {'min_price':25500,   'min_guests':15, 'max_guests':120, 'next_person_price':1700 },
        'gentive_name': 'приготовления банкета'
    },

    'json-end': 'json-end'
};

function get_query_params(qs)
{
    /*  function decode parameters from GET
    */
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs))
    {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function calc_vkinel_price ()
{
    document.getElementById("all_sum").value = "100000";
    var accommodation = document.getElementById("accommodation").value;
    var weekend1 = document.getElementById("weekend1").checked;
    var weekend0 = document.getElementById("weekend0").checked;
    var guests = parseInt(document.getElementById("guests").value);

    if (weekend1 == true)
    {
        day_type = 'weekend';
        day_name = 'в&nbsp;выходные';
    }
    else
    {
        day_type = 'trivial';
        day_name = 'в&nbsp;будни';
    }

    var price = 0;

    /*TODO: try to get price data from trivial, if not - get it from weekend*/

    console.log ('accommodation = '+ accommodation );
    console.log ('day_type = '+ day_type );
    min_price = prices[accommodation][day_type]["min_price"];
    min_guests = prices[accommodation][day_type]["min_guests"];
    max_guests = prices[accommodation][day_type]["max_guests"];
    next_person_price = prices[accommodation][day_type]["next_person_price"];
    console.dir (prices[accommodation][day_type]);

    if (guests > max_guests)
    {
        console.log ('set guests to max_guests for this accommodation');
        guests = max_guests;
        document.getElementById('guests').value=max_guests;
        setTimeout( function() { calc_vkinel_price(); }, 42);
        /*TODO: show message about max_guests to user*/
    }

    price = min_price + (Math.max(guests, min_guests) - min_guests) * next_person_price;

    console.log (accommodation + ' price = '+ price);

    //	Вычисляем сумму на гостя
    var sum_per_guest = price / guests;
    document.getElementById("sum_per_guest").innerHTML = parseInt(sum_per_guest);

    //	Покажем общую сумму+
    document.getElementById("all_sum").value = price;
    document.getElementById("all_sum").innerHTML = price;
    document.getElementById("price_text").innerHTML = 'Цена '+ prices[accommodation]["gentive_name"] +' на&nbsp;'+guests+'&nbsp;гостей '+day_name+'';

    // set radio button value
    document.price_calc.accommodation.value=accommodation;

    gmeter = document.getElementById("guest_meter");
    gmeter.value = guests;
    gmeter.low = min_guests;
    gmeter.max = max_guests;
    gmeter.optimum = parseInt(Math.ceil(max_guests*0.51));
    gmeter.high = parseInt(Math.ceil(max_guests*0.72));
}

function change_guest_count (new_guests)
{
    cur_guests = document.getElementById("guests").value;
    eval_is_evil = 'parseInt(cur_guests)  ' + new_guests + '';
    eval_result = parseInt(eval( eval_is_evil ));
    console.log(" eval this: " + eval_is_evil + ', eval_result = ' + eval_result);
    document.getElementById("guests").value = String(Math.max(1, eval_result));

    calc_vkinel_price();
}

function bootstrap_accommodation()
{
    //  function set accommodation by find accommodation name from URL
    // document.location.href

    // Get string from GET-request
    var query = get_query_params(document.location.search);
    if (!query.guests)
    {
        console.log('No GET[guests] parameter defined');
    }
    else
    {
        guests = String(parseInt(query.guests));
        console.log('GET[guests] parameter defined, set guests = '+guests);
        document.getElementById("guests").value = guests;
    }

    // console.dir(prices);
    current_href = document.location.href.toLowerCase();
    //  Loop over all accommodation from prices array
    for (var accom in prices)
    {
        if (accom === 'length' || !prices.hasOwnProperty(accom)) continue;
        var accomod = accom;
        accomod = accomod.toLowerCase();

        if (current_href.indexOf(accomod) >= 0)
        {
            console.log('' + accom + ' is the current accommodation because current href is ' +current_href);
            // set input value by id
            document.getElementById("accommodation").value = accom;
            // set radio button value
            document.price_calc.accommodation.value=accommodation;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    bootstrap_accommodation();
    calc_vkinel_price();
}, false);
