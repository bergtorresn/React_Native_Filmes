import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import firebase from 'react-native-firebase'

export default class CadastroScreen extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            senha: ""
        }
    }

    novoUsuario = async () => {
        try {
            const { email, senha } = this.state;

            await firebase.auth().createUserWithEmailAndPassword(email, senha);
            
            Navigation.setStackRoot(this.props.componentId, {
                component: {
                    name: 'Home',
                }
            });
        } catch (error) {
            Alert.alert("Aviso", error);
        }
    }

    render() {
        return (
            <View style={styles.loginView}>
                <TextInput placeholder="Digite o seu e-mail"
                    value={this.state.email}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    onChangeText={email => this.setState({ email })}
                    style={styles.loginInput} />
                <TextInput placeholder="Digite a sua senha"
                    value={this.state.senha}
                    autoCapitalize='none'
                    secureTextEntry
                    onChangeText={senha => this.setState({ senha })}
                    style={styles.loginInput} />
                <TouchableOpacity onPress={this.novoUsuario}
                    style={styles.loginButton}>
                    <Text style={styles.loginTextButton}>Entrar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    loginInput: {
        height: 45,
        alignSelf: 'stretch',
        backgroundColor: '#EEE',
        marginBottom: 20
    },
    loginButton: {
        height: 45,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#069'
    },
    loginTextButton: {
        fontWeight: 'bold',
        color: '#FFF'
    }
})
