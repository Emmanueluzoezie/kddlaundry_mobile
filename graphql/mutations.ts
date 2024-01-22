import { gql } from "@apollo/client";

export const ADD_USER = gql`
 mutation MyMutation(
    $email: String
    $firstName: String
    $lastName: String
    $created_at: DateTime!
    $number: Float
    $is_admin: Boolean
    $user_admin_id: Sting
    $user_admin_secret: String
 ){ 
    insertUser(
        email: $email
        firstName: $firstName
        lastName: $lastName
        created_at: $created_at
        number: $number
        user_admin_id: $user_admin_id
        user_admin_secret: $user_admin_secret
    ){
        id,
        email
        firstName
        lastName
        created_at
        number
        user_admin_id
        user_admin_secret
    }
 }
`

export const ADD_LAUNDRY_SERVICE = gql`
 mutation MyMutation(
    $service_state: String
    $is_completed: Boolean
    $paid: Boolean
    $completed_date: DateTime
    $company_collected_date: DateTime
    $created_at: DateTime!
    $type_of_service: String
    $total_amount: Float
    $name: String
    $order_number: String
    $quantity: Float
    $amount: Float
    $current_state: String
    $delivered: Boolean
    $company_collected: Boolean
 ){
    insertServices(
        service_state: $service_state
        is_completed: $is_completed
        paid: $paid
        order_number: $order_number
        completed_date: $completed_date
        company_collected_date: $company_collected_date
        created_at: $created_at
        type_of_service: $type_of_service
        total_amount: $total_amount
        name: $name
        quantity: $quantity
        amount: $amount
        current_state: $current_state
        delivered: $delivered
        company_collected: $company_collected
    ){
        id,
        service_state
        is_completed
        paid
        order_number
        completed_date
        company_collected_date
        created_at
        type_of_service
        total_amount
        name
        quantity
        amount
        current_state
        delivered
        company_collected
    }
 }
`

export const UPDATE_LAUNDRY_SERVICE = gql`
 mutation MyMutation(
    $id: ID!
    $quantity: Float!
    $total_amount: Float!
 ){
    updateServicesQuantity(
        id: $id
        quantity: $quantity
        total_amount: $total_amount
    ){
        id,
        service_state
        is_completed
        paid
        completed_date
        company_collected_date
        created_at
        type_of_service
        total_amount
        name
        quantity
        order_number
        amount
        current_state
        delivered
        company_collected
    }
 }
`

export const UPDATE_PAID_LAUNDRY_SERVICE = gql`
 mutation MyMutation(
    $id: ID!
    $paid: Boolean!
 ){
    updateServicesPaid(
        id: $id
        paid: $paid
    ){
        id,
        service_state
        is_completed
        paid
        completed_date
        company_collected_date
        created_at
        type_of_service
        total_amount
        name
        quantity
        order_number
        amount
        current_state
        delivered
        company_collected
    }
 }
`

export const UPDATE_COLLECTED_LAUNDRY_SERVICE = gql`
 mutation MyMutation(
    $id: ID!
    $current_state: String!
    $delivered: Boolean!
    $is_completed: Boolean!
    $completed_date: DateTime!
 ){
    updateIsCollectedServices(
        id: $id
        current_state: $current_state
        delivered: $delivered
        is_completed: $is_completed
        completed_date: $completed_date
    ){
        id,
        service_state
        is_completed
        paid
        completed_date
        created_at
        type_of_service
        total_amount
        name
        quantity
        order_number
        amount
        current_state
        delivered
        company_collected
        company_collected_date
    }
 }
`

export const REMOVE_LAUNDRY_SERVICE = gql`
 mutation MyMutation(
    $id: ID!
 ){deleteServices(
        id: $id
    ){
        id,
        service_state
        is_completed
        paid
        order_number
        completed_date
        created_at
        type_of_service
        total_amount
        name
        quantity
        amount
        current_state
        delivered
        company_collected
        company_collected_date
    }}
`

export const ADD_LOCATION = gql`
 mutation MyMutation(
    $city: String
    $state: String
    $user_id: ID
    $postal_code: String
    $address: String
    $address_2: String
    $land_mark: String
    $created_at: DateTime!
 ){
    insertLocation(
        city: $city
        state: $state
        user_id: $user_id
        postal_code: $postal_code
        address: $address
        address_2: $address_2
        land_mark: $land_mark
        created_at: $created_at
    ){
        id,
        city
        state
        user_id
        postal_code
        address
        address_2
        land_mark
        created_at
    }}
`

export const ADD_TRANSACTIONS = gql`
    mutation MyMutation(
        $amount: Float
        $created_at: DateTime!
        $currency: String
        $order_number: String
        $status: String
        $title: String
        $type: String
        $user_id: ID
    ){
        insertTransactions(
            amount: $amount
            created_at: $created_at
            currency: $currency
            order_number: $order_number
            status: $status
            title: $title
            type: $type
            user_id: $user_id
        ){
            id
            amount
            created_at
            currency
            order_number
            status
            title
            type
            user_id
        }
    }
`

