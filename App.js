import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import Home from './screens/Home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs(){
	return(
		<Tab.Navigator
            screenOptions={{
				headerShown: false,
                tabBarActiveTintColor: '#22C55E',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
					backgroundColor: '#27272A',
					height: 60,
					borderTopColor: '#22C55E',
				},
                tabBarLabelStyle: {
					paddingBottom: 5
				}
            }}
        >
			<Tab.Screen name='Home' component={Home} />
		</Tab.Navigator>
	);
}

export default function App(){
  	return(
		<NavigationContainer>
			<StatusBar style='light' />
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: '#27272A',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 25
					},
				}}
			>
				<Stack.Screen name='Login' component={Login} />
				<Stack.Screen name='Statsfy' component={Tabs} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}