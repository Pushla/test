function initializeFormValidation() {
  // Находим все формы, требующие валидации
  const forms = document.querySelectorAll(".form-add");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      let isValid = true;

      // Найти все поля ввода внутри текущей формы
      const nameInput = form.querySelector("input[name='name']");

      // Проверяем поле имени
      if (nameInput && !validateNameField(nameInput)) {
        isValid = false;
      }

      // Если хотя бы одно поле не валидно, предотвращаем отправку формы
      if (!isValid) {
        e.preventDefault();
      }
    });
  });
}

function initializeNameField() {
  const nameInput = document.querySelector("input[name='name']");
  
  // Добавляем обработчики событий для валидации
  nameInput.addEventListener("input", handleNameInput);
  nameInput.addEventListener("blur", validateName);

  function handleNameInput(e) {
    // Убираем все символы, кроме букв
    e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');

    // Ограничиваем длину текста до 32 символов
    if (e.target.value.length > 32) {
      e.target.value = e.target.value.slice(0, 32);
    }
  }

  function validateName(e) {
    const nameFormat = /^[a-zA-Zа-яА-ЯёЁ]{4,32}$/;
    const errorMsg = document.querySelector(".error-msg-name");

    // Если формат имени неверный, отображаем ошибку
    if (!nameFormat.test(e.target.value)) {
      showError();
    } else {
      removeError();
    }
  }

  function showError() {
    let errorMsg = document.querySelector(".error-msg-name");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-name");
      errorMsg.textContent = "(от 4 до 32 символов)";
      const fieldDescr = nameInput.parentNode.querySelector(".field-descr");
      if (fieldDescr) {
        fieldDescr.insertAdjacentElement("afterend", errorMsg);
      } else {
        nameInput.parentNode.appendChild(errorMsg);
      }
    }
  }

  function removeError() {
    const errorMsg = document.querySelector(".error-msg-name");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}


