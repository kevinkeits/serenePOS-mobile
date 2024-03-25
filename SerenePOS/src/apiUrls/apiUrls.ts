const BASE_URL = 'https://serenepos.temandigital.id/api/';

export const ApiUrls = {
  doLogin: `https://serenepos.temandigital.id/api/auth/doLogin`,
  doLogout: `https://serenepos.temandigital.id/api/auth/doLogout`,
  doRegister: `https://serenepos.temandigital.id/api/auth/doRegister`,

  getCategory: `https://serenepos.temandigital.id/api/category/get`,
  getCategoryDetail: (categoryId: string) => `https://serenepos.temandigital.id/api/category/get?ID=${categoryId}`,
  saveCategory: `https://serenepos.temandigital.id/api/category/doSave`,

  getProduct: (categoryId: string) => `https://serenepos.temandigital.id/api/product/get?CategoryID=${categoryId}`,
  getProductDetail: (id: string) => `https://serenepos.temandigital.id/api/product/get?ID=${id}`,
  saveProduct: `https://serenepos.temandigital.id/api/product/doSave`,

  getVariant: `https://serenepos.temandigital.id/api/variant/get`,
  getVariantDetail: (id: string) => `https://serenepos.temandigital.id/api/variant/get?ID=${id}`,
  saveVariant: `https://serenepos.temandigital.id/api/variant/doSave`,

  getOutlet: `https://serenepos.temandigital.id/api/outlet/get`,
  getOutletDetail: (id: string) => `https://serenepos.temandigital.id/api/outlet/get?ID=${id}`,
  saveOutlet: `https://serenepos.temandigital.id/api/outlet/doSave`,

  getCustomer: `https://serenepos.temandigital.id/api/customer/get`,
  getCustomerDetail: (id: string) => `https://serenepos.temandigital.id/api/customer/get?ID=${id}`,
  saveCustomer: `https://serenepos.temandigital.id/api/customer/doSave`,

  getUser: `https://serenepos.temandigital.id/api/user/get`,
  getUserDetail: (id: string) => `https://serenepos.temandigital.id/api/user/get?ID=${id}`,
  saveUser: `https://serenepos.temandigital.id/api/user/doSave`,

  getTransaction: `https://serenepos.temandigital.id/api/transaction/get`,
  getTransactionHistory: `https://serenepos.temandigital.id/api/transaction/getHistory`,
  getTransactionDetail: (id: string) => `https://serenepos.temandigital.id/api/transaction/get?ID=${id}`,
  saveTransaction: `https://serenepos.temandigital.id/api/transaction/doSave`,

  getPayment: `https://serenepos.temandigital.id/api/payment/get`,
  getPaymentDetail: (id: string) => `https://serenepos.temandigital.id/api/payment/get?ID=${id}`,
  savePayment: `https://serenepos.temandigital.id/api/payment/doSave`,

  getDashboardTodayIncome: `https://serenepos.temandigital.id/api/dashboard/getTodayIncome`,
  getDashboardTotalIncomeForMonth: `https://serenepos.temandigital.id/api/dashboard/getTotalIncomeForMonth`,
  getDashboardTopSellings: `https://serenepos.temandigital.id/api/dashboard/getTopSellings`,
  getDashboardSalesWeekly: `https://serenepos.temandigital.id/api/dashboard/getSalesWeekly`,
  getDashboardProfitAmount: `https://serenepos.temandigital.id/api/dashboard/getProfitAmount`,





};