replacer = {
    /* empty */
    'empty':
    {
        'desc': 'desc empty',
        't1': 't1 empty',
        't2': 't2 empty',
        't3': 't3 empty',
        't4': 't4 empty',
        'img1': 'https://vkinelru.github.io/3d/photos/1440x/C010-2020-08-23-19-13-20.webp',
        '':''
    },

    'new-year':
    {
        't1': 'Новый год в коттедже на природе!',
        't3': 'Рады принять от 6 до 40 гостей<br>5 домов на выбор!',
        't4': 'Цена на новый год от 1500₽ на гостя в сутки',
        'img1': 'https://vkinelru.github.io/3d/photos/1440x/0013-2018-12-28_17-12-17-Singapur-VKinel.ru.webp',
        '':''
    },

    /* 1 */
    'standard':
    {
        'desc': [0, 'Аренда коттеджей на сутки от собственника в районе Кинеля. Банкеты'],
        't1': [0, 'Устройте праздник в коттедже на природе!'],
        't2': [0, '15 км от Самары'],
        't3': [0, 'Можем принять от 2 до 120 гостей'],
        't4': [0, 'От 12000₽ — будни, от 18000₽ — пятница'],
        'img1': [0, 'https://259506.selcdn.ru/site624833/4105453b-9f7e-4c74-a530-495dabe63b8f/4105453b-9f7e-4c74-a530-495dabe63b8f-2126184.jpeg'],
        '':''
    },

    /*  Script will search for this text and replace it to the new texts */
    'original_texts':
    {
        /* key - unique original text id,
         v *alue - array:
         zero-index is method of search-and-replace:
         0 - default method - just change HTML code in body
         1 - safety find text elements, change text only inside text elements
         first index is original text (script will search for this text)

         If original text is long and uniq - use default method #0,
         if original text is short and can be inside attributes - use method #1
             */
        'desc': [0, 'Аренда коттеджей на&nbsp;сутки от&nbsp;собственника в&nbsp;районе Кинеля. Банкеты'],
        't1': [0, 'Устройте праздник в коттедже на природе!'],
        't2': [0, '15 км от Самары'],
        't3': [0, 'Можем принять от 2 до 120 гостей'],
        't4': [0, 'От 12000₽ — будни, от 18000₽ — пятница'],
        'img1': [0, 'https://259506.selcdn.ru/site624833/4105453b-9f7e-4c74-a530-495dabe63b8f/4105453b-9f7e-4c74-a530-495dabe63b8f-2126184.jpeg'],
        '':''
    }
};

/* Copyright (c) 2021 Borodin-Atamanov */

document.addEventListener('DOMContentLoaded', function()
{
    console.log('Page loaded');

}, false);

function replace_after_page_loaded() 
{
    /*  parse GET parameters */
    var query = get_query_params(document.location.search);
    /* Replace text on the page */
    replace_everything(query.q, replacer);

    /* add unbreakable space before short words */
    replace_html(' м²', '&nbsp;м²');
    replace_html(' ₽', '&nbsp;₽');
    replace_html(' шт.', '&nbsp;шт.');
    add_nbsp_after_short_word('к');
    add_nbsp_after_short_word('о');
    add_nbsp_after_short_word('а');
    add_nbsp_after_short_word('и');
    add_nbsp_after_short_word('в');
    add_nbsp_after_short_word('с');
    add_nbsp_after_short_word('у');
    add_nbsp_after_short_word('из');
    add_nbsp_after_short_word('за');
    add_nbsp_after_short_word('от');
    add_nbsp_after_short_word('до');
    add_nbsp_after_short_word('по');
    add_nbsp_after_short_word('со');
    add_nbsp_after_short_word('не');
    add_nbsp_after_short_word('ни');
    add_nbsp_after_short_word('на');
    add_nbsp_after_short_word('но');
    add_nbsp_after_short_word('вы');
    console.log('words replaced');
}

if (document.readyState !== 'loading') {
    console.log('document.readyState replace_after_page_loaded');
    replace_after_page_loaded() 
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOMContentLoaded replace_after_page_loaded');
        replace_after_page_loaded() 
    });
}
