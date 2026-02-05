import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PeopleListScreen from '../screens/peoples/PeopleListScreen';
import PersonDetailScreen from '../screens/peoples/PersonDetailScreen';
import ErrorBoundary from 'src/layouts/ErrorBoundary';

export type RootStackParamList = {
  List: undefined;
  Detail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="List" component={PeopleListScreen} options={{ title: 'People' }} />
          <Stack.Screen
            name="Detail"
            component={PersonDetailScreen}
            options={{ title: 'Detail' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default Navigation;
