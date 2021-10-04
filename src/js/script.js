//пустой массив для добавления значений и их сортировки
let taskList = [];
let activeCard = null;// создаем переменную activeCard для drag and drop и приравниваем к null(пусто)
let main_line = null;
let firstInput = null;

function loadWindow() {

    const toDoList = document.querySelector('.toDoList');
    
    const add_button = document.querySelector('.add_button');//ищем элемент add_button (кнопку)
    add_button.addEventListener('click', addElement);//вешаем событие на кнопку add_button
    
    main_line = document.querySelector('.line');//ищем элемент line в котором хранятся тестовые строки с кнопкой удаления
    firstInput = document.querySelector('input');
    
    const img_delete = document.querySelector('.img_delete');
    img_delete.addEventListener('click', (event) => {
        event.target.previousElementSibling.firstElementChild.value = '';
    });

    const filter = document.querySelector('.filter');
    filter.addEventListener('click', sortElement);
}

function addElement() {
    const div = document.createElement('div');//при клике на кнопку add_button создаем div
    const input = document.createElement('input')//при клике на кнопку add_button создаем input
    const imgDelete = document.createElement('div');//при клике на div с картинкой будет происходить удаление элемента

    div.classList.add('line_card');//новый div взаимствует стили line_card
    imgDelete.classList.add('img_delete');////новый дочерний div взаимствует стили img_delete
    
    main_line.append(div);//поместить новый div в родителя
    div.append(input);//поместить input в общий div с кнопкой удаления
    div.append(imgDelete);//поместить div с картинкой удаления в div с input

    //текст вставляем в новую строку
    input.value = firstInput.value;//value обращение к значение input
    firstInput.value = '';
    
    imgDelete.addEventListener('click', delElement);//при клике происходит событие и исполняется код функции delElement

    //создаем объект 
    const obj = {
        divElement: div,
        inputElement: input
    }
    taskList.push(obj);//добавляю объект в массив

    //DRAG AND DROP, беред начало в функции добавления
    div.draggable = true; //устанавливаем true на элемент который хотим перетаскивать

    div.addEventListener("dragstart", eventHandler);//Событие dragstart вызывается, когда пользователь начинает перетаскивать выделенный элемент или текст
    div.addEventListener("dragenter", eventHandler);//событие dragenter срабатывает когда перетаскиваемый элемент оказывается над другим элементом
    div.addEventListener("dragend", eventHandler);//событие срабатывает когда происходит отпускание мыши или esc
}

function eventHandler(event) {// drag and drop вызывает функцию
    console.log(event.type)
    switch(event.type) { //если событие и тип
        case "dragstart":
            activeCard = event.currentTarget;
            activeCard.classList.add("selected");
            break;
        case "dragenter":
            changeCards(activeCard, event.currentTarget);
            break;
        case "dragend":
            activeCard.classList.remove("selected");
            break;
    }

}


function changeCards(activeCard, toSwap) {
    const cardsCont = activeCard.parentElement;

    const cardsArr = [...cardsCont.children];

    const activeCardIndex = cardsArr.indexOf(activeCard);
    const swapCardIndex = cardsArr.indexOf(toSwap);

    console.log(activeCardIndex)
    console.log(swapCardIndex)


    if (activeCardIndex < swapCardIndex) {
        cardsCont.insertBefore(toSwap, activeCard);
    } else if (activeCardIndex > swapCardIndex) {
        cardsCont.insertBefore(activeCard, toSwap);
    }
}

//удаление строки с div
function delElement(event) {
    const index = taskList.findIndex((objElement) => {
        return objElement.divElement === event.target.parentElement;
    });
    taskList.splice(index, 1);
    event.target.parentElement.remove();
}


//сортировка объекта в массиве
function sortElement(event) {
    const button_filter = event.currentTarget;
    button_filter.classList.toggle('filter_top');
    if (button_filter.classList.contains('filter_top')) {
        //идет сравнение между собой и сортировка значений input
        taskList.sort((a, b) => a.inputElement.value < b.inputElement.value ? 1:-1);
    } else {
        taskList.sort((a, b) => a.inputElement.value > b.inputElement.value ? 1:-1);
    }

    //перебо массива и перерисовка div в контейнере
    taskList.forEach(element => {
        main_line.append(element.divElement);
    });
}


window.addEventListener('load', loadWindow); //выполнение кода функции после загрузки страницы

//document - обращение к html документу
//querySelector - обращаемся к определенному элемнту html
//value - обращение к значение input

//addEventListener - обработчик событий
//addEventListener('click') это событие