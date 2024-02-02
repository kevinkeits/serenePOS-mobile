import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import SearchSVG from '../../../assets/svgs/SearchSVG';

interface Coffee {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface Categories {
    id: string;
    name: string;
    totalItem: string;
  }

interface EditItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  data: Coffee[]
  onSave: (selectedData: Coffee[]) => void 
}

const ProductModal: React.FC<EditItemModalProps> = ({ isVisible, onClose, data, onSave }) => {

    const [quantity, setQuantity] = React.useState(1);
    const [textName, setTextName] = React.useState('');
    const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
    const [selectedProducts, setSelectedProducts] = React.useState<Coffee[]>([]);
    const [selectAll, setSelectAll] = React.useState(false);



    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };
    
    const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleClose = () => {
        setTextName('')
        setQuantity(1)
        onClose()
      };

      const handleCheckboxPress = (itemId: number) => {
        if (itemId === -1) {
          // "Select All" checkbox
          setSelectAll(!selectAll);
          if (!selectAll) {
            // If checking "Select All," select all items
            setSelectedItems(data.map((item) => item.id));
            setSelectedProducts([...data]);
          } else {
            // If unchecking "Select All," clear all selections
            setSelectedItems([]);
            setSelectedProducts([]);
          }
        } else {
          // Individual item checkbox
          setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
              // Remove item from selectedProducts when unchecking the checkbox
              const updatedProducts = selectedProducts.filter((product) => product.id !== itemId);
              setSelectedProducts(updatedProducts);
              return prevSelectedItems.filter((id) => id !== itemId);
            } else {
              // Add item to selectedProducts when checking the checkbox
              const selectedProduct = data.find((product) => product.id === itemId);
              if (selectedProduct) {
                setSelectedProducts([...selectedProducts, selectedProduct]);
              }
              return [...prevSelectedItems, itemId];
            }
          });
        }
      };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => handleClose()}
    >
      <View style={styles.modalContainer}>

        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.modalTitle}>Select Product</Text>
          </View>

          <View
                style={{
                    backgroundColor: '#f1f1f1',
                    borderColor: '#D2D2D2',
                    borderWidth: 0.5,
                    borderRadius:5,
                    flexDirection:'row',
                    marginHorizontal: 20,
                    alignItems:'center',
                    marginVertical:5,
                    width:'90%'
                }}>
                    <View style={{paddingLeft:10}}>
                        <SearchSVG width='14' height='14' color='grey'/>
                    </View>
                        <TextInput
                            editable
                            // multiline
                            // numberOfLines={4}
                            placeholder='Search Product...'
                            maxLength={40}
                            onChangeText={text => setTextName(text)}
                            value={textName}
                            style={{ paddingVertical:0, fontSize:8, width:'100%', height:25}}
                        />
            </View>  

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginBottom:3 }}>
              <Text style={{ fontSize: 10, marginRight: 5, color: 'black' }}>selected {selectedItems.length} product(s)</Text>
              <TouchableOpacity onPress={() => handleCheckboxPress(-1)}>
                <Text style={{ fontSize: 10, color: 'black' }}>
                  {selectAll ? 'Unselect All' : 'Select All'}
                </Text>
              </TouchableOpacity>
            </View>

<ScrollView>
          <View style={{flexDirection:'row', flexWrap:'wrap', gap:6, justifyContent:'center', alignItems:'center'}}>
            {data.map((x, index)=> (
            <View key={index} style={{flexDirection:'row', padding:0, gap:0,  justifyContent:'center', alignItems:'center'}}>

                  <TouchableOpacity onPress={() => handleCheckboxPress(x.id)} style={{ marginRight: 5 }}>
                    {selectedItems.includes(x.id) ? (
                      <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'green' }}>✔</Text>
                    ) : (
                      <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>◻</Text>
                    )}
                  </TouchableOpacity>
            <TouchableOpacity 
            key={index}
            //onPress={() => handleProductPress(x)} 
            style={styles.cardRow}>
                <View style={{width:60, height:60}}>
                    <Image source={{ uri: x.image }} style={{width:'100%', height:'100%'}} />
                </View>

                <View style={{}}>
                    <Text style={{fontSize:8, fontWeight:'bold', maxWidth:'95%', color:'black'}} numberOfLines={1} ellipsizeMode="tail">{x.title}</Text>
                </View>
            </TouchableOpacity>
            </View>
            ))}
          </View>
 </ScrollView>

          <View style={{marginVertical:5,  width:'90%', justifyContent:'center', alignSelf:'center' }}>
                    <TouchableOpacity onPress={() => onSave(selectedProducts)} style={{justifyContent:'center', alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5}}>
                        <Text style={{fontSize:10, color:'white', fontWeight:'500'}}>Select Product</Text>
                    </TouchableOpacity>                
        </View>
          
         
          <TouchableOpacity onPress={() => handleClose()} style={styles.closeButton}>
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
    width: '90%',
    height:'97%',
    backgroundColor: 'white',
    paddingTop: 10,
    borderRadius: 10,
    position: 'relative',
  },
  titleContainer: {
    //alignItems: 'center',
    marginLeft:10
  },
  modalTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color:'black',
    marginBottom: 5,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dotted',
    marginBottom: 10,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
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
  quantityContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 10,
    width: '80%',
  },
  quantityButton: {
    backgroundColor: '#2563EB',
    padding:7,
    borderRadius: 3,
    marginHorizontal: 3,
    height:25,
  },
  quantityBorder: {
    borderWidth: 0.5,
    borderColor: '#D2D2D2',
    width:'90%',
    height:25,
    padding: 5,
    alignItems: 'center',
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
  cardRow: {
    //flexDirection:'row', 
    //padding:10, 
    gap:5,
    // borderWidth:0.5, 
    borderRadius:7,  
    height:80, 
    justifyContent:'center', 
    alignItems:'center',
    // borderColor:'#D2D2D2',
    width:100, 
    margin: 4,
  },
});

export default ProductModal;
