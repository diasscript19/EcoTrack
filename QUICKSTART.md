# EcoTrack - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start the Web Server

**Option A: Using Python (Easiest)**
```bash
python -m http.server 8000
```

**Option B: Using Node.js**
```bash
npx http-server
```

**Option C: Double-click batch file**
- Windows users can double-click `start-server.bat`

### Step 2: Open in Browser

1. Open your browser
2. Go to: `http://localhost:8000`
3. Click "Dashboard" or the EcoTrack logo

### Step 3: Explore & Customize

**Edit Your Profile:**
1. Click "Profile" in the menu
2. Click "Edit Profile"
3. Change your name
4. Click "Save Changes"
5. Return to Dashboard - greeting now says "Hello, [Your Name]!"

## 💬 Using the AI Chatbot

**Without API Key (Demo Mode):**
- Click the 💬 button in bottom-right
- Ask about sustainability tips
- Get pre-written eco-friendly advice

**With Gemini API (Real AI):**
1. Get free API key: https://ai.google.dev/tutorials/setup
2. Edit `script.js` line: `initializeChatbot('YOUR_GEMINI_API_KEY_HERE')`
3. Replace with your key: `initializeChatbot('AIzaSyD...')`
4. Reload the page
5. Chatbot now uses real Google Gemini AI

## 🎯 Try the Features

### Dashboard (Homepage)
- ✅ Log Activity button
- ✅ Set New Goal button  
- ✅ Take a Quiz button
- View your stats and progress

### Events Page
- ✅ Search events
- ✅ RSVP to events
- ✅ Suggest new events
- Filter by type, date, location

### Profile Page
- ✅ Edit your name and info
- View achievements
- Track completed challenges
- See your eco-impact stats

### Games Page
- ✅ Play games
- Earn points and XP
- Test your eco-knowledge

### Shop Page
- ✅ Redeem rewards
- Browse products
- Convert points to items

### Community Map
- Find local recycling centers
- Discover community gardens
- Filter events and activities

## 📊 Profile Features

### Change Your Name
1. Profile → Edit Profile
2. Update "Full Name"
3. Save
4. Greeting updates everywhere!

### Track Your Progress
- Points balance
- Eco level (1-10)
- CO2 saved
- All persisted locally

## 🤖 Chatbot Features

### Ask About:
- Carbon footprint reduction
- Recycling tips
- Energy conservation
- Water conservation
- Green transportation
- Sustainable living

### Try These Questions:
- "How can I reduce my carbon footprint?"
- "What's the best way to recycle?"
- "How do I save energy at home?"
- "How many trees should I plant?"

## 📱 Mobile Friendly

- Works on phones and tablets
- Responsive design
- Touch-friendly buttons
- Optimized chatbot on mobile

## 🔐 Privacy

- Data stored locally (browser)
- No server accounts needed
- Clear cookies to reset
- API key recommendations: Use environment variables in production

## ⚙️ Troubleshooting

### "Can't connect to server"
- Make sure server is running
- Try http://localhost:8000 (not https)
- Check if port 8000 is available

### "Greeting not updating"
- Refresh the page (Ctrl+R)
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private mode

### "Chatbot not responding"
- Check internet connection
- Verify API key if configured
- Try demo mode instead
- Check F12 → Console for errors

## 📚 File Structure

```
├── index.html          (Dashboard)
├── events.html         (Events & Challenges)
├── community.html      (Community Map)
├── profile.html        (User Profile)
├── games.html          (Games & Activities)
├── shop.html           (Reward Shop)
├── styles.css          (All styling)
├── script.js           (All functionality)
├── README.md           (Documentation)
├── SETUP_GUIDE.md      (Detailed setup)
├── QUICKSTART.md       (This file)
└── start-server.bat    (Windows launcher)
```

## 🎓 Learning Resources

- [Google Gemini API Docs](https://ai.google.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

---

**Enjoy exploring EcoTrack! 🌱**
