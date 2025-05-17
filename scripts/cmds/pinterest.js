const axios = require("axios");
const path = require("path");
const fs = require("fs");

module.exports = {
  config: {
    name: "pinterest",
    aliases: ["pin"],
    version: "0.0.1",
    author: "MR᭄﹅ MAHABUB﹅ メꪜ",
    role: 0,
    countDown: 20,
    longDescription: {
      en: "This command allows you to search for images on Pinterest based on a given query and fetch a specified number of images (1-100)."
    },
    category: "media",
    guide: {
      en: "{pn} <search query> <number of images>\nExample: {pn} pin cat - 10"
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const keySearch = args.join(" ");
      if (!keySearch.includes("-")) {
        return api.sendMessage(
          `Please enter the search query and number of images\n\nExample:\n{pn} pin cat - 10.`,
          event.threadID,
          event.messageID
        );
      }

      const keySearchs = keySearch.substr(0, keySearch.indexOf('-')).trim();
      let numberSearch = parseInt(keySearch.split("-").pop()) || 6;
      if (numberSearch > 20) {
        numberSearch = 20;
      }

      const apiUrl = `https://mahabub-pinterest-api.onrender.com/pinterest?search=${encodeURIComponent(keySearchs)}&count=${numberSearch}`;

      const res = await axios.get(apiUrl);
      const data = res.data.data;

      if (!data || data.length === 0) {
        return api.sendMessage(
          `No images found for "${keySearchs}". Try a different query.`,
          event.threadID,
          event.messageID
        );
      }

      const imgData = [];
      const cacheDir = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir);
      }

      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        try {
          const imgResponse = await axios.get(data[i], {
            responseType: "arraybuffer",
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          });
          const imgPath = path.join(cacheDir, `${i + 1}.jpg`);
          await fs.promises.writeFile(imgPath, imgResponse.data, 'binary');
          imgData.push(fs.createReadStream(imgPath));
        } catch (error) {
          console.error(`Error downloading image ${data[i]}:`, error.message);
        }
      }

      if (imgData.length === 0) {
        return api.sendMessage(
          `Failed to download any images for "${keySearchs}". Please try again.`,
          event.threadID,
          event.messageID
        );
      }

      await api.sendMessage({
        body: `Here are the images you requested for "${keySearchs}":`,
        attachment: imgData,
      }, event.threadID, event.messageID);

      
      await fs.promises.rm(cacheDir, { recursive: true });

    } catch (error) {
      console.error(error);
      return api.sendMessage(
        `An error occurred: ${error.message}`,
        event.threadID,
        event.messageID
      );
    }
  }
};
