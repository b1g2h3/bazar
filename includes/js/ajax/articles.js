function createArticle(article) {
    let fd = new FormData();
      for(i=0; i<article.files.length; i++) {
        fd.append('file[]', article.files[i]);
      }
      fd.append('data', JSON.stringify(article))
      fd.append('method', 'addArticle')
      $.ajax({
        type: 'POST',
        url: 'ajax.php',
        contentType: false,
        processData: false,
        data: fd,
        success:function(res) {
          res = JSON.parse(res);
          console.log(res);
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
            t.row.add([
                article.id,
                article.Název,
                article.Popis,
                article.Cena,
                article.Lokalita
            ]).draw(false);
          }

        }
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

module.exports = { createArticle, updateArticle, deleteArticle };
