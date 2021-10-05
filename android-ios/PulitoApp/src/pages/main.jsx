import * as React from 'react';
import { View, Text,Input } from 'react-native';

function Main() {
    const [number_phone, setNumberPhone] = useState('');
    const [code, setCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);


    onSubmit = (e) => {
        e.preventDefault();
        login_phone(number_phone);
    }
    return (
        <View>
            <Text>
                asd
            </Text>
        </View>
    );
}

export default App;