$(function () {
  var falGhazalTitle = $('#fal-ghazal-title');
  //var falGhazalHtmlText = $('#fal-ghazal-htmlText');
  var falGhazalTextHtmlExcerpt = $('#fal-ghazal-text-htmlExcerpt');
  var falGhazalTextVerseEven = $('#fal-ghazal-text-verse-even');
  var falGhazalTextVerseOdd = $('#fal-ghazal-text-verse-odd');
  var divFalGhazalNumberText = $('#div-fal-ghazal-number-text');
  var detailMp3 = $('ul#playlist');

  const url = 'https://ganjgah.ir/api/ganjoor/hafez/faal';
  $.ajax(url, {
    //type: 'post',
    //dataType: 'json',
    //        data: {
    //          keyword: value
    //        },
    success: function (data) {
      falGhazalTitle.html(data.title);
      divFalGhazalNumberText.empty();

      detailMp3.html('<li audioURL="' + data.recitations[3].mp3Url + '" artist="Artist 1"> </li>');
      playerInit();

      jQuery(data.verses).each(function (i, item) {
        var number = item.vOrder

        if (number % 2 == 0) {
          divFalGhazalNumberText.append('<span id="fal-ghazal-text-verse-even">' + item.text + '</span>');
          divFalGhazalNumberText.append('<br>');
        } else {
          divFalGhazalNumberText.append('<span id="fal-ghazal-text-verse-odd">' + item.text + '</span>');
        }
      })

      jQuery(data.top6RelatedPoems).each(function (i, item) {
        falGhazalTextHtmlExcerpt.html(item.htmlExcerpt);
      })
    }
  });
});