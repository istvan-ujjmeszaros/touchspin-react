import React, { useCallback, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import TouchSpin, { TouchSpinHandle } from '@touchspin/react/vanilla';
import '@touchspin/renderer-vanilla/dist/touchspin-vanilla.css';
import './styles.css';

type EventEntry = {
  message: string;
  timestamp: string;
};

const Section: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle, children }) => (
  <section>
    <h2>{title}</h2>
    <p>{subtitle}</p>
    <div className="demo">{children}</div>
  </section>
);

const shortcuts = [
  { key: '↑ Arrow Up', description: 'Increment by step (handled by core)' },
  { key: '↓ Arrow Down', description: 'Decrement by step (handled by core)' },
  { key: 'Page Up', description: 'Native browser behavior (scroll) by default' },
  { key: 'Page Down', description: 'Native browser behavior (scroll) by default' },
  { key: 'Home', description: 'Move cursor to start (native)' },
  { key: 'End', description: 'Move cursor to end (native)' },
];

function useEventLog(limit = 10) {
  const [entries, setEntries] = useState<EventEntry[]>([]);
  const append = useCallback((message: string) => {
    setEntries((prev) => [{ message, timestamp: new Date().toLocaleTimeString() }, ...prev].slice(0, limit));
  }, [limit]);
  const clear = useCallback(() => setEntries([]), []);
  return { entries, append, clear };
}

