const allFilters=document.querySelectorAll('.filters__checkboxItem')
allFilters.forEach(filter => filter.addEventListener('click',() => {
    console.log(filter);
    filter.classList.toggle('filters__checkboxItem--active')

}));

// const checkboxes = document.querySelectorAll('.checkbox');
// for (let i = 0; i < checkboxes.length; i++) {
//   checkboxes[i].checked = !checkboxes[i].checked;
// }

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