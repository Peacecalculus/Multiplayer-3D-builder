# 🔧 Environment Variables Fix Guide

## Problem Explained

The error "Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL" occurs because Next.js server components can't always access `NEXT_PUBLIC_*` environment variables reliably during server-side rendering.

### Why This Happens

In Next.js 13+:
- `NEXT_PUBLIC_*` variables are primarily for client-side code
- Server-side code (like middleware and server components) should use non-public variables
- The `createServerClient` function runs on the server and needs server-only variables

## ✅ Solution Applied

### 1. Updated Environment Variables

Your `.env.local` now includes both public and server-only variables:

```env
# Public variables (accessible in browser and server)
NEXT_PUBLIC_SUPABASE_URL=https://izaepkomrlovrrfslwle.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...

# Server-only variables (more secure, only accessible on server)
SUPABASE_URL=https://izaepkomrlovrrfslwle.supabase.co
SUPABASE_ANON_KEY=eyJhbG...
```

### 2. Updated Server Files

Modified the following files to use server-only variables with fallback:

#### `lib/supabase/server.ts`
```typescript
return createServerClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  // ...
)
```

#### `middleware.ts`
```typescript
const supabase = createServerClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  // ...
)
```

#### `lib/supabase/middleware.ts`
Same pattern as above.

### 3. Pattern Used

```typescript
process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!
```

This pattern:
1. First tries to use the server-only variable (`SUPABASE_URL`)
2. Falls back to the public variable (`NEXT_PUBLIC_SUPABASE_URL`) if not found
3. Ensures compatibility and reliability

## 🚀 Next Steps

### Restart Your Development Server

**Important:** You must restart the dev server for environment variables to be loaded:

```bash
# Stop the current server (Ctrl + C)
# Then restart:
npm run dev
```

### Verify It Works

1. Open http://localhost:3000
2. You should see the landing page without errors
3. Try signing up or logging in
4. Check browser console for no errors

## 📝 For Production Deployment

When deploying to Vercel, add all four environment variables:

```env
# Vercel Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### Vercel Dashboard Steps:
1. Go to Project Settings → Environment Variables
2. Add all 4 variables
3. Redeploy your application

## 🔒 Security Note

### Why Two Sets of Variables?

1. **Public Variables (`NEXT_PUBLIC_*`):**
   - Bundled into client-side JavaScript
   - Visible in browser DevTools
   - Used for client-side Supabase calls

2. **Server Variables (no prefix):**
   - Only accessible on server
   - Never sent to browser
   - More secure for server-side operations

### Best Practice

Always use server-only variables when possible, especially for:
- Middleware
- Server Components
- API Routes
- Server Actions

## 🐛 Troubleshooting

### Still Getting Error?

1. **Verify .env.local exists:**
   ```bash
   # Check if file exists
   ls -la .env.local
   ```

2. **Check values are correct:**
   - URL must start with `https://`
   - No trailing slashes
   - No spaces or quotes

3. **Restart dev server:**
   ```bash
   # Kill all node processes
   taskkill /f /im node.exe  # Windows
   # or
   killall node  # Mac/Linux
   
   # Start fresh
   npm run dev
   ```

4. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

### Environment Variables Not Loading?

Create a `next.config.ts` check:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // This will log env vars during build
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
}

export default nextConfig
```

## ✅ Expected Behavior

After applying this fix:
- ✅ No "Invalid supabaseUrl" error
- ✅ Landing page loads correctly
- ✅ Auth pages work
- ✅ Login/Signup functional
- ✅ Server-side rendering works
- ✅ No console errors

## 📚 References

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Supabase SSR Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

**The fix has been applied! Restart your dev server and you should be good to go! 🎉**
