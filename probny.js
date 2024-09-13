import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { 
  calendar,
  findId
 } from './scrpts/data/data.js';

let today = dayjs();
let todayFormat = today.format('dddd, MMMM D');


const button = document.querySelector('.js-calbulate-btn');
let medicineName = document.querySelector('.js-medicine-name');
let interval = document.querySelector('.js-how-many-times');
let doses = document.querySelector('.js-doses-number');
let dateStart = document.querySelector('.js-first-dose');
let patientName = document.querySelector('.js-patient-name');

function pushData(){
  let personsName = patientName.value;
  let medicineIdentity = medicineName.value;
  let id = personsName.concat('', medicineIdentity);

  let object = {};

  object.id = id;
  object.personsName = personsName;
  object.name = medicineName.value;
  object.intervals = Number(interval.value);
  object.doses = Number(doses.value);
  object.firstDose = dateStart.value;

  calendar.push(object);
}

button.addEventListener('click', ()=>{
  pushData();
  renderCalendar();
})

/*button.*/addEventListener('click', ()=>{
  let name = medicineName.value;
  let times = Number(interval.value);
  let dosesValue = Number(doses.value);
  let start = dateStart.value;
  //let firstDay = Number(start.slice(8));
  //let firstMonth = Number( start.slice(5,7))
  //const difference = today.diff(start, 'days')

  //let startingDate;

  /*
  if(difference == 0){
    startingDate = today;
  }else if(difference > 0){
    startingDate = today.subtract(difference, 'days')
  }else if(difference < 0){
    startingDate = today.subtract(difference-1, 'days')
  }*/

 //let timesIntervals = pomnozPrzez(dosesValue, times);

  //let ostateczne_daty = timesIntervals.map((number) => startingDate.add(number, 'day'));

  //let ostateczne_daty_format = ostateczne_daty.map((date) => date.format('dddd, MMMM D YYYY'));
})


  //let timesIntervals = [];
  
 function pomnozPrzez(ileRazy, odstepy){
  let liczba = 0;
  let i = 0;
  let terminyDawek = [];
  let faktyczneDawwki = ileRazy-1;

  while(i < faktyczneDawwki){
    i++;
    //console.log(liczba += odstepy);
    terminyDawek.push(liczba += odstepy)
  }
  //console.log(terminyDawek);
  return terminyDawek;
 }

 /*
 function renderDates(array){
  let html = '';
  
  array.forEach((date, index) => {
    html += `
     <div class="list-line js-line-container-${index}"> 
     <div class="date-time">
      <div class="js-check-box css-check-box"></div>
      <p> ${date},  </p>
    </div>
    <button class="button-reset js-reset-button">
    usuń</button>
    </div>

    `
    //console.log(html)

    //document.querySelector(`.js-schedule-subcontainer-${id}`).innerHTML = html
    return html;
    
    document.querySelector('.js-terms-of-uses').innerHTML = html;

    document.querySelectorAll('.js-check-box')
    .forEach(( value, index ) => {
      value.addEventListener('click', ()=>{
        checked(value);
      })
      return html
    })


    document.querySelectorAll('.js-reset-button')
    .forEach((deleteButton, index)=>{
      deleteButton.addEventListener('click', () => {
        //shoppingBasket.splice(index, 1);
        //renderShoppingBasket();
        console.log('hello');
        let container = document.querySelector(`.js-line-container-${index}`);
        container.remove();
      });
    });

  })

 }*/

  function renderPatientName(name){
    let html = `
    <div class="person-name js-person-name">
    ${name}
    </div>
    `
    return html;
  }


 function renderMedicineName(medicamentName){
  //medicamentName = medicineName.value;

  let html = `
  <div class="medicament-name">
    <h3>Nazwa leku: </h3>
     <p class="uppercase">
    ${medicamentName}
    </p>
  </div>
  `

  //document.querySelector('.js-medicine-name-container').innerHTML = html;
  return html;
 }

 function rederFirstDose(firstDose){
  let html = `
  <div class="medicament-first-date">
    <p>Termin podania pierwszej dawki: ${firstDose}</p>
    <p>Terminy podania pozostałych dawek:</p>
  </div>
  `

  //document.querySelector('.js-first-dose-information').innerHTML = html;
  return html
 }

 function checked(element){
  if(element.className === 'js-check-box css-check-box'){
    element.classList.add('ccs-chekmark');
  }else{
    element.classList.remove('ccs-chekmark');
  }
}

