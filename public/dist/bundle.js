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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC9hcnRpY2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hamF4L2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC91c2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSxhQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxhQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixLQUFLO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0Q0FBNEM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLFNBQVMsMkRBQTJELFNBQVMsYUFBYTtBQUMxSixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxNQUFNO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsR0FBRztBQUNqQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4QixtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQSxrQkFBa0I7Ozs7Ozs7Ozs7OztBQ3hDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCOzs7Ozs7Ozs7Ozs7QUMvSGxCO0FBQ0E7QUFDQSxPQUFPLHFDQUFxQyxHQUFHLG1CQUFPLENBQUMsaURBQWM7QUFDckUsT0FBTyxjQUFjLEdBQUcsbUJBQU8sQ0FBQywrQ0FBYTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsR0FBRyxtQkFBTyxDQUFDLHVEQUFpQjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxRQUFROztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQkFBMEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksR0FBRztBQUNmLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLEdBQUc7QUFDZixLQUFLO0FBQ0w7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5jbHVkZXMvanMvYXBwLmpzXCIpO1xuIiwiZnVuY3Rpb24gY3JlYXRlQXJ0aWNsZShhcnRpY2xlKSB7XHJcbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgZm9yIChpID0gMDsgaSA8IGFydGljbGUuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGZkLmFwcGVuZChcImZpbGVbXVwiLCBhcnRpY2xlLmZpbGVzW2ldKTtcclxuICB9XHJcbiAgZmQuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeShhcnRpY2xlKSk7XHJcbiAgZmQuYXBwZW5kKFwibWV0aG9kXCIsIFwiYWRkQXJ0aWNsZVwiKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICB1cmw6IFwiYWpheC5waHBcIixcclxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgIGRhdGE6IGZkLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke2lucHV0fWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2FkZEFydGljbGVcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjYXJ0aWNsZXNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgYXJ0aWNsZSA9IHJlcy5hcnRpY2xlO1xyXG4gICAgICAgIHQucm93XHJcbiAgICAgICAgICAuYWRkKFtcclxuICAgICAgICAgICAgYXJ0aWNsZS5pZCxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Ow6F6ZXYsXHJcbiAgICAgICAgICAgIGFydGljbGUuUG9waXMsXHJcbiAgICAgICAgICAgIGFydGljbGUuQ2VuYSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Mb2thbGl0YSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5FbWFpbCxcclxuICAgICAgICAgICAgYXJ0aWNsZS5yZXplcnZhY2UgPSAnTmVuw60nLFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICAgIC5kcmF3KGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQXJ0aWNsZShhcnRpY2xlKSB7XHJcbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgZm9yIChpID0gMDsgaSA8IGFydGljbGUuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGZkLmFwcGVuZChcImZpbGVbXVwiLCBhcnRpY2xlLmZpbGVzW2ldKTtcclxuICB9XHJcbiAgZmQuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeShhcnRpY2xlKSk7XHJcbiAgZmQuYXBwZW5kKFwibWV0aG9kXCIsIFwidXBkYXRlQXJ0aWNsZVwiKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICB1cmw6IFwiYWpheC5waHBcIixcclxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgIGRhdGE6IGZkLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke2lucHV0fWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2VkaXRBcnRpY2xlXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LXN1Y2Nlc3NcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgICAgdmFyIHQgPSAkKFwiI2FydGljbGVzXCIpLkRhdGFUYWJsZSgpO1xyXG4gICAgICAgIGxldCByb3dJZCA9ICQoXCIjYXJ0aWNsZXNcIikuZGF0YVRhYmxlKCkuZm5GaW5kQ2VsbFJvd0luZGV4ZXMoYXJ0aWNsZS5pZCwgMCk7XHJcbiAgICAgICAgdC5yb3cocm93SWQpXHJcbiAgICAgICAgICAgIC5kYXRhKFtcclxuICAgICAgICAgICAgICBhcnRpY2xlLmlkLFxyXG4gICAgICAgICAgICAgIGFydGljbGUuTsOhemV2LFxyXG4gICAgICAgICAgICAgIGFydGljbGUuUG9waXMsXHJcbiAgICAgICAgICAgICAgYXJ0aWNsZS5DZW5hLFxyXG4gICAgICAgICAgICAgIGFydGljbGUuTG9rYWxpdGEsXHJcbiAgICAgICAgICAgICAgYXJ0aWNsZS5FbWFpbCxcclxuICAgICAgICAgICAgICBhcnRpY2xlLnJlemVydmFjZSA9PSAwID8gJ05lbsOtJyA6ICdKacW+IHJlemVydm92w6FuJyxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgLmludmFsaWRhdGUoKTtcclxuICAgICAgICBhcnRpY2xlID0gcmVzLmFydGljbGU7XHJcbiAgICAgICBjb25zb2xlLmxvZyhhcnRpY2xlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlQXJ0aWNsZShhcnRpY2xlKSB7XHJcbiAgY29uc29sZS5sb2coYXJ0aWNsZSk7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwiZGVsZXRlQXJ0aWNsZVwiLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgIC8vICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIC8vICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAvLyAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAvLyAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgLy8gICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgIC8vICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAvLyAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgLy8gICAgIH1cclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgLy8gICAgICQoXCIjdXBkYXRlVXNlclwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgIC8vICAgICAkKFwiLmFsZXJ0LWRhbmdlclwiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgLy8gICAgIHZhciB0ID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgLy8gICAgIHQucm93cyhmdW5jdGlvbiAoaW5kZXgsIGRhdGEpIHtcclxuICAgICAgLy8gICAgICAgcmV0dXJuIGRhdGFbMF0gPT09IHVzZXIuaWQ7XHJcbiAgICAgIC8vICAgICB9KVxyXG4gICAgICAvLyAgICAgICAucmVtb3ZlKClcclxuICAgICAgLy8gICAgICAgLmRyYXcoKTtcclxuICAgICAgLy8gICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFydGljbGVJbWFnZXMoYXJ0aWNsZUlkKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgdXJsOiBcImFqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7IGlkOiBhcnRpY2xlSWQsIG1ldGhvZDogXCJnZXRBcnRpY2xlSW1hZ2VzXCIgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoJy5wcmV2aWV3SW1hZ2VFZGl0JykucmVtb3ZlKCk7XHJcbiAgICAgICAgdmFyIGltYWdlcyA9IHJlcy5pbWFnZXM7XHJcbiAgICAgICAgaW1hZ2VzLm1hcChpbWFnZSA9PiB7XHJcbiAgICAgICAgICAkKCcuZHJvcEFydGljbGVQcmV2aWV3SW1hZ2VzJykucHJlcGVuZChgPGltZyBpZD1cImltZyR7aW1hZ2UuaWR9XCIgY2xhc3M9XCJwcmV2aWV3SW1hZ2VFZGl0IGRlbGV0ZUltYWdlXCIgc3JjPVwiZGF0YTppbWFnZS9qcGc7YmFzZTY0LCR7aW1hZ2UuYmFzZTY0fSBcIiAvPmApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuZGVsZXRlSW1hZ2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgaWYoY29uZmlybSgnQ2hjZXRlIHbDocW+bsSbIG9kc3RyYW5pdCBvYnLDoXplayB6IGRhdGFiw6F6ZT8nKSkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgZGVsZXRlSW1hZ2UoaWQpIDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRBcnRpY2xlVG9FbWFpbChlbWFpbCkge1xyXG4gIGxldCBhcnRpY2xlSWQgPSBsb2NhdGlvbi5zZWFyY2guc3BsaXQoJ2lkPScpWzFdXHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwic2VuZEFydGljbGVUb0VtYWlsXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgaWQ6IGFydGljbGVJZFxyXG4gICAgICB9KSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYC5zZW5kQXJ0aWNsZVRvRW1haWwgI2VyciR7aW5wdXR9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiNzZW5kQXJ0aWNsZU9uRW1haWxcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2VuZFJlc2VydmF0aW9uVG9FbWFpbChkYXRhKSB7XHJcbiAgZGF0YS5pZCA9IGxvY2F0aW9uLnNlYXJjaC5zcGxpdCgnaWQ9JylbMV1cclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJzZW5kUmVzZXJ2YXRpb25Ub093bmVyXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7aW5wdXR9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiNhZGRSZXNlcnZhdGlvblwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBkZWxldGVJbWFnZShpZCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImRlbGV0ZUltYWdlXCIsXHJcbiAgICAgIGltYWdlSWQ6IGlkLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXMuZXJyb3JzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmVycm9ycyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAkKFwiLmVkaXRhbGVydC1kYW5nZXJcIikuc2hvdygpLnRleHQocmVzLnN1Y2Nlc3MpO1xyXG4gICAgICAgICQoYCMke2lkfWApLnJlbW92ZSgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBjcmVhdGVBcnRpY2xlLFxyXG4gIHVwZGF0ZUFydGljbGUsXHJcbiAgZGVsZXRlQXJ0aWNsZSxcclxuICBnZXRBcnRpY2xlSW1hZ2VzLFxyXG4gIHNlbmRBcnRpY2xlVG9FbWFpbCxcclxuICBzZW5kUmVzZXJ2YXRpb25Ub0VtYWlsXHJcbn07XHJcbiIsImNvbnN0IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlID0ge1xyXG4gIG5hbWU6IFwiSm3DqW5vXCIsXHJcbiAgZW1haWw6IFwiRW1haWxcIixcclxuICByb2xlX2lkOiBcIlJvbGlcIixcclxuICBwYXNzd29yZDogXCJIZXNsb1wiLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlTG9naW4odXNlcikge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImhhbmRsZUxvZ2luXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChgI2VyciR7bmFtZX1gKS5zaG93KG1zZyk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICBpZihyZXMudXNlci5yb2xlX2lkID09PSBcIjFcIikge1xyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi8/cGFnZT11c2Vyc1wiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLz9wYWdlPWVkaXRBcnRpY2xlc1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgaGFuZGxlTG9naW4gfTtcclxuIiwiY29uc3QgY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2UgPSB7XHJcbiAgbmFtZTogXCJKbcOpbm9cIixcclxuICBlbWFpbDogXCJFbWFpbFwiLFxyXG4gIHJvbGVfaWQ6IFwiUm9saVwiLFxyXG4gIHBhc3N3b3JkOiBcIkhlc2xvXCIsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVVc2VyKHVzZXIpIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJhZGRVc2VyXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2FkZFVzZXJcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAxO1xyXG4gICAgICAgIHVzZXIgPSByZXMudXNlcjtcclxuICAgICAgICB0LnJvd1xyXG4gICAgICAgICAgLmFkZChbXHJcbiAgICAgICAgICAgIHVzZXIuaWQsXHJcbiAgICAgICAgICAgIHVzZXIubmFtZSxcclxuICAgICAgICAgICAgdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgdXNlci5yb2xlc19pZCA9PSAxID8gXCJBZG1pblwiIDogXCJFZGl0b3JcIixcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgICAuZHJhdyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVXNlcih1c2VyKSB7XHJcbiAgdXNlci5yb2xlX2lkID0gdXNlci5yb2xlX2lkID09ICdBZG1pbicgPyAxIDogMjtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJ1cGRhdGVVc2VyXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICByZXMudXNlciA9IHVzZXI7XHJcbiAgICAgICAgJChcIiN1cGRhdGVVc2VyXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LXN1Y2Nlc3NcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgICAgbGV0IHQgPSAkKFwiI3VzZXJzXCIpLkRhdGFUYWJsZSgpO1xyXG4gICAgICAgIGxldCByb3dJZCA9ICQoXCIjdXNlcnNcIikuZGF0YVRhYmxlKCkuZm5GaW5kQ2VsbFJvd0luZGV4ZXModXNlci5pZCwgMCk7XHJcbiAgICAgICAgdC5yb3cocm93SWQpXHJcbiAgICAgICAgICAuZGF0YShbXHJcbiAgICAgICAgICAgIHVzZXIuaWQsXHJcbiAgICAgICAgICAgIHVzZXIubmFtZSxcclxuICAgICAgICAgICAgdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgdXNlci5yb2xlX2lkID09IDEgPyBcIkFkbWluXCIgOiBcIkVkaXRvclwiLFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICAgIC5pbnZhbGlkYXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlVXNlcih1c2VyKSB7XHJcbiAgY29uc29sZS5sb2codXNlcik7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwiZGVsZXRlVXNlclwiLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICBsZXQgbmFtZSA9IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlW2lucHV0XTtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7bmFtZX1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiN1cGRhdGVVc2VyXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LWRhbmdlclwiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgdC5yb3dzKGZ1bmN0aW9uIChpbmRleCwgZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGFbMF0gPT09IHVzZXIuaWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgIC5yZW1vdmUoKVxyXG4gICAgICAgICAgLmRyYXcoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgY3JlYXRlVXNlciwgdXBkYXRlVXNlciwgZGVsZXRlVXNlciB9O1xyXG4iLCIvLyByZXF1aXJlKFwiYm9vdHN0cmFwL2Rpc3QvanMvYm9vdHN0cmFwXCIpO1xyXG4vLyByZXF1aXJlKFwicG9wcGVyLmpzXCIpO1xyXG5jb25zdCB7IGNyZWF0ZVVzZXIsIHVwZGF0ZVVzZXIsIGRlbGV0ZVVzZXIgfSA9IHJlcXVpcmUoXCIuL2FqYXgvdXNlcnNcIik7XHJcbmNvbnN0IHsgaGFuZGxlTG9naW4gfSA9IHJlcXVpcmUoXCIuL2FqYXgvYXV0aFwiKTtcclxuY29uc3Qge1xyXG4gIGNyZWF0ZUFydGljbGUsXHJcbiAgdXBkYXRlQXJ0aWNsZSxcclxuICBkZWxldGVBcnRpY2xlLFxyXG4gIGdldEFydGljbGVJbWFnZXMsXHJcbiAgc2VuZEFydGljbGVUb0VtYWlsLFxyXG4gIHNlbmRSZXNlcnZhdGlvblRvRW1haWwsXHJcbn0gPSByZXF1aXJlKFwiLi9hamF4L2FydGljbGVzXCIpO1xyXG52YXIgYWxsRmlsZXMgPSBbXTtcclxudmFyIGFsbEZpbGVzRWRpdCA9IFtdO1xyXG5cclxuZnVuY3Rpb24gc2F2ZVVzZXIodXNlcikge1xyXG4gIGlmICh1c2VyLmlkID09IG51bGwpIHtcclxuICAgIGNyZWF0ZVVzZXIodXNlcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIHVwZGF0ZVVzZXIodXNlcik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQXJ0aWNsZShhcnRpY2xlKSB7XHJcbiAgaWYgKGFydGljbGUuaWQgPT0gbnVsbCkge1xyXG4gICAgY3JlYXRlQXJ0aWNsZShhcnRpY2xlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdXBkYXRlQXJ0aWNsZShhcnRpY2xlKTtcclxuICB9XHJcbn1cclxuXHJcbiQoXCIuc2VuZEFydGljbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gIGxldCBhcnRpY2xlID0ge1xyXG4gICAgTsOhemV2OiAkKFwiI07DoXpldlwiKS52YWwoKSxcclxuICAgIFBvcGlzOiAkKFwiI1BvcGlzXCIpLnZhbCgpLFxyXG4gICAgRW1haWw6ICQoXCIjRW1haWxcIikudmFsKCksXHJcbiAgICBMb2thbGl0YTogJChcIiNMb2thbGl0YVwiKS52YWwoKSxcclxuICAgIENlbmE6ICQoXCIjQ2VuYVwiKS52YWwoKSxcclxuICB9O1xyXG4gIGFydGljbGUuZmlsZXMgPSBhbGxGaWxlcztcclxuICBzYXZlQXJ0aWNsZShhcnRpY2xlKTtcclxufSk7XHJcblxyXG4kKFwiLmNyZWF0ZVVzZXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gIGxldCB1c2VyID0ge1xyXG4gICAgbmFtZTogJChcIi5jcmVhdGUgI0ptw6lub1wiKS52YWwoKSxcclxuICAgIGVtYWlsOiAkKFwiLmNyZWF0ZSAjRW1haWxcIikudmFsKCksXHJcbiAgICByb2xlX2lkOiAkKFwiLmNyZWF0ZSAjcm9sZVwiKS52YWwoKSxcclxuICAgIHBhc3N3b3JkOiAkKFwiLmNyZWF0ZSAjSGVzbG9cIikudmFsKCksXHJcbiAgfTtcclxuICBzYXZlVXNlcih1c2VyKTtcclxufSk7XHJcblxyXG4kKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuXHJcbiQoXCIuc2VuZFJlc2VydmF0aW9uXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgbGV0IGVtYWlsID0gJChcIi5zZW5kUmVzZXJ2YXRpb25Ub0VtYWlsICNFbWFpbFwiKS52YWwoKTtcclxuICBsZXQgbXNnID0gJChcIi5zZW5kUmVzZXJ2YXRpb25Ub0VtYWlsICNacHLDoXZhXCIpLnZhbCgpO1xyXG4gIGxldCBuYW1lID0gJChcIi5zZW5kUmVzZXJ2YXRpb25Ub0VtYWlsICNKbcOpbm9cIikudmFsKCk7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgZGF0YSA9IHtcclxuICAgIEVtYWlsOiBlbWFpbCxcclxuICAgIFpwcsOhdmE6IG1zZyxcclxuICAgIEptw6lubzogbmFtZVxyXG4gIH07XHJcbiAgc2VuZFJlc2VydmF0aW9uVG9FbWFpbChkYXRhKTtcclxufSk7XHJcblxyXG4kKFwiLnNlbmRBcnRpY2xlRW1haWxcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBsZXQgZW1haWwgPSAkKFwiLnNlbmRBcnRpY2xlVG9FbWFpbCAjRW1haWxcIikudmFsKCk7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgc2VuZEFydGljbGVUb0VtYWlsKGVtYWlsKTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHRhYmxlID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoe1xyXG4gICAgbGFuZ3VhZ2U6IHtcclxuICAgICAgdXJsOiBcIi8vY2RuLmRhdGF0YWJsZXMubmV0L3BsdWctaW5zLzEuMTAuMjEvaTE4bi9DemVjaC5qc29uXCIsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gICQoXCIjdXNlcnMgdGJvZHlcIikub24oXCJjbGlja1wiLCBcInRyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBkYXRhID0gdGFibGUucm93KHRoaXMpLmRhdGEoKTtcclxuICAgICQoJy5lZGl0VXNlckV2ZW50Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKFwiLmVkaXRVc2VyXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAkKFwiLmRlbGV0ZVVzZXJcIikudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICQoXCIjdXBkYXRlVXNlclwiKS5tb2RhbChcInNob3dcIik7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICAkKFwiLmVkaXQgI0ptw6lub1wiKS52YWwoZGF0YVsxXSk7XHJcbiAgICAgICQoXCIuZWRpdCAjRW1haWxcIikudmFsKGRhdGFbMl0pO1xyXG4gICAgICAkKGAuZWRpdCAjcm9sZSBvcHRpb25bdmFsdWU9JHtkYXRhWzNdfV1gKS5hdHRyKFwic2VsZWN0ZWRcIiwgXCJzZWxlY3RlZFwiKTtcclxuXHJcbiAgICAgICQoXCIuZWRpdFVzZXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCB1c2VyID0ge1xyXG4gICAgICAgICAgaWQ6IGRhdGFbMF0sXHJcbiAgICAgICAgICBuYW1lOiAkKFwiLmVkaXQgI0ptw6lub1wiKS52YWwoKSxcclxuICAgICAgICAgIGVtYWlsOiAkKFwiLmVkaXQgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6ICQoXCIuZWRpdCAjSGVzbG9cIikudmFsKCksXHJcbiAgICAgICAgICByb2xlX2lkOiAkKFwiLmVkaXQgI3JvbGVcIikudmFsKCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzYXZlVXNlcih1c2VyKTtcclxuICAgICAgfSk7XHJcbiAgICAgICQoXCIuZGVsZXRlVXNlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHVzZXIgPSB7XHJcbiAgICAgICAgICBpZDogZGF0YVswXSxcclxuICAgICAgICAgIG5hbWU6ICQoXCIuZWRpdCAjSm3DqW5vXCIpLnZhbCgpLFxyXG4gICAgICAgICAgZW1haWw6ICQoXCIuZWRpdCAjRW1haWxcIikudmFsKCksXHJcbiAgICAgICAgICBwYXNzd29yZDogJChcIi5lZGl0ICNIZXNsb1wiKS52YWwoKSxcclxuICAgICAgICAgIHJvbGVfaWQ6ICQoXCIuZWRpdCAjcm9sZVwiKS52YWwoKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRlbGV0ZVVzZXIodXNlcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9KTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHRhYmxlID0gJChcIiNhcnRpY2xlc1wiKS5EYXRhVGFibGUoe1xyXG4gICAgbGFuZ3VhZ2U6IHtcclxuICAgICAgdXJsOiBcIi8vY2RuLmRhdGF0YWJsZXMubmV0L3BsdWctaW5zLzEuMTAuMjEvaTE4bi9DemVjaC5qc29uXCIsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gICQoXCIjYXJ0aWNsZXMgdGJvZHlcIikub24oXCJjbGlja1wiLCBcInRyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBkYXRhID0gdGFibGUucm93KHRoaXMpLmRhdGEoKTtcclxuICAgIGFsbEZpbGVzRWRpdCA9IFtdO1xyXG4gICAgJChcIi5lZGl0QXJ0aWNsZUV2ZW50XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKFwiLnVwZGF0ZUFydGljbGVcIikudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gICAgICAkKFwiI2VkaXRBcnRpY2xlXCIpLm1vZGFsKFwic2hvd1wiKTtcclxuICAgICAgLy8gLmRyYWdnYWJsZSh7IGhhbmRsZTogXCIubW9kYWwtaGVhZGVyXCIgfSk7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBsZXQgaXNDaGVjayA9IGRhdGFbNl0gIT09IFwiTmVuw61cIjtcclxuICAgICAgJChcIi5lZGl0QXJ0aWNsZSAjTsOhemV2XCIpLnZhbChkYXRhWzFdKTtcclxuICAgICAgJChcIi5lZGl0QXJ0aWNsZSAjUG9waXNcIikudmFsKGRhdGFbMl0pO1xyXG4gICAgICAkKFwiLmVkaXRBcnRpY2xlICNFbWFpbFwiKS52YWwoZGF0YVs1XSk7XHJcbiAgICAgICQoXCIuZWRpdEFydGljbGUgI0NlbmFcIikudmFsKGRhdGFbM10pO1xyXG4gICAgICAkKFwiLmVkaXRBcnRpY2xlICNMb2thbGl0YVwiKS52YWwoZGF0YVs0XSk7XHJcbiAgICAgICQoXCIjcmV6ZXJ2YWNlXCIpLnByb3AoXCJjaGVja2VkXCIsIGlzQ2hlY2spO1xyXG5cclxuICAgICAgZ2V0QXJ0aWNsZUltYWdlcyhkYXRhW1wiMFwiXSk7XHJcbiAgICAgICQoXCIudXBkYXRlQXJ0aWNsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgICAgICAgbGV0IGlzQ2hlY2sgPSAkKFwiLmVkaXRBcnRpY2xlICNyZXplcnZhY2VcIikuaXMoXCI6Y2hlY2tlZFwiKSA/IFwiMVwiIDogXCIwXCI7XHJcbiAgICAgICAgbGV0IGFydGljbGUgPSB7XHJcbiAgICAgICAgICBpZDogZGF0YVswXSxcclxuICAgICAgICAgIE7DoXpldjogJChcIi5lZGl0QXJ0aWNsZSAjTsOhemV2XCIpLnZhbCgpLFxyXG4gICAgICAgICAgUG9waXM6ICQoXCIuZWRpdEFydGljbGUgI1BvcGlzXCIpLnZhbCgpLFxyXG4gICAgICAgICAgRW1haWw6ICQoXCIuZWRpdEFydGljbGUgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgICAgICAgTG9rYWxpdGE6ICQoXCIuZWRpdEFydGljbGUgI0xva2FsaXRhXCIpLnZhbCgpLFxyXG4gICAgICAgICAgQ2VuYTogJChcIi5lZGl0QXJ0aWNsZSAjQ2VuYVwiKS52YWwoKSxcclxuICAgICAgICAgIHJlemVydmFjZTogaXNDaGVjayxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGFydGljbGUuZmlsZXMgPSBhbGxGaWxlc0VkaXQ7XHJcbiAgICAgICAgc2F2ZUFydGljbGUoYXJ0aWNsZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuJChcIi5sb2dpblN1Ym1pdFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgbGV0IHVzZXIgPSB7XHJcbiAgICBlbWFpbDogJChcIi5sb2dpblVzZXIgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgcGFzc3dvcmQ6ICQoXCIubG9naW5Vc2VyICNIZXNsb1wiKS52YWwoKSxcclxuICAgIHRva2VuOiAkKFwiLmxvZ2luVXNlciAjdG9rZW5cIikudmFsKCksXHJcbiAgfTtcclxuICBoYW5kbGVMb2dpbih1c2VyKTtcclxufSk7XHJcblxyXG4kKFwiLmRlbGV0ZUFydGljbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gIGxldCB1c2VyID0ge1xyXG4gICAgZW1haWw6ICQoXCIubG9naW5Vc2VyICNFbWFpbFwiKS52YWwoKSxcclxuICAgIHBhc3N3b3JkOiAkKFwiLmxvZ2luVXNlciAjSGVzbG9cIikudmFsKCksXHJcbiAgICB0b2tlbjogJChcIi5sb2dpblVzZXIgI3Rva2VuXCIpLnZhbCgpLFxyXG4gIH07XHJcbiAgZGVsZXRlQXJ0aWNsZSh1c2VyKTtcclxufSk7XHJcblxyXG4kKFwiLnVwbG9hZEFydGljbGVJbWFnZXNcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVcIikuY2xpY2soKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVcIikub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmaWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZVwiKS5maWxlcztcclxuICAgIGZpbGVzID0gcmVuZGVySW1hZ2VzKGZpbGVzKTtcclxuICAgIGhhbmRsZUZpbGVzKGZpbGVzKTtcclxuICB9O1xyXG59KTtcclxuXHJcbiQoXCIudXBsb2FkQXJ0aWNsZUltYWdlc0VkaXRcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVlZGl0XCIpLmNsaWNrKCk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlZWRpdFwiKS5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZpbGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlZWRpdFwiKS5maWxlcztcclxuICAgIGZpbGVzID0gcmVuZGVySW1hZ2VzRWRpdChmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlc0VkaXQoZmlsZXMpO1xyXG4gIH07XHJcbn0pO1xyXG5cclxuJChcIi5kcm9wQXJ0aWNsZUltYWdlc1wiKVxyXG4gIC5iaW5kKFwiZHJhZ2VudGVyIGRyYWdvdmVyXCIsIGZhbHNlKVxyXG4gIC5iaW5kKFwiZHJvcFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGxldCBkdCA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7XHJcbiAgICBsZXQgZmlsZXMgPSBkdC5maWxlcztcclxuICAgIGZpbGVzID0gcmVuZGVySW1hZ2VzKGZpbGVzKTtcclxuICAgIGhhbmRsZUZpbGVzKGZpbGVzKTtcclxuICB9KTtcclxuXHJcbiQoXCIuZHJvcEFydGljbGVJbWFnZXNFZGl0XCIpXHJcbiAgLmJpbmQoXCJkcmFnZW50ZXIgZHJhZ292ZXJcIiwgZmFsc2UpXHJcbiAgLmJpbmQoXCJkcm9wXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgbGV0IGR0ID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlcjtcclxuICAgIGxldCBmaWxlcyA9IGR0LmZpbGVzO1xyXG4gICAgZmlsZXMgPSByZW5kZXJJbWFnZXNFZGl0KGZpbGVzKTtcclxuICAgIGhhbmRsZUZpbGVzRWRpdChmaWxlcyk7XHJcbiAgfSk7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVGaWxlcyhmaWxlcykge1xyXG4gIGZvciAobGV0IFtpbmRleCwgZmlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsZXMpKSB7XHJcbiAgICBhbGxGaWxlcy5wdXNoKGZpbGUpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlRmlsZXNFZGl0KGZpbGVzKSB7XHJcbiAgZm9yIChsZXQgW2luZGV4LCBmaWxlXSBvZiBPYmplY3QuZW50cmllcyhmaWxlcykpIHtcclxuICAgIGFsbEZpbGVzRWRpdC5wdXNoKGZpbGUpO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coYWxsRmlsZXNFZGl0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVySW1hZ2VzKGZpbGVzKSB7XHJcbiAgY29uc29sZS5sb2coZmlsZXMpO1xyXG4gIGZvciAobGV0IFtpbmRleCwgZmlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsZXMpKSB7XHJcbiAgICB2YXIgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcclxuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5jbGFzc05hbWUgPSBcInByZXZpZXdJbWFnZVwiO1xyXG4gICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGFsZXJ0KFwiUHJhdmTEm3BvZG9ibsSbIG5lcG9kcG9yb3ZhbsO9IHR5cCBvYnLDoXprdS5cIik7XHJcbiAgICB9O1xyXG4gICAgaW1nLnNyYyA9IHVybDtcclxuXHJcbiAgICB2YXIgbnVtYmVyID0gTWF0aC5yYW5kb20oKTtcclxuICAgIG51bWJlci50b1N0cmluZygzNik7XHJcbiAgICB2YXIgaWQgPSBudW1iZXIudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcclxuICAgIGltZy5pZCA9IGlkO1xyXG4gICAgZmlsZS5pZCA9IGlkO1xyXG4gICAgJChcIi5kcm9wQXJ0aWNsZVByZXZpZXdcIikuYXBwZW5kKGltZyk7XHJcbiAgICAkKFwiLnByZXZpZXdJbWFnZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gICAgICBpbmRleCA9IGFsbEZpbGVzLmZpbmRJbmRleCgoZmlsZSkgPT4gZmlsZS5pZCA9PT0gaWQpO1xyXG4gICAgICBhbGxGaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAkKGAjJHtpZH1gKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICByZXR1cm4gZmlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckltYWdlc0VkaXQoZmlsZXMpIHtcclxuICBjb25zb2xlLmxvZyhmaWxlcyk7XHJcbiAgZm9yIChsZXQgW2luZGV4LCBmaWxlXSBvZiBPYmplY3QuZW50cmllcyhmaWxlcykpIHtcclxuICAgIHZhciB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLmNsYXNzTmFtZSA9IFwicHJldmlld0ltYWdlRWRpdFwiO1xyXG4gICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGFsZXJ0KFwiUHJhdmTEm3BvZG9ibsSbIG5lcG9kcG9yb3ZhbsO9IHR5cCBvYnLDoXprdS5cIik7XHJcbiAgICB9O1xyXG4gICAgaW1nLnNyYyA9IHVybDtcclxuXHJcbiAgICB2YXIgbnVtYmVyID0gTWF0aC5yYW5kb20oKTtcclxuICAgIG51bWJlci50b1N0cmluZygzNik7XHJcbiAgICB2YXIgaWQgPSBudW1iZXIudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcclxuICAgIGltZy5pZCA9IGlkO1xyXG4gICAgZmlsZS5pZCA9IGlkO1xyXG4gICAgJChcIi5kcm9wQXJ0aWNsZVByZXZpZXdJbWFnZXNcIikuYXBwZW5kKGltZyk7XHJcbiAgICAkKFwiLnByZXZpZXdJbWFnZUVkaXRcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgaW5kZXggPSBhbGxGaWxlc0VkaXQuZmluZEluZGV4KChmaWxlKSA9PiBmaWxlLmlkID09PSBpZCk7XHJcbiAgICAgIGFsbEZpbGVzRWRpdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAkKGAjJHtpZH1gKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICByZXR1cm4gZmlsZXM7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==