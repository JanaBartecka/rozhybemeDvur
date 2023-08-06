// pole vsech filtru
let allFilters = Array.from(document.querySelectorAll('.filters__checkboxItem'));
//pole vsech akci
let allAkce = Array.from(document.querySelectorAll('.akce__item'));
//priprava pro pole, kde budou vypisovane akce do stranky
let Akce
//pocet akci na stranku
const limitAkce=20
let activePageAkce=1

//currentPage - zjisteni na ktere strance se nachazime
const url = window.location.href;
const SplittedUrl=url.split('/')
const currentPage=SplittedUrl[SplittedUrl.length-2]
//priprava pro pole, kde budou akce uplynule a nadchazejici
let UplynuleUdalosti=[];
let NadchazejiciUdalosti=[];

//pole vsech checkboxu
let allCheckboxes = document.querySelectorAll('.checkbox');
//objekt polozek ktere jsou checked
let checked = {};

//zavolani funkce getChecked pro vsechny moznosti - kontroluje jestli je polozka checked - pokud ano, ulozi id do pole napr.TypAkce v objektu checked
getChecked('TypAkce');
getChecked('DobaKonani');
getChecked('KrouzkyPodleVeku');
getChecked('AktivityPodleVeku');
getChecked('Vylety');


//if smycka pro stranku AKCE kde dojde k rozdeleni na akce nadchazajici a uplynule
// inicializace
if (currentPage==='akce') {
    //zjisteni dnesniho data
    const GetCurrentDate=new Date()
    const CurrentRok=GetCurrentDate.getFullYear()
    const CurrentMesic=GetCurrentDate.getMonth()
    const CurrentDen=GetCurrentDate.getDate()
    //definice hledaneho substringu
    const substring= /^akce_datum_/;
    //promenne pro datum akce ktere se posuzuje pro zaradeni akce do kategorie nadchazejici nebo uplynule
    let AkceDen=''
    let AkceMesic=''
    let AkceRok=''
    
    //vytvoreni pole nadchazejiciAkce ze vsech akci podle data zacatku pripadne ukonceni pokud existuje
    const NadchazejiciAkce=allAkce.filter(e => {
      //ziskani class listu pro polozku
      const ClassList=Array.from(e.classList)
      //defaultni nastaveni display na none
      e.style.display = 'none';
      //ostamostatneni data od stringu ktery ho identifikuje
      const DateTag=ClassList.filter(string => substring.test(string))
      //charakteristicke datum pro zarazeni v pripade ze akce bezi v nejakem obdobi od do
      if (DateTag[0].length>19) {
        AkceDen=parseInt(DateTag[0].slice(25,27))
        AkceMesic=parseInt(DateTag[0].slice(23,25))
        AkceRok=parseInt(DateTag[0].slice(19,23))
      } else {
        //pro jednodenni akci
        AkceDen=parseInt(DateTag[0].slice(17,19))
        AkceMesic=parseInt(DateTag[0].slice(15,17))
        AkceRok=parseInt(DateTag[0].slice(11,15))
      }

      //rozradeni na nadchazejici a uplynulou akci podle data definovaneho v predchozi if smycce
      if (DateTag[0]) {
        if (AkceRok>=CurrentRok) {
          if (AkceMesic-1>CurrentMesic) {
            return e
          } else if (AkceMesic-1===CurrentMesic) {
            if (AkceDen>=CurrentDen) {
              return e
            } else {
              UplynuleUdalosti.splice(UplynuleUdalosti.length-1,0,e);
            }
          } else {
            UplynuleUdalosti.splice(UplynuleUdalosti.length-1,0,e);
          }
        } else {
          UplynuleUdalosti.splice(UplynuleUdalosti.length-1,0,e);
        }
      }
    })
    Akce=NadchazejiciAkce
    NadchazejiciUdalosti=NadchazejiciAkce
} else {
  Akce=allAkce
}

//inicializace
setVisibility()

//omezeni poctu vypsanych akci na stranku
function pagination(pocetAkci) {
  //zachyceni kde se bude strankovani vypisovat
  let pagination=document.querySelector('.akce__pagination')
  pagination.innerHTML=''
  if (pocetAkci>limitAkce) {
    //cyklus pres vsechny stranky
    for (let i = 1; i <= Math.floor(pocetAkci / limitAkce)+1; i++) {
      //definice noveho elementu
      const newPage=document.createElement('button')
      //pridani tridy
      newPage.classList.add('button')
      if (parseInt(activePageAkce)===i) {
        newPage.classList.add('button--active')
      }
      //pridani obsahu
      newPage.textContent=i
      newPage.addEventListener('click',zmenaStrany)
      //pridani noveho elementu do stranky
      pagination.appendChild(newPage)
    }
  }
  //odscrollovani nahoru
  if (pocetAkci!==1) {
    scrollToTop() 
  }
}

