const BASE_URL = 'https://serenepos.temandigital.id/api/';

export const ApiUrls = {
  doLogin: `${BASE_URL}auth/doLogin`,
  doLogout: `${BASE_URL}auth/doLogout`,
  doRegister: `${BASE_URL}auth/doRegister`,

  getCategory: `${BASE_URL}category/get`,
  getCategoryDetail: (categoryId: string) => `${BASE_URL}category/get?ID=${categoryId}`,
  saveCategory: `${BASE_URL}category/doSave`,

  getProduct: (categoryId: string) => `${BASE_URL}product/get?CategoryID=${categoryId}`,
  getProductDetail: (id: string) => `${BASE_URL}product/get?ID=${id}`,
  saveProduct: `${BASE_URL}product/doSave`,

  getVariant: `${BASE_URL}variant/get`,
  getVariantDetail: (id: string) => `${BASE_URL}variant/get?ID=${id}`,
  saveVariant: `${BASE_URL}variant/doSave`,

  getOutlet: `${BASE_URL}outlet/get`,
  getOutletDetail: (id: string) => `${BASE_URL}outlet/get?ID=${id}`,
  saveOutlet: `${BASE_URL}outlet/doSave`,

  getCustomer: `${BASE_URL}customer/get`,
  getCustomerDetail: (id: string) => `${BASE_URL}customer/get?ID=${id}`,
  saveCustomer: `${BASE_URL}customer/doSave`,

  getUser: `${BASE_URL}user/get`,
  getUserDetail: (id: string) => `${BASE_URL}user/get?ID=${id}`,
  saveUser: `${BASE_URL}user/doSave`,

  getTransaction: `${BASE_URL}transaction/get`,
  getTransactionHistory: `${BASE_URL}transaction/getHistory`,
  getTransactionDetail: (id: string) => `${BASE_URL}transaction/get?ID=${id}`,
  saveTransaction: `${BASE_URL}transaction/doSave`,

  getPayment: `${BASE_URL}payment/get`,
  getPaymentDetail: (id: string) => `${BASE_URL}payment/get?ID=${id}`,
  savePayment: `${BASE_URL}payment/doSave`,

  getDashboardTodayIncome: `${BASE_URL}dashboard/getTodayIncome`,
  getDashboardTotalIncomeForMonth: `${BASE_URL}dashboard/getTotalIncomeForMonth`,
  getDashboardTopSellings: `${BASE_URL}dashboard/getTopSellings`,
  getDashboardSalesWeekly: `${BASE_URL}dashboard/getSalesWeekly`,
  getDashboardProfitAmount: `${BASE_URL}dashboard/getProfitAmount`,

  getSettings: `${BASE_URL}setting/getSettings`,
  getSettingsOutlet: `${BASE_URL}setting/getOutlet`,
  saveSettings: `${BASE_URL}setting/doSaveSetting`,
  saveSettingsOutlet: `${BASE_URL}setting/doSaveOutlet`,
  saveSettingsAccount: `${BASE_URL}setting/doSaveAccount`,

  getTable: `${BASE_URL}tableManagement/get`,
  getTableDetail: (id: string) => `${BASE_URL}tableManagement/get?ID=${id}`,
  saveTable: `${BASE_URL}tableManagement/doSave`,

};