function createUser(user) {
    $.ajax({
        type: "POST", // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
        dataType: "json", // Set datatype - affects Accept header
        url: "/adduser", // A valid URL
        data: {
            method: "_POST",
            data: JSON.stringify(user),
        }, // Some data e.g. Valid JSON as a string
        success: function (res) {
            var res = JSON.parse(res);
            console.log(res);
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ": " + xhr.statusText;
            console.log(errorMessage);
        },
    });
}

function updateUser(user) {
    console.log(user);
    $.ajax({
        type: "POST", // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
        dataType: "json", // Set datatype - affects Accept header
        url: "/edituser", // A valid URL
        data: {
            method: "_POST",
            data: JSON.stringify(user),
        }, // Some data e.g. Valid JSON as a string
        success: function (res) {
            var res = JSON.parse(res);
            console.log(res);
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ": " + xhr.statusText;
            console.log(errorMessage);
        },
    });
}

module.exports = { createUser, updateUser }