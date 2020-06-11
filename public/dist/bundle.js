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

/***/ "./includes/js/api/users.js":
/*!**********************************!*\
  !*** ./includes/js/api/users.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
        console.log(res);
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


/***/ }),

/***/ "./includes/js/app.js":
/*!****************************!*\
  !*** ./includes/js/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { updateUser, createUser } = __webpack_require__(/*! ./api/users */ "./includes/js/api/users.js")
const { validationMessages, printErrors } = __webpack_require__(/*! ./func/validation */ "./includes/js/func/validation.js");

function saveUser(user) {
    if (user.id == null) {
        createUser(user);
    } else {
        updateUser(user);
    }
}
function validateUser(user) {
    const validations = {
        name: {
            required: true,
            length: 3,
        },
        email: {
            required: true,
            length: 8,
        },
        role_id: {
            required: true,
        },
        password: {
            required: false,
        },
    };

    const errors = validationMessages(validations, user);
    $('.error').hide();

    return {
        valid: Object.values(errors).every((messages) => messages.length === 0),
        errors: errors,
    };
}
$(document).ready(function () {
    var table = $("#users").DataTable();
    $("#users tbody").on("click", "tr", function () {
        var data = table.row(this).data();
        $(".edit_user").unbind("click");
        $("#updateUser").modal("show");
        $('.error').hide();
        $(".edit #Jméno").val(data[1]);
        $(".edit #Email").val(data[2]);
        $(`.edit #role option[value=${data[3]}]`).attr("selected", "selected");
        $(".edit_user").click(function () {
            let user = {
                id: data[0],
                name: $(".edit #Jméno").val(),
                email: $(".edit #Email").val(),
                password: $(".edit #Heslo").val(),
                role_id: $(".edit #role").val(),
            };
            const { errors, valid } = validateUser(user);
            if (valid) {
                saveUser(user);
            } else {
                printErrors(errors);
            }
        });
    });
});

$(".createUser").click(function () {
    $('.error').hide();
    let user = {
        name: $(".create #Jméno").val(),
        email: $(".create #Email").val(),
        role_id: $(".create #role").val(),
        password: $(".create #Heslo").val(),
    };
    const { errors, valid } = validateUser(user);
    if (valid) {
        saveUser(user);
    } else {
        printErrors(errors);
    }
});



/***/ }),

