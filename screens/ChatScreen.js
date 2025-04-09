// screens/ChatScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { OPENAI_API_KEY } from '@env';

export default function ChatScreen() {
  // 상태 변수: 메시지 배열, 사용자 입력, 로딩 상태
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // FlatList 자동 스크롤을 위한 참조
  const flatListRef = useRef(null);

  // 메시지 전송 및 API 호출 함수
  const sendMessage = async () => {
    if (!input.trim()) return;

    // 사용자가 입력한 메시지를 생성하고, 배열에 추가
    const userMessage = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // OpenAI API 호출을 위한 요청 본문 설정
      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "너는 선택대행 서비스를 하는 귀여운 포미. 사람들의 질문에 참고할 수 있는 링크나 이미지도 주면 좋겠어!",
          },
          { role: "user", content: userMessage.text }
        ],
        max_tokens: 200,
      };

      // OpenAI API에 POST 요청 보내기
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      // API 응답을 JSON으로 파싱
      const data = await response.json();

      // 응답 구조를 콘솔에 출력하여 디버깅 용도
      console.log('✅ OpenAI 응답:', JSON.stringify(data, null, 2));

      // 응답 파싱: chat 모델의 경우 message.content, 그 외 경우 text 필드 사용, 둘 모두 없으면 'No response'
      const botText =
        data?.choices?.[0]?.message?.content ||
        data?.choices?.[0]?.text ||
        'No response';

      // 챗봇 응답 메시지 객체 생성
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botText,
      };

      // 생성된 챗봇 메시지를 메시지 배열에 추가
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("❌ API 요청 에러:", error);
    } finally {
      setLoading(false);
    }
  };

  // 메시지 업데이트 시 FlatList 자동 스크롤(최신 메시지를 표시)
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // FlatList에서 각 메시지를 렌더링하는 함수
  const renderItem = ({ item }) => (
    <View style={[styles.messageBubble, item.sender === 'bot' ? styles.botBubble : styles.userBubble]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      {/* ------------------ 헤더 영역 (포미 GIF & 안내 텍스트) ------------------ */}
      <View style={styles.header}>
        <Image 
          source={require('../assets/forme.gif')} 
          style={styles.emoji}
        />
        <Text style={styles.headerText}>포미와 대화해봐!</Text>
      </View>

      {/* ------------------ 메시지 리스트 영역 ------------------ */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContainer}
      />

      {/* ------------------ 로딩 인디케이터 ------------------ */}
      {loading && <ActivityIndicator size="small" color="#FF8C66" style={{ marginBottom: 10 }} />}

      {/* ------------------ 입력창 영역 ------------------ */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="포미에게 뭐든 물어봐!"
          placeholderTextColor="#AAA"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE7C8', // 전체 배경: 따뜻한 크림톤
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  emoji: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 16,
    color: '#FF8C66',
    fontWeight: '500',
    marginTop: 5,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageListContainer: {
    paddingVertical: 10,
    paddingBottom: 30,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#FFBEA3',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#FFF5E9',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#333',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFEFE1',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#FFBEA3',
  },
  input: {
    flex: 1,
    color: '#333',
    backgroundColor: '#FFF',
    borderColor: '#FFBEA3',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FF8C66',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
