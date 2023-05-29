import { useApolloClient } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { gql } from '../../__generated__/gql';
import { CurrentUser } from './CurrentUser';

type UserInfo = {
  user?: CurrentUser;
  isLoading: boolean;
};
type UserContextProps = UserInfo & { setUser: (user: CurrentUser) => void };

const UserContext = createContext<UserContextProps>({
  isLoading: true,
  setUser: () => {}
});

interface Props {
  children: JSX.Element;
}

export function UserContextProvider({ children }: Props) {
  const { user, isLoading } = useAuth0();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    isLoading: true
  });
  const client = useApolloClient();
  useEffect(() => {
    async function fetchData() {
      if (user?.sub && !isLoading) {
        const query = gql(`
          query GetCurrentUser {
            current_user {
              userName
              fullName
              id
            }
          }
        `);
        const request = client.query({ query, errorPolicy: 'all' });
        const response = await request;
        console.log(response);
        if (response.data) {
          setUserInfo({
            user: response.data.current_user,
            isLoading: false
          });
        }
      } else if (!isLoading) {
        setUserInfo({
          isLoading: false
        });
      }
    }
    fetchData();
  }, [isLoading, user, client]);
  return (
    <UserContext.Provider
      value={{
        ...userInfo,
        setUser: (user: CurrentUser) => setUserInfo({ user, isLoading: false })
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
