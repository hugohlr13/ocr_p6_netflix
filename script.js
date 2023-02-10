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

// Trailer Best Movie

document.querySelector('.button-play').addEventListener('click', function() {
  var modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.background = 'rgba(0, 0, 0, 0.8)';
  modal.style.zIndex = '999';
  modal.innerHTML = '<iframe width="1000" height="600" src="https://www.youtube.com/embed/KgELjaFRg4w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></iframe>';
  document.body.appendChild(modal);

  modal.addEventListener('click', function() {
    modal.style.display = 'none';
  });
});


// API Most Rated Films - Categories

const apiUrls = [
  "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=9",
  "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=9",
  "http://localhost:8000/api/v1/titles/?genre=thriller&sort_by=-imdb_score&page_size=9",
  "http://localhost:8000/api/v1/titles/?genre=history&sort_by=-imdb_score&page_size=9"
];

const categories = [
  "most-rated-films",
  "category-1",
  "category-2",
  "category-3"
];

const fetchData = async () => {
  for (let i = 0; i < apiUrls.length; i++) {
    const slider = document.querySelector(`.slider.${categories[i]}`);
    const response = await fetch(apiUrls[i])
    const data = await response.json()
    console.log(categories[i], data);

    data.results.forEach(result => {
      let image = document.createElement('img');
      image.src = result.image_url;
      image.addEventListener("click", function() {
        document.querySelector("#modalImage").src = result.image_url;
        document.querySelector("#myModal").style.display = "block";
        document.querySelector("#modalTitle").innerHTML = result.title;
        document.querySelector("#modalGenres").innerHTML = result.genres.join(", ");
        document.querySelector("#modalYear").innerHTML = result.year;
        document.querySelector("#modalVotes").innerHTML = result.votes;
        document.querySelector("#modalImdbScore").innerHTML = result.imdb_score;
        document.querySelector("#modalDirectors").innerHTML = result.directors.join(", ");
        document.querySelector("#modalActors").innerHTML = result.actors.join(", ");
      });
      slider.appendChild(image);
    });
  }

  document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
}

fetchData();

// Femerture de la modale au clic sur la croix
document.querySelector(".close").addEventListener("click", function() {
  document.querySelector("#myModal").style.display = "none";
});

// Fermeture de la modale au clic en dehors de la modale
window.addEventListener("click", function(event) {
  if (event.target == document.querySelector("#myModal")) {
    document.querySelector("#myModal").style.display = "none";
  }
});


