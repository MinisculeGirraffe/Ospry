import React from 'react'
import { Icon, TopNavigationAction } from "@ui-kitten/components"

const PlusIcon = (props) => (
    <Icon{...props} name='plus-outline'/>
)

export const renderRightActions = () => (
    <TopNavigationAction icon={PlusIcon} />
)