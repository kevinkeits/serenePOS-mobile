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








export interface Coffee {
    id: number;
    title: string;
    price: number;
    image: string;
  }



  interface CategoryOptions {
    label: string;
    value: string;
  }

  interface GroupedVariant {
    [danamete: string]: selVariantProduct[];
  }

  const temperatureOptions = [
    { id: 'hot', label: 'Hot' },
    { id: 'ice', label: 'Ice' },
    // Add more options as needed
  ];

  const sugarOptions = [
    { id: 'normal', label: 'Normal' },
    { id: 'moreSugar', label: 'More Sugar' },
    { id: 'lessSugar', label: 'Less Sugar' },
    // Add more options as needed
  ];

  const addOnOptions = [
    { id: 'sugarSyrup', label: 'Sugar Syrup' },
    { id: 'bobba', label: 'Bobba' },
    { id: 'grassJelly', label: 'Grass Jelly' },
    { id: 'milk', label: 'Milk' },
    { id: 'cheese', label: 'Cheese' },
    // Add more options as needed
  ];

  // type DetailScreenProps = {
  //   route: { params: {  data: ProductDetail | null } };
  // };

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
    const [quantity, setQuantity] = React.useState(1);
    const [arrCategoryPicker, setArrCategoryPicker] =  React.useState<CategoryOptions[]>([]);
    const [ selCategory, setSelCategory ] = React.useState("");

    const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);

  const [selectedVariantIds, setSelectedVariantIds] = React.useState<string[]>([]);
  const [variantInputValues, setVariantInputValues] = React.useState<string[]>(detailData?.variant.map(() => '') ?? []); 
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isSelectedOptions, setIsSelectedOptions] = React.useState<string[]>([]);

  const [categoriesData, setCategoriesData] = React.useState<Categories[]>([]);
  const [groupedVariants, setGroupedVariants] = React.useState({});



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
    paymentConfirmationFileName: '',
    paymentConfirmationFileData: '',
  });


  const fetchData = async (id: string) => {
    try {
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
        console.log(response.data.data)
        if (id !== '') {
        if (data) {
          setTextProductSKU(data.product.productSKU)
          setTextName(data.product.name)
          setTextPrice(parseInt(data.product.price).toString())
          setSelCategory(data.product.categoryID)
          setQuantity(data.product.qty)
          setTextDescription(data.product.notes)
          if (data.variant) {
            const variantOptionIDs = data.variant.map((x) => x.variantOptionID);
            setSelectedVariantIds(data.variant.map((x) => x.variantOptionID));
            setIsSelectedOptions(Array.from({ length: variantOptionIDs.length }, () => 'T'));
      
            setVariantInputValues(data.variant.map((x) =>parseInt(x.price).toLocaleString())); 
          }
        }
        setDetailData(data);
      }
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
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(ApiUrls.getCategory, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });           
        const data: Categories[] = response.data.data;
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
        // Registration successful
        Alert.alert('Success', response.data.message);
        onCloseConfirmation()
        // fetchData()
      } else {
        // Registration failed
        Alert.alert('Error', response.data.message);
      }
    }
    } catch (error) {
      console.error('Error during saving:', error);
      console.log(JSON.stringify(error))
      Alert.alert('Error', 'Something went wrong during saving data. Please try again.');
    }
};

const handleSave = () => {
  const updatedData: ProductForm = {
    id: id !== '' ? id : '',
    action: id !== '' ? 'edit' : 'add',
    name: textName,
    notes: textDescription,
    qty: quantity,
    price: parseInt(textPrice),
    categoryID: selCategory,
    productSKU: textProductSKU,
    fileName: form.paymentConfirmationFileName,
    fileData: form.paymentConfirmationFileData,
    variantOptionID: id !== '' ? detailData?.variant.map((x: any)=> x.variantOptionID).join(',') : '',
    isSelected: isSelectedOptions.join(','),
    productVariantOptionID: id !== '' ? detailData?.variant.map((x: any)=> x.variantID).join(',') : '',
  };
  console.log(updatedData)
  onSave(updatedData);
  navigation.navigate('Products' as never) 
};

