import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from '../screens/WelcomeScreen';
import AddInvoice from '../screens/AddInvoice';
import PrintFile from '../screens/PrintFile';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer >
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
				<Stack.Screen name="AddInvoice" component={AddInvoice} />
				<Stack.Screen name="PrintFile" component={PrintFile} />
			</Stack.Navigator>
		</NavigationContainer>
    );
}

export default AppNavigator;
