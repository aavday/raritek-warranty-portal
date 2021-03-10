let offset;
const body = document.querySelector('body');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const html = document.querySelector('html');
const documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

if (window.innerHeight == documentHeight) {
  body.style.paddingRight = '17px';
  header.style.paddingRight = '17px';
  header.style.width = 'calc(100% + 17px)';
  footer.style.paddingRight = '17px';
  footer.style.width = 'calc(100% + 17px)';
};

// No scroll for body

const bodyScrollOff = () => {
  body.classList.add('lock');
  body.style.position = 'fixed';
  body.style.width = '100%';
  body.style.top = `-${offset}px`;
};

const bodyScrollOn = () => {
  body.classList.remove('lock');
  body.style.position = '';
  body.style.width = '';
  body.style.top = '';
  window.scrollTo({
    top: offset
  });
};

// File Inputs Image Preview

const fileInputLabels = document.querySelectorAll('.form-file');

const fileInputsPreviewImgs = label => {
  const input = label.querySelector('input');
  const imgWrapper = label.querySelector('.form-file-img-wrapper');

  const reader = new FileReader();
  reader.readAsDataURL(input.files[0]);

  reader.addEventListener('load', () => {  
    label.classList.remove('dragovered');
    label.classList.add('inputed');

    if (!label.querySelector('.cross-close')) {
      const closeCross = document.createElement('span');
      closeCross.classList.add('cross', 'cross-close', 'cross-grey');
      label.append(closeCross);
    }

    label.querySelector('.cross-close').addEventListener('click', () => {
      deleteInput(label);
    })

    if (input.files[0].type == 'image/jpeg') {
      imgWrapper.innerHTML = `<img src="${reader.result}" alt="" class="form-file-img">`;
    } else if (input.files[0].type == 'application/pdf') {
      imgWrapper.innerHTML = `<div class="form-file-name">${input.files[0].name}</div>`;
    }
  })
}

// Deleting inputs

const deleteInput = label => {
  label.parentElement.remove();

  const deletedInputId = label.getAttribute('for');
  const deletedInputIndex = Number(deletedInputId[deletedInputId.length - 1]);

  let labelsAfterDeletedLabel = [];
  const deletedInputIdClean = deletedInputId.replace('-' + deletedInputIndex, '');

  if (deletedInputIndex) {
    for (let i = deletedInputIndex + 1; i < 999; i++) {
      let label = document.querySelector(`.form-file[for="${deletedInputIdClean + '-' + i}"]`)
  
      if (label) {
        labelsAfterDeletedLabel.push(label);
      } else {
        break;
      }
    }
  } else {
    document.querySelector(`.form-file[for="${deletedInputId}-1"]`).setAttribute('for', deletedInputId);

    for (let i = 2; i < 999; i++) {
      let label = document.querySelector(`.form-file[for="${deletedInputIdClean + '-' + i}"]`)
  
      if (label) {
        labelsAfterDeletedLabel.push(label);
      } else {
        break;
      }
    }
  }


  labelsAfterDeletedLabel.forEach(label => {
    const inputId = label.getAttribute('for');
    const index = Number(inputId[inputId.length - 1]);
    const correctedInputId = label.getAttribute('for').replace(`-${index}`, `-${index - 1}`);
    label.setAttribute('for', correctedInputId);
  })
}

// File inputs initialization

const fileInputsInit = label => {
  const input = label.querySelector('input');

  label.addEventListener('dragover', event => {
    event.preventDefault();
  })

  label.addEventListener('drop', event => {
    event.preventDefault();

    const fileType = event.dataTransfer.files[0].type;

    if (fileType === 'image/jpeg' || fileType === 'application/pdf') {
      input.files = event.dataTransfer.files;

      fileInputsPreviewImgs(label);
    } else {
      label.classList.remove('dragovered');
    }
  })

  label.addEventListener('dragenter', () => {
    label.classList.add('dragovered');
  })

  label.addEventListener('dragleave', () => {
    label.classList.remove('dragovered');
  })

  if (label.querySelector('.cross-close')) {
    label.querySelector('.cross-close').addEventListener('click', () => {
      deleteInput(label);
    })
  }

  input.addEventListener('change', () => {
    fileInputsPreviewImgs(label);
  })
}

if (fileInputLabels) {
  fileInputLabels.forEach(label => {
    fileInputsInit(label);
  })
}

// Adding Inputs

const addInputBtns = document.querySelectorAll('.add-input');

