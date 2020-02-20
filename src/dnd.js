/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */

function createDiv() {
    const newDiv = document.createElement('div');
    const documentHeight = document.documentElement.clientHeight;
    const documentWidth = document.documentElement.clientWidth;
    const elTop = Math.floor(Math.random() * documentHeight) + 1;
    const elLeft = Math.floor(Math.random() * documentWidth) + 1;

    const elHeight = Math.floor(Math.random() * (documentHeight - elTop)) + 1;
    const elWidth = Math.floor(Math.random() * (documentWidth - elLeft)) + 1;

    newDiv.classList.add('draggable-div');
    newDiv.style.position = "absolute";
    newDiv.style.top = elTop + "px";
    newDiv.style.left = elLeft + "px";
    newDiv.style.width = elWidth + "px";
    newDiv.style.height = elHeight + "px";
    newDiv.style.color = "#"+((1<<24)*Math.random()|0).toString(16);
    newDiv.style.backgroundColor = "#"+((1<<24)*Math.random()|0).toString(16);

    return newDiv;
  //  homeworkContainer.appendChild(newDiv);
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {


}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
