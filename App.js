import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faList, faCloudSun } from '@fortawesome/free-solid-svg-icons'

import Koti from './views/Koti';
import Hakemistot from './views/Hakemistot';
import Saa from './views/Saa';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({focused}) => {
            if (route.name === 'Koti') {
              return <FontAwesomeIcon size={18} icon={ faHome } color={focused ? '#11cdde' : '#C3C3C3'} />;
            } else if (route.name === 'Hakemistot') {
              return <FontAwesomeIcon size={18} icon={ faList } color={focused ? '#11cdde' : '#C3C3C3'} />;
            } else {
             return <FontAwesomeIcon size={18} icon={ faCloudSun } color={focused ? '#11cdde' : '#C3C3C3'} />;
            }
          },
        }
      )}
      
      tabBarOptions={{activeTintColor: '#11cdde', inactiveTintColor: '#C3C3C3', labelStyle: {fontSize: 14}}}>
        <Tab.Screen name="Koti" component={Koti} />
        <Tab.Screen name="Hakemistot" component={Hakemistot} />
        <Tab.Screen name="Saa" component={Saa} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
