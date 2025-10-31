import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Layout from './Layout';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
    <StrictMode>
        <Layout />
    </StrictMode>,
);
