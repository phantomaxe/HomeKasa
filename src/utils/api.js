const BASEURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
export default {
  // User API
  SignUp: `${BASEURL}/api/users/register`,
  LogIn: `${BASEURL}/api/users/login`,
  Confirmation: `${BASEURL}/api/users/confirmation/`,
  EditUser: `${BASEURL}/api/users/update/`,
  ResetPassword1: `${BASEURL}/api/users/resetPW1`,
  ForgotPassword: `${BASEURL}/api/users/forgotPW`,
  ResetPassword: `${BASEURL}/api/users/resetPW/`,
  // House API
  GetAllHouses: `${BASEURL}/api/houses/getAllHouses`,
  PostHouse: `${BASEURL}/api/houses/addHouse`,
  GetHouse: `${BASEURL}/api/houses/viewDetail/`,
  EditHouse: `${BASEURL}/api/houses/editHouse/`,
  DeleteHouse: `${BASEURL}/api/houses/deleteHouse/`,
  GetHousesEachUser: `${BASEURL}/api/houses/housesByUser/`,
  GetHousesAndMortgageEachUser: `${BASEURL}/api/houses/housesAndMortgageByUser/`,
  // Transaction API
  GetAllTransactions: `${BASEURL}/api/transactions/getAllTransations`,
  PostTransaction: `${BASEURL}/api/transactions/postTransaction`,
  GetTransaction: `${BASEURL}/api/transactions/getTransaction/`,
  EditTransaction: `${BASEURL}/api/transactions/editTransaction/`,
  DeleteTransaction: `${BASEURL}/api/transactions/deleteTransaction/`,
  GetTransactionsEachHouse: `${BASEURL}/api/transactions/getTransactionsEachHouse/`,
  GetTransactionsEachUser: `${BASEURL}/api/transactions/getTransactionsEachUser/`,
  // Renter API
  GetAllPeople: `${BASEURL}/api/people/getAllPeople`,
  PostPeople: `${BASEURL}/api/people/postPeople`,
  GetPeople: `${BASEURL}/api/people/getPeople/`,
  EditPeople: `${BASEURL}/api/people/editPeople/`,
  DeletePeople: `${BASEURL}/api/people/deletePeople/`,
  GetPeopleEachHouse: `${BASEURL}/api/people/getPeopleEachHouse/`,
  GetPeopleEachUser: `${BASEURL}/api/people/getPeopleEachUser/`,
  // Mortgage API
  GetMortgageEachHouse: `${BASEURL}/api/mortgages/getMortgageEachHouse/`,
  EditMortgage: `${BASEURL}/api/mortgages/editMortgage/`,
  PostMortgage: `${BASEURL}/api/mortgages/postMortgage`,
  DeleteMortgage: `${BASEURL}/api/mortgages/deleteMortgage/`,
  // Tax API
  GetTaxEachHouse: `${BASEURL}/api/tax/getTaxEachHouse/`,
  EditTax: `${BASEURL}/api/tax/editTax/`,
  PostTax: `${BASEURL}/api/tax/postTax`,
  DeleteTax: `${BASEURL}/api/tax/deleteTax/`,
  // Insurance API
  GetInsuranceEachHouse: `${BASEURL}/api/insurance/getInsuranceEachHouse/`,
  EditInsurance: `${BASEURL}/api/insurance/editInsurance/`,
  PostInsurance: `${BASEURL}/api/insurance/postInsurance`,
  DeleteInsurance: `${BASEURL}/api/insurance/deleteInsurance/`,
  // Lease API
  GetLeaseEachHouse: `${BASEURL}/api/lease/getLeaseEachHouse/`,
  EditLease: `${BASEURL}/api/lease/editLease/`,
  PostLease: `${BASEURL}/api/lease/postLease`,
  DeleteLease: `${BASEURL}/api/lease/deleteLease/`,
  // file Manage API
  FileUpload: `${BASEURL}/api/filemanage/fileUpload`,
  FileDownload: `${BASEURL}/api/filemanage/fileDownload/`,
  GetEachSectionDocList: `${BASEURL}/api/filemanage/getDocumentList/`,
  GetEachUserDocList: `${BASEURL}/api/filemanage/getEachUserDocumentList/`,
  GetEachHouseDocList: `${BASEURL}/api/filemanage/getEachHouseDocumentList/`,
  DeleteDocument: `${BASEURL}/api/filemanage/deleteDocument`,
  // Report API
  GetReportData: `${BASEURL}/api/report/getData/`,
  getTotalMonthlyPaymentEachHouse: `${BASEURL}/api/report/getTotalMonthlyPaymentEachHouse/`,
  // Expense API
  GetExpenseEachUser: `${BASEURL}/api/expense/getExpenseEachUser/`,
  GetExpenseEachHouse: `${BASEURL}/api/expense/getExpenseEachHouse/`,
  EditExpense: `${BASEURL}/api/expense/editExpense/`,
  PostExpense: `${BASEURL}/api/expense/postExpense`,
  DeleteExpense: `${BASEURL}/api/expense/deleteExpense`,
  DeleteExpenseReceipts: `${BASEURL}/api/expense/deleteExpenseReceipts`,
};
