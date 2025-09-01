import { useState } from 'react'
import OpenAI from 'openai'

export function useSequenceAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || import.meta.env.VITE_OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  })

  const analyzeSequence = async (file) => {
    setIsAnalyzing(true)
    
    try {
      // Read the FASTA file
      const fileContent = await readFileContent(file)
      
      // Extract sequences from FASTA format
      const sequences = parseFastaFile(fileContent)
      
      if (sequences.length === 0) {
        throw new Error('No valid sequences found in FASTA file')
      }

      // Simulate SNP detection (in a real app, this would be more sophisticated)
      const detectedSNPs = simulateSNPDetection(sequences[0])
      
      // Generate AI predictions
      const predictions = await generateTraitPredictions(detectedSNPs)
      
      return predictions
      
    } catch (error) {
      console.error('Sequence analysis failed:', error)
      throw error
    } finally {
      setIsAnalyzing(false)
    }
  }

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(e)
      reader.readAsText(file)
    })
  }

  const parseFastaFile = (content) => {
    const lines = content.split('\n')
    const sequences = []
    let currentSequence = { header: '', sequence: '' }
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.startsWith('>')) {
        if (currentSequence.sequence) {
          sequences.push(currentSequence)
        }
        currentSequence = { header: trimmed, sequence: '' }
      } else if (trimmed) {
        currentSequence.sequence += trimmed
      }
    }
    
    if (currentSequence.sequence) {
      sequences.push(currentSequence)
    }
    
    return sequences
  }

  const simulateSNPDetection = (sequence) => {
    // Simulate finding SNPs in the sequence
    // In a real app, this would involve actual bioinformatics analysis
    const mockSNPs = [
      { position: 'rs1815739', variant: 'C/T', trait: 'muscle fiber composition' },
      { position: 'rs53576', variant: 'G/A', trait: 'social behavior' },
      { position: 'rs4988235', variant: 'C/T', trait: 'lactose tolerance' },
      { position: 'rs1229984', variant: 'A/G', trait: 'alcohol metabolism' },
      { position: 'rs7903146', variant: 'C/T', trait: 'diabetes risk' }
    ]
    
    // Randomly select some SNPs to simulate detection
    return mockSNPs.slice(0, Math.floor(Math.random() * 3) + 2)
  }

  const generateTraitPredictions = async (snps) => {
    const predictions = []
    
    for (const snp of snps) {
      try {
        const response = await openai.chat.completions.create({
          model: "google/gemini-2.0-flash-001",
          messages: [
            {
              role: "system",
              content: "You are a fun genetics interpreter. Create entertaining, scientifically-inspired trait predictions based on genetic markers (SNPs). Make them engaging but include disclaimers that these are for entertainment purposes. Keep responses under 150 words."
            },
            {
              role: "user",
              content: `Generate a fun trait prediction for SNP ${snp.position} (${snp.variant}) related to ${snp.trait}. Make it entertaining but scientifically grounded.`
            }
          ],
          max_tokens: 200,
          temperature: 0.8
        })

        const prediction = response.choices[0]?.message?.content || "Unable to generate prediction for this trait."
        
        predictions.push({
          traitName: snp.trait.charAt(0).toUpperCase() + snp.trait.slice(1),
          prediction: prediction,
          confidenceScore: Math.random() * 0.6 + 0.3, // Random confidence between 0.3 and 0.9
          generatedAt: new Date().toISOString(),
          snpInfo: snp
        })
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (error) {
        console.error('Failed to generate prediction for', snp.trait, error)
        // Fallback prediction
        predictions.push({
          traitName: snp.trait.charAt(0).toUpperCase() + snp.trait.slice(1),
          prediction: `Based on your genetic variant ${snp.variant}, you may have interesting traits related to ${snp.trait}. This is for entertainment purposes only and not medical advice.`,
          confidenceScore: 0.5,
          generatedAt: new Date().toISOString(),
          snpInfo: snp
        })
      }
    }
    
    return predictions
  }

  return { analyzeSequence, isAnalyzing }
}