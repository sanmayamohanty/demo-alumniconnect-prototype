# PRD — Phase 1: Alumni Connect Portal · Clickable Prototype

**Product:** Alumni Connect  
**Program:** GuruDakshina (donation drive)  
**Purpose:** Fully clickable prototype for stakeholder presentations  
**Hosting:** Cloudflare Pages (static deploy via Wrangler CLI)  
**Status:** Phase 1 — no backend, all mock data, full click flow

---

## 1. Goals

Build a pixel-perfect, fully navigable prototype of the Alumni Connect portal. All screens must be clickable and linked. The prototype will be presented to senior government officials and institutional stakeholders. It must look and feel indistinguishable from the real product.

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 18 + Vite | `npm create vite@latest alumni-connect -- --template react` |
| Routing | React Router v6 | Hash-based routing (`HashRouter`) for Cloudflare Pages compatibility |
| Styling | Tailwind CSS v3 | Custom design tokens in `tailwind.config.js` |
| Animations | Framer Motion | Page transitions and micro-interactions |
| Icons | Lucide React | `lucide-react` package |
| Charts | Recharts | Leaderboard chart only |
| Build | Vite | Output to `dist/` |
| Deploy | Cloudflare Pages via Wrangler CLI | `wrangler pages deploy dist` |

---

## 3. Project Structure

```
alumni-connect/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── logo.png          ← AGENT: This file will be added by the human. Use it in Navbar and Footer.
│   │                            If missing, fall back to a styled text badge showing the institution
│   │                            abbreviation (e.g. "GIT") in the accent gold color.
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   └── Footer.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Toggle.jsx
│   │   │   ├── StatsBar.jsx
│   │   │   ├── PrototypeBadge.jsx
│   │   │   └── ScreenNavigator.jsx
│   │   └── features/
│   │       ├── DonationCard.jsx
│   │       ├── AlumniCard.jsx
│   │       ├── LeaderboardRow.jsx
│   │       ├── ShareCard.jsx
│   │       └── ProgramCard.jsx
│   ├── pages/
│   │   ├── public/
│   │   │   ├── HomePage.jsx
│   │   │   ├── SignInPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   └── ForgotPasswordPage.jsx
│   │   ├── dashboard/
│   │   │   ├── DashboardHome.jsx
│   │   │   ├── MyProfile.jsx
│   │   │   ├── AlumniDirectory.jsx
│   │   │   ├── CommunityHub.jsx
│   │   │   ├── SupportAlmaMater.jsx
│   │   │   └── Leaderboard.jsx
│   │   ├── post-payment/
│   │   │   └── DonationSuccess.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── UserManagement.jsx
│   │       ├── CampaignBuilder.jsx
│   │       ├── CommunityManager.jsx
│   │       ├── LeaderboardAdmin.jsx
│   │       ├── ContentManager.jsx
│   │       ├── Integrations.jsx
│   │       └── BrandingTheme.jsx
│   ├── data/
│   │   └── mockData.js         ← All mock alumni, stats, leaderboard data
│   ├── context/
│   │   └── AppContext.jsx       ← Global state: current user, demo mode flag
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
├── package.json
└── _redirects                  ← Cloudflare Pages SPA fallback (contents: /* /index.html 200)
```

---

## 4. Design System

### 4.1 Colour Tokens — add to `tailwind.config.js`

```js
colors: {
  primary:   '#1A3A5C',   // Deep navy — brand primary
  accent:    '#C49A22',   // Gold — CTAs, highlights
  light:     '#EEF3F9',   // Navy tint — subtle backgrounds
  surface:   '#F5F7FA',   // Page background
  admin:     '#0E2234',   // Admin panel dark navy
  'primary-dark': '#0F2238', // Footer / darker navy
}
```

### 4.2 Typography

- **Font:** Import `Sora` (headings) and `DM Sans` (body) from Google Fonts in `index.css`
- **Heading sizes:** 40px hero, 28px section h2, 18px card h3, 14px label
- **Body:** 14px regular, 12px small, 10px micro

### 4.3 Border Radius

- Cards: `rounded-xl` (12px)
- Buttons: `rounded-md` (8px)
- Badges/chips: `rounded-full`
- Inputs: `rounded-md`

