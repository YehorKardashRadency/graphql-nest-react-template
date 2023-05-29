import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement, useMemo } from 'react';

export default function ApolloClientProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const { getAccessTokenSilently } = useAuth0();

  const client = useMemo(() => {
    
    const httpLink = createHttpLink({
      uri: process.env.REACT_APP_GATEWAY_URL,
    });

    const authLink = setContext(async (_, { headers }) => { 
      const token = await getAccessTokenSilently()
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",    
        }
      }
    })
  
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [getAccessTokenSilently])

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}