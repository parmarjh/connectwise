
import { GoogleGenAI } from '@google/genai';
import type { Company } from '../types';

// IMPORTANT: Do not expose this key in a production environment.
// This is for demonstration purposes only.
// In a real application, this should be handled by a backend server.
if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function generateCompanyInsight(company: Company, question: string): Promise<string> {
   if (!process.env.API_KEY) {
    return "The AI assistant is currently unavailable. Please configure the API key.";
  }
  
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    You are an AI assistant named ConnectWise AI, specializing in providing ethical company insights and market intelligence.
    Your tone is professional, insightful, and strictly data-driven. Do not hallucinate or provide information not supported by the data.
    
    Here is the data for the company "${company.name}":
    - Domain: ${company.domain}
    - Industry: ${company.industry}
    - Description: ${company.description}
    - Funding Stage: ${company.funding_stage}
    - Recent Hiring Signals: ${company.hiring_signals ? company.hiring_signals.roles.join(', ') : 'None specified'}

    Based *only* on the information provided above, answer the following user question. If the information is not available in the provided data, state that you do not have enough information to answer. Format your response using markdown for readability.

    User Question: "${question}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    return "Sorry, I encountered an error while processing your request. Please check the console for more details.";
  }
}
