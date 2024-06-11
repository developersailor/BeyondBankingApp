// HomeScreen.tsx
import React,{useRef,useEffect} from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Button, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { activateCoupon } from "@/store/couponSlice";
import { RootState } from "../../store/store";
import  {BuySelectedFriendBill} from "./BuySelectedFriendBill";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const coupons = useSelector((state: RootState) => state.coupons);
 let ref =  useRef(5);
 const [bill, onChangeBill] = React.useState(100);
return (
    <ScrollView style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Beyond Banking</Text>
        <Text style={{ fontSize: 18, color: "gray" }}>Welcome to your digital wallet</Text>

        <View style={{ marginTop: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Split the bill</Text>
    
          <TextInput
            placeholder="Fatura tutarını girin"
            keyboardType="number-pad"
            onChangeText={(text) => {
              const billAmount = parseInt(text);
              // Fatura tutarını kullanarak işlemlerinizi buraya yazın
              console.log("Fatura tutarı:", billAmount); // Örnek: Konsola yazdırma
            }}
          />
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <TouchableOpacity style={styles.avatarButton}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>+</Text>
            </TouchableOpacity>
            {Array.from({ length: 5 }).map((_, index) => (
              <TouchableOpacity key={index} style={styles.avatar} onPress={() => ref.current = index}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{index}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>My Coupons</Text>
          {coupons.map((coupon) => (
            <View key={coupon.id} style={styles.coupon}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{coupon.name}</Text>
                <TouchableOpacity style={coupon.activated ? styles.activatedButton : styles.activateButton} onPress={() => dispatch(activateCoupon(coupon.id))}>
                  <Text style={{ color: "white", fontWeight: "600" }}>{coupon.activated ? "Activated" : "Activate"}</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 14, color: "gray" }}>{coupon.discount}</Text>
              <Text style={{ fontSize: 14, color: "gray" }}>Expires in {coupon.time}</Text>
            </View>
          ))}
        </View>
      </View>
      <BuySelectedFriendBill selectedFriend={ref.current 
      } bill={0} />
      <Text>
        ${bill / ref.current}
      </Text>
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