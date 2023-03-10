// show/hide check at each line of filter
const allFilters=document.querySelectorAll('.filters__checkboxItem')
allFilters.forEach(filter => filter.addEventListener('click',() => {
    filter.classList.toggle('filters__checkboxItem--active')
    console.log(filter.getAttribute('for'));
    localStorage.setItem("filterValue", filter.getAttribute('for'))
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

// Load filter value from local storage if it exists
if (localStorage.getItem("filterValue")) {
    // filterInput.value = localStorage.getItem("filterValue");
    console.log(localStorage.getItem("filterValue"));
  }

