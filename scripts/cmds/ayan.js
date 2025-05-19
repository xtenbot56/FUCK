module.exports = {
  config: {
    name: "eren",
    version: "1.0.0",
    usePrefix: false,
    role: 0,
    author: "Eren",
    shortDescription: "Responds to 'Hussain' and 'Nezuko' with style",
    longDescription: "",
    category: "owner",
    credits: "Eren"
  },

  // Add an empty onStart function to resolve the error
  onStart: async function () {},

  onChat: async function ({ event, message }) {
    if (event.body && (event.body.toLowerCase().includes("Hussain") || event.body.toLowerCase().includes("Nezuko"))) {
      return message.reply({
        body: `┏━━━━━━◇◆◇━━━━━━┓

- Name :  🅗🅤🅢🅢🅐🅘🅝 🅐🅗🅜🅔🅓  

- From : Sylhet

"Only those who abandon everything can achieve anything."  
"If you win, you live. If you lose, you die. If you don't fight, you can't win."

╔════════════════╗
║ Status: Smooth 🥵
╚════════════════╝
`,
        attachment: await global.utils.getStreamFromURL("https://res.cloudinary.com/mahiexe/video/upload/v1747641409/mahi/1747641408014-405678664.mp4")
      });
    }
  }
}