function initializeMask() {
    const phoneInput = document.getElementById("phone-inp");

    phoneInput.addEventListener("input", handlePhoneInput);
    phoneInput.addEventListener("blur", validatePhone);
    phoneInput.addEventListener("focus", setMaskOnFocus);
    phoneInput.addEventListener("focusout", setMaskOutFocus);
    phoneInput.addEventListener("mouseover", setMaskOnHover);
    phoneInput.addEventListener("mouseout", setMaskOutHover);

    // При фокусе устанавливаем маску внутри поля
    function setMaskOnFocus() {
        if (phoneInput.value === "") {
            phoneInput.value = "+7 ";
        }
    }

    function setMaskOutFocus() {
        if (phoneInput.value === "+7 ") {
            phoneInput.value = "";
            phoneInput.setAttribute("placeholder", "+7 911 982-64-57");
        }
    }

    // При наведении устанавливаем маску в placeholder, если поле пустое
    function setMaskOnHover() {
        if (phoneInput.value === "") {
            phoneInput.setAttribute("placeholder", "+7 (___) ___-__-__");
        }
    }

    // При наведении устанавливаем маску в placeholder, если поле пустое
    function setMaskOutHover() {
        if (phoneInput.value === "") {
            phoneInput.setAttribute("placeholder", "+7 911 982-64-57");
        }
    }

    function handlePhoneInput(e) {
        let input = e.target.value.replace(/\D/g, ""); // Удаляем все нецифровые символы

        // Если поле очищено до пустого значения, оставляем его пустым
        if (input.length === 0) {
            e.target.value = "+7 ";
            return;
        }

        // Принудительно устанавливаем код страны +7, если он не присутствует
        if (!input.startsWith("7")) {
            input = "7" + input;
        }

        let formattedInput = "+7 ";

        if (input.length > 1) formattedInput += "(" + input.substring(1, 4);
        if (input.length >= 5) formattedInput += ") " + input.substring(4, 7);
        if (input.length >= 8) formattedInput += "-" + input.substring(7, 9);
        if (input.length >= 10) formattedInput += "-" + input.substring(9, 11);

        e.target.value = formattedInput;
    }

    function validatePhone(e) {
        const phoneFormat = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        const errorMsg = document.querySelector(".error-msg-phone");

        if (!phoneFormat.test(e.target.value)) {
            if (!errorMsg) {
                const errorSpan = document.createElement("span");
                errorSpan.classList.add("error-msg-phone");
                errorSpan.textContent = "Введите номер полностью";
                e.target.parentNode.appendChild(errorSpan);
            }
        } else {
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    }
}


function initializeTelegramField() {
  const telegramInput = document.getElementById("telegram");
  const telegramDescription = document.querySelector(".field-descr.tg");
  const telegramIcon = document.querySelector("#tg-icon");

  telegramInput.addEventListener("focus", setMaskOnFocus);
  telegramInput.addEventListener("focusout", setMaskOutFocus);
  telegramInput.addEventListener("mouseover", setMaskOnHover);
  telegramInput.addEventListener("mouseout", setMaskOutHover);

  // Обработчик для изменения состояния чекбокса
  document.getElementById('tg').addEventListener('change', function() {
    if (this.checked) {
      // Показываем поле и описание
      telegramInput.style.visibility = 'visible';
      telegramInput.style.position = 'relative';
      telegramDescription.style.visibility = 'visible';
      telegramDescription.style.position = 'relative';
      telegramIcon.style.visibility = 'visible';
      telegramIcon.style.display = 'block';
    } else {
      // Скрываем поле, описание и удаляем сообщение об ошибке
      telegramInput.style.visibility = 'hidden';
      telegramInput.style.position = 'absolute';
      telegramDescription.style.visibility = 'hidden';
      telegramDescription.style.position = 'absolute';
      telegramIcon.style.visibility = 'hidden';
      telegramIcon.style.display = 'none';
      removeError(); // Удаляем ошибку, если переключатель выключен
    }
  });

  function setMaskOnFocus() {
    if (telegramInput.value === "") {
      telegramInput.value = "@";
    }
  }

  function setMaskOutFocus() {
    if (telegramInput.value === "@") {
      telegramInput.value = "";
      telegramInput.setAttribute("placeholder", "@username");
    }
  }

  // При наведении устанавливаем маску в placeholder, если поле пустое
  function setMaskOnHover() {
    if (telegramInput.value === "") {
      telegramInput.setAttribute("placeholder", "@");
    }
  }

  // При наведении устанавливаем маску в placeholder, если поле пустое
  function setMaskOutHover() {
    if (telegramInput.value === "") {
      telegramInput.setAttribute("placeholder", "@username");
    }
  }

  // Маска для поля Telegram
  telegramInput.addEventListener("input", handleTelegramInput);
  telegramInput.addEventListener("blur", validateTelegram);

  function handleTelegramInput(e) {
    let input = e.target.value;

    // Запрещаем стирать "@"
    if (input.startsWith('@')) {
      input = '@' + input.substring(1).replace(/[^a-zA-Z0-9_\.]/g, ''); // Разрешаем точку
    } else {
      input = '@' + input.replace(/[^a-zA-Z0-9_\.]/g, ''); // Разрешаем точку
    }

    // Если длина больше 32 символов, обрезаем
    if (input.length > 32) {
      input = input.substring(0, 32);
    }

    // Обновляем значение в поле
    e.target.value = input;
  }

  function validateTelegram(e) {
    const telegramFormat = /^@[a-zA-Z0-9_\.]{5,32}$/; // Проверяем, что длина от 5 до 32 символов и разрешаем точку
    const errorMsg = document.querySelector(".error-msg-telegram");

    // Если введен неверный формат, показываем ошибку
    if (!telegramFormat.test(e.target.value)) {
      showError();
    } else {
      removeError();
    }
  }

  function showError() {
    let errorMsg = document.querySelector(".error-msg-telegram");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-telegram");
      errorMsg.textContent = "(от 5 до 32 символов)";
      document.getElementById("telegram").parentNode.appendChild(errorMsg);
    }
  }

  function removeError() {
    const errorMsg = document.querySelector(".error-msg-telegram");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

function initializeAgeField() {
  const ageInput = document.querySelector("input[name='age']");

  ageInput.addEventListener("input", handleAgeInput);
  ageInput.addEventListener("blur", validateAge);

  function handleAgeInput(e) {
    let input = e.target.value;

    input = input.replace(/[^0-9]/g, "");
    e.target.maxLength = 2;
  }

  function validateAge(e) {
    const age = parseInt(e.target.value, 10);

    if (isNaN(age) || age < 18) {
      e.target.value = "";
      showError();
    } else {
      removeError();
    }
  }

  function showError() {
    let errorMsg = document.querySelector(".error-msg-age");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-age");
      errorMsg.textContent = "Укажите возраст";
      ageInput.parentNode.appendChild(errorMsg);
    }
  }

  function removeError() {
    const errorMsg = document.querySelector(".error-msg-age");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

function initializeHeightField() {
  const heightInput = document.querySelector("input[name='height']");

  heightInput.addEventListener("input", handleHeightInput);
  heightInput.addEventListener("blur", validateHeight);

  function handleHeightInput(e) {
    let input = e.target.value;

    // Разрешаем только цифры и ограничиваем ввод до трех символов
    input = input.replace(/[^0-9]/g, "").slice(0, 3);

    // Обновляем значение в поле
    e.target.value = input;
  }

  function validateHeight(e) {
    const height = parseInt(e.target.value, 10);

    if (isNaN(height) || height < 120 || height > 220) {
      e.target.value = "";
      showError();
    } else {
      removeError();
    }
  }

  function showError() {
    let errorMsg = document.querySelector(".error-msg-height");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-height");
      errorMsg.textContent = "(от 120 до 220 см)";
      heightInput.parentNode.appendChild(errorMsg);
    }
  }

  function removeError() {
    const errorMsg = document.querySelector(".error-msg-height");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

function initializeBustField() {
  const bustInput = document.querySelector("input[name='bust-size']");

  bustInput.addEventListener("input", handleBustInput);
  bustInput.addEventListener("blur", validateBust);

  function handleBustInput(e) {
    let input = e.target.value;

    input = input.replace(/[^0-9]/g, "").slice(0, 2);

    // Обновляем значение в поле
    e.target.value = input;
  }

   function validateBust(e) {
    const bust = parseInt(e.target.value, 10);

    if (isNaN(bust) || bust < 1 || bust > 12) {
      e.target.value = "";
      showError();
    } else {
      removeError();
    }
  }

  function showError() {
    let errorMsg = document.querySelector(".error-msg-bust");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-bust");
      errorMsg.textContent = "Укажите размер груди";
      bustInput.parentNode.appendChild(errorMsg);
    }
  }

  function removeError() {
    const errorMsg = document.querySelector(".error-msg-bust");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

function initializeFootField() {
  const footInput = document.querySelector("input[name='foot-size']");

  footInput.addEventListener("input", handleFootInput);
  footInput.addEventListener("blur", validateFoot);

  function handleFootInput(e) {
    let input = e.target.value;

    input = input.replace(/[^0-9]/g, "").slice(0, 2);

    // Обновляем значение в поле
    e.target.value = input;
  }

   function validateFoot(e) {
    const foot = parseInt(e.target.value, 10);

    if (isNaN(foot) || foot < 35 || foot > 46) {
      e.target.value = "";
      showError();
    } else {
      removeError();
    }
  }

  function showError() {
    let errorMsg = document.querySelector(".error-msg-foot");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-foot");
      errorMsg.textContent = "Укажите размер ножки";
      footInput.parentNode.appendChild(errorMsg);
    }
  }

  function removeError() {
    const errorMsg = document.querySelector(".error-msg-foot");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

function selectElem(){
  $('#girlfriendsID').select2({
        placeholder: "Введите ID анкеты:",
        allowClear: false,
        language: 'ru',
        minimumInputLength: 1,
        dropdownAutoWidth: true,
        dropdownParent: $('#girlfriendsID').parent(),
        dropdownPosition: 'below',
        maximumSelectionLength: 2,
        matcher: function(e, t) {
            if ("" === $.trim(e.term))
                return t;
            if (void 0 === t.id)
                return null;
            if (t.id.indexOf(e.term) > -1) {
                var n = $.extend({}, t, !0);
                return n.id += " (matched)",
              n
            }
            return null
        },
        templateResult: function(e) {
            e.photo = '../img/models/1.png';
            if (!e.id)
                return e.text;
            return $('<div class="girl-item"><span class="girl-img" style="background-image: url(' + e.photo + ')"></span> <span class="girl-name">' + e.name + '</span> <span class="girl-age">' + e.age + "</span></div>")
        },
        ajax: {
            url: '../profile/add/getSuggestions/',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    term: params.term
                };
            },
            processResults: function (data) {
                return {
                    results: data.results
                };
            },
            cache: true
        }
    });
}

function initializeRoadLogic() {
  // Элементы
  const checkboxes = document.querySelectorAll("input[name='typePlace']");
  const checkboxGroup = document.querySelector(".checkbox-group");
  const outPlaceCheckbox = document.querySelector("input[name='typePlace'][value='outPlace']");
  const conditionsBlock = document.querySelector(".field-txt.outPlace-txt").parentElement;
  const outPlacePriceBlock = document.querySelector("label[for='outPlace-price']").parentElement; // Полный блок для доплаты
  const priceRoadSelect = $('#priceRoad'); 
  const outPlacePriceInput = document.querySelector("input[name='outPlace-price']");

  // Добавляем классы для скрытия блоков
  conditionsBlock.classList.add("field-block-hidden");
  outPlacePriceBlock.classList.add("field-block-hidden");

  // Проверка чекбоксов
  function validateCheckboxes() {
    if (![...checkboxes].some(checkbox => checkbox.checked)) {
      showCheckboxError();
    } else {
      removeCheckboxError();
    }
  }

  function showCheckboxError() {
    let errorMsg = document.querySelector(".error-msg-checkbox");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-checkbox");
      errorMsg.textContent = "Выберите хотя бы один вариант";
      checkboxGroup.after(errorMsg);
      checkboxes.forEach(checkbox => checkbox.classList.add("error"));
    }
  }

  function removeCheckboxError() {
    const errorMsg = document.querySelector(".error-msg-checkbox");
    if (errorMsg) {
      errorMsg.remove();
    }
    checkboxes.forEach(checkbox => checkbox.classList.remove("error"));
  }

  // Логика для отображения условий выезда и доплаты
  function toggleConditions() {
    const isOutPlaceSelected = outPlaceCheckbox.checked;

    if (isOutPlaceSelected) {
      conditionsBlock.classList.remove("field-block-hidden");
    } else {
      conditionsBlock.classList.add("field-block-hidden");
      outPlacePriceBlock.classList.add("field-block-hidden");
      priceRoadSelect.val(null).trigger('change'); // Сброс значения select2
    }
  }

  function toggleOutPlacePrice() {
    const selectedValue = priceRoadSelect.val(); // Получаем значение через select2 API

    if (selectedValue === "Клиент оплачивает такси + доплата" || selectedValue === "Доплата") {
      outPlacePriceBlock.classList.remove("field-block-hidden");
    } else {
      outPlacePriceBlock.classList.add("field-block-hidden");
      removePriceError();
    }
  }


  function handleOutPlacePriceInput(e) {
    let input = e.target.value;
    input = input.replace(/[^0-9]/g, "").slice(0, 5); // Оставляем только цифры, ограничиваем длину до 5 символов
    e.target.value = input;
  }

  function validateOutPlacePrice(e) {
    const price = parseInt(e.target.value, 10);
    if (isNaN(price) || price < 500 || price > 10000) {
      e.target.value = "";
      showPriceError();
    } else {
      removePriceError();
    }
  }

  function showPriceError() {
    let errorMsg = document.querySelector(".error-msg-price");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-price");
      errorMsg.textContent = "(От 500 до 10000 рублей)";
      outPlacePriceInput.parentNode.appendChild(errorMsg);
    }
  }

  function removePriceError() {
    const errorMsg = document.querySelector(".error-msg-price");
    if (errorMsg) {
      errorMsg.remove();
    }
  }

  // Привязка событий
  checkboxes.forEach(checkbox => checkbox.addEventListener("change", validateCheckboxes));
  outPlaceCheckbox.addEventListener("change", toggleConditions);
  priceRoadSelect.on("change", toggleOutPlacePrice); // Используем событие change через jQuery
  outPlacePriceInput.addEventListener("input", handleOutPlacePriceInput);
  outPlacePriceInput.addEventListener("blur", validateOutPlacePrice);

  // Инициализация select2
  if (typeof $ !== "undefined" && $.fn.select2) {
    priceRoadSelect.select2({
      placeholder: "Выберите:",
      allowClear: false,
      width: '100%',
      dropdownAutoWidth: true,
      dropdownParent: priceRoadSelect.parent(),
      dropdownPosition: 'below',
    });
  }
}

var mapObject = {};
ymaps.ready(initializeMaps);
function initializeMaps() {
  // Инициализация карты
    mapObject.map = new ymaps.Map("map", {
        center: [55.751574, 37.573856], // Начальные координаты
        zoom: 10, // Начальный зум
        controls: ['zoomControl', 'geolocationControl'] // Контролы на карте
    });

    // Настраиваем параметры кастомной метки
    var customPlacemarkOptions = {
        iconLayout: 'default#image',
        iconImageHref: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                <defs>
                    <style>
                        .cls-1 {
                          fill: #292929;
                        }
                        .cls-1, .cls-2, .cls-3 {
                          stroke-width: 0px;
                        }
                        .cls-2 {
                          fill: #ecf0f3;
                        }
                        .cls-3 {
                          fill: #0abab5;
                        }
                    </style>
                </defs>
                <path class="cls-2" d="m8.17,5.36c-1.35,2.25-1.42,4.56-.25,6.9.53,1.05,2.38,4.56,2.97,5.69.02.03.04.05.06.08.5.95.99,1.89,1.53,2.92.12-.2.19-.32.26-.44,1.43-2.73,2.87-5.45,4.28-8.19,1.22-2.36,1.15-4.71-.23-6.98-1.99-3.29-6.64-3.28-8.62.02Z"/>
                <path class="cls-3" d="m13.53,3.97c.04.24.14.49.09.71-.29,1.42.16,2.52,1.29,3.46,1.44,1.2,1.67,2.9.69,4.32-.87,1.25-2.54,1.8-4.09,1.35-1.55-.45-2.7-1.82-2.7-3.34,0-.59.17-1.19.34-1.76.06-.22.3-.42.5-.56.39-.27.59-.15.65.31.06.41.11.85.29,1.21.16.37.52.59.97.4.46-.19.61-.62.4-1-1.21-2.16-.2-3.7,1.36-5.11h.22-.01Zm-3.86,5.26c-.09.17-.15.25-.16.32-.35,1.22.32,2.74,1.5,3.37,1.4.76,3.12.41,4.02-.8.81-1.1.69-2.62-.65-3.62-.86-.64-1.39-1.51-1.47-2.61,0-.11-.04-.22-.06-.36-.76.7-.99,1.79-.59,2.65.1.21.22.42.3.65.29.84-.02,1.6-.75,1.89-.72.27-1.56-.11-1.9-.9-.06-.15-.11-.3-.22-.57h-.01Z"/>
                <path class="cls-1" d="m12.48,20.96c.12-.2.19-.32.26-.44,1.43-2.73,2.87-5.45,4.28-8.19,1.22-2.36,1.15-4.71-.23-6.98-1.99-3.29-6.64-3.28-8.62.02-1.35,2.25-1.42,4.56-.25,6.9.54,1.07,1.12,2.12,1.67,3.18.26.5.14.95-.28,1.15-.39.19-.77.11-.96-.26-.89-1.76-2.04-3.41-2.53-5.35-.83-3.28.58-7.02,3.25-8.68,3.06-1.89,7.11-.93,8.97,2.14,1.73,2.84,1.83,5.75.29,8.7-1.52,2.92-3.06,5.82-4.58,8.74-.28.53-.63.93-1.27.93s-1-.4-1.27-.94c-.53-1.06-1.09-2.1-1.63-3.14-.28-.55-.19-.97.25-1.19.43-.22.83-.05,1.12.49.5.95.99,1.89,1.53,2.92Z"/>
            </svg>`),
        iconImageSize: [50, 50],
        iconImageOffset: [-25, -50],
        draggable: true
    };

    // Создаем кастомный маркер
    mapObject.placemark = new ymaps.Placemark([55.755864, 37.617698], {
        // balloonContent: "Точка на карте"
    }, customPlacemarkOptions);

    // Добавляем маркер на карту
    mapObject.map.geoObjects.add(mapObject.placemark);

    // Обработчик клика на карте
    mapObject.map.events.add('click', function(e) {
        var coords = e.get('coords'); // Получаем координаты клика
        updateMarker(coords);
    });

    // Обработчик перетаскивания маркера
    mapObject.placemark.events.add('dragend', function() {
        var coords = mapObject.placemark.geometry.getCoordinates();
        updateMarker(coords);
    });
}


function initializeSelectCity() {
    $('#cityLocate').select2({
        placeholder: "Введите название города:",
        allowClear: false,
        language: 'ru',
        minimumInputLength: 2,
        dropdownAutoWidth: true,
        dropdownParent: $('#cityLocate').parent(),
        matcher: function(params, data) {
            if ($.trim(params.term) === '') {
                return data;
            }
            if (data.text.toLowerCase().indexOf(params.term.toLowerCase()) > -1) {
                return data;
            }
            return null;
        },
        templateResult: function(data) {
            if (!data.id) {
                return data.text;
            }
            return $('<div class="city-item">' + data.city + '</div>');
        },
        ajax: {
            url: '../profile/add/getSuggestions',
            dataType: 'json',
            delay: 250,
            data: function(params) {
                return {
                    city: params.term
                };
            },
            processResults: function(data) {
                  return {
                    results: data.results.map(function(item) {
                        return {
                            id: item.id,
                            text: item.city,
                            city: item.city,
                            metro: item.metro,
                            districts: item.districts,
                            lat: item.lat, // Координаты
                            lng: item.lng  // Координаты
                        };
                    })
                };
            },
            cache: true
        }
    }).on('select2:select', function(e) {
        var data = e.params.data;

        var lat = parseFloat(data.lat); // Преобразуем строку в число
        var lng = parseFloat(data.lng); // Преобразуем строку в число

        if (!isNaN(lat) && !isNaN(lng)) {
            var coords = [lat, lng]; // Создаем массив с координатами
            updateMarker(coords); // Вызываем функцию для обновления маркера
        }

        // Проверка флагов
        var isMetroActive = data.metro === 1;
        var isDistrictActive = data.districts === 1;

        // Управление видимостью блоков для метро и районов
        $('#metroField').toggleClass('field-block-hidden', !isMetroActive);
        $('#district-block').toggleClass('field-block-hidden', !isDistrictActive);

        // Очищаем списки, если соответствующие флаги не активированы
        if (!isMetroActive) $('#metroLocate').empty();
        if (!isDistrictActive) $('#districtLocate').empty();

        // Управление видимостью блоков
        if (isMetroActive) {
            $('#checkMetro').prop('checked', false); // Снимаем галочку
            $('.field-metro').removeClass('field-block-hidden'); // Показываем блок для метро
        } else {
            $('.field-metro').addClass('field-block-hidden'); // Скрываем блок для метро
        }

        // Загружаем данные, если хотя бы один флаг активирован
        if (isMetroActive || isDistrictActive) {
            loadMoreOptions(data.id); // Загружаем данные для города (метро и районы)
        }

        if (!isNaN(lat) && !isNaN(lng)) {
            var newCoords = [lat, lng];

            // Обновляем метку и центр карты
            mapObject.placemark.geometry.setCoordinates(newCoords);
            mapObject.map.setCenter(newCoords, 12);
        }
    });
}

function loadMoreOptions(cityId) {
    $.ajax({
        url: '../profile/add/getSuggestions', // Эндпоинт для станций метро и районов
        dataType: 'json',
        data: {
            cityId: cityId
        },
        success: function (data) {
            console.log('Ответ API:', data); // Логирование данных для отладки

            // Обработка метро
            var metroSelect = $('#metroLocate');
            metroSelect.empty(); // Очищаем текущие опции

            if (data.metro && data.metro.length > 0) {
                // Формируем данные для Select2
                const metroData = data.metro.map(function (item) {
                    let colorSpans = "";
                    if (item.colors) {
                        const colors = item.colors.match(/rgb\([^)]+\)/g);
                        colorSpans = colors.map(color => `
                            <span style="
                                display:inline-block; 
                                width:12px; 
                                height:12px; 
                                margin-right:5px; 
                                background-color:${color}; 
                                border-radius:50%;">
                            </span>
                        `).join('');
                    }

                    return {
                        id: item.id,
                        text: item.metro,
                        lat: item.lat,
                        lng: item.lng,
                        colors: colorSpans
                    };
                });

                metroSelect.select2({
                    data: metroData,
                    placeholder: "Выберите метро:",
                    allowClear: true,
                    language: 'ru',
                    minimumInputLength: 0,
                    dropdownAutoWidth: true,
                    dropdownParent: metroSelect.parent(),
                    escapeMarkup: function (markup) {
                        return markup;
                    },
                    templateResult: function (data) {
                        if (!data.id) return data.text; // Если это placeholder
                        return `
                            <div style="display: flex; align-items: center;">
                                ${data.colors || ''}
                                <span>${data.text}</span>
                            </div>
                        `;
                    },
                    templateSelection: function (data) {
                        if (!data.id) return data.text; // Если это placeholder
                        return data.text; // Возвращаем только название станции в выбранном элементе
                    },
                    maximumSelectionLength: 3,
                });

                // Добавление обработчика выбора станции метро
                metroSelect.on('select2:select', function (e) {
                    const selectedData = metroSelect.select2('data');
                    updateMarkerForSelectedStations(selectedData); // Обновляем маркер
                });

                // Добавление обработчика удаления станции из выбора
                metroSelect.on('select2:unselect', function (e) {
                    const selectedData = metroSelect.select2('data');
                    updateMarkerForSelectedStations(selectedData); // Обновляем маркер
                });
            } else {
                metroSelect.append('<option disabled>Станции метро не найдены</option>');
            }

            // Обработка районов
            var districtSelect = $('#districtLocate');
            districtSelect.empty(); // Очищаем текущие опции

            if (data.districts && data.districts.length > 0) {
                districtSelect.append('<option value="" disabled selected>Выберите район</option>');

                data.districts.forEach(function (item) {
                    // Привязываем данные с координатами к элементу <option>
                    const option = new Option(item.district, item.id);
                    $(option).data('lat', item.lat).data('lng', item.lng);
                    districtSelect.append(option);
                });

                districtSelect.select2({
                    placeholder: "Выберите район:",
                    allowClear: false, // Разрешаем удаление выбора
                    language: 'ru',
                    minimumInputLength: 0,
                    dropdownAutoWidth: true,
                    dropdownParent: $('#districtLocate').parent()
                });

                // Добавление обработчика для выбора района
                districtSelect.on('select2:select', function (e) {
                    const selectedDistrict = e.params.data; // Получаем данные выбранного района
                    const lat = parseFloat($(selectedDistrict.element).data('lat'));
                    const lng = parseFloat($(selectedDistrict.element).data('lng'));

                    // Логируем координаты для проверки
                    console.log('Выбран район:', selectedDistrict.text, 'Координаты:', lat, lng);

                    // Проверяем, что координаты валидны
                    if (!isNaN(lat) && !isNaN(lng)) {
                        updateMarker([lat, lng]); // Обновляем маркер на координаты выбранного района
                        mapObject.map.setCenter([lat, lng], 13); // Центрируем карту на выбранном районе
                    }
                });
            } else {
                districtSelect.append('<option disabled>Районы не найдены</option>');
            }

            // Убираем ошибки, если они были
            document.querySelector(".error-msg-metro")?.remove();
            document.querySelector(".error-msg-district")?.remove();
        },
    });
}

function updateMarkerForSelectedStations(selectedData) {
    // Проверяем, есть ли хотя бы одна станция в выбранных
    if (selectedData.length > 0) {
        // Берем последнюю выбранную станцию
        const lastSelectedStation = selectedData[selectedData.length - 1];

        const coords = [parseFloat(lastSelectedStation.lat), parseFloat(lastSelectedStation.lng)];

        if (!isNaN(coords[0]) && !isNaN(coords[1])) {
            updateMarker(coords); // Обновляем маркер на координаты выбранной станции
            mapObject.map.setCenter(coords, 14); // Центрируем карту на выбранной станции
        }
    }
}

function updateMarker(coords) {
    if (mapObject && mapObject.placemark) {
        mapObject.placemark.geometry.setCoordinates(coords); // Перемещаем маркер
        $('#latitude').val(coords[0]);
        $('#longitude').val(coords[1]);
        $('#coordinates').text('Широта: ' + coords[0].toFixed(6) + ', Долгота: ' + coords[1].toFixed(6));
    } else {
        console.error('Ошибка: mapObject или placemark не инициализирован.');
    }
}

function initializeCheckMetro() {
    const checkMetro = document.getElementById('checkMetro');
    const metroField = document.getElementById('metroField');
    
    if (checkMetro && metroField) {
        checkMetro.addEventListener('change', function () {
            metroField.classList.toggle('field-block-hidden', checkMetro.checked);
        });
    } else {
        console.error('Элементы checkMetro или metroField не найдены на странице.');
    }
}

function initializeMap(){
  $('[data-control="locationMap"]').locationMap();
}

function initializeAboutArea() {
  const areaInput = document.querySelector("textarea[name='about-area']");

  areaInput.addEventListener("input", handleTextInput);
  areaInput.addEventListener("blur", validateTextArea);

  function handleTextInput(e) {
    let input = e.target.value;

    input = input.replace(/<[^>]*>?/gm, "");
    e.target.value = input;
  }

  function validateTextArea(e) {
    const text = e.target.value.trim();

    if (text.length > 1000) {
      showError("Описание не должно превышать 1000 символов");
    }else {
      removeError();
      addDescr("Можно заполнить позже");
    }
  }
  function addDescr(message) {
    let aboutDescr = document.querySelector(".about-descr");
    if (!aboutDescr) {
      aboutDescr = document.createElement("span");
      aboutDescr.classList.add("field-descr");
      aboutDescr.classList.add("about-descr");
      areaInput.parentNode.appendChild(aboutDescr);
    }
    aboutDescr.textContent = message;
  }

  function showError(message) {
    let errorMsg = document.querySelector(".error-msg-aboutArea");
    let aboutDescr = document.querySelector(".about-descr");
    if (!errorMsg) {
      aboutDescr.remove();
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-aboutArea");
      areaInput.parentNode.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
  }

  function removeError() {
    const errorMsg = document.querySelector(".error-msg-aboutArea");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

function initializeProgramArea() {
  const areaInput = document.querySelector("textarea[name='program-area']");

  areaInput.addEventListener("input", handleTextInput);
  areaInput.addEventListener("blur", validateTextArea);

  function handleTextInput(e) {
    let input = e.target.value;

    input = input.replace(/<[^>]*>?/gm, "");
    e.target.value = input;
  }

  function validateTextArea(e) {
    const text = e.target.value.trim();

    if (text.length > 1000) {
      showError("Состав программы не должен превышать 1000 символов");
    } else if(text.length < 1){
      showError("Укажите состав программы");
    }else {
      removeError();
    }
  }

  function showError(message) {
    let errorMsg = document.querySelector(".error-msg-area");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-area");
      areaInput.parentNode.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
  }

  function removeError() {
    const errorMsg = document.querySelector(".error-msg-area");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

function initializeProgramPrice() {
  const priceInput = document.querySelector("input[name='program-price']");

  priceInput.addEventListener("input", handlePriceInput);
  priceInput.addEventListener("blur", validatePriceInput);

  function handlePriceInput(e) {
    let input = e.target.value;

    // Удаляем все символы, кроме цифр
    input = input.replace(/[^0-9]/g, "");

    if (input.length > 6) {
      input = input.slice(0, 6);
    }

    e.target.value = input;
  }

  function validatePriceInput(e) {
    const price = parseInt(e.target.value, 10);

    // Проверяем, что значение корректное и >= 2000
    if (isNaN(price) || price < 2000) {
      e.target.value = "";
      showError("Не менее 2000 рублей");
    } else {
      removeError();
    }
  }

  function showError(message) {
    let errorMsg = document.querySelector(".error-msg-price-programm");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-price-programm");
      priceInput.parentNode.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
  }

  function removeError() {
    const errorMsg = document.querySelector(".error-msg-price-programm");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

function initializeAddProgram() {
  const addButton = document.querySelector(".add-program");
  const programContainer = document.querySelector(".program-container");
  let programCount = 0;

  // Обновление ID и отображения кнопки "Добавить"
  function updateProgramIds() {
    const programs = programContainer.querySelectorAll(".group-block-program");
    programCount = programs.length;
    programs.forEach((block, index) => {
      block.dataset.programId = index + 1;
      const programIdDisplay = block.querySelector(".summary-value");
      if (programIdDisplay) programIdDisplay.textContent = `#${index + 1}`;
    });
    toggleAddButton();
  }

  function toggleAddButton() {
    addButton.style.display = programCount < 8 ? "flex" : "none";
  }

  // Создание нового блока программы
  function createProgramBlock(id) {
    const block = document.createElement("div");
    block.classList.add("group-block-program");
    block.dataset.programId = id;
    block.setAttribute("draggable", "true");
    const isHidden = block.dataset.isHidden === "true";

    block.innerHTML = `
      <div class="field-block field-block-program">
        <div class="program-label-wrapp">
          <label for="additional-program-name-${id}">Название программы:</label>
          <input class="additional-inp" type="text" name="additional-program-name-${id}" placeholder="Обязательное поле">
          <span class="error-msg error-msg-name"></span>
        </div>
        <div class="field-txt composition-label">Состав программы:</div>
        <textarea class="program-area" name="program-area-${id}" placeholder="Обязательное поле"></textarea>
        <span class="error-msg error-msg-description"></span>
      </div>
      <div class="options-row">
        <div class="time-block">
          <label for="program-duration-${id}">Продолжительность:</label>
          <div class="select-time-wrapp">
            ${createTimeSelect(id, "hours", [0, 1, 2, 3, 4])}
            <span>:</span>
            ${createTimeSelect(id, "minutes", [0, 15, 30, 45])}
          </div>
          <span class="time-descr">Не обязательно</span>
        </div>
        <div class="price-block">
          <label for="program-price-${id}">Стоимость:</label>
          <div class="inp-price-wrapp">
            <input class="price-inp" type="text" name="program-price-${id}" placeholder="3000">
            <svg class="inp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="m12.49,24.53c-6.1-.02-11.37-4.71-11.93-10.63C-.05,7.5,4.05,1.91,10.25.71c7.73-1.5,14.83,4.86,14.22,12.71-.1,1.23-.36,2.41-.82,3.55-.29.73-.72,1-1.24.78-.5-.21-.61-.67-.32-1.39,1.99-5.05-.17-10.71-5.02-13.11C10.56.02,2.77,4.39,2.22,11.63c-.33,4.3,1.42,7.67,5.14,9.81,3.72,2.15,7.47,1.88,11.07-.47.19-.12.36-.28.59-.33.41-.08.73.07.92.43.22.42.09.79-.27,1.06-.97.73-2.03,1.29-3.17,1.7-1.3.46-2.63.67-4,.69Z"/><path class="inp-ico" d="m9.43,8.86c0-.79,0-1.57,0-2.36,0-.66.3-.97.95-.98,1.45-.01,2.9-.03,4.35,0,1.7.04,2.93,1.22,3.05,2.91.05.75.08,1.5-.03,2.25-.22,1.55-1.45,2.63-3.02,2.66-1.06.02-2.13.03-3.19,0-.47-.02-.45.23-.44.54.01.3-.09.62.44.61,1.17-.04,2.34-.01,3.51-.01.68,0,1.06.29,1.07.81.01.53-.39.86-1.08.86-1.13,0-2.27.02-3.4,0-.45-.01-.55.14-.54.56.03.98.02,1.96,0,2.93,0,.66-.41,1.04-.97.95-.49-.08-.7-.41-.7-.89,0-1.01-.02-2.03,0-3.04,0-.38-.08-.54-.49-.51-.47.03-.94.02-1.41,0-.56-.02-.93-.39-.9-.88.02-.47.37-.78.93-.79.45-.01.91-.04,1.36,0,.5.05.51-.21.52-.59.02-.43-.1-.59-.54-.55-.45.04-.91.02-1.36,0-.54-.02-.89-.35-.9-.82-.01-.49.35-.84.92-.85.49-.01.98-.02,1.47,0,.32.02.43-.09.42-.41-.02-.8,0-1.61,0-2.41Zm1.68.59c0,.61.02,1.22,0,1.83-.01.33.1.41.42.41,1.03-.02,2.05,0,3.08,0,.94,0,1.49-.54,1.53-1.48.02-.5.02-1.01,0-1.51-.04-.91-.57-1.45-1.49-1.47-1.04-.02-2.09,0-3.13-.01-.34,0-.41.13-.4.43.02.61,0,1.22,0,1.83Z"/>
            <span class="error-msg error-msg-price"></span>
          </div>
        </div>
        <div class="field-block">
          <label class="field-txt program-hide-txt" for="program-hide-${id}">Скрыть программу</label>
          <div class="status-btn">
                <input type="checkbox" class="status-checkbox" name="program-hide-${id}" ${isHidden} ? "checked" : "">
                <div class="knobs"></div>
                <div class="layer"></div>
            </div>
        </div>
      </div>
      <div class="btn-row">
        <div class="save-program">
          <span class="save-program-txt">Сохранить программу</span>
        </div>
        <div class="del-program">
          <svg class="del-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="m12.53,3.89c3.59,0,6.78,0,10.36,0,.2,0,.4-.01.58.04.42.13.66.44.61.89-.05.47-.34.75-.81.77-.71.03-1.03.03-1.74,0-.39-.02-.47.11-.47.48.01,3.18,0,6.35,0,9.53,0,.21.02.43-.08.63-.18.36-.47.54-.87.5-.42-.05-.68-.31-.75-.72-.03-.17-.02-.36-.02-.53,0-3.12,0-6.24,0-9.37,0-.38-.07-.51-.49-.51-4.25.02-8.49.02-12.74,0-.41,0-.5.12-.49.51.01,4.92,0,9.85.01,14.77,0,1.16.7,1.86,1.87,1.86,3.32,0,6.64,0,9.95,0,1.12,0,1.75-.58,1.88-1.69.06-.55.41-.89.89-.87.5.02.83.42.82.99-.03,1.72-1.5,3.25-3.26,3.27-3.53.03-7.06.04-10.6,0-1.83-.02-3.26-1.56-3.26-3.43-.01-4.92-.01-9.85,0-14.77,0-.52-.12-.75-.64-.7-.6.05-.81.02-1.41.01-.59,0-.97-.27-.98-.77-.01-.52.37-.87.99-.87,3.68,0,6.95,0,10.62,0Z"></path><path d="m10.79,13.42c0,1.05,0,2.1,0,3.15,0,.67-.33,1.06-.86,1.06-.53,0-.85-.39-.85-1.06,0-2.15,0-4.31,0-6.46,0-.64.31-1.02.83-1.03.54-.02.88.38.88,1.04,0,1.1,0,2.21,0,3.31Z"></path><path d="m15.93,13.41c0,1.07,0,2.14,0,3.2,0,.63-.32,1.01-.84,1.02-.52,0-.87-.37-.87-1,0-2.19,0-4.38,0-6.57,0-.62.35-1,.87-.99.52,0,.84.39.84,1.02,0,1.1,0,2.21,0,3.31Z"></path><path d="m12.46,2.22c-.8,0-1.6,0-2.4,0-.61,0-1-.36-.98-.88.02-.5.39-.83.98-.83,1.64,0,3.27,0,4.91,0,.58,0,.96.35.96.85,0,.5-.37.85-.95.86-.84.01-1.67,0-2.51,0Z"></path></svg>
          <div class="del-txt">Удалить</div>
        </div>
      </div>
    `;
    setupDragAndDrop(block);
    setupDeleteProgram(block);
    setupValidation(block);
    setupSaveProgram(block);
    return block;
  }

  // Создание селекторов времени
  function createTimeSelect(id, type, options, selected = "0") {
    return `
      <select id="program-${type}-${id}" name="program-${type}-${id}" class="time-select">
        ${options.map((value) => `<option value="${value}" ${value == selected ? "selected" : ""}>${value} ${type === "hours" ? "ч" : "мин"}</option>`).join("")}
      </select>
    `;
  }

  // Настройка удаления программы
  function setupDeleteProgram(programBlock) {
    const deleteButton = programBlock.querySelector(".del-program");
    deleteButton.addEventListener("click", () => {
      programBlock.remove();
      updateProgramIds();
    });
  }

  function setupDragAndDrop(programBlock) {
    
  programBlock.addEventListener("dragstart", () => {
    programBlock.classList.add("dragging");
  });

  programBlock.addEventListener("dragend", () => {
    programBlock.classList.remove("dragging");
    updateProgramIds(); // Обновление ID без повторной привязки обработчиков
  });


  programContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingBlock = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(e.clientY);
    if (afterElement == null) {
      programContainer.appendChild(draggingBlock);
    } else {
      programContainer.insertBefore(draggingBlock, afterElement);
    }
  });

  function getDragAfterElement(y) {
    const draggableElements = [...programContainer.querySelectorAll(".group-block-program:not(.dragging)")];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}

