document.addEventListener('DOMContentLoaded', () => {
  class SimpleGallery {
    constructor(images, descriptions, containerId) {
      this.images = images;
      this.descriptions = descriptions;
      this.currentIndex = 0;
      this.containerId = containerId;
      this.initGallery();
    }

    initGallery() {
      const container = document.getElementById(this.containerId);
      container.innerHTML = `
      <div class="gallery">
        <div class="galleryImgContainer">
            <button class="prevBtn">&#10094;</button>
            <img class="galleryMedia" src="${this.images[0]}" alt="Gallery Image">
            <div class="imageDescription">${this.descriptions[0]}</div>
            <button class="nextBtn">&#10095;</button>
        </div>
    </div>
    `;

      const prevBtn = container.querySelector('.prevBtn');
      const nextBtn = container.querySelector('.nextBtn');
      prevBtn.addEventListener('click', () => this.prevImage());
      nextBtn.addEventListener('click', () => this.nextImage());
    }

    showImage(index) {
      const container = document.getElementById(this.containerId);
      const mediaContainer = container.querySelector('.galleryImgContainer');
      const itemURL = this.images[index];
      const description = this.descriptions[index];
      const isVideo = itemURL.endsWith('.mp4');
    
      const existingMedia = mediaContainer.querySelector('.galleryImg, .galleryMedia');
      if (existingMedia) {
        existingMedia.remove();
      }
    
      if (isVideo) {
        const video = document.createElement('video');
        video.setAttribute('src', itemURL);
        video.setAttribute('controls', '');
        video.classList.add('galleryMedia'); 
        mediaContainer.insertBefore(video, mediaContainer.querySelector('.imageDescription'));
      } else {
        const img = document.createElement('img');
        img.setAttribute('src', itemURL);
        img.classList.add('galleryMedia'); 
        mediaContainer.insertBefore(img, mediaContainer.querySelector('.imageDescription'));
      }
    
      // Update description
      container.querySelector('.imageDescription').innerText = description;
    }

    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.showImage(this.currentIndex);
    }

    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.showImage(this.currentIndex);
    }
  }

  const gallery1 = new SimpleGallery(
    ['images/hunt/gameplay.jpg', 'images/hunt/queue.mp4', 'images/hunt/targeting.mp4', 'images/hunt/multiplayer.mp4', 'images/hunt/translucency.mp4'	],
    ['Gameplay screenshot. Two characters approaching the city gate, already spotted by a guard.', 
    'The game features a queue system that allows players to queue up actions when playing alone, to allow for more complex strategies.', 
    'Some example use of abilities in the debugging level.',
    'A little demonstration of multiplayer working and correctly replicating the game.',
    'Objects become translucent when they are between the player and camera.'],
    'gallery1'
  );

  const gallery2 = new SimpleGallery(
    ['images/gygo/cover.png', 'images/gygo/programming.png', 'images/gygo/dialogues.png', 'images/gygo/gamedesign.png', 'images/gygo/pdf.png'],
    ['The main screen of the game. Here the player has to complete all rooms, for a total of seven tasks.', 
    'The programming task. Inspired by visual scripting like Blueprints, the player has to get the character on the right to move.', 
    'The assessment also features a dialogue system, to immerse the player into the setting.', 
    'The game design task. The player has to find applicable player types for a given game.', 
    'A PDF is generated at the end of the assessment. It contains several metrics that can be used to judge the player\'s performance.'],
    'gallery2'
  );

  const gallery3 = new SimpleGallery(
    ['images/papyrus/graph.png', 'images/papyrus/rpg.png', 'images/papyrus/lotsofnpcs.png'],
    ['Schematic verview of the Spellbook skill system','Elements of the RPG systems, including UI, items, item upgrades, passive traits and enemy AI', 
    'A large number of aggressive NPCs. The server is able to handle several thousands of them at 20hz'],
    'gallery3'
  );
  const gallery4 = new SimpleGallery(
    ['images/qxl/cover.png', 'images/qxl/example.png', 'images/qxl/dialogue.png', 'images/qxl/minimap.png'],
    ['One of the main cities. They act as a hub where the player can interact with NPCs, buy and sell items and complete quests.', 
    'An example of a simple QXL quest definition, written in YAML', 
    'The dialogue system. Minecraft only has a single chat channel and no ability to delete messages, so a few tricks were neccessary to preserve chat history', 
    'The minimap, available without requiring client-side mods.'],
    'gallery4'
  );
});


function getRandomColor() {
  const getRandomValue = () => Math.floor(Math.random() * 256);
  const getContrastYIQ = (r, g, b) => {
    const yiq = ((r*299)+(g*587)+(b*114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  };
  const r = getRandomValue();
  const g = getRandomValue();
  const b = getRandomValue();
  const backgroundColor = `rgb(${r}, ${g}, ${b})`;
  const textColor = getContrastYIQ(r, g, b);

  return { backgroundColor, textColor };
}

document.addEventListener('DOMContentLoaded', function() {
  const techLabels = document.querySelectorAll('.technology-label');
  techLabels.forEach(label => {
    const colors = getRandomColor();
    label.style.backgroundColor = colors.backgroundColor;
    label.style.color = colors.textColor;
  });
    if (window.location.hash) {
      const projectName = window.location.hash.substring(1);
      togglePopup(projectName);
  }
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.addEventListener('mousedown', (e) => {
      if (e.button === 1) { // Middle-click
        const popup = project.querySelector('.popup');
        const projectName = popup.getAttribute('data-project');
        const newTabUrl = `${window.location.origin}${window.location.pathname}#${projectName}`;
        window.open(newTabUrl, '_blank');
      }
    });
  });
});
 
const friendlyNames = {
  'hunt': 'Mythical Hunt',
  'gygo': 'Get your Game on',
  'qxl': 'QuestsXL',
  'papyrus': 'Papyrus',
  'obession': 'Obsession',
};
function togglePopup(projectName, event) {
  const popup = document.querySelector('.popup[data-project="' + projectName + '"]');
  const popupContent = popup.querySelector('.popup-content');
  const closePopup = function(event) {
      if (!popup.contains(event.target)) {
          popup.style.display = 'none';
          history.pushState(null, '', window.location.pathname); // Reset URL
          document.removeEventListener('mousedown', closePopup);
          document.title = 'Malte Schümann';
      }
  };
  if (popup && popupContent) {
      const closeButton = popup.querySelector('.close-btn');
      if (closeButton && !closeButton.dataset.listenerAdded) {
          closeButton.addEventListener('click', (e) => {
              e.stopPropagation(); 
              popup.style.display = 'none';
              history.pushState(null, '', window.location.pathname); // Reset URL
          });
          closeButton.dataset.listenerAdded = 'true';
      }
      if (popup.style.display === 'none' || popup.style.display === '') {
          popup.style.display = 'block';
          popupContent.style.display = 'block';
          history.pushState(null, '', `#${projectName}`); // Update URL
          document.addEventListener('mousedown', closePopup);
          const name = friendlyNames[projectName] || projectName;
          document.title = name + ' - Malte Schümann';
      } else {
          if (event && !popupContent.contains(event.target)) {
              popup.style.display = 'none';
              history.pushState(null, '', window.location.pathname); // Reset URL
          }
      }
  }
}

window.togglePopup = togglePopup;
