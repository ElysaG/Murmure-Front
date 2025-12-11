import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList, //liste performante
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { io } from "socket.io-client";
import * as Haptics from "expo-haptics";
// import { router } from "expo-router";

import Button from "../../components/Button";

import { BACKEND_ADDRESS } from "../../config";

export default function ChatScreen({ route, navigation }) {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // { sender: "me"|"ai", text: "..." }
  const [loading, setLoading] = useState(false);

  // Connexion au serveur Socket.IO
  useEffect(() => {
    const newSocket = io(BACKEND_ADDRESS, {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    // Quand le serveur envoie la réponse de l'IA
    newSocket.on("ai-message", (msg) => {
      setLoading(false);

      // vibration légère à la réception
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      setMessages((prev) => [...prev, { sender: "ai", text: msg }]);
    });

    return () => newSocket.disconnect();
  }, []);

  // Envoyer un message
  const handleSend = () => {
    if (!message.trim() || !socket) return;

    const text = message.trim();

    // Ajouter ton propre message dans la liste
    setMessages((prev) => [...prev, { sender: "me", text }]);

    setMessage("");
    setLoading(true);
    // Envoyer le message au backend
    socket.emit("user-message", text);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "me" ? styles.meBubble : styles.aiBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.outerContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Cadre */}
        <View style={styles.card}>
          <Text style={styles.title}>Chat Murmure</Text>

          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(_, index) => index.toString()}
            style={styles.messagesList}
          />
          {/* Loading */}
          {loading && (
            <ActivityIndicator
              size="large"
              color="#b59df0"
              style={{ marginBottom: 10 }}
            />
          )}

          {/* Input + bouton envoyer */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Exprime-toi..."
              placeholderTextColor="#8c8c8c"
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Bouton retour */}
        <View style={{ marginTop: 20 }}>
          <Button
            type="back"
            style={{ marginTop: 20 }}
            // onPress={() => router.back()} //modale
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F3ED",
  },

  outerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E6E0D8",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 14,
    color: "#5A4E4D",
  },

  messagesList: {
    flex: 1,
    marginBottom: 10,
  },

  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },

  meBubble: {
    backgroundColor: "#DDE7FF",
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: "#F4F0FF",
    alignSelf: "flex-start",
  },

  messageText: {
    fontSize: 16,
    color: "#4A4A4A",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  input: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDD",
    color: "#333",
  },

  sendButton: {
    backgroundColor: "#b59df0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 8,
  },

  sendText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
