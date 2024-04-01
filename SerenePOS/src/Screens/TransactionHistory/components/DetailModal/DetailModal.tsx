import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TransactionDetail } from '../../TransactionHistory';


interface Props {
  isVisible: boolean;
  onClose: () => void;
  selectedID: string
  selectedData: TransactionDetail | null
  onSave?: (ids: string[]) => void;
}
const DetailModal: React.FC<Props> = ({ isVisible, onClose, selectedData, onSave }) => {

    const navigation = useNavigation();

    const handleNavigate = ( selectedId: string) => {
      navigation.navigate('Sales' as never, {id: selectedId} as never)
    };


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.modalTitle}>Transaction History</Text>
            <View style={styles.underline}></View>
          </View>

          <ScrollView>
            <View style={{marginBottom:10, gap:10, }}>
            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', padding:5, marginHorizontal:10}}>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Transaction Details</Text>
                <Text style={{fontSize:10, color:'black'}}>{selectedData?.details.transactionNumber}</Text>
            </View>
            <View style={{borderBottomWidth:2, borderBottomColor:'#E1E1E1',gap:9, paddingBottom:10, paddingHorizontal:5, marginHorizontal:10}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Transaction Date</Text>
                    <Text style={{fontSize:10, color:'black'}}>{selectedData?.details.transactionDate}</Text>
                </View>
                {/* <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Transaction No</Text>
                    <Text style={{fontSize:10, color:'black'}}>SE05022023</Text>
                </View> */}
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Cashier Name</Text>
                    <Text style={{fontSize:10, color:'black'}}>{selectedData?.details.name == '' ? '-' : selectedData?.details.name}</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Customer Name</Text>
                    <Text style={{fontSize:10, color:'black'}}>{selectedData?.details.customerName == '' ? '-' : selectedData?.details.customerName}</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Outlet</Text>
                    <Text style={{fontSize:10, color:'black'}}>{selectedData?.details.outletName}</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Payment Method</Text>
                    <Text style={{fontSize:10, color:'black'}}>{selectedData?.details.payment}</Text>
                </View>
            </View>
            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', paddingVertical:5, paddingHorizontal:5, marginHorizontal:10}}>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Product Details</Text>
            </View>
            
            {/* {selectedData?.detailsProduct.map((x, index) => (
              <View key={index} style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', gap:4,  paddingBottom:10, paddingHorizontal:5, marginHorizontal:10}}>
                  <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{fontSize:10, fontWeight:'bold', color:'black'}}>{x.productName} x{x.qty}</Text>
                      <Text style={{fontSize:10, color:'black'}}>Rp {parseInt(x.unitPrice).toLocaleString()}</Text>
                  </View>
                  <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{fontSize:9, color:'black'}}>Discount</Text>
                      <Text style={{fontSize:9, color:'black'}}>- Rp {parseInt(x.discount).toLocaleString()}</Text>
                  </View>
                  <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{fontSize:10, color:'black'}}>Price after Discount</Text>
                      <Text style={{fontSize:10, color:'black'}}>Rp {parseInt(x.unitPriceAfterDiscount).toLocaleString()}</Text>
                  </View>            
              </View>
            ))} */}

{selectedData?.detailsProduct.map((product, index) => (
  <View key={index} style={{ borderBottomWidth: 0.5, borderBottomColor: '#E1E1E1', gap: 4, paddingBottom: 10, paddingHorizontal: 5, marginHorizontal: 10 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 10,  color: 'black' }}>{product.productName} x {product.qty}</Text>
      <Text style={{ fontSize: 10, color: 'black' }}>Rp {parseInt(product.unitPrice).toLocaleString()}</Text>
    </View>
    {parseInt(product.discount) > 0 && (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 9, color: 'black' }}>Discount</Text>
      <Text style={{ fontSize: 9, color: 'black' }}>- Rp {parseInt(product.discount).toLocaleString()}</Text>
    </View>
    )}
    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 10, color: 'black' }}>Price after Discount</Text>
      <Text style={{ fontSize: 10, color: 'black' }}>Rp {parseInt(product.unitPriceAfterDiscount).toLocaleString()}</Text>
    </View> */}
    {/* Mapping variant data */}
    {selectedData?.detailsVariant
      .filter(variant => variant.transactionProductID === product.transactionProductID)
      .map((variant, variantIndex) => (
        <View key={variantIndex} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 8, color: 'grey' }}>{variant.label} </Text>
          <Text style={{ fontSize: 8, color: 'grey' }}> Rp {parseInt(variant.price).toLocaleString()} </Text>
        </View>

        </View>
      ))}
      <View style={{ flexDirection: 'row',  }}>
      <Text style={{ fontSize: 8, color: 'grey' }}>Notes {product.notes == '' ? '-' : product.notes}</Text>
      <Text style={{ fontSize: 8, color: 'grey' }}> </Text>
    </View>
  </View>
))}
            

            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', gap:9,  paddingBottom:10, paddingHorizontal:5, marginHorizontal:10}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Subtotal</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp {parseInt(selectedData?.details.subTotal ?? '0').toLocaleString()}</Text>
                </View>

                {parseInt(selectedData?.details.discount ?? '0') > 0 && (
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Discount</Text>
                    <Text style={{fontSize:10, color:'black'}}>- Rp {parseInt(selectedData?.details.discount ?? '0').toLocaleString()}</Text>
                </View>
                )}

                {parseInt(selectedData?.details.tax ?? '0') > 0 && (
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Tax 10%</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp {parseInt(selectedData?.details.tax ?? '0').toLocaleString()}</Text>
                </View>
                )}

                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Notes {selectedData?.details.notes == '' ? '-' : selectedData?.details.notes}</Text>
                </View>

            </View>

            <View style={{borderBottomWidth:0.5, borderBottomColor:'#E1E1E1', flexDirection:'row', justifyContent:'space-between', paddingBottom:10, paddingHorizontal:5, marginHorizontal:10}}>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Total Payment</Text>
                <Text style={{fontSize:10, color:'black', fontWeight:'bold'}}>Rp {parseInt(selectedData?.details.totalPayment ?? '0').toLocaleString()}</Text>
            </View>

            <View style={{ gap:9,  paddingVertical:10, paddingHorizontal:5, marginHorizontal:10}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Paid</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp {parseInt(selectedData?.details.paymentAmount ?? '0').toLocaleString()}</Text>
                </View>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:10, color:'black'}}>Changes</Text>
                    <Text style={{fontSize:10, color:'black'}}>Rp {parseInt(selectedData?.details.changes ?? '0').toLocaleString()}</Text>
                </View>
            </View>
        </View>

        {selectedData?.details.isPaid == '0' && (
          <View 
          style={{
            width:'90%', 
            marginTop:5, 
            marginBottom:5, 
            backgroundColor: '#2563EB', 
            padding:4, 
            justifyContent: 'center', 
            alignItems:'center', 
            alignSelf:'center', 
            borderRadius:5
            }}>
            <TouchableOpacity 
            style={{width:'100%', alignItems:'center'}}
            onPress={()=>handleNavigate(selectedData.details.transactionID)}
            >
                <Text style={{fontSize:10, fontWeight:'bold', color: 'white'}}>Pay Now</Text>
            </TouchableOpacity>          
          </View>
          )}

          <View style={{width:'90%', marginBottom:20, backgroundColor: '#2563EB', padding:4, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5}}>
            <TouchableOpacity style={{width:'100%', alignItems:'center'}}>
                <Text style={{fontSize:10, fontWeight:'bold', color: 'white'}}>Print Receipt</Text>
            </TouchableOpacity>          
          </View>
          </ScrollView>


          <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '70%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 10,
    borderRadius: 10,
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    //borderStyle: 'dotted',
    marginVertical: 10,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    
    padding: 4,
    borderRadius: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  closeButtonText: {
    color: 'grey', // Change color to black
  },
  radioContainer: {
    marginLeft:20
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'space-around',
    //marginTop: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
});

export default DetailModal;
