// screens/HomeScreen.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  // [1] 타이틀 이미지에 적용할 애니메이션 값 설정 (opacity: 0 → 1)
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // [2] 컴포넌트 마운트 시 애니메이션 실행
    Animated.timing(titleOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* ------------------ 1. 포미 챗봇 이동 영역 ------------------ */}
      <TouchableOpacity
        style={styles.gifWrapper}
        onPress={() => navigation.navigate('챗봇')}
      >
        <Image
          source={require('../assets/forme.gif')}
          style={styles.footerGif}
        />
        <Text style={styles.chatLabel}>포미의 볼을 눌러봐!</Text>
      </TouchableOpacity>

      {/* ------------------ 2. 타이틀 GIF (애니메이션 등장) ------------------ */}
      <Animated.Image
        source={require('../assets/pickforme.title.gif')}
        style={[styles.titleImage, { opacity: titleOpacity }]}
      />

      {/* ------------------ 3. 카테고리 버튼 (장소/음식/활동) ------------------ */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => navigation.navigate('어디가지?')}
        >
          <Text style={styles.categoryButtonText}>어디가지?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => navigation.navigate('뭐먹지?')}
        >
          <Text style={styles.categoryButtonText}>뭐먹지?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => navigation.navigate('뭐하지?')}
        >
          <Text style={styles.categoryButtonText}>뭐하지?</Text>
        </TouchableOpacity>
      </View>

      {/* ------------------ 4. 리뷰 버튼 ------------------ */}
      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() => navigation.navigate('리뷰')}
      >
        <Text style={styles.reviewButtonText}>리뷰</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE7C8', // 따뜻한 배경톤
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  gifWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerGif: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
  },
  chatLabel: {
    marginTop: -40,
    marginBottom: -10, // ⬅️ 타이틀과 간격 줄이기
    fontSize: 14,
    color: '#FF8C66',
    fontWeight: '400',
  },
  titleImage: {
    width: 450,
    height: 180,
    resizeMode: 'contain',
    marginTop: -40,     // ⬅️ 위 요소와 더 밀착
    marginBottom: -20,
  },
  categoryContainer: {
    width: '100%',
    alignItems: 'center',
  },
  categoryButton: {
    backgroundColor: '#FFBEA3',
    paddingVertical: 15,
    width: '70%',
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  categoryButtonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  reviewButton: {
    backgroundColor: '#FF7043',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  reviewButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
});
