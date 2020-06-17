/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./includes/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./includes/js/ajax/articles.js":
/*!**************************************!*\
  !*** ./includes/js/ajax/articles.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function createArticle(article) {
  let fd = new FormData();
  for (i = 0; i < article.files.length; i++) {
    fd.append("file[]", article.files[i]);
  }
  fd.append("data", JSON.stringify(article));
  fd.append("method", "addArticle");
  $.ajax({
    type: "POST",
    url: "ajax.php",
    contentType: false,
    processData: false,
    data: fd,
    success: function (res) {
      res = JSON.parse(res);
      $(".error").hide();
      if (res["errors"]) {
        const errors = res["errors"];
        for (let [input, msg] of Object.entries(errors)) {
          $(".error").show();
          $(`#err${input}`).text(msg);
        }
      }
      if (res["success"]) {
        $("#addArticle").modal("hide");
        $(".alert-success").show().text(res["success"]);
        var t = $("#articles").DataTable();
        article = res.article;
        t.row
          .add([
            article.id,
            article.Název,
            article.Popis,
            article.Cena,
            article.Lokalita,
            article.Email,
            article.rezervace = 'Není',
          ])
          .draw(false);
      }
    },
  });
}

function updateArticle(article) {
  let fd = new FormData();
  for (i = 0; i < article.files.length; i++) {
    fd.append("file[]", article.files[i]);
  }
  fd.append("data", JSON.stringify(article));
  fd.append("method", "updateArticle");
  $.ajax({
    type: "POST",
    url: "ajax.php",
    contentType: false,
    processData: false,
    data: fd,
    success: function (res) {
      res = JSON.parse(res);
      $(".error").hide();
      if (res["errors"]) {
        const errors = res["errors"];
        for (let [input, msg] of Object.entries(errors)) {
          $(".error").show();
          $(`#err${input}`).text(msg);
        }
      }
      if (res["success"]) {
        $("#editArticle").modal("hide");
        $(".alert-success").show().text(res["success"]);
        var t = $("#articles").DataTable();
        let rowId = $("#articles").dataTable().fnFindCellRowIndexes(article.id, 0);
        t.row(rowId)
            .data([
              article.id,
              article.Název,
              article.Popis,
              article.Cena,
              article.Lokalita,
              article.Email,
              article.rezervace == 0 ? 'Není' : 'Již rezervován',
            ])
            .invalidate();
        article = res.article;
       console.log(article);
      }
    },
  });
}

function deleteArticle(article) {
  console.log(article);
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/ajax.php",
    data: {
      method: "deleteArticle",
      data: JSON.stringify(user),
    },
    success: function (res) {
      console.log(res);
      //   $(".error").hide();
      //   if (res["errors"]) {
      //     const errors = res["errors"];
      //     for (let [input, msg] of Object.entries(errors)) {
      //       let name = customValidationMessage[input];
      //       $(".error").show();
      //       $(`#err${name}`).text(msg);
      //     }
      //   }
      //   if (res["success"]) {
      //     $("#updateUser").modal("hide");
      //     $(".alert-danger").show().text(res["success"]);
      //     var t = $("#users").DataTable();
      //     t.rows(function (index, data) {
      //       return data[0] === user.id;
      //     })
      //       .remove()
      //       .draw();
      //   }
    },
    error: function (xhr, status, error) {
      console.log(xhr, status, error);
    },
  });
}

function getArticleImages(articleId) {
  $.ajax({
    type: "POST",
    url: "ajax.php",
    data: { id: articleId, method: "getArticleImages" },
    success: function (res) {
      res = JSON.parse(res);
      if (res["success"]) {
        $('.previewImageEdit').remove();
        var images = res.images;
        images.map(image => {
          $('.dropArticlePreviewImages').prepend(`<img id="img${image.id}" class="previewImageEdit deleteImage" src="data:image/jpg;base64,${image.base64} " />`);
        });
        $(".deleteImage").click(function () {
          if(confirm('Chcete vážně odstranit obrázek z databáze?')) {
            let id = $(this).attr("id");
            deleteImage(id) ;
          }
        });

      }
    },
  });
}

function sendArticleToEmail(email) {
  let articleId = location.search.split('id=')[1]
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/ajax.php",
    data: {
      method: "sendArticleToEmail",
      data: JSON.stringify({
        email: email,
        id: articleId
      }),
    },
    success: function (res) {
      $(".error").hide();
      if (res["errors"]) {
        const errors = res["errors"];
        for (let [input, msg] of Object.entries(errors)) {
          $(".error").show();
          $(`.sendArticleToEmail #err${input}`).text(msg);
        }
      }
      if(res["success"]) {
        $("#sendArticleOnEmail").modal("hide");
        $(".alert-success").show().text(res["success"]);
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr, status, error);
    },
  });
}


function sendReservationToEmail(data) {
  data.id = location.search.split('id=')[1]
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/ajax.php",
    data: {
      method: "sendReservationToOwner",
      data: JSON.stringify(data),
    },
    success: function (res) {
      $(".error").hide();
      if (res["errors"]) {
        const errors = res["errors"];
        for (let [input, msg] of Object.entries(errors)) {
          $(".error").show();
          $(`#err${input}`).text(msg);
        }
      }
      if(res["success"]) {
        $("#addReservation").modal("hide");
        $(".alert-success").show().text(res["success"]);
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr, status, error);
    },
  });
}


function deleteImage(id) {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/ajax.php",
    data: {
      method: "deleteImage",
      imageId: id,
    },
    success: function (res) {
      $(".error").hide();
      if (res.errors) {
        console.log(res.errors);
      }
      if(res.success) {
        $(".editalert-danger").show().text(res.success);
        $(`#${id}`).remove()
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr, status, error);
    },
  });
}
module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleImages,
  sendArticleToEmail,
  sendReservationToEmail
};


/***/ }),

/***/ "./includes/js/ajax/auth.js":
/*!**********************************!*\
  !*** ./includes/js/ajax/auth.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

const customValidationMessage = {
  name: "Jméno",
  email: "Email",
  role_id: "Roli",
  password: "Heslo",
};

function handleLogin(user) {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/ajax.php",
    data: {
      method: "handleLogin",
      data: JSON.stringify(user),
    },
    success: function (res) {
      $(".error").hide();
      if (res["errors"]) {
        const errors = res["errors"];
        for (let [input, msg] of Object.entries(errors)) {
          let name = customValidationMessage[input];
          $(`#err${name}`).show(msg);
          $(`#err${name}`).text(msg);
        }
      }
      if (res["success"]) {
        if(res.user.role_id === "1") {
          window.location.href = "/?page=users";
        } else {
          window.location.href = "/?page=editArticles";
        }
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr, status, error);
    },
  });
}

module.exports = { handleLogin };


/***/ }),

