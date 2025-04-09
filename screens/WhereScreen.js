import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import VerticalSlotMachinePicker from '../components/VerticalSlotMachinePicker';

const FooterGif = () => {
  return (
    <View style={styles.footerContainer}>
      <Image 
        source={require('../assets/forme.gif')}
        style={styles.footerGif}
      />
      <Text style={styles.footerText}>포미가 골라줄게!</Text>
    </View>
  );
};

export default function WhereScreen({ navigation }) {
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
          category="어디가지?"
          options={[
            "부산", "경주", "제주도", "일본", "서울",
            "강릉", "여수", "전주", "속초",
            "통영", "남해", "대만", "홍콩", "오사카", "도쿄",
            "삿포로", "싱가포르", "베트남", "태국", "필리핀",
            "하와이", "괌", "발리", "파리", "런던", "뉴욕",
            "LA", "밴쿠버", "스위스", "바르셀로나", "시드니",
            "마카오", "이탈리아", "포르투갈", "프라하", "암스테르담",
            "독일", "크로아티아", "보라카이", "몰디브"
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
    backgroundColor: '#FDE7C8', // 홈과 동일한 배경
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
    color: '#FF8C66', // 홈과 비슷한 피치색
    fontWeight: 'bold',
  },
  rouletteContainer: {
    backgroundColor: '#FFF5E9', // 룰렛 배경을 따로 줘서 시인성 ↑
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // 안드로이드 그림자
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