//funkce k odscrollovani na zacatek
function scrollToTop() {
  let scrollGoal=document.querySelector('.banner').offsetTop + document.querySelector('.banner').offsetHeight
  window.scrollTo({
    top:scrollGoal,
    behavior:"smooth"
  })
}

function zmenaStrany(event){
  activePageAkce=event.target.textContent
  setVisibility();
}

//pridani posluchace change na kazdy checkbox
Array.prototype.forEach.call(allCheckboxes, function (el) {
  el.addEventListener('change', toggleCheckbox);
});

//funkce ktera se vola po zaskrtnuti checkboxu
function toggleCheckbox(e) {
  getChecked(e.target.name);
  toggleCheckboxElement(e.target)
}

function toggleCheckboxElement(targetElement) {
  const LabelElement=targetElement.labels[0]
  if (targetElement.checked===true) {
    LabelElement.classList.add('filters__checkboxItem--active')
  } else {
    LabelElement.classList.remove('filters__checkboxItem--active')
  }
  //pokud je kliknuto na checkbox Uplynule Udalosti pak zmen aktivni pole ze ktereho probiha filtrovani a zmena disply
  if (targetElement.id==='UplynuleUdalosti') {
      if (targetElement.checked===true) {
      UplynuleUdalosti.forEach((item) => {
      item.style.display = 'block';
        })
      NadchazejiciUdalosti.forEach((e) => {
        e.style.display = 'none';
      })
      Akce=UplynuleUdalosti
    } else { 
      NadchazejiciUdalosti.forEach((item) => {
        item.style.display = 'block';
          })
      UplynuleUdalosti.forEach((e) => {
          e.style.display = 'none';
        })
      Akce=NadchazejiciUdalosti
    }
  }
  activePageAkce=1
  setVisibility();
}

function sortByCalendar() {
  let DataFilters=JSON.parse(sessionStorage.getItem('DateFilter'))
  let currentValue
  let currentValueEnd
  const substring= /^akce_datum_/;

  //vytvoreni pole filteredByCalendar ze vsech akci podle data zacatku pripadne ukonceni pokud existuje
  const filteredByCalendar=allAkce.filter(e => {
    //ziskani class listu pro polozku
    const ClassList=Array.from(e.classList)
    //defaultni nastaveni display na none
    e.style.display = 'none';
    //osamostatneni data od stringu ktery ho identifikuje
    const DateTag=ClassList.filter(string => substring.test(string))
    console.log(DateTag[0]);
    //charakteristicke datum pro zarazeni v pripade ze akce bezi v nejakem obdobi od do
    let vicedenniAkce=false
    if (DateTag[0].length>19) {
      currentValueEnd=cisloDne(parseInt(DateTag[0].slice(23,25)),parseInt(DateTag[0].slice(25,27)))
      console.log('currentValueEnd' + currentValueEnd);
      // AkceDen=parseInt(DateTag[0].slice(25,27))
      // AkceMesic=parseInt(DateTag[0].slice(23,25))
      // AkceRok=parseInt(DateTag[0].slice(19,23))
      vicedenniAkce=true
    }
      //pro jednodenni akci
      currentValue=cisloDne(parseInt(DateTag[0].slice(15,17)),parseInt(DateTag[0].slice(17,19)))
      console.log('currentValue' + currentValue);
      // AkceDen=parseInt(DateTag[0].slice(17,19))
      // AkceMesic=parseInt(DateTag[0].slice(15,17))
      // AkceRok=parseInt(DateTag[0].slice(11,15))


    const StartValue=cisloDne(DataFilters[0].month,DataFilters[0].day)
    const EndValue=cisloDne(DataFilters[1].month,DataFilters[1].day)
    console.log('StartValue' + StartValue);
    console.log('EndValue' + EndValue);

    //rozradeni na nadchazejici a uplynulou akci podle data definovaneho v predchozi if smycce
    if (DateTag[0]) {
      if (currentValue >= StartValue && currentValue <= EndValue && vicedenniAkce===false) {
        //console.log('visible');
          return e
      }
      if (vicedenniAkce===true) {
        if(((currentValue>=StartValue && currentValue<=EndValue) ||  (currentValueEnd>=StartValue && currentValueEnd<=EndValue)) || (StartValue>=currentValue && EndValue<=currentValueEnd) ) {
          //console.log('visible');
          return e
        }
      }
    }
  })
  Akce=filteredByCalendar
  activePageAkce=1
  setVisibility();
}

//vytvoreni pole s nazvem name do objektu checked - budou zde polozky, ktere jsou checked
function getChecked(name) {
  checked[name] = Array.from(document.querySelectorAll('input[name=' + name + ']:checked')).map(function (el) {
    return el.value;
  });
}

