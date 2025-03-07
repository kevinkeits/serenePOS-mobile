import { useIsFocused, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet,  TextInput, Switch, Alert } from 'react-native'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'

import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApiUrls } from '../../apiUrls/apiUrls'

import RNPickerSelect from "react-native-picker-select";
import DropdownSVG from '../../assets/svgs/DropdownSVG'



import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
  request,
} from "react-native-permissions";

import ThermalPrinterModule from 'react-native-thermal-printer';
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


  export interface Outlet {
    id: string;
    outlet: string;
    isPrimary: number;
    address: string;
    province: string;
    district: string;
    phoneNumber: string;
    subDistrict: string;
    postalCode: string;
  }


  export interface ISetting {
    id: string;
    storeName: string;
    name: string;
    phoneNumber: string;
    email: string;
    outletID: string;
    outletName: string;
    accountImage: string;
    clientImage: string;
  }


  export interface ISettingForm {
    id: string;
    action: string;
    userName?: string;
    clientName?: string;
    fileName?: string;
    fileData?: string;
  }

const Setting = () => {
      
    const isFocused = useIsFocused();

    const [outletData, setOutletData] = React.useState<Outlet[]>([]);
    const [settingData, setSettingData] = React.useState<ISetting | null>(null);
    const [textName, setTextName] = React.useState('');
    const [textStoreName, setTextStoreName] = React.useState('');
    const [textPhoneNumber, setTextPhoneNumber] = React.useState('');

    const [printers, setPrinters] = React.useState<IBLEPrinter[]>([]);
    const [currentPrinter, setCurrentPrinter] = React.useState<IBLEPrinter>();

    const [useTax, setUseTax] = React.useState('F');
    const [textTax, setTextTax] = React.useState('0');

    const [useServiceCharge, setUseServiceCharge] = React.useState('F');
    const [textServiceCharge, setTextServiceCharge] = React.useState('0');

    const [ selBillTemplate, setSelBillTemplate ] = React.useState('01');
    const [arrTemplatePicker, setArrTemplatePicker] =  React.useState<generalOptions[]>([]);
    const [billTemplate, setBillTemplate] = React.useState<IBillTemplate>();

    interface generalOptions {
      label: string;
      value: string;
    }

    const dummyDataTemplate: generalOptions[] = [
      { label: "Template #01", value: "01" },
      { label: "Template #02", value: "02" },
      { label: "Template #03", value: "03" },
      { label: "Template #04", value: "04" },
      { label: "Template #05", value: "05" },
      { label: "Template #06", value: "06" },
      { label: "Template #07", value: "07" },
      { label: "Template #08", value: "08" },
      { label: "Template #09", value: "09" },
      { label: "Template #10", value: "10" }
    ];

    interface IBillTemplate {
      useTax: string;
      taxValue: string;
      useServiceCharge: string;
      serviceChargeValue: string;
      templateStyle: string;
    }

    const handleUseTax = () => {
      setUseTax(useTax === 'T' ? 'F' : 'T'); 
      setTextTax(useTax === 'T' ? '0' : '10'); 
    };
    const handleUseServiceCharge = () => {
      setUseServiceCharge(useServiceCharge === 'T' ? 'F' : 'T'); 
      setTextServiceCharge(useServiceCharge === 'T' ? '0' : '5'); 
    };

    


    const [form, setForm] = React.useState({
      paymentConfirmationFileName: '',
      paymentConfirmationFileData: '',
    });

    const navigation = useNavigation();


    const fetchOutlet = async () => {
      try {
        const token = await AsyncStorage.getItem('userData');     
        if (token) {
          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(ApiUrls.getSettingsOutlet, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });
          const data: Outlet[] = response.data.data;
          setOutletData(data);
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    const fetchSetting = async () => {
      try {
        const token = await AsyncStorage.getItem('userData');     
        const tempPrinter = await AsyncStorage.getItem('printerData');    
        const tempTemplate = await AsyncStorage.getItem('billTemplateData');  
        setArrTemplatePicker(dummyDataTemplate);
        if (token) {

          if (tempPrinter) {
            const printerData = JSON.parse(tempPrinter ?? '')
            setCurrentPrinter(printerData)
          }

          if (tempTemplate) {
            const templateData = JSON.parse(tempTemplate ?? '')
            setBillTemplate(templateData)
            setUseTax(templateData.useTax)
            setTextTax(templateData.taxValue)
            setUseServiceCharge(templateData.useServiceCharge)
            setTextServiceCharge(templateData.serviceChargeValue)
            setSelBillTemplate(templateData.templateStyle)
          }

          const authToken = JSON.parse(token).data.Token
          const response = await axios.get(ApiUrls.getSettings, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });           
          const data: ISetting = response.data.data;
          if (data){
            setTextName(data.name)
            setTextPhoneNumber(data.phoneNumber)
            setTextStoreName(data.storeName)
          } 

          setSettingData(data);
        } else {
          console.error('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const onSave = async (data: ISettingForm) => {
      try {
        const token = await AsyncStorage.getItem('userData'); 
        const url = ApiUrls.saveSettings
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
            fetchSetting();
            fetchOutlet();
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

  const handleSave = async () => {
    const updatedData: ISettingForm = {
      id: '',
      action: 'edit',
      userName: textName,
      clientName: textStoreName,
      fileName: form.paymentConfirmationFileName,
      fileData: form.paymentConfirmationFileData,
    };
    onSave(updatedData);
    
    const updatedTemplate: IBillTemplate = {
      useTax: useTax,
      taxValue: textTax,
      useServiceCharge: useServiceCharge,
      serviceChargeValue: textServiceCharge,
      templateStyle: selBillTemplate
    };
    await AsyncStorage.setItem('billTemplateData', JSON.stringify(updatedTemplate));
    
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

      const handleNavigate = ( item: Outlet) => {
        navigation.navigate('OutletDetail' as never, {data: item} as never)
      };
    

      const scanPrinter = () => {
        requestMultiple([PERMISSIONS.ANDROID.BLUETOOTH_CONNECT]).then(async (statuses) => {
          console.log('BlueTooth', statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT]);
          if (statuses[PERMISSIONS.ANDROID.BLUETOOTH_CONNECT] == 'granted') {
            await ThermalPrinterModule.getBluetoothDeviceList().then((printers) => setPrinters(printers))
          }
          // BLEPrinter.init().then(()=> {
          //   BLEPrinter.getDeviceList().then((printers) => setPrinters(printers))
          // });
        });
      };

      const connectPrinter = async (printer: IBLEPrinter) => {
        // BLEPrinter.connectPrinter(printer.inner_mac_address).then(async () => {
        //   setCurrentPrinter(printer)
        //   setPrinters([])
        //   await AsyncStorage.setItem('printerData', JSON.stringify(printer));
        // })
        setCurrentPrinter(printer)
        setPrinters([])
        await AsyncStorage.setItem('printerData', JSON.stringify(printer));

      }

      const printBillTest = async () => {
        // if (currentPrinter) {
        //   BLEPrinter.connectPrinter(currentPrinter.inner_mac_address).then(async () => {
        //     BLEPrinter.printText("<C>sample text</C>\n");
        //   })
        // }
        try {
          await ThermalPrinterModule.printBluetooth({
            payload: 'hello world',
            printerNbrCharactersPerLine: 38,
          });
        } catch (err) {
          //error handling
          //console.log(err.message);
        }
      }

    React.useEffect(() => {
      if (isFocused){
        fetchOutlet();
        fetchSetting();
      }
      }, [isFocused]);

  return (
    <CommonLayout>
      <ScrollView>
      <View style={{}}>
      <View style={{flexDirection: 'row', gap:10,   marginRight:30, marginVertical:10, alignItems:'center'}}>
      <Text onPress={() => navigation.navigate('Account' as never)} style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>Account</Text>
      <Text style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'grey'}}>&gt;</Text>
      <Text onPress={() => navigation.navigate('Setting' as never)}  style={{fontWeight:"bold", marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Setting</Text>
      </View>
      <View style={{ gap:6, justifyContent:'center', alignItems:'center'}}>

        <View style={{width:'35%', gap:5,  alignItems:'center', marginBottom:10}}>
        {/* {form.paymentConfirmationFileData ? (
            <Image
              source={{ uri: form.paymentConfirmationFileData }}
              style={{ width: 170, height: 100, borderRadius:7 }}
            />
          ) : (
            <View style={{borderWidth:0.5, width:'100%', height:100, borderColor:'grey', borderRadius:8}}>

            </View>
          )} */}

        {settingData && settingData.clientImage ? (
            <View style={{paddingLeft:8}}>
                {form.paymentConfirmationFileData ? (
                 <Image
                 source={{ uri: form.paymentConfirmationFileData }}
                 style={{ width: 170, height: 100, borderRadius:7 }}
               />
                ) : (
              
                  <Image
                  source={{ uri: settingData.clientImage }}
                  style={{ width: 170, height: 100, borderRadius:7 }}
                />
                )}
              </View>
              ):(
                <View style={{paddingLeft:8}}>
                  {form.paymentConfirmationFileData ? (
                    <Image
                      source={{ uri: form.paymentConfirmationFileData }}
                      style={{ width: 170, height: 100, borderRadius:7 }}
                    />
                  ) : (
                    <Image
                    source={require('../../assets/img/no-image.png')}
                    style={{ width: 170, height: 100, borderRadius:7 }}
                />
                )}
              </View>
          )}
            
            <View style={{backgroundColor:'#2563EB', justifyContent:'center', alignItems:'center',  width:'100%', borderRadius:5}}>
                <TouchableOpacity onPress={handleUpload} style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ justifyContent:'center', height: 32, alignItems:'center', padding: 4, color:'white', fontWeight:'bold', }}>Upload Image</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={{width:'100%'}}>
          <Text style={{ fontWeight:'bold',  marginBottom:5, color:'black'}}>Bussiness Information</Text>
          <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                      <Text style={{ marginBottom:5, width:'20%'}}>Store Name</Text>
                      <View
                          style={{
                              backgroundColor: textStoreName,
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
                              onChangeText={text => setTextStoreName(text)}
                              value={textStoreName}
                              style={{paddingLeft: 10, paddingVertical:0,  width:'80%', height:32}}
                          />
                      </View>          
          </View>

        {/* <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:8,  marginBottom:5, color:'black', width:'20%'}}>Address</Text>
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
                            multiline
                            numberOfLines={6}
                            placeholder='Type here'
                            maxLength={40}
                            onChangeText={text => setTextPrice(text)}
                            value={textPrice}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%'}}
                        />
                    </View>          
        </View> */}

        <Text style={{ fontWeight:'bold',  marginBottom:5, color:'black'}}>Contact Information</Text>
          <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>

                      <Text style={{  marginBottom:5, width:'20%'}}>Name</Text>
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
                              // placeholder='Type here'
                              maxLength={40}
                              onChangeText={text => setTextName(text)}
                              value={textName}
                              style={{paddingLeft: 10, paddingVertical:0, width:'80%', height:32}}
                          />
                      </View>          
          </View>
          <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>

                      <Text style={{  marginBottom:5, width:'20%'}}>Phone Number</Text>
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
                              // placeholder='Type here'
                              maxLength={40}
                              onChangeText={text => setTextPhoneNumber(text)}
                              value={textPhoneNumber}
                              style={{paddingLeft: 10, paddingVertical:0,  width:'80%', height:32}}
                          />
                      </View>          
          </View>

          {/* <Text style={{fontSize:10, fontWeight:'bold',  marginBottom:5, color:'black'}}>Basic Setting</Text>
          <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                      <Text style={{fontSize:8,  marginBottom:5, color:'black', width:'20%'}}>Additional Description</Text>
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
                    <Text style={{fontSize:8,  marginBottom:5, color:'black', width:'20%'}}>Message</Text>
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
                            multiline
                            numberOfLines={4}
                            placeholder='Type here'
                            maxLength={40}
                            onChangeText={text => setTextPrice(text)}
                            value={textPrice}
                            style={{paddingLeft: 10, paddingVertical:0, fontSize:8, width:'80%'}}
                        />
                    </View>          
        </View>
         */}
        <Text style={{ fontWeight:'bold',  marginBottom:5, color:'black'}}>Additional Setting</Text>

        <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
            <Text style={{marginBottom:5, width:'20%'}}>Bill Template</Text>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              height: 32,
            }}>
              <RNPickerSelect
                onValueChange={(value) => {
                  setSelBillTemplate(value);
                }}
                items={arrTemplatePicker}
                useNativeAndroidPickerStyle={false}
                value={selBillTemplate}
                Icon={() => {
                  return <View style={{marginTop: 6}}><DropdownSVG width='11' height='11' color='black' /></View>;
                }}
                style={pickerSelectStyles}
              />
            </View>
        </View>

          <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                      <Text style={{  marginBottom:5, width:'20%'}}>Printer</Text>
                      <View style={{flexDirection:'row', gap:6, width:'80%'}}>
                      <View
                          style={{
                              width:'50%'
                          }}>
                            <Text style={{ color: 'black' }}>{currentPrinter != null ? currentPrinter?.deviceName + ' (' + currentPrinter?.macAddress + ')' : ''}</Text>

                          <TouchableOpacity onPress={scanPrinter} style={{justifyContent:'center', width:'100%', alignItems:'center', backgroundColor:'#2563EB', height: 32, padding:4, borderRadius:5, marginTop: 8}}>
                              <Text style={{ color:'white', fontWeight:'500'}}>Connect Printer</Text>
                          </TouchableOpacity> 

                          {printers.map((x) => (
                            <TouchableOpacity key={x.macAddress}>
                               <Text style={{ paddingTop: 25}}>{x.deviceName} ({x.macAddress})</Text>
                               <TouchableOpacity onPress={() => connectPrinter(x)} style={{justifyContent:'center', width:'30%', alignItems:'center', backgroundColor:'#2563EB', padding:4, height: 32, borderRadius:5, paddingHorizontal:5}}>
                                  <Text style={{ color:'white', fontWeight:'500', textAlign:'center'}}>{x.macAddress == currentPrinter?.macAddress ? 'Connected' : ((x.status != '' && x.status != null ) ? x.status : 'Connect')}</Text>
                              </TouchableOpacity> 
                              </TouchableOpacity>
                            ))}
                      </View> 
                      {currentPrinter != null && (
                        <View
                          style={{
                              width:'50%'
                          }}>
                          <TouchableOpacity onPress={printBillTest} style={{justifyContent:'center', width:'100%', alignItems:'center', backgroundColor:'#2563EB', padding:4, height: 32, borderRadius:5, paddingHorizontal:5, marginTop: 28}}>
                              <Text style={{ color:'white', fontWeight:'500', textAlign:'center'}}>Print Sample Bills</Text>
                          </TouchableOpacity> 
                      </View> 
                      )}
                      
                      </View>         
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:10, marginBottom:useTax == 'T' ? 0 : 20}}>
            <TouchableOpacity onPress={handleUseTax} style={{ marginRight: 10 }}>
              <View style={{
                width: 25,
                height: 25,
                borderWidth: 1,
                padding:0,
                borderRadius: 4,
                borderColor: '#D2D2D2',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: useTax === 'T' ? '#2563EB' : 'transparent',
              }}>
                {useTax === 'T' && <Text style={{ color: 'white' }}>✓</Text>}
              </View>
            </TouchableOpacity>
            <Text>Use Tax</Text>
          </View>
          {useTax == 'T' && (
            <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                      <View
                          style={{
                              borderColor: '#D2D2D2',
                              borderWidth: 0.5,
                              borderRadius:5,
                              width:'100%'
                          }}>
                          <TextInput
                              editable
                              placeholder='Type here'
                              maxLength={2}
                              onChangeText={text => setTextTax(text)}
                              value={textTax}
                              style={{paddingLeft: 10, paddingVertical:0,  width:'80%', height:32}}
                          />
                      </View>          
            </View>
          )}


          

          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:10, marginBottom:useServiceCharge == 'T' ? 0 : 20 }}>
            <TouchableOpacity onPress={handleUseServiceCharge} style={{ marginRight: 10 }}>
              <View style={{
                width: 25,
                height: 25,
                borderWidth: 1,
                padding:0,
                borderRadius: 4,
                borderColor: '#D2D2D2',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: useServiceCharge === 'T' ? '#2563EB' : 'transparent',
              }}>
                {useServiceCharge === 'T' && <Text style={{ color: 'white' }}>✓</Text>}
              </View>
            </TouchableOpacity>
            <Text>Use Service Charge</Text>
          </View>
          {useServiceCharge == 'T' && (
            <View style={{margin:10, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                      <View
                          style={{
                              borderColor: '#D2D2D2',
                              borderWidth: 0.5,
                              borderRadius:5,
                              width:'100%'
                          }}>
                          <TextInput
                              editable
                              placeholder='Type here'
                              maxLength={2}
                              onChangeText={text => setTextServiceCharge(text)}
                              value={textServiceCharge}
                              style={{paddingLeft: 10, paddingVertical:0,  width:'80%', height:32}}
                          />
                      </View>          
            </View>
          )}

          

          {/* <View style={{marginTop:10, marginHorizontal:10, marginBottom:5, flexDirection:'row', width:'80%', justifyContent:'center', alignItems:'center'}}>
                      <Text style={{  marginBottom:5, width:'20%'}}>Back Up</Text>
                      <View
                          style={{
                              width:'80%'
                          }}>
                              <Text style={{ color:'grey',  width:'50%'}}>Last Sync  27 Jan 2024 </Text>
                      </View>          
          </View>

          <View style={{flexDirection:'row', gap:6, width:'80%', marginBottom:10, marginLeft:85}}>
                      <View
                          style={{
                              width:'30%'
                          }}>
                          <TouchableOpacity style={{justifyContent:'center', width:'100%', alignItems:'center', backgroundColor:'#2563EB', padding:4, height: 32, borderRadius:5}}>
                              <Text style={{ color:'white', fontWeight:'500'}}>Back Up Now</Text>
                          </TouchableOpacity> 
                      </View> 
                      <View
                          style={{
                              width:'30%'
                          }}>
                          <TouchableOpacity style={{justifyContent:'center', width:'100%', alignItems:'center', backgroundColor:'red', padding:4, height: 32, borderRadius:5}}>
                              <Text style={{ color:'white', fontWeight:'500'}}>Erase Data</Text>
                          </TouchableOpacity> 
                      </View> 
            </View>  */}

            <Text style={{ fontWeight:'bold', color:'black'}}>Outlet</Text>
            {outletData?.map((x, index) => (
          <View key={index} style={{marginTop:5, marginBottom:10, marginHorizontal:10,  width:'70%', }}>
                  <View style={{flexDirection:'row', gap:5}}>
                    <Text style={{  color:'black', width:'50%', marginBottom:5}}>{x.outlet}</Text>
                  {x.isPrimary == 1 && (
                    <View style={{width:60, height:25, backgroundColor:'blue', borderRadius:5, padding:4}}>
                          <Text style={{ color:'white', fontWeight:'bold', textAlign:'center'}}>Primary</Text>
                    </View>
                   )}
                  </View>
                      <TouchableOpacity
                          onPress={() => handleNavigate(x)}
                          style={{
                              backgroundColor: textName,
                              borderColor: 'grey',
                              borderBottomWidth: 0.5,
                              borderRadius:5,
                              flexDirection:'row',
                              justifyContent:'space-between',
                              alignItems:'center',
                              width:'100%',
                              paddingBottom:5,
                              paddingHorizontal:10
                          }}>
                            <Text style={{ maxWidth:'80%'}} numberOfLines={1} ellipsizeMode="tail">{x.address},{x.province} {x.district} {x.subDistrict} {x.postalCode}</Text>
                            <Text style={{fontWeight:'bold'}}>&gt;</Text>

                      </TouchableOpacity>          
          </View>
          ))}
       

        

        <View style={{margin:10, width:'80%', alignSelf:'center' }}>
                    <TouchableOpacity onPress={handleSave} style={{justifyContent:'center', alignItems:'center', backgroundColor:'#2563EB', padding:4, height: 32, borderRadius:5}}>
                        <Text style={{color:'white', fontWeight:'500'}}>Save</Text>
                    </TouchableOpacity>     

                    <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginVertical:10, justifyContent:'center', alignItems:'center', borderWidth:0.5, borderColor: '#D2D2D2', padding:4, borderRadius:5, height: 32}}>
                        <Text style={{ color:'black', fontWeight:'500'}}>Cancel</Text>
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
      outletInput: {
        // fontSize: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        height:25,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D2D2D2',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30 
    },
    
  });

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        // fontSize: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: '#D2D2D2',
        height:25,
        borderRadius: 6,
        color: 'black',
        paddingRight: 30
    },
    inputAndroid: {
        // fontSize: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        height:25,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D2D2D2',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30 
    },
    iconContainer: {
        top: 5,
        right: 15,
      },
});

export default Setting