let currentIndex = 0;

let imagesData = [];

let next = imagesData.length;
let prev = 0;
// Function to fetch JSON data
async function fetchJSON() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    imagesData = await response.json();
    displayImages(imagesData);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Function to display images
function displayImages(images) {
  const gallery = document.getElementById("gallery");
  images.forEach((image, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
                    <img src="${image.thumbnailURL}" alt="${image.caption}">
                `;

    //Click event listener to each card
    card.addEventListener("click", () => {
      openLightbox(index);

      if (prev === index) {
        document.getElementById("prev-btn").style.display = "none";
      } else {
        document.getElementById("prev-btn").style.display = "flex";
      }

      //     if(next === index){
      //         document.getElementById('next-btn').style.display = 'none'
      //   }else{
      //         document.getElementById('next-btn').style.display = 'display'
      //   }
    });

    currentIndex = index;

    gallery.appendChild(card);
  });
}

// Function to open the lightbox
function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  lightboxImage.src = imagesData[index].imageURL;
  lightboxCaption.textContent = imagesData[index].caption;
  lightbox.style.display = "flex";
}

// Function to close the lightbox
document.getElementById("close-btn").addEventListener("click", () => {
  document.getElementById("lightbox").style.display = "none";
  currentIndex = 0;
});

// Event listiners to handle next and prev buttons
function nextprev() {
  document.getElementById("prev-btn").addEventListener("click", () => {
    currentIndex -= 1;
    document.getElementById("next-btn").style.display = "flex";

    // (currentIndex - 1 + imagesData.length) % imagesData.length;
    if (currentIndex < 0) {
      document.getElementById("prev-btn").style.display = "none";
    } else {
      document.getElementById("prev-btn").style.display = "flex";
    }
    updateLightbox();
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    currentIndex += 1;
    // (currentIndex + 1) % imagesData.length;
    document.getElementById("prev-btn").style.display = "flex";
    if (currentIndex === imagesData.length) {
      document.getElementById("next-btn").style.display = "none";
    } else {
      document.getElementById("next-btn").style.display = "flex";
    }
    updateLightbox();
  });
}

// Function to update lightbox content
function updateLightbox() {
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  lightboxImage.src = imagesData[currentIndex].imageURL;
  lightboxCaption.textContent = imagesData[currentIndex].caption;
}

nextprev();

fetchJSON();
