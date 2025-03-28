// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const FooterGif = () => {
  return (
    <View style={styles.footerContainer}>
      <Image source={require('../assets/Animation - 1742568590134.gif')} style={styles.footerGif} />
    </View>
  );
};

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FooterGif />
      <Text style={styles.title}>Pick for me</Text>
      
      {/* 챗 입력 영역 - 터치 시 ChatScreen으로 이동 */}
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
      
      {/* 리뷰 버튼 추가 */}
      <TouchableOpacity style={styles.reviewButton} onPress={() => navigation.navigate('리뷰')}>
        <Text style={styles.reviewButtonText}>리뷰</Text>
      </TouchableOpacity>
    </View>
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
  title: {
    fontSize: 36,
    color: '#FFF',
    marginBottom: 20,
  },
  chatInputWrapper: {
    backgroundColor: '#222',
    borderRadius: 8,
    width: '100%',
    padding: 15,
    marginBottom: 20,
  },
  chatInputPlaceholder: {
    color: '#888',
    fontSize: 16,
  },
  categoryContainer: {
    width: '100%',
  },
  categoryButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  categoryButtonText: {
    fontSize: 20,
    color: '#FFF',
  },
  reviewButton: {
    backgroundColor: '#555',
    paddingVertical: 10,
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