### 4.4 Shadow

- Cards: `shadow-sm` with `border border-gray-100`
- Elevated (modals, dropdowns): `shadow-lg`

---

## 5. Logo Usage

```jsx
// In Navbar.jsx and Footer.jsx:
import logo from '../assets/logo.png'

// Usage:
{logo 
  ? <img src={logo} alt="Alumni Connect" className="h-9 w-auto" />
  : <div className="bg-accent text-white font-bold text-sm px-2 py-1 rounded-md">GIT</div>
}
```

The logo file path is `src/assets/logo.png`. If the human has placed a `.svg` file instead, also check for `logo.svg`. Use whichever exists. If neither exists, render the fallback badge.

---

## 6. Global Prototype Features

### 6.1 Demo Login

On the Sign In page, add a prominent "Enter as Demo User" button above the form.

```
[ Enter as Demo User — Arjun Kumar, Batch 2015 ]
```

Clicking it sets the demo user in context and navigates to `/dashboard`. No form fill required.

### 6.2 Prototype Mode Badge

A floating badge in the bottom-right corner of every screen:

```jsx
// PrototypeBadge.jsx
// Fixed position, bottom-right
// Shows: "🔧 Prototype Mode" in a pill badge
// Background: primary navy, text white, slight transparency
// Always on top (z-index 9999)
```

### 6.3 Screen Navigator

A floating button (bottom-left, `⊞` grid icon) that opens a drawer/modal listing all 19 screens grouped by zone. Clicking any screen navigates directly to it. This lets presentation viewers jump to any screen instantly.

```
Zone 1 — Public
  • Homepage
  • Sign In
  • Sign Up
  • Forgot Password

Zone 2 — Alumni Dashboard
  • Dashboard Home
  • My Profile
  • Alumni Directory
  • Community Hub
  • Support Alma Mater (GuruDakshina)
  • Leaderboard

Zone 3 — Post-Payment
  • Donation Success + Share Card

Zone 4 — Admin Panel
  • Admin Dashboard
  • User Management
  • Campaign Builder
  • Community Manager
  • Leaderboard & Stats
  • Content Manager
  • Integrations
  • Branding & Theme
```

---

## 7. Routing Structure

Use `HashRouter` from React Router v6. This ensures Cloudflare Pages serves correctly without server-side routing config.

```jsx
// App.jsx routes

/                          → HomePage
/signin                    → SignInPage
/signup                    → SignUpPage
/forgot-password           → ForgotPasswordPage

/dashboard                 → DashboardHome       (requires demoUser in context)
/dashboard/profile         → MyProfile
/dashboard/directory       → AlumniDirectory
/dashboard/community       → CommunityHub
/dashboard/give            → SupportAlmaMater
/dashboard/leaderboard     → Leaderboard

/donation-success          → DonationSuccess

/admin                     → AdminDashboard
/admin/users               → UserManagement
/admin/campaigns           → CampaignBuilder
/admin/community           → CommunityManager
/admin/leaderboard         → LeaderboardAdmin
/admin/content             → ContentManager
/admin/integrations        → Integrations
/admin/branding            → BrandingTheme
```

Dashboard and admin routes should check for `demoUser` in context. If not set, redirect to `/signin`.

---

## 8. Global State — `AppContext.jsx`

```js
{
  demoUser: {
    name: 'Arjun Kumar',
    initials: 'AK',
    batch: 2015,
    branch: 'Computer Science',
    rollNo: 'CS15B042',
    city: 'Hyderabad',
    employer: 'Google India',
    linkedin: 'linkedin.com/in/arjunkumar',
    whatsapp: '+91 98765 43210',
    facebook: 'facebook.com/arjunkumar',
    rank: 14,
    donated: 5000,
    mentees: 3,
    impactScore: 42,
    profileComplete: 65,
  },
  institution: {
    name: 'Greenfield Institute of Technology',
    shortName: 'GIT',
    primaryColor: '#1A3A5C',
    accentColor: '#C49A22',
    establishedYear: 1975,
  },
  donationAmount: null,      // Set after donation flow
  selectedCardStyle: 'wrapped', // 'wrapped' | 'story' | 'certificate'
}
```

---

## 9. Mock Data — `data/mockData.js`

