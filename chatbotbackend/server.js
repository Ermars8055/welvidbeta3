const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai"); 

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Replace with your actual OpenAI API key
const configuration = new Configuration({
  apiKey: "AIzaSyD6gCt1gvh3LP1ftuwc3kyrQlgN8jWwQ_g",
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", 
      prompt: userMessage,
      max_tokens: 1024, 
      n: 1, 
      stop: null, 
    });

    const botResponse = response.data.choices[0].text;
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error communicating with the OpenAI API:', error);
    res.status(500).json({ error: 'Failed to fetch response from API.' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});