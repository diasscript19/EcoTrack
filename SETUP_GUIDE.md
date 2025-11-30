# EcoTrack - Setup Guide

## Features Added

### ✨ New Features:

1. **AI Chatbot (EcoBot)** - Powered by Google Gemini
   - Get eco-friendly tips and advice
   - Answer sustainability questions
   - Learn about environmental practices
   - Click the 💬 button in the bottom-right corner

2. **User Profile Management**
   - Edit your name, email, and other details
   - Changes are saved locally
   - Greeting updates dynamically: "Hello, [Your Name]!"
   - Access via Profile page → Edit Profile button

3. **Functional Interactive Buttons**
   - Log Activity - Track eco-friendly actions
   - Set New Goal - Create sustainability goals
   - Take a Quiz - Test your environmental knowledge
   - Suggest an Event - Propose community events
   - RSVP to Events - Register for community activities
   - Redeem Rewards - Convert points to products
   - Play Games - Access interactive games

## Setting Up Gemini AI Chatbot

### Option 1: Using Free Gemini API (Recommended)

1. **Get your API Key:**
   - Visit: https://ai.google.dev/tutorials/setup
   - Click "Get API Key in Google AI Studio"
   - Create a new API key (it's free!)

2. **Add API Key to EcoTrack:**
   - Open `script.js` in a text editor
   - Find this line: `initializeChatbot('YOUR_GEMINI_API_KEY_HERE')`
   - Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key
   - Example: `initializeChatbot('AIzaSyD...')`
   - Save the file

3. **Test the Chatbot:**
   - Click the 💬 button in the bottom-right corner
   - Type a question about sustainability
   - The bot will respond with eco-friendly tips

### Option 2: Using Demo Mode (No API Key Needed)

If you don't want to set up an API key, the chatbot runs in demo mode:
- Pre-made responses about sustainability
- Works immediately without setup
- Great for testing and demonstration

## Using the Dynamic Greeting

### Changing Your Name:

1. **Go to Profile Page**
   - Click "Profile" in the navigation menu
   - Or click the 👤 button in the top-right

2. **Edit Your Profile**
   - Click "Edit Profile" button
   - Change your Full Name
   - Click "Save Changes"
   - The greeting on Dashboard will now say "Hello, [Your New Name]!"

### Persistent Storage:

- Your profile information is saved in browser's local storage
- It persists between sessions (until browser data is cleared)
- Each device/browser has its own saved profile

## Feature Details

### Log Activity
- Track sustainable actions (cycling, recycling, vegetarian meals, etc.)
- Record duration or amount
- Add personal notes
- Contributions are logged to your activity feed

### Set New Goal
- Create personal sustainability goals
- Set target dates
- Track progress
- Get notifications when you reach milestones

### Take a Quiz
- Test your environmental knowledge
- 5 questions per quiz
- Earn experience points (XP)
- Different topics available

### Suggest an Event
- Propose new community events
- Specify date, location, and details
- Help grow the community calendar
- Suggestions reviewed by administrators

### RSVP to Events
- Register for upcoming community events
- Get event details and directions
- Connect with other eco-warriors
- Track your event attendance

### Redeem Rewards
- Convert earned points to products
- Eco-friendly merchandise available
- Support environmental causes
- Track your rewards history

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Privacy & Security

- All data stored locally in your browser
- No personal data sent to servers (except API calls to Gemini)
- Your API key should be kept confidential
- Don't share your API key with others

## Troubleshooting

### Chatbot Not Responding
- Check if API key is correctly configured
- Verify internet connection
- Check browser console for errors (F12 → Console)
- Try demo mode if API setup is unsuccessful

### Greeting Not Updating
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure JavaScript is enabled
- Try a different browser
- Check localStorage is not full

### Buttons Not Working
- Refresh the page (Ctrl+R)
- Clear browser cookies
- Check JavaScript console for errors
- Ensure you're on the correct page

## Support

For issues or questions:
1. Check browser console (F12 → Console) for error messages
2. Verify all files are in the same directory
3. Try running in a different browser
4. Check that JavaScript is enabled

## Customization

### Change Chatbot Greeting
Edit the initial message in `script.js`:
```javascript
<p>Hello! I'm EcoBot, your sustainability assistant. How can I help you today?</p>
```

### Change Chatbot Color
Edit chatbot styles in `styles.css` or `script.js`:
```css
background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
```

### Add More Activities
Edit the activity options in `showActivityModal()` function in `script.js`

---

**EcoTrack** - Making sustainability interactive and fun! 🌱
