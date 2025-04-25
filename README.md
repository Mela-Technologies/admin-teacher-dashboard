# Admin-Teacher-Dashboard

This web-based application is being developed using Vite-React, AntD, and Tailwind CSS.

## Technologies Used

### Vite-React

Vite is frontend build tool it serves your code via native ES modules, enabling blazing fast hot module replacement (HMR) and on-demand compilation. This results in instant server start and lightning-fast updates during development.

Learn more at the [Vite official documentation](https://vitejs.dev/guide/).

### AntD (Ant Design)

Ant Design for enterprise-level products. It provides high-quality React components out of the box that follow Ant Design specifications.

Key features:

- 60+ high-quality React components
- Written in TypeScript with complete type definitions

For detailed information and component documentation, visit the [Ant Design official documentation](https://ant.design/docs/react/introduce).

### Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows for rapid UI development. It provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.

Key features:

- Utility-first approach
- Responsive design system
- Component-friendly
- Customizable with configuration
- JIT (Just-In-Time) compilation for faster builds
- Dark mode support

Learn more at the [Tailwind CSS official documentation](https://tailwindcss.com/docs).

## Project Structure

```
src/
├── assets/              # Static assets like images, fonts, etc.
├── components/          # Reusable UI components
├── context/             # React context API implementations
├── constants/           # Application constants and configuration
├── hooks/               # Custom React hooks
│   └── useAuth.tsx      # Authentication hook
├── layouts/             # Layout components for different user roles
│   ├── AdminLayout.tsx  # Layout for admin users
│   └── TeacherLayout.tsx # Layout for teacher users
├── pages/               # Application pages
│   ├── auth/            # Authentication pages (login, register, etc.)
│   ├── admin/           # Admin-specific pages
│   └── teacher/         # Teacher-specific pages
├── routes/              # Routing configuration
│   ├── AppRoutes.tsx    # Main application routes
│   ├── adminRoutes.tsx  # Admin-specific routes
│   └── teacherRoutes.tsx # Teacher-specific routes
├── services/            # API services and data fetching logic
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and helpers
│   └── AuthProvider.tsx # Authentication provider
├── App.tsx              # Main application component
└── index.tsx            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/Mela-Technologies-dev/admin-teacher-dashboard.git
```

2. Navigate to the project directory

```bash
cd admin-teacher-dashboard
```

3. Install dependencies

```bash
yarn
```

4. Start the development server

```bash
yarn run dev
```

The application will be available at `http://localhost:5173` (or the port specified in your configuration).

## Development

### Available Scripts

- `yarn run dev` - Start the development server
- `yarn run build` - Build the application for production
- `yarn run preview` - Preview the production build locally