/***/ "./includes/js/ajax/users.js":
/*!***********************************!*\
  !*** ./includes/js/ajax/users.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

const customValidationMessage = {
  name: "Jméno",
  email: "Email",
  role_id: "Roli",
  password: "Heslo",
};

function createUser(user) {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/ajax.php",
    data: {
      method: "addUser",
      data: JSON.stringify(user),
    },
    success: function (res) {
      $(".error").hide();
      if (res["errors"]) {
        const errors = res["errors"];
        for (let [input, msg] of Object.entries(errors)) {
          let name = customValidationMessage[input];
          $(".error").show();
          $(`#err${name}`).text(msg);
        }
      }
      if (res["success"]) {
        $("#addUser").modal("hide");
        $(".alert-success").show().text(res["success"]);
        var t = $("#users").DataTable();
        var counter = 1;
        user = res.user;
        t.row
          .add([
            user.id,
            user.name,
            user.email,
            user.roles_id == 1 ? "Admin" : "Editor",
          ])
          .draw(false);
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr, status, error);
    },
  });
}

function updateUser(user) {
  user.role_id = user.role_id == 'Admin' ? 1 : 2;
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/ajax.php",
    data: {
      method: "updateUser",
      data: JSON.stringify(user),
    },
    success: function (res) {
      $(".error").hide();
      if (res["errors"]) {
        const errors = res["errors"];
        for (let [input, msg] of Object.entries(errors)) {
          let name = customValidationMessage[input];
          $(".error").show();
          $(`#err${name}`).text(msg);
        }
      }
      if (res["success"]) {
        res.user = user;
        $("#updateUser").modal("hide");
        $(".alert-success").show().text(res["success"]);
        let t = $("#users").DataTable();
        let rowId = $("#users").dataTable().fnFindCellRowIndexes(user.id, 0);
        t.row(rowId)
          .data([
            user.id,
            user.name,
            user.email,
            user.role_id == 1 ? "Admin" : "Editor",
          ])
          .invalidate();
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr, status, error);
    },
  });
}

function deleteUser(user) {
  console.log(user);
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/ajax.php",
    data: {
      method: "deleteUser",
      data: JSON.stringify(user),
    },
    success: function (res) {
      $(".error").hide();
      if (res["errors"]) {
        const errors = res["errors"];
        for (let [input, msg] of Object.entries(errors)) {
          let name = customValidationMessage[input];
          $(".error").show();
          $(`#err${name}`).text(msg);
        }
      }
      if (res["success"]) {
        $("#updateUser").modal("hide");
        $(".alert-danger").show().text(res["success"]);
        var t = $("#users").DataTable();
        t.rows(function (index, data) {
          return data[0] === user.id;
        })
          .remove()
          .draw();
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr, status, error);
    },
  });
}

module.exports = { createUser, updateUser, deleteUser };


/***/ }),

/***/ "./includes/js/app.js":
/*!****************************!*\
  !*** ./includes/js/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// require("bootstrap/dist/js/bootstrap");
// require("popper.js");
const { createUser, updateUser, deleteUser } = __webpack_require__(/*! ./ajax/users */ "./includes/js/ajax/users.js");
const { handleLogin } = __webpack_require__(/*! ./ajax/auth */ "./includes/js/ajax/auth.js");
const {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleImages,
  sendArticleToEmail,
  sendReservationToEmail,
} = __webpack_require__(/*! ./ajax/articles */ "./includes/js/ajax/articles.js");
var allFiles = [];
var allFilesEdit = [];

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

$(".alert").hide();

$(".sendReservation").click(function (e) {
  let email = $(".sendReservationToEmail #Email").val();
  let msg = $(".sendReservationToEmail #Zpráva").val();
  let name = $(".sendReservationToEmail #Jméno").val();
  e.preventDefault();
  e.stopPropagation();
  data = {
    Email: email,
    Zpráva: msg,
    Jméno: name
  };
  sendReservationToEmail(data);
});

$(document).ready(function(){
  $(".lightBox").on("click", function(){
    $(".backDrop").animate({"opacity": ".70"}, 500);
    $(".box").animate({"opacity": "1.0"}, 500);
    $(".backDrop, .box").css("display", "block");
  });

  $(".thumb").on("click", function(){
    var largeImage = $(this).attr("src");
    $(".largeImage").attr({src: largeImage});
  });

  $(".close, .backDrop").on("click", function(){
    closeBox();
  });

  function closeBox(){
    $(".backDrop, .box").animate({"opacity": "0"}, 500, function(){
      $(".backDrop, .box").css("display", "none");
    });
  }
});

$(".sendArticleEmail").click(function (e) {
  let email = $(".sendArticleToEmail #Email").val();
  e.preventDefault();
  e.stopPropagation();
  sendArticleToEmail(email);
});

$(document).ready(function () {
  var table = $("#users").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Czech.json",
    },
  });
  $(".alert").hide();
  $("#users tbody").on("click", "tr", function () {
    var data = table.row(this).data();
    $('.editUserEvent').on('click', function () {
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
    })
  });
});

