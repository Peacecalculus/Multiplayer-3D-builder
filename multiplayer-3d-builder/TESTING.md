# Testing Guide

This guide will help you test all features of the Multiplayer 3D Builder.

## Prerequisites

Before testing, ensure:
- ✅ Supabase project is set up with the database schema
- ✅ Environment variables are configured
- ✅ Development server is running (`npm run dev`)
- ✅ At least 2 browser windows/tabs available for multiplayer testing

## Feature Testing Checklist

### 1. Authentication Tests

#### Email & Password Signup
- [ ] Navigate to signup page (`/auth/signup`)
- [ ] Enter valid name, email, and password (min 6 characters)
- [ ] Click "Sign Up" button
- [ ] Verify redirect to builder page
- [ ] Check that username appears in header

**Expected Result**: User is created and logged in automatically

#### Email & Password Login
- [ ] Navigate to login page (`/auth/login`)
- [ ] Enter registered email and password
- [ ] Click "Sign In" button
- [ ] Verify redirect to builder page
- [ ] Check persistent session (refresh page, should stay logged in)

**Expected Result**: User successfully logs in and session persists

#### Google OAuth
- [ ] Click "Sign in with Google" button
- [ ] Select Google account
- [ ] Grant permissions
- [ ] Verify redirect back to builder page
- [ ] Check that Google profile name appears in header

**Expected Result**: OAuth flow completes successfully

#### Logout
- [ ] Click "Logout" button in header
- [ ] Verify redirect to home page
- [ ] Try accessing `/builder` directly
- [ ] Should be redirected to login page

**Expected Result**: User is logged out and routes are protected

### 2. 3D Builder Tests

#### Adding Objects
- [ ] Click "Cube" button
- [ ] Verify cube appears in random position
- [ ] Click "Sphere" button
- [ ] Verify sphere appears in random position
- [ ] Add multiple objects (5-10)
- [ ] Check that each has unique color

**Expected Result**: Objects appear instantly with random colors and positions

#### Moving Objects
- [ ] Click and hold on an object
- [ ] Drag mouse while holding
- [ ] Release mouse button
- [ ] Verify object moves smoothly
- [ ] Check that position updates

**Expected Result**: Object follows cursor and updates position on release

#### Selecting Objects
- [ ] Click on an object
- [ ] Verify selection highlight (larger scale, glow)
- [ ] Click another object
- [ ] Verify previous selection is deselected
- [ ] Check toolbar shows "Object selected" message

**Expected Result**: Only one object selected at a time with visual feedback

#### Deleting Objects
- [ ] Select an object
- [ ] Click "Delete" button
- [ ] Verify object disappears
- [ ] Try clicking delete without selection (should be disabled)

**Expected Result**: Selected object is removed from scene

#### Saving Scene
- [ ] Add several objects
- [ ] Click "Save" button
- [ ] Check for confirmation message
- [ ] Refresh page
- [ ] Verify objects persist

**Expected Result**: Scene is saved to database and persists

### 3. Real-time Multiplayer Tests

#### Setup Two Browsers
1. Open Chrome and sign in as User A
2. Open Firefox/Incognito and sign in as User B
3. Position windows side-by-side

#### Player Presence
- [ ] Check online players list in right sidebar
- [ ] Verify both users appear
- [ ] Check each has unique color
- [ ] Verify player count shows "2 online"

**Expected Result**: Both players visible with distinct colors

#### Real-time Object Creation
**User A:**
- [ ] Add a cube

**User B:**
- [ ] Verify cube appears instantly
- [ ] Check it has the same color
- [ ] Check it's in the same position

**Expected Result**: Object syncs across both browsers immediately

#### Real-time Object Movement
**User A:**
- [ ] Move an object to new position

**User B:**
- [ ] Watch object move in real-time
- [ ] Verify final position matches

**Expected Result**: Movement syncs live across clients

#### Real-time Object Deletion
**User A:**
- [ ] Delete an object

**User B:**
- [ ] Verify object disappears instantly

**Expected Result**: Deletion syncs immediately

#### Player Avatars
- [ ] Check for floating colored spheres in scene
- [ ] Verify username labels above avatars
- [ ] Check avatars have floating animation
- [ ] Verify each player has unique color

**Expected Result**: Each player represented by colored avatar with name

