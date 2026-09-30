// TOGGLE STYLE COLOR SWITCHER
const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

//HIDE STYLE SWITCHER ON SCROLL
window.addEventListener("scroll" , () =>{
    if(document.querySelector(".style-switcher").classList.contains("open"))
    {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

//HIDE STYLE SWITCHER ON OUTSIDE CLICK
document.body.addEventListener("click", (event) => {
    const styleSwitcher = document.querySelector(".style-switcher");
    
    // Check if the clicked element is not the style switcher itself
    if (event.target !== styleSwitcher && !styleSwitcher.contains(event.target)) {
        // Check if the style switcher is currently open
        if (styleSwitcher.classList.contains("open")) {
            styleSwitcher.classList.remove("open");
        }
    }
});


// THEME COLORS
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color)
{
    alternateStyles.forEach((style)  => {
        if(color === style.getAttribute("title"))
        {
            style.removeAttribute("disabled");
        }else
        {
            style.setAttribute("disabled", "true"); 
        }
    })
}

// Dark mode or Light Mode
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click",() => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
})
window.addEventListener("load", () =>{
    if(document.body.classList.contains("dark"))
    {
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else{
        dayNight.querySelector("i").classList.add("fa-moon");
    }
})
