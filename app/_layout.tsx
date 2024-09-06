import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router/stack';
import client from '../config/apolloClient';

export default function Layout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ApolloProvider>
  );
}