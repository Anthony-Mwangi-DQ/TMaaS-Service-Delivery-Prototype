# Netlify Deployment Troubleshooting

## Issue: Blank White Screen with MIME Type Error

### Error Message:
```
Failed to load module script: Expected a JavaScript module script 
but the server responded with a MIME type of "application/octet-stream"
```

### ✅ Solution Applied:

1. **Updated `netlify.toml`** with proper MIME type headers:
   ```toml
   [[headers]]
     for = "/*.js"
     [headers.values]
       Content-Type = "application/javascript; charset=utf-8"
   
   [[headers]]
     for = "/*.mjs"
     [headers.values]
       Content-Type = "application/javascript; charset=utf-8"
   ```

2. **Updated `vite.config.ts`** with explicit build settings:
   ```typescript
   base: "/",
   build: {
     outDir: "dist",
     assetsDir: "assets",
   }
   ```

3. **Added `public/_redirects`** for SPA routing:
   ```
   /*    /index.html   200
   ```

### Next Steps:

1. **Netlify will auto-deploy** from the latest push
2. **Wait 2-3 minutes** for build to complete
3. **Clear browser cache** (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
4. **Check deployment logs** in Netlify dashboard

---

## If Issue Persists:

### Step 1: Clear Netlify Cache
In Netlify dashboard:
1. Go to **Site settings** → **Build & deploy**
2. Click **Clear cache and retry deploy**

### Step 2: Check Build Logs
1. Go to **Deploys** tab
2. Click on latest deploy
3. Check for errors in build log
4. Look for:
   - ✅ `npm run build` succeeded
   - ✅ `dist` folder created
   - ✅ Files published to CDN

### Step 3: Verify Build Output
The build should create:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── _redirects
└── favicon.ico
```

### Step 4: Manual Deploy (if needed)
```bash
cd tmaas

# Clean build
rm -rf dist node_modules
npm install
npm run build

# Deploy manually
netlify deploy --prod --dir=dist
```

---

## Common Issues & Solutions

### Issue: 404 on Page Refresh
**Cause**: SPA routing not configured  
**Solution**: Ensure `_redirects` file exists in `public/` folder ✅ (Already added)

### Issue: Assets Not Loading
**Cause**: Wrong base path  
**Solution**: Ensure `base: "/"` in `vite.config.ts` ✅ (Already set)

### Issue: Build Fails
**Cause**: Missing dependencies  
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Environment Variables Not Working
**Cause**: Variables not set in Netlify  
**Solution**: 
1. Go to Site settings → Environment variables
2. Add: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
3. Redeploy

---

## Verification Checklist

After deployment, verify:

- [ ] Site loads (no blank screen)
- [ ] No console errors
- [ ] All tabs are clickable
- [ ] Navigation works
- [ ] Images load
- [ ] Styles are applied
- [ ] Responsive on mobile

---

## Quick Test

Open browser console (F12) and check:

### ✅ Good Signs:
- No red errors
- React app mounts
- Network tab shows 200 responses

### ❌ Bad Signs:
- MIME type errors
- 404 errors for JS files
- CORS errors

---

## Support

If issues persist:
1. Check Netlify status: https://www.netlifystatus.com
2. Netlify support: https://answers.netlify.com
3. GitHub issues: https://github.com/Anthony-Mwangi-DQ/TMaaS-Service-Delivery-Prototype/issues

---

**Status**: Fixed ✅  
**Last Updated**: January 30, 2026
