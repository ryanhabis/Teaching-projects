// DOM Elements
const topTextInput = document.getElementById('top-text');
const bottomTextInput = document.getElementById('bottom-text');
const imageUrlInput = document.getElementById('image-url');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const canvas = document.getElementById('meme-canvas');
const templateImages = document.querySelectorAll('.meme-templates img');

// Set canvas size
canvas.width = 500;
canvas.height = 500;

// Load image and draw meme
function generateMeme() {
  const imageUrl = imageUrlInput.value || 'https://i.imgflip.com/4/1bij.jpg';
  const topText = topTextInput.value;
  const bottomText = bottomTextInput.value;

  const ctx = canvas.getContext('2d');
  const image = new Image();
  
  image.crossOrigin = 'Anonymous'; // Fixes CORS issues for some images
  image.src = imageUrl;

  image.onload = function() {
    // Clear canvas and draw image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Text styling
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.font = '36px Impact';
    ctx.textAlign = 'center';

    // Top text
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);

    // Bottom text
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 30);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 30);
  };
}

// Download meme as image
function downloadMeme() {
  const link = document.createElement('a');
  link.download = 'my-meme.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Template selection
templateImages.forEach(img => {
  img.addEventListener('click', () => {
    imageUrlInput.value = img.dataset.url;
  });
});

// Event listeners
generateBtn.addEventListener('click', generateMeme);
downloadBtn.addEventListener('click', downloadMeme);

// Generate default meme on load
generateMeme();