### 4. 3D Scene Tests

#### Camera Controls
- [ ] Left-click and drag → Rotate view
- [ ] Right-click and drag → Pan view
- [ ] Scroll wheel → Zoom in/out
- [ ] Test min/max zoom limits
- [ ] Verify camera doesn't go below ground

**Expected Result**: All camera controls work smoothly

#### Lighting
- [ ] Observe ambient lighting
- [ ] Check directional light (sun)
- [ ] Verify shadows cast by objects
- [ ] Check colored point lights (blue/pink)

**Expected Result**: Scene is well-lit with dynamic shadows

#### Visual Effects
- [ ] Hover over objects → Scale increases
- [ ] Select objects → Glow effect
- [ ] Watch objects rotate automatically
- [ ] Check player avatars float up and down

**Expected Result**: All animations work smoothly

#### Grid System
- [ ] Verify grid on ground plane
- [ ] Check cell lines (gray)
- [ ] Check section lines (blue, every 5 units)
- [ ] Verify grid fades at distance

**Expected Result**: Grid provides spatial reference

#### Skybox
- [ ] Look up and around
- [ ] Verify realistic sky gradient
- [ ] Check sun position
- [ ] Verify horizon looks natural

**Expected Result**: Sky enhances scene realism

### 5. UI/UX Tests

#### Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet size (768px width)
- [ ] Test on mobile (375px width)
- [ ] Check toolbar adapts to screen size
- [ ] Verify sidebar stacks properly

**Expected Result**: UI adapts to all screen sizes

#### Loading States
- [ ] Check loading spinner on initial load
- [ ] Verify "Loading 3D Builder..." message
- [ ] Check button disabled states

**Expected Result**: Clear feedback during loading

#### Error Handling
- [ ] Try invalid login credentials
- [ ] Verify error message displays
- [ ] Try weak password (< 6 chars)
- [ ] Check validation messages

**Expected Result**: Helpful error messages shown

### 6. Performance Tests

#### Object Limits
- [ ] Add 50 objects
- [ ] Check frame rate (should stay above 30 FPS)
- [ ] Test object selection responsiveness
- [ ] Verify dragging is smooth

**Expected Result**: Good performance with many objects

#### Network Latency
- [ ] Use browser dev tools to throttle network (3G)
- [ ] Add objects
- [ ] Check sync delay
- [ ] Verify no duplicate objects

**Expected Result**: Graceful handling of slow connections

#### Memory Usage
- [ ] Open browser task manager
- [ ] Monitor memory while using app
- [ ] Add/delete many objects
- [ ] Check for memory leaks (shouldn't continuously grow)

**Expected Result**: Stable memory usage

## Automated Testing (Optional)

### Health Check
```bash
curl http://localhost:3000/api/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-11-08T02:22:00.000Z",
  "database": "connected",
  "version": "1.0.0"
}
```

## Known Issues & Limitations

### Current Limitations
- Only cube and sphere shapes supported
- Fixed object colors (random assignment)
- No undo/redo functionality
- No scene templates
- Maximum ~100 objects recommended for best performance

### Browser Compatibility
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari (macOS)
- ⚠️ Mobile browsers (limited touch support)

## Troubleshooting

### Objects Not Syncing
1. Check browser console for errors
2. Verify Supabase credentials
3. Check Database → Replication settings
4. Ensure RLS policies are correct

### Performance Issues
1. Reduce number of objects
2. Close other browser tabs
3. Check GPU acceleration is enabled
4. Update graphics drivers

### Authentication Issues
1. Clear browser cookies
2. Check environment variables
3. Verify Supabase project status
4. Test with different browser

## Reporting Issues

When reporting bugs, include:
1. Browser and version
2. Operating system
3. Steps to reproduce
4. Expected vs actual behavior
5. Console error messages
6. Screenshots/screen recording

## Success Criteria

All features pass when:
- ✅ Authentication works (email + Google OAuth)
- ✅ Real-time sync works across multiple clients
- ✅ Objects can be created, moved, deleted
- ✅ Scene persists after refresh
- ✅ Player presence shows correctly
- ✅ Camera controls work smoothly
- ✅ Visual effects render properly
- ✅ UI is responsive on all devices
- ✅ No critical errors in console

---

**Happy Testing! 🧪**