### 9.1 Homepage Stats
```js
export const homeStats = [
  { value: '15,000+', label: 'Alumni worldwide' },
  { value: '42',      label: 'Countries' },
  { value: '48',      label: 'Batches (1975–2023)' },
  { value: '₹4.2 Cr', label: 'GuruDakshina raised' },
  { value: '320+',    label: 'Active mentors' },
]
```

### 9.2 Alumni Directory (12 mock alumni)
```js
export const mockAlumni = [
  { id:1, name:'Priya Krishnan',  initials:'PK', batch:2015, branch:'ECE', city:'Bangalore',  employer:'Amazon India', approved:true  },
  { id:2, name:'Rahul Sharma',    initials:'RS', batch:2014, branch:'CS',  city:'Hyderabad',  employer:'Microsoft',    approved:true  },
  { id:3, name:'Anjali Mehta',    initials:'AM', batch:2015, branch:'ME',  city:'Mumbai',     employer:'Tata Motors',  approved:true  },
  { id:4, name:'Vikram Nair',     initials:'VN', batch:2016, branch:'EEE', city:'Chennai',    employer:'L&T',          approved:true  },
  { id:5, name:'Swati Chopra',    initials:'SC', batch:2015, branch:'CS',  city:'Pune',       employer:'Infosys',      approved:true  },
  { id:6, name:'Arun Thomas',     initials:'AT', batch:2017, branch:'CS',  city:'Hyderabad',  employer:'—',            approved:false },
  { id:7, name:'Meena Iyer',      initials:'MI', batch:2013, branch:'ECE', city:'Bangalore',  employer:'Wipro',        approved:true  },
  { id:8, name:'Suresh Rao',      initials:'SR', batch:2012, branch:'CS',  city:'Hyderabad',  employer:'TCS',          approved:true  },
  { id:9, name:'Deepa Pillai',    initials:'DP', batch:2016, branch:'ME',  city:'Pune',       employer:'Mahindra',     approved:true  },
  { id:10,name:'Karthik Reddy',   initials:'KR', batch:2018, branch:'CS',  city:'Hyderabad',  employer:'Startups',     approved:false },
  { id:11,name:'Lakshmi Patel',   initials:'LP', batch:2014, branch:'EEE', city:'Ahmedabad',  employer:'Siemens',      approved:true  },
  { id:12,name:'Nitin Gupta',     initials:'NG', batch:2015, branch:'ME',  city:'Delhi',      employer:'Hero Moto',    approved:true  },
]
```

### 9.3 Leaderboard (10 mock entries)
```js
export const mockLeaderboard = [
  { rank:1,  initials:'SK', name:'Suresh Kapoor',  batch:2010, score:128, donated:25000, mentored:12, referred:14, events:8  },
  { rank:2,  initials:'PM', name:'Priya Mehta',    batch:2012, score:112, donated:20000, mentored:10, referred:12, events:7  },
  { rank:3,  initials:'VR', name:'Vijay Rao',      batch:2014, score:97,  donated:15000, mentored:8,  referred:9,  events:6  },
  { rank:4,  initials:'AR', name:'Anjali Rao',     batch:2011, score:84,  donated:12000, mentored:7,  referred:8,  events:5  },
  { rank:5,  initials:'MK', name:'Manoj Kumar',    batch:2013, score:76,  donated:10000, mentored:6,  referred:7,  events:6  },
  { rank:7,  initials:'DP', name:'Deepa Patel',    batch:2015, score:63,  donated:8000,  mentored:5,  referred:5,  events:4  },
  { rank:10, initials:'RS', name:'Rohan Singh',    batch:2016, score:54,  donated:5000,  mentored:4,  referred:6,  events:3  },
  { rank:14, initials:'AK', name:'Arjun Kumar',    batch:2015, score:42,  donated:5000,  mentored:3,  referred:7,  events:2, isCurrentUser:true },
  { rank:16, initials:'KS', name:'Kavya Sharma',   batch:2017, score:38,  donated:2500,  mentored:4,  referred:5,  events:2  },
  { rank:18, initials:'NS', name:'Neha Singh',     batch:2015, score:35,  donated:2500,  mentored:3,  referred:4,  events:3  },
]
```

