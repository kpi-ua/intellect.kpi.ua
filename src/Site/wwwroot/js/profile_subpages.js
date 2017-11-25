$(document).ready(function () {
    var subpage = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];
    var userIdentifier = window.location.pathname.split("/")[window.location.pathname.split("/").length - 2];
    var apiMethod;

    switch (subpage) {
        case "execution":
            apiMethod = "KRExecutions";
            break;
        case "results":
            apiMethod = "KRResults";
            break;
        case "publications":
            apiMethod = "publications";
            break;
        case "conference":
            apiMethod = "conferences";
            break;
    }

    API.getData(["Intellect", apiMethod], {
        userIdentifier: userIdentifier
    }, function (data) {

        if ($.isEmptyObject(data)) {
            $("#subpage_content").append("<div class='subprofile_error_message'>На жаль, інформація відсутня для даного викладача.</div>");
        }

        var html = "";
        $.each(data, function (key, value) {
            $.each(value.Value, function (key1, value1) {
                html += '<h4 class="text-uppercase">' + key1 + '</h4>';
                //html += "<div class='panel panel-default'><div class='panel-heading'>" + key1 + "</div><div class='panel-body'>";
                $.each(value1, function (key2, value2) {
                    //html += "<div class='panel panel-default'><div class='panel-heading text-center'>" + key2 + "</div><div class='panel-body'>";
                    html += '<h5 class="text-center">' + key2 + '</h5>';
                    html += "<table class='table table-striped'>";
                    $.each(value2, function (infokey, infovalue) {
                        html += "<tr><td>" + infovalue + "</td></tr>";
                    });
                    html += "</table>";
                    //html += "</div></div>";
                });
                //html += "</div></div>";
            });
        });
        $("#subpage_content").append(html);

    });

    // make the link to the page user is located as a simple text
    $(".subpage_content .nav-tabs li.active a").click(function (e) {
        e.preventDefault();
    });

    // Hide links to the pages without content
    API.getData(["Intellect", "KRExecutions"], {
        userIdentifier: userIdentifier
    }, function (data) {
        if ($.isEmptyObject(data)) {
            $("#execution_subsection").addClass("hidden");
        }
    });
    API.getData(["Intellect", "KRResults"], {
        userIdentifier: userIdentifier
    }, function (data) {
        if ($.isEmptyObject(data)) {
            $("#results_subsection").addClass("hidden");
        }
    });
    API.getData(["Intellect", "publications"], {
        userIdentifier: userIdentifier
    }, function (data) {
        if ($.isEmptyObject(data)) {
            $("#publications_subsection").addClass("hidden");
        }
    });
    API.getData(["Intellect", "conferences"], {
        userIdentifier: userIdentifier
    }, function (data) {
        if ($.isEmptyObject(data)) {
            $("#conference_subsection").addClass("hidden");
        }
    });
});