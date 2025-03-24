// const menuIcon = document.getElementById("menuIcon");
// const navMenu = document.getElementById("navMenu");

// menuIcon.addEventListener("click", () => {
//   // Toggle display on click
//   if (navMenu.style.display === "flex") {
//     navMenu.style.display = "none";
//   } else {
//     navMenu.style.display = "flex";
//   }
// });


document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menuIcon");
    const navMenu = document.getElementById("navMenu");
  
    menuIcon.addEventListener("click", () => {
      navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
    });
  });
  