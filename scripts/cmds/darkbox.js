const axios = require("axios");
const fs = require("fs-extra");
const FormData = require("form-data");
const path = require("path");

module.exports = {
  config: {
    name: "darkbox",
    aliases: ["db"],
    version: "1.4",
    author: "Eren",
    countDown: 5,
    role: 0,
    shortDescription: "Upload media to darkbox (catbox.moe)",
    longDescription: "Upload replied image or video to darkbox and get link",
    category: "tools",
    guide: {
      en: "{pn} (reply to image/video) or reply with 'darkbox'/'db'"
    }
  },

  onStart: async function ({ event, api, message }) {
    return handleDarkboxUpload({ event, api, message });
  },

  onChat: async function ({ event, api, message }) {
    const { body, messageReply } = event;
    const trigger = body?.toLowerCase();
    if ((trigger === "darkbox" || trigger === "db") && messageReply) {
      return handleDarkboxUpload({ event, api, message });
    }
  }
};

async function handleDarkboxUpload({ event, api, message }) {
  const { messageReply } = event;

  if (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0) {
    return message.reply("Please reply to an image or video.");
  }

  const fileUrl = messageReply.attachments[0].url;
  const ext = messageReply.attachments[0].type === "photo" ? ".jpg" : ".mp4";
  const filePath = path.join(__dirname, "temp" + ext);

  // Animation with only 1 frame
  const frame = "╔════════════════════╗\n║ 🔄 Uploading to DarkBox. \n╚════════════════════╝";
  const loadingMsg = await message.reply(frame);

  const animation = setInterval(() => {
    api.editMessage(frame, loadingMsg.messageID);
  }, 800);

  try {
    const response = await axios.get(fileUrl, { responseType: "stream" });
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", fs.createReadStream(filePath));

    const upload = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders(),
    });

    fs.unlinkSync(filePath);
    clearInterval(animation);

    const successMsg =
`╔════════════════════╗
║ ✅ Successfully Uploaded!
║ URL: ${upload.data}
╚════════════════════╝`;

    api.editMessage(successMsg, loadingMsg.messageID);
  } catch (err) {
    fs.existsSync(filePath) && fs.unlinkSync(filePath);
    clearInterval(animation);
    const errorMsg =
`╔══✘ DARKBOX ERROR ✘══╗
║ Failed to upload your file.
╚══════════════════════╝`;
    api.editMessage(errorMsg, loadingMsg.messageID);
    console.error(err);
  }
}
