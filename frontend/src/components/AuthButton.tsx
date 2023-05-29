import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  signUp?: boolean;
}

export const AuthButton = ({ signUp = false }: Props) => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const authorizeOnClick = () =>
    loginWithRedirect({
      authorizationParams: {
        screen_hint: signUp ? 'signup' : 'login',
        redirect_uri: signUp ? 'http://localhost:3000/onboarding' : undefined,
      },
    });
  const logoutOnClick = () => logout();

  return (
    <button
      onClick={isAuthenticated ? logoutOnClick : authorizeOnClick}
      className="inline-block text-sm px-4 py-2 mx-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
    >
      {isAuthenticated ? 'Log out' : signUp ? 'Sign up' : 'Log In'}
    </button>
  );
};
