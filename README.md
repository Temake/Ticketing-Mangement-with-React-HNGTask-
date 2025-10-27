# TicketHub - React Implementation

A modern, responsive ticket management web application built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Landing Page** - Welcoming hero section with wavy SVG background and decorative elements
- **Authentication System** - Login and Signup pages with form validation
- **Dashboard** - Overview of ticket statistics (Total, Open, In Progress, Closed)
- **Ticket Management** - Full CRUD operations (Create, Read, Update, Delete)
- **Form Validation** - Real-time validation with inline error messages
- **Toast Notifications** - User-friendly feedback for all actions
- **Protected Routes** - Secure access to dashboard and tickets pages
- **Responsive Design** - Mobile-first approach, works on all devices
- **Accessibility** - Semantic HTML, focus states, and proper ARIA labels
- **Status Color Coding**:
  - 🟢 Open - Green
  - 🟡 In Progress - Amber
  - ⚫ Closed - Gray

## 🛠️ Tech Stack

- **React** 19.1.1
- **TypeScript** 5.9.3
- **Vite** 7.1.7 (Build tool)
- **React Router DOM** 7.x (Routing)
- **React Hot Toast** (Notifications)
- **Tailwind CSS** v4 (Styling)

## 📋 Prerequisites

- Node.js 18+ or higher
- pnpm (recommended) or npm

## 🔧 Setup Instructions

1. **Navigate to the project directory**
   ```bash
   cd "react/Ticketing Management"
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
pnpm build
```

The production-ready files will be in the `dist` folder.

## 🧪 Preview Production Build

```bash
pnpm preview
```

## 👤 Demo Credentials

For testing purposes, use these credentials:

- **Email**: demo@example.com
- **Password**: password123

Or create a new account via the Sign Up page.

## 🎨 Design Specifications

- **Max Width**: 1440px (centered on large screens)
- **Hero Section**: Wavy SVG background at the bottom edge
- **Decorative Elements**: Multiple circular gradients for visual appeal
- **Card Components**: Box shadows and rounded corners throughout
- **Responsive Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Container.tsx      # Max-width container wrapper
│   │   ├── Header.tsx         # Navigation header
│   │   └── Footer.tsx         # Footer section
│   ├── ui/
│   │   ├── Button.tsx         # Reusable button component
│   │   ├── Input.tsx          # Form input with validation
│   │   ├── Textarea.tsx       # Textarea with validation
│   │   ├── Select.tsx         # Select dropdown
│   │   ├── Card.tsx           # Card container
│   │   ├── StatusBadge.tsx    # Ticket status badge
│   │   ├── Modal.tsx          # Modal dialog
│   │   └── SVGAssets.tsx      # Wave and circle SVGs
│   └── ProtectedRoute.tsx     # Route guard component
├── contexts/
│   └── AuthContext.tsx        # Authentication state management
├── pages/
│   ├── LandingPage.tsx        # Home/landing page
│   ├── LoginPage.tsx          # Login form
│   ├── SignupPage.tsx         # Signup form
│   ├── DashboardPage.tsx      # Dashboard with stats
│   └── TicketsPage.tsx        # Ticket management (CRUD)
├── types/
│   └── index.ts               # TypeScript interfaces
├── utils/
│   ├── storage.ts             # localStorage wrapper
│   ├── validation.ts          # Form validation helpers
│   └── mockAuth.ts            # Mock authentication
├── App.tsx                    # Main app component with routes
├── main.tsx                   # App entry point
└── index.css                  # Global styles
```

## 🔐 Authentication & Data Storage

- **Session Management**: Uses `localStorage` with key `ticketapp_session`
- **User Data**: Stored in `localStorage` with key `ticketapp_user`
- **Tickets**: Stored in `localStorage` with key `ticketapp_tickets`
- **Mock API**: Simulates async authentication with delays

## ✅ Validation Rules

### Authentication
- **Email**: Must be valid email format
- **Password**: Minimum 6 characters
- **Name**: Minimum 2 characters
- **Confirm Password**: Must match password

### Tickets
- **Title**: Required, max 100 characters
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional, max 500 characters
- **Priority**: Optional, one of: `low`, `medium`, `high`

## 🚧 Error Handling

- **Form Validation**: Inline error messages below fields
- **Toast Notifications**: Success/error feedback for all actions
- **Unauthorized Access**: Automatic redirect to login page
- **Network Errors**: User-friendly error messages

## ♿ Accessibility Features

- Semantic HTML elements
- Proper heading hierarchy
- Focus visible states on interactive elements
- Alt text for decorative elements with `aria-hidden="true"`
- Sufficient color contrast ratios
- Keyboard navigation support

## 🐛 Known Issues

None at the moment. If you find any bugs, please report them.

## 📄 License

This project is for educational/demo purposes.

## 👨‍💻 Development Notes

- **State Management**: Uses React Context API for authentication
- **Routing**: React Router DOM v7 with protected routes
- **Styling**: Tailwind CSS v4 with custom utilities
- **Forms**: Controlled components with real-time validation
- **Data Persistence**: localStorage (simulating backend)

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

