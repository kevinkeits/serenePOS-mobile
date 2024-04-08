import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput, Switch, Button } from 'react-native'
import TrashSVG from '../../assets/svgs/TrashSVG'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'

import { Picker } from '@react-native-picker/picker'
import RNPickerSelect from "react-native-picker-select";
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import DropdownSVG from '../../assets/svgs/DropdownSVG'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'
import { Product, ProductDetail, ProductForm, selVariantProduct } from '../Products/Products'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiUrls } from '../../apiUrls/apiUrls'
import { Categories } from '../Categories/Categories'
import { initialProductFormdata, ProductSchema } from './constants'
import {useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


  interface CategoryOptions {
    label: string;
    value: string;
  }

  export interface GroupedVariant {
    [danamete: string]: selVariantProduct[];
  }


  type DetailScreenProps = {
    route: { params: {  id: string} };
  };


  
  
const DetailProduct = ({ route }: DetailScreenProps) => {

  const  { id }  = route.params

    const [detailData, setDetailData] = React.useState<ProductDetail | null>(null);
    const [textProductSKU, setTextProductSKU] = React.useState('');
    const [textName, setTextName] = React.useState('');
    const [textDescription, setTextDescription] = React.useState('');
    const [textPrice, setTextPrice] = React.useState('');
    const [textQty, setTextQty] = React.useState(1);
    const [quantity, setQuantity] = React.useState(1);
    const [arrCategoryPicker, setArrCategoryPicker] =  React.useState<CategoryOptions[]>([]);
    const [ selCategory, setSelCategory ] = React.useState("");
    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);
    const [selectedVariantIds, setSelectedVariantIds] = React.useState<string[]>([]);
    const [variantInputValues, setVariantInputValues] = React.useState<string[]>([]); 
    const [variantIds, setVariantIds] = React.useState<string[]>([]); 
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const [isSelectedOptions, setIsSelectedOptions] = React.useState<string[]>([]);

  const [categoriesData, setCategoriesData] = React.useState<Categories[]>([]);
  const [groupedVariants, setGroupedVariants] = React.useState({});

  const [errorProductSKU, setErrorProductSKU] = React.useState('');
const [errorName, setErrorName] = React.useState('');
const [errorPrice, setErrorPrice] = React.useState('');
const [errorQty, setErrorQty] = React.useState('');
const [errorDescription, setErrorDescription] = React.useState('');
const [errorCategory, setErrorCategory] = React.useState('');




  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: initialProductFormdata,
    // resolver: yupResolver(ProductSchema),
  })


  const [form, setForm] = React.useState({
    // Your other form fields
    fileName: '',
    fileData: '',
  });


  const fetchData = async (id: string) => {
    try {
      if (id != '') {
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
          if (data) {
            setTextProductSKU(data.product.productSKU)
            setTextName(data.product.name)
            setTextPrice(parseInt(data.product.price).toString())
            setSelCategory(data.product.categoryID)
            setQuantity(data.product.qty)
            setTextQty(data.product.qty)
            setTextDescription(data.product.notes)
            if (data.variant) {
              const variantOptionIDs = data.variant.map((x) => x.variantOptionID);
              setSelectedVariantIds(data.variant.filter((x) => x.isSelected == 'T').map((x) => x.variantOptionID));
              //setIsSelectedOptions(Array.from({ length: variantOptionIDs.length }, () => 'T'));
              setIsSelectedOptions(data.variant.map((x) => x.isSelected));
              setVariantIds(variantOptionIDs)
              setVariantInputValues(data.variant.map((x) => 'Rp ' + parseInt(x.price).toLocaleString())); 
            }
          }
          setDetailData(data);
        }
        } else {
          console.error('No token found in AsyncStorage');
        }
      } else {
        setTextPrice('0')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = await AsyncStorage.getItem('userData');     
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(ApiUrls.getCategory, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });           
        const data: Categories[] = response.data.data;
        //data = data.filter((x) => parseInt(x.totalItem) > 0)
        setCategoriesData(data);

        const modifiedData = data.map(category => ({
          label: category.name,
          value: category.id
      }));
      setArrCategoryPicker(modifiedData)

      } else {
        console.error('No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onSave = async (data: ProductForm) => {
    try {
      setIsSubmitting(true)
      const token = await AsyncStorage.getItem('userData'); 
      const url = ApiUrls.saveProduct
      if (token) {
      const authToken = JSON.parse(token).data.Token
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        if (response.data.status) {
          setIsSubmitting(false)
          onCloseConfirmation()
          navigation.goBack()
        } else {
          setIsSubmitting(false)
          Alert.alert('Error', response.data.message);
        }
      } else {
        setIsSubmitting(false)
        Alert.alert('Error', response.data.message);
      }
    }
    } catch (error) {
      setIsSubmitting(false)
      console.error('Error during saving:', error);
      Alert.alert('Error', 'Something went wrong during saving data. Please try again.');
    }
};

