export let calendar = JSON.parse(localStorage.getItem('calendar')) || [];

/*
[
  {
    id: 'Gami-Symparica Trio',
    personsName: "Gamoń",
    name: 'Symparica Trio',
    intervals:35,
    doses: 5,
    firstDose: '2024-05-15'
  }
]*/

console.log(calendar)

export function findId(id){
  let matchingObject;
  calendar.forEach((object)=>{
    if(object.id === id){
      matchingObject = object;
    }
    //console.log(matchingObject)
    
  })
  return matchingObject;
}

//findId('Gami-Symparica Trio')

export function checkId(id){
  calendar.forEach((object)=>{
    if(object.id === id){
      alert('w katalogu nie może być dwóch harmonogramów o tym samym numerze seryjnym')
    }
    //console.log(matchingObject)

  })
}

export function removeFromCalendar(elementId){
  let newCart = [];

  calendar.forEach((item)=>{
    if(item.id !== elementId){
      newCart.push(item)
    }
  })
  calendar = newCart;
  localStorage.setItem('calendar', JSON.stringify(calendar));
  //renderCalendar();
}
