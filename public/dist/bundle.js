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
            formatter.format(article.Cena),
            article.Lokalita,
            article.Email,
            (article.rezervace = "Není"),
            "<div style='cursor:pointer' class='editArticleEvent'><i class=\"fas fa-edit\"></i></div>",
          ])
          .draw(false);
      }
    },
  });
}
const formatter = new Intl.NumberFormat('cs', {
  style: 'currency',
  currency: 'czk',
  minimumFractionDigits: 0,
})

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
            formatter.format(article.Cena),
            article.Lokalita,
            article.Email,
            article.rezervace == 0 ? "Není" : "Již rezervován",
            "<div style='cursor:pointer' class='editArticleEvent'><i class=\"fas fa-edit\"></i></div>",
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
            '<div style="cursor:pointer" class="editUserEvent"><i class="fas fa-edit"></i></div>',
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
            '<div style="cursor:pointer" class="editUserEvent"><i class="fas fa-edit"></i></div>',
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
      } else if(res['errors2']) {
        $(".error").show();
        $(`#errJméno`).text(res.errors2);
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
  let name = $(".sendReservationToEmail #Jméno").val();
  e.preventDefault();
  e.stopPropagation();
  let data = {
    Email: email,
    Zpráva: msg,
    Jméno: name,
  };
  sendReservationToEmail(data);
});

// Gallery image hover
$( ".img-wrapper" ).hover(
    function() {
      $(this).find(".img-overlay").animate({opacity: 1}, 600);
    }, function() {
      $(this).find(".img-overlay").animate({opacity: 0}, 600);
    }
);

// Lightbox
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');

// Add overlay
$overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
$("#gallery").append($overlay);

// Hide overlay on default
$overlay.hide();

// When an image is clicked
$(".img-overlay").click(function(event) {
  // Prevents default behavior
  event.preventDefault();
  // Adds href attribute to variable
  var imageLocation = $(this).prev().attr("href");
  // Add the image src to $image
  $image.attr("src", imageLocation);
  // Fade in the overlay
  $overlay.fadeIn("slow");
});

// When the overlay is clicked
$overlay.click(function() {
  // Fade out the overlay
  $(this).fadeOut("slow");
});

// When next button is clicked
$nextButton.click(function(event) {
  $("#overlay img").hide();
  var $currentImgSrc = $("#overlay img").attr("src");
  var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
  var $nextImg = $($currentImg.closest(".image").next().find("img"));
  var $images = $("#image-gallery img");
  if ($nextImg.length > 0) {
    $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
  } else {
    $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
  }
  event.stopPropagation();
});

$prevButton.click(function(event) {
  $("#overlay img").hide();
  var $currentImgSrc = $("#overlay img").attr("src");
  var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
  var $nextImg = $($currentImg.closest(".image").prev().find("img"));
  $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
  event.stopPropagation();
});

$exitButton.click(function() {
  $("#overlay").fadeOut("slow");
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
});

