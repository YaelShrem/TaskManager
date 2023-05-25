const axios = require('axios');
const fs = require('fs');

const downloadImage = async (url, filename) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageData = Buffer.from(response.data, 'binary');
    fs.writeFileSync(filename, imageData);
    console.log(`Image downloaded successfully: ${filename}`);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};

module.exports = { downloadImage };