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
          $(`#err${input}`).text(msg);
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
        $("#sendArticleOnEmail").modal("hide");
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
      console.log($(".error"));
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
            user.role === 1 ? "Admin" : "Editor",
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
  console.log(user);
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
        $("#updateUser").modal("hide");
        $(".alert-success").show().text(res["success"]);
        let t = $("#users").DataTable();
        let rowId = $("#users").dataTable().fnFindCellRowIndexes(user.id, 0);
        t.row(rowId)
          .data([
            user.id,
            user.name,
            user.email,
            user.role === 1 ? "Admin" : "Editor",
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
  e.preventDefault();
  e.stopPropagation();
  data = {
    Email: email,
    Zpráva: msg,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC9hcnRpY2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hamF4L2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC91c2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSxhQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxhQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixLQUFLO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0Q0FBNEM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLFNBQVMsMkRBQTJELFNBQVMsYUFBYTtBQUMxSixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsR0FBRztBQUNqQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4QixtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQSxrQkFBa0I7Ozs7Ozs7Ozs7OztBQ3hDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCOzs7Ozs7Ozs7Ozs7QUMvSGxCLE9BQU8scUNBQXFDLEdBQUcsbUJBQU8sQ0FBQyxpREFBYztBQUNyRSxPQUFPLGNBQWMsR0FBRyxtQkFBTyxDQUFDLCtDQUFhO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxHQUFHLG1CQUFPLENBQUMsdURBQWlCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFFBQVE7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMEJBQTBCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLEdBQUc7QUFDZixLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxHQUFHO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luY2x1ZGVzL2pzL2FwcC5qc1wiKTtcbiIsImZ1bmN0aW9uIGNyZWF0ZUFydGljbGUoYXJ0aWNsZSkge1xyXG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIGZvciAoaSA9IDA7IGkgPCBhcnRpY2xlLmZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBmZC5hcHBlbmQoXCJmaWxlW11cIiwgYXJ0aWNsZS5maWxlc1tpXSk7XHJcbiAgfVxyXG4gIGZkLmFwcGVuZChcImRhdGFcIiwgSlNPTi5zdHJpbmdpZnkoYXJ0aWNsZSkpO1xyXG4gIGZkLmFwcGVuZChcIm1ldGhvZFwiLCBcImFkZEFydGljbGVcIik7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgdXJsOiBcImFqYXgucGhwXCIsXHJcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICBkYXRhOiBmZCxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtpbnB1dH1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiNhZGRBcnRpY2xlXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LXN1Y2Nlc3NcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgICAgdmFyIHQgPSAkKFwiI2FydGljbGVzXCIpLkRhdGFUYWJsZSgpO1xyXG4gICAgICAgIGFydGljbGUgPSByZXMuYXJ0aWNsZTtcclxuICAgICAgICB0LnJvd1xyXG4gICAgICAgICAgLmFkZChbXHJcbiAgICAgICAgICAgIGFydGljbGUuaWQsXHJcbiAgICAgICAgICAgIGFydGljbGUuTsOhemV2LFxyXG4gICAgICAgICAgICBhcnRpY2xlLlBvcGlzLFxyXG4gICAgICAgICAgICBhcnRpY2xlLkNlbmEsXHJcbiAgICAgICAgICAgIGFydGljbGUuTG9rYWxpdGEsXHJcbiAgICAgICAgICAgIGFydGljbGUuRW1haWwsXHJcbiAgICAgICAgICAgIGFydGljbGUucmV6ZXJ2YWNlID0gJ05lbsOtJyxcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgICAuZHJhdyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUFydGljbGUoYXJ0aWNsZSkge1xyXG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIGZvciAoaSA9IDA7IGkgPCBhcnRpY2xlLmZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBmZC5hcHBlbmQoXCJmaWxlW11cIiwgYXJ0aWNsZS5maWxlc1tpXSk7XHJcbiAgfVxyXG4gIGZkLmFwcGVuZChcImRhdGFcIiwgSlNPTi5zdHJpbmdpZnkoYXJ0aWNsZSkpO1xyXG4gIGZkLmFwcGVuZChcIm1ldGhvZFwiLCBcInVwZGF0ZUFydGljbGVcIik7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgdXJsOiBcImFqYXgucGhwXCIsXHJcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICBkYXRhOiBmZCxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtpbnB1dH1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiNlZGl0QXJ0aWNsZVwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIHZhciB0ID0gJChcIiNhcnRpY2xlc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICBsZXQgcm93SWQgPSAkKFwiI2FydGljbGVzXCIpLmRhdGFUYWJsZSgpLmZuRmluZENlbGxSb3dJbmRleGVzKGFydGljbGUuaWQsIDApO1xyXG4gICAgICAgIHQucm93KHJvd0lkKVxyXG4gICAgICAgICAgICAuZGF0YShbXHJcbiAgICAgICAgICAgICAgYXJ0aWNsZS5pZCxcclxuICAgICAgICAgICAgICBhcnRpY2xlLk7DoXpldixcclxuICAgICAgICAgICAgICBhcnRpY2xlLlBvcGlzLFxyXG4gICAgICAgICAgICAgIGFydGljbGUuQ2VuYSxcclxuICAgICAgICAgICAgICBhcnRpY2xlLkxva2FsaXRhLFxyXG4gICAgICAgICAgICAgIGFydGljbGUuRW1haWwsXHJcbiAgICAgICAgICAgICAgYXJ0aWNsZS5yZXplcnZhY2UgPT0gMCA/ICdOZW7DrScgOiAnSmnFviByZXplcnZvdsOhbicsXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIC5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgYXJ0aWNsZSA9IHJlcy5hcnRpY2xlO1xyXG4gICAgICAgY29uc29sZS5sb2coYXJ0aWNsZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZUFydGljbGUoYXJ0aWNsZSkge1xyXG4gIGNvbnNvbGUubG9nKGFydGljbGUpO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImRlbGV0ZUFydGljbGVcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAvLyAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICAvLyAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgLy8gICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgLy8gICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgIC8vICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAvLyAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgLy8gICAgICAgJChgI2VyciR7bmFtZX1gKS50ZXh0KG1zZyk7XHJcbiAgICAgIC8vICAgICB9XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgIC8vICAgICAkKFwiI3VwZGF0ZVVzZXJcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAvLyAgICAgJChcIi5hbGVydC1kYW5nZXJcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgIC8vICAgICB2YXIgdCA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgIC8vICAgICB0LnJvd3MoZnVuY3Rpb24gKGluZGV4LCBkYXRhKSB7XHJcbiAgICAgIC8vICAgICAgIHJldHVybiBkYXRhWzBdID09PSB1c2VyLmlkO1xyXG4gICAgICAvLyAgICAgfSlcclxuICAgICAgLy8gICAgICAgLnJlbW92ZSgpXHJcbiAgICAgIC8vICAgICAgIC5kcmF3KCk7XHJcbiAgICAgIC8vICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBcnRpY2xlSW1hZ2VzKGFydGljbGVJZCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIHVybDogXCJhamF4LnBocFwiLFxyXG4gICAgZGF0YTogeyBpZDogYXJ0aWNsZUlkLCBtZXRob2Q6IFwiZ2V0QXJ0aWNsZUltYWdlc1wiIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKCcucHJldmlld0ltYWdlRWRpdCcpLnJlbW92ZSgpO1xyXG4gICAgICAgIHZhciBpbWFnZXMgPSByZXMuaW1hZ2VzO1xyXG4gICAgICAgIGltYWdlcy5tYXAoaW1hZ2UgPT4ge1xyXG4gICAgICAgICAgJCgnLmRyb3BBcnRpY2xlUHJldmlld0ltYWdlcycpLnByZXBlbmQoYDxpbWcgaWQ9XCJpbWcke2ltYWdlLmlkfVwiIGNsYXNzPVwicHJldmlld0ltYWdlRWRpdCBkZWxldGVJbWFnZVwiIHNyYz1cImRhdGE6aW1hZ2UvanBnO2Jhc2U2NCwke2ltYWdlLmJhc2U2NH0gXCIgLz5gKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmRlbGV0ZUltYWdlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGlmKGNvbmZpcm0oJ0NoY2V0ZSB2w6HFvm7EmyBvZHN0cmFuaXQgb2Jyw6F6ZWsgeiBkYXRhYsOhemU/JykpIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGRlbGV0ZUltYWdlKGlkKSA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kQXJ0aWNsZVRvRW1haWwoZW1haWwpIHtcclxuICBsZXQgYXJ0aWNsZUlkID0gbG9jYXRpb24uc2VhcmNoLnNwbGl0KCdpZD0nKVsxXVxyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcInNlbmRBcnRpY2xlVG9FbWFpbFwiLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgIGlkOiBhcnRpY2xlSWRcclxuICAgICAgfSksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtpbnB1dH1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI3NlbmRBcnRpY2xlT25FbWFpbFwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzZW5kUmVzZXJ2YXRpb25Ub0VtYWlsKGRhdGEpIHtcclxuICBkYXRhLmlkID0gbG9jYXRpb24uc2VhcmNoLnNwbGl0KCdpZD0nKVsxXVxyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcInNlbmRSZXNlcnZhdGlvblRvT3duZXJcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtpbnB1dH1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI3NlbmRBcnRpY2xlT25FbWFpbFwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBkZWxldGVJbWFnZShpZCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImRlbGV0ZUltYWdlXCIsXHJcbiAgICAgIGltYWdlSWQ6IGlkLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXMuZXJyb3JzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmVycm9ycyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAkKFwiLmVkaXRhbGVydC1kYW5nZXJcIikuc2hvdygpLnRleHQocmVzLnN1Y2Nlc3MpO1xyXG4gICAgICAgICQoYCMke2lkfWApLnJlbW92ZSgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBjcmVhdGVBcnRpY2xlLFxyXG4gIHVwZGF0ZUFydGljbGUsXHJcbiAgZGVsZXRlQXJ0aWNsZSxcclxuICBnZXRBcnRpY2xlSW1hZ2VzLFxyXG4gIHNlbmRBcnRpY2xlVG9FbWFpbCxcclxuICBzZW5kUmVzZXJ2YXRpb25Ub0VtYWlsXHJcbn07XHJcbiIsImNvbnN0IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlID0ge1xyXG4gIG5hbWU6IFwiSm3DqW5vXCIsXHJcbiAgZW1haWw6IFwiRW1haWxcIixcclxuICByb2xlX2lkOiBcIlJvbGlcIixcclxuICBwYXNzd29yZDogXCJIZXNsb1wiLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlTG9naW4odXNlcikge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImhhbmRsZUxvZ2luXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChgI2VyciR7bmFtZX1gKS5zaG93KG1zZyk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICBpZihyZXMudXNlci5yb2xlX2lkID09PSBcIjFcIikge1xyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi8/cGFnZT11c2Vyc1wiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLz9wYWdlPWVkaXRBcnRpY2xlc1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgaGFuZGxlTG9naW4gfTtcclxuIiwiY29uc3QgY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2UgPSB7XHJcbiAgbmFtZTogXCJKbcOpbm9cIixcclxuICBlbWFpbDogXCJFbWFpbFwiLFxyXG4gIHJvbGVfaWQ6IFwiUm9saVwiLFxyXG4gIHBhc3N3b3JkOiBcIkhlc2xvXCIsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVVc2VyKHVzZXIpIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJhZGRVc2VyXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCQoXCIuZXJyb3JcIikpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICBsZXQgbmFtZSA9IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlW2lucHV0XTtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7bmFtZX1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiNhZGRVc2VyXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LXN1Y2Nlc3NcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgICAgdmFyIHQgPSAkKFwiI3VzZXJzXCIpLkRhdGFUYWJsZSgpO1xyXG4gICAgICAgIHZhciBjb3VudGVyID0gMTtcclxuICAgICAgICB1c2VyID0gcmVzLnVzZXI7XHJcbiAgICAgICAgdC5yb3dcclxuICAgICAgICAgIC5hZGQoW1xyXG4gICAgICAgICAgICB1c2VyLmlkLFxyXG4gICAgICAgICAgICB1c2VyLm5hbWUsXHJcbiAgICAgICAgICAgIHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIHVzZXIucm9sZSA9PT0gMSA/IFwiQWRtaW5cIiA6IFwiRWRpdG9yXCIsXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgICAgLmRyYXcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVVzZXIodXNlcikge1xyXG4gIGNvbnNvbGUubG9nKHVzZXIpO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcInVwZGF0ZVVzZXJcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjdXBkYXRlVXNlclwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIGxldCB0ID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICBsZXQgcm93SWQgPSAkKFwiI3VzZXJzXCIpLmRhdGFUYWJsZSgpLmZuRmluZENlbGxSb3dJbmRleGVzKHVzZXIuaWQsIDApO1xyXG4gICAgICAgIHQucm93KHJvd0lkKVxyXG4gICAgICAgICAgLmRhdGEoW1xyXG4gICAgICAgICAgICB1c2VyLmlkLFxyXG4gICAgICAgICAgICB1c2VyLm5hbWUsXHJcbiAgICAgICAgICAgIHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIHVzZXIucm9sZSA9PT0gMSA/IFwiQWRtaW5cIiA6IFwiRWRpdG9yXCIsXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgICAgLmludmFsaWRhdGUoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVVc2VyKHVzZXIpIHtcclxuICBjb25zb2xlLmxvZyh1c2VyKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJkZWxldGVVc2VyXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI3VwZGF0ZVVzZXJcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtZGFuZ2VyXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIHZhciB0ID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICB0LnJvd3MoZnVuY3Rpb24gKGluZGV4LCBkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YVswXSA9PT0gdXNlci5pZDtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgLnJlbW92ZSgpXHJcbiAgICAgICAgICAuZHJhdygpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBjcmVhdGVVc2VyLCB1cGRhdGVVc2VyLCBkZWxldGVVc2VyIH07XHJcbiIsImNvbnN0IHsgY3JlYXRlVXNlciwgdXBkYXRlVXNlciwgZGVsZXRlVXNlciB9ID0gcmVxdWlyZShcIi4vYWpheC91c2Vyc1wiKTtcclxuY29uc3QgeyBoYW5kbGVMb2dpbiB9ID0gcmVxdWlyZShcIi4vYWpheC9hdXRoXCIpO1xyXG5jb25zdCB7XHJcbiAgY3JlYXRlQXJ0aWNsZSxcclxuICB1cGRhdGVBcnRpY2xlLFxyXG4gIGRlbGV0ZUFydGljbGUsXHJcbiAgZ2V0QXJ0aWNsZUltYWdlcyxcclxuICBzZW5kQXJ0aWNsZVRvRW1haWwsXHJcbiAgc2VuZFJlc2VydmF0aW9uVG9FbWFpbCxcclxufSA9IHJlcXVpcmUoXCIuL2FqYXgvYXJ0aWNsZXNcIik7XHJcbnZhciBhbGxGaWxlcyA9IFtdO1xyXG52YXIgYWxsRmlsZXNFZGl0ID0gW107XHJcblxyXG5mdW5jdGlvbiBzYXZlVXNlcih1c2VyKSB7XHJcbiAgaWYgKHVzZXIuaWQgPT0gbnVsbCkge1xyXG4gICAgY3JlYXRlVXNlcih1c2VyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdXBkYXRlVXNlcih1c2VyKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVBcnRpY2xlKGFydGljbGUpIHtcclxuICBpZiAoYXJ0aWNsZS5pZCA9PSBudWxsKSB7XHJcbiAgICBjcmVhdGVBcnRpY2xlKGFydGljbGUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB1cGRhdGVBcnRpY2xlKGFydGljbGUpO1xyXG4gIH1cclxufVxyXG5cclxuJChcIi5zZW5kQXJ0aWNsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgbGV0IGFydGljbGUgPSB7XHJcbiAgICBOw6F6ZXY6ICQoXCIjTsOhemV2XCIpLnZhbCgpLFxyXG4gICAgUG9waXM6ICQoXCIjUG9waXNcIikudmFsKCksXHJcbiAgICBFbWFpbDogJChcIiNFbWFpbFwiKS52YWwoKSxcclxuICAgIExva2FsaXRhOiAkKFwiI0xva2FsaXRhXCIpLnZhbCgpLFxyXG4gICAgQ2VuYTogJChcIiNDZW5hXCIpLnZhbCgpLFxyXG4gIH07XHJcbiAgYXJ0aWNsZS5maWxlcyA9IGFsbEZpbGVzO1xyXG4gIHNhdmVBcnRpY2xlKGFydGljbGUpO1xyXG59KTtcclxuXHJcbiQoXCIuY3JlYXRlVXNlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgbGV0IHVzZXIgPSB7XHJcbiAgICBuYW1lOiAkKFwiLmNyZWF0ZSAjSm3DqW5vXCIpLnZhbCgpLFxyXG4gICAgZW1haWw6ICQoXCIuY3JlYXRlICNFbWFpbFwiKS52YWwoKSxcclxuICAgIHJvbGVfaWQ6ICQoXCIuY3JlYXRlICNyb2xlXCIpLnZhbCgpLFxyXG4gICAgcGFzc3dvcmQ6ICQoXCIuY3JlYXRlICNIZXNsb1wiKS52YWwoKSxcclxuICB9O1xyXG4gIHNhdmVVc2VyKHVzZXIpO1xyXG59KTtcclxuXHJcbiQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG5cclxuJChcIi5zZW5kUmVzZXJ2YXRpb25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBsZXQgZW1haWwgPSAkKFwiLnNlbmRSZXNlcnZhdGlvblRvRW1haWwgI0VtYWlsXCIpLnZhbCgpO1xyXG4gIGxldCBtc2cgPSAkKFwiLnNlbmRSZXNlcnZhdGlvblRvRW1haWwgI1pwcsOhdmFcIikudmFsKCk7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgZGF0YSA9IHtcclxuICAgIEVtYWlsOiBlbWFpbCxcclxuICAgIFpwcsOhdmE6IG1zZyxcclxuICB9O1xyXG4gIHNlbmRSZXNlcnZhdGlvblRvRW1haWwoZGF0YSk7XHJcbn0pO1xyXG5cclxuJChcIi5zZW5kQXJ0aWNsZUVtYWlsXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgbGV0IGVtYWlsID0gJChcIi5zZW5kQXJ0aWNsZVRvRW1haWwgI0VtYWlsXCIpLnZhbCgpO1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIHNlbmRBcnRpY2xlVG9FbWFpbChlbWFpbCk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gIHZhciB0YWJsZSA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKHtcclxuICAgIGxhbmd1YWdlOiB7XHJcbiAgICAgIHVybDogXCIvL2Nkbi5kYXRhdGFibGVzLm5ldC9wbHVnLWlucy8xLjEwLjIxL2kxOG4vQ3plY2guanNvblwiLFxyXG4gICAgfSxcclxuICB9KTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICAkKFwiI3VzZXJzIHRib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCJ0clwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZGF0YSA9IHRhYmxlLnJvdyh0aGlzKS5kYXRhKCk7XHJcbiAgICAkKFwiLmVkaXRVc2VyXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgJChcIi5kZWxldGVVc2VyXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgJChcIiN1cGRhdGVVc2VyXCIpLm1vZGFsKFwic2hvd1wiKTtcclxuICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgJChcIi5lZGl0ICNKbcOpbm9cIikudmFsKGRhdGFbMV0pO1xyXG4gICAgJChcIi5lZGl0ICNFbWFpbFwiKS52YWwoZGF0YVsyXSk7XHJcbiAgICAkKGAuZWRpdCAjcm9sZSBvcHRpb25bdmFsdWU9JHtkYXRhWzNdfV1gKS5hdHRyKFwic2VsZWN0ZWRcIiwgXCJzZWxlY3RlZFwiKTtcclxuXHJcbiAgICAkKFwiLmVkaXRVc2VyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHVzZXIgPSB7XHJcbiAgICAgICAgaWQ6IGRhdGFbMF0sXHJcbiAgICAgICAgbmFtZTogJChcIi5lZGl0ICNKbcOpbm9cIikudmFsKCksXHJcbiAgICAgICAgZW1haWw6ICQoXCIuZWRpdCAjRW1haWxcIikudmFsKCksXHJcbiAgICAgICAgcGFzc3dvcmQ6ICQoXCIuZWRpdCAjSGVzbG9cIikudmFsKCksXHJcbiAgICAgICAgcm9sZV9pZDogJChcIi5lZGl0ICNyb2xlXCIpLnZhbCgpLFxyXG4gICAgICB9O1xyXG4gICAgICBzYXZlVXNlcih1c2VyKTtcclxuICAgIH0pO1xyXG4gICAgJChcIi5kZWxldGVVc2VyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHVzZXIgPSB7XHJcbiAgICAgICAgaWQ6IGRhdGFbMF0sXHJcbiAgICAgICAgbmFtZTogJChcIi5lZGl0ICNKbcOpbm9cIikudmFsKCksXHJcbiAgICAgICAgZW1haWw6ICQoXCIuZWRpdCAjRW1haWxcIikudmFsKCksXHJcbiAgICAgICAgcGFzc3dvcmQ6ICQoXCIuZWRpdCAjSGVzbG9cIikudmFsKCksXHJcbiAgICAgICAgcm9sZV9pZDogJChcIi5lZGl0ICNyb2xlXCIpLnZhbCgpLFxyXG4gICAgICB9O1xyXG4gICAgICBkZWxldGVVc2VyKHVzZXIpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gIHZhciB0YWJsZSA9ICQoXCIjYXJ0aWNsZXNcIikuRGF0YVRhYmxlKHtcclxuICAgIGxhbmd1YWdlOiB7XHJcbiAgICAgIHVybDogXCIvL2Nkbi5kYXRhdGFibGVzLm5ldC9wbHVnLWlucy8xLjEwLjIxL2kxOG4vQ3plY2guanNvblwiLFxyXG4gICAgfSxcclxuICB9KTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICAkKFwiI2FydGljbGVzIHRib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCJ0clwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZGF0YSA9IHRhYmxlLnJvdyh0aGlzKS5kYXRhKCk7XHJcbiAgICBhbGxGaWxlc0VkaXQgPSBbXTtcclxuICAgICQoXCIuZWRpdEFydGljbGVFdmVudFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChcIi51cGRhdGVBcnRpY2xlXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICAgICAgJChcIiNlZGl0QXJ0aWNsZVwiKS5tb2RhbChcInNob3dcIik7XHJcbiAgICAgIC8vIC5kcmFnZ2FibGUoeyBoYW5kbGU6IFwiLm1vZGFsLWhlYWRlclwiIH0pO1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgbGV0IGlzQ2hlY2sgPSBkYXRhWzZdICE9PSBcIk5lbsOtXCI7XHJcbiAgICAgICQoXCIuZWRpdEFydGljbGUgI07DoXpldlwiKS52YWwoZGF0YVsxXSk7XHJcbiAgICAgICQoXCIuZWRpdEFydGljbGUgI1BvcGlzXCIpLnZhbChkYXRhWzJdKTtcclxuICAgICAgJChcIi5lZGl0QXJ0aWNsZSAjRW1haWxcIikudmFsKGRhdGFbNV0pO1xyXG4gICAgICAkKFwiLmVkaXRBcnRpY2xlICNDZW5hXCIpLnZhbChkYXRhWzNdKTtcclxuICAgICAgJChcIi5lZGl0QXJ0aWNsZSAjTG9rYWxpdGFcIikudmFsKGRhdGFbNF0pO1xyXG4gICAgICAkKFwiI3JlemVydmFjZVwiKS5wcm9wKFwiY2hlY2tlZFwiLCBpc0NoZWNrKTtcclxuXHJcbiAgICAgIGdldEFydGljbGVJbWFnZXMoZGF0YVtcIjBcIl0pO1xyXG4gICAgICAkKFwiLnVwZGF0ZUFydGljbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gICAgICAgIGxldCBpc0NoZWNrID0gJChcIi5lZGl0QXJ0aWNsZSAjcmV6ZXJ2YWNlXCIpLmlzKFwiOmNoZWNrZWRcIikgPyBcIjFcIiA6IFwiMFwiO1xyXG4gICAgICAgIGxldCBhcnRpY2xlID0ge1xyXG4gICAgICAgICAgaWQ6IGRhdGFbMF0sXHJcbiAgICAgICAgICBOw6F6ZXY6ICQoXCIuZWRpdEFydGljbGUgI07DoXpldlwiKS52YWwoKSxcclxuICAgICAgICAgIFBvcGlzOiAkKFwiLmVkaXRBcnRpY2xlICNQb3Bpc1wiKS52YWwoKSxcclxuICAgICAgICAgIEVtYWlsOiAkKFwiLmVkaXRBcnRpY2xlICNFbWFpbFwiKS52YWwoKSxcclxuICAgICAgICAgIExva2FsaXRhOiAkKFwiLmVkaXRBcnRpY2xlICNMb2thbGl0YVwiKS52YWwoKSxcclxuICAgICAgICAgIENlbmE6ICQoXCIuZWRpdEFydGljbGUgI0NlbmFcIikudmFsKCksXHJcbiAgICAgICAgICByZXplcnZhY2U6IGlzQ2hlY2ssXHJcbiAgICAgICAgfTtcclxuICAgICAgICBhcnRpY2xlLmZpbGVzID0gYWxsRmlsZXNFZGl0O1xyXG4gICAgICAgIHNhdmVBcnRpY2xlKGFydGljbGUpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbiQoXCIubG9naW5TdWJtaXRcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gIGxldCB1c2VyID0ge1xyXG4gICAgZW1haWw6ICQoXCIubG9naW5Vc2VyICNFbWFpbFwiKS52YWwoKSxcclxuICAgIHBhc3N3b3JkOiAkKFwiLmxvZ2luVXNlciAjSGVzbG9cIikudmFsKCksXHJcbiAgICB0b2tlbjogJChcIi5sb2dpblVzZXIgI3Rva2VuXCIpLnZhbCgpLFxyXG4gIH07XHJcbiAgaGFuZGxlTG9naW4odXNlcik7XHJcbn0pO1xyXG5cclxuJChcIi5kZWxldGVBcnRpY2xlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICBsZXQgdXNlciA9IHtcclxuICAgIGVtYWlsOiAkKFwiLmxvZ2luVXNlciAjRW1haWxcIikudmFsKCksXHJcbiAgICBwYXNzd29yZDogJChcIi5sb2dpblVzZXIgI0hlc2xvXCIpLnZhbCgpLFxyXG4gICAgdG9rZW46ICQoXCIubG9naW5Vc2VyICN0b2tlblwiKS52YWwoKSxcclxuICB9O1xyXG4gIGRlbGV0ZUFydGljbGUodXNlcik7XHJcbn0pO1xyXG5cclxuJChcIi51cGxvYWRBcnRpY2xlSW1hZ2VzXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlXCIpLmNsaWNrKCk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlXCIpLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVcIikuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlcyhmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlcyhmaWxlcyk7XHJcbiAgfTtcclxufSk7XHJcblxyXG4kKFwiLnVwbG9hZEFydGljbGVJbWFnZXNFZGl0XCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlZWRpdFwiKS5jbGljaygpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZWVkaXRcIikub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmaWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZWVkaXRcIikuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlc0VkaXQoZmlsZXMpO1xyXG4gICAgaGFuZGxlRmlsZXNFZGl0KGZpbGVzKTtcclxuICB9O1xyXG59KTtcclxuXHJcbiQoXCIuZHJvcEFydGljbGVJbWFnZXNcIilcclxuICAuYmluZChcImRyYWdlbnRlciBkcmFnb3ZlclwiLCBmYWxzZSlcclxuICAuYmluZChcImRyb3BcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBsZXQgZHQgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyO1xyXG4gICAgbGV0IGZpbGVzID0gZHQuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlcyhmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlcyhmaWxlcyk7XHJcbiAgfSk7XHJcblxyXG4kKFwiLmRyb3BBcnRpY2xlSW1hZ2VzRWRpdFwiKVxyXG4gIC5iaW5kKFwiZHJhZ2VudGVyIGRyYWdvdmVyXCIsIGZhbHNlKVxyXG4gIC5iaW5kKFwiZHJvcFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGxldCBkdCA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7XHJcbiAgICBsZXQgZmlsZXMgPSBkdC5maWxlcztcclxuICAgIGZpbGVzID0gcmVuZGVySW1hZ2VzRWRpdChmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlc0VkaXQoZmlsZXMpO1xyXG4gIH0pO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlRmlsZXMoZmlsZXMpIHtcclxuICBmb3IgKGxldCBbaW5kZXgsIGZpbGVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbGVzKSkge1xyXG4gICAgYWxsRmlsZXMucHVzaChmaWxlKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUZpbGVzRWRpdChmaWxlcykge1xyXG4gIGZvciAobGV0IFtpbmRleCwgZmlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsZXMpKSB7XHJcbiAgICBhbGxGaWxlc0VkaXQucHVzaChmaWxlKTtcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKGFsbEZpbGVzRWRpdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckltYWdlcyhmaWxlcykge1xyXG4gIGNvbnNvbGUubG9nKGZpbGVzKTtcclxuICBmb3IgKGxldCBbaW5kZXgsIGZpbGVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbGVzKSkge1xyXG4gICAgdmFyIHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XHJcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuY2xhc3NOYW1lID0gXCJwcmV2aWV3SW1hZ2VcIjtcclxuICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBhbGVydChcIlByYXZkxJtwb2RvYm7EmyBuZXBvZHBvcm92YW7DvSB0eXAgb2Jyw6F6a3UuXCIpO1xyXG4gICAgfTtcclxuICAgIGltZy5zcmMgPSB1cmw7XHJcblxyXG4gICAgdmFyIG51bWJlciA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICBudW1iZXIudG9TdHJpbmcoMzYpO1xyXG4gICAgdmFyIGlkID0gbnVtYmVyLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XHJcbiAgICBpbWcuaWQgPSBpZDtcclxuICAgIGZpbGUuaWQgPSBpZDtcclxuICAgICQoXCIuZHJvcEFydGljbGVQcmV2aWV3XCIpLmFwcGVuZChpbWcpO1xyXG4gICAgJChcIi5wcmV2aWV3SW1hZ2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgaW5kZXggPSBhbGxGaWxlcy5maW5kSW5kZXgoKGZpbGUpID0+IGZpbGUuaWQgPT09IGlkKTtcclxuICAgICAgYWxsRmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgJChgIyR7aWR9YCkucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIGZpbGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJJbWFnZXNFZGl0KGZpbGVzKSB7XHJcbiAgY29uc29sZS5sb2coZmlsZXMpO1xyXG4gIGZvciAobGV0IFtpbmRleCwgZmlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsZXMpKSB7XHJcbiAgICB2YXIgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcclxuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5jbGFzc05hbWUgPSBcInByZXZpZXdJbWFnZUVkaXRcIjtcclxuICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBhbGVydChcIlByYXZkxJtwb2RvYm7EmyBuZXBvZHBvcm92YW7DvSB0eXAgb2Jyw6F6a3UuXCIpO1xyXG4gICAgfTtcclxuICAgIGltZy5zcmMgPSB1cmw7XHJcblxyXG4gICAgdmFyIG51bWJlciA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICBudW1iZXIudG9TdHJpbmcoMzYpO1xyXG4gICAgdmFyIGlkID0gbnVtYmVyLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XHJcbiAgICBpbWcuaWQgPSBpZDtcclxuICAgIGZpbGUuaWQgPSBpZDtcclxuICAgICQoXCIuZHJvcEFydGljbGVQcmV2aWV3SW1hZ2VzXCIpLmFwcGVuZChpbWcpO1xyXG4gICAgJChcIi5wcmV2aWV3SW1hZ2VFZGl0XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgIGluZGV4ID0gYWxsRmlsZXNFZGl0LmZpbmRJbmRleCgoZmlsZSkgPT4gZmlsZS5pZCA9PT0gaWQpO1xyXG4gICAgICBhbGxGaWxlc0VkaXQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgJChgIyR7aWR9YCkucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIGZpbGVzO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=