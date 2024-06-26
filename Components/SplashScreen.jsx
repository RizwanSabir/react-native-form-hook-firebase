import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';

const StyledImage = styled(Image);
const StyledText = styled(Text);

export default function SplashScreen({ navigation }) {
    const [user, setUser] = useState('');
    const [fontsLoaded, fontError] = useFonts({
        'Ing': require('../assets/Fonts/IngridDarling-Regular.ttf'),
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    navigation.reset({
                        index: 0,
                        routes: [{
                            name: 'MainPage',
                            params: {
                                userData: { userId: user.uid },
                            },
                        }],
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{
                            name: 'Login',
                            params: {
                                userData: { userId: user?.uid }, // Accessing uid safely
                            },
                        }],
                    });
                }
            } catch (error) {
                console.error('Error in onAuthStateChanged:', error);
            }
        });

        return unsubscribe;
    }, [navigation]);



    return (
        <View className='flex justify-center items-center h-full'>
            <SafeAreaView>
                <View className='flex-row justify-center '>
                    <StyledImage resizeMode='contain' source={require('../assets/img/Intersect.png')} />
                </View>
                <View className="flex flex-row justify-center  mt-8">
                    <StyledText style={{ fontFamily: "Ing" }} className='text-5xl   mt-4'> Let's Party!!!  </StyledText>
                    <View className=' w-9'>
                        <StyledImage style={{ width: 30 }} resizeMode='contain' source={require('../assets/img/Frame 38.png')} />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
