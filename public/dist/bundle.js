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
    $.ajax({
        type: "POST", // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
        dataType: "json", // Set datatype - affects Accept header
        url: "/adduser", // A valid URL
        data: {
            method: "_POST",
            data: JSON.stringify(user),
        }, // Some data e.g. Valid JSON as a string
        success: function (res) {
            var res = JSON.parse(res);
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
            var res = JSON.parse(res);
            console.log(res);
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ": " + xhr.statusText;
            console.log(errorMessage);
        },
    });
}

module.exports = { createUser, updateUser }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5jbHVkZXMvanMvYXBpL3VzZXJzLmpzIiwid2VicGFjazovLy8uL2luY2x1ZGVzL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9pbmNsdWRlcy9qcy9mdW5jL3ZhbGlkYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBLGtCQUFrQix5Qjs7Ozs7Ozs7Ozs7QUN6Q2xCLE9BQU8seUJBQXlCLEdBQUcsbUJBQU8sQ0FBQywrQ0FBYTtBQUN4RCxPQUFPLGtDQUFrQyxHQUFHLG1CQUFPLENBQUMsMkRBQW1COztBQUV2RTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0JBQWdCO0FBQ25DO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzlFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCLE9BQU87QUFDckM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixLQUFLO0FBQ3RCLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmNsdWRlcy9qcy9hcHAuanNcIik7XG4iLCJmdW5jdGlvbiBjcmVhdGVVc2VyKHVzZXIpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsIC8vIFVzZSBQT1NUIHdpdGggWC1IVFRQLU1ldGhvZC1PdmVycmlkZSBvciBhIHN0cmFpZ2h0IFBVVCBpZiBhcHByb3ByaWF0ZS5cclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsIC8vIFNldCBkYXRhdHlwZSAtIGFmZmVjdHMgQWNjZXB0IGhlYWRlclxyXG4gICAgICAgIHVybDogXCIvYWRkdXNlclwiLCAvLyBBIHZhbGlkIFVSTFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIl9QT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgICAgIH0sIC8vIFNvbWUgZGF0YSBlLmcuIFZhbGlkIEpTT04gYXMgYSBzdHJpbmdcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIHZhciByZXMgPSBKU09OLnBhcnNlKHJlcyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0geGhyLnN0YXR1cyArIFwiOiBcIiArIHhoci5zdGF0dXNUZXh0O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVXNlcih1c2VyKSB7XHJcbiAgICBjb25zb2xlLmxvZyh1c2VyKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsIC8vIFVzZSBQT1NUIHdpdGggWC1IVFRQLU1ldGhvZC1PdmVycmlkZSBvciBhIHN0cmFpZ2h0IFBVVCBpZiBhcHByb3ByaWF0ZS5cclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsIC8vIFNldCBkYXRhdHlwZSAtIGFmZmVjdHMgQWNjZXB0IGhlYWRlclxyXG4gICAgICAgIHVybDogXCIvZWRpdHVzZXJcIiwgLy8gQSB2YWxpZCBVUkxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJfUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuICAgICAgICB9LCAvLyBTb21lIGRhdGEgZS5nLiBWYWxpZCBKU09OIGFzIGEgc3RyaW5nXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IHhoci5zdGF0dXMgKyBcIjogXCIgKyB4aHIuc3RhdHVzVGV4dDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBjcmVhdGVVc2VyLCB1cGRhdGVVc2VyIH0iLCJjb25zdCB7IHVwZGF0ZVVzZXIsIGNyZWF0ZVVzZXIgfSA9IHJlcXVpcmUoJy4vYXBpL3VzZXJzJylcclxuY29uc3QgeyB2YWxpZGF0aW9uTWVzc2FnZXMsIHByaW50RXJyb3JzIH0gPSByZXF1aXJlKFwiLi9mdW5jL3ZhbGlkYXRpb25cIik7XHJcblxyXG5mdW5jdGlvbiBzYXZlVXNlcih1c2VyKSB7XHJcbiAgICBpZiAodXNlci5pZCA9PSBudWxsKSB7XHJcbiAgICAgICAgY3JlYXRlVXNlcih1c2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXBkYXRlVXNlcih1c2VyKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB2YWxpZGF0ZVVzZXIodXNlcikge1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbnMgPSB7XHJcbiAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgbGVuZ3RoOiAzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW1haWw6IHtcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGxlbmd0aDogOCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGVfaWQ6IHtcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXNzd29yZDoge1xyXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZXJyb3JzID0gdmFsaWRhdGlvbk1lc3NhZ2VzKHZhbGlkYXRpb25zLCB1c2VyKTtcclxuICAgICQoJy5lcnJvcicpLmhpZGUoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbGlkOiBPYmplY3QudmFsdWVzKGVycm9ycykuZXZlcnkoKG1lc3NhZ2VzKSA9PiBtZXNzYWdlcy5sZW5ndGggPT09IDApLFxyXG4gICAgICAgIGVycm9yczogZXJyb3JzLFxyXG4gICAgfTtcclxufVxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdGFibGUgPSAkKFwiI3VzZXJzXCIpLkRhdGFUYWJsZSgpO1xyXG4gICAgJChcIiN1c2VycyB0Ym9keVwiKS5vbihcImNsaWNrXCIsIFwidHJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkYXRhID0gdGFibGUucm93KHRoaXMpLmRhdGEoKTtcclxuICAgICAgICAkKFwiLmVkaXRfdXNlclwiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgICAkKFwiI3VwZGF0ZVVzZXJcIikubW9kYWwoXCJzaG93XCIpO1xyXG4gICAgICAgICQoJy5lcnJvcicpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLmVkaXQgI0ptw6lub1wiKS52YWwoZGF0YVsxXSk7XHJcbiAgICAgICAgJChcIi5lZGl0ICNFbWFpbFwiKS52YWwoZGF0YVsyXSk7XHJcbiAgICAgICAgJChgLmVkaXQgI3JvbGUgb3B0aW9uW3ZhbHVlPSR7ZGF0YVszXX1dYCkuYXR0cihcInNlbGVjdGVkXCIsIFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgJChcIi5lZGl0X3VzZXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgdXNlciA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBkYXRhWzBdLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJChcIi5lZGl0ICNKbcOpbm9cIikudmFsKCksXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogJChcIi5lZGl0ICNFbWFpbFwiKS52YWwoKSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkKFwiLmVkaXQgI0hlc2xvXCIpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgcm9sZV9pZDogJChcIi5lZGl0ICNyb2xlXCIpLnZhbCgpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCB7IGVycm9ycywgdmFsaWQgfSA9IHZhbGlkYXRlVXNlcih1c2VyKTtcclxuICAgICAgICAgICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBzYXZlVXNlcih1c2VyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByaW50RXJyb3JzKGVycm9ycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbiQoXCIuY3JlYXRlVXNlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcuZXJyb3InKS5oaWRlKCk7XHJcbiAgICBsZXQgdXNlciA9IHtcclxuICAgICAgICBuYW1lOiAkKFwiLmNyZWF0ZSAjSm3DqW5vXCIpLnZhbCgpLFxyXG4gICAgICAgIGVtYWlsOiAkKFwiLmNyZWF0ZSAjRW1haWxcIikudmFsKCksXHJcbiAgICAgICAgcm9sZV9pZDogJChcIi5jcmVhdGUgI3JvbGVcIikudmFsKCksXHJcbiAgICAgICAgcGFzc3dvcmQ6ICQoXCIuY3JlYXRlICNIZXNsb1wiKS52YWwoKSxcclxuICAgIH07XHJcbiAgICBjb25zdCB7IGVycm9ycywgdmFsaWQgfSA9IHZhbGlkYXRlVXNlcih1c2VyKTtcclxuICAgIGlmICh2YWxpZCkge1xyXG4gICAgICAgIHNhdmVVc2VyKHVzZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwcmludEVycm9ycyhlcnJvcnMpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiIsImZ1bmN0aW9uIHZhbGlkYXRpb25NZXNzYWdlcyh2YWxpZGF0aW9ucywgb2JqZWN0KSB7XHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHZhbGlkYXRpb25zKS5yZWR1Y2UoXHJcbiAgICAoZXJyb3JzLCBbcHJvcGVydHksIHJlcXVpcmVtZW50c10pID0+IHtcclxuICAgICAgZXJyb3JzW3Byb3BlcnR5XSA9IFtdO1xyXG4gICAgICBpZiAocmVxdWlyZW1lbnRzLnJlcXVpcmVkKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gdmFsaWRhdGVSZXF1aXJlZE1lc3NhZ2Uob2JqZWN0W3Byb3BlcnR5XSk7XHJcbiAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkgZXJyb3JzW3Byb3BlcnR5XS5wdXNoKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXF1aXJlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gdmFsaWRhdGVMZW5ndGhNZXNzYWdlKFxyXG4gICAgICAgICAgb2JqZWN0W3Byb3BlcnR5XSxcclxuICAgICAgICAgIHJlcXVpcmVtZW50cy5sZW5ndGhcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChlcnJvck1lc3NhZ2UpIGVycm9yc1twcm9wZXJ0eV0ucHVzaChlcnJvck1lc3NhZ2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfSxcclxuICAgIHt9XHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVMZW5ndGhNZXNzYWdlKHZhbHVlLCBsZW5ndGgpIHtcclxuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuO1xyXG4gIGlmICh2YWx1ZS5sZW5ndGggPj0gbGVuZ3RoKSByZXR1cm47XHJcblxyXG4gIHJldHVybiBgIG11c8OtIGLDvXQgYWxlc3BvxYggJHtsZW5ndGh9IHpuYWvFr2A7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlUmVxdWlyZWRNZXNzYWdlKHZhbHVlKSB7XHJcbiAgaWYgKHZhbHVlKSByZXR1cm47XHJcblxyXG4gIHJldHVybiBcIiBqZSBudXRuw6kgdnlwbG5pdFwiO1xyXG59XHJcbmNvbnN0IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlID0ge1xyXG4gICAgbmFtZTogJ0ptw6lubycsXHJcbiAgICBlbWFpbDogJ0VtYWlsJyxcclxuICAgIHJvbGVfaWQ6ICdSb2xpJyxcclxuICAgIHBhc3N3b3JkOiAnSGVzbG8nLFxyXG59XHJcbmZ1bmN0aW9uIHByaW50RXJyb3JzKGVycm9ycywgdHlwZSkge1xyXG4gIE9iamVjdC5lbnRyaWVzKGVycm9ycykuZm9yRWFjaCgoW3Byb3BlcnR5LCBtZXNzYWdlc10pID0+IHtcclxuICAgIG1lc3NhZ2VzLmZvckVhY2goKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBsZXQgbmFtZSA9Y3VzdG9tVmFsaWRhdGlvbk1lc3NhZ2VbcHJvcGVydHldO1xyXG4gICAgICAgICQoJy5lcnJvcicpLnNob3coKTtcclxuICAgICAgICAkKGAjZXJyJHtuYW1lfWApLnRleHQobmFtZSArIG1lc3NhZ2UpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHZhbGlkYXRpb25NZXNzYWdlcyxcclxuICBwcmludEVycm9ycyxcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==