import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const WORD_HEIGHT = 60; // 각 단어의 높이 (픽셀 단위)

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick for me</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('어디가지?')}>
        <Text style={styles.buttonText}>어디가지?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('뭐먹지?')}>
        <Text style={styles.buttonText}>뭐먹지?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('뭐하지?')}>
        <Text style={styles.buttonText}>뭐하지?</Text>
      </TouchableOpacity>
    </View>
  );
}

function VerticalSlotMachinePicker({ category, options }) {
  // 옵션들을 여러 번 반복하여 순환 효과를 줍니다.
  const repetitions = 10;
  const repeatedOptions = [];
  for (let i = 0; i < repetitions; i++) {
    repeatedOptions.push(...options);
  }
  
  const [selectedOption, setSelectedOption] = useState(null);
  const translateY = useRef(new Animated.Value(0)).current;
  
  const pickRandom = () => {
    translateY.setValue(0);
    const minIndex = options.length * 5;
    const maxIndex = repeatedOptions.length - 1;
    const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
    const finalOffset = randomIndex * WORD_HEIGHT;
    
    Animated.timing(translateY, {
      toValue: finalOffset,
      duration: 4000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setSelectedOption(repeatedOptions[randomIndex]);
    });
  };

  useEffect(() => {
    pickRandom();
  }, []);

  return (
    <View style={styles.slotWrapper}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={[styles.slotContainer, { height: WORD_HEIGHT, overflow: 'hidden' }]}>
        <Animated.View style={{ transform: [{ translateY: Animated.multiply(translateY, -1) }] }}>
          {repeatedOptions.map((option, index) => (
            <View key={index} style={{ height: WORD_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.resultText}>{option}</Text>
            </View>
          ))}
        </Animated.View>
      </View>
      {selectedOption && (
        <Text style={styles.finalResult}>최종 선택: {selectedOption}</Text>
      )}
    </View>
  );
}

// CategoryScreenWrapper: 각 카테고리 화면 상단에 배경색 없는 왼쪽 화살표 아이콘(←)을 넣습니다.
function CategoryScreenWrapper({ navigation, category, options }) {
  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <VerticalSlotMachinePicker category={category} options={options} />
    </View>
  );
}

function WhereScreen({ navigation }) {
  return (
    <CategoryScreenWrapper
      navigation={navigation}
      category="어디가지?"
      options={["부산", "경주", "제주도", "일본", "서울"]}
    />
  );
}

function FoodScreen({ navigation }) {
  return (
    <CategoryScreenWrapper
      navigation={navigation}
      category="뭐먹지?"
      options={["제육볶음", "돈까스", "스시", "국밥", "라면"]}
    />
  );
}

function ActivityScreen({ navigation }) {
  return (
    <CategoryScreenWrapper
      navigation={navigation}
      category="뭐하지?"
      options={["피시방", "방탈출", "노래방", "당구장", "볼링장"]}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
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
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 40, // 위쪽 여백
  },
  title: {
    fontSize: 36,
    color: '#FFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#444',
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
  backArrowContainer: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#FFF',
  },
  slotWrapper: {
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 28,
    color: '#FFF',
    marginBottom: 20,
  },
  slotContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    backgroundColor: '#222',
  },
  resultText: {
    fontSize: 32,
    color: '#FFF',
  },
  finalResult: {
    fontSize: 24,
    color: '#0F0',
    marginTop: 20,
  },
});
