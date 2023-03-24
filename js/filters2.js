// show/hide check at each line of filter
const allFilters=document.querySelectorAll('.filters__checkboxItem')
const allFiltersArray=Array.from(allFilters)
allFilters.forEach(filter => filter.addEventListener('click',() => {
    filter.classList.toggle('filters__checkboxItem--active')
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
            btnShowFilter.textContent = "Zobrazit filtrovani"
        }
    } else {
        if (filterSection.classList.contains('filters__hide')) {
            filterSection.classList.toggle('filters__hide')
            btnShowFilter.textContent = "Skryt filtrovani"
        }
    }
  }

mediaQuery.addListener(handleMediaQueryChange);
handleMediaQueryChange(mediaQuery);

