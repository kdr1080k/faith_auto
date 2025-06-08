# FlexCar Design System

## Overview

The FlexCar design system provides a comprehensive set of guidelines, components, and tools to ensure consistency and quality across all digital products.

## Brand Identity

### Logo

The FlexCar logo represents flexibility, mobility, and innovation. It should be used consistently across all platforms.

#### Usage Guidelines
- Maintain clear space around the logo
- Use the official color version
- Don't modify or distort the logo
- Don't add effects or shadows

### Colors

#### Primary Colors
- Primary: #00BFA5
- Secondary: #263238
- Accent: #00C8AA

#### Text Colors
- Light Text: #FFFFFF
- Dark Text: #90A4AE
- Body Text: #37474F

#### Status Colors
- Success: #4CAF50
- Warning: #FFC107
- Error: #F44336
- Info: #2196F3

### Typography

#### Font Families
- Headings: Inter
- Body: Roboto
- Monospace: JetBrains Mono

#### Font Sizes
- H1: 48px
- H2: 36px
- H3: 24px
- H4: 20px
- Body: 16px
- Small: 14px
- XSmall: 12px

#### Font Weights
- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700

## Components

### Buttons

#### Primary Button
```jsx
<Button variant="primary">
  Subscribe Now
</Button>
```

#### Secondary Button
```jsx
<Button variant="secondary">
  Learn More
</Button>
```

#### Ghost Button
```jsx
<Button variant="ghost">
  Cancel
</Button>
```

### Cards

#### Vehicle Card
```jsx
<Card>
  <CardImage src={vehicle.image} alt={vehicle.name} />
  <CardContent>
    <CardTitle>{vehicle.name}</CardTitle>
    <CardPrice>${vehicle.price}/month</CardPrice>
    <CardFeatures>
      {vehicle.features.map(feature => (
        <CardFeature key={feature}>{feature}</CardFeature>
      ))}
    </CardFeatures>
  </CardContent>
</Card>
```

### Forms

#### Input Fields
```jsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
/>
```

#### Select Fields
```jsx
<Select
  label="Vehicle Type"
  options={vehicleTypes}
  placeholder="Select vehicle type"
/>
```

### Navigation

#### Header
```jsx
<Header>
  <Logo />
  <Nav>
    <NavItem>Home</NavItem>
    <NavItem>Vehicles</NavItem>
    <NavItem>About</NavItem>
    <NavItem>Contact</NavItem>
  </Nav>
  <UserMenu />
</Header>
```

## Layout

### Grid System

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
```

### Spacing

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;
}
```

### Breakpoints

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

## Icons

### Icon System

We use Heroicons for our icon system. Icons should be used consistently across the application.

```jsx
<Icon name="car" size={24} />
<Icon name="user" size={20} />
<Icon name="search" size={16} />
```

## Animations

### Transitions

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
```

### Hover Effects

```css
.button {
  transition: transform var(--transition-normal);
}

.button:hover {
  transform: translateY(-2px);
}
```

## Accessibility

### Color Contrast

All text must meet WCAG 2.1 AA standards for contrast:
- Normal text: 4.5:1
- Large text: 3:1

### Focus States

```css
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Screen Reader Support

```jsx
<Button aria-label="Close modal">
  <Icon name="close" />
</Button>
```

## Responsive Design

### Mobile First

```css
/* Base styles for mobile */
.container {
  padding: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 24px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
  }
}
```

### Responsive Images

```jsx
<Image
  src={image.src}
  srcSet={image.srcSet}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt={image.alt}
/>
```

## Best Practices

### Performance

- Optimize images
- Lazy load components
- Minimize bundle size
- Use code splitting

### Code Quality

- Follow component patterns
- Use TypeScript
- Write unit tests
- Document components

### Design Tokens

```javascript
const tokens = {
  colors: {
    primary: '#00BFA5',
    secondary: '#263238',
    // ...
  },
  typography: {
    fontFamily: {
      heading: 'Inter',
      body: 'Roboto',
    },
    // ...
  },
  spacing: {
    // ...
  },
};
```

## Resources

### Design Tools

- Figma: [FlexCar Design System](https://figma.com/flexcar)
- Storybook: [Component Library](https://storybook.flexcar.com)

### Documentation

- [Component API](https://docs.flexcar.com/components)
- [Design Guidelines](https://docs.flexcar.com/design)
- [Accessibility Guide](https://docs.flexcar.com/accessibility)

### Support

For design system support:
- Email: design@flexcar.com
- Slack: #design-system
- Documentation: https://design.flexcar.com 