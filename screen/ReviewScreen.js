// ReviewScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Alert, TouchableOpacity } from 'react-native';

// 별 평가 컴포넌트
const StarRating = ({ rating, onRatingChange }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onRatingChange(star)}>
          <Text style={styles.star}>
            {star <= rating ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function ReviewScreen() {
  const [rating, setRating] = useState(0); // 평점은 숫자로 관리 (0이면 선택 안됨)
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleAddReview = () => {
    if (rating < 1 || rating > 5) {
      Alert.alert('오류', '평점은 1부터 5 사이여야 합니다.');
      return;
    }
    if (!review.trim()) {
      Alert.alert('오류', '리뷰 내용을 입력하세요.');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      rating,
      review,
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setReview('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>리뷰 및 평점</Text>
      
      {/* 평점 입력 영역: 별로 평가 */}
      <View style={styles.ratingSection}>
        <Text style={styles.label}>평점:</Text>
        <StarRating rating={rating} onRatingChange={setRating} />
      </View>

      {/* 리뷰 입력 영역 */}
      <TextInput
        style={styles.reviewInput}
        placeholder="리뷰를 입력하세요"
        placeholderTextColor="#888"
        multiline
        value={review}
        onChangeText={setReview}
      />
      
      <View style={styles.buttonContainer}>
        <Button title="리뷰 추가" onPress={handleAddReview} color="#444" />
      </View>

      {/* 리뷰 목록 */}
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewRating}>평점: {item.rating} / 5</Text>
            <Text style={styles.reviewText}>{item.review}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>아직 리뷰가 없습니다.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#000'
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    marginRight: 10,
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 32,
    color: '#FFD700', // 금색 별
    marginHorizontal: 5,
  },
  reviewInput: { 
    borderWidth: 1, 
    borderColor: '#444', 
    borderRadius: 4, 
    padding: 10, 
    height: 120, 
    marginBottom: 10,
    color: '#FFF',
  },
  buttonContainer: {
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  reviewItem: { 
    borderBottomWidth: 1, 
    borderBottomColor: '#444', 
    marginVertical: 10, 
    paddingBottom: 10 
  },
  reviewRating: { 
    fontWeight: 'bold', 
    fontSize: 16,
    color: '#FFF',
  },
  reviewText: {
    fontSize: 14,
    marginTop: 5,
    color: '#FFF',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});
