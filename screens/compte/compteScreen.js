import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import Button from "../../components/Button";

export default function CompteScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mon Compte - Connexion user</Text>
      <Button style={styles.btnBack} 
              onPress={() => navigation.goBack()} 
              type="back" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },

  btnBack: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});