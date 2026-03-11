const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateSummary(data) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  You are a sales analyst.

  Analyze the following sales data and give a professional summary for executives.

  Data:
  ${JSON.stringify(data)}
  `;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

module.exports = generateSummary;
