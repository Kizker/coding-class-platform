import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { SessionProvider } from './lib/auth/sessionContext';

const appName = import.meta.env.VITE_APP_NAME || 'Coding Class Platform';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <SessionProvider>
                <App {...props} />
            </SessionProvider>
        );
    },
    progress: {
        color: '#facc15',
    },
});
