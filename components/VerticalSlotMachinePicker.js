// components/VerticalSlotMachinePicker.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, TouchableOpacity, StyleSheet } from 'react-native';

const WORD_HEIGHT = 60;
const MAX_SPINS = 3;

export default function VerticalSlotMachinePicker({ category, options }) {
  // 옵션 배열을 여러 번 반복해서 긴 배열 생성
  const repetitions = 10;
  const repeatedOptions = [];
  for (let i = 0; i < repetitions; i++) {
    repeatedOptions.push(...options);
  }
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const loopingAnimationRef = useRef(null);
  
  // 초기 자동 감속 효과 (컴포넌트 마운트 시 실행)
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
  
  // 컴포넌트 마운트 시 자동 감속 효과 실행 (초기 룰렛)
  useEffect(() => {
    pickRandom();
  }, []);
  
  // Spin 버튼: 무한 루프 애니메이션으로 계속 회전
  const startSpin = () => {
    if (isSpinning || spinCount >= MAX_SPINS) return;
    setIsSpinning(true);
    setSpinCount(prev => prev + 1);
    setSelectedOption(null);
    translateY.setValue(0);
    
    loopingAnimationRef.current = Animated.loop(
      Animated.timing(translateY, {
        toValue: repeatedOptions.length * WORD_HEIGHT,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loopingAnimationRef.current.start();
  };

  // Stop 버튼: 현재 무한 루프 애니메이션을 중단하고 pickRandom과 동일한 감속 효과(4000ms)를 적용
  const stopSpin = () => {
    if (!isSpinning) return;
    if (loopingAnimationRef.current) {
      loopingAnimationRef.current.stop();
    }
    // 여기서 pickRandom()과 동일한 방식으로 감속 효과를 적용합니다.
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
      setIsSpinning(false);
    });
  };

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
      <View style={styles.controls}>
        {isSpinning ? (
          <TouchableOpacity style={styles.controlButton} onPress={stopSpin}>
            <Text style={styles.controlButtonText}>Stop</Text>
          </TouchableOpacity>
        ) : spinCount < MAX_SPINS ? (
          <TouchableOpacity style={styles.controlButton} onPress={startSpin}>
            <Text style={styles.controlButtonText}>{spinCount > 0 ? "다시 돌리기" : "Spin"}</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.spinInfo}>남은 스핀 횟수: {MAX_SPINS - spinCount}</Text>
      </View>
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
  controls: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  controlButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
  spinInfo: {
    fontSize: 16,
    color: '#FFF',
  },
});
