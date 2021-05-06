import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import StandardContainer from '../Components/StandardContainer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import HighlightContainer from '../Components/HighlightContainer'
import FavoritesScreen from './FavoritesScreen'
import { BlurView } from "@react-native-community/blur";

const HomeScreen = () => {
    const [isMenuOpen, setMenuStatus] = useState(false);

    const moveAmount = useRef(new Animated.Value(0)).current;


    const xyValues = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const [isHidingTransitionButtons, setTransitionButtonStatus] = useState(false);

    const favoriteMoveAmount = useRef(new Animated.Value(95)).current;

    const [isFavoritesOpen, setFavoritesMenuStatus] = useState(false);

    const pageWidth = useRef(new Animated.Value(50)).current;

    const pageHeight = useRef(new Animated.Value(35)).current;

    const moveAnim = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.spring(moveAmount, {
            toValue: isMenuOpen ? 0 : -75,
            duration: 100,
            useNativeDriver: false
        }).start();
    };

    function DisplayFavoritesScreen() {
        if (!isFavoritesOpen) {
            return (
                <FavoritesScreen />
            )
        } else {
            return (
                <Icon name={"favorite"} size={30} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, textAlign: 'center', opacity: 1 }} />
            )
        }
    }


    const moveCornerAmount = useRef(new Animated.Value(0)).current;

    const moveCornerAnim = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.spring(xyValues, {
            toValue: isMenuOpen ? { x: 0, y: 0 } : { x: -57, y: -50 },
            duration: 200,
            useNativeDriver: false
        }).start();
    };

    const moveFavoriteToMiddle = () => {
        Animated.spring(favoriteMoveAmount, {
            toValue: isFavoritesOpen ? 20 : 95,
            duration: 200,
            useNativeDriver: false
        }).start();
    };

    const animateFavorite = () => {
        setFavoritesMenuStatus(!isFavoritesOpen);
        moveFavoriteToMiddle();
        transitionToScreen();
    };

    const animateButtons = () => {
        if (isHidingTransitionButtons) {
            setTransitionButtonStatus(false)
        }

        setMenuStatus(!isMenuOpen);
        moveCornerAnim();
        moveAnim();
        setTimeout(() => { setTransitionButtonStatus(!isHidingTransitionButtons) }, 230)

    };

    const updateWidth = () => {
        Animated.spring(pageWidth, {
            toValue: isFavoritesOpen ? 325 : 50,
            duration: 200,
            useNativeDriver: false
        }).start();
    };

    const updateHeight = () => {
        Animated.spring(pageHeight, {
            toValue: isFavoritesOpen ? 700 : 35,
            duration: 200,
            useNativeDriver: false
        }).start();
    };

    const transitionToScreen = () => {
        updateWidth();
        updateHeight();
    };

    try {
        const response = changeNavigationBarColor('transparent');
        console.log(response)// {success: true}
    } catch (e) {
        console.log(e)// {success: false}
    }

    return (

        <View style={styles.container}>

            <LinearGradient style={styles.backgroundGradient} colors={['#ff1b6b', '#45caff']} />

            {/* Header */}

            <View style={styles.headerContainer}>
                <LinearGradient style={styles.backgroundGradient} colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']} />
                {/* <BlurView blurRadius={6} blurType='dark' style={styles.backgroundGradient} reducedTransparencyFallbackColor='white' /> */}
                {/* <LinearGradient style={styles.backgroundGradient} colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)']} /> */}
                <Text style={styles.headerText}>BarTab</Text>
                <Text style={styles.subHeaderText}>Welcome back, Cameron!</Text>

            </View>
            {/* End of header */}


            <ScrollView style={{ paddingTop: 120, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, paddingBottom: 60 }} showsVerticalScrollIndicator={false} >


                {/* Main Components */}
                <View >
                    {/* Recently Ordered */}
                    <View style={{ alignSelf: 'stretch' }}>
                        <Text style={styles.sectionHeaderText}>Recently Ordered:</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ paddingTop: 20 }}>
                            <StandardContainer isColoredBG={false} containerPadding={8} drinkName={'Strawberry Daiquiri'} imageSource={{ uri: 'https://oskars.ie/wp-content/uploads/frozen-strawberry-daiquiri.png' }} />
                            <StandardContainer isColoredBG={false} containerPadding={8} isColoredBG={false} drinkName={'Whiskey Rocks'} imageSource={{ uri: 'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/hb1/h95/11941385535518.png' }} />
                            <StandardContainer isColoredBG={false} containerPadding={8} drinkName={'Gin and Tonic'} imageSource={{ uri: 'https://d32miag6ta013h.cloudfront.net/master_cocktails/2922/fr-fr/small/st~germain_g_t.png' }} />
                            <StandardContainer isColoredBG={false} containerPadding={8} drinkName={'Martini'} imageSource={{ uri: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-us.s3.amazonaws.com%2Ff5e9fd58-1ce6-11e8-aaca-4574d7dabfb6?fit=scale-down&source=next&width=700' }} />

                        </ScrollView>


                    </View>
                    {/* End Recently Ordered */}


                    {/*Popular Today*/}
                    <View style={{ alignSelf: 'stretch', marginTop: 20 }}>
                        <Text style={[styles.sectionHeaderText, { paddingBottom: 20 }]}>Popular Today:</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ paddingTop: 20 }}>
                            <HighlightContainer drinkName={'Blue Mother Fucker'} imageSource={{ uri: 'https://i.pinimg.com/originals/6f/98/70/6f98704adbbc06ba80e0278d0c7a36bc.png' }} />
                            <HighlightContainer drinkName={'Sex On The Beach'} imageSource={{ uri: 'http://arrieta32.com/wp-content/uploads/2020/09/COCKTAILS-06.png' }} />
                        </ScrollView>
                    </View>
                    {/* End Popular Today */}

                    {/*Popular Today*/}
                    <View style={{ alignSelf: 'stretch', marginTop: 20, paddingBottom: 200 }}>
                        <Text style={[styles.sectionHeaderText, { paddingBottom: 20 }]}>Popular Today:</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ paddingTop: 20 }}>
                            <HighlightContainer drinkName={'Blue Mother Fucker'} imageSource={{ uri: 'https://i.pinimg.com/originals/6f/98/70/6f98704adbbc06ba80e0278d0c7a36bc.png' }} />
                            <HighlightContainer drinkName={'Sex On The Beach'} imageSource={{ uri: 'http://arrieta32.com/wp-content/uploads/2020/09/COCKTAILS-06.png' }} />
                        </ScrollView>
                    </View>
                    {/* End Popular Today */}


                </View>
                {/* End Main Components */}


            </ScrollView>





            {/* Buttons */}

            {/* Menu Button */}
            <TouchableOpacity style={{ zIndex: 3, position: 'absolute', bottom: 25, right: 20, alignContent: 'center', justifyContent: 'center', width: 50, height: 35, borderRadius: isMenuOpen ? 20 : 25, backgroundColor: 'rgba(255,255,255, 1)' }} onPress={() => animateButtons()}>
                <Icon name={isMenuOpen ? "close" : "menu"} size={30} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, textAlign: 'center', opacity: 1 }} />
            </TouchableOpacity>

            {/* Favorites Buttons */}
            {/* Favorite button that shows after movement is finished. */}
            <Animated.View pointerEvents={isHidingTransitionButtons ? 'auto' : 'none'} style={{ opacity: isHidingTransitionButtons ? 1 : 0, zIndex: 5, position: 'absolute', bottom: 25, right: favoriteMoveAmount, alignContent: 'center', justifyContent: 'center', width: pageWidth, height: pageHeight, borderRadius: isMenuOpen ? 20 : 25, backgroundColor: 'rgba(255,255,255, 1)' }}>
                <TouchableOpacity style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, textAlign: 'center', opacity: 1 }} onPress={() => animateFavorite()}>
                    <DisplayFavoritesScreen />
                </TouchableOpacity>
            </Animated.View>
            {/* One on top */}
            <Animated.View style={{ opacity: isHidingTransitionButtons ? 0 : 1, transform: [{ translateX: moveAmount }], zIndex: 1, position: 'absolute', bottom: 25, right: 20, alignContent: 'center', justifyContent: 'center', width: 50, height: 35, borderRadius: isMenuOpen ? 20 : 25, backgroundColor: 'rgba(255,255,255, 1)' }}>
                <TouchableOpacity style={{ zIndex: 2, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, textAlign: 'center', opacity: 1 }} >
                    <Icon name={"favorite"} size={30} style={{ zIndex: 2, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, textAlign: 'center', opacity: 1 }} />
                </TouchableOpacity>
            </Animated.View>



            {/* Settings Button */}
            <Animated.View style={[{ transform: xyValues.getTranslateTransform(), position: 'absolute', bottom: 25, right: 20, zIndex: 2, alignContent: 'center', justifyContent: 'center', width: 50, height: 35, borderRadius: isMenuOpen ? 20 : 25, backgroundColor: 'rgba(255,255,255, 1)' }]}>
                <TouchableOpacity style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, textAlign: 'center', opacity: 1 }}>
                    <Icon name={"settings"} size={30} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, textAlign: 'center', opacity: 1 }} />
                </TouchableOpacity>
            </Animated.View>
            {/* Cart Button */}
            <Animated.View style={{ transform: [{ translateY: moveAmount }], zIndex: 2, position: 'absolute', bottom: 25, right: 20, alignContent: 'center', justifyContent: 'center', width: 50, height: 35, borderRadius: isMenuOpen ? 20 : 25, backgroundColor: 'rgba(255,255,255, 1)' }}>
                <TouchableOpacity style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, textAlign: 'center', opacity: 1 }}>
                    <Icon name={"shopping-cart"} size={30} style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, textAlign: 'center', opacity: 1 }} />
                </TouchableOpacity>
            </Animated.View>
            {/* End of Menu Button */}


            {/* <FavoritesScreen style={{ zIndex: 10 }} /> */}

        </View >
    );

}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    sectionHeaderText:
    {
        paddingLeft: 20,
        textAlign: 'left',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    backgroundGradient: {
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    },
    headerText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    subHeaderText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    headerContainer: {
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        zIndex: 3,
        paddingTop: 40,
        // backgroundColor: 'rgba(0,0,0,0.7)',
        paddingBottom: 8,


    },
    subText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 25,
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        textAlign: 'center'
    }
})