if (addInputBtns) {
  addInputBtns.forEach(addBtn => {
    let index = 1;

    addBtn.addEventListener('click', event => {
      event.preventDefault();
      
      let labels = [];

      for (let i = 1; i < 999; i++) {
        let label = document.querySelector(`.form-file[for='${addBtn.getAttribute('data-add') + '-' + i}'`)
  
        if (label) {
          labels.push(label);
        } else {
          index = i;
          break;
        }
      }

      let inputId;

      if (document.querySelector(`.form-file[for="${addBtn.getAttribute('data-add')}"]`)) {
        inputId = addBtn.getAttribute('data-add') + '-' + index;
      } else {
        inputId = addBtn.getAttribute('data-add');
      }


      const createdBlock = document.createElement('div');
      createdBlock.classList.add('col-xl-3', 'col-sm-6');
      createdBlock.innerHTML += `
          <label for="${inputId}" class="form-file">
              <i class="icon-paperclip mb-3"></i>
              <input type="file" name="${inputId}" id="${inputId}">
              Прикрепить вложение в формате *.jpg / *.pdf
              <div class="form-file-img-wrapper"></div>
          </label>
      `;
      addBtn.parentElement.before(createdBlock);

      fileInputsInit(createdBlock.querySelector('.form-file'));
    })
  })
}

// Table sorting

const tables = document.querySelectorAll('.table-native');

const sortTable = (sortIn, table, column) => {
  let sortedRows = Array.from(table.rows)
    .slice(1);

    if (sortIn === 'asc') {
      sortedRows.sort((rowA, rowB) => rowA.cells[column].innerHTML > rowB.cells[column].innerHTML ? 1 : -1);
    } else {
      sortedRows.sort((rowA, rowB) => rowA.cells[column].innerHTML < rowB.cells[column].innerHTML ? 1 : -1);
    }
    
  table.tBodies[0].append(...sortedRows);
}

const removeSortedClasses = table => {
  if (table.querySelector('th.sorted-up')) table.querySelector('th.sorted-up').classList.remove('sorted-up');
  if (table.querySelector('th.sorted-down')) table.querySelector('th.sorted-down').classList.remove('sorted-down');
}

if (tables) {
  tables.forEach(table => {
    const tableHeaders = table.querySelectorAll('th.sortable');

    tableHeaders.forEach(th => {
      th.addEventListener('click', () => {
        let columnToSortBy;

        for (let i = 0; i < tableHeaders.length; i++) {
          if (tableHeaders[i] === th) {
            columnToSortBy = i;
            break;
          }
        }

        let sortIn;

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
      })
    })
  })
}

// Modal

const modals = document.querySelectorAll('.modal-native');
const modalClose = document.querySelectorAll('.modal-native-close');
const modalLinks = document.querySelectorAll('.modal-native-toggle');

const modalOn = (modalName) => {
  offset = pageYOffset;
  bodyScrollOff();
  
  modals.forEach(modal => {
    if (modal.classList.contains(modalName)) {
      modal.classList.add('active');
    }
  })

  if(window.innerWidth > 992) {
    body.style.paddingRight = '17px';
    header.style.paddingRight = '17px';
    header.style.width = 'calc(100% + 17px)';
    footer.style.paddingRight = '17px';
    footer.style.width = 'calc(100% + 17px)';
  }
};

const modalOff = () => {
  bodyScrollOn();
  
  modals.forEach(modal => {
    modal.classList.remove('active');
  })

  if(window.innerWidth > 992 && window.innerHeight != documentHeight) {
    body.style.paddingRight = '0';
    header.style.paddingRight = '0';
    header.style.width = 'auto';
    footer.style.paddingRight = '0';
    footer.style.width = 'auto';
  }
};

modalLinks.forEach(link => {
  link.addEventListener('click', () => {
    modalOn(link.getAttribute('data-modal'));
  });
});

modalClose.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    modalOff();
  });
});

// Adding active class to buttons that collapse elements via bootstrap

const collapseBtns = document.querySelectorAll('[data-toggle="collapse"]');

collapseBtns.forEach(btn => {
  const elementClass = btn.getAttribute('data-target');

  $(elementClass)
  .on('show.bs.collapse', function () {
    btn.classList.add('active');
  })
  .on('hide.bs.collapse', function () {
    btn.classList.remove('active');
  })
})

// Slider

$('.about__slider').flipster({
  style: 'carousel',
  spacing: -0.9,
  start: 0,
  nav: true,
  scrollwheel: false
});
