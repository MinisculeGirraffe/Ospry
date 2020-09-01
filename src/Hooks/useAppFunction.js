import * as React from 'react';
import * as Linking from 'expo-linking'

export default () => {

    const openLink = (url) => {

        if (Linking.canOpenURL(url)) {
            Linking.openURL(url)
        }
    }
    
    return { openLink }
}



