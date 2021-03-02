import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faList, faSearch} from '@fortawesome/free-solid-svg-icons';

import Koti from './src/views/Koti';
import Hakemistot from './src/views/Hakemistot';
import Selaa from './src/views/Selaa';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({focused}) => {
            if (route.name === 'Koti') {
              return <FontAwesomeIcon size={18} icon={ faHome } color={focused ? '#11cdde' : '#c3c3c3'} />;
            } else if (route.name === 'Hakemistot') {
              return <FontAwesomeIcon size={18} icon={ faList } color={focused ? '#11cdde' : '#c3c3c3'} />;
            } else {
             return <FontAwesomeIcon size={18} icon={ faSearch } color={focused ? '#11cdde' : '#c3c3Cc'} />;
            }
          },
        }
      )}
      
      tabBarOptions={{activeTintColor: '#11cdde', inactiveTintColor: '#C3C3C3', labelStyle: {fontSize: 14}}}>
        <Tab.Screen name="Koti" component={Koti} />
        <Tab.Screen name="Hakemistot" component={Hakemistot} />
        <Tab.Screen name="Selaa" component={Selaa} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