const renderTransactionByName = () => {
  const groupedVariants: GroupedVariant = {};

  detailData?.variant.forEach(x => {
    const name = x.name
    if (!groupedVariants[name]) {
      groupedVariants[name] = [];
    }
    groupedVariants[name].push(x);
  });

  return Object.keys(groupedVariants).map(name => (
    <View key={name} style={{flexDirection:'row', marginLeft:10}}>
      <View style={{width:'25%'}}>
        <Text style={{ fontSize: 10, color: 'black' }}>{name}</Text>
      </View>
      <View style={{marginBottom:10}}>
      {groupedVariants[name].map((name, index) => (
         <View key={name.variantOptionID} style={styles.rowContainer}>
         <TouchableOpacity
           style={styles.checkboxContainer}
           activeOpacity={1}
           onPress={() => handleVariantOptionChange(name.variantOptionID)}
         >
           <View style={styles.checkbox}>
             {selectedVariantIds.includes(name.variantOptionID) && 
               <Text style={{ fontSize: 12, color: 'white', backgroundColor:'blue', width: 20,
               height: 20,
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
           value={variantInputValues[index]}
           onChangeText={(text) => handleVariantInputTextChange(name.variantOptionID, text)}
           editable={selectedVariantIds.includes(name.variantOptionID) && !isSubmitting}
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
        // Only allow numeric values
        const numericValue = text.replace(/[^0-9]/g, '');
        setTextPrice(numericValue);
      };
  

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };
    
      const decrementQuantity = () => {
        // if (quantity > 1) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        // }
      };
    

      
    
      const handleUpload = async () => {
        try {
          const res = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.images],
          });
    
          const fs = await RNFS.readFile(res.uri, 'base64');
    
          setForm((prev) => ({
            ...prev,
            paymentConfirmationFileName: res.name || '',
            paymentConfirmationFileData: `data:${res.type};base64,${fs}`,
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
      <Text onPress={() => navigation.navigate('Products' as never)} style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'#D2D2D2'}}>Product</Text>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'#D2D2D2'}}>&gt;</Text>
      <Text   style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>{id !== '' ? 'Edit' : ' Add'} Product</Text>
      </View>
      {/* <View style={{flexDirection: 'row', gap:10,  marginLeft:10, marginRight:30, marginVertical:10, alignItems:'center'}}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Text style={{fontSize:10, fontWeight:'bold', color:'black'}}>&lt;--</Text>
        </TouchableOpacity>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>{id !== '' ? 'Edit' : ' Add'} Product</Text>
      </View> */}
      <View style={{flexDirection:'row', gap:6}}>
        <View style={{width:'25%',  alignItems:'center'}}>
          {detailData && detailData.product.imgUrl ? (
            <View style={{paddingLeft:8}}>
                {form.paymentConfirmationFileData ? (
                 <Image
                 source={{ uri: form.paymentConfirmationFileData }}
                 style={{ width: 120, height: 100, borderRadius:7 }}
               />
                ) : (
              
                  <Image
                  source={{ uri: detailData.product.imgUrl }}
                  style={{ width: 120, height: 100, borderRadius:7 }}
                />
                )}

                <TouchableOpacity onPress={handleUpload} style={{justifyContent:'center',  width: 120, alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5, marginTop:7}}>
                                  <Text style={{fontSize:8, color:'white', fontWeight:'500'}}>Upload Image</Text>
                </TouchableOpacity>   
              </View>
              ):(
                <View style={{paddingLeft:8}}>
                {form.paymentConfirmationFileData ? (
                  <Image
                    source={{ uri: form.paymentConfirmationFileData }}
                    style={{ width: 120, height: 100, borderRadius:7 }}
                  />
                ) : (
                  <View style={{ width: 120, height: 100, borderWidth:0.5, borderColor:'grey', borderRadius:7 }}>
      
                  </View>
                )}
      
                <TouchableOpacity onPress={handleUpload} style={{justifyContent:'center',  width: 120, alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5, marginTop:7}}>
                                  <Text style={{fontSize:8, color:'white', fontWeight:'500'}}>Upload Image</Text>
                </TouchableOpacity>   
              </View>
          )}



        </View>
        <View style={{width:'85%',}}>
        <View style={{marginHorizontal:10, marginBottom:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Product SKU</Text>
                    <View
                        style={{
                            backgroundColor: textProductSKU,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width:'80%'
                        }}>
                        <TextInput
                            editable={true}
                            // multiline
                            // numberOfLines={4}
                            maxLength={40}
                            onChangeText={text => setTextProductSKU(text)}
                            value={textProductSKU}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%', height:25}}
                        />
                    </View>          
        </View>
        <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Name</Text>
                    <View
                        style={{
                            backgroundColor: textName,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width:'80%'
                        }}>
                        <TextInput
                            editable
                            // multiline
                            // numberOfLines={4}
                            placeholder='Type here'
                            maxLength={40}
                            onChangeText={text => setTextName(text)}
                            value={textName}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{ marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Category</Text>
            <View style={{flex: 1,
            justifyContent: 'center',
            height:25,
            width:'100%',
            }}>

            <RNPickerSelect
                onValueChange={(x) => setSelCategory(x)}
                items={arrCategoryPicker}
                useNativeAndroidPickerStyle={false}
                value={selCategory}
                Icon={() => {
                  return <View style={{marginTop:2}}><DropdownSVG width='11' height='11' color='black' /></View>;
                }}
             style={pickerSelectStyles}
            
            />


            </View>        
        </View>

        <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Qty</Text>
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
        </View>

        <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Price</Text>
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
                            // multiline
                            // numberOfLines={4}
                            placeholder='Type here'
                            maxLength={40}
                            keyboardType="numeric"
                            onChangeText={onChangePrice}
                            value={textPrice}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{marginHorizontal:10, marginVertical:8, flexDirection:'row', width:'80%',  }}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Descriptions</Text>
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
                            // maxLength={40}
                            onChangeText={text => setTextDescription(text)}
                            value={textDescription}
                            style={{paddingLeft: 10, paddingVertical:3, fontSize:8, width:'80%', textAlignVertical: 'top',}}
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
                    <TouchableOpacity onPress={handleSave} style={{justifyContent:'center', alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5}}>
                        <Text style={{fontSize:8, color:'white', }}>Save</Text>
                    </TouchableOpacity>     
                  {detailData && (
                    <TouchableOpacity onPress={()=> onOpenConfirmation()} style={{flexDirection:'row', gap:5, marginVertical:10, justifyContent:'center', alignItems:'center', borderWidth:0.5, borderColor: 'red', padding:4, borderRadius:5}}>
                        <TrashSVG width='12' height='12' color='red'/>
                        <Text style={{fontSize:8, color:'black',}}>Remove Product</Text>
                    </TouchableOpacity>   
                  )}    
        </View>

        </View>

      </View>



      

      </View>
      </ScrollView>

      <ConfirmationModal isVisible={isOpenConfirmation} selectedData={detailData} onClose={onCloseConfirmation} />

      
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
        padding:7,
        height:25,
        borderRadius: 3,
        
        marginHorizontal: 5,
      },
      quantityBorder: {
        borderWidth: 0.5,
       borderColor: '#D2D2D2',
        width:'100%',
        height:25,
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
      },
      quantityText: {
        fontSize: 10,
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
        width:50
      },
      checkbox: {
        width: 20,
        height: 20,
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
        fontSize: 8,
        width:50,
        color:'black'
      },
      servingInput: {
        height: 25,
        width: '60%',
        borderColor: 'gray',
        paddingVertical:5,
        paddingLeft: 8,
        fontSize: 8,
        borderRadius:7,
        marginLeft:20
      },

  variantInput: {
    height: 25,
    width: '40%',
    borderColor: 'gray',
    paddingVertical: 5,
    paddingLeft: 8,
    fontSize: 8,
    borderRadius: 7,
    marginLeft: 20,
  },
    
  });

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: '#D2D2D2',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 8,
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