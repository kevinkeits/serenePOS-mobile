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

const DetailProduct = () => {

    const [coffeeData, setCoffeeData] = React.useState<Coffee[]>([]);
    const [textProductSKU, setTextProductSKU] = React.useState('');
    const [textName, setTextName] = React.useState('');
    const [textDescription, setTextDescription] = React.useState('');
    const [textPrice, setTextPrice] = React.useState('');
    const [quantity, setQuantity] = React.useState(1);
    const [selectedCategory, setSelectedCategory] =  React.useState<CategoryOption | null>(null);
    const [ language, setLanguage ] = React.useState("");
  const [selectedOptionIds, setSelectedOptionIds] = React.useState<string[]>([]);
  const [servingInputValues, setServingInputValues] = React.useState<string[]>(temperatureOptions.map(() => ''));
  const [isServingSubmitting, setIsServingSubmitting] = React.useState(false); 

  const [selectedSugarIds, setSelectedSugarIds] = React.useState<string[]>([]);
  const [sugarInputValues, setSugarInputValues] = React.useState<string[]>(sugarOptions.map(() => ''));
  const [isSugarSubmitting, setIsSugarSubmitting] = React.useState(false); 

  const [selectedAddOnIds, setSelectedAddOnIds] = React.useState<string[]>([]);
  const [addOnInputValues, setAddOnInputValues] = React.useState<string[]>(sugarOptions.map(() => ''));
  const [isAddOnSubmitting, setIsAddOnSubmitting] = React.useState(false); 

  const [form, setForm] = React.useState({
    // Your other form fields
    paymentConfirmationFileName: '',
    paymentConfirmationFileData: '',
  });
  

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

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };
    
      const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        }
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
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Add Products</Text>
      </View>
      <View style={{flexDirection:'row', gap:6}}>
        <View style={{width:'25%',  alignItems:'center'}}>

        <View style={{paddingLeft:8}}>


          {form.paymentConfirmationFileData ? (
            <Image
              source={{ uri: form.paymentConfirmationFileData }}
              style={{ width: 130, height: 100, borderRadius:7 }}
            />
          ) : (
            <View style={{ width: 130, height: 100, borderWidth:0.5, borderColor:'grey', borderRadius:7 }}>

            </View>
          )}

          <TouchableOpacity onPress={handleUpload} style={{justifyContent:'center',  width: 130, alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5, marginTop:7}}>
                            <Text style={{fontSize:8, color:'white', fontWeight:'500'}}>Upload Image</Text>
          </TouchableOpacity>   
                {/* <Text>File Name: {form.paymentConfirmationFileName}</Text> */}
        </View>

        </View>
        <View style={{width:'85%',}}>
        <View style={{marginHorizontal:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Product SKU</Text>
                    <View
                        style={{
                            backgroundColor: '#D2D2D2',
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width:'80%'
                        }}>
                        <TextInput
                            editable={false}
                            // multiline
                            // numberOfLines={4}
                            maxLength={40}
                            onChangeText={text => setTextProductSKU(text)}
                            value={textProductSKU}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%', height:25}}
                        />
                    </View>          
        </View>
        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
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

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Category</Text>
            <View style={{flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#D2D2D2',
            borderWidth:0.5,
            borderRadius:5,
            height:25
            }}>

            <RNPickerSelect
                onValueChange={(language) => setLanguage(language)}
                items={[
                    { label: "JavaScript", value: "JavaScript" },
                    { label: "TypeScript", value: "TypeScript" },
                    { label: "Python", value: "Python" },
                    { label: "Java", value: "Java" },
                    { label: "C++", value: "C++" },
                    { label: "C", value: "C" },
                ]}
                style={{
                    inputAndroid: {
                      fontSize: 8, // Adjust the font size as needed
                      color: 'black', // Set the text color
                    },
                    inputIOS: {
                      fontSize: 8,
                      color: 'black',
                    },
                  }}
            //   style={pickerSelectStyles}
            
            />


            </View>        
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
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

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
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
                            onChangeText={text => setTextPrice(text)}
                            value={textPrice}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%',  }}>
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
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%'}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%',  }}>
        <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Serving: </Text>
          <View>
            {temperatureOptions.map((option, index) => (
            <View key={option.id} style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                activeOpacity={1}
                onPress={() => handleOptionChange(option.id)}
              >
                <View style={styles.checkbox}>
                  {selectedOptionIds.includes(option.id) && <View style={styles.checkboxInner} />}
                </View>
                <Text style={styles.checkboxLabel}>{option.label}</Text>
              </TouchableOpacity>

              <TextInput
                style={[
                  styles.servingInput,
                  {
                    opacity: selectedOptionIds.includes(option.id) ? 1 : 0.5,
                    backgroundColor: selectedOptionIds.includes(option.id) ? '#F5F6FF' : '#D2D2D2', 
                  },
                ]}
                placeholder={`Enter value for ${option.label}`}
                value={servingInputValues[index]}
                onChangeText={(text) => handleTextInputChange(option.id, text)}
                editable={selectedOptionIds.includes(option.id) && !isServingSubmitting}
              />
            </View>
          ))}
        </View>
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%',  }}>
        <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Sugar: </Text>
          <View>
            {sugarOptions.map((option, index) => (
            <View key={option.id} style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                activeOpacity={1}
                onPress={() => handleOptionSugarChange(option.id)}
              >
                <View style={styles.checkbox}>
                  {selectedSugarIds.includes(option.id) && <View style={styles.checkboxInner} />}
                </View>
                <Text style={styles.checkboxLabel}>{option.label}</Text>
              </TouchableOpacity>

              <TextInput
                style={[
                  styles.servingInput,
                  {
                    opacity: selectedSugarIds.includes(option.id) ? 1 : 0.5,
                    backgroundColor: selectedSugarIds.includes(option.id) ? '#F5F6FF' : '#D2D2D2', 
                  },
                ]}
                placeholder={`Enter value for ${option.label}`}
                value={sugarInputValues[index]}
                onChangeText={(text) => handleTextInputSugarChange(option.id, text)}
                editable={selectedSugarIds.includes(option.id) && !isSugarSubmitting}
              />
            </View>
          ))}
        </View>
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%',  }}>
        <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Add On: </Text>
          <View>
            {addOnOptions.map((option, index) => (
            <View key={option.id} style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                activeOpacity={1}
                onPress={() => handleOptionAddOnChange(option.id)}
              >
                <View style={styles.checkbox}>
                  {selectedAddOnIds.includes(option.id) && <View style={styles.checkboxInner} />}
                </View>
                <Text style={styles.checkboxLabel}>{option.label}</Text>
              </TouchableOpacity>

              <TextInput
                style={[
                  styles.servingInput,
                  {
                    opacity: selectedAddOnIds.includes(option.id) ? 1 : 0.5,
                    backgroundColor: selectedAddOnIds.includes(option.id) ? '#F5F6FF' : '#D2D2D2', 
                  },
                ]}
                placeholder={`Enter value for ${option.label}`}
                value={addOnInputValues[index]}
                onChangeText={(text) => handleTextInputAddOnChange(option.id, text)}
                editable={selectedAddOnIds.includes(option.id) && !isAddOnSubmitting}
              />
            </View>
          ))}
        </View>
        </View>

        <View style={{margin:10, width:'80%',  }}>
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
    
  });

export default DetailProduct