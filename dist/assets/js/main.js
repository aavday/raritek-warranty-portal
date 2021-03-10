"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var offset;
var body = document.querySelector('body');
var header = document.querySelector('.header');
var footer = document.querySelector('.footer');
var html = document.querySelector('html');
var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

if (window.innerHeight == documentHeight) {
  body.style.paddingRight = '17px';
  header.style.paddingRight = '17px';
  header.style.width = 'calc(100% + 17px)';
  footer.style.paddingRight = '17px';
  footer.style.width = 'calc(100% + 17px)';
}

; // No scroll for body

var bodyScrollOff = function bodyScrollOff() {
  body.classList.add('lock');
  body.style.position = 'fixed';
  body.style.width = '100%';
  body.style.top = "-".concat(offset, "px");
};

var bodyScrollOn = function bodyScrollOn() {
  body.classList.remove('lock');
  body.style.position = '';
  body.style.width = '';
  body.style.top = '';
  window.scrollTo({
    top: offset
  });
}; // File Inputs Image Preview


var fileInputLabels = document.querySelectorAll('.form-file');

var fileInputsPreviewImgs = function fileInputsPreviewImgs(label) {
  var input = label.querySelector('input');
  var imgWrapper = label.querySelector('.form-file-img-wrapper');
  var reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  reader.addEventListener('load', function () {
    label.classList.remove('dragovered');
    label.classList.add('inputed');

    if (!label.querySelector('.cross-close')) {
      var closeCross = document.createElement('span');
      closeCross.classList.add('cross', 'cross-close', 'cross-grey');
      label.append(closeCross);
    }

    label.querySelector('.cross-close').addEventListener('click', function () {
      deleteInput(label);
    });

    if (input.files[0].type == 'image/jpeg') {
      imgWrapper.innerHTML = "<img src=\"".concat(reader.result, "\" alt=\"\" class=\"form-file-img\">");
    } else if (input.files[0].type == 'application/pdf') {
      imgWrapper.innerHTML = "<div class=\"form-file-name\">".concat(input.files[0].name, "</div>");
    }
  });
}; // Deleting inputs


var deleteInput = function deleteInput(label) {
  label.parentElement.remove();
  var deletedInputId = label.getAttribute('for');
  var deletedInputIndex = Number(deletedInputId[deletedInputId.length - 1]);
  var labelsAfterDeletedLabel = [];
  var deletedInputIdClean = deletedInputId.replace('-' + deletedInputIndex, '');

  if (deletedInputIndex) {
    for (var i = deletedInputIndex + 1; i < 999; i++) {
      var _label = document.querySelector(".form-file[for=\"".concat(deletedInputIdClean + '-' + i, "\"]"));

      if (_label) {
        labelsAfterDeletedLabel.push(_label);
      } else {
        break;
      }
    }
  } else {
    document.querySelector(".form-file[for=\"".concat(deletedInputId, "-1\"]")).setAttribute('for', deletedInputId);

    for (var _i = 2; _i < 999; _i++) {
      var _label2 = document.querySelector(".form-file[for=\"".concat(deletedInputIdClean + '-' + _i, "\"]"));

      if (_label2) {
        labelsAfterDeletedLabel.push(_label2);
      } else {
        break;
      }
    }
  }

  labelsAfterDeletedLabel.forEach(function (label) {
    var inputId = label.getAttribute('for');
    var index = Number(inputId[inputId.length - 1]);
    var correctedInputId = label.getAttribute('for').replace("-".concat(index), "-".concat(index - 1));
    label.setAttribute('for', correctedInputId);
  });
}; // File inputs initialization


var fileInputsInit = function fileInputsInit(label) {
  var input = label.querySelector('input');
  label.addEventListener('dragover', function (event) {
    event.preventDefault();
  });
  label.addEventListener('drop', function (event) {
    event.preventDefault();
    var fileType = event.dataTransfer.files[0].type;

    if (fileType === 'image/jpeg' || fileType === 'application/pdf') {
      input.files = event.dataTransfer.files;
      fileInputsPreviewImgs(label);
    } else {
      label.classList.remove('dragovered');
    }
  });
  label.addEventListener('dragenter', function () {
    label.classList.add('dragovered');
  });
  label.addEventListener('dragleave', function () {
    label.classList.remove('dragovered');
  });

  if (label.querySelector('.cross-close')) {
    label.querySelector('.cross-close').addEventListener('click', function () {
      deleteInput(label);
    });
  }

  input.addEventListener('change', function () {
    fileInputsPreviewImgs(label);
  });
};

if (fileInputLabels) {
  fileInputLabels.forEach(function (label) {
    fileInputsInit(label);
  });
} // Adding Inputs


var addInputBtns = document.querySelectorAll('.add-input');

