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
import SettingsSVG from '../../assets/svgs/SettingsSVG'
import LogoutSVG from '../../assets/svgs/LogoutSVG'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiUrls } from '../../apiUrls/apiUrls'
import { ISetting } from '../Setting/Setting'
import ViewSVG from '../../assets/svgs/ViewSVG'
import { parse } from '@babel/core'




export interface IAccountForm {
  id: string;
  action: string;
  userName?: string;
  password?: string;
  salt?: string;
  ivssl?: string;
  tagssl?: string;
  fileName?: string;
  fileData?: string;
  phoneNumber?: string
}




  export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    outletName: string
    imgUrl: string
    mimeType: string
  }

  export interface DetailUserItems {
    id: string;
    storeName: string;
    name: string;
    email: string;
    phoneNumber: string;
    outletID: string
    outletName: string
    imgUrl: string
    isPrimary: number
    address: string
  }

  export interface DetailOutletUserItems {
    id: string;
    phoneNumber: string;
    outletName: string
    address: string
    provinceID: string
    districtID: string
    subDistrictID: string
    postalCode: string
  }

  export interface UserDetail {
    details: DetailUserItems
    outletDetails: DetailOutletUserItems
  }

  export interface IUserData{
    AccountImage: string;
    Email: string;
    Name: string;
    Token: string;
  }


