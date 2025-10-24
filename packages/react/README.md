# @touchspin/react

React adapter for TouchSpin with per-renderer subpaths, controlled/uncontrolled modes, and imperative API.

## Installation

```bash
npm install @touchspin/react @touchspin/renderer-vanilla react react-dom
```

## Per-Renderer Imports

```tsx
import TouchSpin from '@touchspin/react/bootstrap5';
import '@touchspin/renderer-bootstrap5/css';

import TouchSpin from '@touchspin/react/bootstrap4';
import '@touchspin/renderer-bootstrap4/css';

import TouchSpin from '@touchspin/react/bootstrap3';
import '@touchspin/renderer-bootstrap3/css';

import TouchSpin from '@touchspin/react/tailwind';
import '@touchspin/renderer-tailwind/css';

import TouchSpin from '@touchspin/react/vanilla';
import '@touchspin/renderer-vanilla/css';
```

## Usage

**Controlled:**
```tsx
const [value, setValue] = useState(50);
<TouchSpin value={value} onChange={setValue} min={0} max={100} />
```

**Uncontrolled:**
```tsx
<TouchSpin defaultValue={25} onChange={(val) => console.log(val)} />
```

**Imperative API:**
```tsx
const ref = useRef<TouchSpinHandle>(null);
<TouchSpin ref={ref} defaultValue={10} />
ref.current?.increment();
```

## Props

See TypeScript types in `types.ts` for full API.

## SSR Support

This adapter is SSR-safe and works with Next.js, Remix, and other React frameworks:

- **Server:** Renders a basic `<input type="number">` element
- **Client:** Hydrates with full TouchSpin functionality (buttons, keyboard navigation, etc.)
- **No window access:** All DOM interactions happen in `useEffect` after mount

No special configuration needed - just import and use as normal.

## License

MIT
