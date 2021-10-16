import { lazy } from 'react';

const routes = [
    {
        path: '/',
        component: lazy(() => import('../HomePage/HomePage')),
        exact: true
    },
    // {
    //     path: 'users',
    //     component: lazy(() => import('components/Users')),
    //     exact: true
    // }s
];

export default routes;