//zmena display pro konkretni polozky
function setVisibility() {
  let counter=0
  //console.log(checked);
  saveIntoSessionStorage(checked)
  let filtrovaneAkce=Akce.map(function (el) {
    var TypAkce = checked.TypAkce.length ? intersection(Array.from(el.classList), checked.TypAkce).length : true;
    var DobaKonani = checked.DobaKonani.length ? intersection(Array.from(el.classList), checked.DobaKonani).length : true;
    var KrouzkyPodleVeku = checked.KrouzkyPodleVeku.length ? intersection(Array.from(el.classList), checked.KrouzkyPodleVeku).length : true;
    var AktivityPodleVeku = checked.AktivityPodleVeku.length ? intersection(Array.from(el.classList), checked.AktivityPodleVeku).length : true;
    var Vylety = checked.Vylety.length ? intersection(Array.from(el.classList), checked.Vylety).length : true;
    if (TypAkce && DobaKonani && KrouzkyPodleVeku && AktivityPodleVeku && Vylety) {
      counter++
      if (counter>=limitAkce*(activePageAkce-1) && counter<limitAkce*activePageAkce){
        el.style.display = 'block';
        const imgPath=el.children[0].children[1].children[0].getAttribute('data-img')
        //console.log(imgPath);
        el.children[0].children[1].children[0].setAttribute('src',imgPath)
        //console.log('block');
        //console.log(el.classList);
        return el
      } else {
        el.style.display = 'none';
      }
    } else {
      el.style.display = 'none';
    }
  })
  // console.log('setVisibility');
  // console.log(filtrovaneAkce);
  // console.log(Akce);
  // console.log(activePageAkce);
  // console.log('konec setVisibility');
  pagination(counter);
}

function intersection(currentAkce,currentGroup) {
  return currentAkce.filter(value => currentGroup.includes(value));
}

function saveIntoSessionStorage(filters) {
  if (sessionStorage.getItem('filters')===null) {
    sessionStorage.setItem('filters',JSON.stringify(filters))
  } else {
    sessionStorage.removeItem('filters')
    sessionStorage.setItem('filters',JSON.stringify(filters))
  }
}

//nacteni filtru pokud jsou nejake ulozeny v sessionStorage
window.addEventListener("load", (event) => {  
  if (sessionStorage.getItem('DateFilter')!==null) {
    sortByCalendar()
    selectDays()
  }
  ReSetSelectionFilters()
});

function ReSetSelectionFilters() {
  if (sessionStorage.getItem('filters')!==null) {
    //nacteni obsahu do pole checked
    checked=JSON.parse(sessionStorage.getItem('filters'))
    //smycka ktera projizdi objekt
    for (const key in checked) {
      //console.log(`${key}: ${checked[key]}: ${checked[key].length}`);
      //smycka ktera projizdi kazde pole
      if (checked[key].length>0){
        checked[key].forEach((item) => {
          //console.log(item);
          //najde dany filtr
          let currentElement=document.getElementById(item)
          //console.log(currentElement);
          //aktivace filtru
          toggleCheckboxElement(currentElement)
        })
      }
    }
  }
}

//kliknuti na tlacitko - Resetovat filtry
let ResetFiltr=document.querySelector('.button__resetovani')
ResetFiltr.addEventListener('click',() => {
  ResetFilters()
  sortByCalendar()
  selectDays()
})

function ResetFilters() {
  //vymazani filtru ze session Storage
  sessionStorage.removeItem('filters')
  Akce=NadchazejiciUdalosti
  //odvybrani filtru
  Array.from(allCheckboxes).forEach((item) => {
    if(item.checked===true) {
      item.checked=false
      item.nextSibling.classList.remove('filters__checkboxItem--active')
    }
  })
  checked={
    TypAkce:[],
    DobaKonani:[],
    KrouzkyPodleVeku:[],
    AktivityPodleVeku:[],
    Vylety:[]
  }
  //nove nacteni
  activePageAkce=1
  setVisibility()
}

let ResetFiltrCalendar=document.querySelector('.button__reset--calendar')
ResetFiltrCalendar.addEventListener('click',() => {
  sessionStorage.removeItem("DateFilter")
  unselectAllDays()
  //if (sessionStorage.getItem('filters')!==null) {
    // const filters=JSON.parse(sessionStorage.getItem('filters'))
    // ResetFilters()
    // saveIntoSessionStorage(filters)
    Akce=NadchazejiciUdalosti
    activePageAkce=1
    ReSetSelectionFilters()
    setVisibility()
  //}
  // activePageAkce=1
  // ReSetSelectionFilters()
})