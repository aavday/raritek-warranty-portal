"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}var offset,body=document.querySelector("body"),header=document.querySelector(".header"),footer=document.querySelector(".footer"),html=document.querySelector("html"),documentHeight=Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);window.innerHeight==documentHeight&&(body.style.paddingRight="17px",header.style.paddingRight="17px",header.style.width="calc(100% + 17px)",footer.style.paddingRight="17px",footer.style.width="calc(100% + 17px)");var bodyScrollOff=function(){body.classList.add("lock"),body.style.position="fixed",body.style.width="100%",body.style.top="-".concat(offset,"px")},bodyScrollOn=function(){body.classList.remove("lock"),body.style.position="",body.style.width="",body.style.top="",window.scrollTo({top:offset})},fileInputLabels=document.querySelectorAll(".form-file"),fileInputsPreviewImgs=function(e){var t=e.querySelector("input"),r=e.querySelector(".form-file-img-wrapper"),o=new FileReader;o.readAsDataURL(t.files[0]),o.addEventListener("load",function(){if(e.classList.remove("dragovered"),e.classList.add("inputed"),!e.querySelector(".cross-close")){var n=document.createElement("span");n.classList.add("cross","cross-close","cross-grey"),e.append(n)}e.querySelector(".cross-close").addEventListener("click",function(){deleteInput(e)}),"image/jpeg"==t.files[0].type?r.innerHTML='<img src="'.concat(o.result,'" alt="" class="form-file-img">'):"application/pdf"==t.files[0].type&&(r.innerHTML='<div class="form-file-name">'.concat(t.files[0].name,"</div>"))})},deleteInput=function(e){e.parentElement.remove();var t=e.getAttribute("for"),r=Number(t[t.length-1]),o=[],n=t.replace("-"+r,"");if(r)for(var a=r+1;a<999;a++){var l=document.querySelector('.form-file[for="'.concat(n+"-"+a,'"]'));if(!l)break;o.push(l)}else{document.querySelector('.form-file[for="'.concat(t,'-1"]')).setAttribute("for",t);for(var i=2;i<999;i++){var s=document.querySelector('.form-file[for="'.concat(n+"-"+i,'"]'));if(!s)break;o.push(s)}}o.forEach(function(e){var t=e.getAttribute("for"),r=Number(t[t.length-1]),o=e.getAttribute("for").replace("-".concat(r),"-".concat(r-1));e.setAttribute("for",o)})},fileInputsInit=function(e){var t=e.querySelector("input");e.addEventListener("dragover",function(e){e.preventDefault()}),e.addEventListener("drop",function(r){r.preventDefault();var o=r.dataTransfer.files[0].type;"image/jpeg"===o||"application/pdf"===o?(t.files=r.dataTransfer.files,fileInputsPreviewImgs(e)):e.classList.remove("dragovered")}),e.addEventListener("dragenter",function(){e.classList.add("dragovered")}),e.addEventListener("dragleave",function(){e.classList.remove("dragovered")}),e.querySelector(".cross-close")&&e.querySelector(".cross-close").addEventListener("click",function(){deleteInput(e)}),t.addEventListener("change",function(){fileInputsPreviewImgs(e)})};fileInputLabels&&fileInputLabels.forEach(function(e){fileInputsInit(e)});var addInputBtns=document.querySelectorAll(".add-input");addInputBtns&&addInputBtns.forEach(function(e){var t=1;e.addEventListener("click",function(r){r.preventDefault();for(var o,n=[],a=1;a<999;a++){var l=document.querySelector(".form-file[for='".concat(e.getAttribute("data-add")+"-"+a,"'"));if(!l){t=a;break}n.push(l)}o=document.querySelector('.form-file[for="'.concat(e.getAttribute("data-add"),'"]'))?e.getAttribute("data-add")+"-"+t:e.getAttribute("data-add");var i=document.createElement("div");i.classList.add("col-xl-3","col-sm-6"),i.innerHTML+='\n          <label for="'.concat(o,'" class="form-file">\n              <i class="icon-paperclip mb-3"></i>\n              <input type="file" name="').concat(o,'" id="').concat(o,'">\n              Прикрепить вложение в формате *.jpg / *.pdf\n              <div class="form-file-img-wrapper"></div>\n          </label>\n      '),e.parentElement.before(i),fileInputsInit(i.querySelector(".form-file"))})});var tables=document.querySelectorAll(".table-native"),sortTable=function(e,t,r){var o,n=Array.from(t.rows).slice(1);"asc"===e?n.sort(function(e,t){return e.cells[r].innerHTML>t.cells[r].innerHTML?1:-1}):n.sort(function(e,t){return e.cells[r].innerHTML<t.cells[r].innerHTML?1:-1}),(o=t.tBodies[0]).append.apply(o,_toConsumableArray(n))},removeSortedClasses=function(e){e.querySelector("th.sorted-up")&&e.querySelector("th.sorted-up").classList.remove("sorted-up"),e.querySelector("th.sorted-down")&&e.querySelector("th.sorted-down").classList.remove("sorted-down")};tables&&tables.forEach(function(e){var t=e.querySelectorAll("th.sortable");t.forEach(function(r){r.addEventListener("click",function(){for(var o,n,a=0;a<t.length;a++)if(t[a]===r){o=a;break}r.classList.contains("sorted-down")?(removeSortedClasses(e),r.classList.remove("sorted-down"),r.classList.add("sorted-up"),n="asc"):(removeSortedClasses(e),r.classList.add("sorted-down"),r.classList.remove("sorted-up"),n="desc"),sortTable(n,e,o)})})});var modals=document.querySelectorAll(".modal-native"),modalClose=document.querySelectorAll(".modal-native-close"),modalLinks=document.querySelectorAll(".modal-native-toggle"),modalOn=function(e){offset=pageYOffset,bodyScrollOff(),modals.forEach(function(t){t.classList.contains(e)&&t.classList.add("active")}),window.innerWidth>992&&(body.style.paddingRight="17px",header.style.paddingRight="17px",header.style.width="calc(100% + 17px)",footer.style.paddingRight="17px",footer.style.width="calc(100% + 17px)")},modalOff=function(){bodyScrollOn(),modals.forEach(function(e){e.classList.remove("active")}),window.innerWidth>992&&window.innerHeight!=documentHeight&&(body.style.paddingRight="0",header.style.paddingRight="0",header.style.width="auto",footer.style.paddingRight="0",footer.style.width="auto")};modalLinks.forEach(function(e){e.addEventListener("click",function(){modalOn(e.getAttribute("data-modal"))})}),modalClose.forEach(function(e){e.addEventListener("click",function(){modalOff()})});var collapseBtns=document.querySelectorAll('[data-toggle="collapse"]');collapseBtns.forEach(function(e){var t=e.getAttribute("data-target");$(t).on("show.bs.collapse",function(){e.classList.add("active")}).on("hide.bs.collapse",function(){e.classList.remove("active")})}),$(".about__slider").flipster({style:"carousel",spacing:-.9,start:0,nav:!0,scrollwheel:!1});