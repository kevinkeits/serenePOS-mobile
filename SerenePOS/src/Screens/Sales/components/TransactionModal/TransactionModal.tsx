import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const TransactionModal: React.FC<Props> = ({ isVisible, onClose }) => {

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
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.modalTitle}>Transaction</Text>
            <View style={styles.underline}></View>
          </View>
        <ScrollView>
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
      <View style={{marginBottom:20}}>
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
    //height: '50%',
    backgroundColor: 'white',
    paddingTop: 20,
    borderRadius: 10,
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop:10
  },
  modalTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    //borderStyle: 'dotted',
    marginBottom: 10,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 10,
    backgroundColor: 'white', // Change background color to transparent
    padding: 8,
    borderRadius: 5,
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'grey', // Change color to black
    fontSize: 15,
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

export default TransactionModal;
