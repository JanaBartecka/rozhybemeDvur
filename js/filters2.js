// show/hide check at each line of filter
const allFilters=document.querySelectorAll('.filters__checkboxItem')
const allFiltersArray=Array.from(allFilters)
allFilters.forEach(filter => filter.addEventListener('click',() => {
    filter.classList.toggle('filters__checkboxItem--active')
    const filterID=filter.getAttribute('for')
    const filterInput=document.getElementById(filterID)
    filterInput.toggleAttribute("checked")
}));

// show/hide filters and change text in the button
// const btnShowFilter=document.querySelector('.button__filtrovani')
// const filterSection=document.querySelector('.filters')
// 
// btnShowFilter.addEventListener('click', () => {
    // if (btnShowFilter.textContent === "Skryt filtrovani") {
        // btnShowFilter.textContent = "Zobrazit filtrovani"
    // } else if (btnShowFilter.textContent === "Zobrazit filtrovani") {
        // btnShowFilter.textContent = "Skryt filtrovani"
    // }
    // filterSection.classList.toggle('filters__hide')
// });

// Load filter value from local storage if it exists
if (localStorage.getItem("filterValue")) {
    // filterInput.value = localStorage.getItem("filterValue");
    // console.log(localStorage.getItem("filterValue"));
  }

const akceItem=document.querySelectorAll('.button__filtrovani')
akceItem.forEach(akce => akce.addEventListener('click',() => {
    allFiltersArray.filter( (oneFilter) => {
        console.log(oneFilter);
        const filterID=oneFilter.getAttribute('for')
        const filterInput=document.getElementById(filterID)
        console.log(filterInput.getAttribute('checked'));
        if (filterInput.getAttribute('checked') !== null) {
            console.log('jsem zde');
        }
        // return filterInput.getAttribute('checked') ? console.log('jo') : console.log('ne')
    })
    // Save filter values to local storage when the filter button is clicked
    // localStorage.setItem("filterValue", filter.getAttribute('for'))
}))

