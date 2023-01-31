import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";

const CustomListHistory = ({ id, item, user, onPress }) => {
  const status = item.status === "pending" ? "pending" : item.status === "berhasil" ? "berhasil" : item.status === "selesai" ? "selesai" : "ditolak";
  // console.log(item.id);
  return user === "admin" ? (
    status === "pending" ? (
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>{item.namaRS}</Text>
            <View style={styles.status}>
              <Text style={[styles.textStatus, styles[`textStatus${status}`]]}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.leftContent}>
              <View style={styles.name}>
                <Ionicons name="person" size={17} color="#f4666f" />
                <Text style={styles.textName}>{item.namaPasien}</Text>
              </View>
              <View style={styles.date}>
                <Ionicons name="calendar" size={17} color="#f4666f" />
                <Text style={styles.textDate}>{item.tanggal}</Text>
              </View>
              <View style={styles.date}>
                <Ionicons name="time" size={17} color="#f4666f" />
                <Text style={styles.textDate}>{item.waktu}</Text>
              </View>
            </View>
            <View style={styles.rightContent}>
              <TouchableOpacity onPress={() => onPress(item.id, "berhasil")}>
                <Ionicons name="checkbox" size={24} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPress(item.id, "ditolak")}>
                <Entypo name="squared-cross" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ) : status === "berhasil" ? (
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>{item.namaRS}</Text>
            <View style={styles.status}>
              <Text style={[styles.textStatus, styles[`textStatus${status}`]]}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.leftContent}>
              <View style={styles.name}>
                <Ionicons name="person" size={17} color="#f4666f" />
                <Text style={styles.textName}>{item.namaPasien}</Text>
              </View>
              <View style={styles.date}>
                <Ionicons name="calendar" size={17} color="#f4666f" />
                <Text style={styles.textDate}>{item.tanggal}</Text>
              </View>
              <View style={styles.date}>
                <Ionicons name="time" size={17} color="#f4666f" />
                <Text style={styles.textDate}>{item.waktu}</Text>
              </View>
            </View>
            <View style={styles.rightContent}>
              <TouchableOpacity onPress={() => onPress(item.id, "selesai")}>
                <Ionicons name="checkbox" size={24} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>{item.namaRS}</Text>
            <View style={styles.status}>
              <Text style={[styles.textStatus, styles[`textStatus${status}`]]}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.content2}>
            <View style={styles.name}>
              <Ionicons name="person" size={17} color="#f4666f" />
              <Text style={styles.textName}>{item.namaPasien}</Text>
            </View>
            <View style={styles.date}>
              <Ionicons name="calendar" size={17} color="#f4666f" />
              <Text style={styles.textDate}>{item.tanggal}</Text>
            </View>
            <View style={styles.date}>
              <Ionicons name="time" size={17} color="#f4666f" />
              <Text style={styles.textDate}>{item.waktu}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  ) : status === "ditolak" ? (
    <TouchableOpacity onPress={() => Alert.alert("Silahkan Registrasi Ulang")}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>{item.namaRS}</Text>
          <View style={styles.status}>
            <Text style={[styles.textStatus, styles[`textStatus${status}`]]}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.content2}>
          <View style={styles.name}>
            <Ionicons name="person" size={17} color="#f4666f" />
            <Text style={styles.textName}>{item.namaPasien}</Text>
          </View>
          <View style={styles.date}>
            <Ionicons name="calendar" size={17} color="#f4666f" />
            <Text style={styles.textDate}>{item.tanggal}</Text>
          </View>
          <View style={styles.date}>
            <Ionicons name="time" size={17} color="#f4666f" />
            <Text style={styles.textDate}>{item.waktu}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>{item.namaRS}</Text>
          <View style={styles.status}>
            <Text style={[styles.textStatus, styles[`textStatus${status}`]]}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.content2}>
          <View style={styles.name}>
            <Ionicons name="person" size={17} color="#f4666f" />
            <Text style={styles.textName}>{item.namaPasien}</Text>
          </View>
          <View style={styles.date}>
            <Ionicons name="calendar" size={17} color="#f4666f" />
            <Text style={styles.textDate}>{item.tanggal}</Text>
          </View>
          <View style={styles.date}>
            <Ionicons name="time" size={17} color="#f4666f" />
            <Text style={styles.textDate}>{item.waktu}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    elevation: 5,
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 0.9,
    alignItems: "center",
  },
  textHeader: {
    flex: 1,
    fontSize: 16.7,
    fontWeight: "700",
  },
  status: {
    flex: 0.3,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 24,
  },
  textStatusberhasil: {
    backgroundColor: "#B785B8",
  },
  textStatusselesai: {
    backgroundColor: "#80ff88",
  },
  textStatusditolak: {
    backgroundColor: "crimson",
  },
  textStatus: {
    textTransform: "capitalize",
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
    backgroundColor: "#eb7070",
    padding: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  content: {
    flexDirection: "row",
  },
  content2: {
    flexDirection: "column",
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    flex: 0.15,
    paddingVertical: 4,
    justifyContent: "space-evenly",
  },
  name: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  textName: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#511f52",
  },
  date: {
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  dateTitle: {
    fontSize: 10,
    fontWeight: "300",
    marginRight: 20,
  },
  textDate: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#511f52",
  },
});

export default CustomListHistory;