// const handleSave = () => {
//   const updatedData: ProductForm = {
//     id: id !== '' ? id : '',
//     action: id !== '' ? 'edit' : 'add',
//     name: textName,
//     notes: textDescription,
//     qty: quantity,
//     price: parseInt(textPrice),
//     categoryID: selCategory,
//     productSKU: textProductSKU,
//     fileName: form.fileName,
//     fileData: form.fileData,
//     variantOptionID: id !== '' ? detailData?.variant.map((x: any)=> x.variantOptionID).join(',') : '',
//     isSelected: isSelectedOptions.join(','),
//     productVariantOptionID: id !== '' ? detailData?.variant.map((x: any)=> x.productVariantOptionID).join(',') : '',
//   };
//   onSave(updatedData);
// };

const handleSave = () => {
  let isValid = true;
  setErrorProductSKU('');
  setErrorName('');
  setErrorPrice('');
  setErrorCategory('');
  setErrorQty('');
  // setErrorDescription('');

  // if (!textProductSKU.trim()) {
  //   setErrorProductSKU('Product SKU cannot be empty.');
  //   isValid = false;
  // }

  if (!textName.trim()) {
    setErrorName('Name cannot be empty.');
    isValid = false;
  }

  if (!textPrice || parseInt(textPrice) === 0) {
    setErrorPrice('Price cannot be empty.');
    isValid = false;
  }

  if (!textQty || textQty === 0) {
    setErrorQty('Qty cannot be empty.');
    isValid = false;
  }

  if (!selCategory) {
    setErrorCategory('Please select a category.');
    isValid = false;
  }

  

  // if (!textDescription.trim()) {
  //   setErrorDescription('Description cannot be empty.');
  //   isValid = false;
  // }

  if (!isValid) {
    return;
  }

  const updatedData: ProductForm = {
    id: id !== '' ? id : '',
    action: id !== '' ? 'edit' : 'add',
    name: textName,
    notes: textDescription,
    qty: textQty,
    price: parseInt(textPrice),
    categoryID: selCategory,
    productSKU: textProductSKU,
    fileName: form.fileName,
    fileData: form.fileData,
    variantOptionID: id !== '' ? detailData?.variant.map((x: any)=> x.variantOptionID).join(',') : '',
    isSelected: isSelectedOptions.join(','),
    productVariantOptionID: id !== '' ? detailData?.variant.map((x: any)=> x.productVariantOptionID).join(',') : '',
  };

  //console.log(updatedData)
  if (!isSubmitting) onSave(updatedData); 
};


