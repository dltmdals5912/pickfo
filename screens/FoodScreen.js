// screens/FoodScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import VerticalSlotMachinePicker from '../components/VerticalSlotMachinePicker';

const FooterGif = () => {
  return (
    <View style={styles.footerContainer}>
      <Image 
        source={require('../assets/forme.gif')} // 실제 이미지로 교체
        style={styles.footerGif}
      />
      <Text style={styles.footerText}>포미가 골라줄게!</Text>
    </View>
  );
};

export default function FoodScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backArrowContainer}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <View style={styles.rouletteContainer}>
        <VerticalSlotMachinePicker
          category="뭐먹지?"
          options={[
            "제육볶음", "돈까스", "스시", "국밥", "라면",
            "김치찌개", "치킨", "마라탕", "편의점", "샌드위치",
            "카레", "부리또", "쌀국수", "중식"
          ]}
        />
      </View>

      <FooterGif />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE7C8', // 홈과 동일한 부드러운 파스텔톤
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  backArrowContainer: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 10,
  },
  backArrow: {
    fontSize: 28,
    color: '#FF8C66',
    fontWeight: 'bold',
  },
  rouletteContainer: {
    backgroundColor: '#FFF5E9',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerGif: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  footerText: {
    marginTop: 5,
    fontSize: 14,
    color: '#FF8C66',
    fontWeight: '500',
  },
});
