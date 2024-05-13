import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import dateFormat, { masks } from "dateformat";
import { firebase } from "../utils/config";
import { LinearGradient } from "expo-linear-gradient";

const AddInvoice = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [product, setProduct] = useState("Demo1");
  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState(1);
  const [invoice, setInvoice] = useState(dateFormat(now, "ddmmyyhhMss"));
  const [date, setDate] = useState(dateFormat(now, "dd-mm-yy"));
  const [totalAmmount, setTotalAmmount] = useState("");
  const [receiveAmmount, setReceiveAmmount] = useState("");
  const [remainingBalance, setRemainingBalance] = useState("Paid");
  const [paymentType, setPaymentType] = useState("Cash");
  const dataListRef = firebase.firestore().collection("dataList");
  const [items, setItems] = useState([]);
  const now = new Date();

  // useEffect(() => {
  //   if (totalAmmount && receiveAmmount) {
  //     const remaining = totalAmmount - receiveAmmount;
  //     if (remaining > 0) {
  //       setRemainingBalance("Have To Pay - " + remaining.toString());
  //     } else if (remaining < 0) {
  //       setRemainingBalance("Will Get - " + (-remaining).toString());
  //     } else {
  //       setRemainingBalance("Paid");
  //     }
  //   }
  // }, [totalAmmount, receiveAmmount]);

  const submitHandler = async () => {
    try {
      if (!name || !address || !phoneNumber || !invoice || !paymentType) {
        alert("Please provide all required information");
      } else if (items.length === 0) {
        alert("Please add at least one item");
      } else {
        const data = {
          id,
          date,
          name,
          address,
          phoneNumber,
          product: items.map(item => item.product),
          quantity: items.map(item => item.quantity),
          invoice,
          totalAmmount: items.reduce((acc, item) => acc + parseFloat(item.totalAmmount), 0),
          paymentType,
        };
        await dataListRef.add(data);
        setInvoice(dateFormat(now, "ddmmyyhhMss"));
        setId(gen_id => gen_id + 1);
        setDate(dateFormat(now, "dd-mm-yy"));
        setName("");
        setAddress("");
        setPhoneNumber("");
        setItems([]);
        setPaymentType("Cash");
        Keyboard.dismiss();
        console.log("Data added successfully:", data);
      }
    } catch (error) {
      console.error("Error while saving:", error);
      alert("Error while saving: Try again");
    }
  };
  

  const handleAddItem = () => {
    if (quantity.trim() !== "") {
      const newItem = {
        product,
        quantity: quantity,
        totalAmmount: totalAmmount,
      };
      setItems([...items, newItem]);
      setQuantity("");
      setTotalAmmount("");
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <BottomSheetScrollView>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Full Name</Text>
          <TextInput
            onChangeText={(text) => setName(text)}
            textContentType="name"
            value={name}
            placeholder="Enter customer full name"
            style={styles.TextInput}
            placeholderTextColor={"#9997"}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Address</Text>
          <TextInput
            onChangeText={(text) => setAddress(text)}
            textContentType="addressCityAndState"
            value={address}
            placeholder="Enter customer adress"
            style={styles.TextInput}
            placeholderTextColor={"#9997"}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Phone No</Text>
          <TextInput
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            keyboardType="phone-pad"
            autoCorrect={false}
            textContentType="telephoneNumber"
            autoComplete="tel"
            placeholder="Enter customer phone number"
            style={styles.TextInput}
            placeholderTextColor={"#9997"}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Invoice No</Text>
          <TextInput
            onChangeText={(text) => setInvoice(text)}
            value={invoice}
            keyboardType="number-pad"
            placeholder="Enter Invoice No"
            style={styles.TextInput}
            placeholderTextColor={"#9997"}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Product</Text>
          <View
            style={{
              borderWidth: 2,
              height: 48,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <FlatList
              data={items}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text
                  style={{
                    backgroundColor: "#F1D36F",
                    paddingHorizontal: 20,
                    marginVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginLeft: 10,
                    gap: 10
                  }}
                >
                  {[item.product, item.quantity, item.totalAmmount]}
                </Text>
              )}
            />
          </View>
          <View style={styles.PickerContainer}>
            <Picker
              selectedValue={product}
              style={styles.Picker}
              onValueChange={(itemValue, itemIndex) => setProduct(itemValue)}
            >
              <Picker.Item label="Demo1" value="Demo1" />
              <Picker.Item label="Demo2" value="Demo2" />
              <Picker.Item label="Demo3" value="Demo3" />
              <Picker.Item label="Demo4" value="Demo4" />
            </Picker>
          </View>
        </View>

        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Quantity</Text>
          <TextInput
            onChangeText={(text) => setQuantity(text)}
            value={quantity}
            keyboardType="number-pad"
            placeholder="Select Quantity"
            style={styles.TextInput}
            placeholderTextColor={"#9997"}
            // onChangeText={setQuantity}
          />
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Total Ammount</Text>
          <TextInput
            onChangeText={(text) => setTotalAmmount(text)}
            value={totalAmmount}
            keyboardType="number-pad"
            placeholder="Enter Total Ammount"
            style={styles.TextInput}
            placeholderTextColor={"#9997"}
          />
        </View>
        <View style={styles.InputContainer}>
          <TouchableOpacity
            style={{
              ...styles.goldenButton,
              display: "flex",
              justifyContent: "center",
            }}
            onPress={handleAddItem}
          >
            <Text style={{ textAlign: "center" }}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.InputContainer}>
          <Text style={styles.Label}>Payment Method</Text>
          <View style={styles.PickerContainer}>
            <Picker
              selectedValue={paymentType}
              style={styles.Picker}
              onValueChange={(itemPayment, itemIndex) => {
                setPaymentType(itemPayment);
              }}
            >
              <Picker.Item label="Cash" value="Cash" />
              <Picker.Item label="Credit" value="Credit" />
              <Picker.Item label="UPI Payment" value="UPI Payment" />
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          onPress={submitHandler}
          style={styles.buttonContainer}
        >
          <LinearGradient
            colors={["#a54e07", "#b47e11", "#fef1a2", "#bc881b", "#a54e07"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.goldenButtonText}>Create Invoice</Text>
          </LinearGradient>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginBottom: 20,
  },
  TextInput: {
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    color: "#555",
  },
  Label: {
    fontWeight: "500",
  },
  PickerContainer: {
    padding: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    color: "#555",
  },
  goldenButtonText: {
    textTransform: "uppercase",
    color: "rgb(120, 50, 5)",
    textShadowColor: "rgba(250, 227, 133, 1)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 2,
  },
  gradientButton: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
  },
  gradientButtonFocused: {
    width: "150%",
    height: "150%",
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(165, 93, 7, 0.6)",
    color: "rgba(120, 50, 5, 0.8)",
    backgroundColor: "rgba(250, 227, 133, 1)",
  },
  gradientButtonActive: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 3,
  },
  goldenButton: {
    height: 48,
    backgroundColor: "#F1D36F",
    borderRadius: 10,
  },
});

export default AddInvoice;