function reinitializeEventHandlers() {
  const programBlocks = programContainer.querySelectorAll(".group-block-program");
  programBlocks.forEach((block) => {
    if (!block.classList.contains("readonly")) {
      setupValidation(block);
      setupDeleteProgram(block);
      setupSaveProgram(block);
    }
    setupEditProgram(block);
  });
}

  // Настройка валидации
  function setupValidation(programBlock) {
    const inputs = {
      name: programBlock.querySelector(".additional-inp"),
      description: programBlock.querySelector(".program-area"),
      price: programBlock.querySelector(".price-inp"),
    };

    if (!inputs.name || !inputs.description || !inputs.price) return;

    inputs.name.addEventListener("blur", () =>
      validateField(inputs.name, "Укажите название программы", ".error-msg-name")
    );
    inputs.description.addEventListener("blur", () =>
      validateField(inputs.description, "Укажите состав программы", ".error-msg-description")
    );
    inputs.price.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 7);
    });
    inputs.price.addEventListener("blur", () => {
      const price = parseInt(inputs.price.value, 10);
      if (isNaN(price) || price < 2000) {
        showError(inputs.price, "Не менее 2000 рублей", ".error-msg-price");
      } else {
        removeError(inputs.price, ".error-msg-price");
      }
    });
  }


  // Валидация полей
  function validateField(input, message, errorClass) {
    if (!input.value.trim()) {
      showError(input, message, errorClass);
    } else {
      removeError(input, errorClass);
    }
  }

  function showError(input, message, errorClass) {
    const errorMsg = input.parentNode.querySelector(errorClass);
    if (errorMsg) errorMsg.textContent = message;
  }

  function removeError(input, errorClass) {
    const errorMsg = input.parentNode.querySelector(errorClass);
    if (errorMsg) errorMsg.textContent = "";
  }

  // Сохранение программы
  function setupSaveProgram(programBlock) {
  const saveButton = programBlock.querySelector(".save-program");
  saveButton.addEventListener("click", () => {
    // Перепроверяем, существуют ли элементы
    const nameInput = programBlock.querySelector(".additional-inp");
    const descriptionInput = programBlock.querySelector(".program-area");
    const priceInput = programBlock.querySelector(".price-inp");
    const statusCheckbox = programBlock.querySelector(".status-checkbox");

    if (!nameInput || !descriptionInput || !priceInput) {
      console.error("Некоторые поля не найдены в блоке программы. Проверьте структуру.");
      return;
    }

    const inputs = {
      name: nameInput.value.trim(),
      description: descriptionInput.value.trim(),
      price: parseInt(priceInput.value, 10),
      isHidden: statusCheckbox.checked,
    };

    if (!inputs.name || !inputs.description || isNaN(inputs.price) || inputs.price < 2000) {
      validateField(nameInput, "Укажите название программы", ".error-msg-name");
      validateField(descriptionInput, "Укажите состав программы", ".error-msg-description");
      validateField(priceInput, "Не менее 2000 рублей", ".error-msg-price");
      return;
    }

    const hoursSelect = programBlock.querySelector(`#program-hours-${programBlock.dataset.programId}`);
    const minutesSelect = programBlock.querySelector(`#program-minutes-${programBlock.dataset.programId}`);

    const hours = hoursSelect.value;
    const minutes = minutesSelect.value;

    if (hours === '0' && minutes === '0') {
      duration = "Не указано";
    } else {
      duration = `${hours}ч : ${minutes}мин`;
    }

    // Сохраняем данные в data-* атрибутах
    programBlock.dataset.name = inputs.name;
    programBlock.dataset.description = inputs.description;
    programBlock.dataset.price = inputs.price;
    programBlock.dataset.duration = duration;
    programBlock.dataset.isHidden = inputs.isHidden;
    // Переключаем в режим readonly
    programBlock.innerHTML = `
      <div class="program-summary">
        <div class="program-summary-item">
          <span class="summary-value">#${programBlock.dataset.programId}</span>
        </div>
        <div class="program-summary-item">
          <span class="summary-label">Название:</span>
          <span class="summary-value">${inputs.name}</span>
        </div>
        <div class="program-summary-item">
          <span class="summary-label">Стоимость:</span>
          <span class="summary-value">${inputs.price} ₽</span>
        </div>
        <div class="program-summary-item">
          <span class="summary-label">Время:</span>
          <span class="summary-value">${duration}</span>
        </div>
        <div class="btn-row">
          <div class="program-btn-edit edit-program">
            <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m11.68,22.47c-2.01,0-4.01,0-6.02,0-1.96,0-3.13-1.17-3.13-3.14,0-4.03,0-8.06,0-12.09,0-1.94,1.16-3.11,3.11-3.12,1.23,0,2.46,0,3.69,0,.12,0,.25,0,.37.01.6.07.98.49.96,1.06-.02.56-.43.96-1.04.97-1.32.01-2.65,0-3.97,0-.82,0-1.08.26-1.08,1.1,0,4.03,0,8.06,0,12.09,0,.82.26,1.08,1.1,1.08,4.01,0,8.03,0,12.04,0,.84,0,1.09-.25,1.09-1.08,0-1.21,0-2.43,0-3.64,0-.16,0-.31.02-.47.07-.56.5-.94,1.04-.92.53.02.95.41.96.96.01,1.56.05,3.11-.02,4.67-.06,1.44-1.34,2.51-2.91,2.52-2.07.01-4.14,0-6.21,0Z"/><path d="m9.85,16.72c-.17,0-.34,0-.51,0-.61-.01-1.06-.41-1.04-1.01.05-1.29.14-2.58.22-3.87.02-.31.18-.55.39-.77,2.64-2.64,5.27-5.29,7.92-7.93.77-.77,1.85-.84,2.75-.11.87.7,1.66,1.51,2.37,2.37.78.95.67,2.01-.2,2.89-2.56,2.57-5.12,5.13-7.68,7.7-.35.35-.74.52-1.24.54-.99.03-1.99.11-2.98.18,0,0,0,0,0,.01Zm.6-3.26c-.01.28-.02.56-.04.84-.02.23.02.35.3.32.56-.05,1.12-.07,1.68-.11.19-.01.35-.06.5-.21,1.37-1.38,2.74-2.76,4.12-4.13.17-.17.17-.28,0-.45-.55-.53-1.09-1.06-1.61-1.62-.24-.25-.38-.29-.64-.01-1.14,1.17-2.27,2.35-3.46,3.46-.57.54-.93,1.1-.82,1.9Zm7.84-8.87c-.06.05-.12.08-.16.12-.5.49-.98.99-1.49,1.48-.17.17-.07.26.05.37.58.58,1.17,1.16,1.74,1.75.15.16.25.17.41,0,.45-.47.91-.94,1.38-1.39.19-.18.15-.29,0-.45-.58-.57-1.14-1.14-1.72-1.71-.06-.06-.14-.12-.22-.19Z"/></svg>
            <div class="edit-txt">Изменить</div>
        </div>
        <div class="del-program program-btn-del">
          <svg class="del-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="m12.53,3.89c3.59,0,6.78,0,10.36,0,.2,0,.4-.01.58.04.42.13.66.44.61.89-.05.47-.34.75-.81.77-.71.03-1.03.03-1.74,0-.39-.02-.47.11-.47.48.01,3.18,0,6.35,0,9.53,0,.21.02.43-.08.63-.18.36-.47.54-.87.5-.42-.05-.68-.31-.75-.72-.03-.17-.02-.36-.02-.53,0-3.12,0-6.24,0-9.37,0-.38-.07-.51-.49-.51-4.25.02-8.49.02-12.74,0-.41,0-.5.12-.49.51.01,4.92,0,9.85.01,14.77,0,1.16.7,1.86,1.87,1.86,3.32,0,6.64,0,9.95,0,1.12,0,1.75-.58,1.88-1.69.06-.55.41-.89.89-.87.5.02.83.42.82.99-.03,1.72-1.5,3.25-3.26,3.27-3.53.03-7.06.04-10.6,0-1.83-.02-3.26-1.56-3.26-3.43-.01-4.92-.01-9.85,0-14.77,0-.52-.12-.75-.64-.7-.6.05-.81.02-1.41.01-.59,0-.97-.27-.98-.77-.01-.52.37-.87.99-.87,3.68,0,6.95,0,10.62,0Z"></path><path d="m10.79,13.42c0,1.05,0,2.1,0,3.15,0,.67-.33,1.06-.86,1.06-.53,0-.85-.39-.85-1.06,0-2.15,0-4.31,0-6.46,0-.64.31-1.02.83-1.03.54-.02.88.38.88,1.04,0,1.1,0,2.21,0,3.31Z"></path><path d="m15.93,13.41c0,1.07,0,2.14,0,3.2,0,.63-.32,1.01-.84,1.02-.52,0-.87-.37-.87-1,0-2.19,0-4.38,0-6.57,0-.62.35-1,.87-.99.52,0,.84.39.84,1.02,0,1.1,0,2.21,0,3.31Z"></path><path d="m12.46,2.22c-.8,0-1.6,0-2.4,0-.61,0-1-.36-.98-.88.02-.5.39-.83.98-.83,1.64,0,3.27,0,4.91,0,.58,0,.96.35.96.85,0,.5-.37.85-.95.86-.84.01-1.67,0-2.51,0Z"></path></svg>
          <div class="del-txt">Удалить</div>
        </div>
        </div>
      </div>
    `;

    setupEditProgram(programBlock);
    setupDeleteProgram(programBlock);
  });
}


