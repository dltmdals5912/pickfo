// Character.js
import React, { useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Character = ({ reaction }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.reset();
      animationRef.current.play();
    }
  }, [reaction]);

  // reaction prop이 있으면 해당 반응 애니메이션 파일, 없으면 기본 idle 애니메이션 사용
  const animationSource = reaction
    ? require('./assets/character_wave.json') // 예: 'wave' 반응 애니메이션
    : require('./assets/character_idle.json'); // 기본 idle 애니메이션

  return (
    <TouchableWithoutFeedback>
      <LottieView
        ref={animationRef}
        source={animationSource}
        autoPlay
        loop={!reaction} // 반응 애니메이션은 한 번만 재생 (반복하지 않음)
        style={styles.animation}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
});

export default Character;
