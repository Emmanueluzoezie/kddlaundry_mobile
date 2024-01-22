import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const LoadingIndicator = ({ borderColor, width, height, borderWidth }: any) => {
    const [loading, setLoading] = useState(true);
    const spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1000, // Duration for one complete rotation
            easing: Easing.linear,
            useNativeDriver: true,
        })
    ).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
                <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }, { borderColor: borderColor, width: width, height: height, borderWidth: borderWidth }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        alignItems: 'center',
    },
    spinner: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4, // Adjusted the borderWidth to a smaller value
        borderColor: '#0000ff',
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        marginTop: 20,
        marginBottom: 10,
    },
});

export default LoadingIndicator;