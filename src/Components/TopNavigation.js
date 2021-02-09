import React from 'react';
import { TopNavigation,Text} from '@ui-kitten/components'
import { NavigateBackAction } from './NavigateBackAction'
export default (Title, NagivateBack, RightActions) => {
    const leftAccessory = NagivateBack ? NavigateBackAction : null
    return (
        <TopNavigation
            title={props => <Text  {...props}>{Title}</Text>}
            alignment="center"
        >
        </TopNavigation>
    )

}

