const TodayDate=new Date()
//const TodayDate=new Date(2023,11,3)
const Mesice=['Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec']
const pocetDnuVMesici=[31,28,31,30,31,30,31,31,30,31,30,31]

let CalendarMonth=document.querySelector('#calendar__mesic--nyni')
let CalendarMonthPrev=document.querySelector('#calendar__mesic--predchozi')
let CalendarMonthNext=document.querySelector('#calendar__mesic--dalsi')
let CalendarYear=document.querySelector('.calendar__year')
let ClickNumber=null
let ClickedDate=[]

//sessionStorage.removeItem('DateFilter')

//inicializace
CalendarMonth.textContent=Mesice[TodayDate.getMonth()]
CalendarYear.textContent=TodayDate.getFullYear()
refreshCalendar(TodayDate.getFullYear(), TodayDate.getMonth())

//zmena mesice - dalsi
CalendarMonthNext.addEventListener('click',()=> {
    let currentMonth=Mesice.indexOf(CalendarMonth.textContent)
    if (currentMonth===11) {
        CalendarMonth.textContent=Mesice[0]
        CalendarYear.textContent=parseInt(CalendarYear.textContent)+1
        currentMonth=0
    } else {
        CalendarMonth.textContent=Mesice[currentMonth+1]
        currentMonth++
    }
    refreshCalendar(CalendarYear.textContent,currentMonth)
    if (ClickNumber===2) {selectDays()}
    
})

//zmena mesice - predchozi
CalendarMonthPrev.addEventListener('click',()=> {
    let currentMonth=Mesice.indexOf(CalendarMonth.textContent)
    if (currentMonth===0) {
        CalendarMonth.textContent=Mesice[11]
        CalendarYear.textContent=parseInt(CalendarYear.textContent)-1
        currentMonth=11
    } else {
        CalendarMonth.textContent=Mesice[currentMonth-1]
        currentMonth--
    }
    refreshCalendar(CalendarYear.textContent,currentMonth)
    if (ClickNumber===2) {selectDays()}
})

function refreshCalendar(year, month) {
    // console.log(year + ' ' + month);
    //zjisteni prvniho dne v mesici
    const lastDay=new Date(year, month + 1, 0);
    const lastDayPrevMonth=new Date(year, month, 0);
    const lastDayPrevMonthDate=lastDayPrevMonth.getDate()
    const lastDayDate=lastDay.getDate()
    const firstDayWeekday=new Date(year, month, 1);
    const firstDay=firstDayWeekday.getDay()

    // console.log(lastDay);
    // console.log(lastDayPrevMonth);
    // console.log(lastDayPrevMonthDate);
    // console.log(lastDayDate);
    // console.log(firstDayWeekday);
    // console.log(firstDay);

    let CalendarDiv=document.querySelector('.calendar__days')
    CalendarDiv.innerHTML=''

    let dayArray=[]
    //definovani poctu a cisel dnu predchoziho mesice prvniho tydne
    if (firstDay===0) {
        for (let i=6;i>=0;i--) {
            dayArray.push(lastDayPrevMonthDate-i)
        }
    } else if (firstDay>=2) {
        for (let i=firstDay;i>=2;i--) {
            dayArray.push(lastDayPrevMonthDate-i+2)
        }
    }

    //dodefinovani matice dnu aktualniho mesice
    let firstIndex=dayArray.length-1
    let lastIndex=dayArray.length-1+lastDayDate+1
    for (let i=1;i<=lastDayDate;i++) {
        dayArray.push(i)
    }
    // console.log(dayArray.length);

    //dodefinovani dnu nasledujiciho mesice posledniho tydne
    let j=1
    while (dayArray.length % 7 !==0) {
        dayArray.push(j)
        // console.log(j);
        j++;
    }

    // console.log(dayArray);

    //graficke vytvoreni kalendare
    for (let week = 1; week <= dayArray.length/7; week++) {
        for (let day = 0; day <= 6; day++) {
            let NewSpan=document.createElement('button')
            NewSpan.classList.add('calendar__day')
            NewSpan.setAttribute('data-month',parseInt(Mesice.indexOf(CalendarMonth.textContent))+1)
            NewSpan.setAttribute('data-Year',CalendarYear.textContent)
            NewSpan.textContent=parseInt(dayArray[(week-1)*7+day])
            if (NewSpan.textContent==TodayDate.getDate() && month==TodayDate.getMonth() && year==TodayDate.getFullYear() && (week-1)*7 + day >firstIndex && (week-1)*7 + day <lastIndex) {
                NewSpan.classList.add('calendar__day--today')
            }
            if (day>=5) {
                NewSpan.classList.add('calendar__day--weekend')
            }
            if ((week-1)*7 + day <=firstIndex)  {
                NewSpan.classList.add('calendar__day--noMonth')
                NewSpan.setAttribute('data-month',checkMonth(parseInt(Mesice.indexOf(CalendarMonth.textContent))))
                NewSpan.setAttribute('data-Year',checkYear(parseInt(Mesice.indexOf(CalendarMonth.textContent))))
            } else if ((week-1)*7 + day >=lastIndex) {
                NewSpan.classList.add('calendar__day--noMonth')
                NewSpan.setAttribute('data-month',checkMonth(parseInt(Mesice.indexOf(CalendarMonth.textContent))+2))
                NewSpan.setAttribute('data-Year',checkYear(parseInt(Mesice.indexOf(CalendarMonth.textContent))+2))
            }
            CalendarDiv.appendChild(NewSpan)
        }
    }

    //vytahnuti presneho data pri kliknuti
    let CalendarDays=document.querySelectorAll('.calendar__day')
    CalendarDays.forEach((oneDay) => {
        oneDay.addEventListener('click',function(event) {
            //console.log(event.target.textContent + ' ' + year + ' ' + month);
            if (ClickNumber!==1) {
                unselectAllDays()
                sessionStorage.removeItem('DateFilter')
                event.target.classList.add('calendar__day--selected')
                ClickNumber=1
                ClickedDate=[parseInt(event.target.textContent),event.target.getAttribute('data-month'), event.target.getAttribute('data-year')]
                addDateFilter(ClickedDate,'StartDate')
                //sessionStorage.setItem("StartDate", JSON.stringify(ClickedDate));
            } else if (ClickNumber===1) {
                ClickNumber=2
                addDateFilter([parseInt(event.target.textContent),event.target.getAttribute('data-month'), event.target.getAttribute('data-year')],'EndDate')
                selectDays()
                sortByCalendar()
                //sessionStorage.setItem("EndDate", JSON.stringify([parseInt(event.target.textContent),month, year]));
                
            }
        })
    })
}

