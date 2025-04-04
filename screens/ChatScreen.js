// screens/ChatScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { OPENAI_API_KEY } from '@env';  // .env 파일에서 API 키 불러오기

export default function ChatScreen() {
  const [messages, setMessages] = useState([]); // 대화 내역 배열
  const [input, setInput] = useState('');         // 사용자 입력 메시지
  const [loading, setLoading] = useState(false);    // API 호출 중 상태

  const sendMessage = async () => {
    if (!input.trim()) return; // 빈 메시지 방지

    // 사용자 메시지를 대화 목록에 추가
    const userMessage = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // API 요청 전, 요청 파라미터 로그 출력
      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "너는 선택대행 서비스를 하는 귀여운 포미. 사람들의 질문에 참고할 수 있는 링크나 이미지도 주면 좋겠어!." },
          { role: "user", content: userMessage.text }
        ],
        max_tokens: 200,
      };
      console.log("API 요청 파라미터:", requestBody);

      // OpenAI API에 요청 보내기
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`, // 실제 API 키가 @env에서 불러와짐
        },
        body: JSON.stringify(requestBody),
      });
      
      const data = await response.json();
      console.log("API 응답 데이터:", data); // 응답 전체를 출력하여 데이터 구조 확인

      // 응답에서 챗봇 응답 추출
      const botText = data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content 
                      ? data.choices[0].message.content 
                      : 'No response';
      const botMessage = { id: (Date.now() + 1).toString(), sender: 'bot', text: botText };

      // 대화 목록에 챗봇 메시지 추가
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("API 요청 에러:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContainer}
      />
      {loading && <ActivityIndicator size="small" color="#FFF" />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="메시지를 입력하세요"
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
    backgroundColor: '#000',
  },
  messageList: {
    flex: 1,
  },
  messageListContainer: {
    padding: 10,
    paddingTop: 50,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#444',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#222',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#FFF',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#111',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#FFF',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#444',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