function setupEditProgram(programBlock) {
  const editButton = programBlock.querySelector(".edit-program");
  if (!editButton) return;

  editButton.addEventListener("click", () => {
    // Переход в режим редактирования
    const name = programBlock.dataset.name || "";
    const description = programBlock.dataset.description || "";
    const price = programBlock.dataset.price || "";
    const duration = programBlock.dataset.duration || "0ч : 0мин";
    const [hours, minutes] = duration.split("ч : ").map((value) => value.replace("мин", "").trim());
    const isHidden = programBlock.dataset.isHidden === "true";

    programBlock.innerHTML = `
      <div class="field-block field-block-program">
        <div class="program-label-wrapp">
          <label for="additional-program-name-${programBlock.dataset.programId}">Название программы:</label>
          <input class="additional-inp" type="text" name="additional-program-name-${programBlock.dataset.programId}" value="${name}" placeholder="Обязательное поле">
          <span class="error-msg error-msg-name"></span>
        </div>
        <div class="field-txt composition-label">Состав программы:</div>
        <textarea class="program-area" name="program-area-${programBlock.dataset.programId}" placeholder="Обязательное поле">${description}</textarea>
        <span class="error-msg error-msg-description"></span>
      </div>
      <div class="options-row">
        <div class="time-block">
          <label for="program-duration-${programBlock.dataset.programId}">Продолжительность:</label>
          <div class="select-time-wrapp">
            ${createTimeSelect(programBlock.dataset.programId, "hours", [0, 1, 2, 3, 4], hours)}
            <span>:</span>
            ${createTimeSelect(programBlock.dataset.programId, "minutes", [0, 15, 30, 45], minutes)}
          </div>
          <span class="time-descr">Не обязательно</span>
        </div>
        <div class="price-block">
          <label for="program-price-${programBlock.dataset.programId}">Стоимость:</label>
          <div class="inp-price-wrapp">
            <input class="price-inp" type="text" name="program-price-${programBlock.dataset.programId}" value="${price}" placeholder="3000">
            <svg class="inp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="m12.49,24.53c-6.1-.02-11.37-4.71-11.93-10.63C-.05,7.5,4.05,1.91,10.25.71c7.73-1.5,14.83,4.86,14.22,12.71-.1,1.23-.36,2.41-.82,3.55-.29.73-.72,1-1.24.78-.5-.21-.61-.67-.32-1.39,1.99-5.05-.17-10.71-5.02-13.11C10.56.02,2.77,4.39,2.22,11.63c-.33,4.3,1.42,7.67,5.14,9.81,3.72,2.15,7.47,1.88,11.07-.47.19-.12.36-.28.59-.33.41-.08.73.07.92.43.22.42.09.79-.27,1.06-.97.73-2.03,1.29-3.17,1.7-1.3.46-2.63.67-4,.69Z"/><path class="inp-ico" d="m9.43,8.86c0-.79,0-1.57,0-2.36,0-.66.3-.97.95-.98,1.45-.01,2.9-.03,4.35,0,1.7.04,2.93,1.22,3.05,2.91.05.75.08,1.5-.03,2.25-.22,1.55-1.45,2.63-3.02,2.66-1.06.02-2.13.03-3.19,0-.47-.02-.45.23-.44.54.01.3-.09.62.44.61,1.17-.04,2.34-.01,3.51-.01.68,0,1.06.29,1.07.81.01.53-.39.86-1.08.86-1.13,0-2.27.02-3.4,0-.45-.01-.55.14-.54.56.03.98.02,1.96,0,2.93,0,.66-.41,1.04-.97.95-.49-.08-.7-.41-.7-.89,0-1.01-.02-2.03,0-3.04,0-.38-.08-.54-.49-.51-.47.03-.94.02-1.41,0-.56-.02-.93-.39-.9-.88.02-.47.37-.78.93-.79.45-.01.91-.04,1.36,0,.5.05.51-.21.52-.59.02-.43-.1-.59-.54-.55-.45.04-.91.02-1.36,0-.54-.02-.89-.35-.9-.82-.01-.49.35-.84.92-.85.49-.01.98-.02,1.47,0,.32.02.43-.09.42-.41-.02-.8,0-1.61,0-2.41Zm1.68.59c0,.61.02,1.22,0,1.83-.01.33.1.41.42.41,1.03-.02,2.05,0,3.08,0,.94,0,1.49-.54,1.53-1.48.02-.5.02-1.01,0-1.51-.04-.91-.57-1.45-1.49-1.47-1.04-.02-2.09,0-3.13-.01-.34,0-.41.13-.4.43.02.61,0,1.22,0,1.83Z"/>
            <span class="error-msg error-msg-price"></span>
          </div>
        </div>
      </div>
      <div class="field-block">
          <label class="field-txt program-hide-txt" for="program-hide-${programBlock.dataset.programId}">Скрыть программу</label>
          <div class="status-btn">
                <input type="checkbox" class="status-checkbox" name="program-hide-${programBlock.dataset.programId}" ${isHidden ? "checked" : ""}>
                <div class="knobs"></div>
                <div class="layer"></div>
            </div>
        </div>
      <div class="btn-row">
        <div class="save-program">
          <span class="save-program-txt">Сохранить программу</span>
        </div>
        <div class="del-program">
          <svg class="del-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="m12.53,3.89c3.59,0,6.78,0,10.36,0,.2,0,.4-.01.58.04.42.13.66.44.61.89-.05.47-.34.75-.81.77-.71.03-1.03.03-1.74,0-.39-.02-.47.11-.47.48.01,3.18,0,6.35,0,9.53,0,.21.02.43-.08.63-.18.36-.47.54-.87.5-.42-.05-.68-.31-.75-.72-.03-.17-.02-.36-.02-.53,0-3.12,0-6.24,0-9.37,0-.38-.07-.51-.49-.51-4.25.02-8.49.02-12.74,0-.41,0-.5.12-.49.51.01,4.92,0,9.85.01,14.77,0,1.16.7,1.86,1.87,1.86,3.32,0,6.64,0,9.95,0,1.12,0,1.75-.58,1.88-1.69.06-.55.41-.89.89-.87.5.02.83.42.82.99-.03,1.72-1.5,3.25-3.26,3.27-3.53.03-7.06.04-10.6,0-1.83-.02-3.26-1.56-3.26-3.43-.01-4.92-.01-9.85,0-14.77,0-.52-.12-.75-.64-.7-.6.05-.81.02-1.41.01-.59,0-.97-.27-.98-.77-.01-.52.37-.87.99-.87,3.68,0,6.95,0,10.62,0Z"></path><path d="m10.79,13.42c0,1.05,0,2.1,0,3.15,0,.67-.33,1.06-.86,1.06-.53,0-.85-.39-.85-1.06,0-2.15,0-4.31,0-6.46,0-.64.31-1.02.83-1.03.54-.02.88.38.88,1.04,0,1.1,0,2.21,0,3.31Z"></path><path d="m15.93,13.41c0,1.07,0,2.14,0,3.2,0,.63-.32,1.01-.84,1.02-.52,0-.87-.37-.87-1,0-2.19,0-4.38,0-6.57,0-.62.35-1,.87-.99.52,0,.84.39.84,1.02,0,1.1,0,2.21,0,3.31Z"></path><path d="m12.46,2.22c-.8,0-1.6,0-2.4,0-.61,0-1-.36-.98-.88.02-.5.39-.83.98-.83,1.64,0,3.27,0,4.91,0,.58,0,.96.35.96.85,0,.5-.37.85-.95.86-.84.01-1.67,0-2.51,0Z"></path></svg>
          <div class="del-txt">Удалить</div>
        </div>
      </div>
    `;

    setupDeleteProgram(programBlock);
    setupValidation(programBlock);
    setupSaveProgram(programBlock);
  });
}
  // Добавление новой программы
  addButton.addEventListener("click", () => {
    if (programCount < 8) {
      programContainer.appendChild(createProgramBlock(programCount + 1));
      updateProgramIds();
    }
  });

  // Инициализация
  toggleAddButton();
}

