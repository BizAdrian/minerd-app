import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RegisterVisitScreen from './screens/RegisterVisitScreen';
import ViewVisitsScreen from './screens/ViewVisitScreen';
import VisitDetailScreen from './screens/VisitDetailScreen';
import AboutScreen from './screens/AboutScreen'; 
import RegisterScreen from './screens/RegisterScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RegisterVisit" component={RegisterVisitScreen} />
        <Stack.Screen name="ViewVisits" component={ViewVisitsScreen} />
        <Stack.Screen name="VisitDetail" component={VisitDetailScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

