const character = {
  name: "Snortleblat",
  class: "Swamp Beat Diplomat",
  level: 5,
  health: 100,
  image: "./img/snortleblat.avif",
  attacked() {
    if (this.health >= 20) {
      this.level -= 1;
      this.health -= 20;
    } else {
      alert("Character Died");
    }
  },
  levelUp() {
    this.level += 1;
    this.health += 20;
  },
};


const img = document.querySelector(".image");
img.src = character.image;
const name = document.querySelector(".name");
name.textContent = character.name;
const characterClass = document.querySelector("#class");
characterClass.textContent = character.class;
const characterLevel = document.querySelector("#level");
characterLevel.textContent = character.level;
const characterHealth = document.querySelector("#health");
characterHealth.textContent = character.health;

// buttons functionality
const attacked = document.querySelector("#attacked");
const levelUp = document.querySelector("#levelup");

attacked.addEventListener("click", () => {
  character.attacked();
  characterLevel.textContent = character.level;
  characterHealth.textContent = character.health;
});

levelUp.addEventListener("click", () => {
  character.levelUp();
  characterLevel.textContent = character.level;
  characterHealth.textContent = character.health;
})