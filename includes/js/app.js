const { createUser, updateUser, deleteUser } = require("./ajax/users");
const { handleLogin } = require("./ajax/auth");
const { createArticle, updateArticle, deleteArticle } = require("./ajax/articles");
const { parseJSON } = require("jquery");


var allFiles = [];

function saveUser(user) {
  if (user.id == null) {
    createUser(user);
  } else {
    updateUser(user);
  }
}

function saveArticle(article) {
  if (article.id == null) {
    createArticle(article);
  } else {
    updateArticle(article);
  }
}



$(".sendArticle").click(function () {
  $(".error").hide();
  $(".alert").hide();
  let article = {
    Název: $("#Název").val(),
    Popis: $("#Popis").val(),
    Email: $("#Email").val(),
    Lokalita: $("#Lokalita").val(),
    Cena: $("#Cena").val(),
  };
  article.files = allFiles;
  saveArticle(article);
});



$(".uploadArticleImages").click(function (e) {
  document.getElementById('selectfile').click();
  document.getElementById('selectfile').onchange = function() {
    files = document.getElementById('selectfile').files;
    renderImages(files)
    handleFiles(files)
  };
});

$(".dropArticleImages")
    .bind('dragenter dragover', false)
    .bind("drop", function(e) {
      e.preventDefault();
      e.stopPropagation()
      let dt = e.originalEvent.dataTransfer;
      let files = dt.files
      renderImages(files)
      handleFiles(files)
    });


function handleFiles(files) {
  let article = {
    Název: $("#Název").val(),
    Popis: $("#Popis").val(),
    Lokalita: $("#Lokalita").val(),
    Telefon: $("#Telefon").val(),
    Cena: $("#Cena").val(),
  };
  for (let [index, file] of Object.entries(files)) {
    allFiles.push(file);
  }
}

function renderImages(files) {
  for (let [index, file] of Object.entries(files)) {
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.className = "previewImage"
    $('.dropArticlePreview').append(img);
    img.onerror = function(){
      alert('Pravděpodobně nepodporovaný typ obrázku.');
    }
    img.src = url;
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
  var table = $("#users").DataTable({
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Czech.json"
    }
  });
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
  var table = $("#articles").DataTable({
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Czech.json"
    }
  });
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



