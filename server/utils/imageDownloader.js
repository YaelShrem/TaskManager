const axios = require('axios');
const fs = require('fs');
const path = require('path');

const downloadImage = async (imageUrl, imageName) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Specify the directory to save the image
    const directory = path.join(__dirname, '../images');

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Generate the file path for the image
    const imagePath = path.join(directory, imageName);

    fs.writeFileSync(imagePath, Buffer.from(response.data, 'binary'));

    return imagePath;
  } catch (error) {
    throw new Error('Failed to download and save the image.');
  }
};

module.exports = downloadImage;
