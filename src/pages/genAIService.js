import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Generative AI client
const genAI = new GoogleGenerativeAI("AIzaSyAr38FDtRbgc18Qmvhm6jVCRlcNRmvAHQQ");

// Function to call the Generative AI model
export const generateContent = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text(); // Return the generated response
  } catch (error) {
    console.error("Error with Generative AI:", error);
    throw new Error("Failed to fetch AI response");
  }
};
