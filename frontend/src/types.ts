
export type OrderType = {
    employeeNo: number
    customer: string
    id: number
    state: string
    description: string
    items: ItemType[]
    statusChanges: StatusChange[]
}

export type UserType = {
    employeeNo: number
    name: string
}

export type StatusChange = {
    employee: any
    status: string
    updatedDate: string
}

export type ItemType = {
    description: string
    amount: number
}
