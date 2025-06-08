# Enquiry Form Documentation

## Overview

The Enquiry Form is a multi-step guided form that helps potential customers express their interest in Rush's car subscription service. The form collects user preferences, eligibility information, and contact details through an intuitive step-by-step process.

## Features

### Multi-Step Process
The form consists of 8 steps:

1. **Introduction** - Welcome screen with overview of the process
2. **Purpose Selection** - What type of car service they need (Rideshare, Personal/Business, Fleet)
3. **Employment Status** - Current employment situation
4. **Income Range** - Annual pre-tax income brackets
5. **Location** - Pick-up location preference
6. **Vehicle Preferences** - Fuel type and vehicle category preferences
7. **Driving Restrictions** - License type and restrictions
8. **Contact Information** - Personal details and privacy consent

### User Experience Features

- **Progress Indicators**: Visual dots showing current step and progress
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Form Validation**: Ensures required fields are completed before proceeding
- **Back Navigation**: Users can go back to previous steps to modify their choices
- **Auto-progression**: Most steps automatically advance when a selection is made
- **Brand Consistency**: Uses Rush's brand colors and design language

## Technical Implementation

### Components Used
- React functional component with hooks
- Wouter for routing
- Tailwind CSS for styling
- Custom UI components (Button, Input, Checkbox)

### State Management
- Single `formData` state object containing all form responses
- Step-by-step navigation with `currentStep` state
- Form validation for required fields

### Data Structure
```typescript
interface FormData {
  purpose: string;
  employmentStatus: string;
  income: string;
  location: string;
  fuelType: string[];
  vehicleType: string;
  drivingRestrictions: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agreeToPrivacy: boolean;
}
```

## Navigation

### Entry Points
- Header "Apply now" button (`/enquiry`)
- Home page "Get Started" button (`/enquiry`)
- Direct URL access

### Exit Points
- Form completion redirects to home page
- Users can navigate away at any time using browser controls

## Design Considerations

### Accessibility
- Keyboard navigation support
- Clear visual hierarchy
- Descriptive button text
- Form labels and placeholders

### Mobile Optimization
- Responsive grid layouts
- Touch-friendly button sizes
- Optimized spacing for mobile screens

### Brand Alignment
- Consistent with Rush's teal (#00BFA5) primary color
- Professional gray color scheme
- Clean, modern interface design

## Future Enhancements

### Potential Improvements
1. **Data Persistence**: Save form progress in localStorage
2. **Analytics**: Track step completion rates and drop-off points
3. **A/B Testing**: Test different form flows and copy
4. **Integration**: Connect to CRM or email marketing systems
5. **Conditional Logic**: Show/hide steps based on previous answers
6. **File Upload**: Allow users to upload documents
7. **Real-time Validation**: Validate email and phone formats
8. **Multi-language Support**: Support for different languages

### Backend Integration
The form currently logs data to console. For production:
- Create API endpoint to receive form submissions
- Implement email notifications
- Store data in database
- Set up automated follow-up workflows

## Usage Analytics

Track these metrics to optimize the form:
- Completion rate by step
- Time spent on each step
- Most common drop-off points
- Device and browser usage
- Conversion rate from form completion to subscription

## Maintenance

### Regular Updates
- Review and update location options
- Adjust income brackets based on market conditions
- Update vehicle preference options as new models become available
- Refresh copy and messaging based on user feedback

### Testing
- Regular cross-browser testing
- Mobile device testing
- Form submission testing
- Accessibility testing with screen readers 