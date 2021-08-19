/* Weather APP in Browser */
const weatherApiKey = '0101661c4329916c7494f80a9db1b0d6'

function getCoordinates(){

    navigator.geolocation.getCurrentPosition(function(pos){
        const position = pos.coords
        return returnTemperature(position)

    })
}

function returnTemperature (pos){
    const data = new Date()
    const celsiusValue = document.querySelector('.value-celsius')
    const location = document.querySelector('.location-text')
    const skyState = document.querySelector('.description-text')
    const date = document.querySelector('.date')
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const url =   `https://api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&appid=${weatherApiKey}` 
    
    fetch(url)
        .then (response => response.json())
        .then(data => {
            celsiusValue.innerHTML = (data.main.temp - 273.15).toFixed(0) + '°'
            location.innerHTML = data.name + ', ' + data.sys.country
            if (data.weather[0].main == 'Clear'){
                skyState.classList.add('far')
                skyState.classList.add('fa-sun')
            }
        })



    .catch(err => alert('Falha ao receber sua localização - Clima indisponível.'))

    date.innerHTML = `${days[data.getDay()]}, ${data.getDate()} ${months[data.getMonth()]}`

}

getCoordinates();



/*  clock app browser */
function showTime(){
    const data = new Date();
    let h = data.getHours(); // 0 - 23
    let m = data.getMinutes(); // 0 - 59
    let s = data.getSeconds(); // 0 - 59

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    let fullTime = h + ":" + m + ":" + s + " ";
    document.querySelector('.clock').innerHTML = fullTime;


    const salutations = document.querySelector('.time-definition')

    if (h < 6) {
        salutations.innerHTML = ' tenha uma boa madrugada!'
    }

    if (h >= 6) {
        salutations.innerHTML = ' tenha um bom dia!'
    }

    if (h >= 12) {
        salutations.innerHTML = ' tenha uma boa tarde'
    }

    if (h >= 18) {
            salutations.innerHTML = ' tenha uma boa noite!'
    }

    console.log(salutations.innerText)
}

setInterval(showTime, 1000);





/* TODO LIST */

function toDoList(){
    const todoTask = document.querySelector('.todo-value').value;
    const todoList = document.querySelector('.list-todo')
    const newTodo = document.createElement('li')
    const completeTasks = document.querySelector('.complete-tasks')

    if(todoTask == ""){
        alert ('Você nao pode criar tasks vazias')
    }
    
    else {

    newTodo.innerText = todoTask
    newTodo.className = 'todo-item'
    todoList.appendChild(newTodo)
    document.querySelector('.todo-value').value = ""
    }

    newTodo.addEventListener('click', () => {
        newTodo.classList
            .toggle('complete')
        
        if (newTodo.classList.contains('complete')){
            completeTasks.appendChild(newTodo)
        }

        else {
            todoList.appendChild(newTodo)
        }
    })
}


