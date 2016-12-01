$(document).ready(function () {
    var subpage = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];
    var userIdentifier = window.location.pathname.split("/")[window.location.pathname.split("/").length - 2];
    var apiMethod;

    switch(subpage) {
        case "execution":
            apiMethod = "GetKRExecutionList";
            break;
        case "results":
            apiMethod = "GetKRResultsList";
            break;
        case "publications":
            apiMethod = "GetPublicationList";
            break;
        case "conference":
            apiMethod = "GetConferenceList";
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
                //html += "<div class='panel panel-default'><div class='panel-heading subpage_content_h'>" + key + (key.toString() != "" ? "; " : "") + key1 + "</div><div class='panel-body'>";
                html += "<div class='panel panel-default'><div class='panel-heading subpage_content_h'>" + key1 + "</div><div class='panel-body'>";
                $.each(value1, function (key2, value2) {
                    html += "<div class='panel panel-default'><div class='panel-heading text-center subpage_content_year'>" + key2 + "</div><div class='panel-body'>";
                    html += "<table class='table table-striped'>";
                    $.each(value2, function (infokey, infovalue) {
                        html += "<tr><td>" + infovalue + "</td></tr>";
                    });
                    html += "</table>";
                    html += "</div></div>";
                });
                html += "</div></div>";
            });
        });
        $("#subpage_content").append(html);

    });
    
    // make the link to the page user is located as a simple text
    $(".subpage_content .nav-tabs li.active a").click(function(e) {
        e.preventDefault();
    });

    // Hide links to the pages without content
    API.getData(["Intellect", "GetKRExecutionList"], {
        userIdentifier: userIdentifier
    }, function (data) {
        if ($.isEmptyObject(data)) {
            $("#execution_subsection").addClass("hidden");
        }
    });
    API.getData(["Intellect", "GetKRResultsList"], {
        userIdentifier: userIdentifier
    }, function (data) {
        if ($.isEmptyObject(data)) {
            $("#results_subsection").addClass("hidden");
        }
    });
    API.getData(["Intellect", "GetPublicationList"], {
        userIdentifier: userIdentifier
    }, function (data) {
        if ($.isEmptyObject(data)) {
            $("#publications_subsection").addClass("hidden");
        }
    });
    API.getData(["Intellect", "GetConferenceList"], {
        userIdentifier: userIdentifier
    }, function (data) {
        if ($.isEmptyObject(data)) {
            $("#conference_subsection").addClass("hidden");
        }
    });
});