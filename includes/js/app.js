const { updateUser, createUser, handleLogin } = require('./ajax/users')

function saveUser(user) {
    if (user.id == null) {
        createUser(user);
    } else {
        updateUser(user);
    }
}

$(document).ready(function () {
    var table = $("#users").DataTable();
    $('.alert').hide()
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
            saveUser(user);
        });
    });
});

$(".createUser").click(function () {
    $('.error').hide();
    $('.alert').hide()
    let user = {
        name: $(".create #Jméno").val(),
        email: $(".create #Email").val(),
        role_id: $(".create #role").val(),
        password: $(".create #Heslo").val(),
    };
    saveUser(user);
});


$(".loginSubmit").click(function () {
    $('.error').hide();
    $('.alert').hide()

    let user = {
        email: $(".loginUser #Email").val(),
        password: $(".loginUser #Heslo").val(),
        token: $(".loginUser #token").val(),
    };;
    handleLogin(user);
});

