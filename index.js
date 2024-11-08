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
    });

    // currentIndex = index;

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
 
});

// Event listiners to handle next and prev buttons
function nextprev() {

    document.getElementById("prev-btn").addEventListener("click", () => {
    
    currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
   
    updateLightbox();
    updateButtonStates();
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    currentIndex =
    (currentIndex + 1) % imagesData.length;

    updateLightbox();
    updateButtonStates();
    document.getElementById("prev-btn").style.display = "flex";
  });
}


// Function to update button states
function updateButtonStates() {
  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");

  // Disable previous button if at the first image
  if (currentIndex === 0) {
      prevButton.disabled = true; 
      prevButton.style.display = "none"; 
  } else {
      prevButton.disabled = false; 
      prevButton.style.display = "flex"; 
  }

  // Disable next button if at the last image
  if (currentIndex === imagesData.length - 1) {
      nextButton.disabled = true; 
      nextButton.style.display = "none"; 
  } else {
      nextButton.disabled = false; 
      nextButton.style.display = "flex"; 
  }
}

updateButtonStates()

// Function to update lightbox content
function updateLightbox() {
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  lightboxImage.src = imagesData[currentIndex].imageURL;
  lightboxCaption.textContent = imagesData[currentIndex].caption;
}




// localStorage.setItem("index",currentIndex);
//  let local =  localStorage.getItem("index")

//   if(local === "1")
//   {
//     document.getElementById("prev-btn").display = "none"

//   }


// function controlnav(nav){
//   localStorage.setItem("index",nav);
//     //  if(local === "1")
//     //    {
//     //     document.getElementById("prev-btn").display = "none"
    
//     //  }
  
// }


nextprev();

fetchJSON();

(function(){
  
document.addEventListener('keydown',event =>{
  if(event.key === "Escape"){
    document.getElementById("lightbox").style.display = "none"
  }
})
})()
