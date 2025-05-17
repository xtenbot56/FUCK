const fs = require("fs-extra");
const { getPrefix } = global.utils;

module.exports = {
  config: {
    name: "rules",
    version: "1.0",
    author: "✨ Ayan ✨",
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
╭───    𝗥𝗨𝗟𝗘𝗦   ───╮
🌟 𝗚𝗿𝗼𝘂𝗽 𝗥𝘂𝗹𝗲𝘀 𝗳𝗼𝗿 𝗮 𝗽𝗲𝗮𝗰𝗲𝗳𝘂𝗹 𝗲𝗻𝘃𝗶𝗿𝗼𝗻𝗺𝗲𝗻𝘁 ✋
────────────────────────────────

১) খারাপ ব্যাবহার এবং ১৮+ ওয়ার্ড বলা যাবে না! ❌
২) করো ভয়েস এবং ছবি নিয়ে মজা করা যাবেনা ❌
৩) ফানি ভয়েস, ছবি, স্টিকার দেওয়া যাবে! (লিমিটেড) ✅
৪) কেউ কারো অনুমতি ছাড়া কারো ইনবক্সে মেসেজ দেওয়া যাবে না ❌
৫) গ্রুপে কোনো প্রাকার link allow  না।❌
৬) দলবদ্ধ ঝগরা allow না। ❌
৭) কোন সমস্যা হলে admin কে বলতে হবে নিজে নিজে আইন হাতে নেয়া যাবে না। ❌
   
👑 আ্যডমিন দের সম্মান করুন।👍

╰────────────────────╯
    `;

    return message.reply({
      body: rulesMsg,
    });
  },
};
