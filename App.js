import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faList, faStar } from "@fortawesome/free-solid-svg-icons";

import Koti from "./src/views/Koti";
import Hakemistot from "./src/views/Hakemistot";
import Suosikit from "./src/views/Suosikit";
import { StateProvider } from "./src/state/index";

const Tab = createBottomTabNavigator();

function App() {
  
  return (

    <NavigationContainer>
      <StateProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              if (route.name === "Koti") {
                return (
                  <FontAwesomeIcon
                    size={18}
                    icon={faHome}
                    color={focused ? "#11cdde" : "#ffffff"}
                  />
                );
              } else if (route.name === "Hakemistot") {
                return (
                  <FontAwesomeIcon
                    size={18}
                    icon={faList}
                    color={focused ? "#11cdde" : "#ffffff"}
                  />
                );
              } else {
                return (
                  <FontAwesomeIcon
                    size={18}
                    icon={faStar}
                    color={focused ? "#11cdde" : "#ffffff"}
                  />
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: "#11cdde",
            inactiveTintColor: "#ffffff",
            activeBackgroundColor: "#000000",
            inactiveBackgroundColor: "#000000",
            labelStyle: { fontSize: 14 },
            keyboardHidesTabBar: true,
          }}
        >
          <Tab.Screen
            listeners={({ navigation }) => ({
              tabPress: () => {
                navigation.navigate("Koti", { pageNumber: 100 });
              },
            })}
            name="Koti"
            initialParams={{ pageNumber: 100 }}
            component={Koti}
          />
          <Tab.Screen name="Suosikit" component={Suosikit} />
          <Tab.Screen name="Hakemistot" component={Hakemistot} />
        </Tab.Navigator>
      </StateProvider>
    </NavigationContainer>

  );
}

export default App;
