var search = "";
var pageNumber = 1;

$(document).ready(function () {

    $("#input").focus();

    var search = URI.parseQuery(window.location.search)["q"];

    if (typeof search !== "undefined" && search !== "") {

        $("#input").val(search);
        find(search);
    }

    $("#input").keyup(function () {
        changeSearchValueAndSendRequest();
    });

    $("#search").click(function () {
        changeSearchValueAndSendRequest();
    });
});

function changeSearchValueAndSendRequest() {
    search = $("#input").val();
    pageNumber = 1;
    find(search);
}

function find(value) {
    if (value == "") {
        return;
    }

    var html = '<img src="/images/loading.gif" class="loading" />';
    var pageNumber = URI.parseQuery(window.location.search)["page"];

    $("#search-result").html(html);

    API.getData(["Intellect", "Find"], {
        value: value,
        pageNumber: pageNumber,
        pageSize: 50
    }, onSearchCompleate);
}

function onSearchCompleate(data, paging) {
    var html = "";
    var iteration = 0;

    var pageNumber = URI.parseQuery(window.location.search)["page"];
    var search = URI.parseQuery(window.location.search)["q"];

    for (var item in data) {

        var url = "/profile/" + data[item].UserIdentifier;
        var fullName = data[item].FullName.trim().replace(/(')|(")/g, "'");
        var imageAlt = fullName;
        var image = data[item].Photo;
        var positions = data[item].Positions;
        var animationStyle = (++iteration % 2) ? "left_anim_bl" : "right_anim_bl";

        // do not animate first 4 blocks
        var addAnimation = (iteration > 4) ? " class='anim_bl " + animationStyle + "'" : "";

        // place surname and name on different lines
        var firstSpaceIndex = fullName.indexOf(" ");
        fullName = fullName.slice(0, firstSpaceIndex + 1) + "<br>" + fullName.slice(firstSpaceIndex);

        html += "<div" + addAnimation + "><a href='" + url + "' class='s_one_result'><div class='s_img'>";

        var $img = $('<img />', {
            src: image,
            alt: imageAlt,
            title: imageAlt
        });

        html += $img[0].outerHTML;

        html += "</div><div class='s_lecturer_name'>" + fullName + "</div><div class='s_workplace_info_block'>";

        // show only a first position
        if (positions.length) {
            var p = positions[0];
            html += "<div class='s_lecturer_position'>" + p.Name + "</div><div class='s_lecturer_workplace'>" + p.Subdivision.Name + "</div>";
        }

        html += "</div></a></div>";
    }

    if (!data.length) {
        html += "<h4>На жаль, пошук не дав результатів...</h4><h4>Спробуйте змінити свій пошуковий запит.</h4>"
    }

    html += "<div class='clear_fix'></div>";

    $(".pagination").html('');

    if (paging) {
        for (var i = 1; i <= paging.PageCount; i++) {

            var c = pageNumber == i ? ' class="active"' : '';
            var searchUrl = '/search?q=' + search + '&page=' + i;

            $(".pagination").append("<li" + c + "><a href='" + searchUrl + "'>" + i + "</a></li>");

        }
    }

    $("#search-result").html(html);

    // animate blocks
    var elems = $('.anim_bl');
    var winHeight = $(window).height();

    animate_elems(elems, winHeight);

    $(window).scroll(function () {
        animate_elems(elems, winHeight);
    });
}

function animate_elems(elems, winHeight) {
    var wintop = $(window).scrollTop(); // calculate distance from top of window

    // loop through each item to check when it animates
    elems.each(function () {
        var $elm = $(this);

        if ($elm.hasClass('animated')) { return true; } // if already animated skip to the next item

        var topcoords = $elm.offset().top; // element's distance from top of page in pixels

        if (wintop > (topcoords - (winHeight * .75))) {
            // animate when top of the window is 3/4 above the element
            $elm.addClass('animated');
        }

        return false;
    });
} // end animate_elems()
