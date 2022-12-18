import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function TopPage({ route }){

    const { currentPage, topArtistsData, topTracksData } = route.params;

    return(
        <View style={style.background}>
            <ScrollView contentContainerStyle={{paddingBottom: 40, paddingTop: 20}}>

                {/* #1 top item */}
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Text style={{ color: 'white', fontSize: 60, fontWeight: '900', textAlignVertical: 'center' }}>#1</Text>
                    <View>
                        { currentPage==='Top artists'
                            ?   <View
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 20,
                                        margin: 5,
                                        width: 180
                                    }}
                                > 
                                    <Image 
                                        source={{ uri: topArtistsData[0].images[0].url }}
                                        style={style.cardImage}
                                    />
                                    <Text style={{ color: 'white', textAlign: 'center' }}>{topArtistsData[0].name}</Text>
                                </View>
                            :   <View
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 20,
                                        margin: 5,
                                        width: 180
                                    }}
                                > 
                                    <Image 
                                        source={{ uri: topTracksData[0].album.images[0].url }}
                                        style={style.cardImage}
                                    />
                                    <Text style={{ color: 'white', textAlign: 'center' }}>{topTracksData[0].name}</Text>
                                </View>
                        }
                    </View>
                </View>

                {/* #2 and #3 top items */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Text style={{ color: 'white', fontSize: 40, fontWeight: '900', textAlignVertical: 'center' }}>#2</Text>
                        <View style={{ marginLeft: 8 }}>
                            { currentPage==='Top artists'
                                ?   <View
                                        style={{
                                            marginTop: 10,
                                            marginBottom: 20,
                                            margin: 5,
                                            width: 135
                                        }}
                                    > 
                                        <Image 
                                            source={{ uri: topArtistsData[1].images[0].url }}
                                            style={style.cardImageAlt}
                                        />
                                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 13 }}>{topArtistsData[1].name}</Text>
                                    </View>
                                :   <View
                                        style={{
                                            marginTop: 10,
                                            marginBottom: 20,
                                            margin: 5,
                                            width: 135
                                        }}
                                    > 
                                        <Image 
                                            source={{ uri: topTracksData[1].album.images[0].url }}
                                            style={style.cardImageAlt}
                                        />
                                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 13 }}>{topTracksData[1].name}</Text>
                                    </View>
                            }
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Text style={{ color: 'white', fontSize: 40, fontWeight: '900', textAlignVertical: 'center' }}>#3</Text>
                        <View style={{ marginLeft: 8 }}>
                        { currentPage==='Top artists'
                            ?   <View
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 20,
                                        margin: 5,
                                        width: 135
                                    }}
                                > 
                                    <Image 
                                        source={{ uri: topArtistsData[2].images[0].url }}
                                        style={style.cardImageAlt}
                                    />
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 13 }}>{topArtistsData[2].name}</Text>
                                </View>
                            :   <View
                                    style={{
                                        marginTop: 10,
                                        marginBottom: 20,
                                        margin: 5,
                                        width: 135
                                    }}
                                > 
                                    <Image 
                                        source={{ uri: topTracksData[2].album.images[0].url }}
                                        style={style.cardImageAlt}
                                    />
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 13 }}>{topTracksData[2].name}</Text>
                                </View>
                        }
                        </View>
                    </View>
                </View>

                { currentPage==='Top artists'
                    ?   <View style={{ marginTop: 20 }}>
                            { topArtistsData.slice(3).map((item) => (
                                <View style={{ backgroundColor: '#27272A', flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, borderRadius: 8 }} key={item.uri}>
                                    <Image
                                        source={{ uri: item.images[0].url }}
                                        style={{ width: 80, height: 80, borderBottomLeftRadius: 3, borderTopLeftRadius: 3 }}
                                    />
                                    <Text style={{ color: 'white', textAlignVertical: 'center', marginLeft: 10 }}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    :   <View style={{ marginTop: 20 }}>
                            { topTracksData.slice(3).map((item) => (
                                <View style={{ backgroundColor: '#27272A', flexDirection: 'row', marginVertical: 5, marginHorizontal: 10, borderRadius: 8 }} key={item.uri}>
                                    <Image
                                        source={{ uri: item.album.images[0].url }}
                                        style={{ width: 80, height: 80, borderBottomLeftRadius: 3, borderTopLeftRadius: 3 }}
                                    />
                                    <Text style={{ color: 'white', textAlignVertical: 'center', marginLeft: 10 }}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                }
                
            </ScrollView>
        </View>
    );
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#18181B',
    },
    cardImage: {
        width: 180,
        height: 180,
        borderRadius: 8
    },
    cardImageAlt: {
        width: 135,
        height: 135,
        borderRadius: 8
    }
});