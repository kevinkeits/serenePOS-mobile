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

const iceData = [
  { id: 'normal', label: 'Normal', additionalData: '0' },
  { id: 'less', label: 'Less Ice', additionalData: '0' },
  { id: 'more', label: 'More Ice', additionalData: '3000' },
];

const sugarData = [
  { id: 'normal', label: 'Normal', additionalData: '0' },
  { id: 'less', label: 'Less Sugar', additionalData: '0' },
  { id: 'more', label: 'More Sugar', additionalData: '3000' },
];

const serveData = [
  { id: 'hot', label: 'Hot', additionalData: '0' },
  { id: 'ice', label: 'Ice', additionalData: '0' },
];

const discountData = [
  { id: '1', label: 'No Discount', additionalData: '0' },
  { id: '2', label: 'Discount', additionalData: '0' },
];

const discountTypeData = [
  { id: '1', label: 'Rp', additionalData: '0' },
  { id: '2', label: '%', additionalData: '0' },
];

const addOnOptions = [
  { id: 'sugarSyrup', label: 'Sugar Syrup' },
  { id: 'bobba', label: 'Bobba' },
  { id: 'grassJelly', label: 'Grass Jelly' },
  { id: 'milk', label: 'Milk' },
  { id: 'cheese', label: 'Cheese' },
  // Add more options as needed
];