const renderTransactionByName = () => {
  const groupedVariants: GroupedVariant = {};

  detailData?.variant.forEach(x => {
    const name = x.variantID
    if (!groupedVariants[name]) {
      groupedVariants[name] = [];
    }
    groupedVariants[name].push(x);
  });

  return Object.keys(groupedVariants).map(variantID => (
    <View key={variantID} style={{flexDirection:'row', marginLeft:10}}>
      <View style={{width:'20%'}}>
        <Text style={{ }}>{detailData?.variant.find((x) => x.variantID == variantID)?.name}</Text>
      </View>
      <View style={{marginBottom:10}}>
      {groupedVariants[variantID].map((name, index) => (
         <View key={name.productVariantOptionID} style={styles.rowContainer}>
         <TouchableOpacity
           style={styles.checkboxContainer}
           activeOpacity={1}
           onPress={() => handleVariantOptionChange(name.variantOptionID)}
         >
           <View style={styles.checkbox}>
             {selectedVariantIds.includes(name.variantOptionID) && 
               <Text style={{ color: 'white', backgroundColor:'#2563EB', width: 28,
               height: 28,
               borderRadius: 4, textAlign:'center' }}>✔</Text>
             }
           </View>
           <Text style={styles.checkboxLabel}>{name.label}</Text>
         </TouchableOpacity>
   
         <TextInput
           style={[
             styles.variantInput,
             {
               opacity: selectedVariantIds.includes(name.variantOptionID) ? 1 : 0.5,
               backgroundColor: selectedVariantIds.includes(name.variantOptionID) ? '#F5F6FF' : '#D2D2D2',
             },
           ]}
           placeholder={`Enter value for ${name.label}`}
           value={variantInputValues[variantIds.indexOf(name.variantOptionID)]}
           //onChangeText={(text) => handleVariantInputTextChange(name.variantOptionID, text)}
           //editable={selectedVariantIds.includes(name.variantOptionID) && !isSubmitting}
           editable={false}
         />
       </View>
      ))}
      </View>
    </View>
  ));
};




      const onOpenConfirmation= () => {
        setIsOpenConfirmation(true);
      };
    
      const onCloseConfirmation = () => {
        setIsOpenConfirmation(false);
      };

      const onChangePrice = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setTextPrice(numericValue);
        setErrorPrice('');
      };

      const onChangeQty = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setTextQty(parseInt(numericValue));
        setErrorQty('');
      };


  

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };
    
      const decrementQuantity = () => {
       
          setQuantity((prevQuantity) => prevQuantity - 1);
       
      };
    

      
    
      const handleUpload = async () => {
        try {
          const res = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.images],
          });
    
          const fs = await RNFS.readFile(res.uri, 'base64');
    
          setForm((prev) => ({
            ...prev,
            fileName: res.name || '',
            fileData: `data:${res.type};base64,${fs}`,
          }));
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            console.log('Document picking was cancelled.');
          } else {
            console.error('Error while picking document:', err);
            // You can handle the error as per your application's requirements
          }
        }
      };
    
    

    const navigation = useNavigation();


    // const handleVariantOptionChange = (id: string) => {
    //   setSelectedVariantIds((prevIds) => {
    //     if (prevIds.includes(id)) {
    //       // If the ID is already in the array, remove it
    //       return prevIds.filter((prevId) => prevId !== id);
    //     } else {
    //       // If the ID is not in the array, add it
    //       return [...prevIds, id];
    //     }
    //   });
    // };
    const handleVariantOptionChange = (id: string) => {
      // Calculate the updated selectedVariantIds
      let updatedSelectedVariantIds: string[];
      if (selectedVariantIds.includes(id)) {
        // If the ID is already in the array, remove it
        updatedSelectedVariantIds = selectedVariantIds.filter((prevId) => prevId !== id);
      } else {
        // If the ID is not in the array, add it
        updatedSelectedVariantIds = [...selectedVariantIds, id];
      }
    
      // Update selectedVariantIds state immediately
      setSelectedVariantIds(updatedSelectedVariantIds);
    
      // Calculate updated isSelectedOptions immediately
      setIsSelectedOptions((prevOptions) => {
        if (!detailData) {
          // If detailData is null, return the previous options
          return prevOptions;
        }
    
        const updatedOptions = detailData.variant.map((variant) => {
          // Check if the variant's ID is present in updatedSelectedVariantIds
          return updatedSelectedVariantIds.includes(variant.variantOptionID) ? 'T' : 'F';
        });
    
        return updatedOptions;
      });
    };

      const handleVariantInputTextChange = (id: string, text: string) => {
        if (detailData) {
        setVariantInputValues((prevValues) => {
          const index = detailData.variant.findIndex((x) => x.variantOptionID === id);
          const newValues = [...prevValues];
          newValues[index] = text;
          return newValues;
        });
      }
      }; 


    React.useEffect(() => {
      fetchData(id)
      fetchCategories()
      
      }, []);

  return (
    <CommonLayout>
      <ScrollView>
      <View style={{}}>
      <View style={{flexDirection: 'row', gap:10,   marginRight:30, marginVertical:10, alignItems:'center'}}>
      <Text onPress={() => navigation.navigate('Products' as never)} style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'#D2D2D2'}}>Product</Text>
      <Text style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'#D2D2D2'}}>&gt;</Text>
      <Text   style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>{id !== '' ? 'Edit' : ' Add'} Product</Text>
      </View>
      <View style={{flexDirection:'row', gap:6}}>
        <View style={{width:'25%',  alignItems:'center'}}>
          {detailData && detailData.product.imgUrl ? (
            <View style={{paddingLeft:8}}>
                {form.fileData ? (
                 <Image
                 source={{ uri: form.fileData }}
                 style={{ width: 120, height: 100, borderRadius:7 }}
               />
                ) : (
              
                  <Image
                  source={{ uri: detailData.product.imgUrl }}
                  style={{ width: 120, height: 100, borderRadius:7 }}
                />
                )}

                <TouchableOpacity onPress={handleUpload} style={{justifyContent:'center',  width: 120, alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5, marginTop:7}}>
                                  <Text style={{color:'white', fontWeight:'500'}}>Upload Image</Text>
                </TouchableOpacity>   
              </View>
              ):(
                <View style={{paddingLeft:8}}>
                {form.fileData ? (
                  <Image
                    source={{ uri: form.fileData }}
                    style={{ width: 120, height: 100, borderRadius:7 }}
                  />
                ) : (
                  <Image
                  source={require('../../assets/img/no-image.png')}
                  style={{ width: 120, height: 100, borderRadius:7 }}
                />
                )}
      
                <TouchableOpacity onPress={handleUpload} style={{justifyContent:'center',  width: 120, alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5, marginTop:7}}>
                                  <Text style={{color:'white', fontWeight:'500'}}>Upload Image</Text>
                </TouchableOpacity>   
              </View>
          )}



        </View>
        <View style={{width:'85%'}}>
        {/* <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ marginBottom:5, width:'20%'}}>Product SKU</Text>
                    <View
                        style={{
                            backgroundColor: textProductSKU,
                            width:'80%'
                        }}>
                        <TextInput
                            editable
                            placeholder='Type here'
                            maxLength={50}
                            onChangeText={text => {
                              setTextProductSKU(text);
                              setErrorProductSKU('');
                            }}
                            value={textProductSKU}
                            style={{paddingLeft: 10, paddingVertical:2, width:'100%', height:32, borderColor: '#D2D2D2', borderWidth: 0.5,borderRadius:5,
                          }}
                        />
                        {errorProductSKU.length > 0 && <Text style={{ color: 'red' }}>{errorProductSKU}</Text>}
                    </View>          
        </View> */}

        <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ marginBottom:5, width:'20%'}}>Name</Text>
                    <View
                        style={{
                            backgroundColor: textName,
                            width:'80%'
                        }}>
                        <TextInput
                            editable
                            placeholder='Type here'
                            maxLength={50}
                            onChangeText={text => {
                              setTextName(text);
                              setErrorName('');
                            }}
                            value={textName}
                            style={{paddingLeft: 10, paddingVertical:2, width:'100%', height:32, borderColor: '#D2D2D2', borderWidth: 0.5,borderRadius:5,
                          }}
                        />
                        {errorName.length > 0 && <Text style={{ color: 'red' }}>{errorName}</Text>}
                    </View>          
        </View>

        <View style={{ marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
            <Text style={{marginBottom:5, width:'20%'}}>Category</Text>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              height: 32,
              width: '100%',
            }}>
              <RNPickerSelect
                onValueChange={(value) => {
                  setSelCategory(value);
                  setErrorCategory(''); // Clear error when a category is selected
                }}
                items={arrCategoryPicker}
                useNativeAndroidPickerStyle={false}
                value={selCategory}
                Icon={() => {
                  return <View style={{marginTop: 6}}><DropdownSVG width='11' height='11' color='black' /></View>;
                }}
                style={pickerSelectStyles}
              />
              {errorCategory.length > 0 && <Text style={{ color: 'red', marginTop: 5 }}>{errorCategory}</Text>}
            </View>
        </View>

        {/* <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{marginBottom:5, width:'20%'}}>Qty</Text>
                <View style={{flexDirection: 'row', justifyContent:'space-between', }}>

            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
                <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.quantityBorder}>
                <Text style={styles.quantityText}>{quantity}</Text>
                </View>
                <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
                <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>

          </View>         
        </View> */}

    <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ marginBottom:5, width:'20%'}}>Qty</Text>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            width:'80%'
                        }}>
                        <TextInput
                            editable
                            placeholder='Type here'
                            // maxLength={40}
                            keyboardType="numeric"
                            onChangeText={
                              onChangeQty
                            }
                            value={textQty.toString()}
                            style={{paddingLeft: 10, paddingVertical:2, width:'100%', height:32, borderColor: '#D2D2D2', borderWidth: 0.5,borderRadius:5,
                          }}
                        />
                        {errorQty.length > 0 && <Text style={{ color: 'red' }}>{errorQty}</Text>}
                    </View>          
        </View>

        {/* <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{marginBottom:5, width:'20%'}}>Price</Text>
                    <View
                        style={{
                            backgroundColor: textPrice,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width:'80%'
                        }}>
                        <TextInput
                            editable
                            placeholder='Type here'
                            maxLength={40}
                            keyboardType="numeric"
                            onChangeText={onChangePrice}
                            value={textPrice != '0' ? textPrice : ''}
                            style={{paddingLeft: 10, paddingVertical:0, width:'80%', height:32}}
                        />
                    </View>          
        </View> */}

        <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ marginBottom:5, width:'20%'}}>Price</Text>
                    <View
                        style={{
                            backgroundColor: textPrice,
                            width:'80%'
                        }}>
                        <TextInput
                            editable
                            placeholder='Type here'
                            // maxLength={40}
                            keyboardType="numeric"
                            onChangeText={
                              onChangePrice
                            }
                            value={textPrice != '0' ? textPrice : ''}
                            style={{paddingLeft: 10, paddingVertical:2, width:'100%', height:32, borderColor: '#D2D2D2', borderWidth: 0.5,borderRadius:5,
                          }}
                        />
                        {errorPrice.length > 0 && <Text style={{ color: 'red' }}>{errorPrice}</Text>}
                    </View>          
        </View>

        <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%',  }}>
                    <Text style={{ marginBottom:5, width:'20%'}}>Description</Text>
                    <View
                        style={{
                            backgroundColor: textDescription,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width:'80%'
                        }}>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={6}
                            placeholder='Type here'
                            maxLength={100}
                            onChangeText={text => setTextDescription(text)}
                            value={textDescription}
                            style={{paddingLeft: 10, paddingVertical:3, width:'80%', textAlignVertical: 'top',}}
                        />
                    </View>          
        </View>

        {/* {detailData && (
          <View>
  {detailData.variant.map((x, index) => (
    <View key={x.variantOptionID} style={styles.rowContainer}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        activeOpacity={1}
        onPress={() => handleVariantOptionChange(x.variantOptionID)}
      >
        <View style={styles.checkbox}>
          {selectedVariantIds.includes(x.variantOptionID) && 
            <Text style={{ fontSize: 12, color: 'white', backgroundColor:'blue', width: 20,
            height: 20,
            borderRadius: 4, textAlign:'center' }}>✔</Text>
          }
        </View>
        <Text style={styles.checkboxLabel}>{x.label}</Text>
      </TouchableOpacity>

      <TextInput
        style={[
          styles.variantInput,
          {
            opacity: selectedVariantIds.includes(x.variantOptionID) ? 1 : 0.5,
            backgroundColor: selectedVariantIds.includes(x.variantOptionID) ? '#F5F6FF' : '#D2D2D2',
          },
        ]}
        placeholder={`Enter value for ${x.label}`}
        value={variantInputValues[index]}
        onChangeText={(text) => handleVariantInputTextChange(x.variantOptionID, text)}
        editable={selectedVariantIds.includes(x.variantOptionID) && !isSubmitting}
      />
    </View>
  ))}
</View>
        )} */}

        <View>
          {renderTransactionByName()}
        </View>


        <View style={{marginHorizontal:10, marginVertical:8, width:'80%',  }}>
                    <TouchableOpacity onPress={handleSave} style={{justifyContent:'center', alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5, height: 32}}>
                        <Text style={{color:'white', }}>Save</Text>
                    </TouchableOpacity>     
                    <TouchableOpacity onPress={()=> navigation.goBack()} style={{flexDirection:'row', gap:5, marginVertical:10, justifyContent:'center', alignItems:'center', borderWidth:0.5, borderColor: '#dfdfdf', padding:4, borderRadius:5, height: 32}}>
                        <Text style={{color:'black',}}>Cancel</Text>
                    </TouchableOpacity>   
        </View>

        </View>

      </View>



      

      </View>
      </ScrollView>


      
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
    firstRowItem: {
      backgroundColor:"blue",
      justifyContent: 'flex-end',
      width:120, 
      height:70, 
      borderRadius:10, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 8 }, 
      shadowOpacity: 0.3,  
      shadowRadius: 4,  
      elevation: 4,
      margin: 5,
    },
    scrollView: {
      flexDirection: 'row',
      //marginTop:10
    },
    quantityContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        //marginBottom: 10,
        width:'80%'
      },
      quantityButton: {
        backgroundColor: '#2563EB',
        padding:8,
        height:32,
        width: 32,
        borderRadius: 3,
        marginHorizontal: 5,
      },
      quantityBorder: {
        borderWidth: 0.5,
       borderColor: '#D2D2D2',
        width:'100%',
        height:32,
        //padding: 5,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 5,
        // marginHorizontal: 5,
      },
      quantityButtonText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 5,
        marginBottom: 3
      },
      quantityText: {
        fontWeight: 'bold',
      },
      dropdownButton: {
        borderWidth: 1,
        padding: 10,
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        width:'30%'
      },
      checkbox: {
        width: 28,
        height: 28,
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor:'#D2D2D2',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkboxInner: {
        width: 12,
        height: 12,
        borderRadius: 3,
        backgroundColor: '#2563EB',
      },
      checkboxLabel: {
        marginLeft: 8,
        //fontSize: 8,
        //width:'30%',
        color:'black'
      },
      servingInput: {
        height: 28,
        width: '30%',
        borderColor: 'gray',
        paddingVertical:5,
        paddingLeft: 8,
        borderRadius:7,
        marginLeft:20
      },

  variantInput: {
    height: 32,
    width: '40%',
    borderColor: 'gray',
    paddingVertical: 5,
    paddingLeft: 8,
    borderRadius: 7,
    marginLeft: 20,
    color: 'black'
  },
    
  });

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: '#D2D2D2',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: '#D2D2D2',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 5,
        right: 15,
      },
      
});

export default DetailProduct