if (addInputBtns) {
  addInputBtns.forEach(function (addBtn) {
    var index = 1;
    addBtn.addEventListener('click', function (event) {
      event.preventDefault();
      var labels = [];

      for (var i = 1; i < 999; i++) {
        var label = document.querySelector(".form-file[for='".concat(addBtn.getAttribute('data-add') + '-' + i, "'"));

        if (label) {
          labels.push(label);
        } else {
          index = i;
          break;
        }
      }

      var inputId;

      if (document.querySelector(".form-file[for=\"".concat(addBtn.getAttribute('data-add'), "\"]"))) {
        inputId = addBtn.getAttribute('data-add') + '-' + index;
      } else {
        inputId = addBtn.getAttribute('data-add');
      }

      var createdBlock = document.createElement('div');
      createdBlock.classList.add('col-xl-3', 'col-sm-6');
      createdBlock.innerHTML += "\n          <label for=\"".concat(inputId, "\" class=\"form-file\">\n              <i class=\"icon-paperclip mb-3\"></i>\n              <input type=\"file\" name=\"").concat(inputId, "\" id=\"").concat(inputId, "\">\n              \u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 *.jpg / *.pdf\n              <div class=\"form-file-img-wrapper\"></div>\n          </label>\n      ");
      addBtn.parentElement.before(createdBlock);
      fileInputsInit(createdBlock.querySelector('.form-file'));
    });
  });
} // Table sorting


var tables = document.querySelectorAll('.table-native');

var sortTable = function sortTable(sortIn, table, column) {
  var _table$tBodies$;

  var sortedRows = Array.from(table.rows).slice(1);

  if (sortIn === 'asc') {
    sortedRows.sort(function (rowA, rowB) {
      return rowA.cells[column].innerHTML > rowB.cells[column].innerHTML ? 1 : -1;
    });
  } else {
    sortedRows.sort(function (rowA, rowB) {
      return rowA.cells[column].innerHTML < rowB.cells[column].innerHTML ? 1 : -1;
    });
  }

  (_table$tBodies$ = table.tBodies[0]).append.apply(_table$tBodies$, _toConsumableArray(sortedRows));
};

var removeSortedClasses = function removeSortedClasses(table) {
  if (table.querySelector('th.sorted-up')) table.querySelector('th.sorted-up').classList.remove('sorted-up');
  if (table.querySelector('th.sorted-down')) table.querySelector('th.sorted-down').classList.remove('sorted-down');
};

if (tables) {
  tables.forEach(function (table) {
    var tableHeaders = table.querySelectorAll('th.sortable');
    tableHeaders.forEach(function (th) {
      th.addEventListener('click', function () {
        var columnToSortBy;

        for (var i = 0; i < tableHeaders.length; i++) {
          if (tableHeaders[i] === th) {
            columnToSortBy = i;
            break;
          }
        }

        var sortIn;

        if (th.classList.contains('sorted-down')) {
          removeSortedClasses(table);
          th.classList.remove('sorted-down');
          th.classList.add('sorted-up');
          sortIn = 'asc';
        } else {
          removeSortedClasses(table);
          th.classList.add('sorted-down');
          th.classList.remove('sorted-up');
          sortIn = 'desc';
        }

        sortTable(sortIn, table, columnToSortBy);
      });
    });
  });
} // Modal


var modals = document.querySelectorAll('.modal-native');
var modalClose = document.querySelectorAll('.modal-native-close');
var modalLinks = document.querySelectorAll('.modal-native-toggle');

var modalOn = function modalOn(modalName) {
  offset = pageYOffset;
  bodyScrollOff();
  modals.forEach(function (modal) {
    if (modal.classList.contains(modalName)) {
      modal.classList.add('active');
    }
  });

  if (window.innerWidth > 992) {
    body.style.paddingRight = '17px';
    header.style.paddingRight = '17px';
    header.style.width = 'calc(100% + 17px)';
    footer.style.paddingRight = '17px';
    footer.style.width = 'calc(100% + 17px)';
  }
};

var modalOff = function modalOff() {
  bodyScrollOn();
  modals.forEach(function (modal) {
    modal.classList.remove('active');
  });

  if (window.innerWidth > 992 && window.innerHeight != documentHeight) {
    body.style.paddingRight = '0';
    header.style.paddingRight = '0';
    header.style.width = 'auto';
    footer.style.paddingRight = '0';
    footer.style.width = 'auto';
  }
};

modalLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    modalOn(link.getAttribute('data-modal'));
  });
});
modalClose.forEach(function (closeBtn) {
  closeBtn.addEventListener('click', function () {
    modalOff();
  });
}); // Adding active class to buttons that collapse elements via bootstrap

var collapseBtns = document.querySelectorAll('[data-toggle="collapse"]');
collapseBtns.forEach(function (btn) {
  var elementClass = btn.getAttribute('data-target');
  $(elementClass).on('show.bs.collapse', function () {
    btn.classList.add('active');
  }).on('hide.bs.collapse', function () {
    btn.classList.remove('active');
  });
}); // Slider

$('.about__slider').flipster({
  style: 'carousel',
  spacing: -0.9,
  start: 0,
  nav: true,
  scrollwheel: false
});