// @flow

import React, { Component } from 'react'
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

type Props = {
    id: string,
    onPress: Function,
    name: string
}

const BikonDeviceListItem = (props: Props): TouchableOpacity => (
    <TouchableOpacity key={props.id} onPress={() => props.onPress(props.id)} style={styles.container}>
        <Text style={styles.text}>{props.name}</Text>
    </TouchableOpacity>
)

BikonDeviceListItem.defaultProps = {
    onPress: () => {
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1
    },

    text: {
        fontSize: 1,
        color: '#333'
    }
})

export default BikonDeviceListItem