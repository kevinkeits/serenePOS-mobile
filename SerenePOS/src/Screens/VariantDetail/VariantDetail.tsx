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





export interface Coffee {
    id: number;
    title: string;
    price: number;
    image: string;
  }

  interface CustomImagePickerResponse extends ImagePickerResponse {
    uri?: string;
    error?: string;
  }

  interface CategoryOption {
    label: string;
    value: string;
  }

  interface Option {
    optionName: string;
    price: string;
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

const VariantDetail = () => {

    const [coffeeData, setCoffeeData] = React.useState<Coffee[]>([]);
    const [textName, setTextName] = React.useState('');
    const [ selectedType, setSelectedType] = React.useState("");
    const [ selectedCategory, setSelectedCategory] = React.useState("");
    const [options, setOptions] = React.useState<Option[]>([]);
    const [isOpenProduct, setIsOpenProduct] = React.useState(false);
    const [selectedProducts, setSelectedProducts] = React.useState<Coffee[]>([]);





  const [selectedOptionIds, setSelectedOptionIds] = React.useState<string[]>([]);
  const [servingInputValues, setServingInputValues] = React.useState<string[]>(temperatureOptions.map(() => ''));
  const [isServingSubmitting, setIsServingSubmitting] = React.useState(false); 

  const [selectedSugarIds, setSelectedSugarIds] = React.useState<string[]>([]);
  const [sugarInputValues, setSugarInputValues] = React.useState<string[]>(sugarOptions.map(() => ''));
  const [isSugarSubmitting, setIsSugarSubmitting] = React.useState(false); 

  const [selectedAddOnIds, setSelectedAddOnIds] = React.useState<string[]>([]);
  const [addOnInputValues, setAddOnInputValues] = React.useState<string[]>(sugarOptions.map(() => ''));
  const [isAddOnSubmitting, setIsAddOnSubmitting] = React.useState(false); 

  

  const onOpenProduct = () => {
    setIsOpenProduct(true);
  };

  const onCloseProduct = () => {
    setIsOpenProduct(false);
  };
 

  const handleTextInputChange = (id: string, text: string) => {
    setServingInputValues((prevValues) => {
      const index = temperatureOptions.findIndex((option) => option.id === id);
      const newValues = [...prevValues];
      newValues[index] = text;
      return newValues;
    });
  };


  const handleOptionChange = (id: string) => {
    setSelectedOptionIds((prevIds) => {
      if (prevIds.includes(id)) {
        // If the ID is already in the array, remove it
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        // If the ID is not in the array, add it
        return [...prevIds, id];
      }
    });
  };

  const handleTextInputSugarChange = (id: string, text: string) => {
    setSugarInputValues((prevValues) => {
      const index = sugarOptions.findIndex((option) => option.id === id);
      const newValues = [...prevValues];
      newValues[index] = text;
      return newValues;
    });
  };


  const handleOptionSugarChange = (id: string) => {
    setSelectedSugarIds((prevIds) => {
      if (prevIds.includes(id)) {
        // If the ID is already in the array, remove it
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        // If the ID is not in the array, add it
        return [...prevIds, id];
      }
    });
  };

  const handleTextInputAddOnChange = (id: string, text: string) => {
    setAddOnInputValues((prevValues) => {
      const index = addOnOptions.findIndex((option) => option.id === id);
      const newValues = [...prevValues];
      newValues[index] = text;
      return newValues;
    });
  };


  const handleOptionAddOnChange = (id: string) => {
    setSelectedAddOnIds((prevIds) => {
      if (prevIds.includes(id)) {
        // If the ID is already in the array, remove it
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        // If the ID is not in the array, add it
        return [...prevIds, id];
      }
    });
  };

  const handleAddOption = () => {
    setOptions([...options, { optionName: '', price: '' }]);
  };

  const handleDeleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleOption = (index: number, field: keyof Option, value: string) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const onSaveProducts = (selectedData: Coffee[]) => {
    setSelectedProducts(selectedData)
    setIsOpenProduct(false);
  }
 
    

    const navigation = useNavigation();


    const fetchData = async () => {
        try {
          const response = await axios.get('https://fakestoreapi.com/products?limit=12');
          const data: Coffee[] = response.data;
          setCoffeeData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const categoryOptions: CategoryOption[] = [
        { label: 'Category 1', value: 'category1' },
        { label: 'Category 2', value: 'category2' },
        { label: 'Category 3', value: 'category3' },
        // Add more categories as needed
      ];

     

    


    React.useEffect(() => {
        fetchData();
      }, []);

  return (
    <CommonLayout>
      <View style={{}}>
      <View style={{flexDirection: 'row', gap:10,  marginLeft:10, marginRight:30, marginVertical:10, alignItems:'center'}}>
        {/* <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Text style={{fontSize:12, fontWeight:'bold', color:'black'}}>&lt;--</Text>
        </TouchableOpacity> */}
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Add Variant</Text>
      </View>
      <View style={{}}>
       
        <View style={{width:'100%',}}>

        <View style={{marginHorizontal:10, marginVertical:5, flexDirection:'row', width:'90%', justifyContent:'center', alignItems:'center'}}>
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

        <View style={{marginHorizontal:10, marginVertical:5, flexDirection:'row', width:'90%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Type</Text>
            <View style={{marginBottom: 10, height: 25, justifyContent: 'center', width:'80%',}}>
            <RNPickerSelect
                onValueChange={(x) => setSelectedType(x)}
                items={[
                    { label: "Single Selection", value: "1" },
                    { label: "Multi Selection", value: "2" },
                ]}

                  useNativeAndroidPickerStyle={false}
                  Icon={() => {
                    return <View style={{marginTop:2}}><DropdownSVG width='11' height='11' color='black' /></View>;
                  }}
               style={pickerSelectStyles}
            
            />


            </View>        
        </View>

{(selectedType == '1' || selectedType == '2') && (
  <View>
        <View style={{marginHorizontal:10, marginVertical:5, flexDirection:'row', width:'90%', justifyContent:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Options</Text>
                    <View style={{width:'80%'}}>
                        <TouchableOpacity onPress={handleAddOption} style={styles.addButton}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>

                        {options.map((option, index) => (
                            <View key={index} style={styles.optionRow}>
                            <TextInput
                                style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'65%', height:25, borderColor: '#D2D2D2', borderWidth: 0.5, borderRadius:5}}
                                placeholder="Option Name"
                                value={option.optionName}
                                onChangeText={(text) => handleOption(index, 'optionName', text)}
                            />
                            <TextInput
                                style={{paddingLeft: 10, paddingVertical:5, fontSize:8, width:'30%', height:25, borderColor: '#D2D2D2', borderWidth: 0.5, borderRadius:5}}
                                placeholder="Price"
                                value={option.price}
                                onChangeText={(text) => handleOption(index, 'price', text)}
                            />
                           
                            <TouchableOpacity onPress={() => handleDeleteOption(index)} style={{ justifyContent:'center', alignItems:'center', borderColor:'red'}}>
                                <TrashSVG width='20' height='20' color='red'/>
                            </TouchableOpacity>             
                        </View>
                     ))}
                    </View>       
        </View>

        <View style={{borderBottomWidth:0.5, borderBottomColor:'grey', marginVertical:10}}/>

        <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", color:'black'}}>Choose Product</Text>
        <View style={{marginHorizontal:10, marginVertical:5, flexDirection:'row', width:'90%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Category</Text>
            <View style={{ height: 25, justifyContent: 'center', width:'60%',}}>

            </View>
            <View style={{width:'20%', alignSelf:'center', backgroundColor:'#2563EB', justifyContent:'center', alignItems:'center', height:25, borderRadius:6, marginLeft:5}}>
                    <TouchableOpacity onPress={()=> onOpenProduct()} style={{width:'100%' }}>
                      <Text style={{fontSize:8, color:'white', textAlign:'center'}}>Select Product</Text>
                    </TouchableOpacity>
            </View>

        </View>
        <View style={{flexDirection:'row', gap:10, flexWrap:'wrap'}}>
          {selectedProducts.map((x, index)=> (
            <View key={index} style={{width:60, height:100}}>
              <View style={{width:60, height:60}}>
                    <Image source={{ uri: x.image }} style={{width:'100%', height:'100%'}} />
              </View>
              <Text style={{fontSize:8, fontWeight:'bold', maxWidth:'95%', color:'black'}} numberOfLines={1} ellipsizeMode="tail">{x.title}</Text>
            </View>
          ))}
        </View>
    </View>
        )}

        <View style={{margin:10, width:'90%',  }}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5}}>
                        <Text style={{fontSize:10, color:'white', fontWeight:'500'}}>Save</Text>
                    </TouchableOpacity>     

                    <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginVertical:10, justifyContent:'center', alignItems:'center', borderWidth:0.5, borderColor: '#D2D2D2', padding:4, borderRadius:5}}>
                        <Text style={{fontSize:10, color:'black', fontWeight:'500'}}>Cancel</Text>
                    </TouchableOpacity>       
        </View>

        </View>
      </View>

      

      </View>
      <ProductModal isVisible={isOpenProduct} data={coffeeData} onClose={onCloseProduct} onSave={onSaveProducts}/>

      
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

export default VariantDetail