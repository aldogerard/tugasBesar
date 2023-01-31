import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import { Image, NativeBaseProvider, FlatList, StatusBar } from "native-base";

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async getNews() {
    try {
      const response = await fetch("https://api-berita-indonesia.vercel.app/suara/health");
      const json = await response.json();
      this.setState({ data: json.data.posts });
    } catch (error) {
      console.error(error);
    } finally {
      thi.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getNews();
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;

    return (
      <TouchableOpacity onPress={() => navigation.navigate("NewsDetail", { data: item })}>
        <View
          style={{
            padding: 15,
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            backgroundColor: "white",
            elevation: 3,
          }}
        >
          <Image alt="NEWS" source={{ uri: item.thumbnail }} style={{ backgroundColor: "grey", height: 100, width: 100, resizeMode: "cover", flex: 1.2, borderRadius: 8 }} />
          <Text style={{ textAlign: "left", fontWeight: "600", fontSize: 18, flex: 1.8, paddingLeft: 10, color: "#f4666f" }}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { data, isLoading } = this.state;
    return (
      <NativeBaseProvider>
        <StatusBar backgroundColor="#EBC96C" />
        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#EBC96C", padding: 16 }}>
          <Text style={{ fontSize: 26, fontWeight: "800", color: "#fff" }}>Berita</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ width: "100%", height: "100%", paddingHorizontal: 15, paddingTop: 10 }}>
            <FlatList width="100%" data={data} keyExtractor={({ link }, index) => link} renderItem={this.renderItem} />
          </View>
        </View>
      </NativeBaseProvider>
    );
  }
}