function initializeWorkShedule() {
  const radioChooseTime = document.getElementById("radio-2");
  const radioAllTime = document.getElementById("radio-1");
  const timePicker = document.getElementById("time-picker");

  // Показать/скрыть выбор времени
  radioChooseTime.addEventListener("change", () => {
    if (radioChooseTime.checked) {
      timePicker.style.display = "block";
    }
  });

  radioAllTime.addEventListener("change", () => {
    if (radioAllTime.checked) {
      timePicker.style.display = "none";
      removeError(); // Убираем ошибку, если была
    }
  });

  // Функция для отображения ошибки
  function showError(message) {
    let errorMsg = document.querySelector(".error-msg-time");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-time");
      errorMsg.textContent = message;
      timePicker.appendChild(errorMsg);
    }
  }

  // Функция для удаления ошибки
  function removeError() {
    const errorMsg = document.querySelector(".error-msg-time");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

function initializePreferArea() {
  const preferWrappers = document.querySelectorAll('.prefer-block-wrapp'); // Все блоки prefer-block-wrapp

  preferWrappers.forEach(wrapper => {
    const preferTitle = wrapper.querySelector('.prefer-h2-wrapp'); // Заголовок
    const segmentedControl = wrapper.querySelector('.segmented-control'); // Блок выбора
    const radios = wrapper.querySelectorAll('.prefer-inp'); // Все радио-кнопки в блоке
    const fieldBlock = wrapper.querySelector('.field-block'); // Текстовое поле
    const iconMap = {
      yes: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.87 167.68" class="prefer-main-icon like-ico"><path d="M124.38,0c31.56.08,54.94,29.37,48.38,60.57-3.79,18-13,33.34-24,47.73-16.44,21.65-36,40.27-57.08,57.3-2.86,2.31-5.81,2.93-8.81.5C56,144.26,31.07,120.47,13.08,90.38,6.8,79.89,2.24,68.74.48,56.48-3.17,30.93,14.22,6.2,39.77,1a49.88,49.88,0,0,1,58,36.47,45.78,45.78,0,0,1,1.53,11.11c0,4.32-2.23,7.09-5.84,7.3s-6.31-2.54-6.57-7c-1-17.52-11.8-31-28.14-35.26C33.21,7,8.86,29.13,12.79,55.27c2.07,13.78,8.27,25.75,16,37C44.4,115.1,64,134.18,85,151.93c1.24,1.06,2.2,1.42,3.64.18,23.95-20.52,46.58-42.24,62.6-69.85A76,76,0,0,0,161,55.49c4.32-28.19-23.64-51-50.11-40.44-5.82,2.31-9.87.92-11.11-2.75-1.33-3.92.77-6.82,6.73-9A49.57,49.57,0,0,1,124.38,0Z"></path></svg>`,
      mb: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="prefer-main-icon mb-ico"><path d="m17.16,24.5c-1.77-.07-3.97.13-6.15-.1-5.03-.55-9.36-4.56-10.29-9.52C-.55,8.09,3.75,1.87,10.55.66c6.58-1.17,13.11,3.71,13.83,10.36.23,2.13.07,4.26.1,6.39,0,.54-.41.93-.91.93-.51,0-.92-.4-.92-.97-.01-1.6,0-3.19,0-4.79-.03-5.02-3.38-9.08-8.3-10.07C8.74,1.41,3.11,5.48,2.43,11.12c-.75,6.27,3.86,11.51,10.17,11.53,3.17.01,6.34,0,9.51,0,.31,0,.53.02.54-.42.02-.5.48-.84.95-.81.47.03.83.4.86.92.02.36.01.73,0,1.1-.02.71-.35,1.05-1.07,1.06-1.94,0-3.88,0-6.24,0Z"/><path d="m17.43,11.03h-3.14c-.49,0-.64-.11-.79-.57-.29-.88-.57-1.76-.86-2.63-.04-.11-.08-.22-.15-.41-.23.7-.43,1.31-.63,1.92-.12.35-.23.71-.34,1.06-.18.55-.3.63-.89.63h-3.03c-.04.15.09.17.16.22.77.57,1.55,1.13,2.33,1.7.39.29.45.47.31.93-.32.99-.64,1.98-.97,2.98.15.03.21-.07.29-.13.77-.55,1.54-1.11,2.31-1.67.4-.29.58-.29.97,0,.75.54,1.5,1.09,2.25,1.63.1.07.19.13.36.24l-.31-.98c-.14-.47-.02-.78.37-.91.34-.11.62.06.77.5.3.9.59,1.8.88,2.7.1.3.05.57-.22.77s-.53.13-.79-.06c-1.16-.85-2.34-1.69-3.49-2.55-.24-.18-.39-.16-.61.01-1.13.84-2.27,1.65-3.41,2.48-.28.2-.55.38-.88.13s-.28-.57-.17-.91c.44-1.33.86-2.67,1.31-4,.09-.26.06-.4-.17-.56-1.18-.83-2.34-1.69-3.5-2.54-.49-.36-.49-.92-.01-1.13.16-.07.33-.06.5-.06,1.39,0,2.79,0,4.18,0,.31,0,.43-.09.52-.38.42-1.34.86-2.67,1.29-4.01.06-.18.11-.37.28-.49.38-.29.81-.11.99.42.45,1.36.89,2.71,1.32,4.07.09.29.22.39.52.39,1.37-.02,2.74,0,4.11,0,.12,0,.24,0,.36.01.27.04.48.17.55.45.07.28-.04.49-.26.66l-2.16,1.57c-.65.47-1.3.95-1.96,1.42-.35.25-.73.22-.95-.09s-.14-.61.24-.88c.76-.55,1.51-1.1,2.27-1.65.09-.07.21-.1.26-.28Z"/></svg>`,
      no: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="prefer-main-icon no-ico"><path d="m3.68,22.17c-.26,0-.51-.1-.71-.29s-.29-.45-.29-.71.1-.51.29-.71l4.55-4.55c.39-.39,1.02-.39,1.41,0,.2.2.29.45.29.71s-.1.51-.29.71l-4.55,4.55c-.2.2-.45.29-.71.29Z"/><path d="m20.96,22.17c-.26,0-.51-.1-.71-.29L3.04,4.66c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l7.9,7.9,7.9-7.9c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41l-7.9,7.9,7.9,7.9c.39.39.39,1.02,0,1.41-.2.2-.45.29-.71.29Z"/></svg>`
    };

    // Обработчик на радио-кнопки
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        // Скрыть/показать блок ввода текста
        if (radio.checked && (radio.value === 'yes' || radio.value === 'mb')) {
          fieldBlock.classList.remove('field-block-hidden');
        } else {
          fieldBlock.classList.add('field-block-hidden');
        }

        // Удалить старую иконку
        preferTitle.querySelector('.prefer-main-icon')?.remove();

        // Добавить новую иконку, если значение подходит
        if (iconMap[radio.value]) {
          preferTitle.insertAdjacentHTML('afterBegin', iconMap[radio.value]);
        }
      });
    });

    // Обработчик на заголовок
    preferTitle.addEventListener('click', () => {
  const selectedRadio = Array.from(radios).find(radio => radio.checked);
  
  // Переключаем видимость сегментированного блока
  segmentedControl.classList.toggle('segmented-control-hidden');

  // Проверяем, что сегментированный блок не скрыт
  if (!segmentedControl.classList.contains('segmented-control-hidden') && selectedRadio && (selectedRadio.value === 'yes' || selectedRadio.value === 'mb')) {
    fieldBlock.classList.remove('field-block-hidden'); // Показываем блок, если условия выполняются
  } else {
    fieldBlock.classList.add('field-block-hidden'); // Скрываем блок в остальных случаях
  }
});


  });
}

