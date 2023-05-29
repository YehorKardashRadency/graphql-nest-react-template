import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  children: JSX.Element;
}

export const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth0();
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user, !isLoading, isAuthenticated, !isAuthLoading);
    if (!user && !isLoading && isAuthenticated && !isAuthLoading) {
      navigate('/onboarding');
    }
  }, [user, navigate, isLoading, isAuthenticated, isAuthLoading]);
  if (isLoading || isAuthLoading) return <div>Loading...</div>;
  return children;
};
