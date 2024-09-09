const contentLinks = document.querySelectorAll(".contents *");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const innerHamburgerMenu = document.querySelector(".inner");
let hamburgerMenuOpen = false;
let width = window.innerWidth;

if (width <= 500) innerHamburgerMenu.style.transform = "translateX(-110vw)";

window.addEventListener('resize', () => {
    width = window.innerWidth;
    if (width <= 500) innerHamburgerMenu.style.transform = "translateX(-110vw)";
});

const hamburgerToggle = () => {
    if (hamburgerMenuOpen) {
        innerHamburgerMenu.style.transform = width <= 500 ? "translateX(-110vw)" : "translateX(-60vw)";
        hamburgerMenuOpen = false;
    } else {
        innerHamburgerMenu.style.transform = "translateX(0)";
        hamburgerMenuOpen = true;
    }
}

hamburgerMenu.addEventListener("click", () => hamburgerToggle());
contentLinks.forEach((e) => e.addEventListener("click", () => hamburgerToggle()));