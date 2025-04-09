// components/VerticalSlotMachinePicker.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, TouchableOpacity, StyleSheet } from 'react-native';

const WORD_HEIGHT = 60;
const MAX_SPINS = 3;

export default function VerticalSlotMachinePicker({ category, options }) {
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

  const stopSpin = () => {
    if (!isSpinning) return;
    if (loopingAnimationRef.current) {
      loopingAnimationRef.current.stop();
    }

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
            <View key={index} style={styles.wordBox}>
              <Text style={styles.resultText}>{option}</Text>
            </View>
          ))}
        </Animated.View>
      </View>

      {selectedOption && (
        <Text style={styles.finalResult}>✨ 최종 선택: {selectedOption} ✨</Text>
      )}

      <View style={styles.controls}>
        {isSpinning ? (
          <TouchableOpacity style={styles.controlButton} onPress={stopSpin}>
            <Text style={styles.controlButtonText}>멈춰!</Text>
          </TouchableOpacity>
        ) : spinCount < MAX_SPINS ? (
          <TouchableOpacity style={styles.controlButton} onPress={startSpin}>
            <Text style={styles.controlButtonText}>
              {spinCount > 0 ? "다시 돌리기" : "Spin"}
            </Text>
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
    backgroundColor: '#FFF5E9',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 28,
    color: '#FF8C66',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  slotContainer: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#FFBEA3',
    borderRadius: 12,
    backgroundColor: '#FFF',
  },
  wordBox: {
    height: WORD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 28,
    color: '#FF7043',
    fontWeight: '600',
  },
  finalResult: {
    fontSize: 20,
    color: '#FF8C66',
    fontWeight: 'bold',
    marginTop: 20,
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#FFBEA3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  controlButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  spinInfo: {
    fontSize: 16,
    color: '#FF8C66',
    fontWeight: '500',
  },
});
