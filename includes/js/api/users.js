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
      console.log(res);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log(errorMessage);
    },
  });
}

const customValidationMessage = {
  name: "Jméno",
  email: "Email",
  role_id: "Roli",
  password: "Heslo",
};

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
      if (res["errors"]) {
        Object.entries(res["errors"]).forEach(([property, messages]) => {
          messages.forEach((message) => {
            console.log;
            let name = customValidationMessage[property];
            $(".error").show();
            $(`#err${name}`).text(name + message);
          });
        });
      }
      console.log("true");
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log(errorMessage);
    },
  });
}

module.exports = { createUser, updateUser };
