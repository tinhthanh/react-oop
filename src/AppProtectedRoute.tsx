import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { AppRouter } from './RouterType';
import { AnyType } from './types/baseType';
import { useKeycloak } from '@react-keycloak/web';
/**
 * For protected route with authentication
 * @param param0 
 * @returns 
 */
export const ProtectedRoute = ({ children }: AnyType): React.ReactElement | null => {
    const { keycloak, initialized } = useKeycloak();
    
    if (initialized === false) {
        return null;
    }

    if (!keycloak.authenticated) {
        keycloak.login();
        return null;
    }

    return children;
};