const Profile = () => {

  const navigation = useNavigation();

    const [textProductSKU, setTextProductSKU] = React.useState('');
    const [textName, setTextName] = React.useState('');
    const [textPhoneNumber, setTextPhoneNumber] = React.useState('');

    const [textEmail, setTextEmail] = React.useState('');

    const [textOutletName, setTextOutletName] = React.useState('');
    const [textPassword, setTextPassword] = React.useState('');
    const [detailData, setDetailData] = React.useState<UserDetail | null>(null);
    const [settingData, setSettingData] = React.useState<ISetting | null>(null);



  const [form, setForm] = React.useState({
    fileName: '',
    fileData: '',
  });


  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // const fetchUser = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('userData');
  //     if (jsonValue !== null) {
  //       const jsonData = JSON.parse(jsonValue).data
  //       setUserData(JSON.parse(jsonValue));
  //       setTextName(jsonData.Name)
  //       setTextEmail(jsonData.Email)
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving data from AsyncStorage:', error);
  //   }
  // };

  const fetchSetting = async () => {
    try {
      const token = await AsyncStorage.getItem('userData');     
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(ApiUrls.getSettings, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });           
        const data: ISetting = response.data.data;
        const jsonValue = await AsyncStorage.getItem('userData');
        if (jsonValue !== null) {
          const userData = JSON.parse(jsonValue);
    
          userData.data.Name = data.name;
          userData.data.AccountImage = data.accountImage;
    
          // Save the updated userData back to AsyncStorage
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          console.log(userData);
        }

        if (data){
          setSettingData(data)
          setTextName(data.name)
          setTextEmail(data.email)
          setTextPhoneNumber(data.phoneNumber)
        } 
      

        setSettingData(data);
      } else {
        console.error('No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  

  const onLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('userData'); 
      const url = ApiUrls.doLogout
      if (token) {
        const authToken = JSON.parse(token).data.Token
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (response.status === 200) {
          Alert.alert('Success', 'Logout successful!');
          await AsyncStorage.removeItem('userData');
          await AsyncStorage.removeItem('printerData');
          navigation.navigate('Login' as never);
        } else {
          Alert.alert('Error', 'Logout failed');
        }
      }
    } catch (error) {
      console.error('Error during saving:', error);
      Alert.alert('Error', 'Something went wrong during Logout. Please try again.');
    }
};


  const handleLogout = async () => {
    try {
      onLogout()
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
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

      const onSave = async (data: IAccountForm) => {
        try {
          const token = await AsyncStorage.getItem('userData'); 
          const url = ApiUrls.saveSettingsAccount
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
              fetchSetting()
             
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
        const updatedData: IAccountForm = {
          id: '',
          action: 'edit',
          userName: textName,
          password: textPassword,
          salt: '',
          ivssl: '',
          tagssl:'',
          fileName: form.fileName,
          fileData: form.fileData,
          phoneNumber: textPhoneNumber
        };
        console.log(updatedData)
        onSave(updatedData);
      };

     

    


    React.useEffect(() => {
         fetchSetting()
         setTextPassword('')

      }, []);

  return (
    <CommonLayout>
      <View style={{}}>
      <View style={{flexDirection: 'row', gap:10,  marginLeft:10, marginRight:30, marginVertical:10, alignItems:'center'}}>
      <Text style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Account</Text>
      </View>
      <View style={{flexDirection:'row', gap:6}}>
        <View style={{width:'25%',  alignItems:'center'}}>

        <View style={{paddingLeft:8}}>


          {/* {form.fileData ? (
            <Image
              source={{ uri: form.fileData }}
              style={{ width: 130, height: 100, borderRadius:7 }}
            />
          ) : (
            <Image
              source={require('../../assets/img/no-image.png')}
              style={{ width: 130, height: 100, borderRadius:7 }}
            />
            
          )} */}
          {settingData && settingData.accountImage ? (
            <View style={{paddingLeft:8}}>
                {form.fileData ? (
                 <Image
                 source={{ uri: form.fileData }}
                 style={{ width: 130, height: 100, borderRadius:7 }}
               />
                ) : (
              
                  <Image
                  source={{ uri: settingData.accountImage }}
                  style={{ width: 130, height: 100, borderRadius:7 }}
                />
                )}
              </View>
              ):(
                <View style={{paddingLeft:8}}>
                  {form.fileData ? (
                    <Image
                      source={{ uri: form.fileData }}
                      style={{ width: 130, height: 100, borderRadius:7 }}
                    />
                  ) : (
                    <Image
                    source={require('../../assets/img/no-image.png')}
                    style={{ width: 130, height: 100, borderRadius:7 }}
                />
                )}
              </View>
          )}

          <TouchableOpacity onPress={handleUpload} style={{justifyContent:'center',  width: 130, alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5, marginTop:7}}>
                            <Text style={{color:'white', fontWeight:'500'}}>Upload Image</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('Setting' as never)} style={{justifyContent:'center', gap:4, flexDirection:'row',  width: 130, alignItems:'center', borderWidth:0.5, borderColor:'#D2D2D2', padding:4, borderRadius:5, marginTop:7}}>
              <SettingsSVG width='11' height='11' color='black'/>
              <Text style={{color:'black', fontWeight:'500'}}>Setting</Text>
          </TouchableOpacity> 

          <TouchableOpacity onPress={handleLogout} style={{justifyContent:'center', gap:4, flexDirection:'row',  width: 130, alignItems:'center', borderWidth:0.5, borderColor:'#D2D2D2', padding:4, borderRadius:5, marginTop:7}}>
                  <LogoutSVG width='12' height='12' color='black'/>
                  <Text style={{color:'black', fontWeight:'500'}}>Logout</Text>
          </TouchableOpacity>    
                {/* <Text>File Name: {form.paymentConfirmationFileName}</Text> */}
        </View>

        </View>
        <View style={{width:'85%',}}>
        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
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
                            style={{paddingLeft: 10, paddingVertical:0, width:'80%', height:25}}
                        />
                    </View>          
        </View>
        <View style={{marginHorizontal:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{marginBottom:5, width:'20%'}}>Email</Text>
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
                            onChangeText={text => setTextEmail(text)}
                            value={textEmail}
                            style={{paddingLeft: 10, paddingVertical:0, width:'80%', height:25}}
                        />
                    </View>          
        </View>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{marginBottom:5,  width:'20%'}}>Password</Text>
        <View style={{
         width: '80%',
        //  height: 32,
         borderWidth: 1,
         marginBottom: 10,
         borderColor: '#D2D2D2',
         //padding: 5,
         borderRadius:6,
         alignSelf: 'center',
      }}>
      <TextInput
        style={styles.inputPassword}
        placeholder="Password"
        value={textPassword}
        secureTextEntry={!showPassword}
        onChangeText={(text) => setTextPassword(text)}
      />
        <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.eyeIcon}>
          {showPassword ? <ViewSVG width='16' height='16' color="black" /> : <ViewSVG width='16' height='16' color="black" />}
        </TouchableOpacity>
      </View>

      </View>

       <View style={{marginHorizontal:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ marginBottom:5, width:'20%'}}>Phone Number</Text>
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
        {/* <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{marginBottom:5,  width:'20%'}}>Password</Text>
                    <View
                        style={{
                            backgroundColor: textPassword,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width:'80%'
                        }}>
                        <TextInput
                            editable

                            placeholder='Type here'
                            maxLength={40}
                            onChangeText={text => setTextPassword(text)}
                            value={textPassword}
                            style={{paddingLeft: 10, paddingVertical:0, width:'80%', height:25}}
                        />
                    </View>          
        </View> */}

        <View style={{margin:10, width:'80%',  }}>
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
    inputPassword: {
      width: '100%',
      paddingVertical: 0,
      paddingHorizontal:10,
      height:25
      //lineHeight: 30,
    },
    eyeIcon: {
      position: 'absolute',
      right: 10,
      top: 4,
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

export default Profile