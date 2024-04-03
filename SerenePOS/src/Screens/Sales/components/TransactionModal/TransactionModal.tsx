import moment from 'moment';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GroupedTransactions, Transaction } from '../../../TransactionHistory/TransactionHistory';


interface Props {
  isVisible: boolean;
  onClose: () => void;
  onClick: (id: string) => void;
  data: Transaction[]
}

const TransactionModal: React.FC<Props> = ({ isVisible, onClose, data, onClick }) => {

    const [isOpenDetail, setIsOpenDetail] = React.useState(false);
    const [selectedID, setSelectedID] = React.useState('');

    const onCloseDetail = () => {
        setIsOpenDetail(false);
      };
  
      const onOpenDetail = (id: string) => {
        setSelectedID(id)
        setIsOpenDetail(true);
      };



      const renderTransactionByDate = () => {
        const groupedTransactions: GroupedTransactions = {};
    
        data.forEach(transaction => {
          const date = new Date(transaction.transactionDate).toISOString().slice(0, 10);
          if (!groupedTransactions[date]) {
            groupedTransactions[date] = [];
          }
          groupedTransactions[date].push(transaction);
        });
    
        return Object.keys(groupedTransactions).map(date => (
          <View key={date}>
            <View style={{ backgroundColor: '#E1E1E1', flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 10, color: 'black', fontWeight: 'bold' }}>{moment(date).format('dddd, D MMM YYYY')}</Text>
            </View>
            {groupedTransactions[date].map(transaction => (
              <TouchableOpacity onPress={() => onClick(transaction.id)} style={{ borderBottomWidth: 0.5, borderBottomColor: '#E1E1E1', gap: 5, paddingVertical: 10, paddingHorizontal: 5, marginHorizontal: 10 }} key={transaction.transactionNumber}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Text style={{ fontSize: 10, color: 'black' }}>{transaction.transactionNumber}</Text>
                    <View style={{ backgroundColor: transaction.isPaid === '0' ? 'red' : 'white', width: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                      <Text style={{ textAlign: 'center', fontSize: 6, color: 'white', fontWeight: 'bold' }}>{transaction.isPaid == '0' ? 'Unpaid' : ''}</Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 7, color: 'black' }}>{transaction.transactionDate}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 10, color: 'black' }}>{transaction.customerName}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 9, color: 'grey' }}>{transaction.payment}</Text>
                  <Text style={{ fontSize: 10, color: 'black', fontWeight: 'bold' }}>Rp {parseInt(transaction.totalPayment).toLocaleString()}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ));
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
            <Text style={styles.modalTitle}>Transaction</Text>
            <View style={styles.underline}></View>
          </View>
          <ScrollView>
      {data.length > 0 ? (
      <View style={{width:'100%', marginBottom:50}}>
          {renderTransactionByDate()} 
      </View>
      ):(
        <View style={{width:'100%', marginBottom:30, marginTop:20, justifyContent:'center', alignItems:'center'}}>
          <Text>No Transaction</Text>
      </View>
      )}
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
