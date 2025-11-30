# EcoTrack - Environmental Impact Tracking Platform

A modern, responsive web application for tracking ecological activities, participating in community challenges, earning rewards, and getting AI-powered sustainability advice.

## ✨ New Features

### 🤖 AI Chatbot (EcoBot)
- **Google Gemini Integration** - Get real-time AI responses about sustainability
- Ask questions about environmental practices
- Receive personalized eco-friendly tips
- Works in demo mode without API key
- Click the 💬 button to start chatting

### 👤 Dynamic User Profile
- **Edit Profile** - Change name, email, and settings
- **Dynamic Greeting** - Greeting updates to "Hello, [Your Name]!"
- **Local Storage** - Profile saved between sessions
- **Persistent Settings** - All preferences remembered

### 🎯 Fully Functional Buttons
- **Log Activity** - Track eco-friendly actions
- **Set New Goal** - Create sustainability goals
- **Take a Quiz** - Educational environmental quizzes
- **Suggest an Event** - Propose community activities
- **RSVP to Events** - Register for community events
- **Redeem Rewards** - Convert points to products
- **Play Games** - Interactive environmental games

### 🎯 Community Events & Challenges
- Discover upcoming environmental events in your area
- Search and filter events by type, date, and location
- RSVP to community clean-ups, tree planting, webinars
- Connect with other eco-warriors

### 🎮 Games & Activities
- Interactive eco-games (Recycle Rush, Energy Saver Challenge, etc.)
- Carbon footprint calculator
- Educational trivia
- Earn points and badges

### 👤 Profile & Achievements
- View your eco-impact stats (CO2 saved, trees planted, plastic reduced)
- Unlock and display achievements
- Track completed challenges
- Progress toward next level

### 🛍️ Eco-Shop
- Redeem points for eco-friendly products
- Browse sustainable rewards
- Unlock special badges
- Support reforestation efforts

### 🗺️ Community Map
- Find local recycling centers
- Discover community gardens
- View nearby eco-events
- Connect with community members

## Getting Started

### Installation

1. **Clone or download the project files**
   ```bash
   # All files should be in the same directory
   ```

2. **No build tools required!**
   This is a vanilla HTML/CSS/JavaScript application that runs directly in the browser.

### Gemini AI Setup (Optional)

**To enable the AI chatbot with real responses:**

1. Get a free API key from [Google AI Studio](https://ai.google.dev/tutorials/setup)
2. Open `script.js` and find: `initializeChatbot('YOUR_GEMINI_API_KEY_HERE')`
3. Replace with your API key: `initializeChatbot('YOUR_ACTUAL_API_KEY')`

The chatbot works in demo mode without an API key!

### Running the Application

#### Option 1: Using Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser and navigate to: `http://localhost:8000`

#### Option 2: Using Node.js (if installed)
```bash
npx http-server
```

#### Option 3: Using PHP
```bash
php -S localhost:8000
```

#### Option 4: Direct file access
Simply open `index.html` in your web browser (some features may be limited)

## File Structure

```
├── index.html          # Dashboard page
├── events.html         # Community events & challenges
├── community.html      # Community map and connections
├── profile.html        # User profile and achievements
├── games.html          # Games and activities
├── shop.html           # Rewards shop
├── styles.css          # All styling
├── script.js           # Interactivity and functionality
└── README.md           # This file
```

## Pages Overview

### 1. Dashboard (index.html)
- Welcome greeting
- Carbon footprint stats
- Progress tracking for active goals
- Quick action buttons
- Recent activity feed
- Daily eco-tips

### 2. Events (events.html)
- Search and filter community events
- Event cards with details
- RSVP functionality
- Date, time, and location information
- Pagination for browsing events

### 3. Community (community.html)
- Interactive community map
- Sidebar filters for different location types
- Calendar date picker
- Sidebar for managing community features

### 4. Profile (profile.html)
- User profile information
- Eco-impact statistics
- Achievement badges
- Progress to next level
- Completed challenges list

### 5. Games (games.html)
- Hero banner section
- Game category tabs
- Interactive game cards
- Play buttons for different activities

### 6. Shop (shop.html)
- Featured reward section
- Product/reward grid
- Points display
- Redeem buttons
- Multiple reward categories

## Features & Interactions

### Navigation
- Top navigation bar with links to all pages
- Active page highlighting
- Responsive menu on mobile devices

### Buttons & Actions
- Action buttons for quick activities
- RSVP and Redeem functionality
- Search and filter capabilities
- Tab switching for game categories

### Responsive Design
- Works on desktop, tablet, and mobile
- Responsive grid layouts
- Mobile-friendly navigation
- Touch-friendly buttons

### User Feedback
- Notification system for user actions
- Visual feedback on button clicks
- Smooth animations and transitions

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-green: #22c55e;
    --primary-dark: #15803d;
    --secondary-blue: #3b82f6;
    /* ... more colors ... */
}
```

### Content
Edit HTML files directly to update:
- User names and information
- Event details
- Product descriptions
- Stats and achievements

### Styling
Modify `styles.css` to customize:
- Colors and themes
- Layout and spacing
- Typography
- Responsive breakpoints

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features in Development

The following features are marked as "coming soon":
- Actual game implementations
- Real event booking system
- User authentication
- Real product checkout
- Live map integration

## Performance

- Lightweight: No external dependencies
- Fast load times
- Optimized images and CSS
- Mobile-friendly

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication system
- [ ] Real-time notifications
- [ ] Social features (following, messaging)
- [ ] Advanced analytics dashboard
- [ ] Mobile app versions
- [ ] Payment processing
- [ ] Real map integration

## Support

For issues, questions, or suggestions, please refer to the code comments in:
- `script.js` - JavaScript functionality
- `styles.css` - Styling reference
- Individual HTML files - Component structure

## License

This project is created as an educational and promotional platform for environmental sustainability.

---

**EcoTrack** - *Tracking a Greener Tomorrow*
