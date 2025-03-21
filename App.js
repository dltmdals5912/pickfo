import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// 홈 화면: "Pick for me"라는 큰 텍스트와 3가지 카테고리 버튼을 보여줍니다.
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick for me</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('어디가지?')}
      >
        <Text style={styles.buttonText}>어디가지?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('뭐먹지?')}
      >
        <Text style={styles.buttonText}>뭐먹지?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('뭐하지?')}
      >
        <Text style={styles.buttonText}>뭐하지?</Text>
      </TouchableOpacity>
    </View>
  );
}

// "어디가지?" 카테고리 화면
function WhereScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>어디가지?</Text>
    </View>
  );
}

// "뭐먹지?" 카테고리 화면
function FoodScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>뭐먹지?</Text>
    </View>
  );
}

// "뭐하지?" 카테고리 화면
function ActivityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>뭐하지?</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="어디가지?" component={WhereScreen} />
        <Stack.Screen name="뭐먹지?" component={FoodScreen} />
        <Stack.Screen name="뭐하지?" component={ActivityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',  // 검은 배경
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,             // 큰 텍스트 크기
    color: '#FFF',            // 흰색 텍스트
    marginBottom: 40,         // 텍스트 아래 여백
  },
  categoryTitle: {
    fontSize: 28,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#444',  // 버튼 배경은 약간 어두운 회색
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
  },
});
