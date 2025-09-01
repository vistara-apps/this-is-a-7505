import { useState } from 'react';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

// Common SNP patterns for demonstration
const SNP_PATTERNS = {
  'rs7411': {
    name: 'Baldness Predisposition',
    description: 'Associated with male pattern baldness'
  },
  'rs9939609': {
    name: 'Belly Fat Tendency',
    description: 'Linked to increased abdominal fat storage'
  },
  'rs12917707': {
    name: 'Sinus Issues',
    description: 'Associated with chronic sinusitis susceptibility'
  },
  'rs1801133': {
    name: 'Folate Processing',
    description: 'Affects how your body processes folate'
  },
  'rs429358': {
    name: 'Memory Function',
    description: 'Related to cognitive function and memory'
  }
};

export function useFastaAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [traitPredictions, setTraitPredictions] = useState([]);
  const [error, setError] = useState(null);

  const scanForSNPs = (fastaContent) => {
    // This is a simplified SNP detection simulation
    // In a real app, this would involve complex bioinformatics algorithms
    const detectedSNPs = [];
    const content = fastaContent.toUpperCase();
    
    // Simulate SNP detection based on sequence patterns
    if (content.includes('ATCGATCG')) {
      detectedSNPs.push('rs7411');
    }
    if (content.includes('GCTAGCTA')) {
      detectedSNPs.push('rs9939609');
    }
    if (content.includes('TAGCTAG')) {
      detectedSNPs.push('rs12917707');
    }
    if (content.includes('CGATCGAT')) {
      detectedSNPs.push('rs1801133');
    }
    if (content.includes('ATGCATGC')) {
      detectedSNPs.push('rs429358');
    }

    // Always return at least 2-3 SNPs for demo purposes
    if (detectedSNPs.length === 0) {
      detectedSNPs.push('rs7411', 'rs9939609', 'rs12917707');
    }

    return detectedSNPs;
  };

  const generateAIPrediction = async (snp, snpInfo) => {
    try {
      const prompt = `Generate a fun, engaging, and informative trait prediction for the SNP ${snp} (${snpInfo.name}). 
      
      Context: ${snpInfo.description}
      
      Requirements:
      - Be scientifically grounded but accessible
      - Keep it light and entertaining 
      - Include actionable insights or interesting facts
      - Be 2-3 sentences long
      - Don't make definitive medical claims
      - Focus on the "fun factor" while being informative
      
      Example tone: "Your genetic markers suggest you might be more prone to [trait]. This doesn't mean it's inevitable, but [interesting fact or tip]."`;

      const response = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "system",
            content: "You are a friendly genetic counselor who explains DNA insights in an engaging, fun way while being scientifically accurate."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI API error:', error);
      // Fallback predictions if API fails
      const fallbacks = {
        'rs7411': "Your genetic markers show patterns associated with hair follicle sensitivity. While this might influence hair thickness over time, lifestyle factors like stress management and nutrition play equally important roles in hair health!",
        'rs9939609': "Your DNA suggests a tendency to store energy efficiently around the midsection. This ancient survival advantage means you might need to be more mindful of portion sizes, but it also means you're genetically equipped to survive famines!",
        'rs12917707': "Your genetic profile indicates potential sinus sensitivity patterns. This might mean you're more aware of environmental changes - like a human barometer! Consider this your superpower for predicting weather changes.",
        'rs1801133': "Your genetic markers affect how efficiently you process certain B vitamins. This means you might benefit more from leafy greens and could be naturally inclined toward a Mediterranean-style diet!",
        'rs429358': "Your DNA shows interesting patterns related to cognitive processing. This might mean you have a unique thinking style or memory formation pattern - your brain could be optimized for certain types of learning!"
      };
      
      return fallbacks[snp] || "Your genetic markers show unique patterns that make you distinctly you! This variation contributes to the amazing diversity of human traits.";
    }
  };

  const analyzeFasta = async (file) => {
    setIsAnalyzing(true);
    setError(null);
    setTraitPredictions([]);

    try {
      // Read file content
      const content = await file.text();
      
      // Scan for SNPs
      const detectedSNPs = scanForSNPs(content);
      
      // Generate AI predictions for each SNP
      const predictions = [];
      
      for (const snp of detectedSNPs) {
        const snpInfo = SNP_PATTERNS[snp];
        if (snpInfo) {
          try {
            const aiPrediction = await generateAIPrediction(snp, snpInfo);
            predictions.push({
              traitName: snpInfo.name,
              prediction: aiPrediction,
              confidenceScore: 0.6 + Math.random() * 0.3, // Random score between 0.6-0.9
              generatedAt: new Date().toLocaleString(),
              snpId: snp
            });
          } catch (err) {
            console.error(`Error generating prediction for ${snp}:`, err);
          }
        }
      }

      if (predictions.length === 0) {
        throw new Error('No genetic markers could be analyzed from this sequence.');
      }

      setTraitPredictions(predictions);
    } catch (err) {
      setError(err.message || 'Failed to analyze genetic sequence. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    traitPredictions,
    error,
    analyzeFasta
  };
}