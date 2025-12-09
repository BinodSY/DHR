// DHRBackend/routes/translateRoutes.js (ES Module Format)

import express from "express";

const router = express.Router();

const languageMap = {
  auto: "auto-detect",
  hi: "Hindi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  or: "Odia",
  ml: "Malayalam",
  mr: "Marathi",
  gu: "Gujarati",
  bn: "Bengali",
  pa: "Punjabi",
  ur: "Urdu",
  en: "English",
};

// Enhanced response schema for better parsing
const responseSchema = {
  type: "object",
  properties: {
    original: { type: "string" },
    translated: { type: "string" },
  },
  required: ["original", "translated"],
};

// Utility function to clean and parse JSON responses
const parseGeminiResponse = (text) => {
  try {
    // Remove markdown code blocks if present
    const cleanedText = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    
    // Try to parse JSON
    const parsed = JSON.parse(cleanedText);
    
    // Validate the structure
    if (!parsed.original || !parsed.translated) {
      throw new Error("Missing required fields in response");
    }
    
    return {
      original: parsed.original.trim(),
      translated: parsed.translated.trim(),
    };
  } catch (parseError) {
    console.error("JSON Parse Error:", parseError.message);
    console.error("Raw response:", text);
    
    // Fallback: try to extract content from natural language response
    const fallbackMatch = text.match(/(?:original|transcribed).*?:\s*["']?([^"'\n]+)["']?.*?(?:translation|translated).*?:\s*["']?([^"'\n]+)["']?/i);
    if (fallbackMatch) {
      return {
        original: fallbackMatch[1].trim(),
        translated: fallbackMatch[2].trim(),
      };
    }
    
    // Last resort: assume the entire response is the translation
    return {
      original: "Audio transcription unavailable",
      translated: text.trim(),
    };
  }
};

// The main route logic function
const translateVoice = async (req, res) => {
  try {
    console.log("[DHR] Request received:", {
      method: req.method,
      url: req.url,
      headers: req.headers,
      bodyType: typeof req.body,
      bodyKeys: req.body ? Object.keys(req.body) : 'undefined'
    });

    // Enhanced body parsing with fallbacks
    let requestBody = req.body;
    
    // If req.body is undefined, try to parse raw body
    if (!requestBody && req.rawBody) {
      try {
        requestBody = JSON.parse(req.rawBody.toString());
        console.log("[DHR] Successfully parsed raw body");
      } catch (parseError) {
        console.error("[DHR] Failed to parse raw body:", parseError.message);
      }
    }

    if (!requestBody) {
      return res.status(400).json({
        error: "Request body is missing or invalid",
        bodyType: typeof req.body,
        hasRawBody: !!req.rawBody
      });
    }

    const { audio, sourceLanguage, targetLanguage } = requestBody;

    console.log("[DHR] Request data:", {
      hasAudio: !!audio,
      audioLength: audio?.length || 0,
      sourceLanguage,
      targetLanguage
    });

    if (!audio) {
      return res.status(400).json({ error: "Audio data is required" });
    }

    // Validate base64 audio data
    if (typeof audio !== 'string' || audio.length < 100) {
      return res.status(400).json({ error: "Invalid audio data format" });
    }

    const sourceLangName = languageMap[sourceLanguage] || sourceLanguage;
    const targetLangName = languageMap[targetLanguage] || targetLanguage;

    // Check for GEMINI_API_KEY
    const apiKey = process.env.GEMINI_API_KEY; 
    if (!apiKey) {
      console.error("[GEMINI] API key not found in environment variables.");
      return res.status(500).json({ error: "Server configuration error: Gemini API key is missing." });
    }

    // Enhanced text prompt for better results
    const textPrompt = `You are a professional translator and transcription service. 

Please:
1. Listen to the audio carefully
2. Transcribe what is spoken (preserve the original language as much as possible)
3. Translate the transcribed text into ${targetLangName}

Please respond in the following exact JSON format:
{
  "original": "the transcribed text in the original language",
  "translated": "the translation in ${targetLangName}"
}

If the audio contains multiple languages or cannot be understood, indicate this in your response.`;

    // Try multiple models for better compatibility
    const models = [
      "gemini-1.5-flash", 
      "gemini-2.0-flash-exp",
      "gemini-1.5-pro"
    ];

    let lastError = null;
    
    for (const model of models) {
      try {
        console.log(`[GEMINI] Trying model: ${model}`);
        
        const combinedResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": apiKey,
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: textPrompt }, 
                    {
                      inlineData: {
                        mimeType: "audio/webm",
                        data: audio, 
                      },
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 1000,
                topP: 0.8,
                topK: 40,
              },
            }),
          }
        );

        if (!combinedResponse.ok) {
          const errorData = await combinedResponse.json();
          if (combinedResponse.status === 429) {
            return res.status(429).json({ error: "API rate limit exceeded. Please try again in a moment." });
          }
          
          const errorMessage = errorData.error?.message || "Unknown API error";
          console.error(`[GEMINI] API Error (${combinedResponse.status}): ${errorMessage}`);
          lastError = new Error(`Gemini API Request failed: ${errorMessage}`);
          continue; // Try next model
        }

        const responseData = await combinedResponse.json();
        const resultText = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "";

        if (!resultText) {
          throw new Error("Empty response from Gemini API");
        }

        console.log("[GEMINI] Raw response:", resultText);
        
        // Parse the response
        const result = parseGeminiResponse(resultText);
        
        if (!result.original || !result.translated) {
          throw new Error("Invalid response structure");
        }

        console.log("[GEMINI] Successfully parsed:", result);
        
        return res.json({
          original: result.original,
          translated: result.translated,
        });
        
      } catch (modelError) {
        console.error(`[GEMINI] Model ${model} failed:`, modelError);
        lastError = modelError;
        continue; // Try next model
      }
    }

    // If all models failed, return the last error
    throw lastError || new Error("All Gemini models failed to process the request");
    
  } catch (error) {
    console.error("[DHR] Translation request failed:", error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : "An unknown error occurred during translation.",
      details: "Please check your audio quality and try again. Ensure you have a stable internet connection."
    });
  }
};

// Map the controller function to the route
router.post("/", translateVoice);

// Use ES Module export syntax
export default router;