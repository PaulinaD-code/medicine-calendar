import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let today = dayjs();
let todayFormat = today.format('dddd, MMMM D');

const button = document.querySelector('.js-calbulate-btn');
let medicineName = document.querySelector('.js-medicine-name');
let interval = document.querySelector('.js-how-many-times');
let doses = document.querySelector('.js-doses-number');
let dateStart = document.querySelector('.js-first-dose');

button.addEventListener('click', ()=>{
  let name = medicineName.value;
  let times = Number(interval.value);
  let dosesValue = Number(doses.value);
  let start = dateStart.value;
  let firstDay = Number(start.slice(8));
  let firstMonth = Number( start.slice(5,7))
  const difference = today.diff(start, 'days')

  console.log(difference);
  console.log(start)

  console.log(`the difference is ${difference}`)

  let startingDate;

  if(difference == 0){
    startingDate = today;
  }else if(difference > 0){
    startingDate = today.subtract(difference, 'days')
  }else if(difference < 0){
    startingDate = today.subtract(difference-1, 'days')
  }

  console.log(`dzień startowy to ${startingDate}`)
  console.log(`interval is ${times}`)

 let timesIntervals = pomnozPrzez(dosesValue, times);

 let ostateczne_daty = timesIntervals.map((number) => startingDate.add(number, 'day'));

 console.log(ostateczne_daty);

 let ostateczne_daty_format = ostateczne_daty.map((date) => date.format('dddd, MMMM D YYYY'));

 console.log(ostateczne_daty_format);

 renderDates(ostateczne_daty_format);
 renderMedicineName(name);
 rederFirstDose(startingDate)
 return ostateczne_daty_format
})

  let timesIntervals = [];
  
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
  console.log(terminyDawek);
  return terminyDawek;
 }

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
    document.querySelector('.js-terms-of-uses').innerHTML = html;

    document.querySelectorAll('.js-check-box')
    .forEach(( value, index ) => {
      value.addEventListener('click', ()=>{
        checked(value);
      })
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
 }

 function renderMedicineName(medicamentName){
  //medicamentName = medicineName.value;

  let html = `
  <div class="medicament-name">
    <h3>Nazwa leku: ${medicamentName}</h3>
  </div>
  `
  document.querySelector('.js-medicine-name-container').innerHTML = html;
 }

 function rederFirstDose(firstDose){
  let html = `
  <div class="medicament-first-date">
    <p>Termin podania pierwszej dawki: ${firstDose}</p>
    <p>Terminy podania pozostałych dawek</p>
  </div>
  `
  document.querySelector('.js-first-dose-information').innerHTML = html;
 }

 function checked(element){
  if(element.className === 'js-check-box css-check-box'){
    element.classList.add('ccs-chekmark');
  }else{
    element.classList.remove('ccs-chekmark');
  }
}