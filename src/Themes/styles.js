import {useTheme} from '@ui-kitten/components'
import { StyleSheet } from 'react-native';


export const styles = () => {
    const theme = useTheme()

    const styleSheet = StyleSheet.create({
        nonThemedContainer: {
            backgroundColor: theme['background-basic-color-1']
        }
    })
    return styleSheet
}
