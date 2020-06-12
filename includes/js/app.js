const { updateUser, createUser, deleteUser } = require("./ajax/users");
const { handleLogin } = require("./ajax/auth");
const { addArticle, updateArticle, deleteArticle } = require("./ajax/articles");

function saveUser(user) {
  if (user.id == null) {
    createUser(user);
  } else {
    updateUser(user);
  }
}

function saveArticle(article) {
  if (article.id == null) {
    addArticle(article);
  } else {
    updateArticle(article);
  }
}

$(".createUser").click(function () {
  $(".error").hide();
  $(".alert").hide();
  let user = {
    name: $(".create #Jméno").val(),
    email: $(".create #Email").val(),
    role_id: $(".create #role").val(),
    password: $(".create #Heslo").val(),
  };
  saveUser(user);
});

$(document).ready(function () {
  var table = $("#users").DataTable();
  $(".alert").hide();
  $("#users tbody").on("click", "tr", function () {
    var data = table.row(this).data();
    $(".editUser").unbind("click");
    $(".deleteUser").unbind("click");
    $("#updateUser").modal("show");
    $(".error").hide();
    $(".edit #Jméno").val(data[1]);
    $(".edit #Email").val(data[2]);
    $(`.edit #role option[value=${data[3]}]`).attr("selected", "selected");

    $(".editUser").click(function () {
      let user = {
        id: data[0],
        name: $(".edit #Jméno").val(),
        email: $(".edit #Email").val(),
        password: $(".edit #Heslo").val(),
        role_id: $(".edit #role").val(),
      };
      saveUser(user);
    });
    $(".deleteUser").click(function () {
      let user = {
        id: data[0],
        name: $(".edit #Jméno").val(),
        email: $(".edit #Email").val(),
        password: $(".edit #Heslo").val(),
        role_id: $(".edit #role").val(),
      };
      deleteUser(user);
    });
  });
});

$(".loginSubmit").click(function () {
  $(".error").hide();
  $(".alert").hide();
  let user = {
    email: $(".loginUser #Email").val(),
    password: $(".loginUser #Heslo").val(),
    token: $(".loginUser #token").val(),
  };
  handleLogin(user);
});

$(document).ready(function () {
  var table = $("#articles").DataTable();
  $(".alert").hide();
  $("#users tbody").on("click", "tr", function () {
    var data = table.row(this).data();
    $(".editArticle").unbind("click");
    $(".updateArticle").unbind("click");
    $("#createArticle").modal("show");
    $(".error").hide();
    $(".createArticle #Jméno").val(data[1]);
    $(".createArticle #Email").val(data[2]);
    $(`.createArticle #role option[value=${data[3]}]`).attr(
      "selected",
      "selected"
    );

    $(".editArticle").click(function () {
      let article = {
        id: data[0],
        title: $(".createArticle #Název").val(),
        description: $(".createArticle #Popis").val(),
        price: $(".createArticle #Lokalita").val(),
        location: $(".createArticle #Cena").val(),
      };
      saveArticle(article);
    });
    $(".deleteArticle").click(function () {
      let article = {
        id: data[0],
      };
      deleteUser(article);
    });
  });
});

$(".addArticle").click(function () {
  $(".error").hide();
  $(".alert").hide();
  let article = {
    title: $(".createArticle #Název").val(),
    description: $(".createArticle #Popis").val(),
    price: $(".createArticle #Lokalita").val(),
    location: $(".createArticle #Cena").val(),
  };
  console.log(article);
  saveArticle(article);
});

$(".deleteArticle").click(function () {
  $(".error").hide();
  $(".alert").hide();
  let user = {
    email: $(".loginUser #Email").val(),
    password: $(".loginUser #Heslo").val(),
    token: $(".loginUser #token").val(),
  };
  deleteArticle(user);
});
