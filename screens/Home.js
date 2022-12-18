import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsersRecentTracks, getUsersTopTracks, getUsersTopArtists } from '../utils/fetchApi';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function Home({ navigation }){
    const [authToken, setAuthToken] = useState();
    const [isLoad, setIsLoad] = useState(true)

    // State for data
    const [topTracks, setTopTracks] = useState();
    const [topArtists, setTopArtists] = useState();
    const [recentTracks, setRecentTracks] = useState();

    useEffect(() => {
        start();
    }, [isLoad]);

    const start = async () => {
        await getAccessToken();

        // Top tracks
        const getMyTopTracks = async () => {
            const res = await getUsersTopTracks(authToken);
            const { items } = await res.json();
            setTopTracks(items);
        }     

        // Top artists
        const getMyTopArtists = async () => {
            const res = await getUsersTopArtists(authToken)
            const { items } = await res.json();
            setTopArtists(items);
        }

        // Recent tracks
        const getMyRecentTracks = async () => {
            const res = await getUsersRecentTracks(authToken);
            const { items } = await res.json();
            setRecentTracks(items);
        }
        
        getMyTopTracks();
        getMyTopArtists();
        getMyRecentTracks();
        setIsLoad(false);
    }
    
    const getAccessToken = async () => {
        try{
            const value = await AsyncStorage.getItem('@access_token');
            if(value !== null) {
                // value previously stored
                setAuthToken(value)
            }
        }
        catch(e){
            // error reading value
            console.error('ERROR: ', e);
        }
    }

    if(topArtists===undefined){
        return(
            <View style={style.background}>
                <Text style={{color: 'white'}}>Loading...</Text>
            </View>
        );
    }
    return(
        <View style={style.background}>
            <ScrollView contentContainerStyle={{paddingBottom: 40, paddingTop: 20}}>

                {/* Top artists */}
                <View>
                    <TouchableHighlight
                        onPress={() => navigation.navigate('TopPage', {
                            currentPage: 'Top artists',
                            topArtistsData: topArtists,
                            title: 'Top artistas'
                        })}
                        style={{marginHorizontal: 5, borderRadius: 8}}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={style.textTitle}>Top artistas</Text>
                            <Text style={{ fontWeight: '300', fontSize: 25, color: 'white', marginRight: 25 }}>{'>'}</Text>
                        </View>
                    </TouchableHighlight>
                    <FlatList 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={topArtists}
                        renderItem={({ item }) => (
                            <View style={style.imageContainer}>
                                <Image 
                                    source={{ uri: item.images[0].url }}
                                    style={style.cardImage}
                                />
                                <Text style={style.cardText}>{item.name}</Text>
                            </View>
                        )}
                    />
                </View>

                {/* Top tracks */}
                <View>
                    <TouchableHighlight
                        onPress={() => navigation.navigate('TopPage', {
                            currentPage: 'Top tracks',
                            topTracksData: topTracks,
                            title: 'Top músicas'
                        })}
                        style={{marginHorizontal: 5, borderRadius: 8}}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={style.textTitle}>Top músicas</Text>
                            <Text style={{ fontWeight: '300', fontSize: 25, color: 'white', marginRight: 25 }}>{'>'}</Text>
                        </View>
                    </TouchableHighlight>
                    <FlatList 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={topTracks}
                        renderItem={({ item }) => (
                            <View style={style.imageContainer}>
                                <Image 
                                    source={{ uri: item.album.images[0].url }}
                                    style={style.cardImage}
                                />
                                <Text style={style.cardText}>{item.name}</Text>
                            </View>
                        )}
                    />
                </View>

                {/* Recent tracks */}
                <View>
                    <TouchableHighlight
                        onPress={() => navigation.navigate('Login')}
                        style={{marginHorizontal: 5, borderRadius: 8}}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={style.textTitle}>Músicas recentes</Text>
                            <Text style={{ fontWeight: '300', fontSize: 25, color: 'white', marginRight: 25 }}>{'>'}</Text>
                        </View>
                    </TouchableHighlight>
                    <FlatList 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={recentTracks}
                        renderItem={({ item }) => (
                            <View style={style.imageContainer}>
                                <Image 
                                    source={{ uri: item.track.album.images[0].url }}
                                    style={style.cardImage}
                                />
                                <Text style={style.cardText}>{item.track.name}</Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#18181B',
    },
    cardText: {
        color: 'white',
        textAlign: 'center'
    },
    textTitle: {
        fontWeight: '800',
        color: 'white',
        fontSize: 25,
        marginHorizontal: 15,
        marginTop: 5,
        marginBottom: 5
    },
    imageContainer: {
        marginTop: 10,
        marginBottom: 20,
        margin: 5,
        width: 180
    },
    cardImage: {
        width: 180,
        height: 180,
        borderRadius: 8
    }
});