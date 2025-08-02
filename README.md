# Splitwise UI - Modern Angular Application

A clean and modern Angular 19 application built with Angular Material and Bootstrap for expense tracking and bill splitting.

## 🚀 Features

- **Modern Design**: Clean UI with Angular Material components and Bootstrap responsive classes
- **Authentication**: Login and Register pages with form validation
- **Responsive Layout**: Mobile-first design using Bootstrap grid system
- **Scalable Architecture**: Feature-based folder structure
- **Type Safety**: Full TypeScript support
- **Lazy Loading**: Route-based code splitting for optimal performance

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/                     # Core functionality (singleton services, guards, models)
│   │   ├── guards/              # Route guards (auth protection)
│   │   ├── services/            # Core services (auth, etc.)
│   │   └── models/              # Data models and interfaces
│   ├── features/                # Feature modules
│   │   ├── auth/               # Authentication feature
│   │   │   ├── login/          # Login component
│   │   │   └── register/       # Register component
│   │   ├── dashboard/          # Dashboard feature
│   │   └── landing/            # Landing page
│   ├── shared/                  # Shared components, services, utilities
│   │   ├── components/         # Reusable components
│   │   └── services/           # Shared services
│   ├── app.component.*         # Root component
│   ├── app.config.ts           # App configuration
│   └── app.routes.ts           # Route definitions
├── styles.scss                 # Global styles
└── index.html                  # Main HTML file
```

## 🛠️ Technologies Used

- **Angular 19**: Latest Angular framework
- **Angular Material**: Material Design components
- **Bootstrap**: Responsive grid system and utilities
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling with variables and mixins
- **RxJS**: Reactive programming for async operations
- **ESLint**: Code linting with Angular-specific rules
- **Prettier**: Code formatting for consistent style

## 🔍 Code Quality & Formatting

This project includes ESLint and Prettier for maintaining high code quality and consistent formatting.

### ESLint Configuration

The project uses a comprehensive ESLint setup with:

- **Angular-specific rules**: Component and directive naming conventions
- **TypeScript rules**: Type safety and best practices
- **Code complexity rules**: Maintaining readable and maintainable code
- **Accessibility rules**: Ensuring templates are accessible

### Prettier Configuration

Prettier is configured with sensible defaults for:

- **Print width**: 100 characters
- **Indentation**: 2 spaces
- **Single quotes**: For TypeScript/JavaScript
- **Trailing commas**: ES5 compatible
- **Angular templates**: Special handling for HTML files

### Available Scripts

```bash
# Linting
npm run lint              # Check for linting errors
npm run lint:fix          # Fix auto-fixable linting errors

# Formatting
npm run format            # Format all source files
npm run format:check      # Check if files are properly formatted
npm run format:fix        # Same as format (alias)

# Combined checks
npm run check             # Run both format check and lint
npm run fix               # Run both format and lint with fixes
```

### VS Code Integration

The project includes VS Code configuration for:

- **Auto-formatting on save**: Prettier formats files automatically
- **ESLint integration**: Shows linting errors inline
- **Recommended extensions**: ESLint, Prettier, and Angular Language Service

### ESLint Rules Highlights

**Angular Rules:**

- Component and directive naming conventions
- Lifecycle method implementations
- Template accessibility checks
- Avoiding calling expressions in templates

**TypeScript Rules:**

- No unused variables (with underscore prefix exception)
- Consistent type definitions using interfaces
- Array type consistency
- Member ordering in classes

**General Rules:**

- Console statements limited to warnings and errors
- Preference for const over let
- Template literal usage
- Object shorthand syntax

## 🎨 Design Features

- **Material Design**: Using Angular Material components
- **Responsive Design**: Bootstrap classes for all screen sizes
- **Modern Color Palette**: Indigo primary with pink accent colors
- **Smooth Animations**: CSS transitions and Angular animations
- **Clean Typography**: Roboto font family
- **Card-based Layout**: Modern card design for content sections

## 🔧 Development Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm start
   ```

3. **Build for production**:

   ```bash
   npm run build
   ```

4. **Run tests**:
   ```bash
   npm test
   ```

## 📱 Responsive Breakpoints

The application uses Bootstrap's responsive grid system:

- **xs**: < 576px (phones)
- **sm**: ≥ 576px (landscape phones)
- **md**: ≥ 768px (tablets)
- **lg**: ≥ 992px (desktops)
- **xl**: ≥ 1200px (large desktops)

## 🔐 Authentication Flow

1. **Landing Page**: Redirects to dashboard if authenticated, login if not
2. **Login/Register**: Form validation with Material Design inputs
3. **Dashboard**: Protected route requiring authentication
4. **Auth Guard**: Automatically redirects unauthenticated users

## 🧩 Key Components

### Authentication Service

- User management and session handling
- Mock authentication (ready for backend integration)
- Observable-based state management

### Auth Guard

- Route protection for authenticated pages
- Automatic redirection to login

### Responsive Components

- Mobile-first design approach
- Flexible layouts using Bootstrap grid
- Material Design form components

## 🔄 State Management

The application uses:

- **Services with BehaviorSubject**: For reactive state management
- **LocalStorage**: For persistent authentication state
- **RxJS Observables**: For reactive data flow

## 🎯 Future Enhancements

- Backend API integration
- Real expense tracking features
- Group management
- Push notifications
- Dark theme support
- Progressive Web App (PWA) features

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Angular 19, Angular Material, and Bootstrap
