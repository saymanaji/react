import React, { useState , useEffect} from "react";
import { StyleSheet, Text, View , TextInput , Button} from 'react-native';
import axios from "axios";

const RegistrationScreen = () => {
    const [username, SetUsername] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");

    const [isSubmit , SetIsSubmit] = useState(false);

    useEffect(() => {
        const authenticate = async () => {
            axios
            .post(
                "http://10.0.2.2/native/auth.php",
                JSON.stringify({
                    email: email,
                    password: password,
                    username: username,
                })
            )
            .then((response) => {
                console.log(response.data);
                SetIsSubmit(false);
            })
            .catch((error) => {
                console.log(error);
            });
        };
        if(isSubmit) authenticate();
    }, [isSubmit]);

    const usernammeHandler = (text) => {
        SetUsername(text);
    };
    return (
        <View style={styles.container}>
        <TextInput 
            placeholder="user name"
            style={styles.input}
            onChangeText={usernammeHandler}
            />
             <TextInput 
            placeholder="Email"
            style={styles.input}
                autoCapitalize="none"
                onChangeText={(text) => SetEmail}
            />
             <TextInput 
            placeholder="Password"
            style={styles.input}
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={(text) => SetPassword}
            />
            <View style={styles.buttonContainer}>
                <Button title="Register"
                onPress={() => SetIsSubmit(true)}>
                </Button>
            </View>
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    
    },
    input:{
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        width:"55%"
    },
    buttonContainer:{
        marginTop:20,
    }
});
export default RegistrationScreen;
