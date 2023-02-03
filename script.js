document.addEventListener("click", e => {
    let handle
    if (e.target.matches(".handle")) {
        handle = e.target
    } else {
        handle = e.target.closest(".handle")
    } 
    if (handle != null) onHandleClick(handle)
})

function onHandleClick(handle) {
    const progressBar = handle.closest(".section").querySelector(".progress-bar")
    const slider = handle.closest(".container").querySelector(".slider")
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"))
    const progressBarItemCount = progressBar.children.length
    if (handle.classList.contains("left-handle")) {
        if (sliderIndex - 1 < 0) {
            slider.style.setProperty("--slider-index", progressBarItemCount - 1)
            progressBar.children[sliderIndex].classList.remove("active")
            progressBar.children[progressBarItemCount - 1].classList.add("active")
        } else {
            slider.style.setProperty("--slider-index", sliderIndex - 1)
            progressBar.children[sliderIndex].classList.remove("active")
            progressBar.children[sliderIndex - 1].classList.add("active")
        }
    }
    if (handle.classList.contains("right-handle")) {
        if (sliderIndex + 1 >= progressBarItemCount) {
            slider.style.setProperty("--slider-index", 0)
            progressBar.children[sliderIndex].classList.remove("active")
            progressBar.children[0].classList.add("active")
        } else {
            slider.style.setProperty("--slider-index", sliderIndex + 1)
            progressBar.children[sliderIndex].classList.remove("active")
            progressBar.children[sliderIndex + 1].classList.add("active")
        }
    }
}

const throttleProgressBar = throttle(() => {
    document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
}, 250)
window.addEventListener("resize", throttleProgressBar)

document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)

function calculateProgressBar(progressBar) {
    progressBar.innerHTML = ""
    const slider = progressBar.closest(".section").querySelector(".slider")
    const itemCount = slider.children.length
    const itemsPerScreen = parseInt(getComputedStyle(slider).getPropertyValue("--items-per-screen"))
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"))
    const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)
    for (let i = 0; i < progressBarItemCount; i++) {
        const barItem = document.createElement("div")
        barItem.classList.add("progress-item")
        if (i === sliderIndex) {
            barItem.classList.add("active")
        }
        progressBar.append(barItem) 
    }
}

function throttle(cb, delay = 1000) {
    let shouldWait = false
    let waitingArgs
    const timeoutFunc = () => {
      if (waitingArgs == null) {
        shouldWait = false
      } else {
        cb(...waitingArgs)
        waitingArgs = null
        setTimeout(timeoutFunc, delay)
      }
    }
  
    return (...args) => {
      if (shouldWait) {
        waitingArgs = args
        return
      }
  
      cb(...args)
      shouldWait = true
      setTimeout(timeoutFunc, delay)
    }
  }


// Récupération des éléments nécessaires
const nav = document.querySelector('nav');

// Ajout de la classe "transparent" au nav lorsque la page est chargée
document.addEventListener('DOMContentLoaded', () => {
  nav.classList.add('transparent');
});

// Écoute de l'événement de scroll sur la page
window.addEventListener('scroll', () => {
  // Suppression de la classe "transparent" au nav
  nav.classList.remove('transparent');

  // Vérification de la position de défilement de la page
  if (window.scrollY === 0) {
    // Ajout de la classe "transparent" au nav
    nav.classList.add('transparent');
  }
});


// Modal

const images = document.querySelectorAll('.slider img');
const modal = document.querySelector('.modal');
const modalInfo = document.querySelector('.modal-info');

images.forEach(img => {
    img.addEventListener('click', e => {
        modal.style.display = "block";
    });
});

// close modal inside buton
const closeBtn = document.querySelector('.modal button');

closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});


// API Movies info http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=6

fetch('http://localhost:8000/api/v1/titles/1508669')
  .then(response => response.json())
  .then(data => {
    const image_url = data.image_url;
    const imgs = document.querySelectorAll('.slider img');
    console.log(data)
    imgs.forEach(img => {
      img.src = image_url;
    });
  });
