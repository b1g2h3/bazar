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
            (article.rezervace = "Není"),
            "<div style='cursor:pointer' class='editArticleEvent'>Upravit</div>",
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
        let rowId = $("#articles")
          .dataTable()
          .fnFindCellRowIndexes(article.id, 0);
        t.row(rowId)
          .data([
            article.id,
            article.Název,
            article.Popis,
            article.Cena,
            article.Lokalita,
            article.Email,
            article.rezervace == 0 ? "Není" : "Již rezervován",
            "<div style='cursor:pointer' class='editArticleEvent'>Upravit</div>",
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
      data: JSON.stringify(article),
    },
    success: function (res) {
      console.log(res);
      $(".error").hide();
      if (res["errors"]) {
        const errors = res["errors"];
        for (let [name, msg] of Object.entries(errors)) {
          $(".error").show();
          $(`#err${name}`).text(msg);
        }
      }
      if (res["success"]) {
        $("#editArticle").modal("hide");
        $(".alert-danger").show().text(res["success"]);
        var t = $("#articles").DataTable();
        t.rows(function (index, data) {
          return data[0] === article.id;
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

function getArticleImages(articleId) {
  $.ajax({
    type: "POST",
    url: "ajax.php",
    data: { id: articleId, method: "getArticleImages" },
    success: function (res) {
      res = JSON.parse(res);
      if (res["success"]) {
        $(".previewImageEdit").remove();
        var images = res.images;
        images.map((image) => {
          $(".dropArticlePreviewImages").prepend(
            `<img id="img${image.id}" class="previewImageEdit deleteImage" src="data:image/jpg;base64,${image.base64} " />`
          );
        });
        $(".deleteImage").click(function () {
          if (confirm("Chcete vážně odstranit obrázek z databáze?")) {
            let id = $(this).attr("id");
            deleteImage(id);
          }
        });
      }
    },
  });
}

function sendArticleToEmail(email) {
  let articleId = location.search.split("id=")[1];
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/ajax.php",
    data: {
      method: "sendArticleToEmail",
      data: JSON.stringify({
        email: email,
        id: articleId,
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
      if (res["success"]) {
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
  data.id = location.search.split("id=")[1];
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
      if (res["success"]) {
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
      if (res.success) {
        $(".editalert-danger").show().text(res.success);
        $(`#${id}`).remove();
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
  sendReservationToEmail,
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
            '<div style="cursor:pointer" class="editUserEvent">Upravit</div>',
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
  user.role_id = user.role_id == "Admin" ? 1 : 2;
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
            '<div style="cursor:pointer" class="editUserEvent">Upravit</div>',
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
    Jméno: name,
  };
  sendReservationToEmail(data);
});

$(document).ready(function () {
  $(".lightBox").on("click", function () {
    $(".backDrop").animate({ opacity: ".70" }, 500);
    $(".box").animate({ opacity: "1.0" }, 500);
    $(".backDrop, .box").css("display", "block");
  });

  $(".thumb").on("click", function () {
    var largeImage = $(this).attr("src");
    $(".largeImage").attr({ src: largeImage });
  });

  $(".close, .backDrop").on("click", function () {
    closeBox();
  });

  function closeBox() {
    $(".backDrop, .box").animate({ opacity: "0" }, 500, function () {
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
    $(".editUserEvent").on("click", function () {
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
      $(".deleteArticle").unbind("click");
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
      $(".deleteArticle").click(function () {
        $(".error").hide();
        $(".alert").hide();
        let article = {
          id: data[0],
        };
        deleteArticle(article);
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC9hcnRpY2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hamF4L2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC91c2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSxhQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsTUFBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0Q0FBNEM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUywyREFBMkQsU0FBUyxhQUFhO0FBQ3JIO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxNQUFNO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLEdBQUc7QUFDakI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEIsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCOzs7Ozs7Ozs7Ozs7QUN4Q2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQSxrQkFBa0I7Ozs7Ozs7Ozs7OztBQ2pJbEI7QUFDQTtBQUNBLE9BQU8scUNBQXFDLEdBQUcsbUJBQU8sQ0FBQyxpREFBYztBQUNyRSxPQUFPLGNBQWMsR0FBRyxtQkFBTyxDQUFDLCtDQUFhO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxHQUFHLG1CQUFPLENBQUMsdURBQWlCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0MsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0MsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGtDQUFrQyxlQUFlO0FBQ2pEO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUTs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQkFBMEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksR0FBRztBQUNmLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLEdBQUc7QUFDZixLQUFLO0FBQ0w7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5jbHVkZXMvanMvYXBwLmpzXCIpO1xuIiwiZnVuY3Rpb24gY3JlYXRlQXJ0aWNsZShhcnRpY2xlKSB7XHJcbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgZm9yIChpID0gMDsgaSA8IGFydGljbGUuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGZkLmFwcGVuZChcImZpbGVbXVwiLCBhcnRpY2xlLmZpbGVzW2ldKTtcclxuICB9XHJcbiAgZmQuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeShhcnRpY2xlKSk7XHJcbiAgZmQuYXBwZW5kKFwibWV0aG9kXCIsIFwiYWRkQXJ0aWNsZVwiKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICB1cmw6IFwiYWpheC5waHBcIixcclxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgIGRhdGE6IGZkLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke2lucHV0fWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2FkZEFydGljbGVcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjYXJ0aWNsZXNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgYXJ0aWNsZSA9IHJlcy5hcnRpY2xlO1xyXG4gICAgICAgIHQucm93XHJcbiAgICAgICAgICAuYWRkKFtcclxuICAgICAgICAgICAgYXJ0aWNsZS5pZCxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Ow6F6ZXYsXHJcbiAgICAgICAgICAgIGFydGljbGUuUG9waXMsXHJcbiAgICAgICAgICAgIGFydGljbGUuQ2VuYSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Mb2thbGl0YSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5FbWFpbCxcclxuICAgICAgICAgICAgKGFydGljbGUucmV6ZXJ2YWNlID0gXCJOZW7DrVwiKSxcclxuICAgICAgICAgICAgXCI8ZGl2IHN0eWxlPSdjdXJzb3I6cG9pbnRlcicgY2xhc3M9J2VkaXRBcnRpY2xlRXZlbnQnPlVwcmF2aXQ8L2Rpdj5cIixcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgICAuZHJhdyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUFydGljbGUoYXJ0aWNsZSkge1xyXG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIGZvciAoaSA9IDA7IGkgPCBhcnRpY2xlLmZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBmZC5hcHBlbmQoXCJmaWxlW11cIiwgYXJ0aWNsZS5maWxlc1tpXSk7XHJcbiAgfVxyXG4gIGZkLmFwcGVuZChcImRhdGFcIiwgSlNPTi5zdHJpbmdpZnkoYXJ0aWNsZSkpO1xyXG4gIGZkLmFwcGVuZChcIm1ldGhvZFwiLCBcInVwZGF0ZUFydGljbGVcIik7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgdXJsOiBcImFqYXgucGhwXCIsXHJcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICBkYXRhOiBmZCxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtpbnB1dH1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiNlZGl0QXJ0aWNsZVwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIHZhciB0ID0gJChcIiNhcnRpY2xlc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICBsZXQgcm93SWQgPSAkKFwiI2FydGljbGVzXCIpXHJcbiAgICAgICAgICAuZGF0YVRhYmxlKClcclxuICAgICAgICAgIC5mbkZpbmRDZWxsUm93SW5kZXhlcyhhcnRpY2xlLmlkLCAwKTtcclxuICAgICAgICB0LnJvdyhyb3dJZClcclxuICAgICAgICAgIC5kYXRhKFtcclxuICAgICAgICAgICAgYXJ0aWNsZS5pZCxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Ow6F6ZXYsXHJcbiAgICAgICAgICAgIGFydGljbGUuUG9waXMsXHJcbiAgICAgICAgICAgIGFydGljbGUuQ2VuYSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Mb2thbGl0YSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5FbWFpbCxcclxuICAgICAgICAgICAgYXJ0aWNsZS5yZXplcnZhY2UgPT0gMCA/IFwiTmVuw61cIiA6IFwiSmnFviByZXplcnZvdsOhblwiLFxyXG4gICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2N1cnNvcjpwb2ludGVyJyBjbGFzcz0nZWRpdEFydGljbGVFdmVudCc+VXByYXZpdDwvZGl2PlwiLFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICAgIC5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgYXJ0aWNsZSA9IHJlcy5hcnRpY2xlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFydGljbGUpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVBcnRpY2xlKGFydGljbGUpIHtcclxuICBjb25zb2xlLmxvZyhhcnRpY2xlKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJkZWxldGVBcnRpY2xlXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGFydGljbGUpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW25hbWUsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2VkaXRBcnRpY2xlXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LWRhbmdlclwiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjYXJ0aWNsZXNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgdC5yb3dzKGZ1bmN0aW9uIChpbmRleCwgZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGFbMF0gPT09IGFydGljbGUuaWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgIC5yZW1vdmUoKVxyXG4gICAgICAgICAgLmRyYXcoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBcnRpY2xlSW1hZ2VzKGFydGljbGVJZCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIHVybDogXCJhamF4LnBocFwiLFxyXG4gICAgZGF0YTogeyBpZDogYXJ0aWNsZUlkLCBtZXRob2Q6IFwiZ2V0QXJ0aWNsZUltYWdlc1wiIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiLnByZXZpZXdJbWFnZUVkaXRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgdmFyIGltYWdlcyA9IHJlcy5pbWFnZXM7XHJcbiAgICAgICAgaW1hZ2VzLm1hcCgoaW1hZ2UpID0+IHtcclxuICAgICAgICAgICQoXCIuZHJvcEFydGljbGVQcmV2aWV3SW1hZ2VzXCIpLnByZXBlbmQoXHJcbiAgICAgICAgICAgIGA8aW1nIGlkPVwiaW1nJHtpbWFnZS5pZH1cIiBjbGFzcz1cInByZXZpZXdJbWFnZUVkaXQgZGVsZXRlSW1hZ2VcIiBzcmM9XCJkYXRhOmltYWdlL2pwZztiYXNlNjQsJHtpbWFnZS5iYXNlNjR9IFwiIC8+YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmRlbGV0ZUltYWdlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGlmIChjb25maXJtKFwiQ2hjZXRlIHbDocW+bsSbIG9kc3RyYW5pdCBvYnLDoXplayB6IGRhdGFiw6F6ZT9cIikpIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGRlbGV0ZUltYWdlKGlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZEFydGljbGVUb0VtYWlsKGVtYWlsKSB7XHJcbiAgbGV0IGFydGljbGVJZCA9IGxvY2F0aW9uLnNlYXJjaC5zcGxpdChcImlkPVwiKVsxXTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJzZW5kQXJ0aWNsZVRvRW1haWxcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICBpZDogYXJ0aWNsZUlkLFxyXG4gICAgICB9KSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYC5zZW5kQXJ0aWNsZVRvRW1haWwgI2VyciR7aW5wdXR9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjc2VuZEFydGljbGVPbkVtYWlsXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LXN1Y2Nlc3NcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZFJlc2VydmF0aW9uVG9FbWFpbChkYXRhKSB7XHJcbiAgZGF0YS5pZCA9IGxvY2F0aW9uLnNlYXJjaC5zcGxpdChcImlkPVwiKVsxXTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJzZW5kUmVzZXJ2YXRpb25Ub093bmVyXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7aW5wdXR9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjYWRkUmVzZXJ2YXRpb25cIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVJbWFnZShpZCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImRlbGV0ZUltYWdlXCIsXHJcbiAgICAgIGltYWdlSWQ6IGlkLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXMuZXJyb3JzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmVycm9ycyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgJChcIi5lZGl0YWxlcnQtZGFuZ2VyXCIpLnNob3coKS50ZXh0KHJlcy5zdWNjZXNzKTtcclxuICAgICAgICAkKGAjJHtpZH1gKS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGNyZWF0ZUFydGljbGUsXHJcbiAgdXBkYXRlQXJ0aWNsZSxcclxuICBkZWxldGVBcnRpY2xlLFxyXG4gIGdldEFydGljbGVJbWFnZXMsXHJcbiAgc2VuZEFydGljbGVUb0VtYWlsLFxyXG4gIHNlbmRSZXNlcnZhdGlvblRvRW1haWwsXHJcbn07XHJcbiIsImNvbnN0IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlID0ge1xyXG4gIG5hbWU6IFwiSm3DqW5vXCIsXHJcbiAgZW1haWw6IFwiRW1haWxcIixcclxuICByb2xlX2lkOiBcIlJvbGlcIixcclxuICBwYXNzd29yZDogXCJIZXNsb1wiLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlTG9naW4odXNlcikge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImhhbmRsZUxvZ2luXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChgI2VyciR7bmFtZX1gKS5zaG93KG1zZyk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICBpZihyZXMudXNlci5yb2xlX2lkID09PSBcIjFcIikge1xyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi8/cGFnZT11c2Vyc1wiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLz9wYWdlPWVkaXRBcnRpY2xlc1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgaGFuZGxlTG9naW4gfTtcclxuIiwiY29uc3QgY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2UgPSB7XHJcbiAgbmFtZTogXCJKbcOpbm9cIixcclxuICBlbWFpbDogXCJFbWFpbFwiLFxyXG4gIHJvbGVfaWQ6IFwiUm9saVwiLFxyXG4gIHBhc3N3b3JkOiBcIkhlc2xvXCIsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVVc2VyKHVzZXIpIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJhZGRVc2VyXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2FkZFVzZXJcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAxO1xyXG4gICAgICAgIHVzZXIgPSByZXMudXNlcjtcclxuICAgICAgICB0LnJvd1xyXG4gICAgICAgICAgLmFkZChbXHJcbiAgICAgICAgICAgIHVzZXIuaWQsXHJcbiAgICAgICAgICAgIHVzZXIubmFtZSxcclxuICAgICAgICAgICAgdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgdXNlci5yb2xlc19pZCA9PSAxID8gXCJBZG1pblwiIDogXCJFZGl0b3JcIixcclxuICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiIGNsYXNzPVwiZWRpdFVzZXJFdmVudFwiPlVwcmF2aXQ8L2Rpdj4nLFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICAgIC5kcmF3KGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVVc2VyKHVzZXIpIHtcclxuICB1c2VyLnJvbGVfaWQgPSB1c2VyLnJvbGVfaWQgPT0gXCJBZG1pblwiID8gMSA6IDI7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwidXBkYXRlVXNlclwiLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICBsZXQgbmFtZSA9IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlW2lucHV0XTtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7bmFtZX1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgcmVzLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICQoXCIjdXBkYXRlVXNlclwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIGxldCB0ID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICBsZXQgcm93SWQgPSAkKFwiI3VzZXJzXCIpLmRhdGFUYWJsZSgpLmZuRmluZENlbGxSb3dJbmRleGVzKHVzZXIuaWQsIDApO1xyXG4gICAgICAgIHQucm93KHJvd0lkKVxyXG4gICAgICAgICAgLmRhdGEoW1xyXG4gICAgICAgICAgICB1c2VyLmlkLFxyXG4gICAgICAgICAgICB1c2VyLm5hbWUsXHJcbiAgICAgICAgICAgIHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIHVzZXIucm9sZV9pZCA9PSAxID8gXCJBZG1pblwiIDogXCJFZGl0b3JcIixcclxuICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiIGNsYXNzPVwiZWRpdFVzZXJFdmVudFwiPlVwcmF2aXQ8L2Rpdj4nLFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICAgIC5pbnZhbGlkYXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlVXNlcih1c2VyKSB7XHJcbiAgY29uc29sZS5sb2codXNlcik7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwiZGVsZXRlVXNlclwiLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICBsZXQgbmFtZSA9IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlW2lucHV0XTtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7bmFtZX1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiN1cGRhdGVVc2VyXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LWRhbmdlclwiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgdC5yb3dzKGZ1bmN0aW9uIChpbmRleCwgZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGFbMF0gPT09IHVzZXIuaWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgIC5yZW1vdmUoKVxyXG4gICAgICAgICAgLmRyYXcoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgY3JlYXRlVXNlciwgdXBkYXRlVXNlciwgZGVsZXRlVXNlciB9O1xyXG4iLCIvLyByZXF1aXJlKFwiYm9vdHN0cmFwL2Rpc3QvanMvYm9vdHN0cmFwXCIpO1xyXG4vLyByZXF1aXJlKFwicG9wcGVyLmpzXCIpO1xyXG5jb25zdCB7IGNyZWF0ZVVzZXIsIHVwZGF0ZVVzZXIsIGRlbGV0ZVVzZXIgfSA9IHJlcXVpcmUoXCIuL2FqYXgvdXNlcnNcIik7XHJcbmNvbnN0IHsgaGFuZGxlTG9naW4gfSA9IHJlcXVpcmUoXCIuL2FqYXgvYXV0aFwiKTtcclxuY29uc3Qge1xyXG4gIGNyZWF0ZUFydGljbGUsXHJcbiAgdXBkYXRlQXJ0aWNsZSxcclxuICBkZWxldGVBcnRpY2xlLFxyXG4gIGdldEFydGljbGVJbWFnZXMsXHJcbiAgc2VuZEFydGljbGVUb0VtYWlsLFxyXG4gIHNlbmRSZXNlcnZhdGlvblRvRW1haWwsXHJcbn0gPSByZXF1aXJlKFwiLi9hamF4L2FydGljbGVzXCIpO1xyXG52YXIgYWxsRmlsZXMgPSBbXTtcclxudmFyIGFsbEZpbGVzRWRpdCA9IFtdO1xyXG5cclxuZnVuY3Rpb24gc2F2ZVVzZXIodXNlcikge1xyXG4gIGlmICh1c2VyLmlkID09IG51bGwpIHtcclxuICAgIGNyZWF0ZVVzZXIodXNlcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHVwZGF0ZVVzZXIodXNlcik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQXJ0aWNsZShhcnRpY2xlKSB7XHJcbiAgaWYgKGFydGljbGUuaWQgPT0gbnVsbCkge1xyXG4gICAgY3JlYXRlQXJ0aWNsZShhcnRpY2xlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdXBkYXRlQXJ0aWNsZShhcnRpY2xlKTtcclxuICB9XHJcbn1cclxuXHJcbiQoXCIuc2VuZEFydGljbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gIGxldCBhcnRpY2xlID0ge1xyXG4gICAgTsOhemV2OiAkKFwiI07DoXpldlwiKS52YWwoKSxcclxuICAgIFBvcGlzOiAkKFwiI1BvcGlzXCIpLnZhbCgpLFxyXG4gICAgRW1haWw6ICQoXCIjRW1haWxcIikudmFsKCksXHJcbiAgICBMb2thbGl0YTogJChcIiNMb2thbGl0YVwiKS52YWwoKSxcclxuICAgIENlbmE6ICQoXCIjQ2VuYVwiKS52YWwoKSxcclxuICB9O1xyXG4gIGFydGljbGUuZmlsZXMgPSBhbGxGaWxlcztcclxuICBzYXZlQXJ0aWNsZShhcnRpY2xlKTtcclxufSk7XHJcblxyXG4kKFwiLmNyZWF0ZVVzZXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gIGxldCB1c2VyID0ge1xyXG4gICAgbmFtZTogJChcIi5jcmVhdGUgI0ptw6lub1wiKS52YWwoKSxcclxuICAgIGVtYWlsOiAkKFwiLmNyZWF0ZSAjRW1haWxcIikudmFsKCksXHJcbiAgICByb2xlX2lkOiAkKFwiLmNyZWF0ZSAjcm9sZVwiKS52YWwoKSxcclxuICAgIHBhc3N3b3JkOiAkKFwiLmNyZWF0ZSAjSGVzbG9cIikudmFsKCksXHJcbiAgfTtcclxuICBzYXZlVXNlcih1c2VyKTtcclxufSk7XHJcblxyXG4kKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuXHJcbiQoXCIuc2VuZFJlc2VydmF0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgbGV0IGVtYWlsID0gJChcIi5zZW5kUmVzZXJ2YXRpb25Ub0VtYWlsICNFbWFpbFwiKS52YWwoKTtcclxuICBsZXQgbXNnID0gJChcIi5zZW5kUmVzZXJ2YXRpb25Ub0VtYWlsICNacHLDoXZhXCIpLnZhbCgpO1xyXG4gIGxldCBuYW1lID0gJChcIi5zZW5kUmVzZXJ2YXRpb25Ub0VtYWlsICNKbcOpbm9cIikudmFsKCk7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgZGF0YSA9IHtcclxuICAgIEVtYWlsOiBlbWFpbCxcclxuICAgIFpwcsOhdmE6IG1zZyxcclxuICAgIEptw6lubzogbmFtZSxcclxuICB9O1xyXG4gIHNlbmRSZXNlcnZhdGlvblRvRW1haWwoZGF0YSk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICQoXCIubGlnaHRCb3hcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiLmJhY2tEcm9wXCIpLmFuaW1hdGUoeyBvcGFjaXR5OiBcIi43MFwiIH0sIDUwMCk7XHJcbiAgICAkKFwiLmJveFwiKS5hbmltYXRlKHsgb3BhY2l0eTogXCIxLjBcIiB9LCA1MDApO1xyXG4gICAgJChcIi5iYWNrRHJvcCwgLmJveFwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgfSk7XHJcblxyXG4gICQoXCIudGh1bWJcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbGFyZ2VJbWFnZSA9ICQodGhpcykuYXR0cihcInNyY1wiKTtcclxuICAgICQoXCIubGFyZ2VJbWFnZVwiKS5hdHRyKHsgc3JjOiBsYXJnZUltYWdlIH0pO1xyXG4gIH0pO1xyXG5cclxuICAkKFwiLmNsb3NlLCAuYmFja0Ryb3BcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjbG9zZUJveCgpO1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBjbG9zZUJveCgpIHtcclxuICAgICQoXCIuYmFja0Ryb3AsIC5ib3hcIikuYW5pbWF0ZSh7IG9wYWNpdHk6IFwiMFwiIH0sIDUwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKFwiLmJhY2tEcm9wLCAuYm94XCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbiQoXCIuc2VuZEFydGljbGVFbWFpbFwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gIGxldCBlbWFpbCA9ICQoXCIuc2VuZEFydGljbGVUb0VtYWlsICNFbWFpbFwiKS52YWwoKTtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICBzZW5kQXJ0aWNsZVRvRW1haWwoZW1haWwpO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICB2YXIgdGFibGUgPSAkKFwiI3VzZXJzXCIpLkRhdGFUYWJsZSh7XHJcbiAgICBsYW5ndWFnZToge1xyXG4gICAgICB1cmw6IFwiLy9jZG4uZGF0YXRhYmxlcy5uZXQvcGx1Zy1pbnMvMS4xMC4yMS9pMThuL0N6ZWNoLmpzb25cIixcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgJChcIiN1c2VycyB0Ym9keVwiKS5vbihcImNsaWNrXCIsIFwidHJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGRhdGEgPSB0YWJsZS5yb3codGhpcykuZGF0YSgpO1xyXG4gICAgJChcIi5lZGl0VXNlckV2ZW50XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKFwiLmVkaXRVc2VyXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAkKFwiLmRlbGV0ZVVzZXJcIikudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICQoXCIjdXBkYXRlVXNlclwiKS5tb2RhbChcInNob3dcIik7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICAkKFwiLmVkaXQgI0ptw6lub1wiKS52YWwoZGF0YVsxXSk7XHJcbiAgICAgICQoXCIuZWRpdCAjRW1haWxcIikudmFsKGRhdGFbMl0pO1xyXG4gICAgICAkKGAuZWRpdCAjcm9sZSBvcHRpb25bdmFsdWU9JHtkYXRhWzNdfV1gKS5hdHRyKFwic2VsZWN0ZWRcIiwgXCJzZWxlY3RlZFwiKTtcclxuXHJcbiAgICAgICQoXCIuZWRpdFVzZXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCB1c2VyID0ge1xyXG4gICAgICAgICAgaWQ6IGRhdGFbMF0sXHJcbiAgICAgICAgICBuYW1lOiAkKFwiLmVkaXQgI0ptw6lub1wiKS52YWwoKSxcclxuICAgICAgICAgIGVtYWlsOiAkKFwiLmVkaXQgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6ICQoXCIuZWRpdCAjSGVzbG9cIikudmFsKCksXHJcbiAgICAgICAgICByb2xlX2lkOiAkKFwiLmVkaXQgI3JvbGVcIikudmFsKCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzYXZlVXNlcih1c2VyKTtcclxuICAgICAgfSk7XHJcbiAgICAgICQoXCIuZGVsZXRlVXNlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHVzZXIgPSB7XHJcbiAgICAgICAgICBpZDogZGF0YVswXSxcclxuICAgICAgICAgIG5hbWU6ICQoXCIuZWRpdCAjSm3DqW5vXCIpLnZhbCgpLFxyXG4gICAgICAgICAgZW1haWw6ICQoXCIuZWRpdCAjRW1haWxcIikudmFsKCksXHJcbiAgICAgICAgICBwYXNzd29yZDogJChcIi5lZGl0ICNIZXNsb1wiKS52YWwoKSxcclxuICAgICAgICAgIHJvbGVfaWQ6ICQoXCIuZWRpdCAjcm9sZVwiKS52YWwoKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRlbGV0ZVVzZXIodXNlcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gIHZhciB0YWJsZSA9ICQoXCIjYXJ0aWNsZXNcIikuRGF0YVRhYmxlKHtcclxuICAgIGxhbmd1YWdlOiB7XHJcbiAgICAgIHVybDogXCIvL2Nkbi5kYXRhdGFibGVzLm5ldC9wbHVnLWlucy8xLjEwLjIxL2kxOG4vQ3plY2guanNvblwiLFxyXG4gICAgfSxcclxuICB9KTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICAkKFwiI2FydGljbGVzIHRib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCJ0clwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZGF0YSA9IHRhYmxlLnJvdyh0aGlzKS5kYXRhKCk7XHJcbiAgICBhbGxGaWxlc0VkaXQgPSBbXTtcclxuICAgICQoXCIuZWRpdEFydGljbGVFdmVudFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChcIi51cGRhdGVBcnRpY2xlXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAkKFwiLmRlbGV0ZUFydGljbGVcIikudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gICAgICAkKFwiI2VkaXRBcnRpY2xlXCIpLm1vZGFsKFwic2hvd1wiKTtcclxuICAgICAgLy8gLmRyYWdnYWJsZSh7IGhhbmRsZTogXCIubW9kYWwtaGVhZGVyXCIgfSk7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBsZXQgaXNDaGVjayA9IGRhdGFbNl0gIT09IFwiTmVuw61cIjtcclxuICAgICAgJChcIi5lZGl0QXJ0aWNsZSAjTsOhemV2XCIpLnZhbChkYXRhWzFdKTtcclxuICAgICAgJChcIi5lZGl0QXJ0aWNsZSAjUG9waXNcIikudmFsKGRhdGFbMl0pO1xyXG4gICAgICAkKFwiLmVkaXRBcnRpY2xlICNFbWFpbFwiKS52YWwoZGF0YVs1XSk7XHJcbiAgICAgICQoXCIuZWRpdEFydGljbGUgI0NlbmFcIikudmFsKGRhdGFbM10pO1xyXG4gICAgICAkKFwiLmVkaXRBcnRpY2xlICNMb2thbGl0YVwiKS52YWwoZGF0YVs0XSk7XHJcbiAgICAgICQoXCIjcmV6ZXJ2YWNlXCIpLnByb3AoXCJjaGVja2VkXCIsIGlzQ2hlY2spO1xyXG5cclxuICAgICAgZ2V0QXJ0aWNsZUltYWdlcyhkYXRhW1wiMFwiXSk7XHJcbiAgICAgICQoXCIuZGVsZXRlQXJ0aWNsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgICAgICAgbGV0IGFydGljbGUgPSB7XHJcbiAgICAgICAgICBpZDogZGF0YVswXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRlbGV0ZUFydGljbGUoYXJ0aWNsZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICAkKFwiLnVwZGF0ZUFydGljbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gICAgICAgIGxldCBpc0NoZWNrID0gJChcIi5lZGl0QXJ0aWNsZSAjcmV6ZXJ2YWNlXCIpLmlzKFwiOmNoZWNrZWRcIikgPyBcIjFcIiA6IFwiMFwiO1xyXG4gICAgICAgIGxldCBhcnRpY2xlID0ge1xyXG4gICAgICAgICAgaWQ6IGRhdGFbMF0sXHJcbiAgICAgICAgICBOw6F6ZXY6ICQoXCIuZWRpdEFydGljbGUgI07DoXpldlwiKS52YWwoKSxcclxuICAgICAgICAgIFBvcGlzOiAkKFwiLmVkaXRBcnRpY2xlICNQb3Bpc1wiKS52YWwoKSxcclxuICAgICAgICAgIEVtYWlsOiAkKFwiLmVkaXRBcnRpY2xlICNFbWFpbFwiKS52YWwoKSxcclxuICAgICAgICAgIExva2FsaXRhOiAkKFwiLmVkaXRBcnRpY2xlICNMb2thbGl0YVwiKS52YWwoKSxcclxuICAgICAgICAgIENlbmE6ICQoXCIuZWRpdEFydGljbGUgI0NlbmFcIikudmFsKCksXHJcbiAgICAgICAgICByZXplcnZhY2U6IGlzQ2hlY2ssXHJcbiAgICAgICAgfTtcclxuICAgICAgICBhcnRpY2xlLmZpbGVzID0gYWxsRmlsZXNFZGl0O1xyXG4gICAgICAgIHNhdmVBcnRpY2xlKGFydGljbGUpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbiQoXCIubG9naW5TdWJtaXRcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gIGxldCB1c2VyID0ge1xyXG4gICAgZW1haWw6ICQoXCIubG9naW5Vc2VyICNFbWFpbFwiKS52YWwoKSxcclxuICAgIHBhc3N3b3JkOiAkKFwiLmxvZ2luVXNlciAjSGVzbG9cIikudmFsKCksXHJcbiAgICB0b2tlbjogJChcIi5sb2dpblVzZXIgI3Rva2VuXCIpLnZhbCgpLFxyXG4gIH07XHJcbiAgaGFuZGxlTG9naW4odXNlcik7XHJcbn0pO1xyXG5cclxuJChcIi5kZWxldGVBcnRpY2xlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICBsZXQgdXNlciA9IHtcclxuICAgIGVtYWlsOiAkKFwiLmxvZ2luVXNlciAjRW1haWxcIikudmFsKCksXHJcbiAgICBwYXNzd29yZDogJChcIi5sb2dpblVzZXIgI0hlc2xvXCIpLnZhbCgpLFxyXG4gICAgdG9rZW46ICQoXCIubG9naW5Vc2VyICN0b2tlblwiKS52YWwoKSxcclxuICB9O1xyXG4gIGRlbGV0ZUFydGljbGUodXNlcik7XHJcbn0pO1xyXG5cclxuJChcIi51cGxvYWRBcnRpY2xlSW1hZ2VzXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlXCIpLmNsaWNrKCk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlXCIpLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVcIikuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlcyhmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlcyhmaWxlcyk7XHJcbiAgfTtcclxufSk7XHJcblxyXG4kKFwiLnVwbG9hZEFydGljbGVJbWFnZXNFZGl0XCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlZWRpdFwiKS5jbGljaygpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZWVkaXRcIikub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmaWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZWVkaXRcIikuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlc0VkaXQoZmlsZXMpO1xyXG4gICAgaGFuZGxlRmlsZXNFZGl0KGZpbGVzKTtcclxuICB9O1xyXG59KTtcclxuXHJcbiQoXCIuZHJvcEFydGljbGVJbWFnZXNcIilcclxuICAuYmluZChcImRyYWdlbnRlciBkcmFnb3ZlclwiLCBmYWxzZSlcclxuICAuYmluZChcImRyb3BcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBsZXQgZHQgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyO1xyXG4gICAgbGV0IGZpbGVzID0gZHQuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlcyhmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlcyhmaWxlcyk7XHJcbiAgfSk7XHJcblxyXG4kKFwiLmRyb3BBcnRpY2xlSW1hZ2VzRWRpdFwiKVxyXG4gIC5iaW5kKFwiZHJhZ2VudGVyIGRyYWdvdmVyXCIsIGZhbHNlKVxyXG4gIC5iaW5kKFwiZHJvcFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGxldCBkdCA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7XHJcbiAgICBsZXQgZmlsZXMgPSBkdC5maWxlcztcclxuICAgIGZpbGVzID0gcmVuZGVySW1hZ2VzRWRpdChmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlc0VkaXQoZmlsZXMpO1xyXG4gIH0pO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlRmlsZXMoZmlsZXMpIHtcclxuICBmb3IgKGxldCBbaW5kZXgsIGZpbGVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbGVzKSkge1xyXG4gICAgYWxsRmlsZXMucHVzaChmaWxlKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUZpbGVzRWRpdChmaWxlcykge1xyXG4gIGZvciAobGV0IFtpbmRleCwgZmlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsZXMpKSB7XHJcbiAgICBhbGxGaWxlc0VkaXQucHVzaChmaWxlKTtcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKGFsbEZpbGVzRWRpdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckltYWdlcyhmaWxlcykge1xyXG4gIGNvbnNvbGUubG9nKGZpbGVzKTtcclxuICBmb3IgKGxldCBbaW5kZXgsIGZpbGVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbGVzKSkge1xyXG4gICAgdmFyIHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XHJcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuY2xhc3NOYW1lID0gXCJwcmV2aWV3SW1hZ2VcIjtcclxuICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBhbGVydChcIlByYXZkxJtwb2RvYm7EmyBuZXBvZHBvcm92YW7DvSB0eXAgb2Jyw6F6a3UuXCIpO1xyXG4gICAgfTtcclxuICAgIGltZy5zcmMgPSB1cmw7XHJcblxyXG4gICAgdmFyIG51bWJlciA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICBudW1iZXIudG9TdHJpbmcoMzYpO1xyXG4gICAgdmFyIGlkID0gbnVtYmVyLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XHJcbiAgICBpbWcuaWQgPSBpZDtcclxuICAgIGZpbGUuaWQgPSBpZDtcclxuICAgICQoXCIuZHJvcEFydGljbGVQcmV2aWV3XCIpLmFwcGVuZChpbWcpO1xyXG4gICAgJChcIi5wcmV2aWV3SW1hZ2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgaW5kZXggPSBhbGxGaWxlcy5maW5kSW5kZXgoKGZpbGUpID0+IGZpbGUuaWQgPT09IGlkKTtcclxuICAgICAgYWxsRmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgJChgIyR7aWR9YCkucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIGZpbGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJJbWFnZXNFZGl0KGZpbGVzKSB7XHJcbiAgY29uc29sZS5sb2coZmlsZXMpO1xyXG4gIGZvciAobGV0IFtpbmRleCwgZmlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsZXMpKSB7XHJcbiAgICB2YXIgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcclxuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5jbGFzc05hbWUgPSBcInByZXZpZXdJbWFnZUVkaXRcIjtcclxuICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBhbGVydChcIlByYXZkxJtwb2RvYm7EmyBuZXBvZHBvcm92YW7DvSB0eXAgb2Jyw6F6a3UuXCIpO1xyXG4gICAgfTtcclxuICAgIGltZy5zcmMgPSB1cmw7XHJcblxyXG4gICAgdmFyIG51bWJlciA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICBudW1iZXIudG9TdHJpbmcoMzYpO1xyXG4gICAgdmFyIGlkID0gbnVtYmVyLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XHJcbiAgICBpbWcuaWQgPSBpZDtcclxuICAgIGZpbGUuaWQgPSBpZDtcclxuICAgICQoXCIuZHJvcEFydGljbGVQcmV2aWV3SW1hZ2VzXCIpLmFwcGVuZChpbWcpO1xyXG4gICAgJChcIi5wcmV2aWV3SW1hZ2VFZGl0XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgIGluZGV4ID0gYWxsRmlsZXNFZGl0LmZpbmRJbmRleCgoZmlsZSkgPT4gZmlsZS5pZCA9PT0gaWQpO1xyXG4gICAgICBhbGxGaWxlc0VkaXQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgJChgIyR7aWR9YCkucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIGZpbGVzO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=