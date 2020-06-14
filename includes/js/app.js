const { createUser, updateUser, deleteUser } = require("./ajax/users");
const { handleLogin } = require("./ajax/auth");
const { addArticle, updateArticle, deleteArticle } = require("./ajax/articles");
const { parseJSON } = require("jquery");

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

Dropzone.options.myDropzone = {
  url: "ajax.php",
  autoProcessQueue: false,
  uploadMultiple: true,
  parallelUploads: 5,
  maxFiles: 5,
  maxFilesize: 10,
  acceptedFiles: "image/*",
  addRemoveLinks: true,
  init: function () {
    dzClosure = this;

    $(".error").hide();
    document
      .getElementById("addArticle")
      .addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (dzClosure.getQueuedFiles().length === 0) {
          var blob = new Blob();
          blob.upload = { chunked: dzClosure.defaultOptions.chunking };
          dzClosure.uploadFile(blob);
        } else {
          dzClosure.processQueue();
        }
      });

    //send all the form data along with the files:
    this.on("sendingmultiple", function (file, xhr, formData) {
      var article = {
        Název: $("#Název").val(),
        Popis: $("#Popis").val(),
        Lokalita: $("#Lokalita").val(),
        Telefon: $("#Telefon").val(),
        Cena: $("#Cena").val(),
      };
      formData.append("method", "addArticle");
      formData.append("data", JSON.stringify(article));
      formData.append("title", $("#Název").val());
      formData.append("phone", $("#Telefon").val());
      formData.append("description", $("#Popis").val());
      formData.append("location", $("#Lokalita").val());
      formData.append("price", $("#Cena").val());
    });

    this.on("successmultiple", function (file, res) {
      console.log(file);
      res = parseJSON(res);
      $(".error").hide();
      if (res["errors"]) {
        const errors = res["errors"];
        for (let [input, msg] of Object.entries(errors)) {
          $(".error").show();
          $(`#err${input}`).text(msg);
        }
      }
      if (res["success"]) {
        $("#addUser").modal("hide");
        $(".alert-success").show().text(res["success"]);
        var t = $("#users").DataTable();
        article = res.article;
        t.row.add([user.id, user.name, user.email]).draw(false);
      }
    });
  },
};

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

$(document).ready(function () {
  var table = $("#articles").DataTable();
  $(".alert").hide();
  $("#articles tbody").on("click", "tr", function () {
    var data = table.row(this).data();
    $(".editUser").unbind("click");
    $(".deleteUser").unbind("click");
    $("#editArticle").modal("show");
    $(".error").hide();
    $(".editArticle #Název").val(data[1]);
    $(".editArticle #Popis").val(data[2]);
    $(".editArticle #Cena").val(data[3]);
    $(".editArticle #Lokalita").val(data[4]);
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

// $(document).ready(function () {
//   var table = $("#articles").DataTable();
//   $(".alert").hide();
//   $("#users tbody").on("click", "tr", function () {
//     var data = table.row(this).data();
//     $(".editArticle").unbind("click");
//     $(".updateArticle").unbind("click");
//     $("#createArticle").modal("show");
//     $(".error").hide();
//     $(".createArticle #Jméno").val(data[1]);
//     $(".createArticle #Email").val(data[2]);
//     $(`.createArticle #role option[value=${data[3]}]`).attr(
//       "selected",
//       "selected"
//     );

//     $(".editArticle").click(function () {
//       let article = {
//         id: data[0],
//         title: $(".createArticle #Název").val(),
//         description: $(".createArticle #Popis").val(),
//         price: $(".createArticle #Lokalita").val(),
//         location: $(".createArticle #Cena").val(),
//       };
//       saveArticle(article);
//     });
//     $(".deleteArticle").click(function () {
//       let article = {
//         id: data[0],
//       };
//       deleteUser(article);
//     });
//   });
// });

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
