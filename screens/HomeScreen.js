// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

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
      {/* 카테고리 버튼과는 별도로 작게 리뷰 링크 추가 */}
      <TouchableOpacity style={styles.reviewLink} onPress={() => navigation.navigate('리뷰')}>
        <Text style={styles.reviewLinkText}>리뷰</Text>
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
  reviewLink: {
    marginTop: 10,
    paddingVertical: 5,
  },
  reviewLinkText: {
    fontSize: 14,
    color: '#AAA',
    textDecorationLine: 'underline',
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
