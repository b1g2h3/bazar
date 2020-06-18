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
  // Hide the current image
  $("#overlay img").hide();
  // Overlay image location
  var $currentImgSrc = $("#overlay img").attr("src");
  // Image with matching location of the overlay image
  var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
  // Finds the next image
  var $nextImg = $($currentImg.closest(".image").next().find("img"));
  // All of the images in the gallery
  var $images = $("#image-gallery img");
  // If there is a next image
  if ($nextImg.length > 0) {
    // Fade in the next image
    $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
  } else {
    // Otherwise fade in the first image
    $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
  }
  // Prevents overlay from being hidden
  event.stopPropagation();
});

// When previous button is clicked
$prevButton.click(function(event) {
  // Hide the current image
  $("#overlay img").hide();
  // Overlay image location
  var $currentImgSrc = $("#overlay img").attr("src");
  // Image with matching location of the overlay image
  var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
  // Finds the next image
  var $nextImg = $($currentImg.closest(".image").prev().find("img"));
  // Fade in the next image
  $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
  // Prevents overlay from being hidden
  event.stopPropagation();
});

// When the exit button is clicked
$exitButton.click(function() {
  // Fade out the overlay
  $("#overlay").fadeOut("slow");
});

// $(document).ready(function () {
//   $(".lightBox").on("click", function () {
//     $(".backDrop").animate({ opacity: ".70" }, 500);
//     $(".box").animate({ opacity: "1.0" }, 500);
//     $(".backDrop, .box").css("display", "block");
//   });
//
//   $(".thumb").on("click", function () {
//     var largeImage = $(this).attr("src");
//     $(".largeImage").attr({ src: largeImage });
//   });
//
//   $(".close, .backDrop").on("click", function () {
//     closeBox();
//   });
//
//   function closeBox() {
//     $(".backDrop, .box").animate({ opacity: "0" }, 500, function () {
//       $(".backDrop, .box").css("display", "none");
//     });
//   }
// });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC9hcnRpY2xlcy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hamF4L2F1dGguanMiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYWpheC91c2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSxhQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsTUFBTTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0Q0FBNEM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUywyREFBMkQsU0FBUyxhQUFhO0FBQ3JIO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxNQUFNO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE1BQU07QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLEdBQUc7QUFDakI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEIsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCOzs7Ozs7Ozs7Ozs7QUN4Q2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsS0FBSztBQUN4QjtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBLGtCQUFrQjs7Ozs7Ozs7Ozs7OztBQ25JbEIsT0FBTyxxQ0FBcUMsR0FBRyxtQkFBTyxDQUFDLGlEQUFjO0FBQ3JFLE9BQU8sY0FBYyxHQUFHLG1CQUFPLENBQUMsK0NBQWE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEdBQUcsbUJBQU8sQ0FBQyx1REFBaUI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsV0FBVztBQUN2RCxLQUFLO0FBQ0wsNENBQTRDLFdBQVc7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLCtCQUErQixpQkFBaUI7QUFDaEQsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0JBQWtCO0FBQ2hELE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLHFDQUFxQyxlQUFlO0FBQ3BEO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUTs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQkFBMEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsR0FBRztBQUNqQixPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxHQUFHO0FBQ2pCLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5jbHVkZXMvanMvYXBwLmpzXCIpO1xuIiwiZnVuY3Rpb24gY3JlYXRlQXJ0aWNsZShhcnRpY2xlKSB7XHJcbiAgbGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgZm9yIChpID0gMDsgaSA8IGFydGljbGUuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGZkLmFwcGVuZChcImZpbGVbXVwiLCBhcnRpY2xlLmZpbGVzW2ldKTtcclxuICB9XHJcbiAgZmQuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeShhcnRpY2xlKSk7XHJcbiAgZmQuYXBwZW5kKFwibWV0aG9kXCIsIFwiYWRkQXJ0aWNsZVwiKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICB1cmw6IFwiYWpheC5waHBcIixcclxuICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgIGRhdGE6IGZkLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke2lucHV0fWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2FkZEFydGljbGVcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjYXJ0aWNsZXNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgYXJ0aWNsZSA9IHJlcy5hcnRpY2xlO1xyXG4gICAgICAgIHQucm93XHJcbiAgICAgICAgICAuYWRkKFtcclxuICAgICAgICAgICAgYXJ0aWNsZS5pZCxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Ow6F6ZXYsXHJcbiAgICAgICAgICAgIGFydGljbGUuUG9waXMsXHJcbiAgICAgICAgICAgIGZvcm1hdHRlci5mb3JtYXQoYXJ0aWNsZS5DZW5hKSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5Mb2thbGl0YSxcclxuICAgICAgICAgICAgYXJ0aWNsZS5FbWFpbCxcclxuICAgICAgICAgICAgKGFydGljbGUucmV6ZXJ2YWNlID0gXCJOZW7DrVwiKSxcclxuICAgICAgICAgICAgXCI8ZGl2IHN0eWxlPSdjdXJzb3I6cG9pbnRlcicgY2xhc3M9J2VkaXRBcnRpY2xlRXZlbnQnPjxpIGNsYXNzPVxcXCJmYXMgZmEtZWRpdFxcXCI+PC9pPjwvZGl2PlwiLFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICAgIC5kcmF3KGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5jb25zdCBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2NzJywge1xyXG4gIHN0eWxlOiAnY3VycmVuY3knLFxyXG4gIGN1cnJlbmN5OiAnY3prJyxcclxuICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDAsXHJcbn0pXHJcblxyXG5mdW5jdGlvbiB1cGRhdGVBcnRpY2xlKGFydGljbGUpIHtcclxuICBsZXQgZmQgPSBuZXcgRm9ybURhdGEoKTtcclxuICBmb3IgKGkgPSAwOyBpIDwgYXJ0aWNsZS5maWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgZmQuYXBwZW5kKFwiZmlsZVtdXCIsIGFydGljbGUuZmlsZXNbaV0pO1xyXG4gIH1cclxuICBmZC5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KGFydGljbGUpKTtcclxuICBmZC5hcHBlbmQoXCJtZXRob2RcIiwgXCJ1cGRhdGVBcnRpY2xlXCIpO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIHVybDogXCJhamF4LnBocFwiLFxyXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgZGF0YTogZmQsXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7aW5wdXR9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjZWRpdEFydGljbGVcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjYXJ0aWNsZXNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgbGV0IHJvd0lkID0gJChcIiNhcnRpY2xlc1wiKVxyXG4gICAgICAgICAgLmRhdGFUYWJsZSgpXHJcbiAgICAgICAgICAuZm5GaW5kQ2VsbFJvd0luZGV4ZXMoYXJ0aWNsZS5pZCwgMCk7XHJcbiAgICAgICAgdC5yb3cocm93SWQpXHJcbiAgICAgICAgICAuZGF0YShbXHJcbiAgICAgICAgICAgIGFydGljbGUuaWQsXHJcbiAgICAgICAgICAgIGFydGljbGUuTsOhemV2LFxyXG4gICAgICAgICAgICBhcnRpY2xlLlBvcGlzLFxyXG4gICAgICAgICAgICBmb3JtYXR0ZXIuZm9ybWF0KGFydGljbGUuQ2VuYSksXHJcbiAgICAgICAgICAgIGFydGljbGUuTG9rYWxpdGEsXHJcbiAgICAgICAgICAgIGFydGljbGUuRW1haWwsXHJcbiAgICAgICAgICAgIGFydGljbGUucmV6ZXJ2YWNlID09IDAgPyBcIk5lbsOtXCIgOiBcIkppxb4gcmV6ZXJ2b3bDoW5cIixcclxuICAgICAgICAgICAgXCI8ZGl2IHN0eWxlPSdjdXJzb3I6cG9pbnRlcicgY2xhc3M9J2VkaXRBcnRpY2xlRXZlbnQnPjxpIGNsYXNzPVxcXCJmYXMgZmEtZWRpdFxcXCI+PC9pPjwvZGl2PlwiLFxyXG4gICAgICAgICAgXSlcclxuICAgICAgICAgIC5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgYXJ0aWNsZSA9IHJlcy5hcnRpY2xlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFydGljbGUpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVBcnRpY2xlKGFydGljbGUpIHtcclxuICBjb25zb2xlLmxvZyhhcnRpY2xlKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJkZWxldGVBcnRpY2xlXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGFydGljbGUpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW25hbWUsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2VkaXRBcnRpY2xlXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LWRhbmdlclwiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjYXJ0aWNsZXNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgdC5yb3dzKGZ1bmN0aW9uIChpbmRleCwgZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGFbMF0gPT09IGFydGljbGUuaWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgIC5yZW1vdmUoKVxyXG4gICAgICAgICAgLmRyYXcoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRBcnRpY2xlSW1hZ2VzKGFydGljbGVJZCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIHVybDogXCJhamF4LnBocFwiLFxyXG4gICAgZGF0YTogeyBpZDogYXJ0aWNsZUlkLCBtZXRob2Q6IFwiZ2V0QXJ0aWNsZUltYWdlc1wiIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiLnByZXZpZXdJbWFnZUVkaXRcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgdmFyIGltYWdlcyA9IHJlcy5pbWFnZXM7XHJcbiAgICAgICAgaW1hZ2VzLm1hcCgoaW1hZ2UpID0+IHtcclxuICAgICAgICAgICQoXCIuZHJvcEFydGljbGVQcmV2aWV3SW1hZ2VzXCIpLnByZXBlbmQoXHJcbiAgICAgICAgICAgIGA8aW1nIGlkPVwiaW1nJHtpbWFnZS5pZH1cIiBjbGFzcz1cInByZXZpZXdJbWFnZUVkaXQgZGVsZXRlSW1hZ2VcIiBzcmM9XCJkYXRhOmltYWdlL2pwZztiYXNlNjQsJHtpbWFnZS5iYXNlNjR9IFwiIC8+YFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmRlbGV0ZUltYWdlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGlmIChjb25maXJtKFwiQ2hjZXRlIHbDocW+bsSbIG9kc3RyYW5pdCBvYnLDoXplayB6IGRhdGFiw6F6ZT9cIikpIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgICAgIGRlbGV0ZUltYWdlKGlkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZEFydGljbGVUb0VtYWlsKGVtYWlsKSB7XHJcbiAgbGV0IGFydGljbGVJZCA9IGxvY2F0aW9uLnNlYXJjaC5zcGxpdChcImlkPVwiKVsxXTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJzZW5kQXJ0aWNsZVRvRW1haWxcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICBpZDogYXJ0aWNsZUlkLFxyXG4gICAgICB9KSxcclxuICAgIH0sXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JzID0gcmVzW1wiZXJyb3JzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IFtpbnB1dCwgbXNnXSBvZiBPYmplY3QuZW50cmllcyhlcnJvcnMpKSB7XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYC5zZW5kQXJ0aWNsZVRvRW1haWwgI2VyciR7aW5wdXR9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjc2VuZEFydGljbGVPbkVtYWlsXCIpLm1vZGFsKFwiaGlkZVwiKTtcclxuICAgICAgICAkKFwiLmFsZXJ0LXN1Y2Nlc3NcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZFJlc2VydmF0aW9uVG9FbWFpbChkYXRhKSB7XHJcbiAgZGF0YS5pZCA9IGxvY2F0aW9uLnNlYXJjaC5zcGxpdChcImlkPVwiKVsxXTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJzZW5kUmVzZXJ2YXRpb25Ub093bmVyXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICAgJChgI2VyciR7aW5wdXR9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjYWRkUmVzZXJ2YXRpb25cIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVJbWFnZShpZCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImRlbGV0ZUltYWdlXCIsXHJcbiAgICAgIGltYWdlSWQ6IGlkLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXMuZXJyb3JzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmVycm9ycyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgJChcIi5lZGl0YWxlcnQtZGFuZ2VyXCIpLnNob3coKS50ZXh0KHJlcy5zdWNjZXNzKTtcclxuICAgICAgICAkKGAjJHtpZH1gKS5yZW1vdmUoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGNyZWF0ZUFydGljbGUsXHJcbiAgdXBkYXRlQXJ0aWNsZSxcclxuICBkZWxldGVBcnRpY2xlLFxyXG4gIGdldEFydGljbGVJbWFnZXMsXHJcbiAgc2VuZEFydGljbGVUb0VtYWlsLFxyXG4gIHNlbmRSZXNlcnZhdGlvblRvRW1haWwsXHJcbn07XHJcbiIsImNvbnN0IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlID0ge1xyXG4gIG5hbWU6IFwiSm3DqW5vXCIsXHJcbiAgZW1haWw6IFwiRW1haWxcIixcclxuICByb2xlX2lkOiBcIlJvbGlcIixcclxuICBwYXNzd29yZDogXCJIZXNsb1wiLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlTG9naW4odXNlcikge1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcImhhbmRsZUxvZ2luXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChgI2VyciR7bmFtZX1gKS5zaG93KG1zZyk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICBpZihyZXMudXNlci5yb2xlX2lkID09PSBcIjFcIikge1xyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi8/cGFnZT11c2Vyc1wiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiLz9wYWdlPWVkaXRBcnRpY2xlc1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgaGFuZGxlTG9naW4gfTtcclxuIiwiY29uc3QgY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2UgPSB7XHJcbiAgbmFtZTogXCJKbcOpbm9cIixcclxuICBlbWFpbDogXCJFbWFpbFwiLFxyXG4gIHJvbGVfaWQ6IFwiUm9saVwiLFxyXG4gIHBhc3N3b3JkOiBcIkhlc2xvXCIsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVVc2VyKHVzZXIpIHtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJhZGRVc2VyXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc1tcInN1Y2Nlc3NcIl0pIHtcclxuICAgICAgICAkKFwiI2FkZFVzZXJcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICB2YXIgdCA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAxO1xyXG4gICAgICAgIHVzZXIgPSByZXMudXNlcjtcclxuICAgICAgICB0LnJvd1xyXG4gICAgICAgICAgLmFkZChbXHJcbiAgICAgICAgICAgIHVzZXIuaWQsXHJcbiAgICAgICAgICAgIHVzZXIubmFtZSxcclxuICAgICAgICAgICAgdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgdXNlci5yb2xlc19pZCA9PSAxID8gXCJBZG1pblwiIDogXCJFZGl0b3JcIixcclxuICAgICAgICAgICAgJzxkaXYgc3R5bGU9XCJjdXJzb3I6cG9pbnRlclwiIGNsYXNzPVwiZWRpdFVzZXJFdmVudFwiPjxpIGNsYXNzPVwiZmFzIGZhLWVkaXRcIj48L2k+PC9kaXY+JyxcclxuICAgICAgICAgIF0pXHJcbiAgICAgICAgICAuZHJhdyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVXNlcih1c2VyKSB7XHJcbiAgdXNlci5yb2xlX2lkID0gdXNlci5yb2xlX2lkID09IFwiQWRtaW5cIiA/IDEgOiAyO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgIHVybDogXCIvYWpheC5waHBcIixcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcInVwZGF0ZVVzZXJcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgaWYgKHJlc1tcImVycm9yc1wiXSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHJlc1tcImVycm9yc1wiXTtcclxuICAgICAgICBmb3IgKGxldCBbaW5wdXQsIG1zZ10gb2YgT2JqZWN0LmVudHJpZXMoZXJyb3JzKSkge1xyXG4gICAgICAgICAgbGV0IG5hbWUgPSBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtpbnB1dF07XHJcbiAgICAgICAgICAkKFwiLmVycm9yXCIpLnNob3coKTtcclxuICAgICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgIHJlcy51c2VyID0gdXNlcjtcclxuICAgICAgICAkKFwiI3VwZGF0ZVVzZXJcIikubW9kYWwoXCJoaWRlXCIpO1xyXG4gICAgICAgICQoXCIuYWxlcnQtc3VjY2Vzc1wiKS5zaG93KCkudGV4dChyZXNbXCJzdWNjZXNzXCJdKTtcclxuICAgICAgICBsZXQgdCA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgbGV0IHJvd0lkID0gJChcIiN1c2Vyc1wiKS5kYXRhVGFibGUoKS5mbkZpbmRDZWxsUm93SW5kZXhlcyh1c2VyLmlkLCAwKTtcclxuICAgICAgICB0LnJvdyhyb3dJZClcclxuICAgICAgICAgIC5kYXRhKFtcclxuICAgICAgICAgICAgdXNlci5pZCxcclxuICAgICAgICAgICAgdXNlci5uYW1lLFxyXG4gICAgICAgICAgICB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICB1c2VyLnJvbGVfaWQgPT0gMSA/IFwiQWRtaW5cIiA6IFwiRWRpdG9yXCIsXHJcbiAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwiY3Vyc29yOnBvaW50ZXJcIiBjbGFzcz1cImVkaXRVc2VyRXZlbnRcIj48aSBjbGFzcz1cImZhcyBmYS1lZGl0XCI+PC9pPjwvZGl2PicsXHJcbiAgICAgICAgICBdKVxyXG4gICAgICAgICAgLmludmFsaWRhdGUoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHhociwgc3RhdHVzLCBlcnJvcik7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVVc2VyKHVzZXIpIHtcclxuICBjb25zb2xlLmxvZyh1c2VyKTtcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICB1cmw6IFwiL2FqYXgucGhwXCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIG1ldGhvZDogXCJkZWxldGVVc2VyXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgIGlmIChyZXNbXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXNbXCJlcnJvcnNcIl07XHJcbiAgICAgICAgZm9yIChsZXQgW2lucHV0LCBtc2ddIG9mIE9iamVjdC5lbnRyaWVzKGVycm9ycykpIHtcclxuICAgICAgICAgIGxldCBuYW1lID0gY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbaW5wdXRdO1xyXG4gICAgICAgICAgJChcIi5lcnJvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZihyZXNbJ2Vycm9yczInXSkge1xyXG4gICAgICAgICQoXCIuZXJyb3JcIikuc2hvdygpO1xyXG4gICAgICAgICQoYCNlcnJKbcOpbm9gKS50ZXh0KHJlcy5lcnJvcnMyKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzW1wic3VjY2Vzc1wiXSkge1xyXG4gICAgICAgICQoXCIjdXBkYXRlVXNlclwiKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICAgICAgJChcIi5hbGVydC1kYW5nZXJcIikuc2hvdygpLnRleHQocmVzW1wic3VjY2Vzc1wiXSk7XHJcbiAgICAgICAgdmFyIHQgPSAkKFwiI3VzZXJzXCIpLkRhdGFUYWJsZSgpO1xyXG4gICAgICAgIHQucm93cyhmdW5jdGlvbiAoaW5kZXgsIGRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBkYXRhWzBdID09PSB1c2VyLmlkO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAucmVtb3ZlKClcclxuICAgICAgICAgIC5kcmF3KCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyh4aHIsIHN0YXR1cywgZXJyb3IpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IGNyZWF0ZVVzZXIsIHVwZGF0ZVVzZXIsIGRlbGV0ZVVzZXIgfTtcclxuIiwiXHJcbmNvbnN0IHsgY3JlYXRlVXNlciwgdXBkYXRlVXNlciwgZGVsZXRlVXNlciB9ID0gcmVxdWlyZShcIi4vYWpheC91c2Vyc1wiKTtcclxuY29uc3QgeyBoYW5kbGVMb2dpbiB9ID0gcmVxdWlyZShcIi4vYWpheC9hdXRoXCIpO1xyXG5jb25zdCB7XHJcbiAgY3JlYXRlQXJ0aWNsZSxcclxuICB1cGRhdGVBcnRpY2xlLFxyXG4gIGRlbGV0ZUFydGljbGUsXHJcbiAgZ2V0QXJ0aWNsZUltYWdlcyxcclxuICBzZW5kQXJ0aWNsZVRvRW1haWwsXHJcbiAgc2VuZFJlc2VydmF0aW9uVG9FbWFpbCxcclxufSA9IHJlcXVpcmUoXCIuL2FqYXgvYXJ0aWNsZXNcIik7XHJcbnZhciBhbGxGaWxlcyA9IFtdO1xyXG52YXIgYWxsRmlsZXNFZGl0ID0gW107XHJcblxyXG5mdW5jdGlvbiBzYXZlVXNlcih1c2VyKSB7XHJcbiAgaWYgKHVzZXIuaWQgPT0gbnVsbCkge1xyXG4gICAgY3JlYXRlVXNlcih1c2VyKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdXBkYXRlVXNlcih1c2VyKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVBcnRpY2xlKGFydGljbGUpIHtcclxuICBpZiAoYXJ0aWNsZS5pZCA9PSBudWxsKSB7XHJcbiAgICBjcmVhdGVBcnRpY2xlKGFydGljbGUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB1cGRhdGVBcnRpY2xlKGFydGljbGUpO1xyXG4gIH1cclxufVxyXG5cclxuJChcIi5zZW5kQXJ0aWNsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgbGV0IGFydGljbGUgPSB7XHJcbiAgICBOw6F6ZXY6ICQoXCIjTsOhemV2XCIpLnZhbCgpLFxyXG4gICAgUG9waXM6ICQoXCIjUG9waXNcIikudmFsKCksXHJcbiAgICBFbWFpbDogJChcIiNFbWFpbFwiKS52YWwoKSxcclxuICAgIExva2FsaXRhOiAkKFwiI0xva2FsaXRhXCIpLnZhbCgpLFxyXG4gICAgQ2VuYTogJChcIiNDZW5hXCIpLnZhbCgpLFxyXG4gIH07XHJcbiAgYXJ0aWNsZS5maWxlcyA9IGFsbEZpbGVzO1xyXG4gIHNhdmVBcnRpY2xlKGFydGljbGUpO1xyXG59KTtcclxuXHJcbiQoXCIuY3JlYXRlVXNlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgbGV0IHVzZXIgPSB7XHJcbiAgICBuYW1lOiAkKFwiLmNyZWF0ZSAjSm3DqW5vXCIpLnZhbCgpLFxyXG4gICAgZW1haWw6ICQoXCIuY3JlYXRlICNFbWFpbFwiKS52YWwoKSxcclxuICAgIHJvbGVfaWQ6ICQoXCIuY3JlYXRlICNyb2xlXCIpLnZhbCgpLFxyXG4gICAgcGFzc3dvcmQ6ICQoXCIuY3JlYXRlICNIZXNsb1wiKS52YWwoKSxcclxuICB9O1xyXG4gIHNhdmVVc2VyKHVzZXIpO1xyXG59KTtcclxuXHJcbiQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG5cclxuJChcIi5zZW5kUmVzZXJ2YXRpb25cIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBsZXQgZW1haWwgPSAkKFwiLnNlbmRSZXNlcnZhdGlvblRvRW1haWwgI0VtYWlsXCIpLnZhbCgpO1xyXG4gIGxldCBtc2cgPSAkKFwiLnNlbmRSZXNlcnZhdGlvblRvRW1haWwgI1pwcsOhdmFcIikudmFsKCk7XHJcbiAgbGV0IG5hbWUgPSAkKFwiLnNlbmRSZXNlcnZhdGlvblRvRW1haWwgI0ptw6lub1wiKS52YWwoKTtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICBsZXQgZGF0YSA9IHtcclxuICAgIEVtYWlsOiBlbWFpbCxcclxuICAgIFpwcsOhdmE6IG1zZyxcclxuICAgIEptw6lubzogbmFtZSxcclxuICB9O1xyXG4gIHNlbmRSZXNlcnZhdGlvblRvRW1haWwoZGF0YSk7XHJcbn0pO1xyXG5cclxuLy8gR2FsbGVyeSBpbWFnZSBob3ZlclxyXG4kKCBcIi5pbWctd3JhcHBlclwiICkuaG92ZXIoXHJcbiAgICBmdW5jdGlvbigpIHtcclxuICAgICAgJCh0aGlzKS5maW5kKFwiLmltZy1vdmVybGF5XCIpLmFuaW1hdGUoe29wYWNpdHk6IDF9LCA2MDApO1xyXG4gICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICQodGhpcykuZmluZChcIi5pbWctb3ZlcmxheVwiKS5hbmltYXRlKHtvcGFjaXR5OiAwfSwgNjAwKTtcclxuICAgIH1cclxuKTtcclxuXHJcbi8vIExpZ2h0Ym94XHJcbnZhciAkb3ZlcmxheSA9ICQoJzxkaXYgaWQ9XCJvdmVybGF5XCI+PC9kaXY+Jyk7XHJcbnZhciAkaW1hZ2UgPSAkKFwiPGltZz5cIik7XHJcbnZhciAkcHJldkJ1dHRvbiA9ICQoJzxkaXYgaWQ9XCJwcmV2QnV0dG9uXCI+PGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+PC9kaXY+Jyk7XHJcbnZhciAkbmV4dEJ1dHRvbiA9ICQoJzxkaXYgaWQ9XCJuZXh0QnV0dG9uXCI+PGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPjwvZGl2PicpO1xyXG52YXIgJGV4aXRCdXR0b24gPSAkKCc8ZGl2IGlkPVwiZXhpdEJ1dHRvblwiPjxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+PC9kaXY+Jyk7XHJcblxyXG4vLyBBZGQgb3ZlcmxheVxyXG4kb3ZlcmxheS5hcHBlbmQoJGltYWdlKS5wcmVwZW5kKCRwcmV2QnV0dG9uKS5hcHBlbmQoJG5leHRCdXR0b24pLmFwcGVuZCgkZXhpdEJ1dHRvbik7XHJcbiQoXCIjZ2FsbGVyeVwiKS5hcHBlbmQoJG92ZXJsYXkpO1xyXG5cclxuLy8gSGlkZSBvdmVybGF5IG9uIGRlZmF1bHRcclxuJG92ZXJsYXkuaGlkZSgpO1xyXG5cclxuLy8gV2hlbiBhbiBpbWFnZSBpcyBjbGlja2VkXHJcbiQoXCIuaW1nLW92ZXJsYXlcIikuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAvLyBQcmV2ZW50cyBkZWZhdWx0IGJlaGF2aW9yXHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAvLyBBZGRzIGhyZWYgYXR0cmlidXRlIHRvIHZhcmlhYmxlXHJcbiAgdmFyIGltYWdlTG9jYXRpb24gPSAkKHRoaXMpLnByZXYoKS5hdHRyKFwiaHJlZlwiKTtcclxuICAvLyBBZGQgdGhlIGltYWdlIHNyYyB0byAkaW1hZ2VcclxuICAkaW1hZ2UuYXR0cihcInNyY1wiLCBpbWFnZUxvY2F0aW9uKTtcclxuICAvLyBGYWRlIGluIHRoZSBvdmVybGF5XHJcbiAgJG92ZXJsYXkuZmFkZUluKFwic2xvd1wiKTtcclxufSk7XHJcblxyXG4vLyBXaGVuIHRoZSBvdmVybGF5IGlzIGNsaWNrZWRcclxuJG92ZXJsYXkuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgLy8gRmFkZSBvdXQgdGhlIG92ZXJsYXlcclxuICAkKHRoaXMpLmZhZGVPdXQoXCJzbG93XCIpO1xyXG59KTtcclxuXHJcbi8vIFdoZW4gbmV4dCBidXR0b24gaXMgY2xpY2tlZFxyXG4kbmV4dEJ1dHRvbi5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gIC8vIEhpZGUgdGhlIGN1cnJlbnQgaW1hZ2VcclxuICAkKFwiI292ZXJsYXkgaW1nXCIpLmhpZGUoKTtcclxuICAvLyBPdmVybGF5IGltYWdlIGxvY2F0aW9uXHJcbiAgdmFyICRjdXJyZW50SW1nU3JjID0gJChcIiNvdmVybGF5IGltZ1wiKS5hdHRyKFwic3JjXCIpO1xyXG4gIC8vIEltYWdlIHdpdGggbWF0Y2hpbmcgbG9jYXRpb24gb2YgdGhlIG92ZXJsYXkgaW1hZ2VcclxuICB2YXIgJGN1cnJlbnRJbWcgPSAkKCcjaW1hZ2UtZ2FsbGVyeSBpbWdbc3JjPVwiJyArICRjdXJyZW50SW1nU3JjICsgJ1wiXScpO1xyXG4gIC8vIEZpbmRzIHRoZSBuZXh0IGltYWdlXHJcbiAgdmFyICRuZXh0SW1nID0gJCgkY3VycmVudEltZy5jbG9zZXN0KFwiLmltYWdlXCIpLm5leHQoKS5maW5kKFwiaW1nXCIpKTtcclxuICAvLyBBbGwgb2YgdGhlIGltYWdlcyBpbiB0aGUgZ2FsbGVyeVxyXG4gIHZhciAkaW1hZ2VzID0gJChcIiNpbWFnZS1nYWxsZXJ5IGltZ1wiKTtcclxuICAvLyBJZiB0aGVyZSBpcyBhIG5leHQgaW1hZ2VcclxuICBpZiAoJG5leHRJbWcubGVuZ3RoID4gMCkge1xyXG4gICAgLy8gRmFkZSBpbiB0aGUgbmV4dCBpbWFnZVxyXG4gICAgJChcIiNvdmVybGF5IGltZ1wiKS5hdHRyKFwic3JjXCIsICRuZXh0SW1nLmF0dHIoXCJzcmNcIikpLmZhZGVJbig4MDApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBPdGhlcndpc2UgZmFkZSBpbiB0aGUgZmlyc3QgaW1hZ2VcclxuICAgICQoXCIjb3ZlcmxheSBpbWdcIikuYXR0cihcInNyY1wiLCAkKCRpbWFnZXNbMF0pLmF0dHIoXCJzcmNcIikpLmZhZGVJbig4MDApO1xyXG4gIH1cclxuICAvLyBQcmV2ZW50cyBvdmVybGF5IGZyb20gYmVpbmcgaGlkZGVuXHJcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbn0pO1xyXG5cclxuLy8gV2hlbiBwcmV2aW91cyBidXR0b24gaXMgY2xpY2tlZFxyXG4kcHJldkJ1dHRvbi5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gIC8vIEhpZGUgdGhlIGN1cnJlbnQgaW1hZ2VcclxuICAkKFwiI292ZXJsYXkgaW1nXCIpLmhpZGUoKTtcclxuICAvLyBPdmVybGF5IGltYWdlIGxvY2F0aW9uXHJcbiAgdmFyICRjdXJyZW50SW1nU3JjID0gJChcIiNvdmVybGF5IGltZ1wiKS5hdHRyKFwic3JjXCIpO1xyXG4gIC8vIEltYWdlIHdpdGggbWF0Y2hpbmcgbG9jYXRpb24gb2YgdGhlIG92ZXJsYXkgaW1hZ2VcclxuICB2YXIgJGN1cnJlbnRJbWcgPSAkKCcjaW1hZ2UtZ2FsbGVyeSBpbWdbc3JjPVwiJyArICRjdXJyZW50SW1nU3JjICsgJ1wiXScpO1xyXG4gIC8vIEZpbmRzIHRoZSBuZXh0IGltYWdlXHJcbiAgdmFyICRuZXh0SW1nID0gJCgkY3VycmVudEltZy5jbG9zZXN0KFwiLmltYWdlXCIpLnByZXYoKS5maW5kKFwiaW1nXCIpKTtcclxuICAvLyBGYWRlIGluIHRoZSBuZXh0IGltYWdlXHJcbiAgJChcIiNvdmVybGF5IGltZ1wiKS5hdHRyKFwic3JjXCIsICRuZXh0SW1nLmF0dHIoXCJzcmNcIikpLmZhZGVJbig4MDApO1xyXG4gIC8vIFByZXZlbnRzIG92ZXJsYXkgZnJvbSBiZWluZyBoaWRkZW5cclxuICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxufSk7XHJcblxyXG4vLyBXaGVuIHRoZSBleGl0IGJ1dHRvbiBpcyBjbGlja2VkXHJcbiRleGl0QnV0dG9uLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gIC8vIEZhZGUgb3V0IHRoZSBvdmVybGF5XHJcbiAgJChcIiNvdmVybGF5XCIpLmZhZGVPdXQoXCJzbG93XCIpO1xyXG59KTtcclxuXHJcbi8vICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuLy8gICAkKFwiLmxpZ2h0Qm94XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgJChcIi5iYWNrRHJvcFwiKS5hbmltYXRlKHsgb3BhY2l0eTogXCIuNzBcIiB9LCA1MDApO1xyXG4vLyAgICAgJChcIi5ib3hcIikuYW5pbWF0ZSh7IG9wYWNpdHk6IFwiMS4wXCIgfSwgNTAwKTtcclxuLy8gICAgICQoXCIuYmFja0Ryb3AsIC5ib3hcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4vLyAgIH0pO1xyXG4vL1xyXG4vLyAgICQoXCIudGh1bWJcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICB2YXIgbGFyZ2VJbWFnZSA9ICQodGhpcykuYXR0cihcInNyY1wiKTtcclxuLy8gICAgICQoXCIubGFyZ2VJbWFnZVwiKS5hdHRyKHsgc3JjOiBsYXJnZUltYWdlIH0pO1xyXG4vLyAgIH0pO1xyXG4vL1xyXG4vLyAgICQoXCIuY2xvc2UsIC5iYWNrRHJvcFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIGNsb3NlQm94KCk7XHJcbi8vICAgfSk7XHJcbi8vXHJcbi8vICAgZnVuY3Rpb24gY2xvc2VCb3goKSB7XHJcbi8vICAgICAkKFwiLmJhY2tEcm9wLCAuYm94XCIpLmFuaW1hdGUoeyBvcGFjaXR5OiBcIjBcIiB9LCA1MDAsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgJChcIi5iYWNrRHJvcCwgLmJveFwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuLy8gICAgIH0pO1xyXG4vLyAgIH1cclxuLy8gfSk7XHJcblxyXG4kKFwiLnNlbmRBcnRpY2xlRW1haWxcIikuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICBsZXQgZW1haWwgPSAkKFwiLnNlbmRBcnRpY2xlVG9FbWFpbCAjRW1haWxcIikudmFsKCk7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgc2VuZEFydGljbGVUb0VtYWlsKGVtYWlsKTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHRhYmxlID0gJChcIiN1c2Vyc1wiKS5EYXRhVGFibGUoe1xyXG4gICAgbGFuZ3VhZ2U6IHtcclxuICAgICAgdXJsOiBcIi8vY2RuLmRhdGF0YWJsZXMubmV0L3BsdWctaW5zLzEuMTAuMjEvaTE4bi9DemVjaC5qc29uXCIsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gICQoXCIjdXNlcnMgdGJvZHlcIikub24oXCJjbGlja1wiLCBcInRyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBkYXRhID0gdGFibGUucm93KHRoaXMpLmRhdGEoKTtcclxuICAgICQoXCIuZWRpdFVzZXJFdmVudFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChcIi5lZGl0VXNlclwiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgJChcIi5kZWxldGVVc2VyXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAkKFwiI3VwZGF0ZVVzZXJcIikubW9kYWwoXCJzaG93XCIpO1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgJChcIi5lZGl0ICNKbcOpbm9cIikudmFsKGRhdGFbMV0pO1xyXG4gICAgICAkKFwiLmVkaXQgI0VtYWlsXCIpLnZhbChkYXRhWzJdKTtcclxuICAgICAgJChgLmVkaXQgI3JvbGUgb3B0aW9uW3ZhbHVlPSR7ZGF0YVszXX1dYCkuYXR0cihcInNlbGVjdGVkXCIsIFwic2VsZWN0ZWRcIik7XHJcblxyXG4gICAgICAkKFwiLmVkaXRVc2VyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdXNlciA9IHtcclxuICAgICAgICAgIGlkOiBkYXRhWzBdLFxyXG4gICAgICAgICAgbmFtZTogJChcIi5lZGl0ICNKbcOpbm9cIikudmFsKCksXHJcbiAgICAgICAgICBlbWFpbDogJChcIi5lZGl0ICNFbWFpbFwiKS52YWwoKSxcclxuICAgICAgICAgIHBhc3N3b3JkOiAkKFwiLmVkaXQgI0hlc2xvXCIpLnZhbCgpLFxyXG4gICAgICAgICAgcm9sZV9pZDogJChcIi5lZGl0ICNyb2xlXCIpLnZhbCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2F2ZVVzZXIodXNlcik7XHJcbiAgICAgIH0pO1xyXG4gICAgICAkKFwiLmRlbGV0ZVVzZXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCB1c2VyID0ge1xyXG4gICAgICAgICAgaWQ6IGRhdGFbMF0sXHJcbiAgICAgICAgICBuYW1lOiAkKFwiLmVkaXQgI0ptw6lub1wiKS52YWwoKSxcclxuICAgICAgICAgIGVtYWlsOiAkKFwiLmVkaXQgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgICAgICAgcGFzc3dvcmQ6ICQoXCIuZWRpdCAjSGVzbG9cIikudmFsKCksXHJcbiAgICAgICAgICByb2xlX2lkOiAkKFwiLmVkaXQgI3JvbGVcIikudmFsKCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBkZWxldGVVc2VyKHVzZXIpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICB2YXIgdGFibGUgPSAkKFwiI2FydGljbGVzXCIpLkRhdGFUYWJsZSh7XHJcbiAgICBsYW5ndWFnZToge1xyXG4gICAgICB1cmw6IFwiLy9jZG4uZGF0YXRhYmxlcy5uZXQvcGx1Zy1pbnMvMS4xMC4yMS9pMThuL0N6ZWNoLmpzb25cIixcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgJChcIiNhcnRpY2xlcyB0Ym9keVwiKS5vbihcImNsaWNrXCIsIFwidHJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGRhdGEgPSB0YWJsZS5yb3codGhpcykuZGF0YSgpO1xyXG4gICAgYWxsRmlsZXNFZGl0ID0gW107XHJcbiAgICAkKFwiLmVkaXRBcnRpY2xlRXZlbnRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoXCIudXBkYXRlQXJ0aWNsZVwiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgJChcIi5kZWxldGVBcnRpY2xlXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICAgICAgJChcIiNlZGl0QXJ0aWNsZVwiKS5tb2RhbChcInNob3dcIik7XHJcbiAgICAgIC8vIC5kcmFnZ2FibGUoeyBoYW5kbGU6IFwiLm1vZGFsLWhlYWRlclwiIH0pO1xyXG4gICAgICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAgICAgbGV0IGlzQ2hlY2sgPSBkYXRhWzZdICE9PSBcIk5lbsOtXCI7XHJcbiAgICAgIGxldCBwcmljZSA9IGRhdGFbM107XHJcbiAgICAgIGxldCByZXNQcmljZSA9IHByaWNlLnJlcGxhY2UoJ0vEjScsICcnLCkuc3BsaXQoJyAnKS5qb2luKCcnKTtcclxuICAgICAgbGV0IHJlc3VsdCA9IHJlc1ByaWNlLnJlcGxhY2VBbGwoJyZuYnNwOycsICcnKTtcclxuICAgICAgJChcIi5lZGl0QXJ0aWNsZSAjTsOhemV2XCIpLnZhbChkYXRhWzFdKTtcclxuICAgICAgJChcIi5lZGl0QXJ0aWNsZSAjUG9waXNcIikudmFsKGRhdGFbMl0pO1xyXG4gICAgICAkKFwiLmVkaXRBcnRpY2xlICNFbWFpbFwiKS52YWwoZGF0YVs1XSk7XHJcbiAgICAgICQoXCIuZWRpdEFydGljbGUgI0NlbmFcIikudmFsKHJlc3VsdCk7XHJcbiAgICAgICQoXCIuZWRpdEFydGljbGUgI0xva2FsaXRhXCIpLnZhbChkYXRhWzRdKTtcclxuICAgICAgaWYoaXNDaGVjaykge1xyXG4gICAgICAgICQoXCIjcmV6ZXJ2YWNlXCIpLnNob3coKTtcclxuICAgICAgICAkKFwiI3JlemVydmFjZUNoZWNrXCIpLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoXCIjcmV6ZXJ2YWNlXCIpLmhpZGUoKTtcclxuXHJcbiAgICAgIH1cclxuICAgICAgZ2V0QXJ0aWNsZUltYWdlcyhkYXRhW1wiMFwiXSk7XHJcbiAgICAgICQoXCIuZGVsZXRlQXJ0aWNsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5lcnJvclwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5hbGVydFwiKS5oaWRlKCk7XHJcbiAgICAgICAgbGV0IGFydGljbGUgPSB7XHJcbiAgICAgICAgICBpZDogZGF0YVswXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRlbGV0ZUFydGljbGUoYXJ0aWNsZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICAkKFwiLnVwZGF0ZUFydGljbGVcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gICAgICAgIGxldCBpc0NoZWNrID0gJChcIi5lZGl0QXJ0aWNsZSAjcmV6ZXJ2YWNlXCIpLmlzKFwiOmNoZWNrZWRcIikgPyBcIjFcIiA6IFwiMFwiO1xyXG4gICAgICAgIGxldCBhcnRpY2xlID0ge1xyXG4gICAgICAgICAgaWQ6IGRhdGFbMF0sXHJcbiAgICAgICAgICBOw6F6ZXY6ICQoXCIuZWRpdEFydGljbGUgI07DoXpldlwiKS52YWwoKSxcclxuICAgICAgICAgIFBvcGlzOiAkKFwiLmVkaXRBcnRpY2xlICNQb3Bpc1wiKS52YWwoKSxcclxuICAgICAgICAgIEVtYWlsOiAkKFwiLmVkaXRBcnRpY2xlICNFbWFpbFwiKS52YWwoKSxcclxuICAgICAgICAgIExva2FsaXRhOiAkKFwiLmVkaXRBcnRpY2xlICNMb2thbGl0YVwiKS52YWwoKSxcclxuICAgICAgICAgIENlbmE6ICQoXCIuZWRpdEFydGljbGUgI0NlbmFcIikudmFsKCksXHJcbiAgICAgICAgICByZXplcnZhY2U6IGlzQ2hlY2ssXHJcbiAgICAgICAgfTtcclxuICAgICAgICBhcnRpY2xlLmZpbGVzID0gYWxsRmlsZXNFZGl0O1xyXG4gICAgICAgIHNhdmVBcnRpY2xlKGFydGljbGUpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbiQoXCIubG9naW5TdWJtaXRcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQoXCIuZXJyb3JcIikuaGlkZSgpO1xyXG4gICQoXCIuYWxlcnRcIikuaGlkZSgpO1xyXG4gIGxldCB1c2VyID0ge1xyXG4gICAgZW1haWw6ICQoXCIubG9naW5Vc2VyICNFbWFpbFwiKS52YWwoKSxcclxuICAgIHBhc3N3b3JkOiAkKFwiLmxvZ2luVXNlciAjSGVzbG9cIikudmFsKCksXHJcbiAgICB0b2tlbjogJChcIi5sb2dpblVzZXIgI3Rva2VuXCIpLnZhbCgpLFxyXG4gIH07XHJcbiAgaGFuZGxlTG9naW4odXNlcik7XHJcbn0pO1xyXG5cclxuJChcIi5kZWxldGVBcnRpY2xlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAkKFwiLmVycm9yXCIpLmhpZGUoKTtcclxuICAkKFwiLmFsZXJ0XCIpLmhpZGUoKTtcclxuICBsZXQgdXNlciA9IHtcclxuICAgIGVtYWlsOiAkKFwiLmxvZ2luVXNlciAjRW1haWxcIikudmFsKCksXHJcbiAgICBwYXNzd29yZDogJChcIi5sb2dpblVzZXIgI0hlc2xvXCIpLnZhbCgpLFxyXG4gICAgdG9rZW46ICQoXCIubG9naW5Vc2VyICN0b2tlblwiKS52YWwoKSxcclxuICB9O1xyXG4gIGRlbGV0ZUFydGljbGUodXNlcik7XHJcbn0pO1xyXG5cclxuJChcIi51cGxvYWRBcnRpY2xlSW1hZ2VzXCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlXCIpLmNsaWNrKCk7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlXCIpLm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdGZpbGVcIikuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlcyhmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlcyhmaWxlcyk7XHJcbiAgfTtcclxufSk7XHJcblxyXG4kKFwiLnVwbG9hZEFydGljbGVJbWFnZXNFZGl0XCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RmaWxlZWRpdFwiKS5jbGljaygpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZWVkaXRcIikub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmaWxlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0ZmlsZWVkaXRcIikuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlc0VkaXQoZmlsZXMpO1xyXG4gICAgaGFuZGxlRmlsZXNFZGl0KGZpbGVzKTtcclxuICB9O1xyXG59KTtcclxuXHJcbiQoXCIuZHJvcEFydGljbGVJbWFnZXNcIilcclxuICAuYmluZChcImRyYWdlbnRlciBkcmFnb3ZlclwiLCBmYWxzZSlcclxuICAuYmluZChcImRyb3BcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBsZXQgZHQgPSBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyO1xyXG4gICAgbGV0IGZpbGVzID0gZHQuZmlsZXM7XHJcbiAgICBmaWxlcyA9IHJlbmRlckltYWdlcyhmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlcyhmaWxlcyk7XHJcbiAgfSk7XHJcblxyXG4kKFwiLmRyb3BBcnRpY2xlSW1hZ2VzRWRpdFwiKVxyXG4gIC5iaW5kKFwiZHJhZ2VudGVyIGRyYWdvdmVyXCIsIGZhbHNlKVxyXG4gIC5iaW5kKFwiZHJvcFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGxldCBkdCA9IGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7XHJcbiAgICBsZXQgZmlsZXMgPSBkdC5maWxlcztcclxuICAgIGZpbGVzID0gcmVuZGVySW1hZ2VzRWRpdChmaWxlcyk7XHJcbiAgICBoYW5kbGVGaWxlc0VkaXQoZmlsZXMpO1xyXG4gIH0pO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlRmlsZXMoZmlsZXMpIHtcclxuICBmb3IgKGxldCBbaW5kZXgsIGZpbGVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbGVzKSkge1xyXG4gICAgYWxsRmlsZXMucHVzaChmaWxlKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUZpbGVzRWRpdChmaWxlcykge1xyXG4gIGZvciAobGV0IFtpbmRleCwgZmlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsZXMpKSB7XHJcbiAgICBhbGxGaWxlc0VkaXQucHVzaChmaWxlKTtcclxuICB9XHJcblxyXG4gIGNvbnNvbGUubG9nKGFsbEZpbGVzRWRpdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckltYWdlcyhmaWxlcykge1xyXG4gIGNvbnNvbGUubG9nKGZpbGVzKTtcclxuICBmb3IgKGxldCBbaW5kZXgsIGZpbGVdIG9mIE9iamVjdC5lbnRyaWVzKGZpbGVzKSkge1xyXG4gICAgbGV0IGV4dCA9IGdldEV4dChmaWxlLm5hbWUpO1xyXG4gICAgaWYodmFsaWRFeHRlbnNpb25zLmluY2x1ZGVzKGV4dCkpIHtcclxuICAgICAgdmFyIHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XHJcbiAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgaW1nLmNsYXNzTmFtZSA9IFwicHJldmlld0ltYWdlXCI7XHJcbiAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFsZXJ0KFwiUHJhdmTEm3BvZG9ibsSbIG5lcG9kcG9yb3ZhbsO9IHR5cCBvYnLDoXprdS5cIik7XHJcbiAgICAgIH07XHJcbiAgICAgIGltZy5zcmMgPSB1cmw7XHJcblxyXG4gICAgICB2YXIgbnVtYmVyID0gTWF0aC5yYW5kb20oKTtcclxuICAgICAgbnVtYmVyLnRvU3RyaW5nKDM2KTtcclxuICAgICAgdmFyIGlkID0gbnVtYmVyLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSk7XHJcbiAgICAgIGltZy5pZCA9IGlkO1xyXG4gICAgICBmaWxlLmlkID0gaWQ7XHJcbiAgICAgICQoXCIuZHJvcEFydGljbGVQcmV2aWV3XCIpLmFwcGVuZChpbWcpO1xyXG4gICAgICAkKFwiLnByZXZpZXdJbWFnZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICAgICAgaW5kZXggPSBhbGxGaWxlcy5maW5kSW5kZXgoKGZpbGUpID0+IGZpbGUuaWQgPT09IGlkKTtcclxuICAgICAgICBhbGxGaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICQoYCMke2lkfWApLnJlbW92ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwiUHJhdmTEm3BvZG9ibsSbIG5lcG9kcG9yb3ZhbsO9IHR5cCBvYnLDoXprdS5cIik7XHJcbiAgICAgIGZpbGVzID0gMDtcclxuICAgICAgcmV0dXJuIGZpbGVzO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZmlsZXM7XHJcbn1cclxudmFyIHZhbGlkRXh0ZW5zaW9ucyA9IFsnanBnJywncG5nJywnanBlZyddO1xyXG5cclxuZnVuY3Rpb24gcmVuZGVySW1hZ2VzRWRpdChmaWxlcykge1xyXG4gIGZvciAobGV0IFtpbmRleCwgZmlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZmlsZXMpKSB7XHJcbiAgICBsZXQgZXh0ID0gZ2V0RXh0KGZpbGUubmFtZSk7XHJcbiAgICBjb25zb2xlLmxvZyhleHQpXHJcbiAgICBjb25zb2xlLmxvZyh2YWxpZEV4dGVuc2lvbnMuaW5jbHVkZXMoZXh0KSk7XHJcbiAgICBpZih2YWxpZEV4dGVuc2lvbnMuaW5jbHVkZXMoZXh0KSkge1xyXG4gICAgICB2YXIgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcclxuICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBpbWcuY2xhc3NOYW1lID0gXCJwcmV2aWV3SW1hZ2VFZGl0XCI7XHJcbiAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFsZXJ0KFwiUHJhdmTEm3BvZG9ibsSbIG5lcG9kcG9yb3ZhbsO9IHR5cCBvYnLDoXprdS5cIik7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpbWcuc3JjID0gdXJsO1xyXG5cclxuICAgICAgdmFyIG51bWJlciA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgIG51bWJlci50b1N0cmluZygzNik7XHJcbiAgICAgIHZhciBpZCA9IG51bWJlci50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpO1xyXG4gICAgICBpbWcuaWQgPSBpZDtcclxuICAgICAgZmlsZS5pZCA9IGlkO1xyXG4gICAgICAkKFwiLmRyb3BBcnRpY2xlUHJldmlld0ltYWdlc1wiKS5hcHBlbmQoaW1nKTtcclxuICAgICAgJChcIi5wcmV2aWV3SW1hZ2VFZGl0XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKTtcclxuICAgICAgICBpbmRleCA9IGFsbEZpbGVzRWRpdC5maW5kSW5kZXgoKGZpbGUpID0+IGZpbGUuaWQgPT09IGlkKTtcclxuICAgICAgICBhbGxGaWxlc0VkaXQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAkKGAjJHtpZH1gKS5yZW1vdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcIlByYXZkxJtwb2RvYm7EmyBuZXBvZHBvcm92YW7DvSB0eXAgb2Jyw6F6a3UuXCIpO1xyXG4gICAgICBmaWxlcyA9IDA7XHJcbiAgICAgIHJldHVybiBmaWxlcztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGZpbGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRFeHQoZmlsZW5hbWUpXHJcbntcclxuICB2YXIgZXh0ID0gZmlsZW5hbWUuc3BsaXQoJy4nKS5wb3AoKTtcclxuICBpZihleHQgPT0gZmlsZW5hbWUpIHJldHVybiBcIlwiO1xyXG4gIHJldHVybiBleHQ7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==