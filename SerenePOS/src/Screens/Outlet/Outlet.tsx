// Import necessary modules
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Platform, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Table, Row, Rows } from 'react-native-table-component';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import CommonLayout from '../../Components/CommonLayout/CommonLayout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropdownSVG from '../../assets/svgs/DropdownSVG';
import { useNavigation } from '@react-navigation/native';



// Define TransactionHistory component
const Outlet: React.FC = () => {
    const navigation = useNavigation();


  const paymentMethods = [
    { label: 'Credit Card', value: 'creditCard' },
    { label: 'Cash', value: 'cash' },
    // Add more payment methods as needed
  ];

  const paymentStatuses = [
    { label: 'Success', value: 'success' },
    { label: 'Pending', value: 'pending' },
    // Add more payment statuses as needed
  ];

  const transactionHistoryData = [
    { id: '1', outlet: 'Outlet A', paymentMethod: 'Credit Card', paymentStatus: 'Success', date: '2024-01-31' },
    // Add more transaction data as needed
  ];

  // State variables for filters
  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // State variable for search
  const [searchQuery, setSearchQuery] = useState<string>('');


  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowStartDatePicker(false);
      setShowEndDatePicker(false);
    }

    if (selectedDate !== undefined) {
      // Update the corresponding state variable with the selected date
      // You can use a single function for both start and end dates
      // and distinguish them based on the context
      setStartDate(selectedDate);
    }
  };

  const onViewPress = (item: string) => {
    console.log('View button pressed for item:', item);
    // You can perform additional actions here, such as navigating to a detailed view
  };

  const tableHeaders = ['Outlet', 'Payment Method', 'Payment Status', 'Date', 'Action']; // Added 'Action'
  const tableData = transactionHistoryData.map(item => [
    item.outlet,
    item.paymentMethod,
    item.paymentStatus,
    item.date,
    <TouchableOpacity key={`view_${item.id}`} onPress={() => onViewPress(item.outlet)}>
      <Text style={{ color: 'blue', fontSize: 10, textDecorationLine: 'underline' }}>View</Text>
    </TouchableOpacity>,
  ]);

  return (
    <CommonLayout>
    <View style={{width:'100%'}}>
    <View style={{flexDirection: 'row', gap:10,  marginRight:30, marginVertical:10, alignItems:'center'}}>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center', color:'black'}}>Outlet</Text>
      </View>
        <View style={{width:'40%'}}>

      {/* Payment Method filter */}
      <View style={{ marginBottom: 10, height: 20, justifyContent: 'center' }}>
        <RNPickerSelect
          items={paymentMethods}
          onValueChange={(value) => setSelectedPaymentMethod(value)}
          value={selectedPaymentMethod}
          placeholder={{ label: 'Outlet', value: null }}
          style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
            return <View style={{marginTop:0}}><DropdownSVG width='11' height='11' color='black' /></View>;
            }}
        />
      </View>

      {/* Payment Status filter */}
      <View style={{ marginBottom: 10, height: 20, justifyContent: 'center' }}>
        <RNPickerSelect
          items={paymentStatuses}
          onValueChange={(value) => setSelectedPaymentStatus(value)}
          value={selectedPaymentStatus}
          placeholder={{ label: 'Outlet Status', value: null }}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
          return <View style={{marginTop:0}}><DropdownSVG width='11' height='11' color='black' /></View>;
          }}        />
      </View>


      <TouchableOpacity onPress={()=> navigation.navigate('OutletDetail' as never)} style={{backgroundColor:'blue', paddingVertical:5, justifyContent:'center', alignItems:'center', borderRadius: 6, height:20}}>
        <Text style={{fontSize:8, color:'white'}}>Add Outlet</Text>
      </TouchableOpacity>

      </View>

          <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', marginVertical:20}}/>

      <View style={{ borderWidth: 0.5, borderColor: '#C1C0B9', marginBottom: 10, width:'40%',  height: 25, justifyContent:'flex-end', alignSelf:'flex-end', borderRadius:6 }}>
        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={{ fontSize: 8, paddingHorizontal: 10, paddingVertical: 5 }}
        />
      </View>

      {/* Transaction history table */}
      <View style={{ borderRadius: 7, overflow: 'hidden' }}>
      <Table borderStyle={{ borderWidth: 0.5, borderColor: '#C1C0B9' }}>
        <Row data={tableHeaders} style={{ height: 40, backgroundColor: '#f1f8ff' }} textStyle={{ margin: 6, fontWeight: 'bold', fontSize:8 }} />
        <Rows data={tableData} textStyle={{ margin: 6, fontSize:8 }} />
      </Table>
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

export default Outlet
