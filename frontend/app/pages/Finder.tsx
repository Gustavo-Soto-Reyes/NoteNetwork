// Import necessary modules
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Animated, PanResponder, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const SwipeComponent = ({ initialX }) => {
    const pan = useRef(new Animated.ValueXY({ x: initialX, y: 0 })).current;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
        onPanResponderRelease: (e, gestureState) => {
            if (gestureState.dx > 50) {
                Animated.spring(pan, {
                    toValue: { x: 200, y: 0 }, // Swipe right
                    useNativeDriver: false,
                }).start();
            } else if (gestureState.dx < -50) {
                Animated.spring(pan, {
                    toValue: { x: -200, y: 0 }, // Swipe left
                    useNativeDriver: false,
                }).start();
            } else {
                Animated.spring(pan, {
                    toValue: { x: initialX, y: 0 }, // Reset to initial position
                    useNativeDriver: false,
                }).start();
            }
        },
    });

    return (
        <Animated.View
            style={[styles.swipeBox, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
            {...panResponder.panHandlers}
        >
            <Text style={styles.text}>Swipe Me</Text>
        </Animated.View>
    );
};


// Define the functional component
const Finder = () => {

    type CardData = {
        id: number;
        name: string;
        uri: string;
    };

    const [items, setItems] = useState<CardData[]>([])
    const handleGetItems = async () => {
        try {
            const response = await axios.get('http://localhost:6000/api/items');
            setItems(response.data);
        } catch (error) {
            alert(error);
        }
    }
    const [find, setFind] = useState(false)

    return (
        <View style={styles.container}>
            {!find ?
                <>
                    <Text style={styles.text}>Hello, React Native!</Text>
                    <Button onPress={() => { handleGetItems(); setFind(true) }} title="Find Artist" />
                </>
                :
                    <View style={styles.swipeContainer}>
                        {items.length === 0 ? (
                            <Text>Loading...</Text>
                        ) : (
                            <Swiper                            
                                cards={items}
                                renderCard={(card) => (
                                    <View style={styles.card}>
                                        <Image style={styles.cardBackground} source={{ uri: card.uri }} />
                                        <Text style={styles.cardText}>{card.name}</Text>
                                    </View>
                                )}
                                onSwiped={(index) => console.log(`Swiped card at index: ${index}`)}
                                onSwipedLeft={(index) => console.log(`Swiped left card at index: ${index}`)}
                                onSwipedRight={(index) => console.log(`Swiped right card at index: ${index}`)}
                                stackSize={3} // Number of cards to stack in the background
                                cardIndex={0} // Index of the card to be displayed initially
                                backgroundColor="white"
                                disableTopSwipe // Disable swipe from the top
                                disableBottomSwipe // Disable swipe from the bottom
                                animateCardOpacity // Enable fading of cards when swiped
                                infinite // Enable infinite card loop
                                stackSeparation={10} // Separation between stacked cards                                
                            />
                        )}
                    </View>
            }
        </View>
    );
};

// Define the component's styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        padding:0,
    },
    swipeContainer:{
        flex:1,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'red',
        height:'80%',
        width:'100%'
    },
    cardText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cardBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius:8,
    },
});
export default Finder;
