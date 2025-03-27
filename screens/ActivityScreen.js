// screens/ActivityScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import VerticalSlotMachinePicker from '../components/VerticalSlotMachinePicker';

const FooterGif = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>[GIF Placeholder]</Text>
    </View>
  );
};

export default function ActivityScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <VerticalSlotMachinePicker
        category="뭐하지?"
        options={[
          "놀이공원", "수족관", "방탈출카페", "VR체험관", "보드게임카페",
          "볼링장", "실내암벽장", "피크닉", "캠핑", "해수욕장", "서핑",
          "카페투어", "시장투어", "자전거 타기", "등산", "루지", "짚라인",
          "스노클링", "낚시", "온천", "호캉스", "스키", "스노보드", "아쿠아리움",
          "클라이밍", "쇼핑", "영화관람", "드라이브", "맛집투어", "뮤지컬 관람",
          "페스티벌 방문", "박물관 관람", "전시회 관람", "야시장 방문", "레일바이크",
          "양궁카페", "수상레저", "보트 타기", "유람선 탑승", "동물원 방문"
        ]}
      />
      <FooterGif />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    color: '#FFF',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    color: '#FFF',
  },
});
