// Import necessary modules
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Platform, StyleSheet } from 'react-native';
import CommonLayout from '../../Components/CommonLayout/CommonLayout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DetailModal from './components/DetailModal/DetailModal';



// Define TransactionHistory component
const TransactionHistory: React.FC = () => {
    const navigation = useNavigation();

    const [isOpenDetail, setIsOpenDetail] = React.useState(false);
    const [selectedID, setSelectedID] = React.useState('');


    const onCloseDetail = () => {
      setIsOpenDetail(false);
    };

    const onOpenDetail = (id: string) => {
      setSelectedID(id)
      setIsOpenDetail(true);
    };
  



  return (
    <CommonLayout>
        <View style={{width:'100%'}}>
            <View style={{flexDirection: 'row', gap:10,  marginRight:30, marginVertical:10, alignItems:'center'}}>
                <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Transaction History</Text>
            </View>

      <View>
                  <View style={{ backgroundColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', padding:5, marginHorizontal:10}}>
                      <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Tuesday, 30 Jan 2024</Text>
                      {/* <Text style={{fontSize:10, color:'black'}}>#001</Text> */}
                  </View>
                  <TouchableOpacity onPress={() => onOpenDetail('1')} style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1',gap:5, paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', gap:5}}>
                          <Text style={{fontSize:10, color:'black'}}>SE00530012024</Text>
                          <View style={{backgroundColor: 'red', width:30,justifyContent:'center', alignItems:'center', borderRadius:5 }}>
                            <Text style={{textAlign:'center', fontSize:6, color:'white', fontWeight:'bold'}}>Unpaid</Text>
                          </View>
                          </View>
                          <Text style={{fontSize:7, color:'black'}}>30-Jan-2024 11:25:12</Text>
                          
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={{fontSize:10, color:'black'}}>Aulia</Text>
                          <View style={{}}></View>
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <View style={{}}></View>
                          <Text style={{fontSize:10, color:'black',fontWeight:'bold'}}>Rp 45.000</Text>
                      </View>                    
                  </TouchableOpacity>

                  <TouchableOpacity style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1',gap:5, paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', gap:5}}>
                          <Text style={{fontSize:10, color:'black'}}>SE00530012024</Text>
                          <View style={{backgroundColor: 'red', width:30,justifyContent:'center', alignItems:'center', borderRadius:5 }}>
                            <Text style={{textAlign:'center', fontSize:6, color:'white', fontWeight:'bold'}}>Unpaid</Text>
                          </View>
                          </View>
                          <Text style={{fontSize:7, color:'black'}}>30-Jan-2024 11:25:12</Text>
                          
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={{fontSize:10, color:'black'}}>Aulia</Text>
                          <View style={{}}></View>
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <View style={{}}></View>
                          <Text style={{fontSize:10, color:'black',fontWeight:'bold'}}>Rp 45.000</Text>
                      </View>                    
                  </TouchableOpacity>
      </View>
      <View>
                  <View style={{ backgroundColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', padding:5, marginHorizontal:10}}>
                      <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Monday, 30 Jan 2024</Text>
                      {/* <Text style={{fontSize:10, color:'black'}}>#001</Text> */}
                  </View>
                  <TouchableOpacity style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1',gap:5, paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', gap:5}}>
                          <Text style={{fontSize:10, color:'black'}}>SE00530012024</Text>
                          <View style={{backgroundColor: 'red', width:30,justifyContent:'center', alignItems:'center', borderRadius:5 }}>
                            <Text style={{textAlign:'center', fontSize:6, color:'white', fontWeight:'bold'}}>Unpaid</Text>
                          </View>
                          </View>
                          <Text style={{fontSize:7, color:'black'}}>29-Jan-2024 11:25:12</Text>
                          
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={{fontSize:10, color:'black'}}>Samuel</Text>
                          <View style={{}}></View>
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <View style={{}}></View>
                          <Text style={{fontSize:10, color:'black',fontWeight:'bold'}}>Rp 45.000</Text>
                      </View>                    
                  </TouchableOpacity>

                  <TouchableOpacity style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1',gap:5, paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', gap:5}}>
                          <Text style={{fontSize:10, color:'black'}}>SE00530012024</Text>
                          <View style={{backgroundColor: 'red', width:30,justifyContent:'center', alignItems:'center', borderRadius:5 }}>
                            <Text style={{textAlign:'center', fontSize:6, color:'white', fontWeight:'bold'}}>Unpaid</Text>
                          </View>
                          </View>
                          <Text style={{fontSize:7, color:'black'}}>29-Jan-2024 11:25:12</Text>
                          
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <Text style={{fontSize:10, color:'black'}}>Aulia</Text>
                          <View style={{}}></View>
                      </View>
                      <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                          <View style={{}}></View>
                          <Text style={{fontSize:10, color:'black',fontWeight:'bold'}}>Rp 45.000</Text>
                      </View>                    
                  </TouchableOpacity>
      </View>
            {/* <View style={{marginHorizontal:10, backgroundColor:'#2563EB', width:'20%', justifyContent:'flex-end', alignSelf:'flex-end', borderRadius:5, marginBottom:10}}>
                <TouchableOpacity style={{paddingVertical:6}}>
                    <Text style={{color:'white', fontSize:8, textAlign:'center'}}>Print Receipt</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:10, borderWidth:0.5, borderColor:'#2563EB', width:'20%', justifyContent:'flex-end', alignSelf:'flex-end', borderRadius:5, marginBottom:10}}>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{paddingVertical:6}}>
                    <Text style={{color:'black', fontSize:8, textAlign:'center'}}>Close</Text>
                </TouchableOpacity>
            </View> */}
        

        </View>

        <DetailModal isVisible={isOpenDetail} selectedID={selectedID} onClose={onCloseDetail} />
    </CommonLayout>
  );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 6,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 5,
        right: 15,
      },
});

export default TransactionHistory
