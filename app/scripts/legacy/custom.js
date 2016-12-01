$(document).ready(function () {
    $("#query").keyup(function () {
        $("#input").click();
    });

    $('#carousel').carousel();

    var typeaheadSettings = {
        hint: false,
        highlight: true,
        minLength: 1
    };

    $("#search-default .typeahead").typeahead(typeaheadSettings,
    {
        name: 'find-users',
        displayKey: 'value',
        source: function (query, process) {
            var result = [];
            API.getData(["Intellect", "Find"], {
                value: query
            }, function (data) {
                $.each(data, function (index, v) {
                    result.push({ value: data[index]["FullName"] });
                });

                return process(result);

            });
        }
    });

    $("#search-subdivision .typeahead").typeahead(typeaheadSettings,
    {
        name: 'find-users',
        displayKey: 'value',
        source: function (query, process) {
            var result = [];
            API.getData(["Subdivision", "Search"], {
                name: query
            }, function (data) {
                $.each(data, function (index, v) {
                    result.push({ value: data[index]["Name"] });
                });

                return process(result);

            });
        }
    });

    $('.search-panel a').powerTip({
        placement: 's',
        smartPlacement: true
    });

    /*
     * "Up" button (bottom right) on each page
     */

    var windowHeight = $(window.top).height();
    var pictureHeight = 38;
    // place it in the middle of Y-axis
    $('#goTop').css({ bottom: (windowHeight - pictureHeight) / 2 + 'px' });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#goTop').stop().animate({
                right: '10px'
            }, 500);
        } else {
            $('#goTop').stop().animate({
                right: '-100px'
            }, 500);
            var resultsNumber = $(".s_one_result").length;
            if (resultsNumber > 4) {
                // show button
            }
        }
    });
    $('#goTop').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 500, function () {
            $('#goTop').stop().animate({
                right: '-100px'
            }, 500);
        });
    });
});

function setPrefix(id, prefix) {
    $("#" + id).val(prefix + ":" + $("#" + id).val());
    return true;
}

function showSearchTab(id) {
    $("#science_news_content").hide();
    $(".search").removeClass("hidden");
    $(".search").addClass("hidden");
    $(id).removeClass("hidden");

    $('html, body').animate({
        scrollTop: $(id).offset().top
    }, 500);
    setTimeout(
      function () {
          $(id + ' input[type="search"]').focus();
      }, 500);
    return false;
}