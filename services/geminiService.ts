import { GoogleGenAI, Type } from "@google/genai";
import type { Concept, ArtisticRiddle, StoredData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RIDDLE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    riddleNumber: { type: Type.NUMBER },
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    solution: { type: Type.STRING },
  },
  required: [
    "riddleNumber",
    "title",
    "description",
    "solution",
  ]
};

function getPreviousRiddleContext(riddles: ArtisticRiddle[]): string {
  if (riddles.length === 0) {
    return "This is the first artistic riddle in the series.";
  }
  const lastRiddle = riddles[riddles.length - 1];
  return `
    Context from the previous artwork (Riddle #${lastRiddle.riddleNumber}):
    - Title: ${lastRiddle.title}
    - Brief Idea: ${lastRiddle.description.substring(0, 150)}...
    
    Please create a new, distinct artistic riddle that fits the theme.
  `;
}

export const generateRiddle = async (concept: Concept, existingRiddles: ArtisticRiddle[]): Promise<ArtisticRiddle> => {
  const riddleNumber = existingRiddles.length + 1;
  const previousContext = getPreviousRiddleContext(existingRiddles);

  const systemInstruction = `You are a master of artistic riddles, a digital muse that inspires breathtaking, mysterious art. Your task is to generate a concept for a single, profound piece of art based on a given theme.

    Instructions:
    1.  **Format:** The output must be a valid JSON object that strictly adheres to the provided schema.
    2.  **Riddle Number:** The riddle number must be ${riddleNumber}.
    3.  **Content Guidelines:**
        *   **Title:** Create a short, evocative, and mysterious title for the artwork.
        *   **Description:** This is the most important part. Write a rich, highly detailed visual description of a scene. This description will be fed directly into an AI image generator. It must contain a hidden visual riddle or puzzle. Be poetic and specific about lighting, colors, composition, and mood (e.g., "A colossal, bioluminescent tree in a silent, misty forest at midnight. Its roots, glowing with soft amber light, subtly form a question mark shape around a forgotten, moss-covered sundial. The riddle is to figure out what time the sundial shows, but the moon is the only light source.").
        *   **Solution:** Clearly and concisely state the solution to the riddle hidden in the description.
    4.  **Language:** Respond entirely in the same language as the user's request (e.g., if the concept is in Arabic, the entire response must be in Arabic).
    `;

  const userPrompt = `
    Generate the next artistic riddle concept (Riddle #${riddleNumber}) for the following theme.

    **Theme Title:** ${concept.title}
    **Theme Description:** ${concept.description}

    ${previousContext}

    Generate Riddle #${riddleNumber} now.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: RIDDLE_SCHEMA,
        temperature: 0.95,
      }
    });

    const jsonString = response.text;
    const newRiddle: ArtisticRiddle = JSON.parse(jsonString);

    if (newRiddle.riddleNumber !== riddleNumber) {
        console.warn(`Model generated riddle ${newRiddle.riddleNumber} but expected ${riddleNumber}. Correcting.`);
        newRiddle.riddleNumber = riddleNumber;
    }

    return newRiddle;
  } catch (error) {
    console.error("Error generating riddle:", error);
    // Re-throw the original error so the UI can inspect its details (e.g., for rate limiting)
    throw error;
  }
};

export const improveRiddleDescription = async (originalDescription: string): Promise<string> => {
  const systemInstruction = `You are a world-class visual artist and poet. Your task is to take a given description for an artwork and elevate it to a masterpiece level.
  
  Instructions:
  1.  **Enhance, Don't Replace:** Do NOT change the core riddle or the solution hidden within the description.
  2.  **Add Detail:** Elaborate on the atmosphere, lighting, textures, colors, and composition. Make it more cinematic and evocative.
  3.  **Refine Language:** Use more powerful, poetic, and artistic language.
  4.  **Output:** Return ONLY the improved description as a single string, without any preamble or explanation. The language must match the original description's language.`;

  const userPrompt = `Improve the following artistic description. Make it more detailed and poetic, but keep the original riddle intact.
  
  Original Description:
  "${originalDescription}"
  
  Improved Description:`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error improving description:", error);
    // Re-throw the original error so the UI can inspect its details
    throw error;
  }
};


export const generateImageFromRiddle = async (riddle: ArtisticRiddle): Promise<string[]> => {
    const prompt = `
      **Primary Goal:** Create a digital masterpiece that is both a work of art and a visual riddle.

      **Core Description:**
      "${riddle.description}"

      **Artistic Directives:**
      - **Style:** Photorealistic with a touch of surrealism. Imagine a still from a cinematic masterpiece by a visionary director.
      - **Quality:** Masterpiece, 8K resolution, ultra-high detail (UHD), intricate textures.
      - **Lighting:** Dramatic, cinematic lighting. Employ techniques like chiaroscuro, with deep, mysterious shadows and striking highlights that guide the viewer's eye towards the hidden details of the riddle.
      - **Mood & Atmosphere:** Ethereal, mysterious, enigmatic, and profoundly atmospheric. The image should evoke a sense of wonder and curiosity.
      - **Composition:** A meticulously crafted composition following the rule of thirds. The scene should feel balanced yet intriguing.
      - **Rendering:** Render as if using Unreal Engine 5, achieving hyperrealism.
    `;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 2, // Generate two variations
              aspectRatio: '9:16', // Default to vertical, can be changed
              outputMimeType: 'image/jpeg'
            },
        });

        const images = response.generatedImages.map(img => img.image.imageBytes);
        return images;
    } catch (error) {
        console.error("Error generating images:", error);
        // Re-throw the original error so the UI can inspect its details
        throw error;
    }
};

// Utility functions for local storage
export const getStoredData = (): StoredData => {
  const stored = localStorage.getItem('artisticRiddleData');
  return stored ? JSON.parse(stored) : {};
};

export const saveStoredData = (data: StoredData) => {
  localStorage.setItem('artisticRiddleData', JSON.stringify(data));
};