import React, {useState} from 'react';
import { View, Text,Input } from 'react-native';

function Login() {
    const [number_phone, setNumberPhone] = useState('');
    const [code, setCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    return (
        <View>
            <Input placeholder="Номер телефона"></Input>
            <Text>asds</Text>
        </View>
    );
}

export default Login;