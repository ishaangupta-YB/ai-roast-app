# Roastify - AI-Powered Profile Roasting Platform

<div align="center">
  <img src="public/logo.png" alt="Roastify Logo" width="200"/>
  <h3>Unleash brutal, AI-powered roasts on profiles and resumes.</h3>
  <p>We're talking no-holds-barred, laugh-till-you-cry roasts that'll leave your friends begging for mercy.</p>
</div>

## 🔥 About Roastify

Roastify is a cutting-edge web application that uses AI to generate humorous, critical feedback ("roasts") on various profiles and content. Whether you want to roast a GitHub profile, LeetCode performance, or a resume, Roastify provides personalized, witty, and entertaining critiques.

## ✨ Features

- **GitHub Profile Roasting**: Analyzes GitHub profiles, repositories, contributions, and coding patterns to create personalized roasts
- **LeetCode Profile Roasting**: Evaluates LeetCode profiles and performance to generate humorous critiques
- **Resume Roasting**: Upload your resume and receive feedback that's both amusing and potentially helpful
- **Customizable Tone**: Choose from multiple roast tones, from soft-hearted to absolutely brutal
- **Role Selection**: Select different AI personas for varied roasting styles
- **Multiple Languages**: Get roasted in your language of choice
- **User Dashboard**: Track your roast history and manage your account
- **Credit System**: Free credits to start, with subscription options for power users

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Form Handling**: React Dropzone for file uploads

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **AI Integration**: OpenAI API, Google Generative AI
- **File Processing**: PDF parsing for resumes

### DevOps
- **Deployment**: Vercel
- **Package Management**: npm

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- Clerk account for authentication
- OpenAI API key and/or Google AI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/roastify.git
   cd roastify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/roastify"
   
   # Clerk Auth
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   
   # Google AI (Optional)
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage

1. **Sign Up/Login**: Create an account or log in
2. **Dashboard**: Navigate to your dashboard to view available roast options
3. **Choose Roast Type**: Select GitHub, LeetCode, or Resume roasting
4. **Enter Profile Info**: Enter the username or upload a resume
5. **Customize Roast**: Select tone, role, and language options
6. **Generate Roast**: Wait for the AI to craft a personalized roast
7. **View Results**: Read, save, or share your roast

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Built by [Ishaan Gupta](https://github.com/ishaangupta-yb)
- AI powered by OpenAI and Google Generative AI
- UI components from [shadcn/ui](https://ui.shadcn.com/)

---

<div align="center">
  <p>Have fun roasting your friends! 🔥</p>
  <p>
    <a href="https://github.com/ishaangupta-yb">GitHub</a> •
    <a href="https://www.linkedin.com/in/ishaangupta1201">LinkedIn</a>
  </p>
</div>
