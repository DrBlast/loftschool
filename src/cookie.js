/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let cookies = {};

function getCookies() {
    let allCookies = document.cookie;

    if (allCookies.length === 0){
        return cookies;
    }

    allCookies.split(';').forEach(cookie => {
        let pair = cookie.split('=');

        cookies[pair[0]] = pair[1];
    });

    return cookies;
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-1;';
}

function displayCookie(cookieList = cookies) {
    const fragment = document.createDocumentFragment();

    listTable.innerHTML = '';

    for (let [name, value] of Object.entries(cookieList)) {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdValue = document.createElement('td');

        tdName.innerText = name;
        tdValue.innerText = value.toString();
        tr.appendChild(tdName);
        tr.appendChild(tdValue);

        const tdDelBtn = document.createElement('td');
        const delBtn = document.createElement('button');

        delBtn.innerText = 'X';
        tdDelBtn.style.textAlign = 'center';

        delBtn.addEventListener('click', () => {
            tr.remove();
            deleteCookie(name);
        });

        tdDelBtn.appendChild(delBtn);
        tr.appendChild(tdDelBtn);
        fragment.appendChild(tr);
    }

    listTable.appendChild(fragment);
}

function isMatching(name, value, chunk) {
    const reg = new RegExp(chunk);

    return ((name.search(reg) !== -1) || (value.search(reg) !== -1));
}

function filterCookie(filterValue) {
    if (filterValue.length === 0) {
        displayCookie();
    } else {
        let filteredCookies = {};

        Object.entries(cookies).forEach(([name, value]) => {
            if (isMatching(name, value, filterValue)) {
                filteredCookies[name] = value;
            }
        });

        displayCookie(filteredCookies);
    }
}

filterNameInput.addEventListener('keyup', function () {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    filterCookie(filterNameInput.value);
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    if (addNameInput.value.length !== 0 && addValueInput.value.length !== 0) {
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        getCookies();
        filterCookie(filterNameInput.value);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let existingCookies = getCookies();

    displayCookie(existingCookies);
});