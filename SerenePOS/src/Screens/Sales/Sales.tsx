import React from 'react'
import { Dimensions, Button, StyleSheet, Text, View, Image, ScrollView, TextInput, Alert } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import CommonLayout from '../../Components/CommonLayout/CommonLayout';
import EditItemModal from './components/EditItemModal/EditItemModal';
import PaymentMethodModal, { TransactionForm } from './components/PaymentMethodModal/PaymentMethodModal';
import EditOrderModal from './components/EditOrderModal/EditOrderModal';
import DiscountModal from './components/DiscountModal/DiscountModal';
import PencilSVG from '../../assets/svgs/PencilSVG';
import DiscountSVG from '../../assets/svgs/DiscountSVG';
import ReceiptSVG from '../../assets/svgs/ReceiptSVG';
import CartSVG from '../../assets/svgs/CartSVG';
import SaveSVG from '../../assets/svgs/SaveSVG';
import TrashSVG from '../../assets/svgs/TrashSVG';
import TransactionModal from './components/TransactionModal/TransactionModal';
import { Product, ProductDetail, selVariantProduct } from '../Products/Products';
import { Categories } from '../Categories/Categories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiUrls } from '../../apiUrls/apiUrls';
import { Transaction, TransactionDetail } from '../TransactionHistory/TransactionHistory';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';

import ThermalPrinterModule from 'react-native-thermal-printer';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
ThermalPrinterModule.defaultConfig = {
  ...ThermalPrinterModule.defaultConfig,
  ip: '',
  port: 9100,
  autoCut: false,
  timeout: 30000, // in milliseconds (version >= 2.2.0)
};
interface IBLEPrinter {
  deviceName: string;
  macAddress: string;
  status?: string;
}


const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export interface Payment{
  id: string
  clientID: string;
  name: string;
  description: string;
  isActive: string;
}

type ScreenProps = {
  route: { params: { id: string} };
};

