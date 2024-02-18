const BASE_URL = 'https://serenepos.temandigital.id/api/';

export const ApiUrls = {
  doLogin: `https://serenepos.temandigital.id/api/auth/doLogin`,
  doLogout: `https://serenepos.temandigital.id/api/auth/doLogout`,
  doRegister: `https://serenepos.temandigital.id/api/auth/doRegister`,

  getCategory: `https://serenepos.temandigital.id/api/category/get`,
  getCategoryDetail: (categoryId: string) => `https://serenepos.temandigital.id/api/category/get?ID=${categoryId}`,
  saveCategory: `https://serenepos.temandigital.id/api/category/doSave`,
};