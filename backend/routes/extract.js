const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const OpenAI = require('openai');

const router = express.Router();

const client = new OpenAI({ apiKey: process.env.GPT_API_KEY });

async function crawlArticle(url) {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    const paragraphs = $('p').map((i, el) => $(el).text()).get();
    return paragraphs.join(" ");
}

async function extractWords(text, level, purpose) {
    const prompt = `
당신은 영어 단어 학습을 돕는 선생님입니다. 
사용자가 선택한 학습 목적은 "${purpose}"이고, 수준은 "${level}"입니다.

아래 뉴스 기사 본문에서 ${purpose} 학습에 도움이 되는 영어 단어를 무조건 10개 뽑아주세요. 
${level} 학습자에게 적합한 난이도로 선택해주세요.

 출력 형식 규칙:
- 반드시 **JSON 배열(JSON array)만 반환**
- 마크다운 코드블록(예: \`\`\`json, \`\`\`) 절대 사용 금지
- 불필요한 텍스트, 설명 없이 JSON만 출력
- 단어의 뜻은 무조건 4개를 알려줄 것
- 단어 뜻은 무조건 한글로 알려줄 것
- 각 객체는 다음 구조여야 합니다:
  {
    "word": "영어 단어",
    "meanings": ["뜻1", "뜻2", "뜻3", "뜻4"],
    "ps": "품사 (영어, 예: noun, verb)"
  }

기사 본문:
${text}
`;


    const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content;
}

router.get('/extract-words', async (req, res) => {
    try {
        const { url, level, purpose } = req.query;
        if (!url) return res.status(400).json({ error: 'url parameter required' });

        const articleText = await crawlArticle(url);
        const words = await extractWords(articleText, level, purpose);

        res.json({ words: JSON.parse(words) });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to extract words' })
    }
});

module.exports = router;