// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const FooterGif = () => {
  return (
    <View style={styles.footerContainer}>
      <Image 
        source={require('../assets/Animation - 1742568590134.gif')}
        style={styles.footerGif}
      />
    </View>
  );
};

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FooterGif />
      <Text style={styles.title}>Pick For Me</Text>
      
      {/* 챗 입력 영역 - 터치 시 챗봇 화면으로 이동 */}
      <TouchableOpacity style={styles.chatInputWrapper} onPress={() => navigation.navigate('챗봇')}>
        <Text style={styles.chatInputPlaceholder}>포미랑 같이 놀자..!</Text>
      </TouchableOpacity>
      
      {/* 카테고리 버튼 영역 */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('어디가지?')}>
          <Text style={styles.categoryButtonText}>어디가지?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('뭐먹지?')}>
          <Text style={styles.categoryButtonText}>뭐먹지?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('뭐하지?')}>
          <Text style={styles.categoryButtonText}>뭐하지?</Text>
        </TouchableOpacity>
      </View>
      
      {/* 리뷰 버튼 */}
      <TouchableOpacity style={styles.reviewButton} onPress={() => navigation.navigate('리뷰')}>
        <Text style={styles.reviewButtonText}>리뷰</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE7C8', // 부드러운 파스텔톤 배경
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 36,
    color: '#333', // 어두운 회색 (디자인 시안에 맞춤)
    fontWeight: 'bold',
    marginBottom: 30,
  },
  chatInputWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: '100%',
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  chatInputPlaceholder: {
    color: '#888',
    fontSize: 16,
  },
  categoryContainer: {
    width: '100%',
    alignItems: 'center',
  },
  categoryButton: {
    backgroundColor: '#FFA726', // 밝은 오렌지
    paddingVertical: 15,
    width: '70%', // 버튼 가로 길이 (원하는 크기로 조절 가능)
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
    backgroundColor: '#FF7043', // 약간 더 진한 오렌지/레드 톤
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  reviewButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerGif: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