### 9.4 Batch Community Groups
```js
export const batchGroups = [
  { year:2023, members:142, waLink:'#demo', fbLink:'#demo' },
  { year:2022, members:198, waLink:'#demo', fbLink:'#demo' },
  { year:2021, members:224, waLink:'#demo', fbLink:'#demo' },
  { year:2020, members:256, waLink:'#demo', fbLink:'#demo' },
  { year:2019, members:267, waLink:'#demo', fbLink:'#demo' },
  { year:2018, members:289, waLink:'#demo', fbLink:'#demo' },
  { year:2016, members:276, waLink:'#demo', fbLink:'#demo' },
  { year:2015, members:312, waLink:'#demo', fbLink:'#demo', isCurrentUserBatch:true },
  { year:2014, members:298, waLink:'#demo', fbLink:'#demo' },
  { year:2013, members:310, waLink:'#demo', fbLink:'#demo' },
]
```

---

## 10. Screen-by-Screen Specifications

### 10.1 HomePage (`/`)

**Layout:** Full-width, no sidebar.

**Sections (top to bottom):**

1. **Navbar** — Logo (from `src/assets/logo.png` with fallback), institution name, nav links (About, Programs, Directory, Events, Give Back), Sign In (ghost btn), Sign Up (gold btn). Sticky on scroll.

2. **Hero** — Dark navy background (`bg-primary`). Subtle dot-grid pattern overlay using CSS background-image. Badge pill: "Greenfield Alumni Network — Est. 1975". H1 headline: *"Where Greenfield graduates stay connected"*. Subtitle para. Two CTAs: "Create your profile" (gold) → `/signup` and "Sign in" (ghost) → `/signin`.

3. **Stats Bar** — Gold background (`bg-accent`). 5 stats from `homeStats`. Each separated by a subtle divider.

4. **Alumni Affairs Section** — Two-column layout. Left: eyebrow tag "Alumni Affairs", heading, two paragraphs describing the office. Right: 2×2 grid of info cards (Community First, Alumni of the Year, Annual Reunion, Give Back).

5. **Programs Section** — Centred heading. 4-column grid of `ProgramCard` components:
   - GuruDakshina → `/dashboard/give`
   - Mentorship Circle → `/signin` (with redirect intent)
   - Alumni Scholarship Fund → `/signin`
   - Annual Reunion → `/signin`

6. **CTA Band** — Navy background. "Be part of something bigger" heading. "Create your alumni profile" gold button → `/signup`.

7. **Footer** — Dark navy (`bg-primary-dark`). 4-column: About + logo, Quick Links, Support, Social icons. Bottom bar with copyright and "Powered by Alumni Connect".

---

### 10.2 SignInPage (`/signin`)

**Layout:** Centred card on light gray background.

**Card contents:**
- Logo at top (with fallback)
- "Welcome back" heading
- **"Enter as Demo User" button** — large, gold, full width, at the very top of the card. Label: "👤 Enter as Demo User (Arjun Kumar, Batch 2015)". On click: set demoUser in context, navigate to `/dashboard`.
- Divider: "or sign in with your account"
- Google OAuth button (visual only, non-functional in prototype — show toast "OAuth not active in prototype mode")
- Facebook OAuth button (same)
- Divider: "or sign in with email"
- Email input
- Password input
- Forgot password link → `/forgot-password`
- Sign In button (navy) → navigates to `/dashboard`
- Sign up link → `/signup`

---

### 10.3 SignUpPage (`/signup`)

**Layout:** Centred card. 4-step multi-step form.

**Step indicator:** 4 numbered circles connected by lines. Active = navy filled. Completed = gold filled. Incomplete = gray.

**Step 1 — Authentication method:**
- "Continue with Google" button (visual only)
- "Continue with Facebook" button (visual only)
- Divider "or register manually"
- "Register with email" button → advances to Step 2

**Step 2 — Academic details:**
Fields: Full name*, Email*, Batch year* (dropdown 1975–2023), Branch* (dropdown: CS/ECE/ME/EEE/Civil/Chemical/IT/MBA), Roll number*, Current city.

**Step 3 — Professional & contact details:**
Fields: Current employer, LinkedIn URL, WhatsApp number*, Facebook profile URL, Brief bio (textarea, optional).

