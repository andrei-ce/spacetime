import { StatusBar } from 'expo-status-bar'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import * as SecureStore from 'expo-secure-store'
import { styled } from 'nativewind'
import React, { useEffect } from 'react'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useRouter } from 'expo-router'

import { api } from '../src/lib/api'
import blurBg from '../src/assets/bg-blug.png'
import Stripes from '../src/assets/stripes.svg'
import NlwLogo from '../src/assets/nlw-logo.svg'

const StyledStripes = styled(Stripes)
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/c2f4e1233d83117bb17a',
}

export default function App() {
  const router = useRouter()
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  // last parameter name changed (signInWithGithub) for better context
  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'c2f4e1233d83117bb17a',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'timecapsule',
      }),
    },
    discovery,
  )

  async function handleGithubOAuthCode(code: String): Promise<void> {
    try {
      const res = await api.post('/register', {
        code,
      })
      const { token } = res.data
      await SecureStore.setItemAsync('NWLtoken', token)
      router.push('/memories')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log(
    //   makeRedirectUri({
    //     scheme: 'timecapsule',
    //   }),
    // )

    if (response?.type === 'success') {
      const { code } = response.params
      handleGithubOAuthCode(code)
    }
  }, [response])

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
          onPress={() => signInWithGithub()}
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
