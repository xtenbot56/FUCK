module.exports = {
  config: {
    name: "wife",
    version: "1.0",
    author: "xovhi",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },

  onStart: async function () { },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "amar 12 batari koi?") {
      return message.reply({
        body:
          "╭─────────────╮\n" +
          "  এইনে দেখ তোর মাল গুলা 🫡\n" +
          "╰─────────────╯\n\n" +
          "জানিনা আমার মালিকের বউ থাকার পরেও কেন আরো বউ লাগে 🙂💔\n\n" +
          "তোদের বলতাছি ওরে Loyal বানাতে পারলে পুরুস্কার দিমু৷ 🐸\n\n" +
          "───────⋆⋅☆⋅⋆───────\n" +
          "『 BOT: 🕸️ 🅝🅔🅩🅤🅚🅞 🕷️ 』",
        attachment: await global.utils.getStreamFromURL("https://files.catbox.moe/uynuni.mp4")
      });
    }
  }
};
