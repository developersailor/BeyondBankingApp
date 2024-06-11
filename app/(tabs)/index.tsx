import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, AppState } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import '../../store/reducer';
import '../../store/store';
import { activateCoupon } from '@/store/reducer';
import { RootState } from '../../store/store';

const HomeScreen: React.FC = () => {

  const dispatch = useDispatch();
  const coupons
  = useSelector((state: RootState) => state.coupons );

  interface Coupons {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  const initialState: Coupons[] = [];
  

  return (
    <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Beyond Banking</Text>

        {/* Split the bill */}
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Split the bill</Text>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <TouchableOpacity style={styles.avatarButton}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>+</Text>
            </TouchableOpacity>
            {['Olga', 'Maria', 'Stefan', 'Michal'].map((name, index) => (
              <View key={index} style={styles.avatar}>
                <Text style={{ fontSize: 14 }}>{name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Coupons */}
        <View style={{ marginTop: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>My Coupons</Text>
          {coupons.map((coupon:any) => (
            <View key={coupon.id} style={styles.coupon}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{coupon.name}</Text>
                <TouchableOpacity
                  style={coupon.activated ? styles.activatedButton : styles.activateButton}
                  onPress={() => dispatch(
                    activateCoupon(coupon)
                  )}
                >
                  <Text style={{ color: 'white', fontWeight: '600' }}>{coupon.activated ? 'Activated' : 'Activate'}</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 14, color: 'gray' }}>{coupon.discount}</Text>
              <Text style={{ fontSize: 14, color: 'gray' }}>Expires in {coupon.time}</Text>
              <Image source={{ uri: 'barcode_image_url' }} style={{ height: 48, marginTop: 8 }} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatarButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  coupon: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  activatedButton: {
    backgroundColor: 'green',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activateButton: {
    backgroundColor: 'black',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
export default HomeScreen;
