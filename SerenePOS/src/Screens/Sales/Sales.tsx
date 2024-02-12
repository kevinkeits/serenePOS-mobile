import React from 'react'
import { Button, StyleSheet, Text, View, Image, ScrollView, TextInput } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import CommonLayout from '../../Components/CommonLayout/CommonLayout';
import EditItemModal from './components/EditItemModal/EditItemModal';
import PaymentMethodModal from './components/PaymentMethodModal/PaymentMethodModal';
import EditOrderModal from './components/EditOrderModal/EditOrderModal';
import DiscountModal from './components/DiscountModal/DiscountModal';
import PencilSVG from '../../assets/svgs/PencilSVG';
import DiscountSVG from '../../assets/svgs/DiscountSVG';
import ReceiptSVG from '../../assets/svgs/ReceiptSVG';
import CartSVG from '../../assets/svgs/CartSVG';
import SaveSVG from '../../assets/svgs/SaveSVG';
import TrashSVG from '../../assets/svgs/TrashSVG';
import TransactionModal from './components/TransactionModal/TransactionModal';

export interface Coffee {
    id: number;
    title: string;
    price: number;
    image: string;
  }

  export interface Categories {
    id: string;
    name: string;
    totalItem: string;
    color?: string;
  }

const Sales = () => {

    const [coffeeData, setCoffeeData] = React.useState<Coffee[]>([]);
    const [selectedItems, setSelectedItems] = React.useState<Coffee[]>([]);
    const [isEditModalVisible, setEditModalVisible] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState<Coffee | null>(null);
    const [totalPriceState, setTotalPriceState] = React.useState(0);
    const [isOpenPayment, setIsOpenPayment] = React.useState(false);
    const [isOpenOrder, setIsOpenOrder] = React.useState(false);
    const [isOpenDiscount, setIsOpenDiscount] = React.useState(false);
    const [customerName, setCustomerName] = React.useState('');
    const [isOpenTransaction, setIsOpenTransaction] = React.useState(false);



    const getCurrentDate = () => {
      const currentDate = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      };
    
      return currentDate.toLocaleDateString(undefined, options);
    };

    const fetchData = async () => {
        try {
          const response = await axios.get('https://fakestoreapi.com/products?limit=12');
          const data: Coffee[] = response.data;
          setCoffeeData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const openEditModal = (item: Coffee) => {
        setSelectedItemForEdit(item);
        setEditModalVisible(true);
      };
    
      const closeEditModal = () => {
        setEditModalVisible(false);
        setSelectedItemForEdit(null);
      };

      const onOpenPayment = () => {
        setIsOpenPayment(true);
        setTotalPriceState(calculateTotalPrice().totalPrice);
      };
    
      const onClosePayment = () => {
        setIsOpenPayment(false);
      };

      const onOpenOrder= () => {
        setIsOpenOrder(true);
      };
    
      const onCloseOrder = () => {
        setIsOpenOrder(false);
      };

      const onOpenTransaction= () => {
        setIsOpenTransaction(true);
      };
    
      const onCloseTransaction = () => {
        setIsOpenTransaction(false);
      };

      const onSaveOrder = (name: string) => {
        setCustomerName(name)
        onCloseOrder()
      }

      const onOpenDiscount= () => {
        setIsOpenDiscount(true);

      };
    
      const onCloseDiscount = () => {
        setIsOpenDiscount(false);
      };
  
      const addToSelectedItems = (item: Coffee | null) => {
        if (item) {
          if (!selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
            setSelectedItems((prevItems) => [...prevItems, item]);
          }
        }
      };
    
      const removeFromSelectedItems = (itemId: number) => {
        setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      };

      const calculateTotalPrice = () => {
        const subtotal = selectedItems.reduce((total, item) => total + item.price, 0);
        const taxRate = 0.1; 
        const tax = subtotal * taxRate;
        const discount = 0; 
        const totalPrice = subtotal + tax - discount;


        return {
          subtotal,
          tax,
          discount,
          totalPrice,
        };
      };

  const navigation = useNavigation();

  const data: Categories[] = [
    {
    id: '1',
    name: 'Coffee',
    totalItem: '3',
    color: '#7653DA',
  },
  {
    id: '2',
    name: 'Non Coffee',
    totalItem: '5',
    color: '#2925EB',
  },
  {
    id: '3',
    name: 'Food',
    totalItem: '10',
    color: '#2563EB',
  },
  {
    id: '4',
    name: 'Main Course',
    totalItem: '8',
    color: '#4AB8E8',
  },
  {
    id: '5',
    name: 'Signature',
    totalItem: '8',
    color: '#E88C4A',
  },
  {
    id: '6',
    name: 'Dessert',
    totalItem: '9',
    color: '#E84AD8',
  },
  {
    id: '7',
    name: 'Etc',
    totalItem: '6',
    color: '#E84A4A',
  },
];


React.useEffect(() => {
    fetchData();
  }, []);


  return (
    <CommonLayout>
      <View style={{flexDirection:'row'}}>
        <View style={{width: '70%'}}>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, }}>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", color:'black'}}>Sales</Text>
      <Text style={{fontWeight:"bold", fontSize:17, }}></Text>
      </View>
      <View style={{height:85}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal:"auto", flexDirection: 'row'}}>
        {data.map((x, index) => (
            <TouchableOpacity
            onPress={() => fetchData()} 
            key={index} 
            style={[
              styles.firstRowItem,
              {backgroundColor: x.color}
              ]}>
            <View style={{marginBottom:10, marginLeft: 10}}>
            <Text style={{fontWeight: "bold", color: "white", fontSize: 12}}>{x.name}</Text>
            <Text style={{ color: "white", fontSize: 11}}>{x.totalItem} Items</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginTop:20}}>
      {/* <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto"}}>Coffee</Text> */}
      <Text style={{fontWeight:"bold", fontSize:17}}></Text>
      </View>
    <View style={{ alignItems: 'center', marginBottom:20, marginLeft:10, width:'100%', flexDirection:'row', flexWrap:"wrap"}}>
      {coffeeData.map((x) => (
        // <TouchableOpacity key={x.id} style={styles.card} onPress={() => addToSelectedItems(x)}>
        <TouchableOpacity key={x.id} style={styles.card} onPress={() => openEditModal(x)}>
          <Image source={{ uri: x.image }} style={styles.image} />
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{x.title}</Text>
          <Text style={styles.price}>${x.price}</Text>
        </TouchableOpacity>
      ))}
    </View>

    </View>



        {/* Side Container */}

{selectedItems.length > 0 ? (
    <View style={styles.selectedItemsContainer}>
      <View>
      <Text style={{fontSize:7, marginTop:3, marginHorizontal:10,  color:'black'}}>{getCurrentDate()}</Text>
      <View style={{flexDirection:'row', alignItems:'center',  marginHorizontal:5, marginTop:7, gap:2}}>
            <TouchableOpacity onPress={()=>onOpenTransaction()}>
              <ReceiptSVG width='14' height='14' color='#828282' />
            </TouchableOpacity>
                        <View
                        style={{
                            backgroundColor: customerName,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width: '67%',
                            height:20
                        }}>
                        <TextInput
                            editable
                            // multiline
                            // numberOfLines={4}
                            placeholder='Type here'
                            maxLength={40}
                            onChangeText={text => 
                                setCustomerName(text)
                            }
                            value={customerName}
                            style={{paddingLeft: 10, paddingVertical:1, fontSize:10}}
                        />
                    </View>  
                    <SaveSVG width='14' height='14' color='#828282' />

            <TouchableOpacity>
              <Text style={{fontSize:6}} onPress={()=> onOpenDiscount()}>
                <DiscountSVG width='16' heigth='16'/>
                </Text>
            </TouchableOpacity>
          </View>
        {selectedItems.map((item) => (
        <View key={item.id} style={styles.selectedItem}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={{ fontSize: 8, fontWeight: 'bold', maxWidth: 150  }}>{item.title}</Text>
            <Text style={{ fontSize: 8, marginLeft: 5 }}>x 1</Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <Text style={{ fontSize: 8,  maxWidth: 150  }}>Price</Text>
            <Text style={{ fontSize: 8, marginLeft: 5 }}>Rp {item.price}</Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <Text style={{ fontSize: 8,  maxWidth: 150  }}>Discount</Text>
            <Text style={{ fontSize: 8, marginLeft: 5 }}>Rp 0</Text>
          </View>

          <View style={{flexDirection:'row', gap:4, justifyContent:'flex-end'}}>
          <TouchableOpacity onPress={() => removeFromSelectedItems(item.id)} style={{marginTop:5}}>
            <TrashSVG width='12' height='12' color='red'/>
          </TouchableOpacity>
            <TouchableOpacity onPress={() => openEditModal(item)} style={{marginTop:5}}>
               <PencilSVG width='11' heigth='11' color='grey'/>
              </TouchableOpacity>
              </View>
        </View>
        ))}
        </View>

        <View>
          <View style={styles.underline}/>
        <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Subtotal:</Text>
            <Text style={styles.totalPriceAmount}>Rp {calculateTotalPrice().subtotal}</Text>
          </View>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Tax (10%):</Text>
            <Text style={styles.totalPriceAmount}>Rp {calculateTotalPrice().tax}</Text>
          </View>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Discount:</Text>
            <Text style={styles.totalPriceAmount}>-Rp {calculateTotalPrice().discount}</Text>
          </View>
          <View style={styles.dottedUnderline} />
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Total Price:</Text>
            <Text style={styles.totalPriceAmount}>Rp {calculateTotalPrice().totalPrice}</Text>
          </View>
          
          <TouchableOpacity style={styles.payNowButton} onPress={()=> onOpenPayment()}>
            <Text style={styles.payNowButtonText}>Pay Now</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedItems([])} style={styles.billButton}>
            <Text style={styles.billButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

      </View>
      ):(
        <View style={styles.selectedItemsContainerBlank}>
        <View>
          <View style={{flexDirection:'row', alignItems:'center',  marginHorizontal:8, marginTop:7, gap:5}}>
            <TouchableOpacity onPress={()=>onOpenTransaction()}>
              <ReceiptSVG width='14' height='14' color='#828282' />
            </TouchableOpacity>
            <View
                        style={{
                            backgroundColor: customerName,
                            borderColor: '#D2D2D2',
                            borderWidth: 0.5,
                            borderRadius:5,
                            width: '85%',
                            height:20
                        }}>
                        <TextInput
                            editable
                            // multiline
                            // numberOfLines={4}
                            placeholder='Type here'
                            maxLength={40}
                            onChangeText={text => 
                                setCustomerName(text)
                            }
                            value={customerName}
                            style={{paddingLeft: 10, paddingVertical:1, fontSize:10}}
                        />
                    </View>  
          </View>

          </View>
          <View style={{marginHorizontal:8, marginTop:'50%', marginBottom:15 }}>
                <CartSVG width='100' height='100' color='#A4A4A4'/>
                <Text style={{fontSize:10, fontWeight:'bold', textAlign:'center', color:'black', marginTop:10, marginLeft:16}}> Empty Cart</Text>
                <Text style={{fontSize:10, textAlign:'center', color:'black', marginTop:10, marginLeft:16}}>Add Product to the cart from catalog.</Text>
          </View>

  
        </View>
      )} 


        {/* Side Container */}

    </View>
    <EditItemModal isVisible={isEditModalVisible} selectedItem={selectedItemForEdit} onClose={closeEditModal} onSave={addToSelectedItems} />
    <PaymentMethodModal isVisible={isOpenPayment} totalPrice={totalPriceState} onClose={onClosePayment}/>
    <EditOrderModal isVisible={isOpenOrder} onClose={onCloseOrder} name={customerName} onSave={onSaveOrder} />
    <DiscountModal isVisible={isOpenDiscount} onClose={onCloseDiscount} selectedIDs={selectedItems.map((x) => x.id)} />
    <TransactionModal isVisible={isOpenTransaction} onClose={onCloseTransaction}/>


    </CommonLayout>
  )
}