const Sales = ({ route }: ScreenProps) => {

  const { id = '' } = route?.params ?? {};


  const [dimensions, setDimensions] = React.useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  const isFocused = useIsFocused();
    const [currentPrinter, setCurrentPrinter] = React.useState<IBLEPrinter>();

    //const [coffeeData, setCoffeeData] = React.useState<Coffee[]>([]);
    const [productData, setProductData] = React.useState<Product[]>([]);
    const [categoriesData, setCategoriesData] = React.useState<Categories[]>([]);
    const [paymentData, setPaymentData] = React.useState<Payment[]>([]);


    const [selectedItems, setSelectedItems] = React.useState<ProductDetail[]>([]);
    const [selectedProductVariantOptionIds, setSelectedProductVariantOptionIds] = React.useState<string[]>([]);


    const [selectedVariantOptionIds, setSelectedVariantOptionIds] = React.useState<string[]>([]);
    const [selectedVariantLabel, setSelectedVariantLabel] = React.useState<string[]>([]);
    const [selectedVariantPrice, setSelectedVariantPrice] = React.useState<string[]>([]);

    const [isEditModalVisible, setEditModalVisible] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState<Product | null>(null);
    const [totalPriceState, setTotalPriceState] = React.useState(0);
    const [isOpenPayment, setIsOpenPayment] = React.useState(false);
    const [isOpenOrder, setIsOpenOrder] = React.useState(false);

    const [isOpenReceived, setIsOpenReceived] = React.useState(false);

    const [loadingSave, setLoadingSave] = React.useState(false);


    const [isOpenDiscount, setIsOpenDiscount] = React.useState(false);
    const [customerName, setCustomerName] = React.useState('');
    const [isOpenTransaction, setIsOpenTransaction] = React.useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const [isNewOpen, setIsNewOpen] = React.useState(true);
    const [detailData, setDetailData] = React.useState<ProductDetail | null>(null);
    const [discountOverall, setDiscountOverall] = React.useState({
      isDiscount: '1',
      discountType: '', 
      discountValue: '0',
      discountDesc: '' 
    });

    const [transactionData, setTransactionData] = React.useState<Transaction[]>([]);
    const [transactionDetailData, setTransactionDetailData] = React.useState<TransactionDetail | null>(null);
    const [selectedTransactionID, setSelectedTransactionID] = React.useState<string>('');



    const getCurrentDate = () => {
      const currentDate = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      };
    
      return currentDate.toLocaleDateString(undefined, options);
    };

   
    const fetchData = async (categoryID: string) => {
      try {
        console.log('[Sales] fetching product')
        const token = await AsyncStorage.getItem('userData'); 
        const categoryDetailUrl = ApiUrls.getProduct(categoryID);    
        if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(categoryDetailUrl, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          const data: Product[] = response.data.data;
          setProductData(data);
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDetail = async (id: string) => {
      try {
        console.log('[Sales] Fetch detail product')
        const token = await AsyncStorage.getItem('userData'); 
        const categoryDetailUrl = ApiUrls.getProductDetail(id);    
        if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(categoryDetailUrl, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          const data: ProductDetail = response.data.data;
          if (id !== '') {
          // if (data) {
          //   setTextProductSKU(data.product.productSKU)
          //   setTextName(data.product.name)
          //   setTextPrice(parseInt(data.product.price).toString())
          //   setSelCategory(data.product.categoryID)
          //   setQuantity(data.product.qty)
          //   setTextDescription(data.product.notes)
          //   if (data.variant) {
          //     const variantOptionIDs = data.variant.map((x) => x.variantOptionID);
          //     setSelectedVariantIds(data.variant.filter((x) => x.isSelected == 'T').map((x) => x.variantOptionID));
          //     //setIsSelectedOptions(Array.from({ length: variantOptionIDs.length }, () => 'T'));
          //     setIsSelectedOptions(data.variant.map((x) => x.isSelected));
          //     setVariantIds(variantOptionIDs)
          //     setVariantInputValues(data.variant.map((x) => 'Rp ' + parseInt(x.price).toLocaleString())); 
          //   }
          // }
          setIsNewOpen(true)
          setDetailData(data);
          //console.log(data)
        }
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchTransactionHistory = async () => {
      console.log('[Transaction History] fetching data')
      try {
        const token = await AsyncStorage.getItem('userData');     
        if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(ApiUrls.getTransaction, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          const data: Transaction[] = response.data.data;
          setTransactionData(data);
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchTransactionDetail = async (id: string) => {
      try {
        const token = await AsyncStorage.getItem('userData'); 
        const transactionDetailUrl = ApiUrls.getTransactionDetail(id);    
        if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(transactionDetailUrl, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          const data: TransactionDetail = response.data.data;

          if (id !== '') {
          setCustomerName(data.details.customerName)
          setSelectedTransactionID(data.details.transactionID)
          setTransactionDetailData(data);

        //   const totalDiscount = data.detailsProduct.reduce((acc, detail) => {
        //     const discount = parseFloat(detail.discount);
        //     acc += isNaN(discount) ? 0 : discount;
        //     return acc;
        // }, 0);

        // const discountOverall = parseInt(data.details.discount) - totalDiscount

        // setDiscountOverall({
        //   isDiscount:'2',
        //   discountType:'2',
        //   discountValue: discountOverall.toLocaleString(),
        //   discountDesc:''
        // })


          const productDetails: ProductDetail[] = data.detailsProduct.map(detail => {
            const variants: selVariantProduct[] = data.detailsVariant
                .filter(variant => variant.productID === detail.productID)
                .map(variant => ({
                    id: variant.id,
                    productVariantOptionID: variant.productVariantOptionID,
                    isSelected: variant.isSelected,
                    variantID: variant.variantID,
                    name: variant.name,
                    type: variant.type,
                    variantOptionID: variant.variantOptionID,
                    transactionProductID: variant.transactionProductID,
                    label: variant.label,
                    price: variant.price,
                }));
            return {
                product: {
                    id: detail.productID,
                    productSKU: '',
                    name: detail.productName,
                    price: detail.unitPrice,
                    transactionProductID: detail.transactionProductID,
                    categoryID: '',
                    categoryName: '',
                    qty: detail.qty,
                    notes: detail.notes,
                    selectedTotalDiscount: detail.discount,
                    imgUrl: '',
                    mimeType: '',
                    selectedQty: detail.qty.toString(),
                    selectedDiscountValue: parseInt(detail.discount).toString(),
                    selectedDiscountType: parseInt(detail.discount) > 0 ? '2' : '',
                    selectedNotes: detail.notes
                },
                variant: variants,
            };
        });
        setSelectedItems(productDetails);
        // console.log(response.data.data)

        const mappedProductVariantOptionID = data.detailsVariant
          .filter(x => x.id !== '')
          .map(x => x.id);
        setSelectedProductVariantOptionIds(mappedProductVariantOptionID);

        }
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchPayment = async () => {
      try {
        const token = await AsyncStorage.getItem('userData'); 
        const Url = ApiUrls.getPayment;    
        if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(Url, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          const data: Payment[] = response.data.data;
          setPaymentData(data);
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem('userData');    
        const tempPrinter = await AsyncStorage.getItem('printerData'); 
        if (token) {
          if (tempPrinter) {
            const printerData = JSON.parse(tempPrinter ?? '')
            setCurrentPrinter(printerData)
          }

          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(ApiUrls.getCategory, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          let data: Categories[] = response.data.data;
          data = data.filter((x) => parseInt(x.totalItem) > 0)
          if (data.length > 0) fetchData(data[0].id)
          setCategoriesData(data);
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

      const openEditModal = (item: Product) => {
        setIsNewOpen(false)
        let selectedProduct = ''
        for (let index = 0; index < selectedItems.length; index++) {
          if (selectedItems[index].product.id == item.id) {
            selectedProduct = selectedItems[index].product.id
            setDetailData(selectedItems[index])
          }
        }
        fetchDetail(item.id)

        setSelectedItemForEdit(item);
        setEditModalVisible(true);
      };

      const openEditModalCart = (item: ProductDetail) => {
        setIsNewOpen(false)
        //fetchDetail(item.product.id)
        setDetailData(item)
        setSelectedItemForEdit(item.product);
        setEditModalVisible(true);
      };
    
      const closeEditModal = () => {
        setEditModalVisible(false);
        setSelectedItemForEdit(null);
      };

      const onOpenPayment = () => {
        fetchPayment()
        setIsOpenPayment(true);
        setTotalPriceState(calculateTotalPrice().totalPrice);
      };
    
      const onClosePayment = () => {
        setIsOpenPayment(false);
      };

      const onOpenConfirmation = () => {
        setIsOpenConfirmation(true);
      };

      const onCloseConfirmation = () => {
        setIsOpenConfirmation(false);
      };

      const onOpenOrder= () => {
        setIsOpenOrder(true);
      };
    
      const onCloseOrder = () => {
        setIsOpenOrder(false);
      };

      const onOpenTransaction= () => {
        fetchTransactionHistory()
        setIsOpenTransaction(true);
      };
    
      const onCloseTransaction = () => {
        setIsOpenTransaction(false);
      };

      const onSaveOrder = (name: string) => {
        setCustomerName(name)
        onCloseOrder()
      }

      const onOpenDiscount= () => {
        setIsOpenDiscount(true);

      };
    
      const onCloseDiscount = () => {
        setIsOpenDiscount(false);
        // setDiscountOverall()
      };

      const onSaveTransaction = async (data: TransactionForm) => {
        setLoadingSave(true)
        try {
          setLoadingSave(false)
          const token = await AsyncStorage.getItem('userData'); 
          const url = ApiUrls.saveTransaction
          if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.post(url, data, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          if (response.status === 200) {
            if (response.data.status) {
              Alert.alert('Success', response.data.message);
              setLoadingSave(false)
              onClosePayment()
              onCloseReceived()
              onCloseConfirmation()
              clearProduct()
              // fetchTransactionHistory()
              // onCloseConfirmation()
              // setDeleteMode(false)
              // fetchData(selectedCategory)

              if (data.isPaid == 'T') {
                if (currentPrinter) {
                  if (currentPrinter.macAddress != '') {
                    requestMultiple([PERMISSIONS.ANDROID.BLUETOOTH_CONNECT]).then(async (statuses) => {
                      if (statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] == 'granted') {

                        const transactionDetailUrl = ApiUrls.getTransactionDetail(response.data.data);    
                        const responseFetch = await axios.get(transactionDetailUrl, {
                          headers: {
                            'Authorization': `Bearer ${authToken}`
                          }
                        });           
                        const dataTransaction: TransactionDetail = responseFetch.data.data;
                        if (dataTransaction) {
                          let text = '';
                          if (dataTransaction.details.clientImage != '' && dataTransaction.details.clientImage != null) text = '[L]<img>' + dataTransaction.details.clientImage + '</img>\n';

                            text +=   "[L]<font size='big'>" + dataTransaction.details.clientName + "</font>\n" +
                                        '[L]\n' +
                                        "[L]Order: <u>" + dataTransaction.details.transactionNumber + "</u>\n" +
                                        '[L]' + dataTransaction.details.transactionDate + "\n" +
                                        '[C]================================\n' +
                                        '[L]\n';

                            if (dataTransaction.detailsProduct) {
                              for (let index = 0; index < dataTransaction.detailsProduct.length; index++) {
                                text += '[L]<b>' + dataTransaction.detailsProduct[index].productName + ' x' + dataTransaction.detailsProduct[index].qty +  '</b>[R]' + ' Rp' + parseInt(dataTransaction.detailsProduct[index].unitPrice).toLocaleString() + '\n';
                                if (parseInt(dataTransaction.detailsProduct[index].discount) > 0) {
                                  text += '[L]Discount: [R]-Rp' + parseInt(dataTransaction.detailsProduct[index].discount).toLocaleString() + '\n';
                                }
                                if (dataTransaction.detailsVariant) {
                                  const listVariant = dataTransaction.detailsVariant.filter(variant => variant.transactionProductID === dataTransaction.detailsProduct[index].transactionProductID)
                                  for (let x = 0; x < listVariant.length; x++) {
                                    text += '[L]' + listVariant[x].name + ': ' + listVariant[x].label + '[R]+Rp' +parseInt(listVariant[x].price).toLocaleString()+ '' + '\n';
                                  }
                                }
                                if (dataTransaction.detailsProduct[index].notes != '') text += '[L] Notes: ' + dataTransaction.detailsProduct[index].notes + '\n';
                              }
                            }

                        text += '[C]--------------------------------\n' +
                            '[L]SUBTOTAL: [R]Rp' + parseInt(dataTransaction.details.subTotal).toLocaleString() + '\n';
                           
                            if (parseInt(dataTransaction.details.discount) > 0) {
                              text += '[L]DISCOUNT: [R]-Rp' + parseInt(dataTransaction.details.discount).toLocaleString() + '\n';
                            }
                            text += '[L]TOTAL: [R]Rp' + parseInt(dataTransaction.details.totalPayment).toLocaleString() + '\n' +
                            '[L]PAYMENT: [R]' + dataTransaction.details.payment + '\n' +
                            '[L]PAID: [R]Rp' + parseInt(dataTransaction.details.paymentAmount).toLocaleString() + '\n' +
                            '[L]CHANGES: [R]Rp' + parseInt(dataTransaction.details.changes).toLocaleString() + '\n' +
                            '[L]\n' +
                            '[C]================================\n' +
                            '[C]THANK YOU\n' ;
                          await ThermalPrinterModule.printBluetooth({
                            payload: text,
                            printerNbrCharactersPerLine: 10,
                          });
                        }
                        
                      }
                    });
                  } else {
                    Alert.alert('Error', 'Printer is not connected, please connect to any Printer to Print Receipt');
                  }
                } else {
                  Alert.alert('Error', 'Printer is not connected, please connect to any Printer to Print Receipt');
                }
              }
              
              
            } else {
              Alert.alert('Error', response.data.message);
              setLoadingSave(false)
            }
          } else {
            Alert.alert('Error', 'Saving data failed');
            setLoadingSave(false)

          }
        }
        } catch (error) {
          console.error('Error during saving:', error);
          Alert.alert('Error', 'Something went wrong during saving data. Please try again.');
          setLoadingSave(false)

        }
    };
  
      const addToSelectedItems = (item: ProductDetail | null, selectedVariantIds: string[]) => {
        if (item) {
          if (!selectedItems.some(selectedItem => selectedItem.product.id === item.product.id)) {
            setSelectedItems(prevItems => [...prevItems, item]);
          }
      
          const siblingDataProductVariant = new Set(item.variant.map(x => x.productVariantOptionID));
          const updatedProductVariantIds = new Set(selectedProductVariantOptionIds.filter(prevId => !siblingDataProductVariant.has(prevId)));
          selectedVariantIds.forEach(id => updatedProductVariantIds.add(id));
          setSelectedProductVariantOptionIds([...updatedProductVariantIds]);

          const siblingDataVariant = new Set(item.variant.map(x => item.product.id + '~' + x.variantOptionID));
          const updatedVariantIds = new Set(selectedVariantOptionIds.filter(prevId => !siblingDataVariant.has(prevId)));
          for (let index = 0; index < selectedVariantIds.length; index++) {
            updatedVariantIds.add(item.product.id + '~' + item.variant.find((x) => x.productVariantOptionID == selectedVariantIds[index])?.variantOptionID)
          }
          setSelectedVariantOptionIds([...updatedVariantIds]);

          const siblingDataVariantLabel = new Set(item.variant.map(x => item.product.id + '~' + x.variantOptionID + '~' + x.label));
          const updatedVariantLabel = new Set(selectedVariantLabel.filter(prevId => !siblingDataVariantLabel.has(prevId)));
          for (let index = 0; index < selectedVariantIds.length; index++) {
            const refData = item.variant.find((x) => x.productVariantOptionID == selectedVariantIds[index])
            updatedVariantLabel.add(item.product.id + '~' + refData?.variantOptionID + '~' + refData?.label)
          }
          setSelectedVariantLabel([...updatedVariantLabel]);
          // console.log(updatedVariantLabel)

          const siblingDataVariantPrice = new Set(item.variant.map(x => item.product.id + '~' + x.variantOptionID + '~' + x.price));
          const updatedVariantPrice = new Set(selectedVariantLabel.filter(prevId => !siblingDataVariantPrice.has(prevId)));
          for (let index = 0; index < selectedVariantIds.length; index++) {
            const refData = item.variant.find((x) => x.productVariantOptionID == selectedVariantIds[index])
            updatedVariantPrice.add(item.product.id + '~' + refData?.variantOptionID + '~' + refData?.price)
          }
          // console.log(updatedVariantPrice)
          setSelectedVariantPrice([...updatedVariantPrice]);

          
        }
      };
    
      const removeFromSelectedItems = (item: ProductDetail) => {
        const filteredProduct = selectedItems.filter(x => x.product.id !== item.product.id);
        setSelectedItems(filteredProduct);

        const siblingData = item.variant.map(x => x.productVariantOptionID);
        const filteredIds = selectedProductVariantOptionIds.filter(prevId => !siblingData.includes(prevId));
        setSelectedProductVariantOptionIds(filteredIds);
      };

      const clearProduct = () => {
        setSelectedItems([])
        setSelectedProductVariantOptionIds([])
        setSelectedTransactionID('')
        setCustomerName('')
        setDiscountOverall({discountType:'', discountValue:'', isDiscount:'', discountDesc:''})
      };

      const calculateTotalPrice = () => {

        const { subtotal, discount} = selectedItems.reduce((acc, currentItem) => {
          const unitPrice = parseInt(currentItem.product.price) * parseInt(currentItem.product.selectedQty ?? '1');
          const variantPrice = currentItem.variant.reduce((variantTotal, variantItem) => {
            if (selectedProductVariantOptionIds.includes(variantItem.productVariantOptionID)) {
              return variantTotal + (parseInt(variantItem.price) * parseInt(currentItem.product.selectedQty ?? '1'));
            }
            return variantTotal;
          }, 0);
          const unitDiscount = parseInt(currentItem.product.selectedTotalDiscount ?? '0') * parseInt(currentItem.product.selectedQty ?? '1');
          
          return {
            subtotal: acc.subtotal + unitPrice + variantPrice,
            discount: acc.discount + unitDiscount,
          };
        }, { subtotal: 0, discount: 0 });
      
        {/* {discountOverall.isDiscount == '2' && (
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>Discount Overall</Text>
                <Text style={styles.totalPriceAmount}>{discountOverall.discountType == '2' ? `Rp ${discountOverall.discountValue}` : `${discountOverall.discountValue}%`}</Text>
              </View>
              )} */}

        const taxRate = 0.1;
        //const tax = (subtotal - discount) * taxRate;
        const tax = 0;
        let calcDiscountOverall = 0;
        if (discountOverall.isDiscount == '2') {
          if (discountOverall.discountType == '2') calcDiscountOverall = parseInt(discountOverall.discountValue);
          else {
            calcDiscountOverall = parseInt(((parseFloat(subtotal.toString()) * parseFloat(discountOverall.discountValue)) / parseFloat('100')).toString());
          }
        }
        const discountAll = discount + calcDiscountOverall;
        const totalPrice = (subtotal - discountAll) + tax;

      
        return {
          subtotal,
          tax,
          discount,
          totalPrice,
          discountAll
        };
      };

      const onOpenReceived = () => {
        setIsOpenReceived(true);
      };

      const onCloseReceived = () => {
        setIsOpenReceived(false);
      };

      const onClickTransactionHistory = (id: string) => {
        fetchTransactionDetail(id)
        onCloseTransaction()
      }

     

      const handleSaveDraft = () => {
        const updatedData: TransactionForm = {
          id: selectedTransactionID == '' ? '' : selectedTransactionID,
          action: selectedTransactionID == '' ? 'add' : 'edit',
          paymentID: '',
          customerName: customerName,
          subtotal: calculateTotalPrice().subtotal.toString(),
          discount: calculateTotalPrice().discount.toString(),
          tax: calculateTotalPrice().tax.toString(),
          totalPayment: calculateTotalPrice().totalPrice.toString(),
          paymentAmount: '0',
          changes: '0',
          isPaid: 'F',
          notes: '',
          productID: selectedItems.map(x => x.product.id).join(','),
          qty: selectedItems.map(x => x.product.selectedQty).join(','),
          unitPrice: selectedItems.map(x => parseInt(x.product.price).toString()).join(','),
          discountProduct: selectedItems.map(x => x.product.selectedTotalDiscount).join(','),
          notesProduct: selectedItems.map(x => x.product.selectedNotes).join(','),
          transactionProductIDVariant: selectedProductVariantOptionIds.join(','),
          variantOptionID: selectedVariantOptionIds.join(','),
          variantLabel: selectedVariantLabel.join(','),
          variantPrice: selectedVariantPrice.join(','),
        };
        //console.log(updatedData)
        onSaveTransaction(updatedData);
      };




      const addDiscountOverall = (isDiscount: string, type: string, value: string) => {
        setDiscountOverall((prevDiscountOverall) => ({
          ...prevDiscountOverall,
          isDiscount: isDiscount,
          discountType: type,
          discountValue: value,
          //discountDesc: desc
        }));
        onCloseDiscount()
      }


  const navigation = useNavigation();


React.useEffect(() => {
  if (isFocused) {
    fetchCategories();
    if (id !== '') {
      fetchTransactionDetail(id)
    }
  }
}, [isFocused]);


  return (
    <CommonLayout>
      <View style={{flexDirection:'row'}}>
        <View style={{width: '68%'}}>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, }}>
      <Text style={{fontWeight:"bold", marginVertical: "auto", color:'black'}}>Sales</Text>
      </View>
      <View style={{height:65}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal:"auto", flexDirection: 'row'}}>
        {categoriesData.map((x, index) => (
            <TouchableOpacity
            onPress={() => fetchData(x.id)} 
            key={index} 
            style={[
              styles.firstRowItem,
              {backgroundColor: x.bgColor}
              ]}>
            <View style={{marginBottom:5, marginLeft: 10}}>
            <Text style={{fontWeight: "bold", color: "white", fontSize: 13}}>{x.name}</Text>
            <Text style={{ color: "white", fontSize: 10}}>{x.totalItem} Item{parseInt(x.totalItem) > 0 ? 's' : ''}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
      <ScrollView>
    <View style={{ alignItems: 'center', marginBottom:85, marginLeft:10, width:'100%', flexDirection:'row', flexWrap:"wrap", marginTop:5,}}>
      {productData.map((x) => (
        <TouchableOpacity 
        disabled={x.qty < 1}
        key={x.id} 
        style={x.qty < 1 ? [styles.card, { backgroundColor: 'black', opacity:0.5, zIndex:0, borderRadius:5 }] : styles.card}
        onPress={() => openEditModal(x)}>
        
          {x.qty < 1 && (
            <View style={{ position:'absolute', zIndex:1, alignItems:'center', bottom:'50%', left:'20%'}}>
              <Text style={{color:'white', alignSelf:'center', textAlign:'center', backgroundColor:'black', padding:5, fontSize:10 }}>Out of Stock</Text>
            </View>
          )}
          <Image source={x.imgUrl !== '' ? { uri: x.imgUrl } : require('../../assets/img/no-image.png')} style={styles.image} />
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{x.name}</Text>
          <Text style={styles.price}>Rp {parseInt(x.price).toLocaleString()}</Text>
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>

    </View>



        {/* Side Container */}

{selectedItems.length > 0 ? (
    <View style={styles.selectedItemsContainer}>
      <View>
      <Text style={{fontSize:8, marginTop:4, marginBottom: 4, marginHorizontal:10,  color:'black'}}>{getCurrentDate()}</Text>
      <View style={{flexDirection:'row', alignItems:'center', marginTop:7, gap:2}}>
            <TouchableOpacity onPress={()=>onOpenTransaction()}>
              <ReceiptSVG width='24' height='24' color='#828282' />
            </TouchableOpacity>
                        <View
                        style={{
                            backgroundColor: customerName,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width: '50%',
                            height:24
                        }}>
                        <TextInput
                            editable
                            placeholder='Customer Name'
                            maxLength={40}
                            onChangeText={text => 
                                setCustomerName(text)
                            }
                            value={customerName}
                            style={{paddingLeft: 10, paddingVertical:1, fontSize:10}}
                        />
                    </View>  
                    <TouchableOpacity style={{marginLeft: 4}} onPress={handleSaveDraft}>
                      <SaveSVG width='25' height='25' color='#828282' />
                    </TouchableOpacity>

            {/* <TouchableOpacity onPress={()=> onOpenDiscount()}>
              <View style={{ marginRight:4}} >
                <DiscountSVG width='24' heigth='24'/>
              </View>
            </TouchableOpacity> */}
            
          </View>

          <ScrollView style={{maxHeight:(dimensions.window.height / 3)}}>
            <View style={{ }}>
        {selectedItems.map((item) => (
        <View key={item.product.id} style={styles.selectedItem}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', maxWidth: 150  }}>{item.product.name} x {item.product.selectedQty}</Text>
            <Text style={{ fontSize: 10, marginLeft: 5 }}>Rp {parseInt(item.product.price ?? '0').toLocaleString()}</Text>
            
          </View>
          { parseInt(item.product.selectedTotalDiscount ?? '0') > 0 && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
              <Text style={{ fontSize: 8,  maxWidth: 150  }}>Discount</Text>
              <Text style={{ fontSize: 8, marginLeft: 5 }}>-Rp {parseInt(item.product.selectedTotalDiscount ?? '0').toLocaleString()}</Text>
            </View>
          )}
          {
            item.variant.filter((x) => selectedProductVariantOptionIds.includes(x.productVariantOptionID)).map((x, index)=>(
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                <Text style={{fontSize: 9}}>{x.name}: {x.label}</Text>
                <Text style={{ fontSize: 9, marginLeft: 5 }}>{parseInt(x.price) == 0 ? 'Free' : ('Rp' + parseInt(x.price).toLocaleString())} </Text>
              </View>
            ))
          }
          <View style={{marginTop: 4}}><Text style={{fontSize: 9}}>Note {item.product.selectedNotes == '' ? '-' : item.product.selectedNotes}</Text></View>

          <View style={{flexDirection:'row', gap:4, justifyContent:'flex-end'}}>
          <TouchableOpacity onPress={() => openEditModalCart(item)} style={{marginTop:5, marginRight: 16}}>
          <PencilSVG width='16' heigth='16' color='grey'/>
           
          </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFromSelectedItems(item)} style={{marginTop:5, marginRight: 8}}>
            <TrashSVG width='16' height='16' color='red'/>
              </TouchableOpacity>
          </View>
        </View>
        ))}
         </View>

        </ScrollView>

        </View>

        <ScrollView style={{height: '100%'}}>
        <View style={{}}>
          {dimensions.window.height > 500 && (
            <View>
            <View style={styles.underline}/>
            <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>Subtotal</Text>
                <Text style={styles.totalPriceAmount}>Rp {calculateTotalPrice().subtotal.toLocaleString()}</Text>
              </View>
              {/*<View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>Tax (10%)</Text>
                <Text style={styles.totalPriceAmount}>Rp {calculateTotalPrice().tax.toLocaleString()}</Text>
          </View>*/}
              { calculateTotalPrice().discountAll > 0 && (
                <View style={styles.totalPriceContainer}>
                  <Text style={styles.totalPriceText}>Discount</Text>
                  <Text style={styles.totalPriceAmount}>-Rp {calculateTotalPrice().discountAll.toLocaleString()}</Text>
                </View>
              ) }
            {/* {discountOverall.isDiscount == '2' && (
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>Discount Overall</Text>
                <Text style={styles.totalPriceAmount}>{discountOverall.discountType == '2' ? `Rp ${discountOverall.discountValue}` : `${discountOverall.discountValue}%`}</Text>
              </View>
              )} */}
              
              <View style={styles.dottedUnderline} />
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>Total</Text>
                <Text style={styles.totalPriceAmount}>Rp {calculateTotalPrice().totalPrice.toLocaleString()}</Text>
              </View>
              </View>

              
          )}
          
          
          <TouchableOpacity style={styles.payNowButton} onPress={()=> onOpenPayment()}>
            <Text style={styles.payNowButtonText}>Pay Now</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => clearProduct()} style={styles.billButton}>
            <Text style={styles.billButtonText}>Clear</Text>
          </TouchableOpacity>

          {selectedTransactionID !== '' && (
          <TouchableOpacity onPress={() => onOpenConfirmation()} style={styles.billButton}>
              <Text style={styles.billButtonText}>Delete Transaction</Text>
          </TouchableOpacity>
          )}
        </View>
        </ScrollView>

      </View>
      ):(
        <View style={styles.selectedItemsContainerBlank}>
        <View>
          <View style={{flexDirection:'row', alignItems:'center',  marginHorizontal:10, marginTop:10, gap:5}}>
            <TouchableOpacity onPress={()=>onOpenTransaction()}>
              <ReceiptSVG width='24' height='24' color='#828282' />
            </TouchableOpacity>
            <View
                        style={{
                            backgroundColor: '#fff',
                            borderColor: '#fff',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width: '90%',
                            height:20
                        }}>
                        <TextInput
                            editable={false}
                        />
                    </View>  
          </View>

          </View>
          <View style={{marginHorizontal:8, marginTop:'25%' }}>
                <CartSVG width='100' height='100' color='#A4A4A4'/>
                <Text style={{fontWeight:'bold', textAlign:'center', color:'black', marginTop:10, marginLeft:16}}> Empty Cart</Text>
                <Text style={{textAlign:'center', color:'black', marginTop:10, marginLeft:16}}>Add Product to the cart from catalog.</Text>
          </View>

  
        </View>
      )} 


        {/* Side Container */}

    </View>
    <EditItemModal isNewOpen={isNewOpen} isVisible={isEditModalVisible} selectedItem={detailData} selectedProductVariantID={selectedProductVariantOptionIds} onClose={closeEditModal} onSave={addToSelectedItems} />

    <PaymentMethodModal
    onSave={onSaveTransaction} 
    isVisible={isOpenPayment} 
    totalPrice={totalPriceState} 
    onClose={onClosePayment} 
    discountOverall={discountOverall} 
    data={paymentData}
    transactionID={selectedTransactionID}
    
    isOpenReceived={isOpenReceived}
    onOpenReceived={onOpenReceived}
    onCloseReceived={onCloseReceived}
    loadingSave={loadingSave}

    customerName={customerName}
    subtotal={calculateTotalPrice().subtotal.toString()}
    discount={calculateTotalPrice().discountAll.toString()}
    tax={calculateTotalPrice().tax.toString()}
    totalPayment={calculateTotalPrice().totalPrice.toString()}
    productID={selectedItems.map(x => x.product.id).join(',')}
    qty={selectedItems.map(x => x.product.selectedQty).join(',')}
    unitPrice={selectedItems.map(x => parseInt(x.product.price).toString()).join(',')}
    discountProduct={selectedItems.map(x => x.product.selectedTotalDiscount).join(',')}
    notesProduct={selectedItems.map(x => x.product.selectedNotes).join(',')}
    // transactionProductID={selectedItems.map(x => x.product.id).join(',')}
    transactionProductIDVariant={selectedProductVariantOptionIds.join(',')}
    variantOptionID={selectedVariantOptionIds.join(',')}
    variantLabel={selectedVariantLabel.join(',')}
    variantPrice={selectedVariantPrice.join(',')}
    />

    <EditOrderModal isVisible={isOpenOrder} onClose={onCloseOrder} name={customerName} onSave={onSaveOrder} />
    <DiscountModal isVisible={isOpenDiscount} onClose={onCloseDiscount} selectedIDs={selectedItems.map((x) => x.product.id)} onAdd={addDiscountOverall} discountOverallValue={discountOverall} />
    <TransactionModal isVisible={isOpenTransaction} onClose={onCloseTransaction} data={transactionData.filter((x => x.isPaid == '0'))} onClick={onClickTransactionHistory} />
    <ConfirmationModal isVisible={isOpenConfirmation} onClose={onCloseConfirmation} selectedID={selectedTransactionID} onSave={onSaveTransaction} />


    </CommonLayout>
  )
}

const styles = StyleSheet.create({
  firstRowItem: {
    backgroundColor:"blue",
    justifyContent: 'flex-end',
    width:140, 
    height:55, 
    borderRadius:10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.3,  
    shadowRadius: 4,  
    elevation: 4,
    margin: 3,
  },
  scrollView: {
    flexDirection: 'row',
    marginTop:10
  },
  card: {
    marginRight: 6,
    // borderWidth: 0.5,
    marginBottom:10,
    width:105, 
    height:120, 
    // borderRadius:7,
    borderColor:'#D2D2D2', 
  },
  cardRowSkeleton: {
    marginRight: 6,
    borderWidth: 0.5,
    marginBottom:10,
    width:105, 
    height:120, 
    borderRadius:7,
    backgroundColor:'#D2D2D2', 
  },
  image: {
    width: '100%',
    height: '60%',
    borderRadius:5,
    marginBottom:3

  },
  title: {
    textAlign: 'center',
    fontSize: 10,
  },
  price: {
    fontSize:10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedItemsContainer: {
    marginVertical: 5,
    width: '34%',
    padding: 10,
    borderRadius: 10,
    minHeight: '100%',
    backgroundColor: '#FFF',
    shadowColor: '#000',
     height:300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 5,
justifyContent: 'space-between'
  },
  selectedItemsContainerBlank: {
    marginVertical: 20,
    width: '34%',
    borderRadius: 10,
    minHeight: '100%',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 5,
    alignItems:'center'
  },
  selectedItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dotted',  },
    deleteButton: {
    padding: 5,
    borderRadius: 5,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  totalPriceText: {
    marginTop: 4,
  },
  totalPriceAmount: {
    fontWeight: 'bold',
  },
  payNowButton: {
    backgroundColor: '#2563EB',
    padding: 2,
    borderRadius: 8,
    width: '95%',
    marginTop: 20,
    height: 32,
    alignSelf: 'center',
    alignItems:'center',
    marginBottom:5
  },
  payNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  billButton: {
    borderColor: '#dfdfdf',
    marginTop: 4,
    borderWidth: 1,
    padding: 2,
    borderRadius: 8,
    width: '95%',
    height: 32,
    alignSelf: 'center',
    alignItems:'center',
    marginBottom:5
  },
  billButtonText: {
    color: 'black',
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#D2D2D2',
    marginBottom: 5,
    marginHorizontal:5
  },
  dottedUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dotted',
    marginBottom: 5,
    marginHorizontal:5,
    marginTop: 8,
  },
});

export default Sales