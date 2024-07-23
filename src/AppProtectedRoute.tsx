import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { AppRouter } from './RouterType';
import { AnyType } from './types/baseType';

/**
 * For protected route with authentication
 * @param param0 
 * @returns 
 */
export const ProtectedRoute = ({ children }: AnyType): React.ReactElement | null => {
    // const isAuthenticated = true;
    // if (!isAuthenticated) {
    //     return <Navigate to={AppRouter.login} />;
    // }
    return children;
};