# 🚀 PRIMER-RKA Live Deployment Guide

## 🎯 Quick Deploy to Vercel

### Method 1: One-Click Deploy (Recommended)

Click this button to deploy PRIMER-RKA directly to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F7908837174%2FPRIMER-RKA&env=NODE_ENV,MONGO_URI,SESSION_SECRET,FRONTEND_ORIGIN,VITE_API_BASE_URL&envDescription=Environment%20variables%20for%20PRIMER-RKA&project-name=primer-rka&repository-name=primer-rka)

### Method 2: Manual Deployment

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "Add New" → "Project"**
3. **Import from GitHub**: `https://github.com/7908837174/PRIMER-RKA.git`
4. **Configure Project Settings**:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm run install:all`

## ⚙️ Environment Variables

Set these in Vercel Dashboard → Project Settings → Environment Variables:

```bash
# Required Environment Variables
NODE_ENV=production
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/primer-rka?retryWrites=true&w=majority
SESSION_SECRET=your-very-long-and-secure-session-secret-key
FRONTEND_ORIGIN=https://your-vercel-domain.vercel.app
VITE_API_BASE_URL=/api

# Optional (for Google OAuth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-vercel-domain.vercel.app/api/auth/google/callback
FRONTEND_GOOGLE_CALLBACK_URL=https://your-vercel-domain.vercel.app/auth/google/callback
```

## 🗄️ MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)

1. **Create Account**: https://cloud.mongodb.com
2. **Create New Cluster**:
   - Choose "Shared" (Free tier)
   - Select your preferred region
   - Create cluster
3. **Create Database User**:
   - Go to "Database Access"
   - Add new user with username/password
   - Give "Read and write to any database" permissions
4. **Configure Network Access**:
   - Go to "Network Access"
   - Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
5. **Get Connection String**:
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `primer-rka`

### Option 2: Local MongoDB (Development)

```bash
# Install MongoDB locally
# Update MONGO_URI to: mongodb://localhost:27017/primer-rka
```

## 🔧 Deployment Steps

### Step 1: Prepare Repository
```bash
# Ensure all changes are pushed to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy to Vercel
1. Use the one-click deploy button above, OR
2. Connect your GitHub repository manually in Vercel dashboard

### Step 3: Configure Environment Variables
- Set all required environment variables in Vercel dashboard
- Make sure MONGO_URI points to your MongoDB Atlas cluster

### Step 4: Deploy and Test
- Vercel will automatically build and deploy
- Test the live URL provided by Vercel

## 🧪 Testing Your Live Deployment

### Frontend Testing
- [ ] Application loads correctly
- [ ] Sign-in page displays
- [ ] Google OAuth button works (if configured)
- [ ] Local sign-in form works
- [ ] Navigation works properly

### Backend Testing
- [ ] API endpoints respond: `https://your-domain.vercel.app/api`
- [ ] User registration works
- [ ] Authentication flows work
- [ ] Database operations work

### Integration Testing
- [ ] Frontend communicates with backend
- [ ] User can sign up and sign in
- [ ] Workspace creation works
- [ ] Project and task management works

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in package.json
   - Verify build commands are correct

2. **Database Connection Error**:
   - Verify MONGO_URI is correct
   - Check MongoDB Atlas network access settings
   - Ensure database user has proper permissions

3. **API Not Working**:
   - Check function logs in Vercel dashboard
   - Verify environment variables are set
   - Check CORS configuration

4. **Authentication Issues**:
   - Verify SESSION_SECRET is set
   - Check FRONTEND_ORIGIN matches your domain
   - For Google OAuth, verify client ID/secret

### Getting Help

- **Repository**: https://github.com/7908837174/PRIMER-RKA.git
- **Author**: Kallal
- **Documentation**: Check other .md files in the repository

## 📋 Expected Live URLs

After successful deployment, you should have:

- **Frontend**: `https://your-project-name.vercel.app`
- **API**: `https://your-project-name.vercel.app/api`
- **Health Check**: `https://your-project-name.vercel.app/api` (should return "PRIMER API is running")

## 🎉 Success Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] MongoDB database set up
- [ ] Build completes successfully
- [ ] Frontend loads without errors
- [ ] API endpoints respond correctly
- [ ] Authentication works
- [ ] Core features functional

---

**Ready to deploy? Click the deploy button above or follow the manual steps!** 🚀

**Author**: Kallal  
**Repository**: https://github.com/7908837174/PRIMER-RKA.git