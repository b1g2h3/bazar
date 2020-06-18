
const { createUser, updateUser, deleteUser } = require("./ajax/users");
const { handleLogin } = require("./ajax/auth");
const {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleImages,
  sendArticleToEmail,
  sendReservationToEmail,
} = require("./ajax/articles");
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
