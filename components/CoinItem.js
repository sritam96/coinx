import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CoinItem = ({ coin }) => {

  return (

    <View style={styles.containerItem}>
      <View style={styles.coinName}>
        <Image source={{ uri: coin.image }} style={styles.image} />
        <View style={styles.containerNames}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.textSymbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View>
        <View style={styles.highLowContainerNames}>
          <Text style={styles.priceHigh}>{coin.high_24h} (High 24 hour Price)</Text>
          <Text style={styles.priceLow}>{coin.low_24h} (Low 24 hour Price)</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textPrice}>€{coin.current_price}</Text>
        <Text
          style={[
            styles.pricePercentage,
            coin.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDown,
          ]}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "white",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: '#E0E0E0',
    borderBottomWidth: 1
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: "row",
  },
  highLowContainerNames: {
    flexDirection: "column",
  },
  priceHigh: {
    color: "black",
  },
  priceLow: {
    color: "black",
  },
  text: {
    color: "black",
  },
  textPrice: {
    color: "black",
    fontWeight: "bold",
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "#00B589",
  },
  priceDown: {
    color: "#fc4422",
  },
  image: {
    width: 30,
    height: 30,
  },
  textSymbol: {
    color: "#B0B0B0",
    textTransform: "uppercase",
  },
});

export default CoinItem;
