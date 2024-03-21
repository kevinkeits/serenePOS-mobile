import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput, Switch } from 'react-native'
import TrashSVG from '../../assets/svgs/TrashSVG'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import RNFS from 'react-native-fs';

import { Picker } from '@react-native-picker/picker'
import RNPickerSelect from "react-native-picker-select";
import ImagePicker, { ImageLibraryOptions, ImagePickerResponse  } from 'react-native-image-picker';
import DropdownSVG from '../../assets/svgs/DropdownSVG'
import ProductModal from './ProductModal/ProductModal'
import { Variant, VariantDetailProps, VariantForm } from '../Variant/Variant'
import { Product } from '../Products/Products'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiUrls } from '../../apiUrls/apiUrls'
import { Categories } from '../Categories/Categories'
import { v4 as uuidv4 } from 'uuid'



export interface Coffee {
    id: number;
    title: string;
    price: number;
    image: string;
  }

  interface CategoryOption {
    label: string;
    value: string;
  }

  export interface OptionsVariant {
    id: string;
    label: string;
    price: string;
  }

  export interface SelectedProduct {
    id: string;
    name: string;
    imgUrl: string
  }

  // type DetailScreenProps = {
  //   route: { params: {  data: Variants | null } };
  // };

  type DetailScreenProps = {
    route: { params: {  id: string } };
  };


