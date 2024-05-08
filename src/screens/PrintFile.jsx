import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useState } from "react";
import {PdfCode} from "../components/PdfCode"

const PrintFile = ({ route }) => {
  const [selectedPrinter, setSelectedPrinter] = useState();
  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url,
    });
  };

  const printToFile = async () => {
    let html = PdfCode(
      item.name,
      item.address,
      item.phoneNumber,
      item.quantity,
      item.invoice,
      item.product,
      item.totalAmmount,
      item.receiveAmmount,
      item.paymentType,
      item.remainingBalance
    );
    try {
      const { uri } = await Print.printToFileAsync({
        html,
      });
      console.log("File has been saved to:", uri);
      await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });

      set_Name("");
      setInvoice(dateFormat(now, "ddmmyyhhMss"));
      setTotal("");
      setQuantity("");
      SetReceivedBalance("");
      Set_Address("");
      Set_Mobile_No("");
    } catch (err) {
      Alert.alert(
        "Make shure You have Internet Connection or contact @+91 8530730017"
      );
    }
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };
  const { item } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "#1E1C26" }}>
      <ScrollView>
        <View style={styles.Container}>
          <Text style={styles.Label}>Full Name:</Text>
          <Text style={styles.Label}>{item.name}</Text>
        </View>
        <View style={styles.Container}>
          <Text style={styles.Label}>Address:</Text>
          <Text style={styles.Label}>{item.address}</Text>
        </View>
        <View style={styles.Container}>
          <Text style={styles.Label}>Phone No:</Text>
          <Text style={styles.Label}>{item.phoneNumber}</Text>
        </View>
        <View style={styles.Container}>
          <Text style={styles.Label}>Invoice No:</Text>
          <Text style={styles.Label}>{item.invoice}</Text>
        </View>
        <View style={styles.Container}>
          <Text style={styles.Label}>Invoice No:</Text>
          <Text style={styles.Label}>{item.product}</Text>
        </View>
        <View style={styles.Container}>
          <Text style={styles.Label}>Quantity:</Text>
          <Text style={styles.Label}>{item.quantity}</Text>
        </View>
        <View style={styles.Container}>
          <Text style={styles.Label}>Payment Type:</Text>
          <Text style={styles.Label}>{item.paymentType}</Text>
        </View>
        <View style={styles.Container}>
          <Text style={styles.Label}>Total Ammount:</Text>
          <Text style={styles.Label}>{item.totalAmmount}</Text>
        </View>
        <View style={styles.Container}>
          <Text style={styles.Label}>Receive Ammount:</Text>
          <Text style={styles.Label}>{item.receiveAmmount}</Text>
        </View>
        <View style={styles.Container}>
          <Text style={styles.Label}>Remaining Balance:</Text>
          <Text style={styles.Label}>{item.remainingBalance}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={printToFile}
        style={styles.buttonContainer}
      >
        <Text style={styles.ButtonText}>Quick Print</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#26232f",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
  },
  Label: {
    fontSize: 16,
    color: "#fff",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1D36F",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 15,
  },
  ButtonText: {
    color: "#313131",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default PrintFile;