function checkMonth (monthNumber) {
    if (monthNumber===13) {
        return 1
    } else if (monthNumber===0) {
        return 12
    }
    return monthNumber
}

const addDateFilter = function (date, Datetype) {
    let currentContent=JSON.parse(sessionStorage.getItem('DateFilter'))
    let flip=false
    //if (currentContent !==null) {
        // console.log(currentContent);
        // console.log(date);
        // console.log(Datetype);
        
        if (currentContent !==null) {
            currentContent.push({
                type: Datetype,
                day: date[0],
                month:date[1],
                year:date[2],
            })
            console.log(currentContent);
        } else {
            // console.log('jsem tu');
            currentContent=[{
                type: Datetype,
                day: date[0],
                month:date[1],
                year:date[2],
            }]
            console.log(currentContent);

            // if (currentContent[0].year <= currentContent[1].year) {
            //     if (currentContent[0].month < currentContent[1].month) {

            //     } else if (currentContent[0].month = currentContent[1].month)  {
            //         if (currentContent[0].day > currentContent[1].day) {
            //             flip=true
            //         }
            //     } else {
            //         flip=true
            //     }

            // } else {
            //     flip=true
            // }

            // if (flip) {
            //     currentContent.splice(1,1,currentContent[1])
            // }
        }
        sessionStorage.removeItem("DateFilter")
        sessionStorage.setItem("DateFilter", JSON.stringify(currentContent))
        // console.log(currentContent);
    //}

}

function checkYear (monthNumber) {
    if (monthNumber===13) {
        return parseInt(CalendarYear.textContent)+1
    } else if (monthNumber===0) {
        return parseInt(CalendarYear.textContent)-1
    }
    return parseInt(CalendarYear.textContent)
}

//function which graphically assign selected days
function selectDays() {
    let CalendarDays=document.querySelectorAll('.calendar__day')
    const DataFilters=JSON.parse(sessionStorage.getItem('DateFilter'))
    //console.log(DataFilters);

    CalendarDays.forEach((oneDay)=> {
        //const EndDate=getsavedDate("EndDate")
        //const StartDate=getsavedDate('StartDate')
        //console.log(StartDate);
        //console.log(EndDate);
        const StartValue=cisloDne(DataFilters[0].month,DataFilters[0].day)
        //console.log(StartValue);
        const EndValue=cisloDne(DataFilters[1].month,DataFilters[1].day)
        //console.log(EndValue);
        let currentValue=cisloDne(oneDay.getAttribute('data-month'),parseInt(oneDay.textContent))
        //console.log(currentValue);
        if (DataFilters[0].year < DataFilters[1].year) {
            if(currentValue>=StartValue && oneDay.getAttribute('data-year')==DataFilters[0].year){
                oneDay.classList.add('calendar__day--selected')
            } else if (currentValue<=EndValue && oneDay.getAttribute('data-year')==DataFilters[1].year) {
                oneDay.classList.add('calendar__day--selected')
            }
        } else {
            if(currentValue>=StartValue && currentValue<=EndValue) {
                oneDay.classList.add('calendar__day--selected')
            } 
        }
    })
}

let cisloDne=function(arrayIndex,DenVMesici) {
    let kumulaceDnu=0
    for (let index = 0; index < arrayIndex-1; index++) {
        kumulaceDnu=kumulaceDnu+pocetDnuVMesici[index]
    }
    return kumulaceDnu + DenVMesici
}

let getsavedDate=function (name) {
    let date=sessionStorage.getItem(name)
    //console.log(date);
    if(date !== null){
        return JSON.parse(date)
    } else {
        return []
    }
}

function unselectAllDays() {
    let CalendarDays=document.querySelectorAll('.calendar__day')
    CalendarDays.forEach((oneDay)=> {
        oneDay.classList.remove('calendar__day--selected')
    })
}

//jine vlastnosti vikendu