const VariantDetail = ({ route }: DetailScreenProps) => {

    const  { id }  = route.params

    const [detailData, setDetailData] = React.useState<VariantDetailProps | null>(null);
    const [productData, setProductData] = React.useState<Product[]>([]);

    const [textName, setTextName] = React.useState('');
    const [ selectedType, setSelectedType] = React.useState('1');
    const [ selectedCategory, setSelectedCategory] = React.useState("");
    const [options, setOptions] = React.useState<OptionsVariant[]>([]);
    const [isOpenProduct, setIsOpenProduct] = React.useState(false);
    const [selectedProducts, setSelectedProducts] = React.useState<SelectedProduct[]>([]);
    const [categoriesData, setCategoriesData] = React.useState<Categories[]>([]);
    const [selectedOptionIDsDelete, setSelectedOptionIDsDelete] = React.useState<string[]>([]);



  

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
          if (data){
          fetchProduct(data[0].id)
          setCategoriesData(data);
          }
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  const fetchProduct = async (categoryID: string) => {
    try {
      const token = await AsyncStorage.getItem('userData'); 
      const urls = ApiUrls.getProduct(categoryID);    
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(urls, {
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

  const fetchData = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem('userData'); 
      const categoryDetailUrl = ApiUrls.getVariantDetail(id);    
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(categoryDetailUrl, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });           
        const data: VariantDetailProps = response.data.data;
        if (id !== '') {
        if (data) {
          setTextName(data.details.name)
          setSelectedType(data.details.type)
          setOptions(data.options)
          setSelectedProducts(data.product)
          setDetailData(data);
          }
          
        }
      }
       else {
        console.error('No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onSave = async (data: VariantForm) => {
    try {
      const token = await AsyncStorage.getItem('userData'); 
      const url = ApiUrls.saveVariant
      if (token) {
      const authToken = JSON.parse(token).data.Token
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        if (response.data.status) {
          navigation.navigate('Variants' as never)   
        } else {
          Alert.alert('Error', response.data.message);
        }
      }
    }
    } catch (error) {
      console.error('Error during saving:', error);
      Alert.alert('Error', 'Something went wrong during saving data. Please try again.');
    }
};

const handleSave = () => {
  const updatedData: VariantForm = {
    id: id !== '' ? id : '',
    action: id !== '' ? 'edit' : 'add',
    name: textName,
    type: selectedType,
    optionID: options.map((option) => option.id).join(','), // Extracting option IDs
    optionLabel: options.map((option) => option.label).join(','), // Extracting option labels
    optionPrice: options.map((option) => option.price).join(','), // Extracting option prices
    productID: selectedProducts.map((product) => product.id).join(','), // Extracting product IDs
    optionIDDelete: id !== '' ? selectedOptionIDsDelete.join(',') : '', // No need for mapping here
  };
  onSave(updatedData);
};


  const onOpenProduct = () => {
    setIsOpenProduct(true);
  };

  const onCloseProduct = () => {
    setIsOpenProduct(false);
  };
 

  const handleAddOption = () => {
    const newId = uuidv4({ random: [0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36] });

    setOptions([...options, {id: '', label: '', price: '0' }]);
  };

  // const handleDeleteOption = (index: number) => {
  //   const newOptions = [...options];
  //   newOptions.splice(index, 1);
  //   setOptions(newOptions);
  // };

  const handleDeleteOption = (index: number) => {
    const deletedOption = options[index];
    setSelectedOptionIDsDelete([...selectedOptionIDsDelete, deletedOption.id]);
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleOption = (index: number, field: keyof OptionsVariant, value: string) => {
    if (field == 'price' && isNaN(Number(value))) {
      // If value is not a valid number, handle it accordingly
      // For example, you can set a default value or leave the field unchanged
      // console.warn('Value must be a valid number. Field will remain unchanged.');
      return; // Exit the function early
    }
  
    const newOptions = [...options];
    // Update the specific field in the option object with the numeric value
    newOptions[index][field] = field == 'price' ? value.toString().trim() : value.toString(); // Convert numeric value back to string
    setOptions(newOptions);
  };

  const onSaveProducts = (selectedData: SelectedProduct[]) => {
    if (selectedData){
    setSelectedProducts(selectedData)
    setIsOpenProduct(false);
    }
  }
 
    const navigation = useNavigation();


    const categoryOptions: CategoryOption[] = [
      { label: 'Category 1', value: 'category1' },
      { label: 'Category 2', value: 'category2' },
      { label: 'Category 3', value: 'category3' },
      // Add more categories as needed
    ];


    React.useEffect(() => {
      fetchData(id)
      //fetchCategories()
      fetchProduct('')
      }, []);

  return (
    <CommonLayout>
      <ScrollView>
      <View style={{}}>
      <View style={{flexDirection: 'row', gap:10,   marginRight:30, marginVertical:10, alignItems:'center'}}>
      <Text onPress={() => navigation.navigate('Variants' as never)} style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'#D2D2D2'}}>Variant</Text>
      <Text style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'#D2D2D2'}}>&gt;</Text>
      <Text   style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>{id !== '' ? 'Edit' : ' Add'} Variant</Text>
      </View>

      <View style={{}}>
       
        <View style={{width:'100%',}}>

        <View style={{marginHorizontal:10, marginVertical:5, flexDirection:'row', width:'90%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ marginBottom:5, width:'20%'}}>Name</Text>
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
                            style={{paddingLeft: 10, paddingVertical:0, width:'80%', height:32}}
                        />
                    </View>          
        </View>

        {/* <View style={{marginHorizontal:10, marginVertical:5, flexDirection:'row', width:'90%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{marginBottom:5, width:'20%'}}>Type</Text>
            <View style={{marginBottom: 10, height: 32, justifyContent: 'center', width:'80%',}}>
            <RNPickerSelect
                onValueChange={(x) => 
                  setSelectedType(x)}
                items={[
                    { label: "Single Selection", value: "1" },
                    { label: "Multi Selection", value: "2" },
                ]}

                  useNativeAndroidPickerStyle={false}
                  value={selectedType}
                  Icon={() => {
                    return <View style={{marginTop:2}}><DropdownSVG width='11' height='11' color='black' /></View>;
                  }}
               style={pickerSelectStyles}
            
            />



            </View>        
        </View> */}

{(selectedType == '1' || selectedType == '2') && (
  <View>
        <View style={{marginHorizontal:10, marginVertical:5, flexDirection:'row', width:'90%', justifyContent:'center'}}>
                    <Text style={{marginBottom:5, width:'20%'}}>Options</Text>
                    <View style={{width:'80%'}}>
                        <TouchableOpacity onPress={handleAddOption} style={styles.addButton}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>

                        {options.map((option, index) => (
                            <View key={index} style={styles.optionRow}>
                            <TextInput
                                style={{paddingLeft: 10, paddingVertical:0, width:'65%', height:32, borderColor: '#D2D2D2', borderWidth: 0.5, borderRadius:5}}
                                placeholder="Option Name"
                                value={option.label}
                                onChangeText={(text) => handleOption(index, 'label', text)}
                            />

          <View style={{ position: 'relative', width: '30%' }}>
                <TextInput
                    style={{ paddingLeft: 10, paddingVertical: 5, width: '100%', height: 32, borderColor: '#D2D2D2', borderWidth: 0.5, borderRadius: 5 }}
                    placeholder="Price"
                    value={'Rp ' + parseInt(option.price.toString())}
                    onChangeText={(text) => handleOption(index, 'price', text.replace('Rp', ''))}
                    keyboardType="numeric"
                />
            </View>
                            <TouchableOpacity onPress={() => handleDeleteOption(index)} style={{ justifyContent:'center', alignItems:'center', borderColor:'red'}}>
                                <TrashSVG width='20' height='20' color='red'/>
                            </TouchableOpacity>             
                        </View>
                     ))}
                    </View>       
        </View>

        <View style={{borderBottomWidth:0.5, borderBottomColor:'grey', marginVertical:10}}/>

        <Text style={{fontWeight:"bold", marginVertical: "auto", color:'black'}}>Linked Product</Text>
        <View style={{marginHorizontal:10, marginVertical:5, flexDirection:'row', width:'100%', justifyContent:'center', alignItems:'center'}}>
            <View style={{ height: 25, justifyContent: 'center', width:'60%',}}>

            </View>
            <View style={{width:'20%', alignSelf:'center', backgroundColor:'#2563EB', justifyContent:'center', alignItems:'center', height:25, borderRadius:6, marginLeft:5, marginBottom:10}}>
                    <TouchableOpacity onPress={()=> onOpenProduct()} style={{width:'100%', alignItems:'center'}}>
                      <Text style={{color:'white', textAlign:'center', alignSelf:'center'}}>Select Product</Text>
                    </TouchableOpacity>
            </View>

        </View>
        <View style={{flexDirection:'row', gap:10, flexWrap:'wrap'}}>
          {selectedProducts.map((x, index)=> (
            <View key={index} style={{width:110, height:100}}>
              <View style={{width:95, height:85,  marginBottom:5}}>
                    <Image source={x.imgUrl !== '' ? { uri: x.imgUrl } : require('../../assets/img/no-image.png')} style={{width:'100%', height:'100%', borderRadius:5}} />
              </View>
              <Text style={{fontSize:10, maxWidth:'95%', textAlign:'center'}} numberOfLines={1} ellipsizeMode="tail">{x.name}</Text>
            </View>
          ))}
        </View>
    </View>
        )}

        <View style={{margin:10, width:'90%',  }}>
                    <TouchableOpacity onPress={handleSave} style={{justifyContent:'center', alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5}}>
                        <Text style={{color:'white', fontWeight:'500'}}>Save</Text>
                    </TouchableOpacity>     

                    <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginVertical:10, justifyContent:'center', alignItems:'center', borderWidth:0.5, borderColor: '#D2D2D2', padding:4, borderRadius:5}}>
                        <Text style={{color:'black', fontWeight:'500'}}>Cancel</Text>
                    </TouchableOpacity>       
        </View>

        </View>
      </View>

      

      </View>
      </ScrollView>
      <ProductModal isVisible={isOpenProduct} data={productData} onClose={onCloseProduct} onSave={onSaveProducts} selectedData={selectedProducts}/>

      
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
        fontSize: 12,
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
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#2563EB',
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
        width:50,
        color:'black'
      },
      servingInput: {
        height: 25,
        width: '60%',
        borderColor: 'gray',
        paddingVertical:5,
        paddingLeft: 8,
        borderRadius:7,
        marginLeft:20
      },
      addButton: {
        backgroundColor: '#2563EB',
        borderRadius: 5,
        marginBottom: 10,
        justifyContent:'center',
        width:25,
        height:25
      },
      optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap:5,
      },
      deleteButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
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

export default VariantDetail