const EditItemModal: React.FC<EditItemModalProps> = ({ isNewOpen, isVisible, onClose, selectedItem, selectedProductVariantID, onSave }) => {
  const [isEdit, setIsEdit] = React.useState(false);

    const [quantity, setQuantity] = React.useState(1);
    const [discValue, setDiscValue] = React.useState('0');
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
      };

      const handleDiscountTypePress = (option: string) => {
        setDiscTypeValue(option);
      };

  
      const handleSave = (item: ProductDetail | null) => {
        if (item) {
          item.product.selectedNotes = notes;
          item.product.selectedQty = quantity.toString()
          item.product.selectedDiscountType = discTypeValue
          item.product.selectedDiscountValue = discValue
          onSave(item, selectedVariantIds)
          closeWindow()
        }
      }

      const closeWindow = () => {
        setSelectedVariantIds([])
        setQuantity(1)
        setNotes('')
        setSelectedDiscount('1')
        setDiscValue('0')
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

      // if (isVisible) setIsEdit(true)
      // else setIsEdit(false)

      // if (isEdit && selectedItem) {
      //   //console.log(selectedItem)
      //   setIsEdit(false)
      // }

      const handleVariantOptionChange = (id: string) => {
        // Calculate the updated selectedVariantIds
        let updatedSelectedVariantIds: string[];
        if (selectedVariantIds.includes(id)) {
          // If the ID is already in the array, remove it
          updatedSelectedVariantIds = selectedVariantIds.filter((prevId) => prevId !== id);
        } else {
          // If the ID is not in the array, add it
          let removedIds = selectedVariantIds;
          const parentData = selectedItem?.variant.find((x) => x.productVariantOptionID == id)
          const siblingData = selectedItem?.variant.filter((x) => x.variantID == parentData?.variantID)
          if (siblingData) {
            for (let index = 0; index < siblingData.length; index++) {
              removedIds = removedIds.filter((prevId) => prevId !== siblingData[index].productVariantOptionID);
            }
          }
          updatedSelectedVariantIds = [...removedIds, id];
        }
      
        // Update selectedVariantIds state immediately
        setSelectedVariantIds(updatedSelectedVariantIds);
      
        // // Calculate updated isSelectedOptions immediately
        // setIsSelectedOptions((prevOptions) => {
        //   if (!detailData) {
        //     // If detailData is null, return the previous options
        //     return prevOptions;
        //   }
      
        //   const updatedOptions = detailData.variant.map((variant) => {
        //     // Check if the variant's ID is present in updatedSelectedVariantIds
        //     return updatedSelectedVariantIds.includes(variant.variantOptionID) ? 'T' : 'F';
        //   });
      
        //   return updatedOptions;
        // });
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
          <View key={variantID} style={{flexDirection:'row', borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey'}}>
            <View style={{width:'30%', marginTop:10}}>
              <Text style={{ fontSize: 10, color: 'black' }}>{selectedItem?.variant.find((x) => x.variantID == variantID)?.name}</Text>
            </View>
            <View style={{marginBottom:10}}>
            {groupedVariants[variantID].map((name, index) => (
               <View key={name.productVariantOptionID} style={{ flexDirection: 'row', alignItems: 'center'}}>
               <TouchableOpacity
                 style={styles.checkboxContainer}
                 activeOpacity={1}
                 onPress={() => handleVariantOptionChange(name.productVariantOptionID)}
               >
                 <View style={styles.checkbox}>
                   {selectedVariantIds.includes(name.productVariantOptionID) && 
                     <Text style={{ fontSize: 12, color: 'white', backgroundColor:'#2563EB', width: 20,
                     height: 20,
                     borderRadius: 4, textAlign:'center' }}>✔</Text>
                   }
                 </View>
                 <Text style={styles.checkboxLabel}>{name.label}</Text>
               </TouchableOpacity>
               <Text style={{fontSize:8, color:'black'}}>
                {parseInt(name.price) > 0 ? `(Rp ${parseInt(name.price).toLocaleString()})` : '(free)' } 
               </Text>
             </View>
            ))}
            </View>
          </View>
        ));
      };

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
          <View style={{ flexDirection: 'row', justifyContent:'space-between', borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey'}}>
            <Text style={{justifyContent:'center', marginTop:5, fontSize:10, color:'black'}}>Amount </Text>
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
            <Text style={{justifyContent:'center', marginTop:5, fontSize:10,  color:'black', width:'15%'}}>Discount </Text>
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
                    height:25,
                    marginBottom:10
                }}>
                <TextInput
                    editable
                    // multiline
                    // numberOfLines={4}
                    placeholder='Type here'
                    maxLength={40}
                    onChangeText={text => 
                        setDiscValue(text)
                    }
                    value={discValue}
                    style={{paddingLeft: 10, paddingVertical:1, fontSize:8}}
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
                    {fontSize: 8, color:'black', borderWidth:0.5, width:20, borderColor:'#dfdfdf', borderRadius:3, height:20, textAlign:'center', paddingTop:4},
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
            <Text style={{justifyContent:'center', marginTop:5, fontSize:10,  color:'black'}}>Notes </Text>
            <View
                style={{
                    backgroundColor: notes,
                    borderColor: '#D2D2D2',
                    borderWidth: 0.5,
                    borderRadius:5,
                    width: '60%',
                    // marginLeft:20,
                    // height:25,
                    marginBottom:10
                }}>
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    placeholder='Type here'
                    maxLength={40}
                    onChangeText={text => 
                        setNotes(text)
                    }
                    value={notes}
                    style={{paddingLeft: 5, paddingVertical:2, fontSize:8, textAlignVertical: 'top'}}
                />
            </View>
          </View>

        </ScrollView>

          <View style={{width:'90%', marginTop:10, backgroundColor: '#2563EB', padding:6, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5}}>
            <TouchableOpacity onPress={() => handleSave(selectedItem)} style={{width:'100%', alignItems:'center'}}>
                <Text style={{fontSize:8, fontWeight:'bold', color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => closeWindow()} style={styles.closeButton}>
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
    width: '50%',
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
    fontSize: 10,
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
    fontSize: 15,
  },
  quantityContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#2563EB',
    padding:7,
    borderRadius: 5,
    
    marginHorizontal: 5,
  },
  quantityBorder: {
    borderWidth: 1,
    borderColor: '#dfdfdf',
    width:'50%',
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#2563EB',
  },
  optionText: {
    fontSize: 8,
    color:'black',
    width:'40%'
  },
  additionalText: {
    fontSize: 8,
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
    width: 16,
    height: 16,
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
    fontSize: 8,
    width:'100%',
    color:'black'
  },
});


export default EditItemModal;
