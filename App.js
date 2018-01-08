/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView
} from 'react-native'
import { BleManager, Device, State } from 'react-native-ble-plx'
import BikonDeviceListItem from './src/components/BikonDeviceListItem'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
})

type StateType = {
    btItems: Array<Device>
}

type PropsType = {}

export default class App extends Component<PropsType, StateType> {
    constructor (props: PropsType) {
        super(props)
        this.state = {
            btItems: []
        }
    }

    componentDidMount () {
        const bleManger = new BleManager()
        bleManger.onStateChange((state) => {
            if (state === State.PoweredOn) {
                bleManger.startDeviceScan(null, null, (err, data) => {
                    if (err) return
                    const btItems = [ ...this.state.btItems, data ]
                    this.setState({
                        btItems
                    })
                })
            }
        }, true)
    }

    _keyExtractor = (item: Device) => item.id

    connectToDevice = (id: number) => {

    }

    renderBikonItem = ({ item }: { item: Device }) => <BikonDeviceListItem id={item.id} name={item.name || item.id}
                                                                           onPress={this.connectToDevice}/>

    renderSeparator = () => <View style={styles.separator}></View>

    render () {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList data={this.state.btItems} style={{ height: '100%' }} renderItem={this.renderBikonItem}
                          keyExtractor={this._keyExtractor} ItemSeparatorComponent={this.renderSeparator}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    separator: {
        height: 1,
        backgroundColor: '#aaa'
    }
})
