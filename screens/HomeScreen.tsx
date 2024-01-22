import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import tailwind from 'twrnc';
import HomeComponent from '../components/homes/HomeComponent';
import LogoComponent from '../components/LogoComponent';

const HomeScreen = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 10000)
    },[]) 

    return (
        <View style={[tailwind`flex-1`]}>
            {loading?
                <LogoComponent image="https://i.postimg.cc/257J6hKn/Screenshot-2023-12-17-at-17-09-03-removebg-preview.png" name="KDD" titleOne="LAUNDRY" titleTwo="SERVICE" subtitle="Bring Freshness to your Wardrobe" />
                :
                <HomeComponent />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    overviewText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    howItWorksText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    testimonialHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    // Add additional styles as needed
});

export default HomeScreen;