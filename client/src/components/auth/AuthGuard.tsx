import PropTypes from 'prop-types';
import { useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

interface AppProviderProps {
    children: ReactNode;
}

export const AuthGuard: React.FC<AppProviderProps> = ({ children }) => {
    
    const {isAuthenticated} = useContext(AppContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return children;
};

export default AuthGuard;
