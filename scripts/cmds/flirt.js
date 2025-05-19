module.exports = {
    config: {
        name: "halalflirt",
        aliases: ["hf", "flirt"],
        version: "1.0",
        author: "XOS Ayan",
        role: 0,
        shortDescription: {
            en: "Send a respectful and sweet flirting message."
        },
        longDescription: {
            en: "Generates a respectful and charming message for halal flirting."
        },
        category: "fun",
        guide: {
            en: "{pn} to flirt in a respectful way."
        }
    },

    onStart: async function ({ message, event, usersData }) {
        try {
            // Flirting messages in Bangla (Respectful & Halal)
            const flirtLines = [
                "তোমার হাসি যেন এক টুকরো চাঁদের আলো! 🌙✨",
                "তোমার ব্যবহারের মধ্যে একটা অদ্ভুত শান্তি আছে, যেটা মন ছুঁয়ে যায়! 💖",
                "তুমি কি সূর্যের আলো থেকে তৈরি? কারণ তুমি আসলেই আলো ছড়াও! ☀️",
                "তোমার মতো মানুষের সান্নিধ্যে থাকলে মন সবসময় ভালো থাকে! 😊",
                "আল্লাহ তোমাকে এত সুন্দরভাবে সৃষ্টি করেছেন, তা দেখে আমি মুগ্ধ! 🥰",
                "তুমি কি জানো? তোমার কথা শুনলে মনটা অজান্তেই হাসে! 💕",
                "তোমার মতো মানুষদের জন্যই পৃথিবীটা আরও সুন্দর লাগে! 🌸",
                "তোমার ভালোবাসা একেবারে হালাল টাইপের, তাই না? 😇",
                "তুমি কি কেবল এই দুনিয়ার জন্যই সুন্দর নাকি জান্নাতেও এমন থাকবা? 😍",
                "তোমার চোখের ভাষা যেন এক অদ্ভুত মায়ার গল্প বলে! 💫"
            ];

            // Randomly select a flirting line
            const randomFlirt = flirtLines[Math.floor(Math.random() * flirtLines.length)];

            // Send the flirt message
            await message.reply(randomFlirt);
        } catch (err) {
            console.error(err);
            await message.reply("❌ কিছু একটা সমস্যা হয়েছে, পরে আবার চেষ্টা করো!");
        }
    }
};
