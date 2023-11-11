import React from 'react'
import { createRoot } from 'react-dom/client';

import './index.scss'

import App from './App';


// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(<App />);