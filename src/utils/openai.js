import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
// if (!import.meta.env.GEMINI_API_KEY) {
//   console.error("Missing OpenAI API Key.");
// }
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];
console.log("ishu", process.env.REACT_APP_Api);
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_Api);

// ...

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings,
});

// ...
export default model;