/***/ "./includes/js/func/validation.js":
/*!****************************************!*\
  !*** ./includes/js/func/validation.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function validationMessages(validations, object) {
  return Object.entries(validations).reduce(
    (errors, [property, requirements]) => {
      errors[property] = [];
      if (requirements.required) {
        const errorMessage = validateRequiredMessage(object[property]);
        if (errorMessage) errors[property].push(errorMessage);
      }

      if (requirements.length) {
        const errorMessage = validateLengthMessage(
          object[property],
          requirements.length
        );
        if (errorMessage) errors[property].push(errorMessage);
      }

      return errors;
    },
    {}
  );
}

function validateLengthMessage(value, length) {
  if (value == null) return;
  if (value.length >= length) return;

  return ` musí být alespoň ${length} znaků`;
}

function validateRequiredMessage(value) {
  if (value) return;

  return " je nutné vyplnit";
}
const customValidationMessage = {
    name: 'Jméno',
    email: 'Email',
    role_id: 'Roli',
    password: 'Heslo',
}
function printErrors(errors, type) {
  Object.entries(errors).forEach(([property, messages]) => {
    messages.forEach((message) => {
        let name =customValidationMessage[property];
        $('.error').show();
        $(`#err${name}`).text(name + message);
    });
  });
}

module.exports = {
  validationMessages,
  printErrors,
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYXBpL3VzZXJzLmpzIiwid2VicGFjazovLy8uL2luY2x1ZGVzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9mdW5jL3ZhbGlkYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQSxrQkFBa0I7Ozs7Ozs7Ozs7OztBQzNDbEIsT0FBTyx5QkFBeUIsR0FBRyxtQkFBTyxDQUFDLCtDQUFhO0FBQ3hELE9BQU8sa0NBQWtDLEdBQUcsbUJBQU8sQ0FBQywyREFBbUI7O0FBRXZFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnQkFBZ0I7QUFDbkM7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDOUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEIsT0FBTztBQUNyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLEtBQUs7QUFDdEIsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luY2x1ZGVzL2pzL2FwcC5qc1wiKTtcbiIsImZ1bmN0aW9uIGNyZWF0ZVVzZXIodXNlcikge1xyXG4gIGNvbnNvbGUubG9nKHVzZXIpO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIiwgLy8gVXNlIFBPU1Qgd2l0aCBYLUhUVFAtTWV0aG9kLU92ZXJyaWRlIG9yIGEgc3RyYWlnaHQgUFVUIGlmIGFwcHJvcHJpYXRlLlxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLCAvLyBTZXQgZGF0YXR5cGUgLSBhZmZlY3RzIEFjY2VwdCBoZWFkZXJcclxuICAgIHVybDogXCIvYWRkdXNlclwiLCAvLyBBIHZhbGlkIFVSTFxyXG4gICAgZGF0YToge1xyXG4gICAgICBtZXRob2Q6IFwiX1BPU1RcIixcclxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICB9LCAvLyBTb21lIGRhdGEgZS5nLiBWYWxpZCBKU09OIGFzIGEgc3RyaW5nXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IHhoci5zdGF0dXMgKyBcIjogXCIgKyB4aHIuc3RhdHVzVGV4dDtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVVzZXIodXNlcikge1xyXG4gIGNvbnNvbGUubG9nKHVzZXIpO1xyXG4gICQuYWpheCh7XHJcbiAgICB0eXBlOiBcIlBPU1RcIiwgLy8gVXNlIFBPU1Qgd2l0aCBYLUhUVFAtTWV0aG9kLU92ZXJyaWRlIG9yIGEgc3RyYWlnaHQgUFVUIGlmIGFwcHJvcHJpYXRlLlxyXG4gICAgZGF0YVR5cGU6IFwianNvblwiLCAvLyBTZXQgZGF0YXR5cGUgLSBhZmZlY3RzIEFjY2VwdCBoZWFkZXJcclxuICAgIHVybDogXCIvZWRpdHVzZXJcIiwgLy8gQSB2YWxpZCBVUkxcclxuICAgIGRhdGE6IHtcclxuICAgICAgbWV0aG9kOiBcIl9QT1NUXCIsXHJcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgfSwgLy8gU29tZSBkYXRhIGUuZy4gVmFsaWQgSlNPTiBhcyBhIHN0cmluZ1xyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICBpZiAocmVzW1wiZXJyb3JzXCJdKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcInRydWVcIik7XHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IHhoci5zdGF0dXMgKyBcIjogXCIgKyB4aHIuc3RhdHVzVGV4dDtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBjcmVhdGVVc2VyLCB1cGRhdGVVc2VyIH07XHJcbiIsImNvbnN0IHsgdXBkYXRlVXNlciwgY3JlYXRlVXNlciB9ID0gcmVxdWlyZSgnLi9hcGkvdXNlcnMnKVxyXG5jb25zdCB7IHZhbGlkYXRpb25NZXNzYWdlcywgcHJpbnRFcnJvcnMgfSA9IHJlcXVpcmUoXCIuL2Z1bmMvdmFsaWRhdGlvblwiKTtcclxuXHJcbmZ1bmN0aW9uIHNhdmVVc2VyKHVzZXIpIHtcclxuICAgIGlmICh1c2VyLmlkID09IG51bGwpIHtcclxuICAgICAgICBjcmVhdGVVc2VyKHVzZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB1cGRhdGVVc2VyKHVzZXIpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHZhbGlkYXRlVXNlcih1c2VyKSB7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9ucyA9IHtcclxuICAgICAgICBuYW1lOiB7XHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICBsZW5ndGg6IDMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbWFpbDoge1xyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgbGVuZ3RoOiA4LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sZV9pZDoge1xyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7XHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBlcnJvcnMgPSB2YWxpZGF0aW9uTWVzc2FnZXModmFsaWRhdGlvbnMsIHVzZXIpO1xyXG4gICAgJCgnLmVycm9yJykuaGlkZSgpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsaWQ6IE9iamVjdC52YWx1ZXMoZXJyb3JzKS5ldmVyeSgobWVzc2FnZXMpID0+IG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCksXHJcbiAgICAgICAgZXJyb3JzOiBlcnJvcnMsXHJcbiAgICB9O1xyXG59XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0YWJsZSA9ICQoXCIjdXNlcnNcIikuRGF0YVRhYmxlKCk7XHJcbiAgICAkKFwiI3VzZXJzIHRib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCJ0clwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB0YWJsZS5yb3codGhpcykuZGF0YSgpO1xyXG4gICAgICAgICQoXCIuZWRpdF91c2VyXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAgICQoXCIjdXBkYXRlVXNlclwiKS5tb2RhbChcInNob3dcIik7XHJcbiAgICAgICAgJCgnLmVycm9yJykuaGlkZSgpO1xyXG4gICAgICAgICQoXCIuZWRpdCAjSm3DqW5vXCIpLnZhbChkYXRhWzFdKTtcclxuICAgICAgICAkKFwiLmVkaXQgI0VtYWlsXCIpLnZhbChkYXRhWzJdKTtcclxuICAgICAgICAkKGAuZWRpdCAjcm9sZSBvcHRpb25bdmFsdWU9JHtkYXRhWzNdfV1gKS5hdHRyKFwic2VsZWN0ZWRcIiwgXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAkKFwiLmVkaXRfdXNlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB1c2VyID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGRhdGFbMF0sXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAkKFwiLmVkaXQgI0ptw6lub1wiKS52YWwoKSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiAkKFwiLmVkaXQgI0VtYWlsXCIpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICQoXCIuZWRpdCAjSGVzbG9cIikudmFsKCksXHJcbiAgICAgICAgICAgICAgICByb2xlX2lkOiAkKFwiLmVkaXQgI3JvbGVcIikudmFsKCksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IHsgZXJyb3JzLCB2YWxpZCB9ID0gdmFsaWRhdGVVc2VyKHVzZXIpO1xyXG4gICAgICAgICAgICBpZiAodmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIHNhdmVVc2VyKHVzZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJpbnRFcnJvcnMoZXJyb3JzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuJChcIi5jcmVhdGVVc2VyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5lcnJvcicpLmhpZGUoKTtcclxuICAgIGxldCB1c2VyID0ge1xyXG4gICAgICAgIG5hbWU6ICQoXCIuY3JlYXRlICNKbcOpbm9cIikudmFsKCksXHJcbiAgICAgICAgZW1haWw6ICQoXCIuY3JlYXRlICNFbWFpbFwiKS52YWwoKSxcclxuICAgICAgICByb2xlX2lkOiAkKFwiLmNyZWF0ZSAjcm9sZVwiKS52YWwoKSxcclxuICAgICAgICBwYXNzd29yZDogJChcIi5jcmVhdGUgI0hlc2xvXCIpLnZhbCgpLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHsgZXJyb3JzLCB2YWxpZCB9ID0gdmFsaWRhdGVVc2VyKHVzZXIpO1xyXG4gICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgICAgc2F2ZVVzZXIodXNlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByaW50RXJyb3JzKGVycm9ycyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiZnVuY3Rpb24gdmFsaWRhdGlvbk1lc3NhZ2VzKHZhbGlkYXRpb25zLCBvYmplY3QpIHtcclxuICByZXR1cm4gT2JqZWN0LmVudHJpZXModmFsaWRhdGlvbnMpLnJlZHVjZShcclxuICAgIChlcnJvcnMsIFtwcm9wZXJ0eSwgcmVxdWlyZW1lbnRzXSkgPT4ge1xyXG4gICAgICBlcnJvcnNbcHJvcGVydHldID0gW107XHJcbiAgICAgIGlmIChyZXF1aXJlbWVudHMucmVxdWlyZWQpIHtcclxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSB2YWxpZGF0ZVJlcXVpcmVkTWVzc2FnZShvYmplY3RbcHJvcGVydHldKTtcclxuICAgICAgICBpZiAoZXJyb3JNZXNzYWdlKSBlcnJvcnNbcHJvcGVydHldLnB1c2goZXJyb3JNZXNzYWdlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlcXVpcmVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSB2YWxpZGF0ZUxlbmd0aE1lc3NhZ2UoXHJcbiAgICAgICAgICBvYmplY3RbcHJvcGVydHldLFxyXG4gICAgICAgICAgcmVxdWlyZW1lbnRzLmxlbmd0aFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkgZXJyb3JzW3Byb3BlcnR5XS5wdXNoKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICB9LFxyXG4gICAge31cclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUxlbmd0aE1lc3NhZ2UodmFsdWUsIGxlbmd0aCkge1xyXG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm47XHJcbiAgaWYgKHZhbHVlLmxlbmd0aCA+PSBsZW5ndGgpIHJldHVybjtcclxuXHJcbiAgcmV0dXJuIGAgbXVzw60gYsO9dCBhbGVzcG/FiCAke2xlbmd0aH0gem5ha8WvYDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVSZXF1aXJlZE1lc3NhZ2UodmFsdWUpIHtcclxuICBpZiAodmFsdWUpIHJldHVybjtcclxuXHJcbiAgcmV0dXJuIFwiIGplIG51dG7DqSB2eXBsbml0XCI7XHJcbn1cclxuY29uc3QgY3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2UgPSB7XHJcbiAgICBuYW1lOiAnSm3DqW5vJyxcclxuICAgIGVtYWlsOiAnRW1haWwnLFxyXG4gICAgcm9sZV9pZDogJ1JvbGknLFxyXG4gICAgcGFzc3dvcmQ6ICdIZXNsbycsXHJcbn1cclxuZnVuY3Rpb24gcHJpbnRFcnJvcnMoZXJyb3JzLCB0eXBlKSB7XHJcbiAgT2JqZWN0LmVudHJpZXMoZXJyb3JzKS5mb3JFYWNoKChbcHJvcGVydHksIG1lc3NhZ2VzXSkgPT4ge1xyXG4gICAgbWVzc2FnZXMuZm9yRWFjaCgobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGxldCBuYW1lID1jdXN0b21WYWxpZGF0aW9uTWVzc2FnZVtwcm9wZXJ0eV07XHJcbiAgICAgICAgJCgnLmVycm9yJykuc2hvdygpO1xyXG4gICAgICAgICQoYCNlcnIke25hbWV9YCkudGV4dChuYW1lICsgbWVzc2FnZSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgdmFsaWRhdGlvbk1lc3NhZ2VzLFxyXG4gIHByaW50RXJyb3JzLFxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9