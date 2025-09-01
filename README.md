# GeneGlow - DNA Traits Predictor

Unlock Your DNA's Fun Secrets with AI-powered genetic analysis.

## Features

- 🧬 FASTA sequence upload and validation
- 🔍 SNP pattern detection
- 🤖 AI-powered trait predictions via OpenAI
- 💳 Crypto payments via x402 platform
- 📊 Personalized trait reports
- 🎨 Modern dark UI with smooth animations

## Quick Start

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Set up environment variables:
```bash
cp .env.example .env
# Add your OpenAI API key to .env
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Usage

1. Connect your crypto wallet
2. Upload a FASTA genetic sequence file
3. Pay $0.50 for trait analysis
4. Receive AI-generated fun trait predictions

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- RainbowKit + Wagmi (Web3)
- OpenAI API (via OpenRouter)
- x402 payments
- Lucide React icons

## File Format

Supports FASTA files (.fasta, .fa, .fas, .txt) with standard genetic sequence format:

```
>Sequence_Name
ATCGATCGATCGATCG...
```

## Security

- Genetic data is processed client-side only
- No sequence data is stored on servers
- Secure crypto payments via x402
- Wallet connection via RainbowKit

## License

MIT License