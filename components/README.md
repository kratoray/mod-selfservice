# Components Directory Structure

This project follows the Atomic Design methodology for organizing React components. The structure is designed to promote reusability, maintainability, and scalability.

## Directory Structure

```
components/
├── atoms/          # Basic building blocks
├── molecules/      # Simple combinations of atoms
├── organisms/      # Complex combinations of molecules and atoms
├── templates/      # Page layouts and structure
├── pages/          # Complete page components
└── index.ts        # Barrel exports
```

## Component Categories

### Atoms

Basic building blocks that cannot be broken down further.

- **Location**: `/components/atoms/`
- **Examples**:
  - Buttons
  - Input fields
  - Labels
  - Icons
  - Typography elements
- **Guidelines**:
  - Should be self-contained
  - No business logic
  - Highly reusable
  - Include proper TypeScript types
  - Include unit tests

### Molecules

Simple combinations of atoms that form a functional unit.

- **Location**: `/components/molecules/`
- **Examples**:
  - Form fields (label + input)
  - Search bars
  - Navigation items
  - Cards
- **Guidelines**:
  - Combine multiple atoms
  - Handle simple interactions
  - Include proper TypeScript types
  - Include unit tests

### Organisms

Complex UI components composed of molecules and atoms.

- **Location**: `/components/organisms/`
- **Examples**:
  - Navigation bars
  - Forms
  - Tables
  - Complex cards
- **Guidelines**:
  - Handle complex interactions
  - May include business logic
  - Include proper TypeScript types
  - Include unit tests
  - Document complex logic

### Templates

Page-level objects that define the layout structure.

- **Location**: `/components/templates/`
- **Examples**:
  - Page layouts
  - Grid systems
  - Dashboard layouts
- **Guidelines**:
  - Define page structure
  - Handle layout logic
  - Include proper TypeScript types
  - Document layout requirements

### Pages

Complete page components that use templates and organisms.

- **Location**: `/components/pages/`
- **Examples**:
  - Home page
  - Profile page
  - Dashboard page
- **Guidelines**:
  - Use templates for layout
  - Handle page-specific logic
  - Include proper TypeScript types
  - Document page requirements

## Component Guidelines

### File Structure

Each component should follow this structure:

```typescript
// ComponentName.tsx
import { FC } from 'react';
import { ComponentNameProps } from './types';

export const ComponentName: FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  return (
    // Component JSX
  );
};
```

### TypeScript Types

Each component should have its own types file:

```typescript
// types.ts
export interface ComponentNameProps {
  prop1: string;
  prop2: number;
  // ... other props
}
```

### Testing

Each component should have a corresponding test file:

```typescript
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react';

import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    // Test implementation
  });
});
```

## Import Guidelines

### Using Barrel Exports

Import components using the barrel exports:

```typescript
// Import from specific category
import { Button } from '@/components/atoms';
import { SearchBar } from '@/components/molecules';
import { NavBar } from '@/components/organisms';

// Or import everything from main index
import { Button, SearchBar, NavBar } from '@/components';
```

## Best Practices

1. **Naming Conventions**

   - Use PascalCase for component names
   - Use camelCase for files and functions
   - Use kebab-case for CSS modules

2. **Component Organization**

   - Keep components focused and single-responsibility
   - Use composition over inheritance
   - Implement proper prop types
   - Include JSDoc comments for complex components

3. **State Management**

   - Use local state for component-specific state
   - Use context for shared state
   - Consider using React Query for server state

4. **Performance**

   - Implement proper memoization
   - Use React.memo for pure components
   - Implement proper code splitting
   - Use Next.js Image component for images

5. **Accessibility**
   - Include proper ARIA attributes
   - Ensure keyboard navigation
   - Maintain proper heading hierarchy
   - Include proper alt text for images

## Adding New Components

1. Create a new directory in the appropriate category
2. Create the component file with proper TypeScript types
3. Create a test file
4. Add the component to the barrel exports
5. Document the component usage
6. Add proper JSDoc comments
7. Implement unit tests
