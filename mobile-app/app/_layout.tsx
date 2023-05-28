import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'
import blurBg from '../src/assets/bg-blug.png'
import Stripes from '../src/assets/stripes.svg'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isAuth, setIsAuth] = useState<null | boolean>(null)

  async function getAppToken(): Promise<string> {
    const token = SecureStore.getItemAsync('NLWtoken')
    return token
  }

  useEffect(() => {
    const token = getAppToken()
    setIsAuth(!!token)
  }, [])

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" redirect={isAuth} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}
