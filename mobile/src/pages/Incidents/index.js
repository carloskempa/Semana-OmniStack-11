import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import logoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import styles from "./styles";

export default function Incidents() {
  const navigation = useNavigation();
  const [incidests, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navegarDetalhes(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidests.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get(`incidents?page=${page}`);

    setIncidents([...incidests, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        data={incidests}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        //showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>
              <Feather name="home" size={14} style={styles.icon} /> ONG
            </Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>
              <Feather name="archive" size={14} style={styles.icon} /> CASO
            </Text>
            <Text style={styles.incidentValue}>{incident.title}}</Text>

            <Text style={styles.incidentProperty}>
              <Feather name="dollar-sign" size={14} style={styles.icon} /> VALOR
            </Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>

            <Text style={styles.incidentProperty}>
              <Feather name="map-pin" size={14} style={styles.icon} />{" "}
              LOCALIZAÇÃO
            </Text>

            <Text style={styles.incidentValue}>
              {incident.city}/{incident.uf}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navegarDetalhes(incident)}
            >
              <Text style={styles.detailButtonText}>Ver mais Detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
