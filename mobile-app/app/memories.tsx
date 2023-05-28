import { Link, useRouter } from 'expo-router'
import { Image, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import NlwLogo from '../src/assets/nlw-logo.svg'
import Icon from '@expo/vector-icons/Feather'
import * as SecureStore from 'expo-secure-store'
import { api } from '../src/lib/api'
import dayjs from 'dayjs'

interface Memory {
  coverUrl: string
  exerpt: string
  id: string
  createdAt: string
}

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()
  const [memories, setMemories] = useState<Memory[]>([])

  async function signOut() {
    await SecureStore.deleteItemAsync('NLWtoken')
    router.push('/')
  }

  async function fetchUserMemories() {
    const token = await SecureStore.getItemAsync('NLWtoken')
    const res = await api.get('/memories', {
      headers: { Authorization: `Bearer ${token}` },
    })
    setMemories(res.data)
  }

  useEffect(() => {
    fetchUserMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
      // style={{ paddingBottom: bottom, paddingTop: top }} --> if component was a <View/>
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NlwLogo />
        {/* asChild prop makes the child behave as the parent (TouchOp as Link) */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10 ">
        {memories.map((memory) => {
          return (
            <View key={memory.id} className="space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50"></View>
                <Text className="font-body text-sm text-gray-100">
                  {dayjs(memory.createdAt).format('MMMM DD, YYYY')}
                </Text>
              </View>
              <View className="space-y-4 px-8">
                <Image
                  className="rounded-large aspect-video w-full"
                  source={{
                    uri: memory.coverUrl,
                  }}
                  alt=""
                />
                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {memory.exerpt}
                </Text>
                <Link href={`/memories/{id}`} asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200">
                      Read more
                    </Text>
                    <Icon name="arrow-right" size={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
