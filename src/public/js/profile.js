$(document).ready(function () {
    var path = window.location.pathname;
    if (path[path.length-1] == "/") {
        path = path.substring(0, path.length - 1);
    };
    var pathSplited = path.split("/");
    var userIdentifier = pathSplited[pathSplited.length - 1];

    API.getData(["Intellect", "awards"], {
        userIdentifier: userIdentifier
    }, function (data) {

        if ($.isEmptyObject(data)) {
            $("#awards").addClass("hidden");
            return;
        }

        var html = "";
        $.each(data, function (key, value) {
            html += "<div class='panel panel-default'><div class='panel-heading'>" + key.charAt(0).toUpperCase() + key.substr(1) + "</div><div class='panel-body'>";
            $.each(value, function (key2, value2) {
                html += "<div class='panel panel-default'><div class='panel-heading text-center'>" + key2 + "</div><div class='panel-body'>";
                html += "<table class='table table-striped'>";
                $.each(value2, function (infokey, infovalue) {
                    html += "<tr><td>" + infovalue + "</td></tr>";
                });
                html += "</table>";
                html += "</div></div>";
            });
            html += "</div></div>";
        });
        $("#awards-text").append(html);
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