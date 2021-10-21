import { lazy } from 'react';

const routes = [
    {
        path: '/',
        component: lazy(() => import('../HomePage/HomePage')),
        exact: true
    },
    {
        path: '/gallery',
        component: lazy(() => import('../Gallery/Gallery')),
        exact: true
    }
];

export default routes;
