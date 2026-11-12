const sourceCategories = [
  ["popular", "人気"],
  ["exclamation", "「!」に似た文字"],
  ["question", "「?」に似た文字"],
  ["alphanumeric", "英数字に似た文字"],
  ["small", "小文字・スモールキャピタル"],
  ["super", "上付き・下付き"],
  ["font", "フォント風アルファベット"],
  ["symbols", "特殊記号"],
  ["decorative", "装飾・区切り"],
  ["love", "星・ハート"],
  ["shapes", "矢印・図形"],
  ["japanese", "日本語・漢字系"],
  ["other", "その他"]
].map(([id, label]) => ({ id, label }));

export const categories = [
  { id: "all", label: "一覧" },
  sourceCategories[0],
  ...sourceCategories.slice(1)
];
const characterGroups = {
  popular: [
    { value: "〆々乂么メ彡ツシ亗王神卍ゞ・×★☆♡♥♛♚☯", name: "人気のゲームID記号", keywords: ["ゲーム", "ID", "Fortnite"] }
  ],
  exclamation: [
    { value: "！﹗ǃ❕❗‼⁉❢❣՜", name: "感嘆符に似た文字", keywords: ["!", "びっくり", "感嘆符", "Fortnite"] }
  ],
  question: [
    { value: "？﹖❓❔⁇⁈¿՞", name: "疑問符に似た文字", keywords: ["?", "はてな", "疑問符"] }
  ],
  alphanumeric: [
    { value: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ⓪①②③④⑤⑥⑦⑧⑨０１２３４５６７８９", name: "囲み・全角英数字", keywords: ["英字", "数字", "丸文字"] },
    { value: "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøœùúûüýþÿŁłĐđ", name: "アクセント付きアルファベット", keywords: ["英字", "アルファベット", "ラテン文字", "似た文字"] },
    { value: "ΑΒΕΖΗΙΚΜΝΟΡΤΥΧϹАВСЕНКМОРТХУасеорхуіјѕ", name: "アルファベットに似た文字", keywords: ["英字", "アルファベット", "ギリシャ文字", "キリル文字", "似た文字"] }
  ],
  small: [
    { value: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢᴬᴮᴰᴱᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᴿᵀᵁⱽᵂ", name: "スモールキャピタル", keywords: ["小文字", "small"] }
  ],
  super: [
    { value: "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱᵃᵇᶜᵈᵉᶠᵍʰʲᵏˡᵐᵒᵖʳˢᵗᵘᵛʷˣʸᶻ₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ", name: "上付き・下付き文字", keywords: ["上付き", "下付き", "数字"] }
  ],
  font: [
    { value: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩", name: "装飾フォント風英字", keywords: ["フォント", "筆記体", "フラクトゥール"] }
  ],
  symbols: [
    { value: "©®™℠№℡℗℞℀℁℅℆℉℃ℓ℔℧℥∞∴∵∷≈≠≡≤≥±÷×√∑∏∫∂∆∇", name: "数学・特殊記号", keywords: ["記号", "数学"] }
  ],
  decorative: [
    { value: "・･:：;；|｜¦‖―—–‐〜～〃〆〄〓〝〟〈〉《》「」『』【】〔〕〖〗〘〙〚〛", name: "装飾と区切り文字", keywords: ["区切り", "飾り", "括弧"] }
  ],
  love: [
    { value: "★☆✦✧✩✪✫✬✭✮✯✰⋆⭑⭒✵✶✷✸✹❂❃♡♥❤❥❣ღ❦❧", name: "星とハート", keywords: ["星", "ハート", "かわいい"] }
  ],
  shapes: [
    { value: "←↑→↓↔↕↖↗↘↙⇐⇑⇒⇓⇔➔➜➝➞➟➠➡➢➣➤➥➦➧➨➩➪■□▪▫▲△▼▽◆◇○●◉◎◌◍◐◑◒◓◢◣◤◥", name: "矢印と図形", keywords: ["矢印", "図形"] }
  ],
  japanese: [
    { value: "々〆〇ヶヵゝゞヽヾ仝〻〼㊀㊁㊂㊃㊄㊅㊆㊇㊈㊉㊊㊋㊌㊍㊎㊏㊐㊑㊒㊓㊔㊕㊖㊗㊘㊙㊚㊛㊜㊝㊞㊟", name: "日本語・漢字系装飾", keywords: ["日本語", "漢字", "和風"] }
  ],
  other: [
    { value: "☀☁☂☃☄☎☏☑☒☕☘☠☢☣☮☯☸☹☺☻☽☾♠♣♦♤♧♢♔♕♖♗♘♙♚♛♜♝♞♟⚐⚑⚔⚙⚡⚪⚫⚽⚾⛅⛏⛩✁✂✃✄✆✈✉✎✏✐✒✓✔✕✖✗✘", name: "その他のUnicode記号", keywords: ["その他", "Unicode"] }
  ]
};

const seenCharacters = new Set();

export const characters = sourceCategories.flatMap((category) => {
  return characterGroups[category.id].flatMap((group) => {
    return Array.from(group.value).map((character) => ({
      character,
      name: group.name,
      category: category.id,
      keywords: group.keywords,
      codePoint: `U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
    }));
  }).filter((item) => {
    if (seenCharacters.has(item.character)) {
      return false;
    }
    seenCharacters.add(item.character);
    return true;
  });
});


