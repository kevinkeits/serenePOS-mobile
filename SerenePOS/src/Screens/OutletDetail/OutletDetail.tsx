import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput, Switch } from 'react-native'
import TrashSVG from '../../assets/svgs/TrashSVG'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'

import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiUrls } from '../../apiUrls/apiUrls'




export interface OutletDetailProps {
  details: detailsOutletProps
}

export interface detailsOutletProps {
  id: string;
  outletName: string;
  isPrimary: number;
  address: string;
  provinceID: string
  districtID: string
  subDistrictID: string
  postalCode: string
  phoneNumber: string
}



export interface OutletForm {
  id: string;
  action?: string
  name?: string;
  isPrimary?: string;
  address?: string;
  phoneNumber?: string
  provinceID?: string
  districtID?: string
  subDistrictID?: string
  postalCode?: string
}


  interface CategoryOption {
    label: string;
    value: string;
  }

  type DetailScreenProps = {
    route: { params: {  id: string } };
  };

const OutletDetail = ({ route }: DetailScreenProps) => {

  const  { id }  = route.params

    const [detailData, setDetailData] = React.useState<OutletDetailProps | null>(null);
    const [textName, setTextName] = React.useState('');
    const [textPhoneNumber, setTextPhoneNumber] = React.useState('');
    const [textDetailAddress, setTextDetailAddress] = React.useState('');
    const [textProvinceID, setTextProvinceID] = React.useState('');
    const [textDistrictID, setTextDistrictID] = React.useState('');
    const [textSubdistrictID, setTextSubdistrictID] = React.useState('');
    const [textPostalCode, setTextPostalCode] = React.useState('');




    const [quantity, setQuantity] = React.useState(1);
    const [form, setForm] = React.useState({
      // Your other form fields
      paymentConfirmationFileName: '',
      paymentConfirmationFileData: '',
    }); 

    const [isPrimary, setIsPrimary] = React.useState('');

    const handleCheckBoxToggle = () => {
      setIsPrimary(isPrimary === 'T' ? 'F' : 'T'); // Toggle between 'T' and ''
    };

    const navigation = useNavigation();


    const fetchData = async (id: string) => {
      try {
        const token = await AsyncStorage.getItem('userData'); 
        const categoryDetailUrl = ApiUrls.getOutletDetail(id);    
        if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(categoryDetailUrl, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          const data: OutletDetailProps = response.data.data;
          if (id !== '') {
          if (data) {
            console.log(data)
            setTextName(data.details.outletName)
            setTextPhoneNumber(data.details.phoneNumber)
            setTextDetailAddress(data.details.address)
            setTextProvinceID(data.details.provinceID)
            setTextDistrictID(data.details.districtID)
            setTextSubdistrictID(data.details.subDistrictID)
            setTextPostalCode(data.details.postalCode)
            setDetailData(data)
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

    const onSave = async (data: OutletForm) => {
      try {
        const token = await AsyncStorage.getItem('userData'); 
        const url = ApiUrls.saveOutlet
        if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.post(url, data, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (response.status === 200) {
          // Registration successful
          Alert.alert('Success', 'Saved data successful!');
          // fetchData(id)
          navigation.navigate('Setting' as never)    
          } else {
          // Registration failed
          Alert.alert('Error', 'Saving data failed');
        }
      }
      } catch (error) {
        console.error('Error during saving:', error);
        Alert.alert('Error', 'Something went wrong during saving data. Please try again.');
      }
  };
  
  const handleSave = () => {
    const updatedData:OutletForm = {
      id: id !== '' ? id : '',
      action: id !== '' ? 'edit' : 'add',
      name: textName,
      phoneNumber: textPhoneNumber,
      address: textDetailAddress,
      isPrimary: ''
    };
    console.log(updatedData)
    onSave(updatedData);
  };

      const categoryOptions: CategoryOption[] = [
        { label: 'Category 1', value: 'category1' },
        { label: 'Category 2', value: 'category2' },
        { label: 'Category 3', value: 'category3' },
        // Add more categories as needed
      ];

     
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
    


    React.useEffect(() => {
      if(id !== ''){
        fetchData(id);
      }
      }, []);

  return (
    <CommonLayout>
      <View style={{}}>
      <View style={{flexDirection: 'row', gap:10,   marginRight:30, marginVertical:10, alignItems:'center'}}>
      <Text onPress={() => navigation.navigate('Account' as never)} style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>Account</Text>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>&gt;</Text>
      <Text onPress={() => navigation.navigate('Setting' as never)}  style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>Setting</Text>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>&gt;</Text>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Edit Outlet</Text>
      </View>
      <View style={{ gap:6, justifyContent:'center', alignItems:'center'}}>
{/* 
        <View style={{width:'35%', gap:5,  alignItems:'center', marginBottom:10}}>
        {form.paymentConfirmationFileData ? (
            <Image
              source={{ uri: form.paymentConfirmationFileData }}
              style={{ width: 170, height: 100, borderRadius:7 }}
            />
          ) : (
            <View style={{borderWidth:0.5, width:'100%', height:100, borderColor:'grey', borderRadius:8}}>

            </View>
          )}
            
            <View style={{backgroundColor:'#2563EB', justifyContent:'center', alignItems:'center',  width:'100%', borderRadius:5}}>
                <TouchableOpacity onPress={handleUpload} style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:8, paddingVertical:7, color:'white', fontWeight:'bold', }}>Upload Image</Text>
                </TouchableOpacity>
            </View>
        </View> */}

        <View style={{width:'100%'}}>
        <Text style={{fontSize:12, fontWeight:'bold',  marginBottom:5, color:'black'}}>Outlet Detail</Text>
        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>

                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Outlet Name</Text>
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
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Phone Number</Text>
                    <View
                        style={{
                            backgroundColor: textPhoneNumber,
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
                            onChangeText={text => setTextPhoneNumber(text)}
                            value={textPhoneNumber}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <Text style={{fontSize:12, fontWeight:'bold',  marginBottom:5, color:'black'}}>Address Detail</Text>


        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Detail Address</Text>
                    <View
                        style={{
                            backgroundColor: textDetailAddress,
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
                            onChangeText={text => setTextDetailAddress(text)}
                            value={textDetailAddress}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Province ID</Text>
                    <View
                        style={{
                            backgroundColor: textProvinceID,
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
                            onChangeText={text => setTextProvinceID(text)}
                            value={textProvinceID}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>District ID</Text>
                    <View
                        style={{
                            backgroundColor: textDistrictID,
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
                            onChangeText={text => setTextDistrictID(text)}
                            value={textDistrictID}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>SubDistrict ID</Text>
                    <View
                        style={{
                            backgroundColor: textSubdistrictID,
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
                            onChangeText={text => setTextSubdistrictID(text)}
                            value={textSubdistrictID}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:10,  marginBottom:5, color:'black', width:'20%'}}>Postal Code</Text>
                    <View
                        style={{
                            backgroundColor: textPostalCode,
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
                            onChangeText={text => setTextPostalCode(text)}
                            value={textPostalCode}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%', height:25}}
                        />
                    </View>          
        </View>

<View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={handleCheckBoxToggle} style={{ marginRight: 5 }}>
        <View style={{
          width: 20,
          height: 20,
          borderWidth: 1,
          borderRadius: 4,
          borderColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isPrimary === 'T' ? 'black' : 'transparent',
        }}>
          {isPrimary === 'T' && <Text style={{ color: 'white' }}>✓</Text>}
        </View>
      </TouchableOpacity>
      <Text>Primary Address</Text>
      <Text>{isPrimary}</Text>
    </View>

       

        

        <View style={{margin:10, width:'80%', alignSelf:'center' }}>
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

export default OutletDetail