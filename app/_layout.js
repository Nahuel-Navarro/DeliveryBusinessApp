import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require('../app/assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../app/assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../app/assets/fonts/DMSans-Regular.ttf'),
        'OpenSans-SemiBold': require('../app/assets/fonts/OpenSans-SemiBold.ttf'),
        'OpenSans-Bold': require('../app/assets/fonts/OpenSans-Bold.ttf'),
        'OpenSans-Medium': require('../app/assets/fonts/OpenSans-Medium.ttf'),
        'OpenSans-Regular': require('../app/assets/fonts/OpenSans-Regular.ttf')
    })
    const onLayoutRootView = useCallback(async () =>{
        if(fontsLoaded){
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])
    if(!fontsLoaded) return null;
    return <Stack onLayout={onLayoutRootView}/>;
}

export default Layout;