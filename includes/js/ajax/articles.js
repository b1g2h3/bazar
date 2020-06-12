const customValidationMessage = {
  name: "Jméno",
  email: "Email",
  role_id: "Roli",
  password: "Heslo",
};

function addArticle(article) {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/ajax.php",
    data: {
      method: "addArticle",
      data: JSON.stringify(article),
    },
    success: function (res) {
      console.log(res);
      //   $(".error").hide();
      //   console.log($(".error"));
      //   if (res["errors"]) {
      //     const errors = res["errors"];
      //     for (let [input, msg] of Object.entries(errors)) {
      //       let name = customValidationMessage[input];
      //       $(".error").show();
      //       $(`#err${name}`).text(msg);
      //     }
      //   }
      //   if (res["success"]) {
      //     $("#addUser").modal("hide");
      //     $(".alert-success").show().text(res["success"]);
      //     var t = $("#users").DataTable();
      //     var counter = 1;
      //     user = res.user;
      //     t.row
      //       .add([
      //         user.id,
      //         user.name,
      //         user.email,
      //         user.role === 1 ? "Admin" : "Editor",
      //       ])
      //       .draw(false);
      //   }
    },
    error: function (xhr, status, error) {
      console.log(xhr, status, error);
    },
  });
}

function updateArticle(article) {
  console.log(article);
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/ajax.php",
    data: {
      method: "updateArticle",
      data: JSON.stringify(article),
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
      //     $(".alert-success").show().text(res["success"]);
      //     let t = $("#users").DataTable();
      //     let rowId = $("#users").dataTable().fnFindCellRowIndexes(user.id, 0);
      //     t.row(rowId)
      //       .data([
      //         user.id,
      //         user.name,
      //         user.email,
      //         user.role === 1 ? "Admin" : "Editor",
      //       ])
      //       .invalidate();
      //   }
    },
    error: function (xhr, status, error) {
      console.log(xhr, status, error);
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

module.exports = { addArticle, updateArticle, deleteArticle };
