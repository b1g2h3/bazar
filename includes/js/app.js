const { updateUser, createUser } = require('./api/users')
const { validationMessages, printErrors } = require("./func/validation");

function saveUser(user) {
    if (user.id == null) {
        createUser(user);
    } else {
        updateUser(user);
    }
}
function validateUser(user) {
    const validations = {
        name: {
            required: true,
            length: 3,
        },
        email: {
            required: true,
            length: 8,
        },
        role_id: {
            required: true,
        },
        password: {
            required: false,
        },
    };

    const errors = validationMessages(validations, user);
    $('.error').hide();

    return {
        valid: Object.values(errors).every((messages) => messages.length === 0),
        errors: errors,
    };
}
$(document).ready(function () {
    var table = $("#users").DataTable();
    $("#users tbody").on("click", "tr", function () {
        var data = table.row(this).data();
        $(".edit_user").unbind("click");
        $("#updateUser").modal("show");
        $('.error').hide();
        $(".edit #Jméno").val(data[1]);
        $(".edit #Email").val(data[2]);
        $(`.edit #role option[value=${data[3]}]`).attr("selected", "selected");
        $(".edit_user").click(function () {
            let user = {
                id: data[0],
                name: $(".edit #Jméno").val(),
                email: $(".edit #Email").val(),
                password: $(".edit #Heslo").val(),
                role_id: $(".edit #role").val(),
            };
            const { errors, valid } = validateUser(user);
            if (valid) {
                saveUser(user);
            } else {
                printErrors(errors);
            }
        });
    });
});

$(".createUser").click(function () {
    $('.error').hide();
    let user = {
        name: $(".create #Jméno").val(),
        email: $(".create #Email").val(),
        role_id: $(".create #role").val(),
        password: $(".create #Heslo").val(),
    };
    const { errors, valid } = validateUser(user);
    if (valid) {
        saveUser(user);
    } else {
        printErrors(errors);
    }
});

