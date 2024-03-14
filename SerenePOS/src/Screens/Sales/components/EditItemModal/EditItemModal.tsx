import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Product } from '../../../Products/Products';


interface RadioProps {
  id: string;
  label: string;
}

interface EditItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedItem: Product | null;
  onSave: (item: Product | null) => void;
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

const EditItemModal: React.FC<EditItemModalProps> = ({ isVisible, onClose, selectedItem, onSave }) => {

    const [quantity, setQuantity] = React.useState(1);
    const [discValue, setDiscValue] = React.useState('');
    const [discTypValue, setDiscTypeValue] = React.useState('');
    const [notes, setNotes] = React.useState('');



    const [options, setOptions] = React.useState({
        option1: false,
        option2: false,
      });

      const [selectedIce, setSelectedIce] = React.useState<string | null>(null);
      const [selectedSugar, setSelectedSugar] = React.useState<string | null>(null);
      const [selectedServe, setSelectedServe] = React.useState<string | null>(null);
      const [selectedDiscount, setSelectedDiscount] = React.useState<string | null>(null);

      const [selectedAddOnIds, setSelectedAddOnIds] = React.useState<string[]>([]);
      const [addOnInputValues, setAddOnInputValues] = React.useState<string[]>(addOnOptions.map(() => ''));
      const [isAddOnSubmitting, setIsAddOnSubmitting] = React.useState(false); 


      const handleIcePress = (option: string) => {
        setSelectedIce(option);
      };

      const handleSugarPress = (option: string) => {
        setSelectedSugar(option);
      };

      const handleServePress = (option: string) => {
        setSelectedServe(option);
      };

      const handleDiscountPress = (option: string) => {
        setSelectedDiscount(option);
      };

      const handleDiscountTypePress = (option: string) => {
        setDiscTypeValue(option);
      };

      const handleOptionAddOnChange = (id: string) => {
        setSelectedAddOnIds((prevIds) => {
          if (prevIds.includes(id)) {
            // If the ID is already in the array, remove it
            return prevIds.filter((prevId) => prevId !== id);
          } else {
            // If the ID is not in the array, add it
            return [...prevIds, id];
          }
        });
      };

  
      const handleSave = (item: Product | null) => {
        onSave(item)
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
            <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
            <View style={styles.underline}></View>
          </View>
    <ScrollView>
          <View style={{flexDirection: 'row', justifyContent:'space-between', borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey'}}>
            <Text style={{justifyContent:'center', marginTop:5, fontSize:10,  color:'black'}}>Amount </Text>
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

        <View style={{flexDirection: 'row', gap:50, borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey'}}>
            <Text style={{justifyContent:'center', marginTop:5, fontSize:10,  color:'black', width:'15%'}}>Ice </Text>
            <View>
              {iceData.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionContainer}
                  onPress={() => handleIcePress(option.id)}
                >
                  <View style={styles.radioButton}>
                    {selectedIce === option.id && <View style={styles.innerCircle} />}
                  </View>
                  <Text style={styles.optionText}>{option.label}</Text>
                  <Text style={[styles.additionalText, {marginLeft:10}]}>(Rp {option.additionalData})</Text>
                </TouchableOpacity>
              ))}
            </View>
        </View>

        <View style={{flexDirection: 'row', gap:50, borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey'}}>
            <Text style={{justifyContent:'center', marginTop:5, fontSize:10,  color:'black', width:'15%'}}>Sugar </Text>
            <View>
              {sugarData.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionContainer}
                  onPress={() => handleSugarPress(option.id)}
                >
                  <View style={styles.radioButton}>
                    {selectedSugar === option.id && <View style={styles.innerCircle} />}
                  </View>
                  <Text style={styles.optionText}>{option.label}</Text>
                  <Text style={[styles.additionalText, {marginLeft:10}]}>(Rp {option.additionalData})</Text>
                </TouchableOpacity>
              ))}
            </View>
        </View>

        <View style={{flexDirection: 'row', gap:50, borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey'}}>
            <Text style={{justifyContent:'center', marginTop:5, fontSize:10,  color:'black', width:'15%'}}>Serve </Text>
            <View>
              {serveData.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionContainer}
                  onPress={() => handleServePress(option.id)}
                >
                  <View style={styles.radioButton}>
                    {selectedServe === option.id && <View style={styles.innerCircle} />}
                  </View>
                  <Text style={styles.optionText}>{option.label}</Text>
                  <Text style={[styles.additionalText, {marginLeft:10}]}>(Rp {option.additionalData})</Text>
                </TouchableOpacity>
              ))}
            </View>
        </View>

        <View style={{flexDirection: 'row', gap:50, borderBottomWidth:1, borderStyle:'dotted', borderColor:'grey'}}>
            <Text style={{justifyContent:'center', marginTop:5, fontSize:10,  color:'black', width:'15%'}}>Add On </Text>
            <View>
              {addOnOptions.map((option) => (
              <TouchableOpacity
              key={option.id}
              style={styles.checkboxContainer}
              activeOpacity={1}
              onPress={() => handleOptionAddOnChange(option.id)}
            >
              <View style={styles.checkbox}>
                {selectedAddOnIds.includes(option.id) && <View style={styles.checkboxInner} />}
              </View>
              <Text style={styles.checkboxLabel}>{option.label}</Text>
            </TouchableOpacity>
              ))}
            </View>
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
                    borderColor: '#D2D2D2',
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
                    {discTypValue === option.id && <View style={styles.innerCircle} />}
                  </View> */}
                  <Text 
                  style={[
                    {fontSize: 8, color:'black', borderWidth:0.5, width:20, borderColor:'#2563EB', borderRadius:3, height:20, textAlign:'center', paddingTop:4},
                    discTypValue == option.id && {backgroundColor: '#2563EB'}
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
                    style={{paddingLeft: 10, paddingVertical:1, fontSize:8}}
                />
            </View>
          </View>

        </ScrollView>

          <View style={{width:'90%', marginTop:10, backgroundColor: '#2563EB', padding:6, justifyContent: 'center', alignItems:'center', alignSelf:'center', borderRadius:5}}>
            <TouchableOpacity onPress={() => handleSave(selectedItem)} style={{width:'100%', alignItems:'center'}}>
                <Text style={{fontSize:8, fontWeight:'bold', color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>

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
    borderColor: '#2563EB',
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
    borderColor: '#2563EB',
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
    marginVertical:10,
    width:50
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#2563EB',
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
    width:50,
    color:'black'
  },
});


export default EditItemModal;
