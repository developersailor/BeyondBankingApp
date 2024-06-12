import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Coupon {
    discountedBill: number | undefined;
    splitAmount: number | undefined;
    id: number;
    name: string;
    discount: string;
    time: string;
    activated: boolean;
}

const initialState: Coupon[] = [
    {
      id: 1, name: "McDonald's", discount: '-10', time: '12m 5s', activated: false,
      discountedBill: undefined,
      splitAmount: undefined
    },
    {
      id: 2, name: 'Nike Store', discount: '-5', time: '30 min', activated: false,
      discountedBill: undefined,
      splitAmount: undefined
    },
];

export const couponSlice = createSlice({
    name: 'coupons',
    initialState: initialState,
    reducers: {
        activateCoupon: (state, action: PayloadAction<number>) => {
            return state.map(coupon => ({
                ...coupon,
                activated: coupon.id === action.payload,
            }));
        },
        addCoupon: (state, action: PayloadAction<{ id: number, name: string, discount: string, time: string, activated: boolean }>) => {
            const { id, name, discount, time, activated } = action.payload;
            state.push({
                id,
                name,
                discount,
                time,
                activated,
                discountedBill: undefined,
                splitAmount: undefined
            });
        },
        applyCoupon: (state, action: PayloadAction<number>) => {
            const bill = action.payload;
            const activatedCoupon = state.find(coupon => coupon.activated);
            
            if (activatedCoupon) {
                const discountValue = parseFloat(activatedCoupon.discount);
                const discountedBill = bill + discountValue;  // Adding because discount is negative
                return state.map(coupon => ({
                    ...coupon,
                    discountedBill: coupon.activated ? discountedBill : undefined,
                }));
            }
            return state;
        },
        billSplit: (state, action: PayloadAction<{ discountedBill: number; split: number }>) => {
            const { discountedBill, split } = action.payload;
            const splitAmount = discountedBill / split;
            return state.map(coupon => ({
                ...coupon,
                splitAmount: coupon.activated ? splitAmount : undefined,
            }));
        },
    },
});

export const { activateCoupon, addCoupon, applyCoupon, billSplit } = couponSlice.actions;
export default couponSlice.reducer;