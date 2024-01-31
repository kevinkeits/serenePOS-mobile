// Import necessary modules
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Platform, StyleSheet } from 'react-native';
import CommonLayout from '../../Components/CommonLayout/CommonLayout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



// Define TransactionHistory component
const TransactionHistoryDetail: React.FC = () => {
    const navigation = useNavigation();


  return (
    <CommonLayout>
        <View style={{width:'100%'}}>
            <View style={{flexDirection: 'row', gap:10,  marginRight:30, marginVertical:10, alignItems:'center'}}>
                <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Edit Transaction History</Text>
            </View>

            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', padding:5, marginHorizontal:10}}>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Transaction Details</Text>
                <Text style={{fontSize:10, color:'black'}}>#001</Text>
            </View>
            <View style={{borderBottomWidth:2, borderBottomColor:'#E1E1E1',gap:9, paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Transaction Date</Text>
                    <Text style={{fontSize:10, color:'black'}}>05-Feb-2023 23:11:53</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Transaction No</Text>
                    <Text style={{fontSize:10, color:'black'}}>SE05022023</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Cashier Name</Text>
                    <Text style={{fontSize:10, color:'black'}}>Reza</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Outlet</Text>
                    <Text style={{fontSize:10, color:'black'}}>Bogor</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Payment Method</Text>
                    <Text style={{fontSize:10, color:'black'}}>Debit</Text>
                </View>
            </View>
            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Product Details</Text>
            </View>

            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', gap:9,  paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Simple Toast</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 5.000</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Qty</Text>
                    <Text style={{fontSize:10, color:'black'}}>x1</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Total</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 5.000</Text>
                </View>            
            </View>

            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', gap:9,  paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Subtotal</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 5.000</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Discount</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 0</Text>
                </View>
            </View>

            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Total Payment</Text>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Rp 5.000</Text>
            </View>

            <View style={{ gap:9,  paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Paid</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 5.000</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Change</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp 0</Text>
                </View>
            </View>

            <View style={{marginHorizontal:10, backgroundColor:'#2563EB', width:'20%', justifyContent:'flex-end', alignSelf:'flex-end', borderRadius:5, marginBottom:10}}>
                <TouchableOpacity style={{paddingVertical:6}}>
                    <Text style={{color:'white', fontSize:8, textAlign:'center'}}>Print Receipt</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:10, borderWidth:0.5, borderColor:'#2563EB', width:'20%', justifyContent:'flex-end', alignSelf:'flex-end', borderRadius:5, marginBottom:10}}>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{paddingVertical:6}}>
                    <Text style={{color:'black', fontSize:8, textAlign:'center'}}>Close</Text>
                </TouchableOpacity>
            </View>
        

        </View>
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

export default TransactionHistoryDetail
