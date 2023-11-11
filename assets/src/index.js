import React from 'react'
import { createRoot } from 'react-dom/client';

import './index.scss'


// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(<h1>Hello, world</h1>);