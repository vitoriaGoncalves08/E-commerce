# 🛍️ E-commerce Platform

![Banner Image](bewear-bootcamp/public/banner-01.png)

A modern, full-featured e-commerce platform built with Next.js 13+ and the latest web technologies. This project showcases a complete online store with product listings, shopping cart, checkout process, and more.

## ✨ Features

- 🛒 Shopping cart functionality
- 🔍 Product search and filtering
- 📱 Responsive design for all devices
- ⚡ Fast page loads with Next.js 13+ App Router
- 🔄 Real-time updates with React Query
- 💳 Secure checkout with Stripe integration
- 🌓 Light/Dark mode support
- 📝 Form validation with React Hook Form and Zod

## 🚀 Tech Stack

- **Frontend:**
  - Next.js 13+ (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS
  - Radix UI Components
  - React Hook Form + Zod
  - TanStack Query
  - Next Themes

- **Backend:**
  - Next.js API Routes
  - Drizzle ORM
  - PostgreSQL
  - Stripe (Payments)
  - Better Auth (Authentication)

- **Development Tools:**
  - ESLint
  - Prettier
  - TypeScript
  - Husky (Git Hooks)

## 🏗️ Project Structure

```
bewear-bootcamp/
├── src/
│   ├── app/                    # App Router pages
│   ├── components/             # Reusable UI components
│   ├── data/                   # Data fetching and database queries
│   ├── lib/                    # Utility functions and configurations
│   └── styles/                 # Global styles
├── public/                     # Static assets
└── .env.local                  # Environment variables
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- PostgreSQL database
- Stripe account (for payments)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bewear-bootcamp.git
   cd bewear-bootcamp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/your_database
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run database migrations:
   ```bash
   npx drizzle-kit push:pg
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Screenshots

![Home Page](public/screenshot-home.png)
*Home page with featured products*

![Product Page](public/screenshot-product.png)
*Product details page*

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Stripe Documentation](https://stripe.com/docs)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
