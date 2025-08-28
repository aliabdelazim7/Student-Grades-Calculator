# Advanced Grade Calculator

A modern, feature-rich grade calculator with beautiful themes, student management, and comprehensive statistics.

## Features

- **Modern Design**: Clean, responsive interface with glassmorphism effects
- **Theme Switching**: Toggle between dark and light themes
- **Student Management**: Add, delete, and manage student records
- **Grade Calculation**: Automatic letter grade calculation (A, B, C, D, F)
- **Pass/Fail Status**: Clear indication of whether students passed (≥50%) or failed (<50%)
- **Visual Grade Display**: Letter grade prominently displayed above student names
- **Enhanced Statistics**: View total students, average grades, highest grades, A students, passing and failing counts
- **Sorting**: Sort students by grade (high to low or low to high)
- **Data Persistence**: All data is saved locally in your browser
- **Responsive Design**: Works perfectly on all device sizes
- **Notifications**: Beautiful toast notifications for user feedback
- **Form Validation**: Input validation with helpful error messages

## How to Use

1. **Add Students**: Fill in the form with student name, age, and grade percentage
2. **View Statistics**: See real-time updates of class statistics
3. **Manage Students**: Delete individual students or clear all at once
4. **Sort Students**: Click the sort button to organize students by grade
5. **Theme Toggle**: Click the moon/sun button to switch between themes

## Grade Scale

- **A+**: 95-100%
- **A**: 85-94%
- **B**: 70-84%
- **C**: 60-69%
- **D**: 50-59%
- **F**: 0-49%

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Grid)
- Vanilla JavaScript (ES6+)
- Google Fonts (Poppins)
- Font Awesome Icons
- Local Storage for data persistence

## File Structure

```
Grade Calc/
├── index.html      # Main HTML structure
├── style.css       # Styling and themes
├── script.js       # Grade calculator logic
└── README.md       # This file
```

## Getting Started

1. Open `index.html` in your web browser
2. Start adding students and managing grades!
3. Try switching themes and exploring all features

## Browser Support

Works in all modern browsers that support:

- CSS Grid
- CSS Variables
- ES6 Classes
- Local Storage
- CSS Animations

## Data Storage

All student data is stored locally in your browser using Local Storage. This means:

- Your data persists between browser sessions
- Data is private and not shared with any servers
- You can clear data using the "Clear All" button
