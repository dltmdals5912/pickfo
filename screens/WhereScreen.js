// screens/WhereScreen.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import VerticalSlotMachinePicker from '../components/VerticalSlotMachinePicker';

const FooterGif = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>[GIF Placeholder]</Text>
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
      <FooterGif />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE7C8',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  backArrowContainer: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#FFBEA3',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    color: '#FFF',
  },
});
