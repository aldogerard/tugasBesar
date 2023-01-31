import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const CustomInput = ({ max, isTextArea = false, isDate, edit = true, secureTextEntry, onPress, placeholder, value, label, namaState, icon, onChangeText, eye }) => {
  return isDate ? (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <Ionicons name={icon} size={26} color="#f4666f" style={styles.icon} />
        <TextInput editable={edit} placeholder={placeholder} placeholderTextColor="#bbb" onChangeText={(text) => onChangeText(namaState, text)} value={value} style={styles.input} secureTextEntry={secureTextEntry} />
        <TouchableOpacity onPress={() => onPress(label)} style={styles.iconCon}>
          <Ionicons name={eye} color="#f4666f" size={26} style={[styles.icon, styles.icon2]} />
        </TouchableOpacity>
      </View>
    </View>
  ) : !isTextArea ? (
    eye ? (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.container}>
          <Ionicons name={icon} size={26} color="#f4666f" style={styles.icon} />
          <TextInput maxLength={max} editable={edit} placeholder={placeholder} placeholderTextColor="#bbb" onChangeText={(text) => onChangeText(namaState, text)} value={value} style={styles.input} secureTextEntry={secureTextEntry} />
          <TouchableOpacity onPress={() => onPress()} style={styles.iconCon}>
            <Ionicons name={eye} color="#f4666f" secureTextEntry={secureTextEntry} size={26} style={[styles.icon, styles.icon2]} />
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.container}>
          <Ionicons name={icon} size={26} color="#f4666f" style={styles.icon} />
          <TextInput maxLength={max} editable={edit} placeholder={placeholder} placeholderTextColor="#bbb" onChangeText={(text) => onChangeText(namaState, text)} value={value} style={styles.input} secureTextEntry={secureTextEntry} />
          <TouchableOpacity style={styles.iconCon}>
            <Ionicons name={eye} color="#f4666f" secureTextEntry={secureTextEntry} size={26} style={[styles.icon, styles.icon2]} />
          </TouchableOpacity>
        </View>
      </View>
    )
  ) : (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <Ionicons name={icon} size={26} color="#f4666f" style={[styles.icon, styles.iconArea]} />
        <TextInput
          multiline={true}
          numberOfLines={3}
          editable={edit}
          placeholder={placeholder}
          placeholderTextColor="#bbb"
          onChangeText={(text) => onChangeText(namaState, text)}
          value={value}
          style={[styles.input, styles.inputArea]}
          secureTextEntry={secureTextEntry}
          maxLength={max}
        />
        <TouchableOpacity style={styles.iconCon}>
          <Ionicons name={eye} color="#f4666f" secureTextEntry={secureTextEntry} size={26} style={[styles.icon, styles.icon2]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginVertical: 8,
  },
  label: {
    color: "#f4666f",
    marginBottom: 5,
    fontWeight: "300",
    fontSize: 16,
    textTransform: "capitalize",
  },
  container: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 6,
    elevation: 3,
    paddingVertical: 12,
  },
  icon: {
    flex: 0.5,
    textAlign: "center",
  },
  input: {
    flex: 3,
    color: "#252525",
    fontSize: 15,
    paddingHorizontal: 5,
    fontWeight: "600",
  },
  inputArea: {
    textAlignVertical: "top",
  },
  iconArea: {},
  iconCon: {
    flex: 0.6,
    height: 37.5,
    alignItems: "center",
    justifyContent: "center",
  },
  icon2: {
    flex: 0.6,
    textAlign: "center",
  },
});
