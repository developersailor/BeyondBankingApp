import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Button, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { activateCoupon, applyCoupon, billSplit } from "@/store/couponSlice";
import { RootState } from "../../store/store";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const coupons = useSelector((state: RootState) => state.coupons);

  const [bill, setBill] = React.useState<number>(0);
  const [split, setSplit] = React.useState<number>(1);
  const [billInput, setBillInput] = React.useState<string>("0");
  const [splitInput, setSplitInput] = React.useState<string>("1");

  const handleBillChange = (text: string) => {
    setBillInput(text);
    const billAmount = parseFloat(text);
    if (!isNaN(billAmount)) {
      setBill(billAmount);
    }
  };

  const handleSplitChange = (text: string) => {
    setSplitInput(text);
    const splitAmount = parseInt(text, 10);
    if (!isNaN(splitAmount)) {
      setSplit(splitAmount);
    }
  };

  const handleApplyCoupon = () => {
    if (!isNaN(bill)) {
      dispatch(applyCoupon(bill));
    }
  };

  const handleBillSplit = () => {
    const discountedBill = coupons.find(coupon => coupon.discountedBill !== undefined)?.discountedBill || bill;
    if (!isNaN(discountedBill) && !isNaN(split)) {
      dispatch(billSplit({ discountedBill, split }));
    }
  };

  const splitAmount = coupons.find(coupon => coupon.splitAmount !== undefined)?.splitAmount;

  return (
    <ScrollView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Beyond Banking</Text>
        <Text style={{ fontSize: 18, color: "gray" }}>Welcome to your digital wallet</Text>

        <View style={{ marginTop: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Split the bill</Text>
          <View style={{ flexDirection: "column", marginTop: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Bill Amount</Text>
            <TextInput
              placeholder="Enter bill amount"
              keyboardType="numeric"
              value={billInput}
              onChangeText={handleBillChange}
              style={{ fontSize: 58, width: 100, height:100, textAlign: "center"}}
            />
            <Text style={{ fontSize: 58, fontWeight: "600" }}>Number of people</Text>
            <TextInput
                placeholder="Number of people"
                keyboardType="number-pad"
                value={splitInput}
                onChangeText={handleSplitChange}
                style={{ fontSize: 108, width: 100, height:100 , textAlign: "center"}}
              />
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>My Coupons</Text>
          {coupons.map((coupon) => (
            <View key={coupon.id} style={styles.coupon}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{coupon.name}</Text>
                <TouchableOpacity
                  style={coupon.activated ? styles.activatedButton : styles.activateButton}
                  onPress={() => dispatch(activateCoupon(coupon.id))}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>{coupon.activated ? "Activated" : "Activate"}</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 14, color: "gray" }}>{coupon.discount}</Text>
              <Text style={{ fontSize: 14, color: "gray" }}>Expires in {coupon.time}</Text>
            </View>
          ))}
        </View>
      </View>
      <Button
            title="Apply Coupon"
            onPress={handleApplyCoupon}
          />
      <Text style={{ fontSize: 100 }}>
        {isNaN( 
          splitAmount ?? 0
        )? "Invalid input" : (splitAmount ?? 0).toFixed(2)}
      </Text>

      

      <Button
       title="Split"
            onPress={handleBillSplit}
          />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatarButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  coupon: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  activatedButton: {
    backgroundColor: "green",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activateButton: {
    backgroundColor: "black",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

export default HomeScreen;