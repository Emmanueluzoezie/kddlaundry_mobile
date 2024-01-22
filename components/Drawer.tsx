import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import AccountScreen from '../screens/AccountScreen';
import HelpScreen from '../screens/HelpScreen';
import HomeScreen from '../screens/HomeScreen';
import LaundryServiceScreen from '../screens/LaundryServiceScreen';
import LocationScreen from '../screens/LocationScreen';
import LoginScreen from '../screens/LoginScreen';
import OrderScreen from '../screens/OrderScreen';
import TrackScreen from '../screens/TrackScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()

export default function DrawerComponent() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="orders" component={OrderScreen} options={{ headerShown: false }} />
                <Stack.Screen name="account" component={AccountScreen} options={{ headerShown: false }} />
                <Stack.Screen name="help" component={HelpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="laundry_service" component={LaundryServiceScreen} options={{ headerShown: false }} />
                <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="location" component={LocationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="track" component={TrackScreen} options={{ headerShown: false }} />
                {/* <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        drawerIcon: ({ focused }) => (
                            <Icon
                                size={20}
                                type="entypo"
                                name="home"
                                color={focused ? "#7045c8" : "#7a7a7a"}
                                containerStyle={{ marginRight: -25 }}
                            />
                        ),
                        drawerLabelStyle: {
                            fontSize: 16,
                            marginVertical: -6,
                            fontWeight: "600",
                            letterSpacing: 0.5,
                        },
                        drawerActiveBackgroundColor: "#f1eaff",
                        drawerActiveTintColor: "#7045c8",
                    }}
                /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}