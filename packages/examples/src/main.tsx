import React from 'react';
import ReactDOM from 'react-dom/client';
import TouchSpin from '@touchspin/react/bootstrap5';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [value, setValue] = React.useState(50);

  return (
    <div className="container mt-5">
      <h1>TouchSpin React Examples</h1>
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">Basic Example</label>
          <TouchSpin
            value={value}
            onChange={setValue}
            min={0}
            max={100}
            step={5}
          />
          <p className="mt-2">Current value: {value}</p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
