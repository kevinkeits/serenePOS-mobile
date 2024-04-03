import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiUrls } from '../../apiUrls/apiUrls'
import { Outlet } from '../Setting/Setting'




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
  province?: string
  district?: string
  subDistrict?: string
  postalCode?: string
}


  type DetailScreenProps = {
    route: { params: {  data: Outlet } };
  };

const OutletDetail = ({ route }: DetailScreenProps) => {

  const  { data }  = route.params

    const [textName, setTextName] = React.useState('');
    const [textPhoneNumber, setTextPhoneNumber] = React.useState('');
    const [textDetailAddress, setTextDetailAddress] = React.useState('');
    const [textProvinceID, setTextProvinceID] = React.useState('');
    const [textDistrictID, setTextDistrictID] = React.useState('');
    const [textSubdistrictID, setTextSubdistrictID] = React.useState('');
    const [textPostalCode, setTextPostalCode] = React.useState('');
    const [isPrimary, setIsPrimary] = React.useState('');

    const handleCheckBoxToggle = () => {
      setIsPrimary(isPrimary === 'T' ? 'F' : 'T'); 
    };

    const navigation = useNavigation();


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
          if (response.data.status) {
            Alert.alert('Success', response.data.message);
            navigation.goBack()
          } else {
            Alert.alert('Error', response.data.message);
          }
        } else {
          Alert.alert('Error', response.data.message);
        }
      }
      } catch (error) {
        console.error('Error during saving:', error);
        Alert.alert('Error', 'Something went wrong during saving data. Please try again.');
      }
  };
  
  const handleSave = () => {
    const updatedData:OutletForm = {
      id: data.id !== '' ? data.id : '',
      action: data.id !== '' ? 'edit' : 'add',
      name: textName,
      phoneNumber: textPhoneNumber,
      address: textDetailAddress,
      postalCode: textPostalCode,
      province: textProvinceID,
      district: textDistrictID,
      subDistrict: textSubdistrictID,
      isPrimary: isPrimary == 'T' ? '1' : '0'
    };
    console.log(updatedData)
    onSave(updatedData);
  };
    


    React.useEffect(() => {
      if (data) {
        setTextName(data.outlet)
        // setTextPhoneNumber(data.)
        setTextDetailAddress(data.address)
        setTextProvinceID(data.province)
        setTextDistrictID(data.district)
        setTextSubdistrictID(data.subDistrict)
        setTextPostalCode(data.postalCode)
        }
      }, []);

  return (
    <CommonLayout>
      <ScrollView>
      <View style={{}}>
      <View style={{flexDirection: 'row', gap:10,   marginRight:30, marginVertical:10, alignItems:'center'}}>
      <Text onPress={() => navigation.navigate('Account' as never)} style={{fontWeight:"bold",  marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>Account</Text>
      <Text style={{fontWeight:"bold",  marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>&gt;</Text>
      <Text onPress={() => navigation.navigate('Setting' as never)}  style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>Setting</Text>
      <Text style={{fontWeight:"bold",  marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>&gt;</Text>
      <Text style={{fontWeight:"bold",  marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Edit Outlet</Text>
      </View>
      <View style={{ gap:6, justifyContent:'center', alignItems:'center'}}>


        <View style={{width:'100%'}}>
        <Text style={{ fontWeight:'bold',  marginBottom:5, color:'black'}}>Outlet Detail</Text>
        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>

                    <Text style={{  marginBottom:5, color:'black', width:'20%'}}>Outlet Name</Text>
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
                            style={{paddingLeft: 10, paddingVertical:0, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{  marginBottom:5, color:'black', width:'20%'}}>Phone Number</Text>
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
                            style={{paddingLeft: 10, paddingVertical:0, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <Text style={{ fontWeight:'bold',  marginBottom:5, color:'black'}}>Address Detail</Text>


        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{  marginBottom:5, color:'black', width:'20%'}}>Detail Address</Text>
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
                            style={{paddingLeft: 10, paddingVertical:0, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{  marginBottom:5, color:'black', width:'20%'}}>Province</Text>
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
                            style={{paddingLeft: 10, paddingVertical:0,width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ marginBottom:5, color:'black', width:'20%'}}>District</Text>
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
                            style={{paddingLeft: 10, paddingVertical:0,  width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ marginBottom:5, color:'black', width:'20%'}}>SubDistrict</Text>
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
                            style={{paddingLeft: 10, paddingVertical:0, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{  marginBottom:5, color:'black', width:'20%'}}>Postal Code</Text>
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
                            style={{paddingLeft: 10, paddingVertical:0, width:'80%', height:25}}
                        />
                    </View>          
        </View>

<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:10 }}>
      <TouchableOpacity onPress={handleCheckBoxToggle} style={{ marginRight: 10 }}>
        <View style={{
          width: 25,
          height: 25,
          borderWidth: 1,
          padding:3,
          borderRadius: 4,
          borderColor: '#D2D2D2',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isPrimary === 'T' ? '#2563EB' : 'transparent',
        }}>
          {isPrimary === 'T' && <Text style={{ color: 'white' }}>✓</Text>}
        </View>
      </TouchableOpacity>
      <Text style={{color:'black'}}>Primary Address</Text>
    </View>

       

        

        <View style={{margin:10, width:'80%', alignSelf:'center' }}>
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
        // fontSize: 10,
        fontWeight: 'bold',
      },
      quantityText: {
        // fontSize: 10,
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
        // fontSize: 8,
        width:50,
        color:'black'
      },
      servingInput: {
        height: 25,
        width: '60%',
        borderColor: 'gray',
        paddingVertical:5,
        paddingLeft: 8,
        // fontSize: 8,
        borderRadius:7,
        marginLeft:20
      },
    
  });

export default OutletDetail