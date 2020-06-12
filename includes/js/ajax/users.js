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
      data: JSON.stringify(user)
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
        $('.alert').show().text(res['success']);
        var t = $('#users').DataTable();
        var counter = 1;
        user = res.user;
        t.row.add( [
          user.id,
          user.name,
          user.email,
          user.role === 1 ? 'Admin' : 'Editor',
        ] ).draw( false );
      }
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log(errorMessage);
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
      method: "editUser",
      data: JSON.stringify(user)
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
        $('.alert').show().text(res['success']);
        var t = $('#users').DataTable();
        var counter = 1;
        user = res.user;
        console.log(t.row(0).data());
        // t.row.add( [
        //   user.id,
        //   user.name,
        //   user.email,
        //   user.role === 1 ? 'Admin' : 'Editor',
        // ] ).draw( false );
      }
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log(errorMessage);
    },
  });
}

function handleLogin(user) {
  console.log('login');
  console.log(user);
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/prihlasit",
    data: {
      method: "_POST",
      data: JSON.stringify(user),
    },
    success: function (res) {
      $(".error").hide();
      console.log(res);
      // if (res["errors"]) {
      //   const errors = res["errors"];
      //   errors.map((error) => {
      //     for (let [input, msg] of Object.entries(error)) {
      //       let name = customValidationMessage[input];
      //       $(".error").show();
      //       $(`#err${name}`).text(msg);
      //     }
      //   });
      // }
      // if (res["success"]) {
      //   console.log(res["success"]);
      // }
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log(errorMessage);
    },
  });
}

module.exports = { createUser, updateUser, handleLogin };
