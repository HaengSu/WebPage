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
    const prompt = `당신은 영어 단어 학습을 돕는 선생님입니다. 
  사용자가 선택한 학습 목적은 "${purpose}"이고, 수준은 "${level}"입니다.

  아래 뉴스 기사 본문에서 ${purpose} 학습에 도움이 되는 영어 단어 10개를 뽑아주세요. 
  ${level} 학습자에게 적합한 난이도로 선택해주세요.

  JSON 배열 형식으로 반환하며, 각 객체는 다음을 포함해야 합니다:
  - "word": 영어 단어
  - "meanings": 한국어 뜻을 3~4개 정도 배열(Array)로 작성 (예: ["행복", "기쁨", "만족", "즐거움"])
  - "ps": 품사(명사, 동사, 형용사 등)는 영어로 작성

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
        const words = await extractWords(articleText,level, purpose);

        res.json({ words: JSON.parse(words) });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to extract words' })
    }
});

module.exports = router;