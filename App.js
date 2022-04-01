import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import CoinItem from "./components/CoinItem";
import CoinItemDetails from "./components/CoinItemDetails";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
const App = () => {
  const [coins, setCoins] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function HomeScreen({ navigation }) {

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" />

        <FlatList
          style={styles.list}
          data={coins}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (<TouchableOpacity
              onPress={() => navigation.navigate("CoinItemDetails", { item: item.id })}
            ><CoinItem coin={item} /></TouchableOpacity>)
          }}
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            await loadData();
            setRefreshing(false);
          }}
        />
      </View>
    );
  }
  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CoinX" component={HomeScreen} options={{ title: 'CoinGecko' }} />
        <Stack.Screen name="CoinItemDetails" component={CoinItemDetails} options={{ title: 'Coin Detail' }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  list: {
    width: "90%"
  },
});

export default App;
