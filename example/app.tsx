import * as React from 'react';
import { createRoot } from 'react-dom/client';

import Layout from './Layout';

const element = document.getElementById('root');

if (element) {
    createRoot(element).render(<Layout />);
}
