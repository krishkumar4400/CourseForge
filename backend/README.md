<div align="center">

<h1>⚡ CourseForge</h1>

<p><strong>A production-grade Learning Management System — create, sell, and learn at scale.</strong></p>

<p>
  <a href="#"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" /></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" /></a>
  <a href="#"><img src="https://img.shields.io/badge/PostgreSQL-Neon-green?style=for-the-badge&logo=postgresql" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Razorpay-Payment-0C2451?style=for-the-badge&logo=razorpay" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker" /></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" /></a>
</p>

<p>
  <a href="#demo">Live Demo</a> ·
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#getting-started">Get Started</a> ·
  <a href="#deployment">Deploy</a>
</p>

</div>

---

## 📖 Overview

**CourseForge** is a full-stack, production-ready Learning Management System inspired by Udemy — built from scratch as a deep portfolio project. It supports three roles: **Students**, **Instructors**, and **Admins**, with a complete course lifecycle from creation to purchase to completion tracking.

This project demonstrates real-world engineering practices: role-based access control, webhook-secured payment flows, video streaming, server-side rendering, CI/CD pipelines, and containerized deployment.

> Built by [Krish](https://github.com/yourusername) · Open to contributions

---

## 🚀 Live Demo

| Role       | URL                          | Credentials                          |
|------------|------------------------------|---------------------------------------|
| Student    | <https://courseforge.vercel.app> | <demo-student@courseforge.dev> / Demo@123 |
| Instructor | <https://courseforge.vercel.app> | <demo-instructor@courseforge.dev> / Demo@123 |
| Admin      | <https://courseforge.vercel.app/admin> | <demo-admin@courseforge.dev> / Demo@123 |

> ⚠️ Demo uses Razorpay test mode — no real charges apply.

---

## ✨ Features

### 👩‍🎓 Student

- Browse, search, and filter courses by category, price, and rating
- Secure course purchase via Razorpay (UPI, cards, netbanking) + Stripe (international)
- Video-based lesson player with progress tracking
- Certificate generation on course completion
- Dashboard with enrolled courses, progress, and bookmarks
- Course reviews and ratings
- Email notifications (enrollment confirmation, payment receipt)

### 👨‍🏫 Instructor

- Rich course builder: sections, lessons, attachments, quizzes
- Video upload with automatic Cloudinary/Mux transcoding
- Course pricing, discount coupons, and free preview control
- Instructor analytics: revenue, enrollments, completion rates
- Payout management (integrated with Razorpay Payouts API)
- Draft/Published course toggle with review workflow

### 🛡️ Admin

- Platform-wide dashboard: total users, revenue, course activity
- Course moderation: approve, reject, or flag instructor content
- User management: ban, promote, or demote users
- Category and tag management
- Platform fee configuration
- Audit logs for all critical actions

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| Next.js 15 (App Router) | Full-stack framework, SSR, RSC |
| TypeScript | Type safety end-to-end |
| Tailwind CSS + shadcn/ui | Styling and component library |
| Zustand | Client-side state management |
| React Hook Form + Zod | Form handling and validation |
| React Player / Mux Player | Video streaming UI |
| TanStack Query | Server state, caching, background sync |

### Backend

| Technology | Purpose |
|------------|---------|
| Next.js API Routes | REST API endpoints |
| Auth.js v5 | Authentication (credentials + OAuth) |
| Prisma ORM | Type-safe database access |
| NeonDB (PostgreSQL) | Serverless relational database |
| Redis (Upstash) | Session caching, rate limiting |
| pgvector | Semantic course search |
| Zod | Server-side schema validation |

### Infrastructure & DevOps

| Technology | Purpose |
|------------|---------|
| Docker + Docker Compose | Local dev environment & containerization |
| GitHub Actions | CI/CD pipeline |
| Vercel | Frontend + API deployment |
| Cloudinary | Image and video storage, transcoding |
| Razorpay | Indian payment gateway (UPI, cards) |
| Stripe | International payment gateway |
| Resend | Transactional email delivery |
| Terraform | Infrastructure as Code (optional) |

---

## 🗺 System Architecture

```
┌─────────────────────────────────────────────────────┐
│                     Client (Browser)                │
│         Next.js App Router (RSC + Client)           │
└─────────────────────┬───────────────────────────────┘
                      │  HTTP / WebSocket
┌─────────────────────▼───────────────────────────────┐
│              Next.js API Routes (/api/*)             │
│   Auth.js ── Middleware ── Rate Limiter (Redis)      │
└──────┬──────────────┬───────────────────┬────────────┘
       │              │                   │
┌──────▼──────┐ ┌─────▼──────┐  ┌────────▼────────┐
│  Prisma ORM │ │ Cloudinary │  │ Razorpay/Stripe  │
│   NeonDB    │ │  (Media)   │  │  (Payments)      │
│ PostgreSQL  │ └────────────┘  └─────────┬────────┘
└─────────────┘                           │
                                  ┌───────▼────────┐
                                  │ Webhook Handler │
                                  │  /api/webhook   │
                                  └────────────────┘
```

---

## 📁 Project Structure

```
courseforge/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth pages (login, register)
│   ├── (dashboard)/
│   │   ├── student/              # Student dashboard & course player
│   │   ├── instructor/           # Instructor course builder
│   │   └── admin/                # Admin panel
│   ├── (marketing)/              # Public pages (home, explore, pricing)
│   ├── api/
│   │   ├── auth/                 # Auth.js route handlers
│   │   ├── courses/              # Course CRUD
│   │   ├── enrollments/          # Enrollment management
│   │   ├── payments/             # Payment initiation
│   │   └── webhooks/
│   │       ├── razorpay/         # Razorpay webhook handler
│   │       └── stripe/           # Stripe webhook handler
│   └── layout.tsx
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   ├── course/                   # Course cards, player, builder
│   ├── dashboard/                # Dashboard widgets
│   └── shared/                   # Navbar, footer, sidebar
├── lib/
│   ├── auth.ts                   # Auth.js config
│   ├── db.ts                     # Prisma client singleton
│   ├── redis.ts                  # Upstash Redis client
│   ├── razorpay.ts               # Razorpay SDK setup
│   ├── stripe.ts                 # Stripe SDK setup
│   ├── cloudinary.ts             # Cloudinary config
│   ├── mail.ts                   # Resend email client
│   └── validations/              # Zod schemas
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Migration history
├── hooks/                        # Custom React hooks
├── store/                        # Zustand stores
├── types/                        # Global TypeScript types
├── middleware.ts                 # Route protection middleware
├── .github/
│   └── workflows/
│       ├── ci.yml                # Lint, type-check, test on PR
│       └── deploy.yml            # Deploy on merge to main
├── docker-compose.yml            # Local dev stack
├── Dockerfile                    # Production image
└── terraform/                    # IaC for cloud infra (optional)
```

---

## 🗃 Database Schema (Overview)

```prisma
// Key models — full schema in prisma/schema.prisma

model User {
  id            String       @id @default(cuid())
  name          String
  email         String       @unique
  role          Role         @default(STUDENT)   // STUDENT | INSTRUCTOR | ADMIN
  enrollments   Enrollment[]
  courses       Course[]     @relation("InstructorCourses")
  // ...
}

model Course {
  id            String       @id @default(cuid())
  title         String
  slug          String       @unique
  price         Float
  isPublished   Boolean      @default(false)
  instructor    User         @relation("InstructorCourses", fields: [instructorId], references: [id])
  sections      Section[]
  enrollments   Enrollment[]
  // ...
}

model Enrollment {
  id            String       @id @default(cuid())
  student       User         @relation(fields: [studentId], references: [id])
  course        Course       @relation(fields: [courseId], references: [id])
  paymentId     String
  completedAt   DateTime?
  // ...
}

model Payment {
  id            String       @id @default(cuid())
  razorpayId    String?      @unique
  stripeId      String?      @unique
  amount        Float
  currency      String       @default("INR")
  status        PaymentStatus
  // CREATED | CAPTURED | FAILED | REFUNDED
}
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 20
- Docker & Docker Compose
- A [NeonDB](https://neon.tech) account
- A [Razorpay](https://razorpay.com) account (test mode)
- A [Cloudinary](https://cloudinary.com) account
- A [Resend](https://resend.com) account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/courseforge.git
cd courseforge

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start local services (PostgreSQL + Redis via Docker)
docker-compose up -d

# 5. Push database schema and seed data
npx prisma db push
npx prisma db seed

# 6. Start the development server
npm run dev
```

App runs at `http://localhost:3000`

---

## 🔐 Environment Variables

Create `.env.local` from `.env.example`:

```env
# ─── App ──────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# ─── Database ─────────────────────────────────────
DATABASE_URL="postgresql://..."          # NeonDB connection string
DATABASE_URL_UNPOOLED="postgresql://..." # For Prisma migrations

# ─── Auth (Auth.js v5) ────────────────────────────
AUTH_SECRET="your-super-secret-32-char-string"
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."

# ─── Razorpay (Primary — India) ───────────────────
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."
RAZORPAY_WEBHOOK_SECRET="..."
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."

# ─── Stripe (International) ───────────────────────
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# ─── Cloudinary ───────────────────────────────────
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# ─── Redis (Upstash) ──────────────────────────────
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."

# ─── Email (Resend) ───────────────────────────────
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@courseforge.dev"

# ─── Platform Config ──────────────────────────────
PLATFORM_FEE_PERCENT=20     # Platform cut from course sales
```

---

## 💳 Payment Gateway Setup

### Razorpay (Primary — Recommended for India)

CourseForge uses a secure **Order → Verify** flow:

```
Student clicks "Buy" 
  → POST /api/payments/razorpay/create-order   (creates Razorpay order server-side)
  → Razorpay Checkout opens in browser
  → Student pays (UPI / Card / Netbanking)
  → Razorpay sends payment_id + signature to client
  → POST /api/payments/razorpay/verify          (HMAC-SHA256 signature verification)
  → On success → enrollment created in DB
  → Webhook /api/webhooks/razorpay               (idempotent backup confirmation)
```

**Why webhook + verify?** The client-side callback can be tampered with. Signature verification on the server is the source of truth. Webhooks handle edge cases (browser crash after payment).

### Stripe (International)

Uses **Stripe Checkout Sessions** with webhook fulfillment:

```
Student clicks "Buy"
  → POST /api/payments/stripe/create-session    (creates Stripe Checkout session)
  → Redirect to Stripe-hosted checkout page
  → On success → Stripe sends checkout.session.completed webhook
  → POST /api/webhooks/stripe                   (verify event, create enrollment)
```

---

## 🔒 Security Practices

- **Webhook signature verification** on all Razorpay and Stripe events — raw body preserved with `bodyParser: false`
- **RBAC middleware** on all protected routes via Auth.js + Next.js middleware
- **Rate limiting** on auth and payment endpoints via Upstash Redis
- **CSRF protection** via Auth.js built-in CSRF tokens
- **Input validation** with Zod on every API route — never trust client data
- **SQL injection prevention** via Prisma parameterized queries
- **Secrets never exposed** to the client — all payment keys are server-only
- **Content Security Policy** headers configured in `next.config.js`
- **HTTPS enforced** in production via Vercel

---

## 🧪 Testing

```bash
# Unit tests (Vitest)
npm run test

# Integration tests
npm run test:integration

# E2E tests (Playwright)
npm run test:e2e

# Type checking
npm run type-check

# Lint
npm run lint
```

Test coverage targets:

- Payment flows: **100%** (critical path)
- Auth flows: **100%**
- Course CRUD: **80%+**

---

## 🐳 Docker

### Development

```bash
# Start all local services
docker-compose up -d

# Services started:
# - PostgreSQL (port 5432)
# - Redis      (port 6379)
```

### Production Build

```bash
# Build production image
docker build -t courseforge .

# Run container
docker run -p 3000:3000 --env-file .env.local courseforge
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set all environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Railway / Render

Use the provided `Dockerfile`. Set environment variables in the platform dashboard. Attach a PostgreSQL addon or point `DATABASE_URL` to NeonDB.

### GitHub Actions CI/CD

The `.github/workflows/ci.yml` pipeline runs on every PR:

1. Type check (`tsc --noEmit`)
2. Lint (`eslint`)
3. Unit tests (`vitest`)
4. Build check (`next build`)

The `.github/workflows/deploy.yml` pipeline runs on merge to `main`:

1. All CI checks
2. Prisma migration (`prisma migrate deploy`)
3. Deploy to Vercel

---

## ✅ Production Checklist

- [ ] Switch Razorpay to **live mode** (update key IDs)
- [ ] Switch Stripe to **live mode**
- [ ] Set `NODE_ENV=production`
- [ ] Configure custom domain + HTTPS
- [ ] Set up Cloudinary upload presets for video size limits
- [ ] Configure Resend with verified domain
- [ ] Enable NeonDB connection pooling (`pgbouncer=true`)
- [ ] Set `AUTH_SECRET` to a cryptographically random 32+ char string
- [ ] Review and configure `PLATFORM_FEE_PERCENT`
- [ ] Set up error monitoring (Sentry)
- [ ] Configure uptime monitoring (Better Uptime / UptimeRobot)
- [ ] Enable Vercel Web Analytics

---

## 🗺 Roadmap

- [x] Core course creation and publishing flow
- [x] Razorpay payment integration
- [x] Stripe international payment
- [x] Progress tracking and certificates
- [ ] AI-powered course recommendations (pgvector + embeddings)
- [ ] Live cohort / batch learning (with scheduling)
- [ ] Mobile app (React Native / Expo)
- [ ] Instructor payout automation (Razorpay Payouts API)
- [ ] Multilingual support (Hindi, English)
- [ ] Offline video download for mobile

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) first.

```bash
# Fork → Clone → Branch
git checkout -b feat/your-feature-name

# Make changes → Commit (follow Conventional Commits)
git commit -m "feat: add coupon code support"

# Push → Open PR
git push origin feat/your-feature-name
```

Commit convention: `feat:` `fix:` `chore:` `docs:` `refactor:` `test:`

---

## 📄 License

MIT License © 2025 [Krish](https://github.com/yourusername)

See [LICENSE](LICENSE) for full text.

---

<div align="center">
  <p>Built with ❤️ using Next.js · Star ⭐ if this helped you</p>
  <p>
    <a href="https://twitter.com/yourusername">Twitter</a> ·
    <a href="https://linkedin.com/in/yourusername">LinkedIn</a> ·
    <a href="https://github.com/yourusername">GitHub</a>
  </p>
</div>