Dropzone.autoDiscover = false;

function dropAndSortable() {
  const dropzoneElement = document.getElementById("dropzone-area");
  const dropzone = new Dropzone("#dropzone-area", {
    url: "/profile/add/addFile/", // Путь на сервер для загрузки
    paramName: "file", // Имя параметра, с которым будет отправляться файл
    maxFiles: 15, // Максимальное количество файлов
    maxFilesize: 10, // Максимальный размер одного файла в MB
    acceptedFiles: ".jpg,.jpeg,.png,.webp", // Допустимые расширения файлов
    addRemoveLinks: false, // Включить возможность удаления файлов
    thumbnailWidth: 110, // Ширина миниатюр
    thumbnailHeight: 110, // Высота миниатюр
    createImageThumbnails: true, // Убедитесь, что это включено
    previewsContainer: "#file-preview", // Контейнер для отображения превью
    clickable: "#dropzone-area", // Элемент, на который можно кликнуть для выбора файлов
    dictDefaultMessage: "Выбрать файл", // Сообщение по умолчанию
    autoProcessQueue: true, // Загружать файлы автоматически
    uploadMultiple: true, // Разрешить загрузку нескольких файлов
    parallelUploads: 2, // Максимальное количество файлов для загрузки параллельно
    init: function () {
      const myDropzone = this;

      // Подсветка зоны при перетаскивании
      dropzoneElement.addEventListener("dragenter", () => {
        dropzoneElement.classList.add("dropzone-highlight");
      });

      dropzoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzoneElement.classList.add("dropzone-highlight");
      });

      dropzoneElement.addEventListener("dragleave", () => {
        dropzoneElement.classList.remove("dropzone-highlight");
      });

      dropzoneElement.addEventListener("drop", () => {
        dropzoneElement.classList.remove("dropzone-highlight");
      });

      // Событие, когда файл добавлен
      this.on("addedfile", function (file) {
        // Проверка размера файла
        if (file.size > myDropzone.options.maxFilesize * 1024 * 1024) {
          this.removeFile(file);
          showErrorMessage(`Размер файла не должен превышать ${myDropzone.options.maxFilesize}Mb`);
          return;
        }

        // Проверка типа файла
        const fileType = file.name.split('.').pop().toLowerCase();
        const acceptedTypes = myDropzone.options.acceptedFiles.split(',');
        if (!acceptedTypes.includes(`.${fileType}`)) {
          this.removeFile(file);
          showErrorMessage("Неверный тип файла. Допустимые форматы: .jpg, .jpeg, .png, .webp");
          return;
        }

        const previewElement = file.previewElement;

        // Создаем ссылку с кнопкой удаления (иконка SVG)
        const removeLink = document.createElement("a");
        removeLink.classList.add("dz-remove");
        removeLink.setAttribute("href", "javascript:undefined;");
        removeLink.setAttribute("data-dz-remove", "");

        removeLink.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="dz-remove-icon"><path d="m3.68,22.17c-.26,0-.51-.1-.71-.29s-.29-.45-.29-.71.1-.51.29-.71l4.55-4.55c.39-.39,1.02-.39,1.41,0,.2.2.29.45.29.71s-.1.51-.29.71l-4.55,4.55c-.2.2-.45.29-.71.29Z"/><path d="m20.96,22.17c-.26,0-.51-.1-.71-.29L3.04,4.66c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l7.9,7.9,7.9-7.9c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41l-7.9,7.9,7.9,7.9c-.39.39-.39,1.02,0,1.41-.2.2-.45.29-.71.29Z"/></svg>
        `;

        // Добавляем ссылку в превью элемента
        previewElement.appendChild(removeLink);

        // Событие удаления файла
        removeLink.addEventListener("click", function () {
          myDropzone.removeFile(file);
        });
      });

      this.on("success", function (file, response) {
        const detailsElement = file.previewElement.querySelector(".dz-details");
        const successMarkElement = file.previewElement.querySelector(".dz-success-mark");
        const errorMarkElement = file.previewElement.querySelector(".dz-error-mark");
        if (detailsElement) {
          detailsElement.remove();
        }if (successMarkElement) {
          successMarkElement.remove();
        }if (errorMarkElement) {
          errorMarkElement.remove();
        }
      });

      this.on("error", function (file, message) {
        file.previewElement.classList.add("dz-error-mark");
        removeError();
        showErrorMessage(message);
      });

      this.on("removedfile", function (file) {
        removeError();
      });
    }
  });

  const sortable = new Sortable(document.getElementById("file-preview"), {
    animation: 150,
  });

  function showErrorMessage(message) {
    let errorMsg = document.querySelector(".error-msg-dropzone");
    let container = document.querySelector(".photo-upload-container");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-dropzone");
      errorMsg.textContent = message;
      container.appendChild(errorMsg);
    }
  }

  function removeError() {
    const errorMsg = document.querySelector(".error-msg-dropzone");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

function initializeVerificationDropzone() {
    const verificationDropzoneElement = document.getElementById("verification-dropzone");
    const verificationDropzone = new Dropzone("#verification-dropzone", {
        url: "/profile/add/addFile/",
        paramName: "file", // Имя параметра
        maxFiles: 1, // Максимальное количество файлов
        maxFilesize: 10, // Максимальный размер файла в MB
        acceptedFiles: ".jpg,.jpeg,.png,.webp", // Допустимые форматы файлов
        addRemoveLinks: false, // Возможность удаления файла
        autoProcessQueue: true, // Загружать файл автоматически
        previewsContainer: "#verification-preview", // Контейнер для превью
        clickable: "#verification-dropzone", // Элемент, на который можно кликнуть
        dictDefaultMessage: "Выбрать фото", // Сообщение по умолчанию
        init: function () {
          const dz = this;
          verificationDropzoneElement.addEventListener("dragenter", () => {
            verificationDropzoneElement.classList.add("dropzone-highlight");
          });

          verificationDropzoneElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            verificationDropzoneElement.classList.add("dropzone-highlight");
          });

          verificationDropzoneElement.addEventListener("dragleave", () => {
            verificationDropzoneElement.classList.remove("dropzone-highlight");
          });

          verificationDropzoneElement.addEventListener("drop", () => {
            verificationDropzoneElement.classList.remove("dropzone-highlight");
          });

            // Удаляем предыдущий файл при добавлении нового
            dz.on("addedfile", function (file) {
              removeError();
                if (dz.files[1] != null) {
                    dz.removeFile(dz.files[0]);
                }
          // Проверка размера файла
          if (file.size > dz.options.maxFilesize * 1024 * 1024) {
            this.removeFile(file);
            showErrorMessage(`Размер файла не должен превышать ${dz.options.maxFilesize}Mb`);
            return;
          }

          // Проверка типа файла
          const fileType = file.name.split('.').pop().toLowerCase();
          const acceptedTypes = dz.options.acceptedFiles.split(',');
          if (!acceptedTypes.includes(`.${fileType}`)) {
            this.removeFile(file);
            showErrorMessage("Неверный тип файла. Допустимые форматы: .jpg, .jpeg, .png, .webp");
            return;
          }

          const previewElement = file.previewElement;

          // Создаем ссылку с кнопкой удаления (иконка SVG)
          const removeLink = document.createElement("a");
          removeLink.classList.add("dz-remove");
          removeLink.setAttribute("href", "javascript:undefined;");
          removeLink.setAttribute("data-dz-remove", "");

          removeLink.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="dz-remove-icon"><path d="m3.68,22.17c-.26,0-.51-.1-.71-.29s-.29-.45-.29-.71.1-.51.29-.71l4.55-4.55c.39-.39,1.02-.39,1.41,0,.2.2.29.45.29.71s-.1.51-.29.71l-4.55,4.55c-.2.2-.45.29-.71.29Z"/><path d="m20.96,22.17c-.26,0-.51-.1-.71-.29L3.04,4.66c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l7.9,7.9,7.9-7.9c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41l-7.9,7.9,7.9,7.9c-.39.39-.39,1.02,0,1.41-.2.2-.45.29-.71.29Z"/></svg>
          `;

          // Добавляем ссылку в превью элемента
          previewElement.appendChild(removeLink);

          // Событие удаления файла
          removeLink.addEventListener("click", function () {
            dz.removeFile(file);
          });
        });

        this.on("success", function (file, response) {
          const detailsElement = file.previewElement.querySelector(".dz-details");
          const successMarkElement = file.previewElement.querySelector(".dz-success-mark");
          const errorMarkElement = file.previewElement.querySelector(".dz-error-mark");
          if (detailsElement) {
            detailsElement.remove();
          }if (successMarkElement) {
            successMarkElement.remove();
          }if (errorMarkElement) {
            errorMarkElement.remove();
          }
        });

        this.on("error", function (file, message) {
          file.previewElement.classList.add("dz-error-mark");
          showErrorMessage(message);
        });

        this.on("removedfile", function (file) {
          removeError();
        });
      }
    });

    function showErrorMessage(message) {
      let errorMsg = document.querySelector(".error-msg-verify");
      let container = document.querySelector(".upload-verify");
      if (!errorMsg) {
        errorMsg = document.createElement("span");
        errorMsg.classList.add("error-msg-verify");
        errorMsg.textContent = message;
        container.appendChild(errorMsg);
      }
    }

    function removeError() {
      const errorMsg = document.querySelector(".error-msg-verify");
      if (errorMsg) {
        errorMsg.remove();
      }
    }
}

