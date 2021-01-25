export interface Expense {
  amount:number
  subType:string
  type:string | "expense"
  comments:string
  endDate:string
  startDate:string
  filesPath:string[]
  frequency:string
  vendorOrManufacturer:string
  paidDate:string | null
  recurrence:string | "Recurring"
  
  _id:string
  houseId:string
  userId:string
}