**Step 4 — Review & submit:**
- Summary of entered details
- Checkbox: "I confirm I am an alumnus/alumna of Greenfield Institute of Technology"
- "Submit for approval" button → navigates to a success state showing: "🎉 Profile submitted! An admin will review and approve your account within 24–48 hours. You will receive a WhatsApp and email notification."
- "Go to Sign In" link

Back/Next navigation between steps. Validate required fields before advancing.

---

### 10.4 ForgotPasswordPage (`/forgot-password`)

**Layout:** Small centred card.

**State 1 — Email entry:**
- Lock icon (large)
- Heading: "Reset your password"
- Subtext: "Enter your registered email. We'll send an OTP to your mobile number."
- Email input
- "Send OTP" button → transitions to State 2

**State 2 — OTP entry (shown below email on same card, animated in):**
- "OTP sent to +91 98xxx x3210" confirmation banner (gold left border)
- 6-digit OTP input (large, letter-spaced)
- New password input
- Confirm password input
- "Verify and reset" button → shows success toast, navigates to `/signin` after 2s

---

### 10.5 DashboardHome (`/dashboard`)

**Layout:** Left sidebar (148px) + main content area. Sidebar uses `Sidebar.jsx`.

**Sidebar items:** Home (active), Directory, Community, Give Back, Leaderboard, My Profile. Bottom: user avatar (initials) + name + batch.

**Main content:**

1. **Welcome banner** — Navy background. "Welcome back, Arjun Kumar 👋". Right side: "Join Batch Community" (gold btn, links to `/dashboard/community`) and "View Profile" (ghost btn, links to `/dashboard/profile`).

2. **Profile completeness nudge** — Gold left-border alert. "Your profile is 65% complete. Add your employer and LinkedIn to unlock full directory access. Complete now →" (links to `/dashboard/profile`).

