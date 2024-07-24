(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-19",headers:{authorization:"32ce3e57-23ce-4269-9ab9-b9e27817e7bb","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n,r=fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)})),o=fetch("".concat(e.baseUrl,"//users/me"),{headers:e.headers}).then((function(e){return t(e)})),c=document.querySelector("#card-template").content,u=document.querySelector(".popup_type_delete");function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function l(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function s(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n.inactiveButtonClass):t.classList.add(n.inactiveButtonClass)}var d=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""};function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));s(n,e.querySelector(t.submitButtonSelector),t),n.forEach((function(n){d(e,n,t)}))}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var _=document.querySelector(".places__list"),m=document.querySelectorAll(".popup"),y=document.querySelector(".popup_type_edit"),v=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_avatar"),S=document.querySelector(".popup_type_delete"),b=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__add-button"),g=document.querySelector(".profile__image"),C=document.querySelector(".profile__images"),E=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),L=document.forms["delete-card"],x=document.forms["edit-profile"],A=x.querySelector(".popup__input_type_name"),w=x.querySelector(".popup__input_type_description"),U=document.forms["new-place"],I=U.querySelector('input[name="place-name"]'),P=U.querySelector('input[name="link"]'),T=document.forms["new-avatar"],j=T.querySelector('input[name="link-avatar"]'),O=document.querySelector(".popup_type_image"),B=O.querySelector(".popup__image"),M=O.querySelector(".popup__caption"),N={likeCard:function(n,r){var o=r.querySelector(".card__like-button"),c=r.querySelector(".card__like-number");o.classList.contains("card__like-button_is-active")?(n._id,void fetch("".concat(e.baseUrl,"/cards/likes/cardId}"),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){c.textContent=e.likes.length,o.classList.remove("card__like-button_is-active")})).catch((function(e){return console.log(e)})):(n._id,void fetch("".concat(e.baseUrl,"/cards/likes/cardId}"),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))).then((function(e){c.textContent=e.likes.length,o.classList.add("card__like-button_is-active")})).catch((function(e){return console.log(e)}))},popupImage:function(e,t){B.src=e,B.alt=t,M.textContent=t,a(O)},openPopup:a},D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function J(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"prepend",o=function(e,t,r){var o=c.querySelector(".card").cloneNode(!0),a=o.querySelector(".card__image");o.querySelector(".card__title").textContent=e.name,o.querySelector(".card__like-number").textContent=e.likes.length,a.src=e.link,a.alt=e.name;var i=o.querySelector(".card__delete-button");e.owner._id===t&&(i.classList.add("card__delete-button-active"),i.addEventListener("click",(function(){r.openPopup(u),n={cardElement:o,cardId:e._id}})));var l=o.querySelector(".card__like-button");return e.likes.forEach((function(e){e._id===t&&l.classList.add("card__like-button_is-active")})),l.addEventListener("click",(function(){r.likeCard(e,o)})),a.addEventListener("click",(function(){return r.popupImage(e.link,e.name)})),o}(e,t,N);_[r](o)}function H(e){e.textContent="Сохранение..."}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),s(n,r,t)}))}))}(t,e)}))}(D),m.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_is-opened")&&i(e),t.target.classList.contains("popup__close")&&i(e)}))})),b.addEventListener("click",(function(){A.value=E.textContent,w.value=k.textContent,a(y),p(x,D),y.querySelector(".popup__button").textContent="Сохранить"})),L.addEventListener("submit",(function(){!function(n){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n.cardId),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))})(n).then((function(){n.cardElement.remove(),i(S)})).catch((function(e){return console.log(e)}))}(n)})),C.addEventListener("click",(function(){a(h),p(T,D),h.querySelector(".popup__button").textContent="Сохранить"})),q.addEventListener("click",(function(){a(v),p(U,D),v.querySelector(".popup__button").textContent="Создать"})),x.addEventListener("submit",(function(n){var r,o;H(y.querySelector(".popup__button")),(r=A.value,o=w.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(){E.textContent=A.value,k.textContent=w.value,i(y)})).catch((function(e){return console.log(e)}))})),U.addEventListener("submit",(function(n){var r,o;H(v.querySelector(".popup__button")),(r=I.value,o=P.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:o})}).then((function(e){return t(e)}))).then((function(e){J(e,e.owner._id),i(v),n.target.reset()})).catch((function(e){return console.log(e)}))})),T.addEventListener("submit",(function(n){var r;H(h.querySelector(".popup__button")),(r=j.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(){g.style="background-image: url(".concat(j.value,")"),i(h),n.target.reset()})).catch((function(e){return console.log(e)}))})),Promise.all([r,o]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];o.forEach((function(e){J(e,c._id,"append")})),E.textContent=c.name,k.textContent=c.about,g.style="background-image: url(".concat(c.avatar,")")}))})();