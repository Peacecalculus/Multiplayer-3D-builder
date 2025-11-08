# 🚀 Quick Start Guide

Get up and running with Multiplayer 3D Builder in 5 minutes!

## Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js 18+ installed ([Download](https://nodejs.org/))
- ✅ npm or yarn package manager
- ✅ A code editor (VS Code recommended)

## Step 1: Install Dependencies (1 min)

```bash
cd multiplayer-3d-builder
npm install
```

Wait for all packages to install. You should see no errors.

## Step 2: Set Up Supabase (2 min)

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - Name: `multiplayer-3d-builder`
   - Database Password: (choose a strong password)
   - Region: (closest to you)
4. Click "Create new project"
5. Wait for project to finish setting up (~2 minutes)

### Get Credentials
1. Go to **Project Settings** (gear icon) → **API**
2. Copy these two values:
   - `Project URL` (looks like: `https://xxxxx.supabase.co`)
   - `anon public` key (long string starting with `eyJ...`)

### Set Up Database
1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Open `DATABASE_SCHEMA.md` in this project
4. Copy ALL the SQL code
5. Paste into SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

### Enable Realtime
1. Go to **Database** → **Replication**
2. Find `world_objects` table, toggle **ON**
3. Find `players` table, toggle **ON**

## Step 3: Configure Environment (30 sec)

Create `.env.local` file in project root:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local` and replace with your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ Important**: Replace the values with actual credentials from Step 2!

## Step 4: Run the App (30 sec)

```bash
npm run dev
```

You should see:
```
✓ Ready on http://localhost:3000
```

## Step 5: Test It Out (1 min)

1. Open browser to `http://localhost:3000`
2. Click "Get Started"
3. Sign up with email and password
4. You should see the 3D builder!
5. Try adding a cube or sphere

### Test Multiplayer
1. Open a second browser window (or incognito tab)
2. Sign up with different email
3. Position windows side-by-side
4. Add objects in one window
5. Watch them appear in the other! 🎉

## Common Issues

### "Invalid Supabase credentials"
- Double-check `.env.local` has correct values
- Make sure to restart dev server after changing env vars

### "Failed to fetch"
- Check your internet connection
- Verify Supabase project is active
- Check browser console for specific errors

### Objects not syncing
- Make sure Realtime is enabled for both tables
- Check Database → Replication in Supabase

### 3D scene not loading
- Ensure WebGL is supported in your browser
- Try different browser (Chrome recommended)
- Check console for Three.js errors

## Next Steps

Now that you're up and running:

1. **Read the full README** for detailed features
2. **Check TESTING.md** for comprehensive testing guide
3. **Review DATABASE_SCHEMA.md** to understand the data structure
4. **See DEPLOYMENT.md** when ready to deploy

## Quick Tips

- **Add Objects**: Click toolbar buttons at bottom
- **Move Objects**: Click and drag any object
- **Delete Objects**: Select object, then click Delete
- **Camera**: Left-drag to rotate, scroll to zoom, right-drag to pan
- **See Players**: Check right sidebar for online users

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🐛 Check [TESTING.md](TESTING.md) for troubleshooting
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
- 💬 Open an issue on GitHub

---

**You're all set! Start building! 🎨**
