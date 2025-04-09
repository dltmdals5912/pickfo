// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* GIF를 누르면 챗봇 화면으로 이동 */}
      <TouchableOpacity style={styles.gifWrapper} onPress={() => navigation.navigate('챗봇')}>
        <Image 
          source={require('../assets/forme.gif')}
          style={styles.footerGif}
        />
        <Text style={styles.chatLabel}>포미의 볼을 눌러봐!</Text>
      </TouchableOpacity>

      {/* 텍스트 대신 이미지로 대체한 제목 */}
      <Image
        source={require('../assets/pickforme.title.png')}
        style={styles.titleImage}
      />

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
  gifWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerGif: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  chatLabel: {
    marginTop: -40,         // GIF와 텍스트 간 간격 줄임
    fontSize: 14,
    color: '#FF8C66',
    fontWeight: '300',
  },
  titleImage: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
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