function App() {
  const [basicValue, setBasicValue] = useState(42);

  const [controlledValue, setControlledValue] = useState(25);
  const controlledValid = controlledValue >= 10 && controlledValue <= 50;

  const [formValue, setFormValue] = useState(12);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formValid = formValue >= 1 && formValue <= 100;

  const [priceValue, setPriceValue] = useState(49.99);

  const [eventsValue, setEventsValue] = useState(35);
  const { entries: eventEntries, append: appendEventLog, clear: clearEventLog } = useEventLog();

  const handleEventsChange = useCallback((value: number, meta: { action?: string }) => {
    setEventsValue(value);
    appendEventLog(`${meta.action ?? 'change'} → ${value}`);
  }, [appendEventLog]);

  const [keyboardValue, setKeyboardValue] = useState(15);

  const [customKeyboardValue, setCustomKeyboardValue] = useState(50);
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);
  const customKeyboardRef = useRef<TouchSpinHandle>(null);
  const handleCustomKeyboard = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!customKeyboardRef.current) return;
    const { key } = event;
    const current = customKeyboardValue;
    let next = current;
    if (key === 'PageUp') {
      event.preventDefault();
      next = Math.min(current + 10, 100);
      setLastKeyPressed('PageUp (+10)');
    } else if (key === 'PageDown') {
      event.preventDefault();
      next = Math.max(current - 10, 0);
      setLastKeyPressed('PageDown (-10)');
    } else if (key === 'Escape') {
      event.preventDefault();
      next = 50;
      setLastKeyPressed('Escape (reset to 50)');
    } else {
      setLastKeyPressed(key);
      return;
    }
    customKeyboardRef.current.setValue(next);
    setCustomKeyboardValue(next);
  }, [customKeyboardValue]);

  const imperativeRef = useRef<TouchSpinHandle>(null);
  const [imperativeValue, setImperativeValue] = useState(30);

  const [statesValue, setStatesValue] = useState(10);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const templateStatus = useMemo(() => ({
    valid: formValid,
    submitted: formSubmitted,
  }), [formValid, formSubmitted]);

  return (
    <div className="container">
      <header>
        <h1>TouchSpin React – Vanilla Renderer</h1>
        <p>Interactive demos showcasing controlled/uncontrolled usage, events, keyboard support, and the imperative API.</p>
      </header>

      <Section title="1. Basic Usage" subtitle="Simple controlled spinner with React state">
        <TouchSpin
          value={basicValue}
          onChange={setBasicValue}
          min={0}
          max={100}
          step={1}
          data-testid="basic-touchspin"
          inputProps={{ 'aria-label': 'Basic quantity input' }}
        />
        <div className="output">Current value: <strong>{basicValue}</strong></div>
      </Section>

      <Section title="2. Controlled Value with Validation" subtitle="Enforce min/max constraints in React state">
        <TouchSpin
          value={controlledValue}
          onChange={setControlledValue}
          min={10}
          max={50}
          step={5}
          inputProps={{ 'aria-label': 'Controlled reactive input' }}
        />
        <div className="output">
          Value: <strong>{controlledValue}</strong><br />
          {controlledValid ? 'Within range (10 - 50)' : <span className="error">Out of range!</span>}
        </div>
      </Section>

      <Section title="3. Form Submission" subtitle="Template-style form with native submit/reset">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setFormSubmitted(true);
          }}
          onReset={() => {
            setFormValue(12);
            setFormSubmitted(false);
          }}
        >
          <label htmlFor="quantity">Quantity</label>
          <TouchSpin
            id="quantity"
            name="quantity"
            value={formValue}
            onChange={setFormValue}
            min={1}
            max={100}
            inputProps={{ 'aria-label': 'Quantity form input' }}
          />
          <div className="output">
            Value: <strong>{formValue}</strong><br />
            Form valid: <strong>{templateStatus.valid ? 'true' : 'false'}</strong><br />
            Submitted: <strong>{templateStatus.submitted ? 'true' : 'false'}</strong>
          </div>
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      </Section>

      <Section title="4. Kitchen Sink" subtitle="Prefix, suffix, decimals, step, min and max">
        <TouchSpin
          value={priceValue}
          onChange={setPriceValue}
          min={0}
          max={999.99}
          step={0.01}
          decimals={2}
          prefix="$"
          suffix=" USD"
          inputProps={{ 'aria-label': 'Price in USD' }}
        />
        <div className="output">Price: <strong>{priceValue.toFixed(2)}</strong></div>
      </Section>

      <Section title="5. Events & Logging" subtitle="Inspect onChange metadata and custom logging">
        <TouchSpin
          value={eventsValue}
          onChange={handleEventsChange}
          min={0}
          max={100}
          step={5}
          inputProps={{ 'aria-label': 'Events demo input' }}
        />
        <div className="output">Value: <strong>{eventsValue}</strong></div>
        <div className="button-group">
          <button type="button" onClick={clearEventLog}>Clear log</button>
        </div>
        <ul className="event-log">
          {eventEntries.length === 0 ? (
            <li>No events yet – try typing or using the buttons.</li>
          ) : (
            eventEntries.map((entry, index) => (
              <li key={index}>
                <strong>{entry.timestamp}</strong> — {entry.message}
              </li>
            ))
          )}
        </ul>
      </Section>

      <Section title="6. Keyboard Navigation" subtitle="Core handles ArrowUp/ArrowDown increments">
        <ul className="shortcuts">
          {shortcuts.map((shortcut) => (
            <li key={shortcut.key}>
              <kbd>{shortcut.key}</kbd>
              <span>{shortcut.description}</span>
            </li>
          ))}
        </ul>
        <TouchSpin
          value={keyboardValue}
          onChange={setKeyboardValue}
          min={0}
          max={100}
          step={1}
          inputProps={{ 'aria-label': 'Keyboard navigation demo' }}
        />
        <div className="output">Value: <strong>{keyboardValue}</strong></div>
      </Section>

      <Section title="6.5 Custom Keyboard Handler" subtitle="Augment core behavior with PageUp/PageDown shortcuts">
        <TouchSpin
          ref={customKeyboardRef}
          value={customKeyboardValue}
          onChange={setCustomKeyboardValue}
          min={0}
          max={100}
          step={1}
          inputProps={{
            'aria-label': 'Custom keyboard handler demo',
            onKeyDown: handleCustomKeyboard,
          }}
        />
        <div className="output">Value: <strong>{customKeyboardValue}</strong></div>
        <p className="hint">{lastKeyPressed ?? 'Focus the input and press PageUp/PageDown/Escape.'}</p>
      </Section>

      <Section title="7. Imperative API" subtitle="Control the spinner through the forwarded ref">
        <TouchSpin
          ref={imperativeRef}
          value={imperativeValue}
          onChange={setImperativeValue}
          min={0}
          max={100}
          step={1}
          inputProps={{ 'aria-label': 'Imperative API demo' }}
        />
        <div className="output">Value: <strong>{imperativeValue}</strong></div>
        <div className="button-group">
          <button type="button" onClick={() => imperativeRef.current?.increment()}>Increment</button>
          <button type="button" onClick={() => imperativeRef.current?.decrement()}>Decrement</button>
          <button type="button" onClick={() => {
            imperativeRef.current?.setValue(50);
            setImperativeValue(50);
          }}>Set to 50</button>
          <button type="button" onClick={() => imperativeRef.current?.focus()}>Focus</button>
          <button type="button" onClick={() => imperativeRef.current?.blur()}>Blur</button>
          <button
            type="button"
            onClick={() => {
              const current = imperativeRef.current?.getValue();
              appendEventLog(`imperative getValue() → ${current}`);
            }}
          >
            Log getValue()
          </button>
        </div>
      </Section>

      <Section title="8. Disabled & Readonly States" subtitle="Toggle states dynamically">
        <TouchSpin
          value={statesValue}
          onChange={setStatesValue}
          min={0}
          max={100}
          step={1}
          disabled={isDisabled}
          readOnly={isReadOnly}
          inputProps={{ 'aria-label': 'State toggles demo' }}
        />
        <div className="output">Value: <strong>{statesValue}</strong></div>
        <div className="button-group">
          <label>
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(event) => setIsDisabled(event.target.checked)}
            />
            Disabled
          </label>
          <label>
            <input
              type="checkbox"
              checked={isReadOnly}
              onChange={(event) => setIsReadOnly(event.target.checked)}
            />
            Readonly
          </label>
          <button type="button" onClick={() => {
            setIsDisabled(false);
            setIsReadOnly(false);
          }}>Reset states</button>
        </div>
      </Section>

      <footer>
        Demo powered by <a href="https://github.com/istvan-ujjmeszaros/touchspin-react" target="_blank" rel="noreferrer">@touchspin/react</a>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
