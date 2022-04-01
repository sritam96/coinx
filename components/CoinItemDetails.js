import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, StatusBar, Linking } from "react-native";
import ReactHtmlParser from 'react-html-parser';
const CoinItemDetails = ({ route, navigation }) => {
    const [coinDetail, setCoinDetail,] = useState([]);
    const { item } = route.params;
    const loadData = async () => {
        const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/" + item
        );
        const data = await res.json();
        setCoinDetail(data);
    };
    useEffect(() => {
        loadData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.containerItem}>
                <Text style={styles.itemsHeading}>Name</Text>
                <View style={styles.items}>
                    <Text>{coinDetail.name || 'Not Available'}</Text>
                </View>
                <Text style={styles.itemsHeading}>Symbol</Text>
                <View style={styles.items}>
                    <Text>{coinDetail.symbol || 'Not Available'}</Text>
                </View>
                <Text style={styles.itemsHeading}>Home page</Text>
                <View style={styles.items}>
                    <Text onPress={() => Linking.openURL(coinDetail.links?.homepage[0])} style={{ color: 'blue' }}>
                        {coinDetail.links?.homepage[0]}
                    </Text>

                </View>
                <Text style={styles.itemsHeading}>Hashing</Text>
                <View style={styles.items}>
                    <Text>{coinDetail.hashing_algorithm || 'Not Available'}</Text>
                </View>
                <Text style={styles.itemsHeading}>Market Cap</Text>
                <View style={styles.items}>
                    <Text>{coinDetail.market_cap?.eur || 'Not Available'}</Text>
                </View>
                <Text style={styles.itemsHeading}>Genesis Date</Text>
                <View style={styles.items}>
                    <Text>{coinDetail.genesis_date || 'Not Available'}</Text>
                </View>
                <Text style={styles.itemsHeading}>Description</Text>
                <View style={styles.items}>
                    <Text>{ReactHtmlParser(coinDetail.description?.en)}</Text>
                </View>

            </ScrollView>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    containerItem: {
        backgroundColor: "white",
        padding: 40
    },
    items: {
        marginVertical: 5,
    },
    itemsHeading: {
        fontSize: 16,
        fontWeight: "bold"
    }

});


export default CoinItemDetails;



