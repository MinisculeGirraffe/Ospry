import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withStyles } from '@ui-kitten/components';

const ThemedSafeArea = ({eva}) => (
    <SafeAreaView style={eva.style.container}>

    </SafeAreaView>
)

export const ThemedSafeAreaView = withStyles(ThemedSafeArea, theme => ({
    container: {
        flex: 1,
        backgroundColor: theme['background-basic-color-1']
    }
}))