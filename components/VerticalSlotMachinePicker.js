// components/VerticalSlotMachinePicker.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

const WORD_HEIGHT = 60;

export default function VerticalSlotMachinePicker({ category, options }) {
  // options 배열을 여러 번 반복하여 긴 배열 생성
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
    
    console.log("pickRandom 실행됨, randomIndex:", randomIndex, "finalOffset:", finalOffset);
    
    Animated.timing(translateY, {
      toValue: finalOffset,
      duration: 4000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false, // 디버깅용으로 false로 설정. 테스트 후 true로 변경 가능.
    }).start(() => {
      setSelectedOption(repeatedOptions[randomIndex]);
      console.log("애니메이션 완료, 선택된 옵션:", repeatedOptions[randomIndex]);
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

const styles = StyleSheet.create({
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
