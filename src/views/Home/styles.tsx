import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    boardContainer: {
        alignItems: 'center',
        borderWidth: 1,
    },
    touchable: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boardControllerContainer: {
        flex: 1,
        borderWidth: 1,
    },
    borderSwitchContainer: {
        borderWidth: 1,
        marginLeft: 20,
    },
    moveContainer: {
        borderWidth: 1,
    },
    darkSwitchContainer: {
        borderWidth: 1,
    },
    boldSwitchContainer: {
        borderWidth: 1,
        marginRight: 20,
    },
    // This is the box holding all the UI controls
    UIControlsContainer: {
        height: 200,
    },
    UITopControlsContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginRight: 20,
        marginLeft: 20,
    },
    UIMiddleControlsContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginRight: 20,
        marginLeft: 20,
    },
    UIMiddleControlsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf : 'center',
        marginTop: 10,
    },
    darkAndLightDropDown: {
        height: 40,
        width: 175,
        backgroundColor: '#eee',
        color: 'black',
        fontSize: 5,
    },
});
