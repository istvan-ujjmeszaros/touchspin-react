# TouchSpin React

React adapter for TouchSpin numeric input spinner (v5.0.1-alpha.0)

## Installation

```bash
yarn add @touchspin/react@alpha @touchspin/core@alpha
```

## Usage

Import from per-renderer subpaths:

```tsx
import TouchSpin from '@touchspin/react/bootstrap5';

function App() {
  const [value, setValue] = React.useState(50);

  return (
    <TouchSpin
      value={value}
      onChange={setValue}
      min={0}
      max={100}
      step={5}
    />
  );
}
```

## Available Renderers

- `@touchspin/react/bootstrap3` - Bootstrap 3 renderer
- `@touchspin/react/bootstrap4` - Bootstrap 4 renderer
- `@touchspin/react/bootstrap5` - Bootstrap 5 renderer
- `@touchspin/react/tailwind` - Tailwind CSS renderer
- `@touchspin/react/vanilla` - Vanilla CSS renderer

## Development

```bash
yarn install
yarn build
yarn test
```

## Examples

See `packages/examples/` for a rich vanilla renderer demo.

```bash
yarn dev
```

## License

MIT
