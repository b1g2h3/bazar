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

const {
  createUser,
  updateUser,
  deleteUser
} = __webpack_require__(/*! ./ajax/users */ "./includes/js/ajax/users.js");
const { handleLogin } = __webpack_require__(/*! ./ajax/auth */ "./includes/js/ajax/auth.js");
const {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleImages,
  sendArticleToEmail,
  sendReservationToEmail
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
  }
  sendReservationToEmail(data)
});


$(".sendArticleEmail").click(function (e) {
  let email = $(".sendArticleToEmail #Email").val();
  e.preventDefault();
  e.stopPropagation();
  sendArticleToEmail(email)
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
    $(".updateArticle").unbind("click");
    $(".alert").hide()
    $('#editArticle').modal('show')
        // .draggable({ handle: ".modal-header" });
    $(".error").hide();
    let isCheck = data[6] !== 'Není' ;
    $(".editArticle #Název").val(data[1]);
    $(".editArticle #Popis").val(data[2]);
    $(".editArticle #Email").val(data[5]);
    $(".editArticle #Cena").val(data[3]);
    $(".editArticle #Lokalita").val(data[4]);
    $( "#rezervace" ).prop( "checked", isCheck );

    getArticleImages(data["0"]);
    $(".updateArticle").click(function () {
      $(".error").hide();
      $(".alert").hide();
      let isCheck =$(".editArticle #rezervace").is(':checked') ? '1' : '0';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC9hcnRpY2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hamF4L2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC91c2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSxhQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxhQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixLQUFLO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0Q0FBNEM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLFNBQVMsMkRBQTJELFNBQVMsYUFBYTtBQUMxSixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsR0FBRztBQUNqQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4QixtQkFBbUIsS0FBSztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQSxrQkFBa0I7Ozs7Ozs7Ozs7OztBQ3hDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCOzs7Ozs7Ozs7Ozs7QUMvSGxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxHQUFHLG1CQUFPLENBQUMsaURBQWM7QUFDMUIsT0FBTyxjQUFjLEdBQUcsbUJBQU8sQ0FBQywrQ0FBYTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsR0FBRyxtQkFBTyxDQUFDLHVEQUFpQjtBQUM3QjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7QUFLRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxRQUFROztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxHQUFHO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLEdBQUc7QUFDZixLQUFLO0FBQ0w7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5jbHVkZXMvanMvYXBwLmpzXCIpO1xuIiwiZnVuY3Rpb24gY3JlYXRlQXJ0aWNsZShhcnRpY2xlKSB7XHJcbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgZm9yIChpID0gMDsgaSA8IGFydGljbGUuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGZkLmFwcGVuZChcImZpbGVbXVwiLCBhcnRpY2xlLmZpbGVzW2ldKTtcclxuICB9XHJcbiAgZmQuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeShhcnRpY2xlKSk7XHJcbiAgZmQuYXBwZW5kKFwibWV0aG9kXCIsIFwiYWRkQXJ0aWNsZVwiKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICB1cmw6IFwiYWpheC5waHBcIixcclxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgIGRhdGE6IGZkLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke2lucHV0fWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2FkZEFydGljbGVcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjYXJ0aWNsZXNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgYXJ0aWNsZSA9IHJlcy5hcnRpY2xlO1xyXG4gICAgICAgIHQucm93XHJcbiAgICAgICAgICAuYWRkKFtcclxuICAgICAgICAgICAgYXJ0aWNsZS5pZCxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Ow6F6ZXYsXHJcbiAgICAgICAgICAgIGFydGljbGUuUG9waXMsXHJcbiAgICAgICAgICAgIGFydGljbGUuQ2VuYSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Mb2thbGl0YSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5FbWFpbCxcclxuICAgICAgICAgICAgYXJ0aWNsZS5yZXplcnZhY2UgPSAnTmVuw60nLFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICAgIC5kcmF3KGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQXJ0aWNsZShhcnRpY2xlKSB7XHJcbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgZm9yIChpID0gMDsgaSA8IGFydGljbGUuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGZkLmFwcGVuZChcImZpbGVbXVwiLCBhcnRpY2xlLmZpbGVzW2ldKTtcclxuICB9XHJcbiAgZmQuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeShhcnRpY2xlKSk7XHJcbiAgZmQuYXBwZW5kKFwibWV0aG9kXCIsIFwidXBkYXRlQXJ0aWNsZVwiKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICB1cmw6IFwiYWpheC5waHBcIixcclxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgIGRhdGE6IGZkLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke2lucHV0fWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2VkaXRBcnRpY2xlXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LXN1Y2Nlc3NcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgICAgdmFyIHQgPSAkKFwiI2FydGljbGVzXCIpLkRhdGFUYWJsZSgpO1xyXG4gICAgICAgIGxldCByb3dJZCA9ICQoXCIjYXJ0aWNsZXNcIikuZGF0YVRhYmxlKCkuZm5GaW5kQ2VsbFJvd0luZGV4ZXMoYXJ0aWNsZS5pZCwgMCk7XHJcbiAgICAgICAgdC5yb3cocm93SWQpXHJcbiAgICAgICAgICAgIC5kYXRhKFtcclxuICAgICAgICAgICAgICBhcnRpY2xlLmlkLFxyXG4gICAgICAgICAgICAgIGFydGljbGUuTsOhemV2LFxyXG4gICAgICAgICAgICAgIGFydGljbGUuUG9waXMsXHJcbiAgICAgICAgICAgICAgYXJ0aWNsZS5DZW5hLFxyXG4gICAgICAgICAgICAgIGFydGljbGUuTG9rYWxpdGEsXHJcbiAgICAgICAgICAgICAgYXJ0aWNsZS5FbWFpbCxcclxuICAgICAgICAgICAgICBhcnRpY2xlLnJlemVydmFjZSA9PSAwID8gJ05lbsOtJyA6ICdKacW+IHJlemVydm92w6FuJyxcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgLmludmFsaWRhdGUoKTtcclxuICAgICAgICBhcnRpY2xlID0gcmVzLmFydGljbGU7XHJcbiAgICAgICBjb25zb2xlLmxvZyhhcnRpY2xlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlQXJ0aWNsZShhcnRpY2xlKSB7XHJcbiAgY29uc29sZS5sb2coYXJ0aWNsZSk7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwiZGVsZXRlQXJ0aWNsZVwiLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgIC8vICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIC8vICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAvLyAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAvLyAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgLy8gICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgIC8vICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAvLyAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgLy8gICAgIH1cclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgLy8gICAgICQoXCIjdXBkYXRlVXNlclwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgIC8vICAgICAkKFwiLmFsZXJ0LWRhbmdlclwiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgLy8gICAgIHZhciB0ID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgLy8gICAgIHQucm93cyhmdW5jdGlvbiAoaW5kZXgsIGRhdGEpIHtcclxuICAgICAgLy8gICAgICAgcmV0dXJuIGRhdGFbMF0gPT09IHVzZXIuaWQ7XHJcbiAgICAgIC8vICAgICB9KVxyXG4gICAgICAvLyAgICAgICAucmVtb3ZlKClcclxuICAgICAgLy8gICAgICAgLmRyYXcoKTtcclxuICAgICAgLy8gICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFydGljbGVJbWFnZXMoYXJ0aWNsZUlkKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgdXJsOiBcImFqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7IGlkOiBhcnRpY2xlSWQsIG1ldGhvZDogXCJnZXRBcnRpY2xlSW1hZ2VzXCIgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoJy5wcmV2aWV3SW1hZ2VFZGl0JykucmVtb3ZlKCk7XHJcbiAgICAgICAgdmFyIGltYWdlcyA9IHJlcy5pbWFnZXM7XHJcbiAgICAgICAgaW1hZ2VzLm1hcChpbWFnZSA9PiB7XHJcbiAgICAgICAgICAkKCcuZHJvcEFydGljbGVQcmV2aWV3SW1hZ2VzJykucHJlcGVuZChgPGltZyBpZD1cImltZyR7aW1hZ2UuaWR9XCIgY2xhc3M9XCJwcmV2aWV3SW1hZ2VFZGl0IGRlbGV0ZUltYWdlXCIgc3JjPVwiZGF0YTppbWFnZS9qcGc7YmFzZTY0LCR7aW1hZ2UuYmFzZTY0fSBcIiAvPmApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuZGVsZXRlSW1hZ2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgaWYoY29uZmlybSgnQ2hjZXRlIHbDocW+bsSbIG9kc3RyYW5pdCBvYnLDoXplayB6IGRhdGFiw6F6ZT8nKSkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgZGVsZXRlSW1hZ2UoaWQpIDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRBcnRpY2xlVG9FbWFpbChlbWFpbCkge1xyXG4gIGxldCBhcnRpY2xlSWQgPSBsb2NhdGlvbi5zZWFyY2guc3BsaXQoJ2lkPScpWzFdXHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwic2VuZEFydGljbGVUb0VtYWlsXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgaWQ6IGFydGljbGVJZFxyXG4gICAgICB9KSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke2lucHV0fWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjc2VuZEFydGljbGVPbkVtYWlsXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LXN1Y2Nlc3NcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHNlbmRSZXNlcnZhdGlvblRvRW1haWwoZGF0YSkge1xyXG4gIGRhdGEuaWQgPSBsb2NhdGlvbi5zZWFyY2guc3BsaXQoJ2lkPScpWzFdXHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwic2VuZFJlc2VydmF0aW9uVG9Pd25lclwiLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke2lucHV0fWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjc2VuZEFydGljbGVPbkVtYWlsXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LXN1Y2Nlc3NcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZUltYWdlKGlkKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwiZGVsZXRlSW1hZ2VcIixcclxuICAgICAgaW1hZ2VJZDogaWQsXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlcy5lcnJvcnMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyb3JzKTtcclxuICAgICAgfVxyXG4gICAgICBpZihyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICQoXCIuZWRpdGFsZXJ0LWRhbmdlclwiKS5zaG93KCkudGV4dChyZXMuc3VjY2Vzcyk7XHJcbiAgICAgICAgJChgIyR7aWR9YCkucmVtb3ZlKClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGNyZWF0ZUFydGljbGUsXHJcbiAgdXBkYXRlQXJ0aWNsZSxcclxuICBkZWxldGVBcnRpY2xlLFxyXG4gIGdldEFydGljbGVJbWFnZXMsXHJcbiAgc2VuZEFydGljbGVUb0VtYWlsLFxyXG4gIHNlbmRSZXNlcnZhdGlvblRvRW1haWxcclxufTtcclxuIiwiY29uc3QgY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2UgPSB7XHJcbiAgbmFtZTogXCJKbcOpbm9cIixcclxuICBlbWFpbDogXCJFbWFpbFwiLFxyXG4gIHJvbGVfaWQ6IFwiUm9saVwiLFxyXG4gIHBhc3N3b3JkOiBcIkhlc2xvXCIsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVMb2dpbih1c2VyKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwiaGFuZGxlTG9naW5cIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnNob3cobXNnKTtcclxuICAgICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgIGlmKHJlcy51c2VyLnJvbGVfaWQgPT09IFwiMVwiKSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLz9wYWdlPXVzZXJzXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvP3BhZ2U9ZWRpdEFydGljbGVzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBoYW5kbGVMb2dpbiB9O1xyXG4iLCJjb25zdCBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZSA9IHtcclxuICBuYW1lOiBcIkptw6lub1wiLFxyXG4gIGVtYWlsOiBcIkVtYWlsXCIsXHJcbiAgcm9sZV9pZDogXCJSb2xpXCIsXHJcbiAgcGFzc3dvcmQ6IFwiSGVzbG9cIixcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVVzZXIodXNlcikge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImFkZFVzZXJcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgY29uc29sZS5sb2coJChcIi5lcnJvclwiKSk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2FkZFVzZXJcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAxO1xyXG4gICAgICAgIHVzZXIgPSByZXMudXNlcjtcclxuICAgICAgICB0LnJvd1xyXG4gICAgICAgICAgLmFkZChbXHJcbiAgICAgICAgICAgIHVzZXIuaWQsXHJcbiAgICAgICAgICAgIHVzZXIubmFtZSxcclxuICAgICAgICAgICAgdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgdXNlci5yb2xlID09PSAxID8gXCJBZG1pblwiIDogXCJFZGl0b3JcIixcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgICAuZHJhdyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVXNlcih1c2VyKSB7XHJcbiAgY29uc29sZS5sb2codXNlcik7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwidXBkYXRlVXNlclwiLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICBsZXQgbmFtZSA9IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlW2lucHV0XTtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7bmFtZX1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiN1cGRhdGVVc2VyXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LXN1Y2Nlc3NcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgICAgbGV0IHQgPSAkKFwiI3VzZXJzXCIpLkRhdGFUYWJsZSgpO1xyXG4gICAgICAgIGxldCByb3dJZCA9ICQoXCIjdXNlcnNcIikuZGF0YVRhYmxlKCkuZm5GaW5kQ2VsbFJvd0luZGV4ZXModXNlci5pZCwgMCk7XHJcbiAgICAgICAgdC5yb3cocm93SWQpXHJcbiAgICAgICAgICAuZGF0YShbXHJcbiAgICAgICAgICAgIHVzZXIuaWQsXHJcbiAgICAgICAgICAgIHVzZXIubmFtZSxcclxuICAgICAgICAgICAgdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgdXNlci5yb2xlID09PSAxID8gXCJBZG1pblwiIDogXCJFZGl0b3JcIixcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgICAuaW52YWxpZGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVVzZXIodXNlcikge1xyXG4gIGNvbnNvbGUubG9nKHVzZXIpO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImRlbGV0ZVVzZXJcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjdXBkYXRlVXNlclwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1kYW5nZXJcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgICAgdmFyIHQgPSAkKFwiI3VzZXJzXCIpLkRhdGFUYWJsZSgpO1xyXG4gICAgICAgIHQucm93cyhmdW5jdGlvbiAoaW5kZXgsIGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBkYXRhWzBdID09PSB1c2VyLmlkO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAucmVtb3ZlKClcclxuICAgICAgICAgIC5kcmF3KCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IGNyZWF0ZVVzZXIsIHVwZGF0ZVVzZXIsIGRlbGV0ZVVzZXIgfTtcclxuIiwiY29uc3Qge1xyXG4gIGNyZWF0ZVVzZXIsXHJcbiAgdXBkYXRlVXNlcixcclxuICBkZWxldGVVc2VyXHJcbn0gPSByZXF1aXJlKFwiLi9hamF4L3VzZXJzXCIpO1xyXG5jb25zdCB7IGhhbmRsZUxvZ2luIH0gPSByZXF1aXJlKFwiLi9hamF4L2F1dGhcIik7XHJcbmNvbnN0IHtcclxuICBjcmVhdGVBcnRpY2xlLFxyXG4gIHVwZGF0ZUFydGljbGUsXHJcbiAgZGVsZXRlQXJ0aWNsZSxcclxuICBnZXRBcnRpY2xlSW1hZ2VzLFxyXG4gIHNlbmRBcnRpY2xlVG9FbWFpbCxcclxuICBzZW5kUmVzZXJ2YXRpb25Ub0VtYWlsXHJcbn0gPSByZXF1aXJlKFwiLi9hamF4L2FydGljbGVzXCIpO1xyXG52YXIgYWxsRmlsZXMgPSBbXTtcclxudmFyIGFsbEZpbGVzRWRpdCA9IFtdO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHNhdmVVc2VyKHVzZXIpIHtcclxuICBpZiAodXNlci5pZCA9PSBudWxsKSB7XHJcbiAgICBjcmVhdGVVc2VyKHVzZXIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB1cGRhdGVVc2VyKHVzZXIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZUFydGljbGUoYXJ0aWNsZSkge1xyXG4gIGlmIChhcnRpY2xlLmlkID09IG51bGwpIHtcclxuICAgIGNyZWF0ZUFydGljbGUoYXJ0aWNsZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHVwZGF0ZUFydGljbGUoYXJ0aWNsZSk7XHJcbiAgfVxyXG59XHJcblxyXG4kKFwiLnNlbmRBcnRpY2xlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICBsZXQgYXJ0aWNsZSA9IHtcclxuICAgIE7DoXpldjogJChcIiNOw6F6ZXZcIikudmFsKCksXHJcbiAgICBQb3BpczogJChcIiNQb3Bpc1wiKS52YWwoKSxcclxuICAgIEVtYWlsOiAkKFwiI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgTG9rYWxpdGE6ICQoXCIjTG9rYWxpdGFcIikudmFsKCksXHJcbiAgICBDZW5hOiAkKFwiI0NlbmFcIikudmFsKCksXHJcbiAgfTtcclxuICBhcnRpY2xlLmZpbGVzID0gYWxsRmlsZXM7XHJcbiAgc2F2ZUFydGljbGUoYXJ0aWNsZSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuJChcIi5jcmVhdGVVc2VyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICBsZXQgdXNlciA9IHtcclxuICAgIG5hbWU6ICQoXCIuY3JlYXRlICNKbcOpbm9cIikudmFsKCksXHJcbiAgICBlbWFpbDogJChcIi5jcmVhdGUgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgcm9sZV9pZDogJChcIi5jcmVhdGUgI3JvbGVcIikudmFsKCksXHJcbiAgICBwYXNzd29yZDogJChcIi5jcmVhdGUgI0hlc2xvXCIpLnZhbCgpLFxyXG4gIH07XHJcbiAgc2F2ZVVzZXIodXNlcik7XHJcbn0pO1xyXG5cclxuJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcblxyXG5cclxuJChcIi5zZW5kUmVzZXJ2YXRpb25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBsZXQgZW1haWwgPSAkKFwiLnNlbmRSZXNlcnZhdGlvblRvRW1haWwgI0VtYWlsXCIpLnZhbCgpO1xyXG4gIGxldCBtc2cgPSAkKFwiLnNlbmRSZXNlcnZhdGlvblRvRW1haWwgI1pwcsOhdmFcIikudmFsKCk7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgZGF0YSA9IHtcclxuICAgIEVtYWlsOiBlbWFpbCxcclxuICAgIFpwcsOhdmE6IG1zZyxcclxuICB9XHJcbiAgc2VuZFJlc2VydmF0aW9uVG9FbWFpbChkYXRhKVxyXG59KTtcclxuXHJcblxyXG4kKFwiLnNlbmRBcnRpY2xlRW1haWxcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBsZXQgZW1haWwgPSAkKFwiLnNlbmRBcnRpY2xlVG9FbWFpbCAjRW1haWxcIikudmFsKCk7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgc2VuZEFydGljbGVUb0VtYWlsKGVtYWlsKVxyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICB2YXIgdGFibGUgPSAkKFwiI3VzZXJzXCIpLkRhdGFUYWJsZSh7XHJcbiAgICBsYW5ndWFnZToge1xyXG4gICAgICB1cmw6IFwiLy9jZG4uZGF0YXRhYmxlcy5uZXQvcGx1Zy1pbnMvMS4xMC4yMS9pMThuL0N6ZWNoLmpzb25cIixcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgJChcIiN1c2VycyB0Ym9keVwiKS5vbihcImNsaWNrXCIsIFwidHJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGRhdGEgPSB0YWJsZS5yb3codGhpcykuZGF0YSgpO1xyXG4gICAgJChcIi5lZGl0VXNlclwiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICQoXCIuZGVsZXRlVXNlclwiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICQoXCIjdXBkYXRlVXNlclwiKS5tb2RhbChcInNob3dcIik7XHJcbiAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICQoXCIuZWRpdCAjSm3DqW5vXCIpLnZhbChkYXRhWzFdKTtcclxuICAgICQoXCIuZWRpdCAjRW1haWxcIikudmFsKGRhdGFbMl0pO1xyXG4gICAgJChgLmVkaXQgI3JvbGUgb3B0aW9uW3ZhbHVlPSR7ZGF0YVszXX1dYCkuYXR0cihcInNlbGVjdGVkXCIsIFwic2VsZWN0ZWRcIik7XHJcblxyXG4gICAgJChcIi5lZGl0VXNlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCB1c2VyID0ge1xyXG4gICAgICAgIGlkOiBkYXRhWzBdLFxyXG4gICAgICAgIG5hbWU6ICQoXCIuZWRpdCAjSm3DqW5vXCIpLnZhbCgpLFxyXG4gICAgICAgIGVtYWlsOiAkKFwiLmVkaXQgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgICAgIHBhc3N3b3JkOiAkKFwiLmVkaXQgI0hlc2xvXCIpLnZhbCgpLFxyXG4gICAgICAgIHJvbGVfaWQ6ICQoXCIuZWRpdCAjcm9sZVwiKS52YWwoKSxcclxuICAgICAgfTtcclxuICAgICAgc2F2ZVVzZXIodXNlcik7XHJcbiAgICB9KTtcclxuICAgICQoXCIuZGVsZXRlVXNlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCB1c2VyID0ge1xyXG4gICAgICAgIGlkOiBkYXRhWzBdLFxyXG4gICAgICAgIG5hbWU6ICQoXCIuZWRpdCAjSm3DqW5vXCIpLnZhbCgpLFxyXG4gICAgICAgIGVtYWlsOiAkKFwiLmVkaXQgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgICAgIHBhc3N3b3JkOiAkKFwiLmVkaXQgI0hlc2xvXCIpLnZhbCgpLFxyXG4gICAgICAgIHJvbGVfaWQ6ICQoXCIuZWRpdCAjcm9sZVwiKS52YWwoKSxcclxuICAgICAgfTtcclxuICAgICAgZGVsZXRlVXNlcih1c2VyKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHRhYmxlID0gJChcIiNhcnRpY2xlc1wiKS5EYXRhVGFibGUoe1xyXG4gICAgbGFuZ3VhZ2U6IHtcclxuICAgICAgdXJsOiBcIi8vY2RuLmRhdGF0YWJsZXMubmV0L3BsdWctaW5zLzEuMTAuMjEvaTE4bi9DemVjaC5qc29uXCIsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gICQoXCIjYXJ0aWNsZXMgdGJvZHlcIikub24oXCJjbGlja1wiLCBcInRyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBkYXRhID0gdGFibGUucm93KHRoaXMpLmRhdGEoKTtcclxuICAgIGFsbEZpbGVzRWRpdCA9IFtdO1xyXG4gICAgJChcIi51cGRhdGVBcnRpY2xlXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgJChcIi5hbGVydFwiKS5oaWRlKClcclxuICAgICQoJyNlZGl0QXJ0aWNsZScpLm1vZGFsKCdzaG93JylcclxuICAgICAgICAvLyAuZHJhZ2dhYmxlKHsgaGFuZGxlOiBcIi5tb2RhbC1oZWFkZXJcIiB9KTtcclxuICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgbGV0IGlzQ2hlY2sgPSBkYXRhWzZdICE9PSAnTmVuw60nIDtcclxuICAgICQoXCIuZWRpdEFydGljbGUgI07DoXpldlwiKS52YWwoZGF0YVsxXSk7XHJcbiAgICAkKFwiLmVkaXRBcnRpY2xlICNQb3Bpc1wiKS52YWwoZGF0YVsyXSk7XHJcbiAgICAkKFwiLmVkaXRBcnRpY2xlICNFbWFpbFwiKS52YWwoZGF0YVs1XSk7XHJcbiAgICAkKFwiLmVkaXRBcnRpY2xlICNDZW5hXCIpLnZhbChkYXRhWzNdKTtcclxuICAgICQoXCIuZWRpdEFydGljbGUgI0xva2FsaXRhXCIpLnZhbChkYXRhWzRdKTtcclxuICAgICQoIFwiI3JlemVydmFjZVwiICkucHJvcCggXCJjaGVja2VkXCIsIGlzQ2hlY2sgKTtcclxuXHJcbiAgICBnZXRBcnRpY2xlSW1hZ2VzKGRhdGFbXCIwXCJdKTtcclxuICAgICQoXCIudXBkYXRlQXJ0aWNsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICAgICAgbGV0IGlzQ2hlY2sgPSQoXCIuZWRpdEFydGljbGUgI3JlemVydmFjZVwiKS5pcygnOmNoZWNrZWQnKSA/ICcxJyA6ICcwJztcclxuICAgICAgbGV0IGFydGljbGUgPSB7XHJcbiAgICAgICAgaWQ6IGRhdGFbMF0sXHJcbiAgICAgICAgTsOhemV2OiAkKFwiLmVkaXRBcnRpY2xlICNOw6F6ZXZcIikudmFsKCksXHJcbiAgICAgICAgUG9waXM6ICQoXCIuZWRpdEFydGljbGUgI1BvcGlzXCIpLnZhbCgpLFxyXG4gICAgICAgIEVtYWlsOiAkKFwiLmVkaXRBcnRpY2xlICNFbWFpbFwiKS52YWwoKSxcclxuICAgICAgICBMb2thbGl0YTogJChcIi5lZGl0QXJ0aWNsZSAjTG9rYWxpdGFcIikudmFsKCksXHJcbiAgICAgICAgQ2VuYTogJChcIi5lZGl0QXJ0aWNsZSAjQ2VuYVwiKS52YWwoKSxcclxuICAgICAgICByZXplcnZhY2U6IGlzQ2hlY2ssXHJcbiAgICAgIH07XHJcbiAgICAgIGFydGljbGUuZmlsZXMgPSBhbGxGaWxlc0VkaXQ7XHJcbiAgICAgIHNhdmVBcnRpY2xlKGFydGljbGUpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuJChcIi5sb2dpblN1Ym1pdFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgbGV0IHVzZXIgPSB7XHJcbiAgICBlbWFpbDogJChcIi5sb2dpblVzZXIgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgcGFzc3dvcmQ6ICQoXCIubG9naW5Vc2VyICNIZXNsb1wiKS52YWwoKSxcclxuICAgIHRva2VuOiAkKFwiLmxvZ2luVXNlciAjdG9rZW5cIikudmFsKCksXHJcbiAgfTtcclxuICBoYW5kbGVMb2dpbih1c2VyKTtcclxufSk7XHJcblxyXG4kKFwiLmRlbGV0ZUFydGljbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gIGxldCB1c2VyID0ge1xyXG4gICAgZW1haWw6ICQoXCIubG9naW5Vc2VyICNFbWFpbFwiKS52YWwoKSxcclxuICAgIHBhc3N3b3JkOiAkKFwiLmxvZ2luVXNlciAjSGVzbG9cIikudmFsKCksXHJcbiAgICB0b2tlbjogJChcIi5sb2dpblVzZXIgI3Rva2VuXCIpLnZhbCgpLFxyXG4gIH07XHJcbiAgZGVsZXRlQXJ0aWNsZSh1c2VyKTtcclxufSk7XHJcblxyXG5cclxuJChcIi51cGxvYWRBcnRpY2xlSW1hZ2VzXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlXCIpLmNsaWNrKCk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlXCIpLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVcIikuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlcyhmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlcyhmaWxlcyk7XHJcbiAgfTtcclxufSk7XHJcblxyXG4kKFwiLnVwbG9hZEFydGljbGVJbWFnZXNFZGl0XCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlZWRpdFwiKS5jbGljaygpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZWVkaXRcIikub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmaWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZWVkaXRcIikuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlc0VkaXQoZmlsZXMpO1xyXG4gICAgaGFuZGxlRmlsZXNFZGl0KGZpbGVzKTtcclxuICB9O1xyXG59KTtcclxuXHJcbiQoXCIuZHJvcEFydGljbGVJbWFnZXNcIilcclxuICAgIC5iaW5kKFwiZHJhZ2VudGVyIGRyYWdvdmVyXCIsIGZhbHNlKVxyXG4gICAgLmJpbmQoXCJkcm9wXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgbGV0IGR0ID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlcjtcclxuICAgICAgbGV0IGZpbGVzID0gZHQuZmlsZXM7XHJcbiAgICAgIGZpbGVzID0gcmVuZGVySW1hZ2VzKGZpbGVzKTtcclxuICAgICAgaGFuZGxlRmlsZXMoZmlsZXMpO1xyXG4gICAgfSk7XHJcblxyXG4kKFwiLmRyb3BBcnRpY2xlSW1hZ2VzRWRpdFwiKVxyXG4gICAgLmJpbmQoXCJkcmFnZW50ZXIgZHJhZ292ZXJcIiwgZmFsc2UpXHJcbiAgICAuYmluZChcImRyb3BcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBsZXQgZHQgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyO1xyXG4gICAgICBsZXQgZmlsZXMgPSBkdC5maWxlcztcclxuICAgICAgZmlsZXMgPSByZW5kZXJJbWFnZXNFZGl0KGZpbGVzKTtcclxuICAgICAgaGFuZGxlRmlsZXNFZGl0KGZpbGVzKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUZpbGVzKGZpbGVzKSB7XHJcbiAgZm9yIChsZXQgW2luZGV4LCBmaWxlXSBvZiBPYmplY3QuZW50cmllcyhmaWxlcykpIHtcclxuICAgIGFsbEZpbGVzLnB1c2goZmlsZSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVGaWxlc0VkaXQoZmlsZXMpIHtcclxuICBmb3IgKGxldCBbaW5kZXgsIGZpbGVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbGVzKSkge1xyXG4gICAgYWxsRmlsZXNFZGl0LnB1c2goZmlsZSk7XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyhhbGxGaWxlc0VkaXQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJJbWFnZXMoZmlsZXMpIHtcclxuICBjb25zb2xlLmxvZyhmaWxlcyk7XHJcbiAgZm9yIChsZXQgW2luZGV4LCBmaWxlXSBvZiBPYmplY3QuZW50cmllcyhmaWxlcykpIHtcclxuICAgIHZhciB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLmNsYXNzTmFtZSA9IFwicHJldmlld0ltYWdlXCI7XHJcbiAgICBpbWcub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgYWxlcnQoXCJQcmF2ZMSbcG9kb2JuxJsgbmVwb2Rwb3JvdmFuw70gdHlwIG9icsOhemt1LlwiKTtcclxuICAgIH07XHJcbiAgICBpbWcuc3JjID0gdXJsO1xyXG5cclxuICAgIHZhciBudW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgbnVtYmVyLnRvU3RyaW5nKDM2KTtcclxuICAgIHZhciBpZCA9IG51bWJlci50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpO1xyXG4gICAgaW1nLmlkID0gaWQ7XHJcbiAgICBmaWxlLmlkID0gaWQ7XHJcbiAgICAkKFwiLmRyb3BBcnRpY2xlUHJldmlld1wiKS5hcHBlbmQoaW1nKTtcclxuICAgICQoXCIucHJldmlld0ltYWdlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgIGluZGV4ID0gYWxsRmlsZXMuZmluZEluZGV4KChmaWxlKSA9PiBmaWxlLmlkID09PSBpZCk7XHJcbiAgICAgIGFsbEZpbGVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICQoYCMke2lkfWApLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBmaWxlcztcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckltYWdlc0VkaXQoZmlsZXMpIHtcclxuICBjb25zb2xlLmxvZyhmaWxlcyk7XHJcbiAgZm9yIChsZXQgW2luZGV4LCBmaWxlXSBvZiBPYmplY3QuZW50cmllcyhmaWxlcykpIHtcclxuICAgIHZhciB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLmNsYXNzTmFtZSA9IFwicHJldmlld0ltYWdlRWRpdFwiO1xyXG4gICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGFsZXJ0KFwiUHJhdmTEm3BvZG9ibsSbIG5lcG9kcG9yb3ZhbsO9IHR5cCBvYnLDoXprdS5cIik7XHJcbiAgICB9O1xyXG4gICAgaW1nLnNyYyA9IHVybDtcclxuXHJcbiAgICB2YXIgbnVtYmVyID0gTWF0aC5yYW5kb20oKTtcclxuICAgIG51bWJlci50b1N0cmluZygzNik7XHJcbiAgICB2YXIgaWQgPSBudW1iZXIudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcclxuICAgIGltZy5pZCA9IGlkO1xyXG4gICAgZmlsZS5pZCA9IGlkO1xyXG4gICAgJChcIi5kcm9wQXJ0aWNsZVByZXZpZXdJbWFnZXNcIikuYXBwZW5kKGltZyk7XHJcbiAgICAkKFwiLnByZXZpZXdJbWFnZUVkaXRcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgaW5kZXggPSBhbGxGaWxlc0VkaXQuZmluZEluZGV4KChmaWxlKSA9PiBmaWxlLmlkID09PSBpZCk7XHJcbiAgICAgIGFsbEZpbGVzRWRpdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAkKGAjJHtpZH1gKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICByZXR1cm4gZmlsZXM7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==