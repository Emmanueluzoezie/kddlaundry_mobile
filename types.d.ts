type SelectServiceType ={
    name: string;
    amount: number;
    category: string
}

type LaundryItemType={
    amount: number
    completed_date: string
    created_at: string
    id: any
    is_completed: boolean
    name: string
    order_number: string
    paid: boolean
    quantity: number
    service_state: string
    total_amount: number
    type_of_service: string
    current_state: string
    delivered: boolean
    company_collected:  boolean
}

type CheckoutType={
    total_amount: number
    numberOfItems: number
    order_number: string
    
}
