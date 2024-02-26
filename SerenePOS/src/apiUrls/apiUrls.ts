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

};