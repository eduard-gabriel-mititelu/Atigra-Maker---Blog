const menuBT = document.getElementById("menuBT");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("closeMenu");
const clsMenuD = document.querySelector(".clsMenuD");

closeMenu.addEventListener('click', () => {
    menu.style.display = "none";
    closeMenu.style.display = "none";
    clsMenuD.style.display = "none";
    console.log("Close menu button clicked");
});

menuBT.addEventListener('click', () => {
    menu.style.display = "block";
    closeMenu.style.display = "flex";
    clsMenuD.style.display = "block";
    console.log("Menu button clicked");
});