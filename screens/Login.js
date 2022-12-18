import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config/secret.json';

export default function Login({ navigation }){
    const discovery = {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
    };

    const [request, response, promptAsync] = useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            scopes: [
                'user-read-currently-playing',
                'user-read-recently-played',
                'user-read-playback-state',
                'user-top-read',
                'user-modify-playback-state',
                'streaming',
                'user-read-email',
                'user-read-private',
            ],
            usePKCE: false,
            redirectUri: 'exp://192.168.1.89:19000',
        },
        discovery
    );

	useEffect(() => {
		if(response?.type==='success'){
			const { access_token } = response.params;
			storeData(access_token);
		}
	}, [response]);

	const storeData = async (token) => {
		try {
			await AsyncStorage.setItem('@access_token', token);
			navigation.reset({
				index: 0,
				routes: [{ name: 'Statsfy' }]
			})
		}
		catch(e){
			// saving error
			console.log('Error', e);
		}
	};


	return (
		<View style={{ backgroundColor: '#18181B', flex: 1 }}>
			<Text
				style={{
					color: 'white',
					fontSize: 25,
					fontWeight: '900',
					textAlign: 'center',
					marginTop: 80
				}}
			>
				Login with your Spotify account
			</Text>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<TouchableOpacity onPress={() => promptAsync()}>
					<View
						style={{
							backgroundColor: '#22C55E',
							marginHorizontal: 90,
							borderRadius: 3,
							padding: 6
						}}
					>
						<Text
							style={{
								color: 'white',
								fontSize: 20,
								fontWeight: '900',
								textAlign: 'center'
							}}
						>
							Login
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};