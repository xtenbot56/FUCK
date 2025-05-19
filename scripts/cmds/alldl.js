 const axios = require("axios");
const fs = require("fs-extra");
const tinyurl = require("tinyurl");

const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/xnil6x404/Api-Zone/refs/heads/main/Api.json");
  return base.data.xnil2;
};

const config = {
  name: "autodl",
  version: "3.0",
  author: "xnil",
  credits: "Dipto & ChatGPT Enhanced",
  description: "Auto download videos/images from TikTok, YouTube, FB, IG and more.",
  category: "media",
  commandCategory: "media",
  usePrefix: true,
  prefix: true,
  dependencies: {
    "tinyurl": "",
    "fs-extra": ""
  }
};

const onStart = () => {};

const onChat = async ({ api, event }) => {
  const body = event.body?.trim();
  if (!body) return;

  const supportedSites = [
    "https://vt.tiktok.com", "https://www.tiktok.com/", "https://vm.tiktok.com",
    "https://www.facebook.com", "https://fb.watch",
    "https://www.instagram.com/", "https://www.instagram.com/p/",
    "https://youtu.be/", "https://youtube.com/",
    "https://x.com/", "https://twitter.com/", "https://pin.it/"
  ];

  if (!supportedSites.some(site => body.startsWith(site))) return;

  const startTime = Date.now();
  const waitMsg = await api.sendMessage("⏳ Fetching media for you...\nPlease hold on!", event.threadID);

  try {
    const apiUrl = `${await baseApiUrl()}/alldl?url=${encodeURIComponent(body)}`;
    const { data } = await axios.get(apiUrl);
    const content = data?.content;

    if (!content?.url && !content?.result) {
      return api.sendMessage("❌ Unable to retrieve media. Please check the link or try again later.", event.threadID, event.messageID);
    }

    let extension = ".mp4";
    let mediaIcon = "🎬";
    let mediaLabel = "Video";

    if (content.result?.includes(".jpg") || content.result?.includes(".jpeg")) {
      extension = ".jpg";
      mediaIcon = "🖼️";
      mediaLabel = "Photo";
    } else if (content.result?.includes(".png")) {
      extension = ".png";
      mediaIcon = "🖼️";
      mediaLabel = "Photo";
    }

    const fileName = `media-${event.senderID}-${Date.now()}${extension}`;
    const filePath = `${__dirname}/cache/${fileName}`;
    fs.ensureDirSync(`${__dirname}/cache`);

    const buffer = await axios.get(content.url, { responseType: "arraybuffer" }).then(res => res.data);
    fs.writeFileSync(filePath, Buffer.from(buffer, "binary"));

    const shortUrl = await tinyurl.shorten(content.result || content.url);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    api.unsendMessage(waitMsg.messageID);

    const stylishMessage = `
╭━━━[ ✅ 𝗠𝗲𝗱𝗶𝗮 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗱 ]━━━╮
┃ ${mediaIcon} Type: ${mediaLabel}
┃ ⚡ Speed: ${duration}s
┃ 🔗 Link: ${shortUrl}
┃ 👤 Requested by: ${event.senderID}
╰━━━━━━━━━━━━━━━━━━━━━━╯
Enjoy your ${mediaLabel.toLowerCase()}! Made with ❤️ by xnil.
`;

    await api.sendMessage(
      {
        body: stylishMessage,
        attachment: fs.createReadStream(filePath)
      },
      event.threadID,
      () => fs.unlinkSync(filePath),
      event.messageID
    );

  } catch (err) {
    console.error("[autodl] Error:", err);
    api.setMessageReaction("❌", event.messageID, true);

    const errorMsg = `
❌ Oops! Something went wrong.
━━━━━━━━━━━━━━━
• Error: ${err.message}
• Try again later or check your link.
━━━━━━━━━━━━━━━`;

    api.sendMessage(errorMsg, event.threadID, event.messageID);
  }
};

module.exports = {
  config,
  onStart,
  onChat,
  run: onStart,
  handleEvent: onChat
};
