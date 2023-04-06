let allFilters = Array.from(document.querySelectorAll('.filters__checkboxItem'));
let allAkce = Array.from(document.querySelectorAll('.akce__item'));
let Akce

const url = window.location.href;
const SplittedUrl=url.split('/')
const currentPage=SplittedUrl[SplittedUrl.length-2]
let UplynuleUdalosti=[];
let NadchazejiciUdalosti=[];

if (currentPage==='akce') {
    const GetCurrentDate=new Date()
    const CurrentRok=GetCurrentDate.getFullYear()
    const CurrentMesic=GetCurrentDate.getMonth()
    const CurrentDen=GetCurrentDate.getDate()
    const substring= /^akce_datum_/;
    
    const NadchazejiciAkce=allAkce.filter(e => {
      const ClassList=Array.from(e.classList)
      e.style.display = 'none';
      const DateTag=ClassList.filter(string => substring.test(string))
      if (DateTag[0]) {
        if (parseInt(DateTag[0].slice(11,15))>=CurrentRok) {
          if (parseInt(DateTag[0].slice(15,17))-1>CurrentMesic) {
            e.style.display = 'block';
            return e
          } else if (parseInt(DateTag[0].slice(15,17))-1===CurrentMesic) {
            if (parseInt(DateTag[0].slice(17,19))>=CurrentDen) {
              e.style.display = 'block';
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

let allCheckboxes = document.querySelectorAll('.checkbox');
let checked = {};

getChecked('TypAkce');
getChecked('DobaKonani');
getChecked('KrouzkyPodleVeku');
getChecked('AktivityPodleVeku');
getChecked('Vylety');

Array.prototype.forEach.call(allCheckboxes, function (el) {
  el.addEventListener('change', toggleCheckbox);
});

function toggleCheckbox(e) {
  getChecked(e.target.name);
  const LabelElement=e.target.labels[0]
  LabelElement.classList.toggle('filters__checkboxItem--active')
  if (e.target.id==='UplynuleUdalosti') {
      if (e.target.checked===true) {
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
  } else {
    setVisibility();
  }
}

function getChecked(name) {
  checked[name] = Array.from(document.querySelectorAll('input[name=' + name + ']:checked')).map(function (el) {
    return el.value;
  });
}

function setVisibility() {
  Akce.map(function (el) {
    var TypAkce = checked.TypAkce.length ? intersection(Array.from(el.classList), checked.TypAkce).length : true;
    var DobaKonani = checked.DobaKonani.length ? intersection(Array.from(el.classList), checked.DobaKonani).length : true;
    var KrouzkyPodleVeku = checked.KrouzkyPodleVeku.length ? intersection(Array.from(el.classList), checked.KrouzkyPodleVeku).length : true;
    var AktivityPodleVeku = checked.AktivityPodleVeku.length ? intersection(Array.from(el.classList), checked.AktivityPodleVeku).length : true;
    var Vylety = checked.Vylety.length ? intersection(Array.from(el.classList), checked.Vylety).length : true;
    if (TypAkce && DobaKonani && KrouzkyPodleVeku && AktivityPodleVeku && Vylety) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
}

function intersection(currentAkce,currentGroup) {
  return currentAkce.filter(value => currentGroup.includes(value));
}