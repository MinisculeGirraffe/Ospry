import React from 'react';
import { TopNavigationAction, Icon } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native';
export const NavigateBackAction = () => {
    const navigation = useNavigation()
    return (
        <TopNavigationAction
            icon={(props) => <Icon {...props} name='arrow-back-outline' />}
            onPress={() => navigation.goBack()}
        />
    )
}