$(document).ready(function () {
  var table = $("#articles").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Czech.json",
    },
  });
  $(".alert").hide();
  $("#articles tbody").on("click", "tr", function () {
    var data = table.row(this).data();
    allFilesEdit = [];
    $(".editArticleEvent").on("click", function () {
      $(".updateArticle").unbind("click");
      $(".alert").hide();
      $("#editArticle").modal("show");
      // .draggable({ handle: ".modal-header" });
      $(".error").hide();
      let isCheck = data[6] !== "Není";
      $(".editArticle #Název").val(data[1]);
      $(".editArticle #Popis").val(data[2]);
      $(".editArticle #Email").val(data[5]);
      $(".editArticle #Cena").val(data[3]);
      $(".editArticle #Lokalita").val(data[4]);
      $("#rezervace").prop("checked", isCheck);

      getArticleImages(data["0"]);
      $(".updateArticle").click(function () {
        $(".error").hide();
        $(".alert").hide();
        let isCheck = $(".editArticle #rezervace").is(":checked") ? "1" : "0";
        let article = {
          id: data[0],
          Název: $(".editArticle #Název").val(),
          Popis: $(".editArticle #Popis").val(),
          Email: $(".editArticle #Email").val(),
          Lokalita: $(".editArticle #Lokalita").val(),
          Cena: $(".editArticle #Cena").val(),
          rezervace: isCheck,
        };
        article.files = allFilesEdit;
        saveArticle(article);
      });
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

$(".uploadArticleImages").click(function (e) {
  document.getElementById("selectfile").click();
  document.getElementById("selectfile").onchange = function () {
    files = document.getElementById("selectfile").files;
    files = renderImages(files);
    handleFiles(files);
  };
});

$(".uploadArticleImagesEdit").click(function (e) {
  document.getElementById("selectfileedit").click();
  document.getElementById("selectfileedit").onchange = function () {
    files = document.getElementById("selectfileedit").files;
    files = renderImagesEdit(files);
    handleFilesEdit(files);
  };
});

$(".dropArticleImages")
  .bind("dragenter dragover", false)
  .bind("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let dt = e.originalEvent.dataTransfer;
    let files = dt.files;
    files = renderImages(files);
    handleFiles(files);
  });

$(".dropArticleImagesEdit")
  .bind("dragenter dragover", false)
  .bind("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let dt = e.originalEvent.dataTransfer;
    let files = dt.files;
    files = renderImagesEdit(files);
    handleFilesEdit(files);
  });

function handleFiles(files) {
  for (let [index, file] of Object.entries(files)) {
    allFiles.push(file);
  }
}

function handleFilesEdit(files) {
  for (let [index, file] of Object.entries(files)) {
    allFilesEdit.push(file);
  }

  console.log(allFilesEdit);
}

function renderImages(files) {
  console.log(files);
  for (let [index, file] of Object.entries(files)) {
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.className = "previewImage";
    img.onerror = function () {
      alert("Pravděpodobně nepodporovaný typ obrázku.");
    };
    img.src = url;

    var number = Math.random();
    number.toString(36);
    var id = number.toString(36).substr(2, 9);
    img.id = id;
    file.id = id;
    $(".dropArticlePreview").append(img);
    $(".previewImage").click(function () {
      let id = $(this).attr("id");
      index = allFiles.findIndex((file) => file.id === id);
      allFiles.splice(index, 1);
      $(`#${id}`).remove();
    });
  }
  return files;
}

function renderImagesEdit(files) {
  console.log(files);
  for (let [index, file] of Object.entries(files)) {
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.className = "previewImageEdit";
    img.onerror = function () {
      alert("Pravděpodobně nepodporovaný typ obrázku.");
    };
    img.src = url;

    var number = Math.random();
    number.toString(36);
    var id = number.toString(36).substr(2, 9);
    img.id = id;
    file.id = id;
    $(".dropArticlePreviewImages").append(img);
    $(".previewImageEdit").click(function () {
      let id = $(this).attr("id");
      index = allFilesEdit.findIndex((file) => file.id === id);
      allFilesEdit.splice(index, 1);
      $(`#${id}`).remove();
    });
  }
  return files;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC9hcnRpY2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hamF4L2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC91c2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSxhQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxhQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixLQUFLO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0Q0FBNEM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLFNBQVMsMkRBQTJELFNBQVMsYUFBYTtBQUMxSixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxNQUFNO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsR0FBRztBQUNqQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4QixtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQSxrQkFBa0I7Ozs7Ozs7Ozs7OztBQ3hDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCOzs7Ozs7Ozs7Ozs7QUMvSGxCO0FBQ0E7QUFDQSxPQUFPLHFDQUFxQyxHQUFHLG1CQUFPLENBQUMsaURBQWM7QUFDckUsT0FBTyxjQUFjLEdBQUcsbUJBQU8sQ0FBQywrQ0FBYTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsR0FBRyxtQkFBTyxDQUFDLHVEQUFpQjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSw0QkFBNEIsaUJBQWlCO0FBQzdDLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSwyQkFBMkIsZ0JBQWdCO0FBQzNDLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQ0FBa0MsZUFBZTtBQUNqRDtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFFBQVE7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBCQUEwQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxHQUFHO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksR0FBRztBQUNmLEtBQUs7QUFDTDtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmNsdWRlcy9qcy9hcHAuanNcIik7XG4iLCJmdW5jdGlvbiBjcmVhdGVBcnRpY2xlKGFydGljbGUpIHtcclxuICBsZXQgZmQgPSBuZXcgRm9ybURhdGEoKTtcclxuICBmb3IgKGkgPSAwOyBpIDwgYXJ0aWNsZS5maWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgZmQuYXBwZW5kKFwiZmlsZVtdXCIsIGFydGljbGUuZmlsZXNbaV0pO1xyXG4gIH1cclxuICBmZC5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KGFydGljbGUpKTtcclxuICBmZC5hcHBlbmQoXCJtZXRob2RcIiwgXCJhZGRBcnRpY2xlXCIpO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIHVybDogXCJhamF4LnBocFwiLFxyXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgZGF0YTogZmQsXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7aW5wdXR9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjYWRkQXJ0aWNsZVwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIHZhciB0ID0gJChcIiNhcnRpY2xlc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICBhcnRpY2xlID0gcmVzLmFydGljbGU7XHJcbiAgICAgICAgdC5yb3dcclxuICAgICAgICAgIC5hZGQoW1xyXG4gICAgICAgICAgICBhcnRpY2xlLmlkLFxyXG4gICAgICAgICAgICBhcnRpY2xlLk7DoXpldixcclxuICAgICAgICAgICAgYXJ0aWNsZS5Qb3BpcyxcclxuICAgICAgICAgICAgYXJ0aWNsZS5DZW5hLFxyXG4gICAgICAgICAgICBhcnRpY2xlLkxva2FsaXRhLFxyXG4gICAgICAgICAgICBhcnRpY2xlLkVtYWlsLFxyXG4gICAgICAgICAgICBhcnRpY2xlLnJlemVydmFjZSA9ICdOZW7DrScsXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgICAgLmRyYXcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVBcnRpY2xlKGFydGljbGUpIHtcclxuICBsZXQgZmQgPSBuZXcgRm9ybURhdGEoKTtcclxuICBmb3IgKGkgPSAwOyBpIDwgYXJ0aWNsZS5maWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgZmQuYXBwZW5kKFwiZmlsZVtdXCIsIGFydGljbGUuZmlsZXNbaV0pO1xyXG4gIH1cclxuICBmZC5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KGFydGljbGUpKTtcclxuICBmZC5hcHBlbmQoXCJtZXRob2RcIiwgXCJ1cGRhdGVBcnRpY2xlXCIpO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIHVybDogXCJhamF4LnBocFwiLFxyXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgZGF0YTogZmQsXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7aW5wdXR9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjZWRpdEFydGljbGVcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjYXJ0aWNsZXNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgbGV0IHJvd0lkID0gJChcIiNhcnRpY2xlc1wiKS5kYXRhVGFibGUoKS5mbkZpbmRDZWxsUm93SW5kZXhlcyhhcnRpY2xlLmlkLCAwKTtcclxuICAgICAgICB0LnJvdyhyb3dJZClcclxuICAgICAgICAgICAgLmRhdGEoW1xyXG4gICAgICAgICAgICAgIGFydGljbGUuaWQsXHJcbiAgICAgICAgICAgICAgYXJ0aWNsZS5Ow6F6ZXYsXHJcbiAgICAgICAgICAgICAgYXJ0aWNsZS5Qb3BpcyxcclxuICAgICAgICAgICAgICBhcnRpY2xlLkNlbmEsXHJcbiAgICAgICAgICAgICAgYXJ0aWNsZS5Mb2thbGl0YSxcclxuICAgICAgICAgICAgICBhcnRpY2xlLkVtYWlsLFxyXG4gICAgICAgICAgICAgIGFydGljbGUucmV6ZXJ2YWNlID09IDAgPyAnTmVuw60nIDogJ0ppxb4gcmV6ZXJ2b3bDoW4nLFxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAuaW52YWxpZGF0ZSgpO1xyXG4gICAgICAgIGFydGljbGUgPSByZXMuYXJ0aWNsZTtcclxuICAgICAgIGNvbnNvbGUubG9nKGFydGljbGUpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVBcnRpY2xlKGFydGljbGUpIHtcclxuICBjb25zb2xlLmxvZyhhcnRpY2xlKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJkZWxldGVBcnRpY2xlXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgLy8gICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgLy8gICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgIC8vICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgIC8vICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAvLyAgICAgICBsZXQgbmFtZSA9IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlW2lucHV0XTtcclxuICAgICAgLy8gICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgIC8vICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAvLyAgICAgfVxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAvLyAgICAgJChcIiN1cGRhdGVVc2VyXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgLy8gICAgICQoXCIuYWxlcnQtZGFuZ2VyXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAvLyAgICAgdmFyIHQgPSAkKFwiI3VzZXJzXCIpLkRhdGFUYWJsZSgpO1xyXG4gICAgICAvLyAgICAgdC5yb3dzKGZ1bmN0aW9uIChpbmRleCwgZGF0YSkge1xyXG4gICAgICAvLyAgICAgICByZXR1cm4gZGF0YVswXSA9PT0gdXNlci5pZDtcclxuICAgICAgLy8gICAgIH0pXHJcbiAgICAgIC8vICAgICAgIC5yZW1vdmUoKVxyXG4gICAgICAvLyAgICAgICAuZHJhdygpO1xyXG4gICAgICAvLyAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXJ0aWNsZUltYWdlcyhhcnRpY2xlSWQpIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICB1cmw6IFwiYWpheC5waHBcIixcclxuICAgIGRhdGE6IHsgaWQ6IGFydGljbGVJZCwgbWV0aG9kOiBcImdldEFydGljbGVJbWFnZXNcIiB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJCgnLnByZXZpZXdJbWFnZUVkaXQnKS5yZW1vdmUoKTtcclxuICAgICAgICB2YXIgaW1hZ2VzID0gcmVzLmltYWdlcztcclxuICAgICAgICBpbWFnZXMubWFwKGltYWdlID0+IHtcclxuICAgICAgICAgICQoJy5kcm9wQXJ0aWNsZVByZXZpZXdJbWFnZXMnKS5wcmVwZW5kKGA8aW1nIGlkPVwiaW1nJHtpbWFnZS5pZH1cIiBjbGFzcz1cInByZXZpZXdJbWFnZUVkaXQgZGVsZXRlSW1hZ2VcIiBzcmM9XCJkYXRhOmltYWdlL2pwZztiYXNlNjQsJHtpbWFnZS5iYXNlNjR9IFwiIC8+YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5kZWxldGVJbWFnZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBpZihjb25maXJtKCdDaGNldGUgdsOhxb5uxJsgb2RzdHJhbml0IG9icsOhemVrIHogZGF0YWLDoXplPycpKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gICAgICAgICAgICBkZWxldGVJbWFnZShpZCkgO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZEFydGljbGVUb0VtYWlsKGVtYWlsKSB7XHJcbiAgbGV0IGFydGljbGVJZCA9IGxvY2F0aW9uLnNlYXJjaC5zcGxpdCgnaWQ9JylbMV1cclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJzZW5kQXJ0aWNsZVRvRW1haWxcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICBpZDogYXJ0aWNsZUlkXHJcbiAgICAgIH0pLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgLnNlbmRBcnRpY2xlVG9FbWFpbCAjZXJyJHtpbnB1dH1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI3NlbmRBcnRpY2xlT25FbWFpbFwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzZW5kUmVzZXJ2YXRpb25Ub0VtYWlsKGRhdGEpIHtcclxuICBkYXRhLmlkID0gbG9jYXRpb24uc2VhcmNoLnNwbGl0KCdpZD0nKVsxXVxyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcInNlbmRSZXNlcnZhdGlvblRvT3duZXJcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtpbnB1dH1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2FkZFJlc2VydmF0aW9uXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LXN1Y2Nlc3NcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZUltYWdlKGlkKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwiZGVsZXRlSW1hZ2VcIixcclxuICAgICAgaW1hZ2VJZDogaWQsXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlcy5lcnJvcnMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyb3JzKTtcclxuICAgICAgfVxyXG4gICAgICBpZihyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICQoXCIuZWRpdGFsZXJ0LWRhbmdlclwiKS5zaG93KCkudGV4dChyZXMuc3VjY2Vzcyk7XHJcbiAgICAgICAgJChgIyR7aWR9YCkucmVtb3ZlKClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGNyZWF0ZUFydGljbGUsXHJcbiAgdXBkYXRlQXJ0aWNsZSxcclxuICBkZWxldGVBcnRpY2xlLFxyXG4gIGdldEFydGljbGVJbWFnZXMsXHJcbiAgc2VuZEFydGljbGVUb0VtYWlsLFxyXG4gIHNlbmRSZXNlcnZhdGlvblRvRW1haWxcclxufTtcclxuIiwiY29uc3QgY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2UgPSB7XHJcbiAgbmFtZTogXCJKbcOpbm9cIixcclxuICBlbWFpbDogXCJFbWFpbFwiLFxyXG4gIHJvbGVfaWQ6IFwiUm9saVwiLFxyXG4gIHBhc3N3b3JkOiBcIkhlc2xvXCIsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVMb2dpbih1c2VyKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwiaGFuZGxlTG9naW5cIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnNob3cobXNnKTtcclxuICAgICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgIGlmKHJlcy51c2VyLnJvbGVfaWQgPT09IFwiMVwiKSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLz9wYWdlPXVzZXJzXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvP3BhZ2U9ZWRpdEFydGljbGVzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBoYW5kbGVMb2dpbiB9O1xyXG4iLCJjb25zdCBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZSA9IHtcclxuICBuYW1lOiBcIkptw6lub1wiLFxyXG4gIGVtYWlsOiBcIkVtYWlsXCIsXHJcbiAgcm9sZV9pZDogXCJSb2xpXCIsXHJcbiAgcGFzc3dvcmQ6IFwiSGVzbG9cIixcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVVzZXIodXNlcikge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImFkZFVzZXJcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjYWRkVXNlclwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIHZhciB0ID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICB2YXIgY291bnRlciA9IDE7XHJcbiAgICAgICAgdXNlciA9IHJlcy51c2VyO1xyXG4gICAgICAgIHQucm93XHJcbiAgICAgICAgICAuYWRkKFtcclxuICAgICAgICAgICAgdXNlci5pZCxcclxuICAgICAgICAgICAgdXNlci5uYW1lLFxyXG4gICAgICAgICAgICB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICB1c2VyLnJvbGVzX2lkID09IDEgPyBcIkFkbWluXCIgOiBcIkVkaXRvclwiLFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICAgIC5kcmF3KGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVVc2VyKHVzZXIpIHtcclxuICB1c2VyLnJvbGVfaWQgPSB1c2VyLnJvbGVfaWQgPT0gJ0FkbWluJyA/IDEgOiAyO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcInVwZGF0ZVVzZXJcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgIHJlcy51c2VyID0gdXNlcjtcclxuICAgICAgICAkKFwiI3VwZGF0ZVVzZXJcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICBsZXQgdCA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgbGV0IHJvd0lkID0gJChcIiN1c2Vyc1wiKS5kYXRhVGFibGUoKS5mbkZpbmRDZWxsUm93SW5kZXhlcyh1c2VyLmlkLCAwKTtcclxuICAgICAgICB0LnJvdyhyb3dJZClcclxuICAgICAgICAgIC5kYXRhKFtcclxuICAgICAgICAgICAgdXNlci5pZCxcclxuICAgICAgICAgICAgdXNlci5uYW1lLFxyXG4gICAgICAgICAgICB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICB1c2VyLnJvbGVfaWQgPT0gMSA/IFwiQWRtaW5cIiA6IFwiRWRpdG9yXCIsXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgICAgLmludmFsaWRhdGUoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVVc2VyKHVzZXIpIHtcclxuICBjb25zb2xlLmxvZyh1c2VyKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJkZWxldGVVc2VyXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI3VwZGF0ZVVzZXJcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtZGFuZ2VyXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIHZhciB0ID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICB0LnJvd3MoZnVuY3Rpb24gKGluZGV4LCBkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YVswXSA9PT0gdXNlci5pZDtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgLnJlbW92ZSgpXHJcbiAgICAgICAgICAuZHJhdygpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBjcmVhdGVVc2VyLCB1cGRhdGVVc2VyLCBkZWxldGVVc2VyIH07XHJcbiIsIi8vIHJlcXVpcmUoXCJib290c3RyYXAvZGlzdC9qcy9ib290c3RyYXBcIik7XHJcbi8vIHJlcXVpcmUoXCJwb3BwZXIuanNcIik7XHJcbmNvbnN0IHsgY3JlYXRlVXNlciwgdXBkYXRlVXNlciwgZGVsZXRlVXNlciB9ID0gcmVxdWlyZShcIi4vYWpheC91c2Vyc1wiKTtcclxuY29uc3QgeyBoYW5kbGVMb2dpbiB9ID0gcmVxdWlyZShcIi4vYWpheC9hdXRoXCIpO1xyXG5jb25zdCB7XHJcbiAgY3JlYXRlQXJ0aWNsZSxcclxuICB1cGRhdGVBcnRpY2xlLFxyXG4gIGRlbGV0ZUFydGljbGUsXHJcbiAgZ2V0QXJ0aWNsZUltYWdlcyxcclxuICBzZW5kQXJ0aWNsZVRvRW1haWwsXHJcbiAgc2VuZFJlc2VydmF0aW9uVG9FbWFpbCxcclxufSA9IHJlcXVpcmUoXCIuL2FqYXgvYXJ0aWNsZXNcIik7XHJcbnZhciBhbGxGaWxlcyA9IFtdO1xyXG52YXIgYWxsRmlsZXNFZGl0ID0gW107XHJcblxyXG5mdW5jdGlvbiBzYXZlVXNlcih1c2VyKSB7XHJcbiAgaWYgKHVzZXIuaWQgPT0gbnVsbCkge1xyXG4gICAgY3JlYXRlVXNlcih1c2VyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdXBkYXRlVXNlcih1c2VyKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVBcnRpY2xlKGFydGljbGUpIHtcclxuICBpZiAoYXJ0aWNsZS5pZCA9PSBudWxsKSB7XHJcbiAgICBjcmVhdGVBcnRpY2xlKGFydGljbGUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB1cGRhdGVBcnRpY2xlKGFydGljbGUpO1xyXG4gIH1cclxufVxyXG5cclxuJChcIi5zZW5kQXJ0aWNsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgbGV0IGFydGljbGUgPSB7XHJcbiAgICBOw6F6ZXY6ICQoXCIjTsOhemV2XCIpLnZhbCgpLFxyXG4gICAgUG9waXM6ICQoXCIjUG9waXNcIikudmFsKCksXHJcbiAgICBFbWFpbDogJChcIiNFbWFpbFwiKS52YWwoKSxcclxuICAgIExva2FsaXRhOiAkKFwiI0xva2FsaXRhXCIpLnZhbCgpLFxyXG4gICAgQ2VuYTogJChcIiNDZW5hXCIpLnZhbCgpLFxyXG4gIH07XHJcbiAgYXJ0aWNsZS5maWxlcyA9IGFsbEZpbGVzO1xyXG4gIHNhdmVBcnRpY2xlKGFydGljbGUpO1xyXG59KTtcclxuXHJcbiQoXCIuY3JlYXRlVXNlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgbGV0IHVzZXIgPSB7XHJcbiAgICBuYW1lOiAkKFwiLmNyZWF0ZSAjSm3DqW5vXCIpLnZhbCgpLFxyXG4gICAgZW1haWw6ICQoXCIuY3JlYXRlICNFbWFpbFwiKS52YWwoKSxcclxuICAgIHJvbGVfaWQ6ICQoXCIuY3JlYXRlICNyb2xlXCIpLnZhbCgpLFxyXG4gICAgcGFzc3dvcmQ6ICQoXCIuY3JlYXRlICNIZXNsb1wiKS52YWwoKSxcclxuICB9O1xyXG4gIHNhdmVVc2VyKHVzZXIpO1xyXG59KTtcclxuXHJcbiQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG5cclxuJChcIi5zZW5kUmVzZXJ2YXRpb25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBsZXQgZW1haWwgPSAkKFwiLnNlbmRSZXNlcnZhdGlvblRvRW1haWwgI0VtYWlsXCIpLnZhbCgpO1xyXG4gIGxldCBtc2cgPSAkKFwiLnNlbmRSZXNlcnZhdGlvblRvRW1haWwgI1pwcsOhdmFcIikudmFsKCk7XHJcbiAgbGV0IG5hbWUgPSAkKFwiLnNlbmRSZXNlcnZhdGlvblRvRW1haWwgI0ptw6lub1wiKS52YWwoKTtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICBkYXRhID0ge1xyXG4gICAgRW1haWw6IGVtYWlsLFxyXG4gICAgWnByw6F2YTogbXNnLFxyXG4gICAgSm3DqW5vOiBuYW1lXHJcbiAgfTtcclxuICBzZW5kUmVzZXJ2YXRpb25Ub0VtYWlsKGRhdGEpO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgJChcIi5saWdodEJveFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKFwiLmJhY2tEcm9wXCIpLmFuaW1hdGUoe1wib3BhY2l0eVwiOiBcIi43MFwifSwgNTAwKTtcclxuICAgICQoXCIuYm94XCIpLmFuaW1hdGUoe1wib3BhY2l0eVwiOiBcIjEuMFwifSwgNTAwKTtcclxuICAgICQoXCIuYmFja0Ryb3AsIC5ib3hcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gIH0pO1xyXG5cclxuICAkKFwiLnRodW1iXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgIHZhciBsYXJnZUltYWdlID0gJCh0aGlzKS5hdHRyKFwic3JjXCIpO1xyXG4gICAgJChcIi5sYXJnZUltYWdlXCIpLmF0dHIoe3NyYzogbGFyZ2VJbWFnZX0pO1xyXG4gIH0pO1xyXG5cclxuICAkKFwiLmNsb3NlLCAuYmFja0Ryb3BcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgY2xvc2VCb3goKTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gY2xvc2VCb3goKXtcclxuICAgICQoXCIuYmFja0Ryb3AsIC5ib3hcIikuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IFwiMFwifSwgNTAwLCBmdW5jdGlvbigpe1xyXG4gICAgICAkKFwiLmJhY2tEcm9wLCAuYm94XCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbiQoXCIuc2VuZEFydGljbGVFbWFpbFwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gIGxldCBlbWFpbCA9ICQoXCIuc2VuZEFydGljbGVUb0VtYWlsICNFbWFpbFwiKS52YWwoKTtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICBzZW5kQXJ0aWNsZVRvRW1haWwoZW1haWwpO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICB2YXIgdGFibGUgPSAkKFwiI3VzZXJzXCIpLkRhdGFUYWJsZSh7XHJcbiAgICBsYW5ndWFnZToge1xyXG4gICAgICB1cmw6IFwiLy9jZG4uZGF0YXRhYmxlcy5uZXQvcGx1Zy1pbnMvMS4xMC4yMS9pMThuL0N6ZWNoLmpzb25cIixcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgJChcIiN1c2VycyB0Ym9keVwiKS5vbihcImNsaWNrXCIsIFwidHJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGRhdGEgPSB0YWJsZS5yb3codGhpcykuZGF0YSgpO1xyXG4gICAgJCgnLmVkaXRVc2VyRXZlbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoXCIuZWRpdFVzZXJcIikudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICQoXCIuZGVsZXRlVXNlclwiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgJChcIiN1cGRhdGVVc2VyXCIpLm1vZGFsKFwic2hvd1wiKTtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgICQoXCIuZWRpdCAjSm3DqW5vXCIpLnZhbChkYXRhWzFdKTtcclxuICAgICAgJChcIi5lZGl0ICNFbWFpbFwiKS52YWwoZGF0YVsyXSk7XHJcbiAgICAgICQoYC5lZGl0ICNyb2xlIG9wdGlvblt2YWx1ZT0ke2RhdGFbM119XWApLmF0dHIoXCJzZWxlY3RlZFwiLCBcInNlbGVjdGVkXCIpO1xyXG5cclxuICAgICAgJChcIi5lZGl0VXNlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHVzZXIgPSB7XHJcbiAgICAgICAgICBpZDogZGF0YVswXSxcclxuICAgICAgICAgIG5hbWU6ICQoXCIuZWRpdCAjSm3DqW5vXCIpLnZhbCgpLFxyXG4gICAgICAgICAgZW1haWw6ICQoXCIuZWRpdCAjRW1haWxcIikudmFsKCksXHJcbiAgICAgICAgICBwYXNzd29yZDogJChcIi5lZGl0ICNIZXNsb1wiKS52YWwoKSxcclxuICAgICAgICAgIHJvbGVfaWQ6ICQoXCIuZWRpdCAjcm9sZVwiKS52YWwoKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNhdmVVc2VyKHVzZXIpO1xyXG4gICAgICB9KTtcclxuICAgICAgJChcIi5kZWxldGVVc2VyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdXNlciA9IHtcclxuICAgICAgICAgIGlkOiBkYXRhWzBdLFxyXG4gICAgICAgICAgbmFtZTogJChcIi5lZGl0ICNKbcOpbm9cIikudmFsKCksXHJcbiAgICAgICAgICBlbWFpbDogJChcIi5lZGl0ICNFbWFpbFwiKS52YWwoKSxcclxuICAgICAgICAgIHBhc3N3b3JkOiAkKFwiLmVkaXQgI0hlc2xvXCIpLnZhbCgpLFxyXG4gICAgICAgICAgcm9sZV9pZDogJChcIi5lZGl0ICNyb2xlXCIpLnZhbCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGVsZXRlVXNlcih1c2VyKTtcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gIH0pO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICB2YXIgdGFibGUgPSAkKFwiI2FydGljbGVzXCIpLkRhdGFUYWJsZSh7XHJcbiAgICBsYW5ndWFnZToge1xyXG4gICAgICB1cmw6IFwiLy9jZG4uZGF0YXRhYmxlcy5uZXQvcGx1Zy1pbnMvMS4xMC4yMS9pMThuL0N6ZWNoLmpzb25cIixcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgJChcIiNhcnRpY2xlcyB0Ym9keVwiKS5vbihcImNsaWNrXCIsIFwidHJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGRhdGEgPSB0YWJsZS5yb3codGhpcykuZGF0YSgpO1xyXG4gICAgYWxsRmlsZXNFZGl0ID0gW107XHJcbiAgICAkKFwiLmVkaXRBcnRpY2xlRXZlbnRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoXCIudXBkYXRlQXJ0aWNsZVwiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgICAgICQoXCIjZWRpdEFydGljbGVcIikubW9kYWwoXCJzaG93XCIpO1xyXG4gICAgICAvLyAuZHJhZ2dhYmxlKHsgaGFuZGxlOiBcIi5tb2RhbC1oZWFkZXJcIiB9KTtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGxldCBpc0NoZWNrID0gZGF0YVs2XSAhPT0gXCJOZW7DrVwiO1xyXG4gICAgICAkKFwiLmVkaXRBcnRpY2xlICNOw6F6ZXZcIikudmFsKGRhdGFbMV0pO1xyXG4gICAgICAkKFwiLmVkaXRBcnRpY2xlICNQb3Bpc1wiKS52YWwoZGF0YVsyXSk7XHJcbiAgICAgICQoXCIuZWRpdEFydGljbGUgI0VtYWlsXCIpLnZhbChkYXRhWzVdKTtcclxuICAgICAgJChcIi5lZGl0QXJ0aWNsZSAjQ2VuYVwiKS52YWwoZGF0YVszXSk7XHJcbiAgICAgICQoXCIuZWRpdEFydGljbGUgI0xva2FsaXRhXCIpLnZhbChkYXRhWzRdKTtcclxuICAgICAgJChcIiNyZXplcnZhY2VcIikucHJvcChcImNoZWNrZWRcIiwgaXNDaGVjayk7XHJcblxyXG4gICAgICBnZXRBcnRpY2xlSW1hZ2VzKGRhdGFbXCIwXCJdKTtcclxuICAgICAgJChcIi51cGRhdGVBcnRpY2xlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICAgICAgICBsZXQgaXNDaGVjayA9ICQoXCIuZWRpdEFydGljbGUgI3JlemVydmFjZVwiKS5pcyhcIjpjaGVja2VkXCIpID8gXCIxXCIgOiBcIjBcIjtcclxuICAgICAgICBsZXQgYXJ0aWNsZSA9IHtcclxuICAgICAgICAgIGlkOiBkYXRhWzBdLFxyXG4gICAgICAgICAgTsOhemV2OiAkKFwiLmVkaXRBcnRpY2xlICNOw6F6ZXZcIikudmFsKCksXHJcbiAgICAgICAgICBQb3BpczogJChcIi5lZGl0QXJ0aWNsZSAjUG9waXNcIikudmFsKCksXHJcbiAgICAgICAgICBFbWFpbDogJChcIi5lZGl0QXJ0aWNsZSAjRW1haWxcIikudmFsKCksXHJcbiAgICAgICAgICBMb2thbGl0YTogJChcIi5lZGl0QXJ0aWNsZSAjTG9rYWxpdGFcIikudmFsKCksXHJcbiAgICAgICAgICBDZW5hOiAkKFwiLmVkaXRBcnRpY2xlICNDZW5hXCIpLnZhbCgpLFxyXG4gICAgICAgICAgcmV6ZXJ2YWNlOiBpc0NoZWNrLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYXJ0aWNsZS5maWxlcyA9IGFsbEZpbGVzRWRpdDtcclxuICAgICAgICBzYXZlQXJ0aWNsZShhcnRpY2xlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcblxyXG4kKFwiLmxvZ2luU3VibWl0XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICBsZXQgdXNlciA9IHtcclxuICAgIGVtYWlsOiAkKFwiLmxvZ2luVXNlciAjRW1haWxcIikudmFsKCksXHJcbiAgICBwYXNzd29yZDogJChcIi5sb2dpblVzZXIgI0hlc2xvXCIpLnZhbCgpLFxyXG4gICAgdG9rZW46ICQoXCIubG9naW5Vc2VyICN0b2tlblwiKS52YWwoKSxcclxuICB9O1xyXG4gIGhhbmRsZUxvZ2luKHVzZXIpO1xyXG59KTtcclxuXHJcbiQoXCIuZGVsZXRlQXJ0aWNsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgbGV0IHVzZXIgPSB7XHJcbiAgICBlbWFpbDogJChcIi5sb2dpblVzZXIgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgcGFzc3dvcmQ6ICQoXCIubG9naW5Vc2VyICNIZXNsb1wiKS52YWwoKSxcclxuICAgIHRva2VuOiAkKFwiLmxvZ2luVXNlciAjdG9rZW5cIikudmFsKCksXHJcbiAgfTtcclxuICBkZWxldGVBcnRpY2xlKHVzZXIpO1xyXG59KTtcclxuXHJcbiQoXCIudXBsb2FkQXJ0aWNsZUltYWdlc1wiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZVwiKS5jbGljaygpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZVwiKS5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZpbGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlXCIpLmZpbGVzO1xyXG4gICAgZmlsZXMgPSByZW5kZXJJbWFnZXMoZmlsZXMpO1xyXG4gICAgaGFuZGxlRmlsZXMoZmlsZXMpO1xyXG4gIH07XHJcbn0pO1xyXG5cclxuJChcIi51cGxvYWRBcnRpY2xlSW1hZ2VzRWRpdFwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZWVkaXRcIikuY2xpY2soKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVlZGl0XCIpLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVlZGl0XCIpLmZpbGVzO1xyXG4gICAgZmlsZXMgPSByZW5kZXJJbWFnZXNFZGl0KGZpbGVzKTtcclxuICAgIGhhbmRsZUZpbGVzRWRpdChmaWxlcyk7XHJcbiAgfTtcclxufSk7XHJcblxyXG4kKFwiLmRyb3BBcnRpY2xlSW1hZ2VzXCIpXHJcbiAgLmJpbmQoXCJkcmFnZW50ZXIgZHJhZ292ZXJcIiwgZmFsc2UpXHJcbiAgLmJpbmQoXCJkcm9wXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgbGV0IGR0ID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlcjtcclxuICAgIGxldCBmaWxlcyA9IGR0LmZpbGVzO1xyXG4gICAgZmlsZXMgPSByZW5kZXJJbWFnZXMoZmlsZXMpO1xyXG4gICAgaGFuZGxlRmlsZXMoZmlsZXMpO1xyXG4gIH0pO1xyXG5cclxuJChcIi5kcm9wQXJ0aWNsZUltYWdlc0VkaXRcIilcclxuICAuYmluZChcImRyYWdlbnRlciBkcmFnb3ZlclwiLCBmYWxzZSlcclxuICAuYmluZChcImRyb3BcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBsZXQgZHQgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyO1xyXG4gICAgbGV0IGZpbGVzID0gZHQuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlc0VkaXQoZmlsZXMpO1xyXG4gICAgaGFuZGxlRmlsZXNFZGl0KGZpbGVzKTtcclxuICB9KTtcclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUZpbGVzKGZpbGVzKSB7XHJcbiAgZm9yIChsZXQgW2luZGV4LCBmaWxlXSBvZiBPYmplY3QuZW50cmllcyhmaWxlcykpIHtcclxuICAgIGFsbEZpbGVzLnB1c2goZmlsZSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVGaWxlc0VkaXQoZmlsZXMpIHtcclxuICBmb3IgKGxldCBbaW5kZXgsIGZpbGVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbGVzKSkge1xyXG4gICAgYWxsRmlsZXNFZGl0LnB1c2goZmlsZSk7XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyhhbGxGaWxlc0VkaXQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJJbWFnZXMoZmlsZXMpIHtcclxuICBjb25zb2xlLmxvZyhmaWxlcyk7XHJcbiAgZm9yIChsZXQgW2luZGV4LCBmaWxlXSBvZiBPYmplY3QuZW50cmllcyhmaWxlcykpIHtcclxuICAgIHZhciB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLmNsYXNzTmFtZSA9IFwicHJldmlld0ltYWdlXCI7XHJcbiAgICBpbWcub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgYWxlcnQoXCJQcmF2ZMSbcG9kb2JuxJsgbmVwb2Rwb3JvdmFuw70gdHlwIG9icsOhemt1LlwiKTtcclxuICAgIH07XHJcbiAgICBpbWcuc3JjID0gdXJsO1xyXG5cclxuICAgIHZhciBudW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgbnVtYmVyLnRvU3RyaW5nKDM2KTtcclxuICAgIHZhciBpZCA9IG51bWJlci50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpO1xyXG4gICAgaW1nLmlkID0gaWQ7XHJcbiAgICBmaWxlLmlkID0gaWQ7XHJcbiAgICAkKFwiLmRyb3BBcnRpY2xlUHJldmlld1wiKS5hcHBlbmQoaW1nKTtcclxuICAgICQoXCIucHJldmlld0ltYWdlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgIGluZGV4ID0gYWxsRmlsZXMuZmluZEluZGV4KChmaWxlKSA9PiBmaWxlLmlkID09PSBpZCk7XHJcbiAgICAgIGFsbEZpbGVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICQoYCMke2lkfWApLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBmaWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVySW1hZ2VzRWRpdChmaWxlcykge1xyXG4gIGNvbnNvbGUubG9nKGZpbGVzKTtcclxuICBmb3IgKGxldCBbaW5kZXgsIGZpbGVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbGVzKSkge1xyXG4gICAgdmFyIHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XHJcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuY2xhc3NOYW1lID0gXCJwcmV2aWV3SW1hZ2VFZGl0XCI7XHJcbiAgICBpbWcub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgYWxlcnQoXCJQcmF2ZMSbcG9kb2JuxJsgbmVwb2Rwb3JvdmFuw70gdHlwIG9icsOhemt1LlwiKTtcclxuICAgIH07XHJcbiAgICBpbWcuc3JjID0gdXJsO1xyXG5cclxuICAgIHZhciBudW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgbnVtYmVyLnRvU3RyaW5nKDM2KTtcclxuICAgIHZhciBpZCA9IG51bWJlci50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpO1xyXG4gICAgaW1nLmlkID0gaWQ7XHJcbiAgICBmaWxlLmlkID0gaWQ7XHJcbiAgICAkKFwiLmRyb3BBcnRpY2xlUHJldmlld0ltYWdlc1wiKS5hcHBlbmQoaW1nKTtcclxuICAgICQoXCIucHJldmlld0ltYWdlRWRpdFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gICAgICBpbmRleCA9IGFsbEZpbGVzRWRpdC5maW5kSW5kZXgoKGZpbGUpID0+IGZpbGUuaWQgPT09IGlkKTtcclxuICAgICAgYWxsRmlsZXNFZGl0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICQoYCMke2lkfWApLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBmaWxlcztcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9