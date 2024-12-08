// styles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        width: '100%',
    },
    text: {
        fontSize: 18,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#008CBA',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    loading: {
        marginTop: 50,
    },
    card: {
        alignItems: 'center',
        marginBottom: 20,
        width: '80%',
        backgroundColor: '#f2f2f2',
        padding: 20,
        borderRadius: 10,
    },
    name: {
        fontSize: 20,
        textTransform: 'capitalize',
        marginBottom: 10,
    },
});
