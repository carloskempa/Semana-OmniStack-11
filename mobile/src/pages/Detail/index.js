import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Image, TouchableOpacity, Text, Linking } from "react-native";
import * as MailComposer from "expo-mail-composer";
import styles from "./styles";
import logoImg from "../../assets/logo.png";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;

  const message = `Olá ${
    incident.name
  }, estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de ${Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value)} reias`;

  function navegarIncidents() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do Caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatpApp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navegarIncidents}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>
          <Feather name="home" size={14} color="#e82041" /> ONG
        </Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>

        <Text style={styles.incidentProperty}>
          <Feather name="archive" size={14} color="#e82041" /> CASO
        </Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>
          <Feather name="edit-3" size={14} color="#e82041" /> DESCRIÇÂO
        </Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>
          <Feather name="map-pin" size={14} color="#e82041" /> LOCALIZAÇÃO
        </Text>
        <Text style={styles.incidentValue}>
          {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>
          <Feather name="dollar-sign" size={14} color="#e82041" /> VALOR
        </Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDecription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={sendWhatpApp} style={styles.action}>
            <Feather
              name="message-square"
              size={20}
              style={styles.icon}
              color="#fff"
            />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={sendMail} style={styles.action}>
            <Feather name="mail" size={20} style={styles.icon} color="#fff" />
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
