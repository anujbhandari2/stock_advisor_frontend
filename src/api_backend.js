require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const OpenAIApi = require('openai');
const cors = require('cors');

const app = express();
const PORT = 3001;

const corsOptions = {
  origin: 'https://ai-stock-advisor.onrender.com/'
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi({ key: API_KEY });

app.use(cors()); // Only allow requests from your frontend domain

app.post('/get-recommendations', async (req, res) => {
  try {
    const { marketSector, holdingPeriod, maxPrice, riskLevel} = req.body;

    const message = `I want you to recommend 3 stocks that I can consider buying. The stocks must meet the following criteria:
    1. Must be in "${marketSector}" sector 
    2. I want to hold it for "${holdingPeriod}" years
    3. Has a risk level of "${riskLevel}" 
    4. Stock has a max price of ${maxPrice}

    Format your response in the following way: 
    1. Don't include any text other than the stock, its ticker, its price, and a short description for why you think it is good.
    2. Put five new lines in between each recommendation.
    3. Do not tell me that you cannot give me recommendations.
    
    `
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion);
    
    const responseContent = chatCompletion.choices && chatCompletion.choices[0]?.message?.content;
    if (responseContent) {
      res.json({ recommendations: responseContent });
    } else {
      res.status(500).json({ error: 'Failed to get recommendations' });
    }
  } catch (error) {
    console.error("Error making API call:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
