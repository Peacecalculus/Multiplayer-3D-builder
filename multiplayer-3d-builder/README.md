# 🎮 Multiplayer 3D Builder

A real-time collaborative 3D building experience inspired by Minecraft and Roblox Studio. Built with Next.js, TypeScript, React Three Fiber, and Supabase.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-19.2-61dafb)

## ✨ Features

### 🔐 Authentication System
- **Email & Password Authentication** - Secure signup and signin
- **Google OAuth Integration** - One-click social login
- **Persistent Sessions** - Stay logged in until manual logout
- **User Profiles** - Display username in header/navbar

### 🌐 Multiplayer 3D World
- **Real-time Collaboration** - See updates instantly across all connected users
- **Live Player Presence** - View all online players with distinct colors
- **Shared 3D Environment** - Every user interacts in the same world
- **Object Synchronization** - Add, move, and delete objects in real-time

### 🎨 3D World Actions
- **Add Objects** - Create cubes and spheres at any location
- **Move Objects** - Drag and reposition objects freely
- **Delete Objects** - Select and remove objects
- **Visual Feedback** - Hover and selection effects

### 🎭 Visual Enhancements
- **Dynamic Skybox** - Beautiful sky with realistic sun positioning
- **Advanced Lighting** - Ambient, directional, and colored point lights
- **Grid System** - Visual reference grid for building
- **Animations** - Rotating objects and floating player avatars
- **Player Identifiers** - Unique colors and name labels for each user
- **Camera Controls** - Orbit, zoom, and pan capabilities

### 💾 Scene Persistence
- **Save/Load Functionality** - Objects persist in Supabase database
- **Real-time Sync** - Database changes broadcast to all clients
- **Object History** - Track creation and update timestamps

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **3D Rendering**: React Three Fiber & Three.js
- **3D Helpers**: @react-three/drei
- **Authentication**: Supabase Auth (Email + Google OAuth)
- **Real-time Database**: Supabase Realtime (PostgreSQL)
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account ([supabase.com](https://supabase.com))
- Google Cloud Console account (for OAuth - optional)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd multiplayer-3d-builder
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for setup to complete

2. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy your `Project URL`
   - Copy your `anon` public key

3. **Set Up Database Schema**
   - Open the SQL Editor in Supabase dashboard
   - Copy the SQL from `DATABASE_SCHEMA.md`
   - Execute the query to create tables and policies

4. **Enable Realtime**
   - Go to Database → Replication
   - Enable replication for `world_objects` and `players` tables

5. **Configure Google OAuth** (Optional)
   - Go to Authentication → Providers
   - Enable Google provider
   - Add your Google OAuth credentials
   - Set redirect URLs:
     - `http://localhost:3000/auth/callback` (development)
     - `https://your-domain.com/auth/callback` (production)

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
multiplayer-3d-builder/
├── app/
│   ├── auth/
│   │   ├── callback/          # OAuth callback handler
│   │   ├── login/             # Login page
│   │   └── signup/            # Signup page
│   ├── builder/               # Main 3D builder page
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── Header.tsx             # Top navigation bar
│   ├── LoginForm.tsx          # Login form component
│   ├── SignupForm.tsx         # Signup form component
│   ├── Scene3D.tsx            # Main 3D scene
│   ├── SceneObject.tsx        # Individual 3D objects
│   ├── PlayerAvatar.tsx       # Player representation
│   ├── PlayersList.tsx        # Online players sidebar
│   └── Toolbar.tsx            # Object creation toolbar
├── lib/
│   └── supabase/
│       ├── client.ts          # Client-side Supabase
│       ├── server.ts          # Server-side Supabase
│       └── middleware.ts      # Middleware Supabase
├── store/
│   ├── authStore.ts           # Auth state management
│   └── builderStore.ts        # Builder state management
├── types/
│   └── index.ts               # TypeScript types
├── middleware.ts              # Route protection
├── DATABASE_SCHEMA.md         # Database setup guide
└── README.md                  # This file
```

## 🎮 How to Use

### Creating an Account
1. Click "Get Started" on the landing page
2. Choose between email/password or Google OAuth
3. Complete the signup process

### Building in 3D
1. **Add Objects**: Click "Cube" or "Sphere" buttons in the toolbar
2. **Move Objects**: Click and drag objects in the 3D scene
3. **Delete Objects**: Select an object, then click "Delete"
4. **Save Scene**: Click "Save" to persist your changes

### Collaboration
- See other online players in the right sidebar
- Watch objects appear, move, and disappear in real-time
- Each player has a unique color and floating name label

### Navigation
- **Rotate**: Left-click and drag
- **Zoom**: Mouse wheel
- **Pan**: Right-click and drag

## 🔒 Security Features

- **Row Level Security (RLS)** - Database-level access control
- **Protected Routes** - Middleware-based route protection
- **Secure Authentication** - JWT-based session management
- **Environment Variables** - Sensitive data stored securely

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Update Supabase OAuth redirect URLs with your production domain
5. Deploy!

### Post-Deployment
- Update Google OAuth credentials with production URL
- Test authentication flow
- Verify real-time synchronization

## 🐛 Troubleshooting

### Realtime Not Working
- Verify tables are enabled in Database → Replication
- Check if RLS policies are correctly configured
- Ensure Supabase credentials are correct

### OAuth Issues
- Verify redirect URLs match exactly
- Check Google OAuth credentials
- Ensure OAuth provider is enabled in Supabase

### 3D Scene Not Loading
- Check browser console for Three.js errors
- Ensure WebGL is supported in your browser
- Try disabling browser extensions

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Supabase Documentation](https://supabase.com/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for the Multiplayer 3D Builder Challenge

---

**Happy Building! 🎉**
