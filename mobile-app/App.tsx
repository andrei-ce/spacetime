import { StatusBar } from 'expo-status-bar'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import blurBg from './src/assets/bg-blug.png'
import Stripes from './src/assets/stripes.svg'
import NlwLogo from './src/assets/nlw-logo.svg'
import { styled } from 'nativewind'
import React from 'react'

const StyledStripes = styled(Stripes)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{ position: 'absolute', left: '-100%' }}
      className="relative flex-1 bg-gray-900 p-8"
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NlwLogo />
        <Text className="font-title text-2xl leading-tight text-gray-50">
          Your time capsule
        </Text>
        <Text className="text-center font-body text-base leading-relaxed text-gray-100">
          Collect remarkable memories in your journey and share them (if you
          want) with the world!
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">
            Register a memory
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Made with 💜 during NLW from Rocketseat
      </Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