const styles = StyleSheet.create({
  firstRowItem: {
    backgroundColor:"blue",
    justifyContent: 'flex-end',
    width:120, 
    height:80, 
    borderRadius:10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.3,  
    shadowRadius: 4,  
    elevation: 4,
    margin: 5,
  },
  scrollView: {
    flexDirection: 'row',
    marginTop:10
  },
  card: {
    marginRight: 6,
    borderWidth: 0.5,
    marginBottom:10,
    width:105, 
    height:120, 
    borderRadius:10, 
  },
  image: {
    width: '100%',
    height: 50,
    borderRadius:15, 

  },
  title: {
    padding: 10,
    textAlign: 'center',
    fontSize: 8,

  },
  price: {
    paddingVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedItemsContainer: {
    marginVertical: 20,
    width: '30%',
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 5,
justifyContent: 'space-between'
  },
  selectedItemsContainerBlank: {
    marginVertical: 20,
    width: '30%',
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 5,
    alignItems:'center'
  },
  selectedItemsTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    marginLeft:10,
    marginTop:10
  },
  selectedItem: {
    // alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dotted',  },
    deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 8,
    fontWeight: 'bold',
  },
  selectedItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5
  },
  totalPriceText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  totalPriceAmount: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'green', // You can adjust the color as needed
  },
  payNowButton: {
    backgroundColor: '#2563EB',
    padding: 6,
    borderRadius: 8,
    width: '80%',
    marginTop: 10,
    alignSelf: 'center',
    alignItems:'center',
    marginBottom:5
  },
  payNowButtonText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
  },
  billButton: {
    borderColor: '#E84A4A',
    borderWidth: 1,
    padding: 6,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
    alignItems:'center',
    marginBottom:10
  },
  billButtonText: {
    color: 'black',
    fontSize: 9,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#D2D2D2',
    marginBottom: 5,
    marginHorizontal:5
  },
  dottedUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dotted',
    marginBottom: 5,
    marginHorizontal:5

  },
  editButton: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 5,
    //marginTop: 5,
  },
  editButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 8,
    fontWeight: 'bold',
  },
  inputPassword: {
    width: '100%',
    fontSize: 10,
    paddingVertical: 5,
    paddingHorizontal:10,
    lineHeight: 30,
  },
});

export default Sales