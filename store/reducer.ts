// redux/reducer.ts
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export const couponSlice = createSlice({
    name: 'coupons',
    initialState: [
        { id: 1, name: "McDonald's", discount: '-10%', time: '12m 5s', activated: false },
        { id: 2, name: 'Nike Store', discount: '-5%', time: '30 min', activated: false },
    ],
    reducers: {
        activateCoupon: (state, action: PayloadAction<number>) => {
            const couponId = action.payload;
            return state.map((coupon) =>
                coupon.id === couponId ? { ...coupon, activated: true } : coupon
            );
        },
        
    },
});

export const { activateCoupon } = couponSlice.actions;
export default couponSlice.reducer;