$(document).on("click", ".editUserEvent",   function (event) {
  let $obj = $(event.currentTarget);
  let $row = $obj.closest('tr');
  let id =  $('.userID', $row).text();
  $(".alert").hide();
  var t = $("#users").DataTable();
  let rowId = $("#users")
      .dataTable()
      .fnFindCellRowIndexes(id, 0);
  let data = t.row(rowId).data()
  $(".alert").hide();
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

$(document).on('click', '.editArticleEvent', function (e) {
  $(".alert").hide();
  var t = $("#articles").DataTable();
  let rowId = $("#articles")
      .dataTable()
      .fnFindCellRowIndexes(this.id, 0);
  let data = t.row(rowId).data()
  $(".updateArticle").unbind("click");
  $(".deleteArticle").unbind("click");
  $(".alert").hide();
  $("#editArticle").modal("show");
  $(".error").hide();
  let isCheck = data[6] != "Není";
  let price = data[3];
  let resPrice = price.replace('Kč', '',).split(' ').join('');
  let result = resPrice.replaceAll('&nbsp;', '');
  $(".editArticle #Název").val(data[1]);
  $(".editArticle #Popis").val(data[2]);
  $(".editArticle #Email").val(data[5]);
  $(".editArticle #Cena").val(result);
  $(".editArticle #Lokalita").val(data[4]);
  if(isCheck) {
    $("#rezervace").show();
    $("#rezervaceCheck").prop("checked", true);
  } else {
    $("#rezervace").hide();

  }
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
})
$(document).ready(function () {
  var table = $("#articles").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Czech.json",
    },
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
    let ext = getExt(file.name);
    if(validExtensions.includes(ext)) {
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
    } else {
      alert("Pravděpodobně nepodporovaný typ obrázku.");
      files = 0;
      return files;
    }
  }
  return files;
}
var validExtensions = ['jpg','png','jpeg'];

function renderImagesEdit(files) {
  for (let [index, file] of Object.entries(files)) {
    let ext = getExt(file.name);
    console.log(ext)
    console.log(validExtensions.includes(ext));
    if(validExtensions.includes(ext)) {
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
    } else {
      alert("Pravděpodobně nepodporovaný typ obrázku.");
      files = 0;
      return files;
    }
  }
  return files;
}

function getExt(filename)
{
  var ext = filename.split('.').pop();
  if(ext == filename) return "";
  return ext;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC9hcnRpY2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hamF4L2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC91c2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSxhQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsTUFBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0Q0FBNEM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUywyREFBMkQsU0FBUyxhQUFhO0FBQ3JIO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxNQUFNO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLEdBQUc7QUFDakI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEIsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCOzs7Ozs7Ozs7Ozs7QUN4Q2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4QjtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBLGtCQUFrQjs7Ozs7Ozs7Ozs7OztBQ25JbEIsT0FBTyxxQ0FBcUMsR0FBRyxtQkFBTyxDQUFDLGlEQUFjO0FBQ3JFLE9BQU8sY0FBYyxHQUFHLG1CQUFPLENBQUMsK0NBQWE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEdBQUcsbUJBQU8sQ0FBQyx1REFBaUI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsV0FBVztBQUN2RCxLQUFLO0FBQ0wsNENBQTRDLFdBQVc7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsUUFBUTs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxHQUFHO0FBQ2pCLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLEdBQUc7QUFDakIsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmNsdWRlcy9qcy9hcHAuanNcIik7XG4iLCJmdW5jdGlvbiBjcmVhdGVBcnRpY2xlKGFydGljbGUpIHtcclxuICBsZXQgZmQgPSBuZXcgRm9ybURhdGEoKTtcclxuICBmb3IgKGkgPSAwOyBpIDwgYXJ0aWNsZS5maWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgZmQuYXBwZW5kKFwiZmlsZVtdXCIsIGFydGljbGUuZmlsZXNbaV0pO1xyXG4gIH1cclxuICBmZC5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KGFydGljbGUpKTtcclxuICBmZC5hcHBlbmQoXCJtZXRob2RcIiwgXCJhZGRBcnRpY2xlXCIpO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIHVybDogXCJhamF4LnBocFwiLFxyXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgZGF0YTogZmQsXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7aW5wdXR9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjYWRkQXJ0aWNsZVwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIHZhciB0ID0gJChcIiNhcnRpY2xlc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICBhcnRpY2xlID0gcmVzLmFydGljbGU7XHJcbiAgICAgICAgdC5yb3dcclxuICAgICAgICAgIC5hZGQoW1xyXG4gICAgICAgICAgICBhcnRpY2xlLmlkLFxyXG4gICAgICAgICAgICBhcnRpY2xlLk7DoXpldixcclxuICAgICAgICAgICAgYXJ0aWNsZS5Qb3BpcyxcclxuICAgICAgICAgICAgZm9ybWF0dGVyLmZvcm1hdChhcnRpY2xlLkNlbmEpLFxyXG4gICAgICAgICAgICBhcnRpY2xlLkxva2FsaXRhLFxyXG4gICAgICAgICAgICBhcnRpY2xlLkVtYWlsLFxyXG4gICAgICAgICAgICAoYXJ0aWNsZS5yZXplcnZhY2UgPSBcIk5lbsOtXCIpLFxyXG4gICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2N1cnNvcjpwb2ludGVyJyBjbGFzcz0nZWRpdEFydGljbGVFdmVudCc+PGkgY2xhc3M9XFxcImZhcyBmYS1lZGl0XFxcIj48L2k+PC9kaXY+XCIsXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgICAgLmRyYXcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcbmNvbnN0IGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCgnY3MnLCB7XHJcbiAgc3R5bGU6ICdjdXJyZW5jeScsXHJcbiAgY3VycmVuY3k6ICdjemsnLFxyXG4gIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMCxcclxufSlcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUFydGljbGUoYXJ0aWNsZSkge1xyXG4gIGxldCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIGZvciAoaSA9IDA7IGkgPCBhcnRpY2xlLmZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBmZC5hcHBlbmQoXCJmaWxlW11cIiwgYXJ0aWNsZS5maWxlc1tpXSk7XHJcbiAgfVxyXG4gIGZkLmFwcGVuZChcImRhdGFcIiwgSlNPTi5zdHJpbmdpZnkoYXJ0aWNsZSkpO1xyXG4gIGZkLmFwcGVuZChcIm1ldGhvZFwiLCBcInVwZGF0ZUFydGljbGVcIik7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgdXJsOiBcImFqYXgucGhwXCIsXHJcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICBkYXRhOiBmZCxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtpbnB1dH1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiNlZGl0QXJ0aWNsZVwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIHZhciB0ID0gJChcIiNhcnRpY2xlc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICBsZXQgcm93SWQgPSAkKFwiI2FydGljbGVzXCIpXHJcbiAgICAgICAgICAuZGF0YVRhYmxlKClcclxuICAgICAgICAgIC5mbkZpbmRDZWxsUm93SW5kZXhlcyhhcnRpY2xlLmlkLCAwKTtcclxuICAgICAgICB0LnJvdyhyb3dJZClcclxuICAgICAgICAgIC5kYXRhKFtcclxuICAgICAgICAgICAgYXJ0aWNsZS5pZCxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Ow6F6ZXYsXHJcbiAgICAgICAgICAgIGFydGljbGUuUG9waXMsXHJcbiAgICAgICAgICAgIGZvcm1hdHRlci5mb3JtYXQoYXJ0aWNsZS5DZW5hKSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Mb2thbGl0YSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5FbWFpbCxcclxuICAgICAgICAgICAgYXJ0aWNsZS5yZXplcnZhY2UgPT0gMCA/IFwiTmVuw61cIiA6IFwiSmnFviByZXplcnZvdsOhblwiLFxyXG4gICAgICAgICAgICBcIjxkaXYgc3R5bGU9J2N1cnNvcjpwb2ludGVyJyBjbGFzcz0nZWRpdEFydGljbGVFdmVudCc+PGkgY2xhc3M9XFxcImZhcyBmYS1lZGl0XFxcIj48L2k+PC9kaXY+XCIsXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgICAgLmludmFsaWRhdGUoKTtcclxuICAgICAgICBhcnRpY2xlID0gcmVzLmFydGljbGU7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXJ0aWNsZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZUFydGljbGUoYXJ0aWNsZSkge1xyXG4gIGNvbnNvbGUubG9nKGFydGljbGUpO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImRlbGV0ZUFydGljbGVcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYXJ0aWNsZSksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbbmFtZSwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjZWRpdEFydGljbGVcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtZGFuZ2VyXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIHZhciB0ID0gJChcIiNhcnRpY2xlc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICB0LnJvd3MoZnVuY3Rpb24gKGluZGV4LCBkYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gZGF0YVswXSA9PT0gYXJ0aWNsZS5pZDtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgLnJlbW92ZSgpXHJcbiAgICAgICAgICAuZHJhdygpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFydGljbGVJbWFnZXMoYXJ0aWNsZUlkKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgdXJsOiBcImFqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7IGlkOiBhcnRpY2xlSWQsIG1ldGhvZDogXCJnZXRBcnRpY2xlSW1hZ2VzXCIgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIucHJldmlld0ltYWdlRWRpdFwiKS5yZW1vdmUoKTtcclxuICAgICAgICB2YXIgaW1hZ2VzID0gcmVzLmltYWdlcztcclxuICAgICAgICBpbWFnZXMubWFwKChpbWFnZSkgPT4ge1xyXG4gICAgICAgICAgJChcIi5kcm9wQXJ0aWNsZVByZXZpZXdJbWFnZXNcIikucHJlcGVuZChcclxuICAgICAgICAgICAgYDxpbWcgaWQ9XCJpbWcke2ltYWdlLmlkfVwiIGNsYXNzPVwicHJldmlld0ltYWdlRWRpdCBkZWxldGVJbWFnZVwiIHNyYz1cImRhdGE6aW1hZ2UvanBnO2Jhc2U2NCwke2ltYWdlLmJhc2U2NH0gXCIgLz5gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuZGVsZXRlSW1hZ2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgaWYgKGNvbmZpcm0oXCJDaGNldGUgdsOhxb5uxJsgb2RzdHJhbml0IG9icsOhemVrIHogZGF0YWLDoXplP1wiKSkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICAgICAgZGVsZXRlSW1hZ2UoaWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kQXJ0aWNsZVRvRW1haWwoZW1haWwpIHtcclxuICBsZXQgYXJ0aWNsZUlkID0gbG9jYXRpb24uc2VhcmNoLnNwbGl0KFwiaWQ9XCIpWzFdO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcInNlbmRBcnRpY2xlVG9FbWFpbFwiLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgIGlkOiBhcnRpY2xlSWQsXHJcbiAgICAgIH0pLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgLnNlbmRBcnRpY2xlVG9FbWFpbCAjZXJyJHtpbnB1dH1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiNzZW5kQXJ0aWNsZU9uRW1haWxcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kUmVzZXJ2YXRpb25Ub0VtYWlsKGRhdGEpIHtcclxuICBkYXRhLmlkID0gbG9jYXRpb24uc2VhcmNoLnNwbGl0KFwiaWQ9XCIpWzFdO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcInNlbmRSZXNlcnZhdGlvblRvT3duZXJcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtpbnB1dH1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiNhZGRSZXNlcnZhdGlvblwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZUltYWdlKGlkKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwiZGVsZXRlSW1hZ2VcIixcclxuICAgICAgaW1hZ2VJZDogaWQsXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlcy5lcnJvcnMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyb3JzKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAkKFwiLmVkaXRhbGVydC1kYW5nZXJcIikuc2hvdygpLnRleHQocmVzLnN1Y2Nlc3MpO1xyXG4gICAgICAgICQoYCMke2lkfWApLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgY3JlYXRlQXJ0aWNsZSxcclxuICB1cGRhdGVBcnRpY2xlLFxyXG4gIGRlbGV0ZUFydGljbGUsXHJcbiAgZ2V0QXJ0aWNsZUltYWdlcyxcclxuICBzZW5kQXJ0aWNsZVRvRW1haWwsXHJcbiAgc2VuZFJlc2VydmF0aW9uVG9FbWFpbCxcclxufTtcclxuIiwiY29uc3QgY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2UgPSB7XHJcbiAgbmFtZTogXCJKbcOpbm9cIixcclxuICBlbWFpbDogXCJFbWFpbFwiLFxyXG4gIHJvbGVfaWQ6IFwiUm9saVwiLFxyXG4gIHBhc3N3b3JkOiBcIkhlc2xvXCIsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVMb2dpbih1c2VyKSB7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwiaGFuZGxlTG9naW5cIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnNob3cobXNnKTtcclxuICAgICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgIGlmKHJlcy51c2VyLnJvbGVfaWQgPT09IFwiMVwiKSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLz9wYWdlPXVzZXJzXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvP3BhZ2U9ZWRpdEFydGljbGVzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBoYW5kbGVMb2dpbiB9O1xyXG4iLCJjb25zdCBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZSA9IHtcclxuICBuYW1lOiBcIkptw6lub1wiLFxyXG4gIGVtYWlsOiBcIkVtYWlsXCIsXHJcbiAgcm9sZV9pZDogXCJSb2xpXCIsXHJcbiAgcGFzc3dvcmQ6IFwiSGVzbG9cIixcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVVzZXIodXNlcikge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImFkZFVzZXJcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjYWRkVXNlclwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIHZhciB0ID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICB2YXIgY291bnRlciA9IDE7XHJcbiAgICAgICAgdXNlciA9IHJlcy51c2VyO1xyXG4gICAgICAgIHQucm93XHJcbiAgICAgICAgICAuYWRkKFtcclxuICAgICAgICAgICAgdXNlci5pZCxcclxuICAgICAgICAgICAgdXNlci5uYW1lLFxyXG4gICAgICAgICAgICB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICB1c2VyLnJvbGVzX2lkID09IDEgPyBcIkFkbWluXCIgOiBcIkVkaXRvclwiLFxyXG4gICAgICAgICAgICAnPGRpdiBzdHlsZT1cImN1cnNvcjpwb2ludGVyXCIgY2xhc3M9XCJlZGl0VXNlckV2ZW50XCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdFwiPjwvaT48L2Rpdj4nLFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICAgIC5kcmF3KGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVVc2VyKHVzZXIpIHtcclxuICB1c2VyLnJvbGVfaWQgPSB1c2VyLnJvbGVfaWQgPT0gXCJBZG1pblwiID8gMSA6IDI7XHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgdXJsOiBcIi9hamF4LnBocFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwidXBkYXRlVXNlclwiLFxyXG4gICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICBsZXQgbmFtZSA9IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlW2lucHV0XTtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7bmFtZX1gKS50ZXh0KG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgcmVzLnVzZXIgPSB1c2VyO1xyXG4gICAgICAgICQoXCIjdXBkYXRlVXNlclwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1zdWNjZXNzXCIpLnNob3coKS50ZXh0KHJlc1tcInN1Y2Nlc3NcIl0pO1xyXG4gICAgICAgIGxldCB0ID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoKTtcclxuICAgICAgICBsZXQgcm93SWQgPSAkKFwiI3VzZXJzXCIpLmRhdGFUYWJsZSgpLmZuRmluZENlbGxSb3dJbmRleGVzKHVzZXIuaWQsIDApO1xyXG4gICAgICAgIHQucm93KHJvd0lkKVxyXG4gICAgICAgICAgLmRhdGEoW1xyXG4gICAgICAgICAgICB1c2VyLmlkLFxyXG4gICAgICAgICAgICB1c2VyLm5hbWUsXHJcbiAgICAgICAgICAgIHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIHVzZXIucm9sZV9pZCA9PSAxID8gXCJBZG1pblwiIDogXCJFZGl0b3JcIixcclxuICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiIGNsYXNzPVwiZWRpdFVzZXJFdmVudFwiPjxpIGNsYXNzPVwiZmFzIGZhLWVkaXRcIj48L2k+PC9kaXY+JyxcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgICAuaW52YWxpZGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coeGhyLCBzdGF0dXMsIGVycm9yKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVVzZXIodXNlcikge1xyXG4gIGNvbnNvbGUubG9nKHVzZXIpO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImRlbGV0ZVVzZXJcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmKHJlc1snZXJyb3JzMiddKSB7XHJcbiAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgJChgI2Vyckptw6lub2ApLnRleHQocmVzLmVycm9yczIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNbXCJzdWNjZXNzXCJdKSB7XHJcbiAgICAgICAgJChcIiN1cGRhdGVVc2VyXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LWRhbmdlclwiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgdC5yb3dzKGZ1bmN0aW9uIChpbmRleCwgZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGFbMF0gPT09IHVzZXIuaWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgIC5yZW1vdmUoKVxyXG4gICAgICAgICAgLmRyYXcoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgY3JlYXRlVXNlciwgdXBkYXRlVXNlciwgZGVsZXRlVXNlciB9O1xyXG4iLCJcclxuY29uc3QgeyBjcmVhdGVVc2VyLCB1cGRhdGVVc2VyLCBkZWxldGVVc2VyIH0gPSByZXF1aXJlKFwiLi9hamF4L3VzZXJzXCIpO1xyXG5jb25zdCB7IGhhbmRsZUxvZ2luIH0gPSByZXF1aXJlKFwiLi9hamF4L2F1dGhcIik7XHJcbmNvbnN0IHtcclxuICBjcmVhdGVBcnRpY2xlLFxyXG4gIHVwZGF0ZUFydGljbGUsXHJcbiAgZGVsZXRlQXJ0aWNsZSxcclxuICBnZXRBcnRpY2xlSW1hZ2VzLFxyXG4gIHNlbmRBcnRpY2xlVG9FbWFpbCxcclxuICBzZW5kUmVzZXJ2YXRpb25Ub0VtYWlsLFxyXG59ID0gcmVxdWlyZShcIi4vYWpheC9hcnRpY2xlc1wiKTtcclxudmFyIGFsbEZpbGVzID0gW107XHJcbnZhciBhbGxGaWxlc0VkaXQgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIHNhdmVVc2VyKHVzZXIpIHtcclxuICBpZiAodXNlci5pZCA9PSBudWxsKSB7XHJcbiAgICBjcmVhdGVVc2VyKHVzZXIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB1cGRhdGVVc2VyKHVzZXIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZUFydGljbGUoYXJ0aWNsZSkge1xyXG4gIGlmIChhcnRpY2xlLmlkID09IG51bGwpIHtcclxuICAgIGNyZWF0ZUFydGljbGUoYXJ0aWNsZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHVwZGF0ZUFydGljbGUoYXJ0aWNsZSk7XHJcbiAgfVxyXG59XHJcblxyXG4kKFwiLnNlbmRBcnRpY2xlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICBsZXQgYXJ0aWNsZSA9IHtcclxuICAgIE7DoXpldjogJChcIiNOw6F6ZXZcIikudmFsKCksXHJcbiAgICBQb3BpczogJChcIiNQb3Bpc1wiKS52YWwoKSxcclxuICAgIEVtYWlsOiAkKFwiI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgTG9rYWxpdGE6ICQoXCIjTG9rYWxpdGFcIikudmFsKCksXHJcbiAgICBDZW5hOiAkKFwiI0NlbmFcIikudmFsKCksXHJcbiAgfTtcclxuICBhcnRpY2xlLmZpbGVzID0gYWxsRmlsZXM7XHJcbiAgc2F2ZUFydGljbGUoYXJ0aWNsZSk7XHJcbn0pO1xyXG5cclxuJChcIi5jcmVhdGVVc2VyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICBsZXQgdXNlciA9IHtcclxuICAgIG5hbWU6ICQoXCIuY3JlYXRlICNKbcOpbm9cIikudmFsKCksXHJcbiAgICBlbWFpbDogJChcIi5jcmVhdGUgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgcm9sZV9pZDogJChcIi5jcmVhdGUgI3JvbGVcIikudmFsKCksXHJcbiAgICBwYXNzd29yZDogJChcIi5jcmVhdGUgI0hlc2xvXCIpLnZhbCgpLFxyXG4gIH07XHJcbiAgc2F2ZVVzZXIodXNlcik7XHJcbn0pO1xyXG5cclxuJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcblxyXG4kKFwiLnNlbmRSZXNlcnZhdGlvblwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gIGxldCBlbWFpbCA9ICQoXCIuc2VuZFJlc2VydmF0aW9uVG9FbWFpbCAjRW1haWxcIikudmFsKCk7XHJcbiAgbGV0IG1zZyA9ICQoXCIuc2VuZFJlc2VydmF0aW9uVG9FbWFpbCAjWnByw6F2YVwiKS52YWwoKTtcclxuICBsZXQgbmFtZSA9ICQoXCIuc2VuZFJlc2VydmF0aW9uVG9FbWFpbCAjSm3DqW5vXCIpLnZhbCgpO1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIGxldCBkYXRhID0ge1xyXG4gICAgRW1haWw6IGVtYWlsLFxyXG4gICAgWnByw6F2YTogbXNnLFxyXG4gICAgSm3DqW5vOiBuYW1lLFxyXG4gIH07XHJcbiAgc2VuZFJlc2VydmF0aW9uVG9FbWFpbChkYXRhKTtcclxufSk7XHJcblxyXG4vLyBHYWxsZXJ5IGltYWdlIGhvdmVyXHJcbiQoIFwiLmltZy13cmFwcGVyXCIgKS5ob3ZlcihcclxuICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAkKHRoaXMpLmZpbmQoXCIuaW1nLW92ZXJsYXlcIikuYW5pbWF0ZSh7b3BhY2l0eTogMX0sIDYwMCk7XHJcbiAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS5maW5kKFwiLmltZy1vdmVybGF5XCIpLmFuaW1hdGUoe29wYWNpdHk6IDB9LCA2MDApO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuLy8gTGlnaHRib3hcclxudmFyICRvdmVybGF5ID0gJCgnPGRpdiBpZD1cIm92ZXJsYXlcIj48L2Rpdj4nKTtcclxudmFyICRpbWFnZSA9ICQoXCI8aW1nPlwiKTtcclxudmFyICRwcmV2QnV0dG9uID0gJCgnPGRpdiBpZD1cInByZXZCdXR0b25cIj48aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tbGVmdFwiPjwvaT48L2Rpdj4nKTtcclxudmFyICRuZXh0QnV0dG9uID0gJCgnPGRpdiBpZD1cIm5leHRCdXR0b25cIj48aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+PC9kaXY+Jyk7XHJcbnZhciAkZXhpdEJ1dHRvbiA9ICQoJzxkaXYgaWQ9XCJleGl0QnV0dG9uXCI+PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT48L2Rpdj4nKTtcclxuXHJcbi8vIEFkZCBvdmVybGF5XHJcbiRvdmVybGF5LmFwcGVuZCgkaW1hZ2UpLnByZXBlbmQoJHByZXZCdXR0b24pLmFwcGVuZCgkbmV4dEJ1dHRvbikuYXBwZW5kKCRleGl0QnV0dG9uKTtcclxuJChcIiNnYWxsZXJ5XCIpLmFwcGVuZCgkb3ZlcmxheSk7XHJcblxyXG4vLyBIaWRlIG92ZXJsYXkgb24gZGVmYXVsdFxyXG4kb3ZlcmxheS5oaWRlKCk7XHJcblxyXG4vLyBXaGVuIGFuIGltYWdlIGlzIGNsaWNrZWRcclxuJChcIi5pbWctb3ZlcmxheVwiKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gIC8vIFByZXZlbnRzIGRlZmF1bHQgYmVoYXZpb3JcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIC8vIEFkZHMgaHJlZiBhdHRyaWJ1dGUgdG8gdmFyaWFibGVcclxuICB2YXIgaW1hZ2VMb2NhdGlvbiA9ICQodGhpcykucHJldigpLmF0dHIoXCJocmVmXCIpO1xyXG4gIC8vIEFkZCB0aGUgaW1hZ2Ugc3JjIHRvICRpbWFnZVxyXG4gICRpbWFnZS5hdHRyKFwic3JjXCIsIGltYWdlTG9jYXRpb24pO1xyXG4gIC8vIEZhZGUgaW4gdGhlIG92ZXJsYXlcclxuICAkb3ZlcmxheS5mYWRlSW4oXCJzbG93XCIpO1xyXG59KTtcclxuXHJcbi8vIFdoZW4gdGhlIG92ZXJsYXkgaXMgY2xpY2tlZFxyXG4kb3ZlcmxheS5jbGljayhmdW5jdGlvbigpIHtcclxuICAvLyBGYWRlIG91dCB0aGUgb3ZlcmxheVxyXG4gICQodGhpcykuZmFkZU91dChcInNsb3dcIik7XHJcbn0pO1xyXG5cclxuLy8gV2hlbiBuZXh0IGJ1dHRvbiBpcyBjbGlja2VkXHJcbiRuZXh0QnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgJChcIiNvdmVybGF5IGltZ1wiKS5oaWRlKCk7XHJcbiAgdmFyICRjdXJyZW50SW1nU3JjID0gJChcIiNvdmVybGF5IGltZ1wiKS5hdHRyKFwic3JjXCIpO1xyXG4gIHZhciAkY3VycmVudEltZyA9ICQoJyNpbWFnZS1nYWxsZXJ5IGltZ1tzcmM9XCInICsgJGN1cnJlbnRJbWdTcmMgKyAnXCJdJyk7XHJcbiAgdmFyICRuZXh0SW1nID0gJCgkY3VycmVudEltZy5jbG9zZXN0KFwiLmltYWdlXCIpLm5leHQoKS5maW5kKFwiaW1nXCIpKTtcclxuICB2YXIgJGltYWdlcyA9ICQoXCIjaW1hZ2UtZ2FsbGVyeSBpbWdcIik7XHJcbiAgaWYgKCRuZXh0SW1nLmxlbmd0aCA+IDApIHtcclxuICAgICQoXCIjb3ZlcmxheSBpbWdcIikuYXR0cihcInNyY1wiLCAkbmV4dEltZy5hdHRyKFwic3JjXCIpKS5mYWRlSW4oODAwKTtcclxuICB9IGVsc2Uge1xyXG4gICAgJChcIiNvdmVybGF5IGltZ1wiKS5hdHRyKFwic3JjXCIsICQoJGltYWdlc1swXSkuYXR0cihcInNyY1wiKSkuZmFkZUluKDgwMCk7XHJcbiAgfVxyXG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG59KTtcclxuXHJcbiRwcmV2QnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgJChcIiNvdmVybGF5IGltZ1wiKS5oaWRlKCk7XHJcbiAgdmFyICRjdXJyZW50SW1nU3JjID0gJChcIiNvdmVybGF5IGltZ1wiKS5hdHRyKFwic3JjXCIpO1xyXG4gIHZhciAkY3VycmVudEltZyA9ICQoJyNpbWFnZS1nYWxsZXJ5IGltZ1tzcmM9XCInICsgJGN1cnJlbnRJbWdTcmMgKyAnXCJdJyk7XHJcbiAgdmFyICRuZXh0SW1nID0gJCgkY3VycmVudEltZy5jbG9zZXN0KFwiLmltYWdlXCIpLnByZXYoKS5maW5kKFwiaW1nXCIpKTtcclxuICAkKFwiI292ZXJsYXkgaW1nXCIpLmF0dHIoXCJzcmNcIiwgJG5leHRJbWcuYXR0cihcInNyY1wiKSkuZmFkZUluKDgwMCk7XHJcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbn0pO1xyXG5cclxuJGV4aXRCdXR0b24uY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgJChcIiNvdmVybGF5XCIpLmZhZGVPdXQoXCJzbG93XCIpO1xyXG59KTtcclxuXHJcblxyXG4kKFwiLnNlbmRBcnRpY2xlRW1haWxcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBsZXQgZW1haWwgPSAkKFwiLnNlbmRBcnRpY2xlVG9FbWFpbCAjRW1haWxcIikudmFsKCk7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgc2VuZEFydGljbGVUb0VtYWlsKGVtYWlsKTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHRhYmxlID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoe1xyXG4gICAgbGFuZ3VhZ2U6IHtcclxuICAgICAgdXJsOiBcIi8vY2RuLmRhdGF0YWJsZXMubmV0L3BsdWctaW5zLzEuMTAuMjEvaTE4bi9DemVjaC5qc29uXCIsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuZWRpdFVzZXJFdmVudFwiLCAgIGZ1bmN0aW9uIChldmVudCkge1xyXG4gIGxldCAkb2JqID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICBsZXQgJHJvdyA9ICRvYmouY2xvc2VzdCgndHInKTtcclxuICBsZXQgaWQgPSAgJCgnLnVzZXJJRCcsICRyb3cpLnRleHQoKTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICB2YXIgdCA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgbGV0IHJvd0lkID0gJChcIiN1c2Vyc1wiKVxyXG4gICAgICAuZGF0YVRhYmxlKClcclxuICAgICAgLmZuRmluZENlbGxSb3dJbmRleGVzKGlkLCAwKTtcclxuICBsZXQgZGF0YSA9IHQucm93KHJvd0lkKS5kYXRhKClcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICAkKFwiLmVkaXRVc2VyXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICQoXCIuZGVsZXRlVXNlclwiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAkKFwiI3VwZGF0ZVVzZXJcIikubW9kYWwoXCJzaG93XCIpO1xyXG4gICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICQoXCIuZWRpdCAjSm3DqW5vXCIpLnZhbChkYXRhWzFdKTtcclxuICAkKFwiLmVkaXQgI0VtYWlsXCIpLnZhbChkYXRhWzJdKTtcclxuICAkKGAuZWRpdCAjcm9sZSBvcHRpb25bdmFsdWU9JHtkYXRhWzNdfV1gKS5hdHRyKFwic2VsZWN0ZWRcIiwgXCJzZWxlY3RlZFwiKTtcclxuXHJcbiAgJChcIi5lZGl0VXNlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdXNlciA9IHtcclxuICAgICAgaWQ6IGRhdGFbMF0sXHJcbiAgICAgIG5hbWU6ICQoXCIuZWRpdCAjSm3DqW5vXCIpLnZhbCgpLFxyXG4gICAgICBlbWFpbDogJChcIi5lZGl0ICNFbWFpbFwiKS52YWwoKSxcclxuICAgICAgcGFzc3dvcmQ6ICQoXCIuZWRpdCAjSGVzbG9cIikudmFsKCksXHJcbiAgICAgIHJvbGVfaWQ6ICQoXCIuZWRpdCAjcm9sZVwiKS52YWwoKSxcclxuICAgIH07XHJcbiAgICBzYXZlVXNlcih1c2VyKTtcclxuICB9KTtcclxuICAkKFwiLmRlbGV0ZVVzZXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHVzZXIgPSB7XHJcbiAgICAgIGlkOiBkYXRhWzBdLFxyXG4gICAgICBuYW1lOiAkKFwiLmVkaXQgI0ptw6lub1wiKS52YWwoKSxcclxuICAgICAgZW1haWw6ICQoXCIuZWRpdCAjRW1haWxcIikudmFsKCksXHJcbiAgICAgIHBhc3N3b3JkOiAkKFwiLmVkaXQgI0hlc2xvXCIpLnZhbCgpLFxyXG4gICAgICByb2xlX2lkOiAkKFwiLmVkaXQgI3JvbGVcIikudmFsKCksXHJcbiAgICB9O1xyXG4gICAgZGVsZXRlVXNlcih1c2VyKTtcclxuICB9KTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmVkaXRBcnRpY2xlRXZlbnQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gIHZhciB0ID0gJChcIiNhcnRpY2xlc1wiKS5EYXRhVGFibGUoKTtcclxuICBsZXQgcm93SWQgPSAkKFwiI2FydGljbGVzXCIpXHJcbiAgICAgIC5kYXRhVGFibGUoKVxyXG4gICAgICAuZm5GaW5kQ2VsbFJvd0luZGV4ZXModGhpcy5pZCwgMCk7XHJcbiAgbGV0IGRhdGEgPSB0LnJvdyhyb3dJZCkuZGF0YSgpXHJcbiAgJChcIi51cGRhdGVBcnRpY2xlXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICQoXCIuZGVsZXRlQXJ0aWNsZVwiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICAkKFwiI2VkaXRBcnRpY2xlXCIpLm1vZGFsKFwic2hvd1wiKTtcclxuICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICBsZXQgaXNDaGVjayA9IGRhdGFbNl0gIT0gXCJOZW7DrVwiO1xyXG4gIGxldCBwcmljZSA9IGRhdGFbM107XHJcbiAgbGV0IHJlc1ByaWNlID0gcHJpY2UucmVwbGFjZSgnS8SNJywgJycsKS5zcGxpdCgnICcpLmpvaW4oJycpO1xyXG4gIGxldCByZXN1bHQgPSByZXNQcmljZS5yZXBsYWNlQWxsKCcmbmJzcDsnLCAnJyk7XHJcbiAgJChcIi5lZGl0QXJ0aWNsZSAjTsOhemV2XCIpLnZhbChkYXRhWzFdKTtcclxuICAkKFwiLmVkaXRBcnRpY2xlICNQb3Bpc1wiKS52YWwoZGF0YVsyXSk7XHJcbiAgJChcIi5lZGl0QXJ0aWNsZSAjRW1haWxcIikudmFsKGRhdGFbNV0pO1xyXG4gICQoXCIuZWRpdEFydGljbGUgI0NlbmFcIikudmFsKHJlc3VsdCk7XHJcbiAgJChcIi5lZGl0QXJ0aWNsZSAjTG9rYWxpdGFcIikudmFsKGRhdGFbNF0pO1xyXG4gIGlmKGlzQ2hlY2spIHtcclxuICAgICQoXCIjcmV6ZXJ2YWNlXCIpLnNob3coKTtcclxuICAgICQoXCIjcmV6ZXJ2YWNlQ2hlY2tcIikucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoXCIjcmV6ZXJ2YWNlXCIpLmhpZGUoKTtcclxuXHJcbiAgfVxyXG4gIGdldEFydGljbGVJbWFnZXMoZGF0YVtcIjBcIl0pO1xyXG4gICQoXCIuZGVsZXRlQXJ0aWNsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gICAgbGV0IGFydGljbGUgPSB7XHJcbiAgICAgIGlkOiBkYXRhWzBdLFxyXG4gICAgfTtcclxuICAgIGRlbGV0ZUFydGljbGUoYXJ0aWNsZSk7XHJcbiAgfSk7XHJcbiAgJChcIi51cGRhdGVBcnRpY2xlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgICBsZXQgaXNDaGVjayA9ICQoXCIuZWRpdEFydGljbGUgI3JlemVydmFjZVwiKS5pcyhcIjpjaGVja2VkXCIpID8gXCIxXCIgOiBcIjBcIjtcclxuICAgIGxldCBhcnRpY2xlID0ge1xyXG4gICAgICBpZDogZGF0YVswXSxcclxuICAgICAgTsOhemV2OiAkKFwiLmVkaXRBcnRpY2xlICNOw6F6ZXZcIikudmFsKCksXHJcbiAgICAgIFBvcGlzOiAkKFwiLmVkaXRBcnRpY2xlICNQb3Bpc1wiKS52YWwoKSxcclxuICAgICAgRW1haWw6ICQoXCIuZWRpdEFydGljbGUgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgICBMb2thbGl0YTogJChcIi5lZGl0QXJ0aWNsZSAjTG9rYWxpdGFcIikudmFsKCksXHJcbiAgICAgIENlbmE6ICQoXCIuZWRpdEFydGljbGUgI0NlbmFcIikudmFsKCksXHJcbiAgICAgIHJlemVydmFjZTogaXNDaGVjayxcclxuICAgIH07XHJcbiAgICBhcnRpY2xlLmZpbGVzID0gYWxsRmlsZXNFZGl0O1xyXG4gICAgc2F2ZUFydGljbGUoYXJ0aWNsZSk7XHJcbiAgfSk7XHJcbn0pXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICB2YXIgdGFibGUgPSAkKFwiI2FydGljbGVzXCIpLkRhdGFUYWJsZSh7XHJcbiAgICBsYW5ndWFnZToge1xyXG4gICAgICB1cmw6IFwiLy9jZG4uZGF0YXRhYmxlcy5uZXQvcGx1Zy1pbnMvMS4xMC4yMS9pMThuL0N6ZWNoLmpzb25cIixcclxuICAgIH0sXHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuJChcIi5sb2dpblN1Ym1pdFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgbGV0IHVzZXIgPSB7XHJcbiAgICBlbWFpbDogJChcIi5sb2dpblVzZXIgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgcGFzc3dvcmQ6ICQoXCIubG9naW5Vc2VyICNIZXNsb1wiKS52YWwoKSxcclxuICAgIHRva2VuOiAkKFwiLmxvZ2luVXNlciAjdG9rZW5cIikudmFsKCksXHJcbiAgfTtcclxuICBoYW5kbGVMb2dpbih1c2VyKTtcclxufSk7XHJcblxyXG4kKFwiLmRlbGV0ZUFydGljbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gIGxldCB1c2VyID0ge1xyXG4gICAgZW1haWw6ICQoXCIubG9naW5Vc2VyICNFbWFpbFwiKS52YWwoKSxcclxuICAgIHBhc3N3b3JkOiAkKFwiLmxvZ2luVXNlciAjSGVzbG9cIikudmFsKCksXHJcbiAgICB0b2tlbjogJChcIi5sb2dpblVzZXIgI3Rva2VuXCIpLnZhbCgpLFxyXG4gIH07XHJcbiAgZGVsZXRlQXJ0aWNsZSh1c2VyKTtcclxufSk7XHJcblxyXG4kKFwiLnVwbG9hZEFydGljbGVJbWFnZXNcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVcIikuY2xpY2soKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVcIikub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmaWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZVwiKS5maWxlcztcclxuICAgIGZpbGVzID0gcmVuZGVySW1hZ2VzKGZpbGVzKTtcclxuICAgIGhhbmRsZUZpbGVzKGZpbGVzKTtcclxuICB9O1xyXG59KTtcclxuXHJcbiQoXCIudXBsb2FkQXJ0aWNsZUltYWdlc0VkaXRcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVlZGl0XCIpLmNsaWNrKCk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlZWRpdFwiKS5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZpbGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlZWRpdFwiKS5maWxlcztcclxuICAgIGZpbGVzID0gcmVuZGVySW1hZ2VzRWRpdChmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlc0VkaXQoZmlsZXMpO1xyXG4gIH07XHJcbn0pO1xyXG5cclxuJChcIi5kcm9wQXJ0aWNsZUltYWdlc1wiKVxyXG4gIC5iaW5kKFwiZHJhZ2VudGVyIGRyYWdvdmVyXCIsIGZhbHNlKVxyXG4gIC5iaW5kKFwiZHJvcFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGxldCBkdCA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7XHJcbiAgICBsZXQgZmlsZXMgPSBkdC5maWxlcztcclxuICAgIGZpbGVzID0gcmVuZGVySW1hZ2VzKGZpbGVzKTtcclxuICAgIGhhbmRsZUZpbGVzKGZpbGVzKTtcclxuICB9KTtcclxuXHJcbiQoXCIuZHJvcEFydGljbGVJbWFnZXNFZGl0XCIpXHJcbiAgLmJpbmQoXCJkcmFnZW50ZXIgZHJhZ292ZXJcIiwgZmFsc2UpXHJcbiAgLmJpbmQoXCJkcm9wXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgbGV0IGR0ID0gZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2ZlcjtcclxuICAgIGxldCBmaWxlcyA9IGR0LmZpbGVzO1xyXG4gICAgZmlsZXMgPSByZW5kZXJJbWFnZXNFZGl0KGZpbGVzKTtcclxuICAgIGhhbmRsZUZpbGVzRWRpdChmaWxlcyk7XHJcbiAgfSk7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVGaWxlcyhmaWxlcykge1xyXG4gIGZvciAobGV0IFtpbmRleCwgZmlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsZXMpKSB7XHJcbiAgICBhbGxGaWxlcy5wdXNoKGZpbGUpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlRmlsZXNFZGl0KGZpbGVzKSB7XHJcbiAgZm9yIChsZXQgW2luZGV4LCBmaWxlXSBvZiBPYmplY3QuZW50cmllcyhmaWxlcykpIHtcclxuICAgIGFsbEZpbGVzRWRpdC5wdXNoKGZpbGUpO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coYWxsRmlsZXNFZGl0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVySW1hZ2VzKGZpbGVzKSB7XHJcbiAgY29uc29sZS5sb2coZmlsZXMpO1xyXG4gIGZvciAobGV0IFtpbmRleCwgZmlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsZXMpKSB7XHJcbiAgICBsZXQgZXh0ID0gZ2V0RXh0KGZpbGUubmFtZSk7XHJcbiAgICBpZih2YWxpZEV4dGVuc2lvbnMuaW5jbHVkZXMoZXh0KSkge1xyXG4gICAgICB2YXIgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcclxuICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBpbWcuY2xhc3NOYW1lID0gXCJwcmV2aWV3SW1hZ2VcIjtcclxuICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQcmF2ZMSbcG9kb2JuxJsgbmVwb2Rwb3JvdmFuw70gdHlwIG9icsOhemt1LlwiKTtcclxuICAgICAgfTtcclxuICAgICAgaW1nLnNyYyA9IHVybDtcclxuXHJcbiAgICAgIHZhciBudW1iZXIgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICBudW1iZXIudG9TdHJpbmcoMzYpO1xyXG4gICAgICB2YXIgaWQgPSBudW1iZXIudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcclxuICAgICAgaW1nLmlkID0gaWQ7XHJcbiAgICAgIGZpbGUuaWQgPSBpZDtcclxuICAgICAgJChcIi5kcm9wQXJ0aWNsZVByZXZpZXdcIikuYXBwZW5kKGltZyk7XHJcbiAgICAgICQoXCIucHJldmlld0ltYWdlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICBpbmRleCA9IGFsbEZpbGVzLmZpbmRJbmRleCgoZmlsZSkgPT4gZmlsZS5pZCA9PT0gaWQpO1xyXG4gICAgICAgIGFsbEZpbGVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgJChgIyR7aWR9YCkucmVtb3ZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCJQcmF2ZMSbcG9kb2JuxJsgbmVwb2Rwb3JvdmFuw70gdHlwIG9icsOhemt1LlwiKTtcclxuICAgICAgZmlsZXMgPSAwO1xyXG4gICAgICByZXR1cm4gZmlsZXM7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBmaWxlcztcclxufVxyXG52YXIgdmFsaWRFeHRlbnNpb25zID0gWydqcGcnLCdwbmcnLCdqcGVnJ107XHJcblxyXG5mdW5jdGlvbiByZW5kZXJJbWFnZXNFZGl0KGZpbGVzKSB7XHJcbiAgZm9yIChsZXQgW2luZGV4LCBmaWxlXSBvZiBPYmplY3QuZW50cmllcyhmaWxlcykpIHtcclxuICAgIGxldCBleHQgPSBnZXRFeHQoZmlsZS5uYW1lKTtcclxuICAgIGNvbnNvbGUubG9nKGV4dClcclxuICAgIGNvbnNvbGUubG9nKHZhbGlkRXh0ZW5zaW9ucy5pbmNsdWRlcyhleHQpKTtcclxuICAgIGlmKHZhbGlkRXh0ZW5zaW9ucy5pbmNsdWRlcyhleHQpKSB7XHJcbiAgICAgIHZhciB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG4gICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGltZy5jbGFzc05hbWUgPSBcInByZXZpZXdJbWFnZUVkaXRcIjtcclxuICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQcmF2ZMSbcG9kb2JuxJsgbmVwb2Rwb3JvdmFuw70gdHlwIG9icsOhemt1LlwiKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGltZy5zcmMgPSB1cmw7XHJcblxyXG4gICAgICB2YXIgbnVtYmVyID0gTWF0aC5yYW5kb20oKTtcclxuICAgICAgbnVtYmVyLnRvU3RyaW5nKDM2KTtcclxuICAgICAgdmFyIGlkID0gbnVtYmVyLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XHJcbiAgICAgIGltZy5pZCA9IGlkO1xyXG4gICAgICBmaWxlLmlkID0gaWQ7XHJcbiAgICAgICQoXCIuZHJvcEFydGljbGVQcmV2aWV3SW1hZ2VzXCIpLmFwcGVuZChpbWcpO1xyXG4gICAgICAkKFwiLnByZXZpZXdJbWFnZUVkaXRcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpO1xyXG4gICAgICAgIGluZGV4ID0gYWxsRmlsZXNFZGl0LmZpbmRJbmRleCgoZmlsZSkgPT4gZmlsZS5pZCA9PT0gaWQpO1xyXG4gICAgICAgIGFsbEZpbGVzRWRpdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICQoYCMke2lkfWApLnJlbW92ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwiUHJhdmTEm3BvZG9ibsSbIG5lcG9kcG9yb3ZhbsO9IHR5cCBvYnLDoXprdS5cIik7XHJcbiAgICAgIGZpbGVzID0gMDtcclxuICAgICAgcmV0dXJuIGZpbGVzO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZmlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEV4dChmaWxlbmFtZSlcclxue1xyXG4gIHZhciBleHQgPSBmaWxlbmFtZS5zcGxpdCgnLicpLnBvcCgpO1xyXG4gIGlmKGV4dCA9PSBmaWxlbmFtZSkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIGV4dDtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9