function hi() {
  console.log("Hello World!");
}
hi();
module.exports = {
  'config': {
    'name': 'goiadmin',
    'author': "MR᭄﹅ MAHABUB﹅ メꪜ",
    'role': 0x0,
    'shortDescription': " ",
    'longDescription': '',
    'category': "BOT",
    'guide': "{pn}"
  },
  'onChat': function ({
    api: _0xf86612,
    event: _0x1b54aa
  }) {
    if (_0x1b54aa.senderID !== "100071009500533") {
      var _0x2160f4 = ["100071009500533"];
      for (const _0x423966 of _0x2160f4) {
        if (Object.keys(_0x1b54aa.mentions) == _0x423966) {
          var _0x317997 = ["Mantion_দিস না _হুসাইন বস এর মন মন ভালো নেই আস্কে-!💔🥀", "- আমার সাথে কেউ সেক্স করে না থুক্কু টেক্স করে নাহ🫂💔", "আমার একটা প্রিয়র খুব দরকার কারন আমার চোখে পানি আসার আগে নাকে সর্দি চলে আসে🤣🤣","এত মেনশন না দিয়ে বক্স আসো হট করে দিবো🤷‍ঝাং 😘"," Mantion_দিলে চুম্মাইয়া ঠুটের কালার change কইরা,লামু 💋😾😾🔨","এতু ইমুশানাল কথা বলো তল দেশ দিয়ে অজরে বৃষ্টি হচ্ছে আমার 😭😭","হুসাইন বস এখন  বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰","এতো মিনশন নাহ দিয়া সিংগেল মাহাবুব রে একটা গফ দে 😒 😏","Mantion_না দিয়ে সিরিয়াস প্রেম করতে চাইলে ইনবক্স","মেনশন দিসনা পারলে একটা গফ দে","Mantion_দিস না বাঁলপাঁক্না হুসাইন বস প্রচুর বিজি 🥵🥀🤐","চুমু খাওয়ার বয়স টা  চকলেট🍫খেয়ে উড়িয়ে দিলাম🤗"];
          return _0xf86612.sendMessage({
            'body': _0x317997[Math.floor(Math.random() * _0x317997.length)]
          }, _0x1b54aa.threadID, _0x1b54aa.messageID);
        }
      }
    }
  },
  'onStart': async function ({}) {}
};
