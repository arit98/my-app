import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    BottomSheetModalProvider,
  } from "@gorhom/bottom-sheet";

const WelcomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
            {/* <Header headerIcon1={"bars"} headerIcon2={"bell-o"} /> */}
            <BottomBar />
            <StatusBar backgroundColor="#26232f" style="dark" />
            </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}

export default WelcomeScreen;
