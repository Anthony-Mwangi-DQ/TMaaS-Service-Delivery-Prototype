# TMaaS Deployment Guide

## Netlify Deployment

### Method 1: Netlify UI (Recommended for first deployment)

1. **Sign up/Login to Netlify**
   - Go to https://app.netlify.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account
   - Select repository: `Anthony-Mwangi-DQ/TMaaS-Service-Delivery-Prototype`

3. **Configure Build Settings**
   ```
   Base directory: (leave empty)
   Build command: npm run build
   Publish directory: dist
   ```

4. **Add Environment Variables** (Optional - if using Supabase)
   - Click "Show advanced"
   - Add environment variables:
     - Key: `VITE_SUPABASE_URL`, Value: `your_supabase_url`
     - Key: `VITE_SUPABASE_ANON_KEY`, Value: `your_supabase_key`

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (2-3 minutes)
   - Your site will be live at: `https://random-name-123.netlify.app`

6. **Custom Domain** (Optional)
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Follow instructions to configure DNS

---

### Method 2: Netlify CLI

#### Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Login to Netlify
```bash
netlify login
```

#### Deploy from tmaas folder
```bash
cd tmaas

# Build the project
npm run build

# Deploy to Netlify
netlify deploy

# Follow prompts:
# - Create & configure a new site? Yes
# - Team: Select your team
# - Site name: tmaas-customer-platform (or your choice)
# - Publish directory: dist

# For production deployment
netlify deploy --prod
```

---

### Method 3: Continuous Deployment (Auto-deploy on push)

Once deployed via Method 1, Netlify automatically sets up continuous deployment:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "your changes"
   git push
   ```

2. **Automatic Build**
   - Netlify detects the push
   - Automatically builds and deploys
   - Live in 2-3 minutes

3. **Deploy Previews**
   - Pull requests get preview URLs
   - Test changes before merging

---

## Build Configuration

The `netlify.toml` file is already configured with:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

This ensures:
- ✅ Correct build command
- ✅ Correct publish directory
- ✅ SPA routing works (all routes redirect to index.html)
- ✅ Uses Node.js 18

---

## Environment Variables

### For Local Development
Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### For Netlify Production
Add in Netlify UI:
1. Go to Site settings → Environment variables
2. Add variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

**Note**: `.env` file is in `.gitignore` and won't be pushed to GitHub (security)

---

## Troubleshooting

### Build Fails
**Error**: `npm ERR! missing script: build`
- **Solution**: Ensure `package.json` has build script:
  ```json
  "scripts": {
    "build": "vite build"
  }
  ```

### 404 on Routes
**Error**: Refreshing page shows 404
- **Solution**: Ensure `netlify.toml` has redirect rule (already included)

### Environment Variables Not Working
**Error**: Supabase connection fails
- **Solution**: 
  1. Check variable names start with `VITE_`
  2. Redeploy after adding variables
  3. Clear cache: `netlify build --clear-cache`

### Build Takes Too Long
**Error**: Build timeout
- **Solution**: 
  1. Check `node_modules` is in `.gitignore`
  2. Use `npm ci` instead of `npm install` in build command

---

## Post-Deployment Checklist

- [ ] Site loads successfully
- [ ] All 7 tabs are accessible
- [ ] Navigation works (breadcrumbs, links)
- [ ] Images and assets load
- [ ] Responsive design works on mobile
- [ ] Environment variables are set (if using Supabase)
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate is active (automatic on Netlify)

---

## Deployment URLs

### Netlify Default
- Format: `https://[site-name].netlify.app`
- Example: `https://tmaas-customer-platform.netlify.app`

### Custom Domain (Optional)
- Example: `https://tmaas.dqconsulting.com`
- Configure in Netlify → Domain settings

---

## Monitoring & Analytics

### Netlify Analytics (Optional - Paid)
- Real-time visitor data
- Page views and bandwidth
- Top pages and sources

### Google Analytics (Free)
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Rollback

If deployment has issues:

1. **Via Netlify UI**:
   - Go to Deploys
   - Find previous working deploy
   - Click "Publish deploy"

2. **Via CLI**:
   ```bash
   netlify rollback
   ```

---

## Performance Optimization

### Already Configured:
- ✅ Vite build optimization
- ✅ Code splitting
- ✅ Asset compression
- ✅ Tree shaking

### Additional Optimizations:
1. **Enable Netlify CDN** (automatic)
2. **Enable Asset Optimization** (Netlify settings)
3. **Add caching headers** in `netlify.toml`:
   ```toml
   [[headers]]
     for = "/assets/*"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   ```

---

## Support

- **Netlify Docs**: https://docs.netlify.com
- **Netlify Support**: https://answers.netlify.com
- **Project Issues**: https://github.com/Anthony-Mwangi-DQ/TMaaS-Service-Delivery-Prototype/issues

---

**Last Updated**: January 30, 2026  
**Deployment Status**: Ready for Production
