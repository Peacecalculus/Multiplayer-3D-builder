# 🚀 Deployment Guide

This guide will walk you through deploying the Multiplayer 3D Builder to production.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Supabase project set up with production configuration
- (Optional) Custom domain

## Step-by-Step Deployment

### 1. Prepare Your Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for deployment"

# Push to GitHub
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

6. Click "Deploy"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts, then add environment variables in the dashboard
```

### 3. Configure Supabase for Production

#### Update Authentication URLs

1. Go to your Supabase project dashboard
2. Navigate to **Authentication → URL Configuration**
3. Add your Vercel URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: 
     - `https://your-app.vercel.app/auth/callback`
     - `https://your-app.vercel.app/**` (wildcard for all auth routes)

#### Update OAuth Provider Settings (Google)

1. Go to **Authentication → Providers → Google**
2. Update the redirect URI in your Google Cloud Console:
   - Old: `http://localhost:3000/auth/callback`
   - New: `https://your-app.vercel.app/auth/callback`
3. You may need to keep both URLs for development and production

### 4. Verify Deployment

1. Visit your deployed URL
2. Test signup/login functionality
3. Test Google OAuth login
4. Create objects in the 3D builder
5. Open in multiple tabs/browsers to test real-time sync
6. Check for any console errors

### 5. Custom Domain (Optional)

#### Add Custom Domain to Vercel

1. Go to your project in Vercel dashboard
2. Click **Settings → Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

#### Update Supabase URLs

1. Add your custom domain to Supabase redirect URLs
2. Update Google OAuth redirect URIs

### 6. Performance Optimization

#### Enable Analytics

1. In Vercel dashboard, go to **Analytics**
2. Enable Web Analytics and Speed Insights
3. Monitor your app's performance

#### Configure Caching

Vercel automatically caches static assets. For additional optimization:

```typescript
// next.config.ts
const nextConfig = {
  // Enable static optimization
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['your-supabase-project.supabase.co'],
  },
  
  // Compression
  compress: true,
}
```

### 7. Environment Variables Best Practices

#### For Multiple Environments

Create different environment variable sets:

**Development (.env.local)**
```env
NEXT_PUBLIC_SUPABASE_URL=https://dev-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dev-anon-key
```

**Production (Vercel Dashboard)**
```env
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod-anon-key
```

## Monitoring & Maintenance

### Health Checks

Create a health check endpoint:

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.from('world_objects').select('count')
    
    if (error) throw error
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    })
  } catch (error) {
    return NextResponse.json({ 
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    }, { status: 500 })
  }
}
```

### Log Monitoring

1. Use Vercel's built-in logging
2. Set up error tracking (Sentry, LogRocket, etc.)
3. Monitor Supabase dashboard for database issues

### Backup Strategy

1. **Database Backups**: Supabase automatically backs up your database
2. **Code Backups**: Use Git and GitHub
3. **User Data**: Implement export functionality if needed

## Troubleshooting Production Issues

### Common Issues

#### 1. "Invalid redirect URL" error

**Solution**: Ensure all redirect URLs are added to Supabase dashboard

```
✅ https://your-app.vercel.app/auth/callback
✅ https://your-app.vercel.app
✅ https://your-custom-domain.com/auth/callback
```

#### 2. OAuth not working

**Solution**: 
- Verify Google OAuth credentials in Supabase
- Check redirect URIs in Google Cloud Console
- Clear browser cache and cookies

#### 3. Real-time not syncing

**Solution**:
- Check Supabase realtime subscription status
- Verify RLS policies are correct
- Check browser console for WebSocket errors

#### 4. 3D scene performance issues

**Solution**:
- Limit number of objects (implement pagination)
- Optimize 3D models
- Use LOD (Level of Detail) for distant objects

## Scaling Considerations

### Database

- Monitor Supabase usage in dashboard
- Upgrade plan if needed
- Implement object limits per user/scene

### Vercel

- Free tier: Good for demos and small teams
- Pro tier: Recommended for production
- Enterprise: For large-scale applications

### Real-time Connections

Supabase limits:
- Free: 200 concurrent connections
- Pro: 500 concurrent connections
- Pay as you go for more

## Security Checklist

- [ ] Environment variables not committed to Git
- [ ] RLS policies properly configured
- [ ] OAuth redirect URLs restricted to your domains
- [ ] CORS properly configured
- [ ] Input validation on all user inputs
- [ ] Rate limiting implemented (if needed)
- [ ] SSL/HTTPS enabled (automatic with Vercel)

## Cost Estimates

### Free Tier (Development)

- Vercel: Free (hobby projects)
- Supabase: Free (up to 500MB database, 2GB bandwidth)
- Total: $0/month

### Production (Small Team)

- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Custom Domain: ~$10-15/year
- Total: ~$45/month

## Next Steps After Deployment

1. Share your app with users
2. Gather feedback
3. Monitor analytics and errors
4. Iterate and improve
5. Consider adding features:
   - More 3D shapes
   - Color picker
   - Scene templates
   - User permissions
   - Chat system

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Review browser console errors
4. Refer to documentation
5. Open an issue on GitHub

---

**Congratulations on deploying your Multiplayer 3D Builder! 🎉**
