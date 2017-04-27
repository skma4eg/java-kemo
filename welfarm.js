// scale and center word cloud

var minwidth = 1400;
var minheight = 478;

var centerWordCloud = _throttle(function() {
    // get element info
    var width = _html.clientWidth || minwidth;
    var wordcloud = document.getElementById('wordcloud');
    var outer = document.getElementById('cloud-outer');
    var inner = document.getElementById('cloud-inner');
    if (width < minwidth) {
        // scale word cloud to page width
        var scale = (1 - (1 - (width / 1400)));
        var minscale = (1 - (1 - (320 / 1400)));
        // minimum width is 320px
        if (scale <= minscale) scale = minscale;
        wordcloud.style.transform = 'scale(' + scale + ')';
        wordcloud.style.webkitTransform = 'scale(' + scale + ')';

        // keep word cloud centered
        var left = (width - wordcloud.offsetWidth) / 2;
        // minimum width is 320px
        if (scale <= minscale) left = -540;
        wordcloud.style.left = left + 'px';

        // scale stripe to word cloud
        var height = wordcloud.getBoundingClientRect().bottom - wordcloud.getBoundingClientRect().top;
        var top = (minheight - height) / 2 * -1;
        // minimum width is 320px
        if (scale <= minscale) {
            height = 109;
            top = -184;
        }
        wordcloud.style.top = top + 'px';
        outer.style.height = height + 'px';
        inner.style.height = height + 'px';
    } else {
        // revert to default styles
        wordcloud.style.transform = 'scale(1)';
        wordcloud.style.webkitTransform = 'scale(1)';
        wordcloud.style.left = '';
        wordcloud.style.top = '';
        outer.style.height = minheight + 'px';
        inner.style.height = minheight + 'px';
    }
});

centerWordCloud();
window.addEventListener('pageshow', centerWordCloud);
window.addEventListener('load', centerWordCloud);
window.addEventListener('resize', centerWordCloud);

$(document).ready(function() {

    // fade in hidden elements on an incremental timer
    $('.wordcloud-hidden').each(function(i) {
        var $fader = $(this);
        setTimeout(function() {
            $fader.addClass('wordcloud-fadein');
        }, i*50+450);
        setTimeout(function() {
            $fader.addClass('wordcloud-gray');
        }, i*50+1200);
    });

    // link hover effects
    $('#spikey-area').on('focusin focusout mouseenter mouseleave', function() {
        $('#spikey').toggleClass('spikey-highlight');
    });

});