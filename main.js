let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let currentDate = new Date(); //Toma la fecha del ordenador como referencia
let currentDay = currentDate.getDate(); //Nos devuelve el dia de la semana
let monthNumber = currentDate.getMonth(); //Nos devuelve un numero entre 0 y 11.
let currentYear = currentDate.getFullYear(); 

let dates = document.getElementById("dates"); //Llamamos al elemento 
let month = document.getElementById("month"); //Llamamos al elemento 
let year = document.getElementById("year"); //Llamamos al elemento 

let prevMonthDOM = document.getElementById("prev-month"); //Llamamos al elemento flecha
let nextMonthDOM = document.getElementById("next-month"); //Llamamos al elemento flecha

month.textContent = monthNames[monthNumber]; //Le da al contenido del elemento month, el dato del array que coincide con el monthNumber
year.textContent = currentYear.toString(); //Se le agrega toString porque esto da un numero, evita posibles errores

prevMonthDOM.addEventListener('click', ()=> lastMonth()); //llamamos a las funciones de las flechas
nextMonthDOM.addEventListener('click', ()=> nextMonth()); //llamammos a las funciones de las flechas


function writeMonth(month) { //escribe los meses y usa de parametro el mes que tiene que escribir
    
    for (let i=startDay(); i>0; i--) {
        dates.innerHTML += `<div class="calendar__date calendar__item calendar__last-days">
        ${getTotalDays(monthNumber-1)-(i-1)}
        </div>`;
    }
    
    for (let i=1; i<=getTotalDays(month); i++) {
        
        if (i===currentDay){
        dates.innerHTML += `<div class="calendar__date calendar__item calendar__today">${i}</div>`; 
        } else {
        dates.innerHTML += `<div class="calendar__date calendar__item">${i}</div>`;
        }
    }
}

function getTotalDays(month) { //saber el total de dias que tiene que escribir (30, 31, 28)
    if (month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return 31;
    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;
    } else {
        return isLeap() ? 29:28; //isLeap nos devuelve true o false. True nos da 29 y false 28.
    }
} 

function isLeap() { //saber si el ano es bisiesto o no
    return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));{
    }
}

function startDay() { //Que dia empieza la semana
    let start = new Date(currentYear, monthNumber, 1); //En que fecha cae el dia 1 del mes
    return((start.getDay()-1) === -1) ? 6 : start.getDay()-1;//sin el -1 devuelve un 1 si es domingo, o un 6 si es sabado.
}

function lastMonth() { //Dibuja el mes anterior
    if (monthNumber !== 0) { //Si es distinto a 0 no estamos en enero
        monthNumber--;
    } else {
        monthNumber = 11; //Si es igual a 0, me va a mostrar diciembre y me va a restar el ano.
        currentYear--;
    }

    setNewDate(); //Me va a establecer el nuevo ano 
}

function nextMonth() { //Escribe el mes posterior
    if (monthNumber !== 11) { //Si es distinto a 0 no estamos en enero
        monthNumber++;
    } else {
        monthNumber = 0; //Si es igual a 0, me va a mostrar diciembre y me va a restar el ano.
        currentYear++;
    }

    setNewDate(); //Me va a establecer el nuevo ano
}

function setNewDate() { //Establece la nueva fecha cuando movemos el calendario
    currentDate.setFullYear(currentYear, monthNumber, currentDay);
    month.textContent = monthNames[monthNumber]; //Para cambiar el nombre del mes que tenemos
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeMonth(monthNumber);
}

writeMonth(monthNumber);