function renderCalendar(){
  let schedule_html = '';

  calendar.forEach((medicine)=>{
    let personsName = medicine.personsName;
    let id = medicine.id;
    let name = medicine.name;
    let intervals = medicine.intervals;
    let doses = medicine.doses;
    let firstDose = medicine.firstDose;

    const difference = today.diff(firstDose, 'days')

    let startingDate;

  if(difference == 0){
    startingDate = today;
  }else if(difference > 0){
    startingDate = today.subtract(difference, 'days')
  }else if(difference < 0){
    startingDate = today.subtract(difference-1, 'days')
  }

  let timesIntervals = pomnozPrzez(doses, intervals);

  let ostateczne_daty = timesIntervals.map((number) => startingDate.add(number, 'day'));

  let ostateczne_daty_format = ostateczne_daty.map((date) => date.format('dddd, MMMM D YYYY'));

 ;
 //renderMedicineName(name);
 //rederFirstDose(startingDate)

 schedule_html += `
 <div class="schedule js-schedule-${id}">
    <div class="schedule-title js-schedule-title">
      <div class="patient-mini-container">
        ${renderPatientName(personsName)}
      </div>
      <div class="name-subcontainer">
        ${renderMedicineName(name)} 
      </div>
      <button class="develop-list-btn 
      js-develop-list-btn"
      data-medicine-id="${id}"> 
      Rozwiń 
      </button>
    </div>
    
    <div class="list js-list-${id}"
    data-list-id="${id}">
      <div class="first-dose-container">
      ${rederFirstDose(firstDose)}
      </div>
      <div class="schedule-subcontainer js-schedule-subcontainer"
      data-medicine-id="${id}">
      </div>
    </div>

 </div>
 `
 const newContainer = document.querySelector('.js-terms-of-uses');
 
 newContainer.innerHTML = schedule_html;
 let listContainer = document.querySelector(`.js-list-${id}`);
 
 document.querySelectorAll(`.js-develop-list-btn`)
  .forEach((button)=>{
    button.addEventListener('click', ()=>{
      const medicineId = button.dataset.medicineId;
      let matchingGroup = findId(medicineId);
      console.log(matchingGroup);

      
      document.querySelectorAll(`.js-list`)
        .forEach((el)=>{
          let listId = el.dataset.listId;
          if(listId === medicineId){
            el.classList.add = 'develop-list-btn'

          }
        })
      
      if(listContainer.className === `list js-list-${medicineId}`){
        listContainer.className = `list js-list-${medicineId} list-visible`;
        button.innerHTML = `Zwiń`;
      }else{
        listContainer.className = `list js-list-${medicineId}`;
        button.innerHTML = `Rozwiń`
      }
    })

  })
  

 document.querySelectorAll('.js-schedule-subcontainer')
  .forEach((element)=>{
    let medicineId = element.dataset.medicineId;
    let matchingProduct = findId(medicineId);

    let timesIntervals = pomnozPrzez(matchingProduct.doses, matchingProduct.intervals);

    let ostateczne_daty = timesIntervals.map((number) => startingDate.add(number, 'day'));

  let ostateczne_daty_format = ostateczne_daty.map((date) => date.format('dddd, MMMM D YYYY'));

  let html = '';
  
  ostateczne_daty_format.forEach((date, index) => {
    html += `
     <div class="list-line js-line-container-${index}"> 
     <div class="date-time">
      <div class="js-check-box css-check-box"></div>
      <p> ${date},  </p>
    </div>
    <button class="button-reset js-reset-button">
    usuń</button>
    </div>
    `  

    element.innerHTML = html;

    document.querySelectorAll('.js-check-box')
    .forEach(( value, index ) => {
      value.addEventListener('click', ()=>{
        checked(value);
      })
      //return html
    })


    document.querySelectorAll('.js-reset-button')
    .forEach((deleteButton, index)=>{
      deleteButton.addEventListener('click', () => {
        //ostateczne_daty_format.splice(index, 1);
        //renderCalendar();
      
        let container = document.querySelector(`.js-line-container-${index}`);
        container.remove();
      });
    });


  //renderDates(ostateczne_daty_format);
  })

  })
})
}

renderCalendar();

