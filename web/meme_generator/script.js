// DOM Elements
const topTextInput = document.getElementById('top-text'); // Input for top meme text
const bottomTextInput = document.getElementById('bottom-text'); // Input for bottom meme text
const imageUrlInput = document.getElementById('image-url'); // Input for custom image URL
const generateBtn = document.getElementById('generate-btn'); // Button to generate meme
const downloadBtn = document.getElementById('download-btn'); // Button to download meme
const canvas = document.getElementById('meme-canvas'); // Canvas to draw meme
const templateImages = document.querySelectorAll('.meme-templates img'); // Meme template thumbnails

// Set canvas size
canvas.width = 500;
canvas.height = 500;

// Load image and draw meme
function generateMeme() {
  const imageUrl = imageUrlInput.value || 'https://i.imgflip.com/4/1bij.jpg'; // Use input or default image
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

    // Text styling for meme text
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.font = '36px Impact';
    ctx.textAlign = 'center';

    // Draw top text
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);

    // Draw bottom text
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 30);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 30);
  };
}

// Download meme as image
function downloadMeme() {
  const link = document.createElement('a');
  link.download = 'my-meme.png'; // Set download filename
  link.href = canvas.toDataURL('image/png'); // Get image data from canvas
  link.click(); // Trigger download
}

// Template selection: clicking a template sets the image URL input
templateImages.forEach(img => {
  img.addEventListener('click', () => {
    imageUrlInput.value = img.dataset.url;
  });
});

// Event listeners for generate and download buttons
generateBtn.addEventListener('click', generateMeme);
downloadBtn.addEventListener('click', downloadMeme);

// Generate default meme on page load
generateMeme();