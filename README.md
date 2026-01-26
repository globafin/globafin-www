# GlobaFin WWW

> A modern financial web platform featuring advanced loan calculation logic, built for speed and scalability.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

## Context

**GlobaFin WWW** is the customer-facing web application for GlobaFin services. It provides a seamless interface for users to explore financial products, calculate loan repayment schedules, and manage their applications.

The core of this project functionality revolves around its precise **Loan Calculator**, capable of handling complex fee structures for multiple loan products, specifically **CAGD Loans** and **PremiumShield Insurance Loans** (with optional **Motor Policy** coverage).

## Features

* **Advanced Loan Calculator:** Real-time logic for various loan types with tiered interest rates and detailed fee breakdowns.
* **Dynamic Content:** Integrated with **Sanity CMS** for flexible content management.
* **Interactive UI:** Polished user experience using **Radix UI** primitives and **Framer Motion** animations.
* **Robust Backend:** Leveraging **Firebase** for authentication and data services.
* **Modern Stack:** Built on **Next.js 15 (App Router)** for performance and SEO.

## Tech Stack

* **Framework:** Next.js 15
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4, clsx, tailwind-merge
* **UI Components:** Radix UI, Lucide React, Sonner (Toasts)
* **Animations:** Framer Motion
* **CMS:** Sanity.io
* **Backend:** Firebase
* **Utilities:** ua-parser-js, js-cookie, nodemailer

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* Node.js (LTS recommended)
* npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-org/globafin-www.git
    cd globafin-www
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    ```

3. **Configure Environment:**
    Create a `.env.local` file in the root and add your environment variables (Firebase, Sanity, etc.).

4. **Run Development Server:**

    ```bash
    npm run dev
    ```

OPEN [http://localhost:3000](http://localhost:3000) to view the application.

## Documentation

For detailed information on the business logic powering the financial tools, refer to the internal documentation:

* [Loan Calculator Logic](./LOAN_CALCULATOR_LOGIC.md) - Deep dive into formulas for CAGD Loans, PremiumShield Insurance Loans, and Motor Policy sticker fees.

## Key Commands

* `npm run dev`: Start the dev server.
* `npm run build`: Build for production.
* `npm run start`: Start production server.
* `npm run lint`: Run ESLint.

---

© 2026 GlobaFin. All rights reserved.
