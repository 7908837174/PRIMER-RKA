# 🔧 AUTO GOOGLE OAUTH SETUP

## 🎯 AUTOMATIC CONFIGURATION GUIDE

### **Current Status:**
- ✅ Backend configured for Google OAuth
- ✅ Frontend has Google login button
- ⚠️ Needs redirect URI configuration

### **AUTOMATIC SETUP STEPS:**

#### **1. Google Cloud Console Configuration**
```bash
# Current OAuth Client ID: 635365440124-harj2p77tlf90sljsdp756g9l687qd20.apps.googleusercontent.com
# Add this redirect URI: https://furry-spring-production.up.railway.app/api/auth/google/callback
```

#### **2. Auto-Update Script (Run this):**
```bash
# Update Railway environment variables
railway variables --set "GOOGLE_CALLBACK_URL=https://furry-spring-production.up.railway.app/api/auth/google/callback"
railway variables --set "FRONTEND_ORIGIN=https://primer-rka-live.surge.sh"
railway variables --set "FRONTEND_GOOGLE_CALLBACK_URL=https://primer-rka-live.surge.sh/auth/google/callback"

# Redeploy backend
railway up
```

#### **3. Test Google OAuth:**
```bash
# Visit: https://primer-rka-live.surge.sh/sign-in
# Click "Continue with Google"
# Should redirect to Google authentication
```

### **AUTOMATIC VERIFICATION:**

#### **Expected Flow:**
1. User clicks "Continue with Google" on frontend
2. Redirects to: `https://accounts.google.com/oauth/authorize?...`
3. User authenticates with Google
4. Google redirects to: `https://furry-spring-production.up.railway.app/api/auth/google/callback`
5. Backend processes authentication
6. Redirects user back to: `https://primer-rka-live.surge.sh/workspace/{id}`

#### **Success Indicators:**
- ✅ No "redirect_uri_mismatch" error
- ✅ User successfully logs in with Google
- ✅ User is redirected to dashboard
- ✅ Session is created and maintained

### **TROUBLESHOOTING:**

#### **Common Issues:**
1. **Redirect URI Mismatch**: Add the Railway URL to Google Cloud Console
2. **CORS Errors**: Backend FRONTEND_ORIGIN is configured correctly
3. **Session Issues**: Check SESSION_SECRET is set in Railway

#### **Quick Fixes:**
```bash
# Check current variables
railway variables

# Update if needed
railway variables --set "FRONTEND_ORIGIN=https://primer-rka-live.surge.sh"

# Restart service
railway up
```

### **MANUAL GOOGLE CLOUD CONSOLE STEPS:**

1. **Go to**: https://console.cloud.google.com/
2. **Navigate**: APIs & Services → Credentials
3. **Find**: OAuth 2.0 Client ID (635365440124-...)
4. **Edit**: Click the pencil icon
5. **Add URI**: `https://furry-spring-production.up.railway.app/api/auth/google/callback`
6. **Save**: Click Save button

### **VERIFICATION COMMANDS:**

```bash
# Test backend OAuth endpoint
curl https://furry-spring-production.up.railway.app/api/auth/google

# Should redirect to Google (302 status)
# If you see redirect_uri_mismatch, update Google Cloud Console
```

---

**🎯 GOAL**: Make Google OAuth work automatically with one click!

**STATUS**: Ready for automatic implementation once redirect URI is added to Google Cloud Console.
