// //создаем массив
// const test = [12, 13, 14, 15, 16];
// //метод unshift добавляет элемент в начало массива shift удаляет вначале
// test.unshift(123);
// //метод pop удаляет последний элемент из массива
// test.pop();
// //метод indexOf показывает индекс элемента к которому обратились
// const del = test.indexOf(14);
// //метод splice удаляет элемент к которому мы обращаемся
// test.splice(del);
// console.log(test);

// //создаем объект
// const mySelf = {
//     name: 'Vitaly', //свойства и значения объекта
//     lastName: 'Golo',
//     age: 24,
//     school: 3,
// }

// //выводим шаблонную строку с свойствами объекта
// console.log(`${mySelf.name} ${mySelf.lastName} возраст ${mySelf.age} школа ${mySelf.school}`);

const dragDrop = nul; //переменная для drag and drop

div.dragable = true; //включаем drag and drop для элемента к которому будет применятся

div.addEventListener('dragstart', eventHandler);//вызвать событие при когда берется элемент
div.addEventListener('dragenter', eventHandler);//вызвать событие когда накладывается элемент
div.addEventListener('dragend', eventHandler);//вызвать событие когда отпускаем элемент

//функция для обработки событий drag and drop
function eventHandler(event) {
    switch(event.type) {//оператор switch с параметрами event(событие) и type(что он делает)
        case 'dragstart':
            dragDrop = event.currentTarget;//в переменную dragDrop присваиваем event(этот элемент) currentTarget(имеено этот элемент)
            dragDrop.classList.add('selected');//в тот момент пока держим элемент мышкой будет применяться стиль
            break;
        case 'dragenter':
            moveСards(dragDrop, event.currentTarget);//событие dragenter отправляем выполняться в другую функцию
            break;
        case 'dragend':
            dragDrop.classList.remove('selected');
            break;
        }
}


function moveСards(dragDrop, toSwap) {//создаю функцию которая принимает два параметра
    const cardsCont = dragDrop.parentElement;

    const cardsArr = [...cardsCont.children];

    const activeCardIndex = cardsArr.indexOf(dragDrop);
    const swapCardIndex = cardsArr.indexOf(toSwap);

    if (activeCardIndex < swapCardIndex) {
        cardsCont.insertBefore(toSwap, activeCard);
    } else if (activeCardIndex > swapCardIndex) {
        cardsCont.insertBefore(activeCard, toSwap);
    }
}