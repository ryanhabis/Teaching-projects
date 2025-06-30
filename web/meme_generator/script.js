function generateMeme() {
  const topText = document.getElementById("top-text").value;
  const bottomText = document.getElementById("bottom-text").value;
  const memeImage = document.getElementById("meme-image");

  // Create a canvas to draw the meme
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = memeImage.width;
  canvas.height = memeImage.height;

  // Draw the image
  ctx.drawImage(memeImage, 0, 0);

  // Add text
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.font = "30px Impact";
  ctx.textAlign = "center";

  // Top text
  ctx.fillText(topText, canvas.width / 2, 40);
  ctx.strokeText(topText, canvas.width / 2, 40);

  // Bottom text
  ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
  ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);

  // Replace the image with the canvas
  memeImage.src = canvas.toDataURL();
}