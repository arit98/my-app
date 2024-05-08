import { AntDesign } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AddInvoice from "../screens/AddInvoice";
import { firebase } from "../utils/config";
import { useNavigation } from "@react-navigation/native";

const PostScreen = () => {
  const navigation = useNavigation();
  const BottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const [data, setData] = useState([]);
  const dataListRef = firebase.firestore().collection("dataList");

  // callback
  const handlePresentModalPress = useCallback(() => {
    BottomSheetRef.current?.present();
  }, []);

  const handleSheetChange = useCallback((index) => {
    console.log(index);
  }, []);

  useEffect(() => {
    dataListRef.onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const {
          name,
          product,
          quantity,
          totalAmmount,
          paymentType,
          invoice,
          date,
          address,
          phoneNumber,
          receiveAmmount,
          remainingBalance
        } = doc.data();
        data.push({
          id: doc.id,
          name,
          product,
          quantity,
          totalAmmount,
          paymentType,
          invoice,
          date,
          address,
          phoneNumber,
          receiveAmmount,
          remainingBalance,
        });
      });
      setData(data);
    });
  }, []);

  return (
    <View style={{ backgroundColor: "#1E1C26", height: "100%" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          paddingHorizontal: 30,
          paddingTop: 30,
          justifyContent: "space-between",
        }}
      >
        <View style={{ display: "flex", justifyContent: "center" }}>
          <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>
            Invoices
          </Text>
          <Text style={{ fontSize: 15, color: "#fff" }}>
            {data.length > 1
              ? `There are total ${data.length} invoices`
              : data.length == 1
              ? `There are total ${data.length} invoice`
              : `There are total 0 invoice`}
          </Text>
        </View>
        {/* invoice button */}
      </View>
      {/* body */}
      <ScrollView showsVerticalScrollIndicator={true}>
        {data &&
          data.map((item) => (
            <View
              key={item?.id}
              style={{ width: "auto", marginTop: 60, gap: 10 }}
            >
              <Pressable
                onPress={() => navigation.navigate("PrintFile", { item: item })}
                style={styles.cardBg}
              >
                <View style={styles.card}>
                  <Text
                    style={{ fontSize: 17, color: "#fff", fontWeight: "bold" }}
                  >
                    {item.paymentType}
                  </Text>
                  <Text
                    style={{ fontSize: 17, color: "#fff", fontWeight: "bold" }}
                  >
                    ₹ {item.totalAmmount}
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.invoiceText}>{item.name}</Text>
                  <Text style={styles.invoiceText}>{item.quantity}</Text>
                </View>
                <View style={styles.card}>
                  <Text style={[styles.invoiceText, { color: "#2EBC8C" }]}>
                    Issued
                  </Text>
                  <Text style={styles.invoiceText}>{item.date}</Text>
                </View>
              </Pressable>
            </View>
          ))}
        <View style={{ height: 150 }} />
      </ScrollView>
      {/* modal */}
      <View
        style={{
          position: "absolute",
          top: 30,
          right: 20,
          overflow: "hidden",
          elevation: 10,
        }}
      >
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={styles.buttonStyle}
        >
          <AntDesign name="pluscircle" size={24} />
          <Text style={{ fontSize: 15, fontWeight: "600" }}>New Invoices</Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={BottomSheetRef}
          enableContentPanningGesture={false}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
        >
          <BottomSheetView style={styles.contentContainer}>
            <AddInvoice />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "white",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "100%",
  },
  buttonStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1D36F",
    padding: 5,
    borderRadius: 15,
    gap: 3,
    elevation: 50,
  },
  invoiceText: {
    fontSize: 16,
    color: "#fff",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 20,
  },
  cardBg: {
    backgroundColor: "#26232f",
    display: "flex",
    flexDirection: "column",
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 10,
    marginTop: -30,
  },
});

export default PostScreen;
