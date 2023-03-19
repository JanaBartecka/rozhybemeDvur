// show/hide check at each line of filter
const allFilters=document.querySelectorAll('.filters__checkboxItem')
const allFiltersArray=Array.from(allFilters)
allFilters.forEach(filter => filter.addEventListener('click',() => {
    filter.classList.toggle('filters__checkboxItem--active')
    // const filterID=filter.getAttribute('for')
    // const filterInput=document.getElementById(filterID)
    // filterInput.toggleAttribute("checked")
}));

// show/hide filters and change text in the button
const btnShowFilter=document.querySelector('.button__filtrovani')
const filterSection=document.querySelector('.filters')

btnShowFilter.addEventListener('click', () => {
    if (btnShowFilter.textContent === "Skryt filtrovani") {
        btnShowFilter.textContent = "Zobrazit filtrovani"
    } else if (btnShowFilter.textContent === "Zobrazit filtrovani") {
        btnShowFilter.textContent = "Skryt filtrovani"
    }
    filterSection.classList.toggle('filters__hide')
});

const mediaQuery = window.matchMedia("(max-width: 42rem)");

function handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
        if (!filterSection.classList.contains('filters__hide')) {
            filterSection.classList.toggle('filters__hide')
        }
    } else {
        if (filterSection.classList.contains('filters__hide')) {
            filterSection.classList.toggle('filters__hide')
        }
    }
  }

mediaQuery.addListener(handleMediaQueryChange);
handleMediaQueryChange(mediaQuery);

  


// Load filter value from local storage if it exists
// if (localStorage.getItem("savedFilters")) {
    // //filterInput.value = localStorage.getItem("filterValue");
    // console.log(localStorage.getItem("savedFilters"));
//   } else {
    // console.log('nic tady neni');
//   }
// 
// const akceItem=document.querySelectorAll('.button__filtrovani')
// const savedFilters=[]
// let i=0
// 
// akceItem.forEach(akce => akce.addEventListener('click',() => {
    // allFiltersArray.filter( (oneFilter) => {
        // console.log(oneFilter);
        // const filterID=oneFilter.getAttribute('for')
        // console.log(filterID);
        // const filterInput=document.querySelector('[for=' + filterID + ']')
        // console.log(filterInput);
        // if (filterInput.classList.contains('filters__checkboxItem--active')) {
            // console.log('obsahuji')
            // savedFilters.push(filterID)
        // } else {
            // console.log('neobsahuji')
        // }
    // })
    // //Save filter values to local storage when the filter button is clicked
    // localStorage.setItem("savedFilters", JSON.stringify(savedFilters))
// }))
// 
// localStorage.getItem("savedFilters")

