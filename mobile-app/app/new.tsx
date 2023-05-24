import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import NlwLogo from '../src/assets/nlw-logo.svg'
import Icon from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'

export default function NewMemory() {
  // vars bottom and top are the distance from the status bar and notch, from any phone
  const { bottom, top } = useSafeAreaInsets()
  const [isPublic, setIsPublic] = useState(false)
  const toggleSwitch = () => {
    setIsPublic((previousState) => !previousState)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        className="flex-1 px-8"
        contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
        // style={{ paddingBottom: bottom, paddingTop: top }} --> if component was a <View/>
      >
        <View className="mt-4 flex-row items-center justify-between">
          <NlwLogo />
          {/* asChild prop makes the child behave as the parent (TouchOp as Link) */}
          <Link href="/memories" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
              <Icon name="arrow-left" size={16} color="#fff" />
            </TouchableOpacity>
          </Link>
        </View>
        <View className="mt-6 space-y-6">
          <View className="flex-row items-center gap-2">
            <Switch
              value={isPublic}
              onValueChange={toggleSwitch}
              trackColor={{ false: '#fff', true: '#372560' }}
              thumbColor={isPublic ? '#9b79ea' : '#bebebf'}
            />
            <Text className="font-body text-base text-gray-200">
              Make it public
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="h-32 justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
          >
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#fff" />
              <Text className="font-body text-gray-200">
                Add picture or video as cover
              </Text>
            </View>
          </TouchableOpacity>

          <TextInput
            multiline
            className="p-0 font-body text-lg text-gray-50"
            placeholderTextColor="#56565a"
            placeholder="Add pictures, videos or write a few words about this memory you would like to remember..."
          />

          <TouchableOpacity
            activeOpacity={0.7}
            className="mb-10 items-center self-end rounded-full bg-green-500 px-5 py-2"
            onPress={() => {}}
          >
            <Text className="font-alt text-sm uppercase text-black">Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
