
function loadWindow() { //РАБОТА С КНОПКОЙ
    let taskList = [];


    const toDoList = document.querySelector('.toDoList');//ищем элемент to-do list
    const cardContainer = toDoList.querySelector('.line');//ищем элемент line
    const imgDelete = cardContainer.querySelector('.img_delete');//ищем элемент img_delete
    const add = document.querySelector('.add_button');//ищем элемент add_button
    const firstInput = document.getElementById('0');
    const filter = document.querySelector('.filter');

    filter.addEventListener('click', sortElement);

    imgDelete.addEventListener('click', (event) => {                        //вешаем событие клика которая делает пустую строку
        event.target.previousElementSibling.firstElementChild.value = "";
    })

    add.addEventListener('click', addElement); //через обработчик вешаем событие "клик" на кнопку и отправляем в функцию addElement
   
    function addElement() { //РАБОТА СО СТРОКОЙ ВВОДА
        const div = document.createElement('div');//создаю контейнер div
        const input = document.createElement('input');//создаю строку ввода
        const img = document.createElement('div');//создаю место под картинку
        
        div.classList.add('line_card');//добавляет стили в новый див из дива в html
        img.classList.add('img_delete');//добавляет стили в новый див из дива в html
    
        cardContainer.append(div);//вставляет созданный див в нужное место
        div.append(input);//в созданный див вставляем инпут
        div.append(img);//в созданный див вставляем картинку
    
        img.addEventListener('click', delElement);

        const obj = {
            divElement: div,
            inputElement: input
        }
        taskList.push(obj);
        console.log(taskList)

        input.value = firstInput.value;//инпуту назначаем текстовую строку
        firstInput.value = '';

                                
    }
    
    function delElement(event) {
        event.target.parentElement.remove();
    }

    function sortElement() {
        taskList.sort((a, b) => a.inputElement.value > b.inputElement.value ? 1:-1);
        taskList.forEach(element => {
            cardContainer.append(element.divElement);
        });
        
        console.log(taskList[0].inputElement.value);
    }
}

window.addEventListener('load', loadWindow);//перед загрузкой страницы

//loadWindown - загрузить виндовс (до загрузки) ...
//addElement - добавить элемент

//addEventListener обработчик событий
//addEventListener('click') это событие