3. **Impact stats row** — 4 cards: Your rank (#14), Donated (₹5,000), Mentees (3), Impact score (42).

4. **Two-column section:**
   - Left (60%): "Recent activity" card — 4 activity items with icons, title, timestamp.
   - Right (40%): "Quick actions" card — 4 buttons: Browse directory → `/dashboard/directory`, Give to GuruDakshina → `/dashboard/give`, Find a mentor → `/dashboard/community`, Register for reunion → `/dashboard/give`.

---

### 10.6 MyProfile (`/dashboard/profile`)

**Layout:** Sidebar + main.

**Main content:**

1. **Profile header card** — Avatar circle (initials, navy bg, gold text), name, batch/branch line, profile completeness bar (65%, gold fill), "Edit profile" button that toggles an inline edit state.

2. **Details grid** — 2-column grid of 10 field cards: Email, Mobile, Batch year, Branch, Roll number, Current city, Employer, LinkedIn, WhatsApp, Facebook. In view mode shows values. In edit mode shows inputs.

3. **Visibility settings card** — "Profile visibility settings" heading. 4 toggle rows: Show my email (off), Show my employer (on), Show my city (on), Allow direct messages (on). Toggles are interactive — clicking them flips state.

4. **Save button** — Appears when in edit mode. On click: shows toast "Profile updated!" and returns to view mode.

---

### 10.7 AlumniDirectory (`/dashboard/directory`)

**Layout:** Sidebar + main.

**Main content:**

1. **Header row** — "Alumni Directory" title + total count badge.

2. **Filter bar** — Search input (text), Batch dropdown (All / individual years), Branch dropdown, City dropdown. Active filters shown as dismissable chip tags below the bar.

3. **Results grid** — 3-column grid of `AlumniCard` components from `mockAlumni`. Cards show: avatar, name, batch/branch, city, employer (if approved). Unapproved cards show "Pending approval" label and disabled "Connect" button. Approved cards show "Connect" button (prototype: shows toast "Connection request sent!").

4. **Pagination** — Simple prev/next (prototype: non-functional, just visual).

---

### 10.8 CommunityHub (`/dashboard/community`)

**Layout:** Sidebar + main.

**Main content:**

1. **Connect accounts card** — Light blue background. "Connect your accounts" heading. Two buttons: "f Connect Facebook" and "📱 Verify WhatsApp". Prototype: clicking either shows toast "This will be active in the live portal."

2. **Batch groups grid** — 2-column grid of batch cards from `batchGroups`. Current user's batch (2015) is highlighted with navy top border and gold "YOUR BATCH" badge. Each card: batch year, member count, "WhatsApp" green button (prototype: shows toast with instructions), "Facebook" blue button (same).

---

### 10.9 SupportAlmaMater (`/dashboard/give`)

**Layout:** Sidebar + main.

**Main content:**

1. **Section header** — "Support Your Alma Mater" + subtitle.

2. **Giving tiers** — 3-column grid:
   - ₹2,500 — Supporter (one-time gift)
   - ₹10,000 — Champion (semester fund) — marked "POPULAR" with navy top tab
   - ₹25,000+ — Legacy (annual patron)
   Each card: icon, amount, tier name, description, impact statement, "Contribute" button.

3. **Custom amount input** — Below grid: "Or enter a custom amount" with input field and "Proceed to payment" button.

4. **Razorpay band** — Navy background. Left: "Pay securely via Razorpay" + icons (UPI, cards, net banking). Right: SSL badge + "Pay with Razorpay →" gold button. **On click (any tier or custom amount):** Store the donation amount in context, navigate to `/donation-success`.

5. **Other ways section** — Light background. 4 ghost buttons: Become a mentor, Fund a scholarship, Guest lecture, Refer an alumni. All show prototype toast on click.

---

### 10.10 Leaderboard (`/dashboard/leaderboard`)

**Layout:** Sidebar + main.

**Main content:**

1. **Personal rank card** — Navy background full width. Left: large rank number "#14" in gold. Right: 4 mini stat chips: Impact pts (42), Donated (₹5K), Mentored (3), Referred (7). Right edge: "📤 Share my card" gold button → navigates to `/donation-success?fromLeaderboard=true` (reuses success screen for card sharing).

2. **Dimension tabs** — 6 tabs: Overall (active default), Donations, Mentorship, Referrals, Events, Shares. Tabs are interactive and visually switch active state. All show the same mock data in prototype.

3. **Leaderboard table** — Headers: Rank, Alumni, Impact Score, Donated, Mentored, Referred. 10 rows from `mockLeaderboard`. Current user row (rank 14) highlighted with gold background tint. Avatar initials circle, name, batch shown per row.

---

### 10.11 DonationSuccess (`/donation-success`)

**Layout:** Centred card, no sidebar. Light gray background.

**Card contents:**

1. **Success header** — 🎉 emoji (animated bounce-in). "Thank you, Arjun!" heading. "Your donation of ₹10,000 to GuruDakshina has been confirmed." (Uses context value if set from donation flow, else defaults to ₹10,000.)

2. **Card style selector** — "Choose your shareable card style" label. 3 toggle buttons: "🎵 Wrapped" (default selected), "📱 Story", "🏅 Certificate". Clicking each swaps the preview card below.

3. **Share card preview** — Three visual card styles:

   **Wrapped style:** Navy background, gold text. GIT badge top. "GREENFIELD INSTITUTE · ALUMNI IMPACT" label. Large ₹ amount in gold. Alumni name. Batch/rank/impact score. Referral link: `alumni.greenfield.edu/give?ref=AK2015`.

   **Story style (9:16 aspect):** Taller card. Same info but in a portrait/story format with more vertical spacing. Institution logo area at top.

   **Certificate style:** Formal bordered layout. "Certificate of Contribution". Name, amount, date, institution seal placeholder.

4. **Share buttons row** — 4 buttons: "📱 WhatsApp" (green), "Facebook" (blue), "Instagram" (pink-gradient), "Copy link" (gray). All show toast in prototype: "In the live portal, this opens the share sheet."

5. **Back to dashboard** link → `/dashboard`.

---

### 10.12 AdminDashboard (`/admin`)

**Layout:** Admin sidebar (140px, dark `bg-admin`) + main.

**Admin sidebar items:** Dashboard (active), Users, Campaigns, Community, Leaderboard, Content, Integrations, Branding. All items are clickable and navigate to their respective admin routes.

**Main content:**

1. **Header row** — "Admin Dashboard" + institution name. "+ Add user manually" navy button (prototype: opens a simple modal with Add User form fields, non-functional).

2. **KPI cards grid (3-column, 2 rows = 6 cards):**
   - Total alumni: 15,248 (+42 this week)
   - Pending approvals: 23 (badge: "Needs review")
   - Funds raised: ₹42.3 Cr (+₹1.2L this month)
   - Active campaigns: 4 (2 scheduled)
   - Leaderboard entries: 8,401 (Verified)
   - WhatsApp groups: 48 (All active)

3. **Two-column lower section:**
   - Left: Pending approvals list (3 rows with Approve / Reject buttons — prototype: buttons show toast)
   - Right: Active campaigns list (4 items with status badges LIVE / PAUSED / AUTO)

---

### 10.13 UserManagement (`/admin/users`)

**Layout:** Admin sidebar + main.

**Main content:**

1. **Header row** — Title + 3 buttons: "Download CSV template" (outline), "Bulk upload CSV" (gold), "+ Add manually" (navy).

2. **Filter bar** — Search input + 3 dropdowns (Batch, Branch, Status).

3. **Users table** — Columns: Name/Email, Batch, Branch, Source, Status badge, Actions. 5 rows of mock data. Status badges: APPROVED (green), PENDING (amber), REJECTED (red). Actions: Approve + Reject for pending; Edit + Revoke for approved. All prototype: show toast.

4. **Bulk upload modal** (shown when "Bulk upload CSV" clicked): Drag-and-drop area + "Download CSV template" link + field list preview + Upload button. Non-functional in prototype.

---

### 10.14 CampaignBuilder (`/admin/campaigns`)

**Layout:** Admin sidebar + main.

**Main content:**

2-column layout:

**Left column — Channel selector:**
4 radio-style cards: WhatsApp (WATI) — selected by default, SMS (MSG91), Email (Brevo), Push notification. Clicking selects.

**Right column — Audience + Message:**

Audience section:
- 2×2 filter grid: Batch year, Branch, City, Approval status
- "Estimated reach: 14,892 alumni" computed label (static in prototype)

Message section:
- Campaign name input
- Message textarea with placeholder showing merge tags usage
- Merge tags reference chips: `{first_name}`, `{batch_year}`, `{reunion_link}`
- Schedule button (prototype: shows date picker toast) + Send now button (prototype: shows "Campaign queued!" toast)

---

### 10.15 CommunityManager (`/admin/community`)

**Layout:** Admin sidebar + main.

**Main content:**

1. **Header** — Title + "+ Add batch" button.

2. **Batch links table** — Columns: Batch Year, WhatsApp group link, Facebook group link, Members, Status, Actions (Edit + Test). 8 rows of data. Edit opens inline edit. Test shows toast.

---

### 10.16 LeaderboardAdmin (`/admin/leaderboard`)

**Layout:** Admin sidebar + main.

**Main content:**

1. **Header row** — Title + time period dropdown + Export CSV button + "Share stats card" gold button (shows a stats card modal with social share buttons).

2. **Summary KPI cards (4):** Total contributions, Active mentors, Referrals, Avg impact score.

3. **Full leaderboard table** — All 10 mock entries with all 5 dimension columns + Verified badge.

---

### 10.17 ContentManager (`/admin/content`)

**Layout:** Admin sidebar + main.

**Main content:**

2-column layout:

**Left:** Hero text editor (headline input + subtitle textarea) + Homepage stats editor (5 editable fields for each stat value).

**Right:** Program cards editor (4 cards, each with Edit + Show/Hide button) + Announcements textarea.

"Publish changes" green button in header — shows toast "Changes published to homepage!"

---

### 10.18 Integrations (`/admin/integrations`)

**Layout:** Admin sidebar + main.

**Main content:**

2×3 grid of integration cards:
- WATI (WhatsApp) — connected (green border)
- MSG91 (SMS) — connected
- Brevo (Email) — not connected
- Razorpay (Payment) — connected
- Google OAuth — connected
- Facebook OAuth — not connected

Each card: service icon, name, category, connected/not-connected badge, API key input (password type, masked if connected), optional second field, Save/Re-configure button.

---

### 10.19 BrandingTheme (`/admin/branding`)

**Layout:** Admin sidebar + main.

**Main content:**

2-column layout:

**Left — Settings:**
- Institution name input
- Short name/abbreviation input
- Logo upload dropzone (shows "logo.png detected ✓" if the file exists in assets)
- Colour pickers: Primary colour (default #1A3A5C), Accent/gold (#C49A22), Light tint, Background
- Font family dropdown

**Right — Live preview:**
A miniature version of the homepage navbar + hero + stats bar that updates reactively as colours are changed in the left panel. This must actually update in real-time using React state.

"Apply changes live" green button at top — shows toast "Theme applied across portal!"

---

## 11. Click Flow — Primary Presentation Journey

This is the recommended flow for demos. Ensure every step is zero-friction:

```
HomePage
  → click "Create your profile" → SignUpPage
  → complete steps → submission success screen
  → click "Go to Sign In" → SignInPage
  → click "Enter as Demo User" → DashboardHome
  → click "Give to GuruDakshina" quick action → SupportAlmaMater
  → click "Pay with Razorpay →" (₹10,000 tier) → DonationSuccess
  → toggle card styles (Wrapped / Story / Certificate)
  → click "Share via WhatsApp" → toast
  → click back → DashboardHome
  → click sidebar "Leaderboard" → Leaderboard
  → click "Share my card" → DonationSuccess (from leaderboard)
```

---

## 12. Animations & Transitions

- **Page transitions:** Framer Motion `AnimatePresence` with a simple `opacity 0→1` + `y: 10→0` fade-up on every route change. Duration: 0.25s.
- **Stats bar:** Animate numbers counting up on first render (Framer Motion `useMotionValue` + `useSpring`).
- **Card hover:** `transform: scale(1.02)` on program cards and alumni cards.
- **Donation success screen:** Confetti burst effect on mount (use `canvas-confetti` package).
- **Sidebar navigation:** Active item slides/highlights smoothly.

---

## 13. Responsive Design

The prototype must work on:
- Desktop (1440px) — primary
- Laptop (1024px) — must work
- Tablet (768px) — sidebar collapses to icon-only
- Mobile (390px) — sidebar becomes bottom nav, grids collapse to single column

Use Tailwind responsive prefixes (`md:`, `lg:`) throughout.

---

## 14. Build & Deployment

### 14.1 Cloudflare Pages via Wrangler CLI

**Step 1: Install Wrangler**
```bash
npm install -g wrangler
wrangler login
```

**Step 2: Build the project**
```bash
npm run build
# Output goes to dist/
```

**Step 3: Create `_redirects` file**

Create `public/_redirects` with content:
```
/* /index.html 200
```

This ensures React Router (HashRouter) works correctly on Cloudflare Pages.

**Step 4: Deploy**
```bash
wrangler pages deploy dist --project-name alumni-connect
```

On first run, Wrangler will create the project. Subsequent runs update it.

**Step 5: Custom domain (optional)**
```bash
# In Cloudflare dashboard → Pages → alumni-connect → Custom domains
# Add: alumni-connect.yourdomain.com
```

### 14.2 `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

### 14.3 `package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && wrangler pages deploy dist --project-name alumni-connect"
  }
}
```

---

## 15. Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.363.0",
    "recharts": "^2.12.0",
    "canvas-confetti": "^1.9.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.4"
  }
}
```

---

## 16. Agent Instructions Summary

1. Scaffold with `npm create vite@latest alumni-connect -- --template react`
2. Install all dependencies listed above
3. Configure Tailwind with the custom colour tokens
4. Create folder structure as specified in Section 3
5. Build all components and pages as specified in Sections 7–10
6. Wire up all routes in `App.jsx` using `HashRouter`
7. Implement `AppContext` for global state
8. Add mock data to `data/mockData.js`
9. Implement the Prototype Badge and Screen Navigator floating UI on all pages
10. Ensure the Demo Login button on SignInPage works correctly
11. Create `public/_redirects` with SPA fallback
12. Run `npm run build` — verify no errors
13. Run `wrangler pages deploy dist --project-name alumni-connect`
14. Report the deployed URL

**Logo note:** Check if `src/assets/logo.png` or `src/assets/logo.svg` exists before using it. Never import a file that doesn't exist — use the fallback badge if the file is absent.
