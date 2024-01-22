import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store"



interface AppState {
    selectedService: SelectServiceType;
    showItemCategories: boolean;
    laundryOngoingDetail: LaundryItemType;
    laundryCompletedDetail: LaundryItemType;
    showAllLaundryItems: boolean
    showOngoingDetail: boolean
    showCompletedDetail: boolean
    checkFunctionToCall: string
    updateId: string
}

const initialState: AppState = {
    selectedService: {
        name: "",
        amount: 0,
        category: ""
    },
    showItemCategories: false, 
    laundryOngoingDetail: {
        amount: 0,
        completed_date: "",
        created_at: "",
        id: "",
        is_completed: false,
        name: "",
        order_number: "",
        paid: false,
        quantity: 0,
        service_state: "",
        total_amount: 0,
        type_of_service: "",
        current_state: "",
        delivered: false,
        company_collected: false
    },
    laundryCompletedDetail: {
        amount: 0,
        completed_date: "",
        created_at: "",
        id: "",
        is_completed: false,
        name: "",
        order_number: "",
        paid: false,
        quantity: 0,
        service_state: "",
        total_amount: 0,
        type_of_service: "",
        current_state: "",
        delivered: false,
        company_collected: false
    },
    showAllLaundryItems: true,
    showOngoingDetail: false,
    showCompletedDetail: false,
    checkFunctionToCall: "add",
    updateId: "",
}

export const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        setSelectedService: (state, action: PayloadAction<SelectServiceType>) => {
            state.selectedService = action.payload;
        },
        setShowItemCategories: (state, action: PayloadAction<boolean>) => {
            state.showItemCategories = action.payload;
        },
        setLaundryOngoingDetail: (state, action: PayloadAction<LaundryItemType>) => {
            state.laundryOngoingDetail = action.payload
        },
        setLaundryCompletedDetail: (state, action: PayloadAction<LaundryItemType>) => {
            state.laundryCompletedDetail = action.payload
        },
        setShowAllLaundryItems: (state, action:PayloadAction<boolean>)=> {
            state.showAllLaundryItems = action.payload
        },
        setShowOngoingDetail: (state, action:PayloadAction<boolean>)=> {
            state.showOngoingDetail = action.payload
        },
        setShowCompletedDetail: (state, action:PayloadAction<boolean>)=> {
            state.showCompletedDetail = action.payload
        },
        setCheckFunctionToCall: (state, action:PayloadAction<string>)=> {
            state.checkFunctionToCall = action.payload
        },
        setUpdateId: (state, action:PayloadAction<string>)=> {
            state.updateId = action.payload
        }, 
    }
});

export const { setSelectedService, setShowItemCategories, setLaundryOngoingDetail,
    setShowOngoingDetail, setShowAllLaundryItems, setCheckFunctionToCall, setUpdateId, setLaundryCompletedDetail, setShowCompletedDetail } = serviceSlice.actions;

export const selectedService = (state: RootState) => state.service.selectedService
export const selectShowItemCategories = (state: RootState) => state.service.showItemCategories
export const selectLaundryOngoingDetail = (state: RootState) => state.service.laundryOngoingDetail
export const selectShowAllLaundryItems = (state: RootState) => state.service.showAllLaundryItems
export const selectCheckFunctionToCall = (state: RootState) => state.service.checkFunctionToCall
export const selectUpdateId = (state: RootState) => state.service.checkFunctionToCall
export const selectShowOngoingDetail = (state: RootState) => state.service.showOngoingDetail
export const selectShowCompletedDetail = (state: RootState) => state.service.showCompletedDetail
export const selectLaundryCompletedDetail = (state: RootState) => state.service.laundryCompletedDetail

export default serviceSlice.reducer;