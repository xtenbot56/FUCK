const fs = require("fs-extra");
const { getPrefix } = global.utils;

module.exports = {
  config: {
    name: "rules",
    version: "1.0",
    author: "EREN",
    countDown: 5,
    role: 0,
    category: "info",
    guide: {
      en: "{pn} / rules",
    },
    priority: 1,
  },

  onStart: async function ({ message, args }) {
    await this.sendRules(message);
  },

  onChat: async function ({ event, message }) {
    if (event.body.toLowerCase().startsWith("rules")) {
      await this.sendRules(message);
    }
  },

  sendRules: async function (message) {
    let rulesMsg = `
╭───    𝗥𝗨𝗟𝗘𝗦   ───╮
🌟 𝗚𝗿𝗼𝘂𝗽 𝗥𝘂𝗹𝗲𝘀 𝗳𝗼𝗿 𝗮 𝗽𝗲𝗮𝗰𝗲𝗳𝘂𝗹 𝗲𝗻𝘃𝗶𝗿𝗼𝗻𝗺𝗲𝗻𝘁 ✋
────────────────────────────────


১) খারাপ ব্যাবহার এবং ১৮ + কথা & ইমজি allow না।❌

২)  Text Off দেওয়া হলে তখন কোন প্রকার ইমোজি বা টেক্সট দেয়া যাবে না ❌

৩) সমস্যা হলে admin কে বলুন, কারো পারমিশন ছাড়া তার ইনবক্সে যাওয়া যাবে না।❌

৪)  গ্রুপে Spam, Link share, অন্য Group Promote করা যাবে না।❌

৫) ঝগড়া হলে admin কে বলুন। ✅

৬) এই গ্রুপের Member, অন্য গ্রুপে নেয়া নিষিদ্ধ। ❌ 
   
   
👑 আ্যডমিন দের সম্মান করুন।👍

╰────────────────────╯
    `;

    return message.reply({
      body: rulesMsg,
    });
  },
};