function initializeVideoDropzone(){
  const videoDropzoneElement = document.getElementById("video-dropzone");
  const videoDropzone = new Dropzone("#video-dropzone", {
    url: "/profile/add/addFile/",
    paramName: "file",
    maxFiles: 1,
    maxFilesize: 100, // Максимальный размер файла для видео (в MB)
    acceptedFiles: ".flv,.avi,.mov,.mp4,.mpeg,.webm,.mkv,.3gp",
    previewsContainer: "#video-preview",
    dictDefaultMessage: "Выбрать видео",
    autoProcessQueue: true,
    init: function () {
      const videoDZ = this;
      videoDropzoneElement.addEventListener("dragenter", () => {
        videoDropzoneElement.classList.add("dropzone-highlight");
      });

      videoDropzoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        videoDropzoneElement.classList.add("dropzone-highlight");
      });

      videoDropzoneElement.addEventListener("dragleave", () => {
        videoDropzoneElement.classList.remove("dropzone-highlight");
      });

      videoDropzoneElement.addEventListener("drop", () => {
        videoDropzoneElement.classList.remove("dropzone-highlight");
      });

      // Удаляем предыдущий файл при добавлении нового
      videoDZ.on("addedfile", function (file) {
        removeError();
        if (videoDZ.files[1] != null) {
          videoDZ.removeFile(videoDZ.files[0]);
        }
        // Проверка размера файла
        if (file.size > videoDZ.options.maxFilesize * 1024 * 1024) {
          this.removeFile(file);
          showErrorMessage(`Размер файла не должен превышать ${videoDZ.options.maxFilesize}Mb`);
          return;
        }

        // Проверка типа файла
        const fileType = file.name.split('.').pop().toLowerCase();
        const acceptedTypes = videoDZ.options.acceptedFiles.split(',');
        if (!acceptedTypes.includes(`.${fileType}`)) {
          this.removeFile(file);
          showErrorMessage("Неверный тип файла. Допустимые форматы: .flv,.avi,.mov,.mp4,.mpeg,.webm,.mkv,.3gp");
          return;
        }

        const previewElement = file.previewElement;

        previewElement.classList.add("videoDZ");

        const fileInfo = document.createElement("div");
        fileInfo.classList.add("file-info");
        fileInfo.innerHTML = `
            <svg class="video-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="m12.55,22.65c-3.02,0-6.04,0-9.06,0-1.77,0-2.98-1.2-2.99-2.96,0-4.79,0-9.58,0-14.37,0-1.76,1.22-2.96,2.99-2.96,6,0,12,0,18,0,1.81,0,2.99,1.2,3,3.01,0,1.1,0,2.19,0,3.29,0,.72-.34,1.09-.92,1.07-.54-.02-.92-.46-.92-1.11,0-1.1,0-2.19,0-3.29,0-.77-.36-1.12-1.14-1.13-6-.02-12-.08-18,0-.8.01-1.16.36-1.16,1.17,0,4.75,0,9.5,0,14.25,0,.84.35,1.18,1.2,1.19,5.96.02,11.92.08,17.89,0,.88-.01,1.21-.34,1.21-1.23,0-2.27,0-4.54,0-6.81,0-.36.03-.7.32-.95.26-.22.58-.32.91-.17.44.19.62.55.62,1.01,0,1.54,0,3.08,0,4.62,0,.83,0,1.65,0,2.48-.02,1.66-1.23,2.88-2.88,2.89-3.02.01-6.04,0-9.06,0Z"/><path d="m7.88,10.63c0-.9-.01-1.81,0-2.71.02-1.68,1.51-2.6,3.02-1.86,1.81.89,3.6,1.81,5.41,2.7.81.4,1.22,1.05,1.23,1.93,0,.87-.44,1.47-1.22,1.86-1.79.88-3.57,1.79-5.36,2.67-1.54.76-3.06-.2-3.08-1.93,0-.88,0-1.77,0-2.65Zm1.85-.03c0,.86,0,1.73,0,2.59,0,.38.07.56.49.35,1.74-.88,3.5-1.76,5.25-2.63.39-.2.34-.35-.02-.52-1.75-.87-3.5-1.74-5.25-2.63-.37-.19-.48-.07-.47.31.01.84,0,1.69,0,2.53Z"/><path d="m15.3,17.11c1.46,0,2.92,0,4.38,0,.69,0,1.03.29,1.04.87.01.61-.35.97-1.02.97-2.94,0-5.88,0-8.82,0-.67,0-1.09-.4-1.09-1,0-.54.37-.84,1.07-.85,1.48,0,2.96,0,4.44,0Z"/><path d="m6.07,17.11c.27,0,.54,0,.81,0,.56.02.95.45.95,1.02,0,.51-.3.8-.9.82-.57.02-1.15.03-1.72-.02-.67-.06-1.04-.46-.99-.97.05-.52.47-.84,1.11-.85.25,0,.5,0,.75,0Z"/></svg>
            <div class="file-descr">
            <span class="file-name">
              ${
                file.name.length > 10 
                ? file.name.slice(0, 10) + "..." 
                : file.name
              }
            </span> 
            <span class="file-size">(${(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
            </div>
        `;
        previewElement.appendChild(fileInfo);

        // Создаем ссылку с кнопкой удаления (иконка SVG)
        const removeLink = document.createElement("a");
        removeLink.classList.add("dz-remove");
        removeLink.setAttribute("href", "javascript:undefined;");
        removeLink.setAttribute("data-dz-remove", "");

        removeLink.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" class="dz-remove-icon"><path d="m3.68,22.17c-.26,0-.51-.1-.71-.29s-.29-.45-.29-.71.1-.51.29-.71l4.55-4.55c.39-.39,1.02-.39,1.41,0,.2.2.29.45.29.71s-.1.51-.29.71l-4.55,4.55c-.2.2-.45.29-.71.29Z"/><path d="m20.96,22.17c-.26,0-.51-.1-.71-.29L3.04,4.66c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l7.9,7.9,7.9-7.9c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41l-7.9,7.9,7.9,7.9c-.39.39-.39,1.02,0,1.41-.2.2-.45.29-.71.29Z"/></svg>
        `;

        // Добавляем ссылку в превью элемента
        previewElement.appendChild(removeLink);

        // Событие удаления файла
        removeLink.addEventListener("click", function () {
          videoDZ.removeFile(file);
        });
      });

      this.on("success", function (file, response) {
        const detailsElement = file.previewElement.querySelector(".dz-details");
        const successMarkElement = file.previewElement.querySelector(".dz-success-mark");
        const errorMarkElement = file.previewElement.querySelector(".dz-error-mark");
        if (detailsElement) {
          detailsElement.remove();
        }if (successMarkElement) {
          successMarkElement.remove();
        }if (errorMarkElement) {
          errorMarkElement.remove();
        }
      });

      this.on("error", function (file, message) {
        file.previewElement.classList.add("dz-error-mark");
        showErrorMessage(message);
      });

      this.on("removedfile", function (file) {
        removeError();
      });
    }
  });

  function showErrorMessage(message) {
    let errorMsg = document.querySelector(".error-msg-video");
    let container = document.querySelector(".upload-video");
    if (!errorMsg) {
      errorMsg = document.createElement("span");
      errorMsg.classList.add("error-msg-video");
      errorMsg.textContent = message;
      container.appendChild(errorMsg);
    }
  }

  function removeError() {
    const errorMsg = document.querySelector(".error-msg-video");
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

function getCode() {
  $.ajax({
    url: '../profile/add/getSuggestions',
    dataType: 'json',
    data: {
      code: ''
    },
    success: function (data) {
      if (data && data.results) {
        let code = document.querySelector(".verify-code");
        code.innerHTML = `<b>«SECRETOUCH ${(data.results)}»</b>`;
      }
    }
  });
}

$("#form-add").submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: '../profile/add/addForm',
        data: $(this).serialize(),
        success: function(response) {
            window.location.href = "../profile/add/addForm"; 
        },
        error: function() {
            // Обработка ошибок
            alert("Ошибка при отправке формы");
        }
    });
});



$(document).ready(function() {
  getCode();
  initializeNameField();
  initializeMask();
  initializeTelegramField();
  initializeAgeField();
  initializeHeightField();
  initializeBustField();
  initializeFootField();
  selectElem();
  initializeRoadLogic();
  initializeSelectCity();
  loadMoreOptions();
  initializeCheckMetro();
  initializeMap();
  initializeAboutArea();
  initializeProgramArea();
  initializeProgramPrice();
  initializeAddProgram();
  initializeWorkShedule();
  initializePreferArea();
  dropAndSortable();
  initializeVerificationDropzone();
  initializeVideoDropzone();
});



