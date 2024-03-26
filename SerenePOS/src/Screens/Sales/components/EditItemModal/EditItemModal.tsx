import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GroupedVariant } from '../../../ProductDetail/DetailProduct';
import { Product, ProductDetail } from '../../../Products/Products';


interface RadioProps {
  id: string;
  label: string;
}

interface EditItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedItem: ProductDetail | null;
  selectedProductVariantID: string[];
  isNewOpen: boolean;
  onSave: (item: ProductDetail | null, selectedVariantIds: string[]) => void;
}


const discountData = [
  { id: '1', label: 'No Discount', additionalData: '0' },
  { id: '2', label: 'Discount', additionalData: '0' },
];

const discountTypeData = [
  { id: '1', label: '%', additionalData: '0' },
  { id: '2', label: 'Rp', additionalData: '0' },
];

const EditItemModal: React.FC<EditItemModalProps> = ({ isNewOpen, isVisible, onClose, selectedItem, selectedProductVariantID, onSave }) => {

    const [quantity, setQuantity] = React.useState(1);
    const [discValue, setDiscValue] = React.useState('');
    const [discTypeValue, setDiscTypeValue] = React.useState('0');
    const [notes, setNotes] = React.useState('');
    const [selectedVariantIds, setSelectedVariantIds] = React.useState<string[]>([]);
    const [variantIds, setVariantIds] = React.useState<string[]>([]); 
    const [isSelectedOptions, setIsSelectedOptions] = React.useState<string[]>([]);
    const [options, setOptions] = React.useState({
        option1: false,
        option2: false,
      });

      const [selectedDiscount, setSelectedDiscount] = React.useState<string | null>('1');


      const handleDiscountPress = (option: string) => {
        setSelectedDiscount(option);
        setDiscTypeValue('1');
      };

      const handleDiscountTypePress = (option: string) => {
        setDiscTypeValue(option);
      };

  
      const handleSave = (item: ProductDetail | null) => {
        if (item) {
          item.product.selectedNotes = notes;
          item.product.selectedQty = quantity.toString()
          if (selectedDiscount == '2') {
            if (discValue != '0' && discValue != '') {
              item.product.selectedDiscountType = discTypeValue
              item.product.selectedDiscountValue = discValue
              if (discTypeValue == '2') {
                item.product.selectedTotalDiscount = discValue
              } else {
                item.product.selectedTotalDiscount = (((parseInt(discValue) * parseInt(item.product.price)) / 100) * parseInt(quantity.toString())).toString()
              }
            } else {
              item.product.selectedDiscountType = '0'
              item.product.selectedDiscountValue = '0'
              item.product.selectedTotalDiscount = '0'
            }
          } else {
            item.product.selectedDiscountType = '0'
            item.product.selectedDiscountValue = '0'
            item.product.selectedTotalDiscount = '0'
          }          
          onSave(item, selectedVariantIds)
          closeWindow()
        }
      }

      const closeWindow = () => {
        setSelectedVariantIds([])
        setQuantity(1)
        setNotes('')
        setSelectedDiscount('1')
        setDiscValue('')
        setDiscTypeValue('0')
        onClose()
      }
    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
      };
    
      const decrementQuantity = () => {
        if (quantity > 1) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        }
      };

      const handleOptionToggle = (option: keyof typeof options) => {
        setOptions((prevOptions) => ({
          ...prevOptions,
          [option]: !prevOptions[option],
        }));
      };

      const handleVariantOptionChange = (id: string) => {
        let updatedSelectedVariantIds: string[];

        if (selectedVariantIds.includes(id)) {
          updatedSelectedVariantIds = selectedVariantIds.filter(prevId => prevId !== id);
        } else {
          const parentData = selectedItem?.variant.find(x => x.productVariantOptionID === id);
          const siblingIds = parentData ? selectedItem?.variant.filter(x => x.variantID === parentData.variantID).map(x => x.productVariantOptionID) : [];

          updatedSelectedVariantIds = [...selectedVariantIds.filter(prevId => !siblingIds?.includes(prevId)), id];
        }
        setSelectedVariantIds(updatedSelectedVariantIds);
      };

      const renderVariantsByName = () => {
        const groupedVariants: GroupedVariant = {};
      
        selectedItem?.variant.filter((x) => x.isSelected == 'T').forEach(x => {
          const name = x.variantID
          if (!groupedVariants[name]) {
            groupedVariants[name] = [];
          }
          groupedVariants[name].push(x);
        });
      
        return Object.keys(groupedVariants).map(variantID => (
          <View key={variantID} style={{flexDirection:'row', borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey', marginTop: 8}}>
            <View style={{width:'25%', marginTop:10}}>
              <Text style={{ }}>{selectedItem?.variant.find((x) => x.variantID == variantID)?.name}</Text>
            </View>
            <View style={{marginBottom:10}}>
            {groupedVariants[variantID].map((name, index) => (
               <View key={name.productVariantOptionID} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
               <TouchableOpacity
                 style={styles.checkboxContainer}
                 activeOpacity={1}
                 onPress={() => handleVariantOptionChange(name.productVariantOptionID)}
               >
                 <View style={styles.checkbox}>
                   {selectedVariantIds.includes(name.productVariantOptionID) && 
                     <Text style={{ color: 'white', backgroundColor:'#2563EB', width: 28,
                     height: 28,
                     borderRadius: 4, textAlign:'center' }}>✔</Text>
                   }
                 </View>
                 <Text style={styles.checkboxLabel}>{name.label}</Text>
                 <Text style={{ color:'#000'}}>
                  {parseInt(name.price) > 0 ? `(Rp ${parseInt(name.price).toLocaleString()})` : '(free)' } 
                </Text>
               </TouchableOpacity>
               
             </View>
            ))}
            </View>
          </View>
        ));
      };

      React.useEffect(() => {
        if (isVisible && selectedItem) {
          setQuantity(parseInt(selectedItem?.product.selectedQty ?? '1'));          
          setNotes(selectedItem?.product.selectedNotes ?? '');
          setDiscTypeValue(selectedItem?.product.selectedDiscountType ?? '0')
          setDiscValue(selectedItem?.product.selectedDiscountValue ?? '')
          if (selectedItem?.product.selectedDiscountType) {
            if (selectedItem?.product.selectedDiscountType != '0') setSelectedDiscount('2')
          } else setSelectedDiscount('1')
          setSelectedVariantIds(selectedItem?.variant.filter(x => selectedProductVariantID.includes(x.productVariantOptionID)).map(x => x.productVariantOptionID));
        }
      }, [isVisible, selectedItem]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => closeWindow()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.modalTitle}>{selectedItem?.product.name}</Text>
            <View style={styles.underline}></View>
          </View>
    <ScrollView>
          <View style={{ flexDirection: 'row', gap:50, borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey', alignItems:'center'}}>
            <Text style={{justifyContent:'center', marginTop:5, }}>Amount </Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantityBorder}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          </View>

        <View>
          {renderVariantsByName()}
        </View>


        <View style={{flexDirection: 'row', gap:50, borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey'}}>
            <Text style={{justifyContent:'center', marginTop:5, width:'15%'}}>Discount </Text>
            <View>
              {discountData.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionContainer}
                  onPress={() => handleDiscountPress(option.id)}
                >
                  <View style={styles.radioButton}>
                    {selectedDiscount === option.id && <View style={styles.innerCircle} />}
                  </View>
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}

              {selectedDiscount == '2' && (
                <View style={{flexDirection:'row', width:'80%', alignItems:'center', justifyContent:'center'}}>
                <View
                style={{
                    backgroundColor: discValue,
                    borderColor: '#dfdfdf',
                    borderWidth: 0.5,
                    borderRadius:5,
                    width: '60%',
                    marginLeft:20,
                    height: 32,
                    marginBottom:10
                }}>
                <TextInput
                    editable
                    // multiline
                    // numberOfLines={4}
                    placeholder='Type here'
                    keyboardType="numeric"
                    maxLength={40}
                    onChangeText={text => 
                        setDiscValue(text)
                    }
                    value={discValue != '0' ? discValue : ''}
                    style={{paddingLeft: 10, paddingVertical:1}}
                />
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', gap:4,  marginBottom:10, marginLeft:10 }}>
            {discountTypeData.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionContainer}
                  onPress={() => handleDiscountTypePress(option.id)}
                >
                  {/* <View style={styles.radioButton}>
                    {discTypeValue === option.id && <View style={styles.innerCircle} />}
                  </View> */}
                  <Text 
                  style={[
                    {color:'black', borderWidth:0.5, marginLeft: 4, width:32, borderColor:'#dfdfdf', borderRadius:3, height:32, textAlign:'center', paddingTop:4},
                    discTypeValue == option.id && {backgroundColor: '#2563EB', color:'white'}
                ]}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            </View>
              )}  
          </View>
        </View>

        <View style={{flexDirection: 'row', gap:60, borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey', marginTop:10}}>
            <Text style={{justifyContent:'center', marginTop:5}}>Notes </Text>
            <View
                style={{
                    backgroundColor: notes,
                    borderColor: '#D2D2D2',
                    borderWidth: 0.5,
                    borderRadius:5,
                    width: '60%',
                    marginBottom:10
                }}>
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    placeholder='Type here'
                    maxLength={100}
                    onChangeText={text => 
                        setNotes(text)
                    }
                    value={notes}
                    style={{paddingLeft: 5, paddingVertical:2, textAlignVertical: 'top'}}
                />
            </View>
          </View>

        </ScrollView>

          <View style={{width:'100%', marginTop:10, backgroundColor: '#2563EB', height: 32, padding:6, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5}}>
            <TouchableOpacity onPress={() => handleSave(selectedItem)} style={{width:'100%', alignItems:'center'}}>
                <Text style={{fontWeight:'bold', color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => closeWindow()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
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
    height: '98%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    color:'black',
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  quantityContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#2563EB',
    padding:8,
    // height: 32,
    width: 32,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityBorder: {
    borderWidth: 1,
    borderColor: '#dfdfdf',
    width:'50%',
    padding: 8,
    alignItems: 'center',
    borderRadius: 5,
    // marginHorizontal: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontWeight: 'bold',
        fontSize: 10,
        textAlign:'center',
        marginTop:3
        // marginLeft: 5,
        // marginBottom: 3
  },
  quantityText: {
    fontWeight: 'bold',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: '#2563EB',
  },
  optionText: {
    color:'black',
    width:'40%'
  },
  additionalText: {
    color:'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginVertical:8,
    width:'50%'
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#dfdfdf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },
  checkboxLabel: {
    marginLeft: 8,
    width:'100%',
    color:'black'
  },
});


export default EditItemModal;
