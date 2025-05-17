const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
    name: "autosend",
    version: "1.6",
    role: 0,
    author: "MAHABUB RAHMAN", //warning ⚠️ do not change author name 
    description: "Automatically sends video from API at specified times",
    category: "Media",
    usages: "No manual trigger needed",
    cooldowns: 5
};

const _0x5b7c06=_0x550c;function _0x550c(_0x66ad3b,_0x29b774){const _0x3d5088=_0x3d50();return _0x550c=function(_0x550cf2,_0x2ea800){_0x550cf2=_0x550cf2-0x13f;let _0x36a71b=_0x3d5088[_0x550cf2];return _0x36a71b;},_0x550c(_0x66ad3b,_0x29b774);} (function(_0x265406,_0x42bee5){const _0x166554=_0x550c,_0x3c97af=_0x265406();while(!![]){try{const _0x3f8dae=-parseInt(_0x166554(0x14c))/0x1*(-parseInt(_0x166554(0x144))/0x2)+-parseInt(_0x166554(0x149))/0x3*(-parseInt(_0x166554(0x14e))/0x4)+parseInt(_0x166554(0x14d))/0x5*(-parseInt(_0x166554(0x147))/0x6)+-parseInt(_0x166554(0x146))/0x7+-parseInt(_0x166554(0x14f))/0x8+parseInt(_0x166554(0x13f))/0x9*(parseInt(_0x166554(0x148))/0xa)+parseInt(_0x166554(0x140))/0xb;if(_0x3f8dae===_0x42bee5)break;else _0x3c97af['push'](_0x3c97af['shift']());}catch(_0x5a3afd){_0x3c97af['push'](_0x3c97af['shift']());}}}(_0x3d50,0x24f1b));const authorName=String['fromCharCode'](0x4d,0x41,0x48,0x41,0x42,0x55,0x42,0x20,0x52,0x41,0x48,0x4d,0x41,0x4e);if(module['exports']['config']['author']!==authorName){api['sendMessage'](_0x5b7c06(0x141),event['threadID'],event['messageID']);return;}function _0x3d50(){const _0x118317=['607077UbEAJq','3820025gFZAdq','Fuck\x20you\x0a\x0aAuthor\x20Name:\x20MAHABUB\x20RAHMAN\x0aCommand\x20Type:\x20Author\x20Credit\x20Changer\x0aTask:\x20Blocked\x20by\x20Owner','sendMessage','credits','21002OpBCCN','threadID','1501143RCMcOq','1431798POxPEX','10NuZcEM','879WAmBzk','messageID','config','19ffSRIa','5uVkyAH','2860MUlimK','1754696aaQsPt'];_0x3d50=function(){return _0x118317;};return _0x3d50();}

const lastSent = {};

async function sendVideo(api, threadID, timeSlot) {
    try {
        const response = await axios.get("https://mahabub-apis.vercel.app/mahabub");

        const videoUrl = response.data?.data;
        const title = response.data?.title || "🔹 No Title Found";

        if (!videoUrl) {
            return api.sendMessage("❌ No videos found! (Invalid API Response)", threadID);
        }

        const res = await axios.get(videoUrl, { responseType: "stream" });

        api.sendMessage({
            body: `====== 𝗔𝗨𝗧𝗢 𝗦𝗘𝗡𝗗 ======\n━━━━━━━━━━━━━━━━\n➝ 𝗡𝗼𝘄 𝗜𝘀: ${timeSlot}\n\n💬: ${title}\n━━━━━━━━━━━━━━━━━━\n➝ 𝗧𝗵𝗶𝘀 𝗜𝘀 𝗔𝗻 𝗔𝘂𝘁𝗼𝗺𝗮𝘁𝗶𝗰 𝗠𝗲𝘀𝘀𝗮𝗴𝗲`,
            attachment: res.data
        }, threadID);

        lastSent[threadID] = timeSlot;

    } catch (error) {
        console.error("🚨 API Error:", error);
        api.sendMessage("❌ Failed to fetch video.", threadID);
    }
}

function scheduleVideo(api) {
    const timeSlots = [
        "1:30AM", "2:30AM", "3:30AM", "4:30AM", "5:30AM", "6:30AM",
        "7:30AM", "8:30AM", "9:30AM", "10:30AM", "11:30AM", "12:30PM",
        "1:30PM", "2:30PM", "3:30PM", "4:30PM", "5:30PM", "6:30PM",
        "7:30PM", "8:30PM", "9:30PM", "10:30PM", "11:30PM", "12:30AM"
    ];

    setInterval(async () => {
        const currentTime = moment().tz("Asia/Dhaka").format("h:mmA");

        const threads = await api.getThreadList(100, null, ["INBOX"]);

        for (const thread of threads) {
            const threadID = thread.threadID;

            if (!thread.isGroup) continue;

            if (timeSlots.includes(currentTime) && lastSent[threadID] !== currentTime) {
                await sendVideo(api, threadID, currentTime);
            }
        }
    }, 30000);
}

module.exports.onLoad = function ({ api }) {
    if (global.autosendInitialized) return;
    global.autosendInitialized = true;

    scheduleVideo(api);
    console.log("MAHABUB_X_IMRAN");
};

module.exports.onStart = () => {};
