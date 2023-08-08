import React from 'react';
import ReactDOM from 'react-dom';
import App from '@app/index';
import { createRoot } from 'react-dom/client';

if (process.env.NODE_ENV !== 'production') {
  const config = {
    rules: [
      {
        id: 'color-contrast',
        enabled: false,
      },
    ],
  };
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000, config);
}

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<App />);
