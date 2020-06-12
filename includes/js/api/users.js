const customValidationMessage = {
  name: "Jméno",
  email: "Email",
  role_id: "Roli",
  password: "Heslo",
};

function createUser(user) {
  console.log(user);
  $.ajax({
    type: "POST", // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
    dataType: "json", // Set datatype - affects Accept header
    url: "/adduser", // A valid URL
    data: {
      method: "_POST",
      data: JSON.stringify(user),
    }, // Some data e.g. Valid JSON as a string
    success: function (res) {
      $(".error").hide();
      if (res["errors"]) {
        const errors = res["errors"];
        errors.map((error) => {
          for (let [input, msg] of Object.entries(error)) {
            let name = customValidationMessage[input];
            $(".error").show();
            $(`#err${name}`).text(msg);
          }
        });
      }
      if (res["success"]) {
        console.log(res["success"]);
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
    type: "POST", // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
    dataType: "json", // Set datatype - affects Accept header
    url: "/edituser", // A valid URL
    data: {
      method: "_POST",
      data: JSON.stringify(user),
    }, // Some data e.g. Valid JSON as a string
    success: function (res) {
      console.log(res);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log(errorMessage);
    },
  });
}

module.exports = { createUser, updateUser };
