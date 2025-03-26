// screens/WhereScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const VerticalSlotMachinePicker = ({ category, options }) => {
  // 여기서는 단순화하여 옵션들을 나열
  return (
    <View style={styles.slotWrapper}>
      <Text style={styles.categoryTitle}>{category}</Text>
      {options.map((option, index) => (
        <Text key={index} style={styles.resultText}>{option}</Text>
      ))}
    </View>
  );
};

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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrowContainer}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <VerticalSlotMachinePicker
        category="어디가지?"
        options={["부산", "경주", "제주도", "일본", "서울"]}
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
  slotWrapper: {
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 28,
    color: '#FFF',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 32,
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
