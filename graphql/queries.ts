import { gql } from "@apollo/client";

export const GET_USER_BY_NUMBER = gql`
    query userQuery($number: Float!){
        getUserByNumber(number: $number){
            id,
            email
            firstName
            lastName
            created_at
            number
            is_admin
            user_admin_id
            user_admin_secret
        }
    }
`


export const GET_ALL_ITEMS_BY_ORDER_ID = gql`
    query userQuery($order_number: String!){
        getServicesByOrderNumber(order_number: $order_number){
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

export const GET_ALL_ITEMS = gql`
    query userQuery{
        getServicesList{
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

export const GET_LOCATION_BY_USER_ID = gql`
    query userQuery($user_id: ID!){
        getLocationByUserId(user_id: $user_id){
            id,
            city
            state
            user_id 
            land_mark
            postal_code
            address
            address_2
            created_at
        }
    }
`

export const GET_USER_BY_ID = gql`
    query userQuery($user_id: ID!){
        getUserById(user_id: $user_id){
            id,
            email
            firstName
            lastName
            created_at
            number
            is_admin
            location {
                id,
                city
                state
                user_id
                postal_code
                address
                address_2
                created_at
            }
            user_admin_id
            user_admin_secret
        }
    }
`

// export const GET_ALL_USER_ORDERS = gql`
// `

export const GET_ALL_USER_ORDERS = gql`
    query userQuery($user_id: ID!){
        getAllUserServicesByUser_id(user_id: $user_id){
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

export const GET_ALL_USER_ORDERS_BY_IS_COMPLETED = gql`
    query userQuery($user_id: ID!, $is_completed: Boolean!){
        getAllUserServicesByUser_idAndIsCompleted(
            user_id: $user_id, 
            is_completed: $is_completed){
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
            }
        }
`