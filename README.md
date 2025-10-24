# TouchSpin React

[![npm version](https://badge.fury.io/js/%40touchspin%2Freact.svg)](https://badge.fury.io/js/%40touchspin%2Freact)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

React adapter for TouchSpin numeric input spinner - A feature-rich, accessible number input component with increment/decrement buttons.

## ✨ Features

- 🎛️ **Multiple Renderers** - Bootstrap 3/4/5, Tailwind CSS, and Vanilla CSS
- 📱 **Touch & Mouse Support** - Works on desktop and mobile devices
- ♿ **Accessible** - Full keyboard navigation and screen reader support
- 🎯 **TypeScript** - Complete type definitions included
- ⚡ **Performance** - Lightweight and fast
- 🎨 **Customizable** - Extensive styling and behavior options
- 🔄 **Reactive & Imperative** - Both declarative props and direct API control

## 📦 Installation

```bash
npm install @touchspin/react @touchspin/core
# or
yarn add @touchspin/react @touchspin/core
# or
pnpm add @touchspin/react @touchspin/core
```

## 🚀 Quick Start

```tsx
import { useState } from 'react';
import TouchSpin from '@touchspin/react/vanilla';
import '@touchspin/renderer-vanilla/css';

function App() {
  const [value, setValue] = useState(25);

  return (
    <TouchSpin
      value={value}
      onChange={setValue}
      min={0}
      max={100}
      step={1}
    />
  );
}
```

## 🎨 Available Renderers

Choose the renderer that matches your design system:

| Renderer | Import | CSS Import | Description |
|----------|--------|------------|-------------|
| **Vanilla** | `@touchspin/react/vanilla` | `@touchspin/renderer-vanilla/css` | Clean, framework-free styling |
| **Bootstrap 5** | `@touchspin/react/bootstrap5` | `@touchspin/renderer-bootstrap5/css` | Bootstrap 5 compatible |
| **Bootstrap 4** | `@touchspin/react/bootstrap4` | `@touchspin/renderer-bootstrap4/css` | Bootstrap 4 compatible |
| **Bootstrap 3** | `@touchspin/react/bootstrap3` | `@touchspin/renderer-bootstrap3/css` | Bootstrap 3 compatible |
| **Tailwind** | `@touchspin/react/tailwind` | `@touchspin/renderer-tailwind/css` | Tailwind CSS styling |

## 📋 API Reference

### Props

#### Value Management
```tsx
<TouchSpin
  value={number}                    // Current value
  defaultValue={number}             // Initial value (uncontrolled)
  onChange={(value, meta) => void}  // Value change handler
/>
```

#### Configuration
```tsx
<TouchSpin
  min={number}                      // Minimum value
  max={number}                      // Maximum value
  step={number}                     // Increment/decrement step
  decimals={number}                 // Decimal places
  prefix="string"                   // Text before input
  suffix="string"                   // Text after input
/>
```

#### State & Behavior
```tsx
<TouchSpin
  disabled={boolean}                // Disable input and buttons
  readOnly={boolean}                // Make input read-only
/>
```

#### Form Integration
```tsx
<TouchSpin
  name="string"                     // Form field name
  id="string"                       // Input element ID
/>
```

#### Styling
```tsx
<TouchSpin
  className="string"                // Wrapper CSS class
  inputClassName="string"           // Input CSS class
/>
```

#### Events
```tsx
<TouchSpin
  onBlur={FocusEventHandler}        // Input blur event
  onFocus={FocusEventHandler}       // Input focus event

  // TouchSpin Events
  onMin={() => void}                // Fired at minimum boundary
  onMax={() => void}                // Fired at maximum boundary
  onStartSpin={() => void}          // Fired when spinning starts
  onStopSpin={() => void}           // Fired when spinning stops
  onStartUpSpin={() => void}        // Fired when upward spinning starts
  onStartDownSpin={() => void}      // Fired when downward spinning starts
  onStopUpSpin={() => void}         // Fired when upward spinning stops
  onStopDownSpin={() => void}       // Fired when downward spinning stops
  onSpeedChange={() => void}        // Fired when spin speed increases
/>
```

#### Advanced
```tsx
<TouchSpin
  coreOptions={object}              // Advanced TouchSpin core options
  inputProps={object}               // Pass-through props for input
  data-testid="string"              // Test ID (input gets -input suffix)
/>
```

### Imperative API (useRef)

For direct programmatic control, use a ref:

```tsx
import { useRef } from 'react';
import type { TouchSpinHandle } from '@touchspin/react/vanilla';

function App() {
  const touchSpinRef = useRef<TouchSpinHandle>(null);

  const handleIncrement = () => {
    touchSpinRef.current?.increment();
  };

  return (
    <div>
      <button onClick={handleIncrement}>+1</button>
      <TouchSpin ref={touchSpinRef} value={50} />
    </div>
  );
}
```

#### TouchSpinHandle Methods

```tsx
interface TouchSpinHandle {
  // Focus Management
  focus(): void;                    // Focus the input
  blur(): void;                     // Blur the input

  // Value Control
  increment(): void;                // Increment by step
  decrement(): void;                // Decrement by step
  getValue(): number;               // Get current value
  setValue(value: number): void;    // Set new value

  // Continuous Spinning
  startUpSpin(): void;              // Start continuous upward spinning
  startDownSpin(): void;            // Start continuous downward spinning
  stopSpin(): void;                 // Stop any continuous spinning

  // Configuration
  updateSettings(opts: Partial<TouchSpinCoreOptions>): void;
                                  // Update settings at runtime
}
```

## 🎯 Usage Examples

### Basic Controlled Component

```tsx
import { useState } from 'react';
import TouchSpin from '@touchspin/react/vanilla';

function BasicExample() {
  const [value, setValue] = useState(10);

  return (
    <div>
      <TouchSpin
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={5}
      />
      <p>Value: {value}</p>
    </div>
  );
}
```

### With Prefix/Suffix

```tsx
import TouchSpin from '@touchspin/react/vanilla';

function CurrencyExample() {
  const [price, setPrice] = useState(29.99);

  return (
    <TouchSpin
      value={price}
      onChange={setPrice}
      min={0}
      max={1000}
      step={0.01}
      decimals={2}
      prefix="$"
      suffix=" USD"
    />
  );
}
```

### Event Handling

```tsx
import { useState } from 'react';
import TouchSpin from '@touchspin/react/vanilla';

function EventExample() {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (eventName: string) => {
    setEvents(prev => [...prev, `${new Date().toLocaleTimeString()}: ${eventName}`]);
  };

  return (
    <div>
      <TouchSpin
        defaultValue={50}
        min={0}
        max={100}
        onMin={() => addEvent('Reached minimum')}
        onMax={() => addEvent('Reached maximum')}
        onStartSpin={() => addEvent('Spin started')}
        onStopSpin={() => addEvent('Spin stopped')}
      />

      <h3>Event Log:</h3>
      <ul>
        {events.map((event, i) => <li key={i}>{event}</li>)}
      </ul>
    </div>
  );
}
```

### Imperative Control

```tsx
import { useRef, useState } from 'react';
import TouchSpin, { type TouchSpinHandle } from '@touchspin/react/vanilla';

function ImperativeExample() {
  const touchSpinRef = useRef<TouchSpinHandle>(null);
  const [currentValue, setCurrentValue] = useState(0);

  const updateValue = () => {
    const value = touchSpinRef.current?.getValue() ?? 0;
    setCurrentValue(value);
  };

  return (
    <div>
      <div>
        <button onClick={() => touchSpinRef.current?.setValue(42)}>
          Set to 42
        </button>
        <button onClick={() => touchSpinRef.current?.startUpSpin()}>
          Start Spinning Up
        </button>
        <button onClick={() => touchSpinRef.current?.stopSpin()}>
          Stop Spinning
        </button>
        <button onClick={updateValue}>Get Current Value</button>
      </div>

      <TouchSpin
        ref={touchSpinRef}
        defaultValue={25}
        min={0}
        max={100}
      />

      <p>Current value: {currentValue}</p>
    </div>
  );
}
```

### Form Integration

```tsx
import TouchSpin from '@touchspin/react/vanilla';

function FormExample() {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      console.log('Quantity:', formData.get('quantity'));
    }}>
      <label>
        Quantity:
        <TouchSpin
          name="quantity"
          defaultValue={1}
          min={1}
          max={99}
        />
      </label>
      <button type="submit">Add to Cart</button>
    </form>
  );
}
```

## 🔧 Advanced Configuration

### Custom Core Options

```tsx
import TouchSpin from '@touchspin/react/vanilla';

function AdvancedExample() {
  return (
    <TouchSpin
      value={50}
      min={0}
      max={100}
      step={1}
      coreOptions={{
        verticalbuttons: true,     // Vertical button layout
        buttonup_class: 'custom-up',
        buttondown_class: 'custom-down',
      }}
    />
  );
}
```

## 🧪 Testing

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TouchSpin from '@touchspin/react/vanilla';

test('increments value', async () => {
  const user = userEvent.setup();
  render(<TouchSpin defaultValue={5} min={0} max={10} />);

  const incrementBtn = screen.getByRole('button', { name: /increment/i });
  await user.click(incrementBtn);

  expect(screen.getByDisplayValue('6')).toBeInTheDocument();
});
```

## 🏗️ Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build all packages
yarn build

# Run tests
yarn test

# Type checking
yarn typecheck

# Linting
yarn lint
```

## 📚 Related Packages

- **@touchspin/core** - Core TouchSpin logic
- **@touchspin/renderer-vanilla** - Vanilla CSS renderer
- **@touchspin/renderer-bootstrap5** - Bootstrap 5 renderer
- **@touchspin/renderer-tailwind** - Tailwind CSS renderer

## 🤝 Contributing

Contributions welcome! Please see the main TouchSpin repository for contribution guidelines.

## 📄 License

MIT © [István Ujházi](https://github.com/istvan-ujjmeszaros)

## 🔗 Links

- [GitHub Repository](https://github.com/istvan-ujjmeszaros/touchspin)
- [Documentation](https://github.com/istvan-ujjmeszaros/touchspin)
- [Examples](https://github.com/istvan-ujjmeszaros/touchspin-react-example)
