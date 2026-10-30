import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { SessionProvider } from './lib/auth/sessionContext';

const appName = import.meta.env.VITE_APP_NAME || 'Coding Class Platform';

// Resolve page from data-page attribute on #app element or fallback to script
const getInitialPage = () => {
    if (typeof window === 'undefined') return undefined;
    const el = document.getElementById('app');
    if (el?.dataset?.page) {
        try {
            return JSON.parse(el.dataset.page);
        } catch (e) {
            console.error('Failed to parse #app data-page', e);
        }
    }
    const script = document.querySelector('script[data-page="app"][type="application/json"]');
    if (script?.textContent) {
        try {
            return JSON.parse(script.textContent);
        } catch (e) {
            console.error('Failed to parse script data-page', e);
        }
    }
    return undefined;
};

const initialPage = getInitialPage();

createInertiaApp({
    id: 'app',
    page: initialPage,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob<any>('./Pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        if (!el) return;
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

