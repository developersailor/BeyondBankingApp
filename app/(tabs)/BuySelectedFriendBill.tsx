// BuySelectedFriendBill.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { activateCoupon } from "@/store/couponSlice";

export const BuySelectedFriendBill: React.FC<{
  selectedFriend: number;
  bill: number;
}> = ({ selectedFriend, bill }) => {
  const dispatch = useDispatch();
  // seçili kişinin faturasını ödeme işlemlerini burada yap.
    const coupons = useSelector((state: RootState) => state.coupons);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Buy {selectedFriend}'s Bill</Text>
            <Text style={{ fontSize: 14, color: "gray" }}>Total: ${bill}</Text>
            <View style={{ flexDirection: "row", marginTop: 16 }}>
                <Text style={{ fontSize: 14, color: "gray" }}>Select a coupon:</Text>
                {coupons.map((coupon) => (
                    <TouchableOpacity key={coupon.id} style={coupon.activated ? styles.activatedButton : styles.activateButton} onPress={() => dispatch(activateCoupon(coupon.id))}>
                        <Text style={{ color: "white", fontWeight: "600" }}>{coupon.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

}       




const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    marginTop: 16,
  },
  activateButton: {
    backgroundColor: "blue",
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  activatedButton: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
});