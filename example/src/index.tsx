import { createRoot } from 'react-dom/client';
import './App.css';

import App from './components/App';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
