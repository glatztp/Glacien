# Contributing to @glacien/ui

Thank you for considering contributing to @glacien/ui! Your contributions are highly valued and help make this library even better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

There are several ways to contribute:

- **Bug Reports** - Help us identify and fix issues
- **Feature Suggestions** - Propose new components and functionality
- **Documentation** - Improve guides, examples, and API documentation
- **Code Contributions** - Fix bugs, add features, and enhance performance

### Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0
- **Git** for version control
- A **GitHub account**

### Local Development Setup

1. **Fork and clone the repository**

   ```bash
   gh repo fork glatztp/Glacien--clone
   cd Glacien
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Verify the setup**
   ```bash
   npm run build
   npm run test
   npm run lint
   ```

## Development Process

### Repository Structure

```
src/
├── components/          # React components
│   ├── ui/             # Core UI components
│   ├── pages/          # Documentation pages
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and helpers
├── styles/             # CSS files and styling
└── types/              # TypeScript type definitions
```

### Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch for upcoming releases
- `feature/*` - New features and enhancements
- `fix/*` - Bug fixes and patches
- `docs/*` - Documentation updates

### Technology Stack

- **React** - UI library
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations
- **Vite** - Fast build tool and development server

## Pull Request Process

### 1. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### 2. Make Your Changes

- Follow our [coding standards](#coding-standards)
- Add tests for new functionality
- Update documentation as needed
- Ensure accessibility compliance

### 3. Test Your Changes

```bash
npm run test           # Run all tests
npm run lint          # Check code style
npm run type-check    # Verify TypeScript
npm run build         # Test production build
```

### 4. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
git commit -m "feat: add new DatePicker component"
git commit -m "fix: resolve button focus issue"
git commit -m "docs: update installation guide"
```

**Commit Types:**

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Formatting and style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/amazing-feature
```

Create a pull request with:

- Clear title and description
- Reference to related issues
- Screenshots for UI changes
- Testing notes

## Issue Guidelines

### Bug Reports

Before reporting a bug:

1. Search existing issues to avoid duplicates
2. Test with the latest version
3. Provide a minimal reproduction case

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**

- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]
- @glacien/ui version: [e.g. 2.2.1]

**Additional context**
Add any other context about the problem here.
```

### Feature Requests

**Feature Request Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request.
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for component props
- Use strict type checking
- Prefer interfaces over type aliases for object shapes

```typescript
interface ButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  children: React.ReactNode;
}
```

### React Components

- Use functional components with hooks
- Forward refs for component composition
- Use `React.forwardRef` for proper ref handling
- Include `displayName` for debugging

```typescript
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "default", size = "default", asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Create variants with `class-variance-authority`
- Maintain consistent spacing and sizing
- Follow the design system tokens

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Accessibility Standards

- Follow WCAG 2.1 AA guidelines
- Use semantic HTML elements
- Provide proper ARIA attributes
- Ensure keyboard navigation support
- Include focus indicators
- Test with screen readers

## Testing Guidelines

### Unit Testing

- Write tests for all new components
- Use Jest and React Testing Library
- Test component behavior, not implementation details
- Aim for high code coverage

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    screen.getByRole("button").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Accessibility Testing

- Use `@axe-core/react` for automated testing
- Test keyboard navigation manually
- Verify screen reader compatibility
- Check color contrast ratios

### Visual Testing

- Create Storybook stories for components
- Include all variants and states
- Document usage examples
- Test responsive behavior

## Documentation

### Component Documentation

- Add comprehensive JSDoc comments
- Document all props and their purposes
- Include usage examples
- Note accessibility considerations

````typescript
/**
 * A flexible button component that supports multiple variants and sizes.
 *
 * @example
 * ```tsx
 * <Button variant="outline" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export interface ButtonProps {
  /**
   * The visual style variant of the button
   * @default "default"
   */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";

  /**
   * The size of the button
   * @default "default"
   */
  size?: "default" | "sm" | "lg" | "icon";
}
````

### Storybook Stories

- Create comprehensive stories for each component
- Include controls for all props
- Document component behavior
- Provide code examples

## Release Process

Releases are managed by maintainers and follow semantic versioning:

- **Patch** (x.x.1): Bug fixes and small improvements
- **Minor** (x.1.x): New features and components
- **Major** (1.x.x): Breaking changes

## Getting Help

- **Documentation**: [https://Glacien.online/docs](https://Glacien.online/docs)
- **Issues**: [GitHub Issues](https://github.com/glatztp/Glacien/issues)
- **Discussions**: [GitHub Discussions](https://github.com/glatztp/Glacien/discussions)

## Recognition

Contributors are recognized in:

- Project README
- Release notes
- Contributors section on our website

Thank you for contributing to @glacien/ui!
