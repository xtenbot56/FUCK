const { exec } = require('child_process');

module.exports = {
  config: {
    name: "shell",
    version: "1.0",
    author: "Samir // Eren Yeager",
    countDown: 5,
    role: 2,
    shortDescription: "Execute shell commands",
    longDescription: "Executes terminal shell commands from chat",
    category: "shell",
    guide: {
      vi: "{p}{n} <command>",
      en: "{p}{n} <command>"
    },
    usePrefix: false,
    onChat: true
  },

  onStart: async function ({ args, message, event }) {
    const allowedUIDs = ["6157399136513", "61574046213712"];
    if (!allowedUIDs.includes(event.senderID)) {
      const insults = [
        "𝐓𝐮𝐢 𝐤𝐢 𝐍𝐀𝐒𝐀'𝐫 𝐡𝐚𝐜𝐤𝐞𝐫 𝐧𝐚𝐤𝐢? 𝐇𝐚𝐭 𝐝𝐡𝐨𝐫𝐞 𝐛𝐨𝐬𝐡!",
        "𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐜𝐡𝐚𝐫𝐚 𝐬𝐡𝐞𝐥𝐥? 𝐒𝐡𝐨𝐛𝐜𝐡𝐞𝐲𝐞 𝐛𝐚𝐫𝐨 𝐣𝐨𝐤𝐞 𝐚𝐣𝐤𝐞𝐫!",
        "𝐄𝐢 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐭𝐨𝐫 𝐣𝐨𝐧𝐧𝐞 𝐧𝐚 𝐛𝐡𝐚𝐢, 𝐜𝐚𝐥𝐜𝐮𝐥𝐚𝐭𝐨𝐫 𝐜𝐡𝐚𝐥𝐚𝐢!",
        "𝐒𝐡𝐞𝐥𝐥 𝐜𝐡𝐚𝐥𝐚𝐲 𝐟𝐞𝐥𝐛𝐢? 𝐏𝐫𝐨𝐭𝐡𝐨𝐦𝐞 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐦𝐚𝐧𝐚𝐠𝐞 𝐤𝐨𝐫!",
        "𝐓𝐮𝐢 𝐬𝐡𝐞𝐥𝐥 𝐮𝐬𝐞 𝐤𝐨𝐫𝐚𝐫 𝐚𝐠𝐞 𝐤𝐢𝐜𝐡𝐮 𝐣𝐚𝐧𝐭𝐞 𝐡𝐨𝐛𝐞, 𝐜𝐡𝐚𝐦𝐩𝐢𝐨𝐧!",
        "𝐂𝐨𝐝𝐞 𝐥𝐢𝐤𝐡𝐚𝐫 𝐚𝐠𝐞 𝐛𝐚𝐛𝐚𝐫 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐧𝐢𝐞 𝐚𝐬!",
        "𝐓𝐮𝐢 𝐜𝐡𝐚𝐬 𝐬𝐡𝐞𝐥𝐥 𝐜𝐡𝐚𝐥𝐚𝐭𝐞, 𝐛𝐮𝐭 𝐥𝐨𝐠𝐢𝐜 𝐛𝐨𝐳𝐡𝐢𝐬 𝐧𝐚!",
        "𝐒𝐡𝐞𝐥𝐥 𝐤𝐞 𝐭𝐮𝐦𝐢 𝐣𝐞 𝐮𝐬𝐞 𝐤𝐨𝐫𝐛𝐞? 𝐁𝐨𝐭 𝐡𝐚𝐬𝐜𝐡𝐞 𝐛𝐚𝐛𝐲!",
        "𝐂𝐡𝐮𝐩 𝐜𝐡𝐚𝐩 𝐛𝐨𝐬𝐡 𝐚𝐫 𝐛𝐨𝐭𝐞𝐫 𝐡𝐞𝐥𝐩 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐩𝐨𝐫!",
        "𝐓𝐮𝐢 𝐬𝐡𝐞𝐥𝐥 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐝𝐞𝐢𝐬 𝐧𝐚𝐤𝐢 𝐛𝐨𝐭 𝐤𝐞 𝐛𝐮𝐫𝐧 𝐤𝐨𝐫𝐭𝐞 𝐜𝐚𝐬!"
      ];
      const insult = insults[Math.floor(Math.random() * insults.length)];
      return message.reply(`════════════════════\n${insult}\n════════════════════`);
    }

    const command = args.join(" ");
    if (!command) {
      return message.reply("Please provide a command to execute.");
    }

    exec(command, (error, stdout, stderr) => {
      if (error) return message.reply(`❌ Error:\n${error.message}`);
      if (stderr) return message.reply(`⚠️ Stderr:\n${stderr}`);
      const output = stdout || "✅ Command executed successfully, but no output.";
      message.reply(`✅ Output:\n${output}`);
    });
  },

  onChat: async function ({ event, args, message }) {
    const prefixUsed = event.body.split(" ")[0].toLowerCase();
    if (prefixUsed !== "shell") return;

    const allowedUIDs = ["6157399136513", "61574046213712"];
    if (!allowedUIDs.includes(event.senderID)) {
      const insults = [
        "𝐓𝐮𝐢 𝐤𝐢 𝐍𝐀𝐒𝐀'𝐫 𝐡𝐚𝐜𝐤𝐞𝐫 𝐧𝐚𝐤𝐢? 𝐇𝐚𝐭 𝐝𝐡𝐨𝐫𝐞 𝐛𝐨𝐬𝐡!",
        "𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐜𝐡𝐚𝐫𝐚 𝐬𝐡𝐞𝐥𝐥? 𝐒𝐡𝐨𝐛𝐜𝐡𝐞𝐲𝐞 𝐛𝐚𝐫𝐨 𝐣𝐨𝐤𝐞 𝐚𝐣𝐤𝐞𝐫!",
        "𝐄𝐢 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐭𝐨𝐫 𝐣𝐨𝐧𝐧𝐞 𝐧𝐚 𝐛𝐡𝐚𝐢, 𝐜𝐚𝐥𝐜𝐮𝐥𝐚𝐭𝐨𝐫 𝐜𝐡𝐚𝐥𝐚𝐢!",
        "𝐒𝐡𝐞𝐥𝐥 𝐜𝐡𝐚𝐥𝐚𝐲 𝐟𝐞𝐥𝐛𝐢? 𝐏𝐫𝐨𝐭𝐡𝐨𝐦𝐞 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐦𝐚𝐧𝐚𝐠𝐞 𝐤𝐨𝐫!",
        "𝐓𝐮𝐢 𝐬𝐡𝐞𝐥𝐥 𝐮𝐬𝐞 𝐤𝐨𝐫𝐚𝐫 𝐚𝐠𝐞 𝐤𝐢𝐜𝐡𝐮 𝐣𝐚𝐧𝐭𝐞 𝐡𝐨𝐛𝐞, 𝐜𝐡𝐚𝐦𝐩𝐢𝐨𝐧!",
        "𝐂𝐨𝐝𝐞 𝐥𝐢𝐤𝐡𝐚𝐫 𝐚𝐠𝐞 𝐛𝐚𝐛𝐚𝐫 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐧𝐢𝐞 𝐚𝐬!",
        "𝐓𝐮𝐢 𝐜𝐡𝐚𝐬 𝐬𝐡𝐞𝐥𝐥 𝐜𝐡𝐚𝐥𝐚𝐭𝐞, 𝐛𝐮𝐭 𝐥𝐨𝐠𝐢𝐜 𝐛𝐨𝐳𝐡𝐢𝐬 𝐧𝐚!",
        "𝐒𝐡𝐞𝐥𝐥 𝐤𝐞 𝐭𝐮𝐦𝐢 𝐣𝐞 𝐮𝐬𝐞 𝐤𝐨𝐫𝐛𝐞? 𝐁𝐨𝐭 𝐡𝐚𝐬𝐜𝐡𝐞 𝐛𝐚𝐛𝐲!",
        "𝐂𝐡𝐮𝐩 𝐜𝐡𝐚𝐩 𝐛𝐨𝐬𝐡 𝐚𝐫 𝐛𝐨𝐭𝐞𝐫 𝐡𝐞𝐥𝐩 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐩𝐨𝐫!",
        "𝐓𝐮𝐢 𝐬𝐡𝐞𝐥𝐥 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐝𝐞𝐢𝐬 𝐧𝐚𝐤𝐢 𝐛𝐨𝐭 𝐤𝐞 𝐛𝐮𝐫𝐧 𝐤𝐨𝐫𝐭𝐞 𝐜𝐚𝐬!"
      ];
      const insult = insults[Math.floor(Math.random() * insults.length)];
      return message.reply(`════════════════════\n${insult}\n════════════════════`);
    }

    const command = args.join(" ");
    if (!command) {
      return message.reply("Please provide a command to execute.");
    }

    exec(command, (error, stdout, stderr) => {
      if (error) return message.reply(`❌ Error:\n${error.message}`);
      if (stderr) return message.reply(`⚠️ Stderr:\n${stderr}`);
      const output = stdout || "✅ Command executed successfully, but no output.";
      message.reply(`✅ Output:\n${output}`);
    });
  }
};
