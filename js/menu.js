const hamburger=document.querySelector(".menu__hamburger");
const MenuList=document.querySelector(".menu__list");
const MenuItem=document.querySelectorAll(".menu__item");

hamburger.addEventListener("click",() => {
    let hamburgerAriaExpanded=hamburger.getAttribute('aria-expanded')
    if ( hamburgerAriaExpanded==='false') {
        hamburger.setAttribute('aria-expanded','true');
        MenuItem.forEach(item=>item.setAttribute('aria-hidden','false'))
    } else {
        MenuItem.forEach(item=>item.setAttribute('aria-hidden','true'))
        hamburger.setAttribute('aria-expanded','false');
    }
    
    hamburger.classList.toggle("menu__active");
    MenuList.classList.toggle("menu__active");
})

document.querySelectorAll(".menu__link").forEach(n=>n.addEventListener("click", () => {
    hamburger.classList.remove("menu__active");
    MenuList.classList.remove("menu__active");
}))
