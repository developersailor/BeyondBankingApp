// redux/reducer.ts
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
interface Coupon {
    id: number;
    name: string;
    discount: string;
    time: string;
    activated: boolean;
}
const initialState: Coupon[] = [ { id: 1, name: "McDonald's", discount: '-10%', time: '12m 5s', activated: false },
    { id: 2, name: 'Nike Store', discount: '-5%', time: '30 min', activated: false },];

export const couponSlice = createSlice({
    name: 'coupons',
    initialState: initialState,
    reducers: {
        activateCoupon: (state, action: PayloadAction<number>) => {
            const couponId = action.payload;
            return state.map((coupon) =>
                coupon.id === couponId ? { ...coupon, activated: true } : coupon
            );
        },
        // indirim kuponu eklemek için yeni bir reducer oluşturun
        addCoupon: (state, action: PayloadAction<{ id: number, name: string, discount: string, time: string, activated: boolean }>) => {
            return [...state, action.payload];
        },
        // faturaları bölüştürmek için yeni bir reducer
        billSplit: (state, action: PayloadAction<number>) => {
            const bill = action.payload;
            return state.map((coupon) =>
                coupon.activated ? { ...coupon, discount: (bill / 10).toString() } : coupon
            );
        },
    },
});

export const { activateCoupon, addCoupon, billSplit } = couponSlice.actions;
export default couponSlice.reducer;