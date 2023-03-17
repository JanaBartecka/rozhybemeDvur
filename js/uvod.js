const uvodButton=document.querySelectorAll('.uvod__button')

for(let i=0; i<uvodButton.length; i++ ) {
    uvodButton[i].addEventListener('click', (event) => {
        const thisButton=event.target.id
        const thisTextToHide=document.querySelector('.' + thisButton)
        thisTextToHide.classList.toggle("uvod__vice--hide")
        console.log(event.target.innerHTML);
        if (event.target.innerHTML!=="Zavřít") {
            event.target.innerHTML="Zavřít"
        } else {
            if (event.target.id==="uvod__button-1") {
                event.target.innerHTML="Více o nás"
            } else if (event.target.id==="uvod__button-2") {
                event.target.innerHTML="Jak pomoci?"
            }
        }
    })
}