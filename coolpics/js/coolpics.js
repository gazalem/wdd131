const currentDate = new Date();
const yearPart = currentDate.getFullYear();
const currentYear = document.querySelector("#currentYear");
currentYear.textContent = yearPart;

// Get menu button and navbar elements
const menuButton = document.querySelector("#menuButton");
const navbar = document.querySelector("nav");
handleResize();
// Toggle the navbar visibility when the menu button is clicked
menuButton.addEventListener("click", () => { navbar.classList.toggle("hide"); });
// Get browser width
window.addEventListener("resize", handleResize);
// If the browser width is less than 700px, hide the navbar
function handleResize() {
  const browserWidth = window.innerWidth;
  if (browserWidth >= 700) {
    menuButton.classList.add("hide");
    navbar.classList.remove("hide");
  } else {
    menuButton.classList.remove("hide");
    navbar.classList.add("hide");
  }
}

const modal = document.createElement("dialog");
const gallery = document.querySelector(".gallery");


gallery.addEventListener("click", (e) => {
  document.body.appendChild(modal);
  if (e.target.tagName === "IMG") {
    const imgSrc = e.target.getAttribute("src");
    const imgAlt = e.target.getAttribute("alt");
    showModal();
    modal.querySelector("#modal-image").setAttribute("src", './img/norris-full.jpeg');
    modal.querySelector("img").setAttribute("alt", imgAlt);
    modal.showModal();
  }
});


function showModal() {
  modal.innerHTML = `<img id="modal-image"><button class="close-viewer">❌</button>`;
}


modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.classList.contains("close-viewer")) {
    modal.close();
    modal.remove();
  }
});