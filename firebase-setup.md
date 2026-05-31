# WorkoutForge — Firebase Setup Guide

## Step 1: Create a Firebase Project

1. Go to https://console.firebase.google.com
2. Click **Add project**
3. Name it `WorkoutForge`
4. Disable Google Analytics (optional)
5. Click **Create project**

---

## Step 2: Enable Authentication Providers

In Firebase Console → **Authentication** → **Sign-in method**:

### Email/Password
- Click **Email/Password** → Enable → Save

### Google
- Click **Google** → Enable
- Set your **Project support email**
- Save

### Phone
- Click **Phone** → Enable → Save
- ⚠️ Phone auth requires domain verification (Step 5)

### Anonymous (Guest)
- Click **Anonymous** → Enable → Save

### Apple Sign-In (requires paid Apple Developer account)
To add later:
1. Enroll in Apple Developer Program ($99/year)
2. Create a **Service ID** at developer.apple.com
3. In Firebase → Apple → paste your Service ID + private key
4. Add `YOUR_DOMAIN` to Apple's list of allowed redirect URIs

### Microsoft Sign-In (requires Azure account)
To add later:
1. Go to portal.azure.com → Azure Active Directory → App registrations
2. Register new app, set redirect URI to: `https://workoutforge-XXXXX.firebaseapp.com/__/auth/handler`
3. Copy Application (client) ID and Secret into Firebase → Microsoft provider

---

## Step 3: Get Your Firebase Config

1. Firebase Console → **Project Settings** (gear icon)
2. Scroll to **Your apps** → click **Web** (`</>`)
3. Register app name: `WorkoutForge`
4. ✅ Check **Also set up Firebase Hosting** (optional but recommended)
5. Copy the config object — it looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "workoutforge-xxxxx.firebaseapp.com",
  projectId: "workoutforge-xxxxx",
  storageBucket: "workoutforge-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

6. **Paste this into script.js** where it says `PASTE_YOUR_FIREBASE_CONFIG_HERE`

---

## Step 4: Set Authorized Domains

Firebase Console → Authentication → **Settings** → **Authorized domains**

Add:
- `localhost` (for local testing)
- `yourusername.github.io` (your GitHub Pages domain)
- Any custom domain you add later

---

## Step 5: Enable Firestore (for saving user data)

1. Firebase Console → **Firestore Database** → Create database
2. Choose **Start in test mode** (fine for development)
3. Choose a region close to you
4. Click **Enable**

Firestore security rules (paste in Firestore → Rules tab):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## Step 6: Phone Auth — reCAPTCHA domain

For phone auth to work on GitHub Pages:
1. Firebase Console → Authentication → Settings → Authorized domains
2. Add `yourusername.github.io`
3. Phone auth uses invisible reCAPTCHA automatically via Firebase SDK

---

## Step 7: Deploy to GitHub Pages

1. Push all files to your GitHub repo
2. Settings → Pages → Branch: main → Save
3. Your site: `https://yourusername.github.io/workoutforge`

---

## Quick Checklist Before Going Live

- [ ] Firebase config pasted into script.js
- [ ] GitHub Pages domain added to Firebase Authorized Domains
- [ ] Email/Password provider enabled
- [ ] Google provider enabled  
- [ ] Phone provider enabled
- [ ] Anonymous provider enabled
- [ ] Firestore database created
- [ ] Firestore rules set

