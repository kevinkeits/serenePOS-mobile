import React from 'react'
import { Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
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

export interface Coffee {
    id: number;
    title: string;
    price: number;
    image: string;
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

    const [customerName, setCustomerName] = React.useState('Aulia');




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
          const response = await axios.get('https://fakestoreapi.com/products?limit=5');
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
  
      const addToSelectedItems = (item: Coffee) => {
        if (!selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
          setSelectedItems((prevItems) => [...prevItems, item]);
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

  const data = [
    {
    id: '1',
    name: 'Coffee',
    totalItem: '3'
  },
  {
    id: '2',
    name: 'Non Coffee',
    totalItem: '5'
  },
  {
    id: '3',
    name: 'Food',
    totalItem: '10'
  },
  {
    id: '4',
    name: 'Main Course',
    totalItem: '8'
  },
  {
    id: '5',
    name: 'Signature',
    totalItem: '8'
  },
  {
    id: '6',
    name: 'Dessert',
    totalItem: '9'
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

      <View style={{ marginHorizontal:"auto", flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {data.map((x, index) => (
            <TouchableOpacity key={index} style={styles.firstRowItem}>
            <View style={{marginBottom:10, marginLeft: 10}}>
            <Text style={{fontWeight: "bold", color: "white", fontSize: 12}}>{x.name}</Text>
            <Text style={{ color: "white", fontSize: 11}}>{x.totalItem} Items</Text>
            </View>
          </TouchableOpacity>
        ))}
      
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:10, marginRight:30, marginTop:20}}>
      <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto"}}>Coffee</Text>
      <Text style={{fontWeight:"bold", fontSize:17}}></Text>
      </View>
    <View style={{justifyContent:'center', alignItems: 'center', marginBottom:20}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      {coffeeData.map((x) => (
        <TouchableOpacity key={x.id} style={styles.card} onPress={() => addToSelectedItems(x)}>
          <Image source={{ uri: x.image }} style={styles.image} />
          <Text style={styles.title}>{x.title}</Text>
          <Text style={styles.price}>${x.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>

    </View>

    <View style={styles.selectedItemsContainer}>
      <View>
      <Text style={{fontSize:7, marginTop:3, marginHorizontal:10, marginBottom:5, color:'black'}}>{getCurrentDate()}</Text>
        <View style={{flexDirection:'row', justifyContent: 'space-between', marginHorizontal:8}}>
          <Text style={{fontSize:10, fontWeight:'bold', color:'black'}}>#{customerName}</Text>
          <View style={{flexDirection:'row', gap:2}}>
            <TouchableOpacity>
              <Text style={{fontSize:6}} onPress={()=> onOpenDiscount()}>
                <DiscountSVG width='16' heigth='16'/>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> onOpenOrder()}>
              <PencilSVG width='16' heigth='11' color='white' />
            </TouchableOpacity>
          </View>
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

          <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => removeFromSelectedItems(item.id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={() => openEditModal(item)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
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

          <TouchableOpacity style={styles.billButton}>
            <Text style={styles.billButtonText}>Open Bill</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
    <EditItemModal isVisible={isEditModalVisible} selectedItem={selectedItemForEdit} onClose={closeEditModal} />
    <PaymentMethodModal isVisible={isOpenPayment} totalPrice={totalPriceState} onClose={onClosePayment}/>
    <EditOrderModal isVisible={isOpenOrder} onClose={onCloseOrder} name={customerName} onSave={onSaveOrder} />
    <DiscountModal isVisible={isOpenDiscount} onClose={onCloseDiscount} selectedIDs={selectedItems.map((x) => x.id)} />

    </CommonLayout>
  )
}

const styles = StyleSheet.create({
  firstRowItem: {
    backgroundColor:"blue",
    justifyContent: 'flex-end',
    width:100, 
    height:100, 
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
    marginRight: 10,
    borderWidth: 1,
    width:90, 
    height:120, 
    borderRadius:15, 
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
    borderRadius: 16,
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
  selectedItemsTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    marginLeft:10,
    marginTop:10
  },
  selectedItem: {
    // alignItems: 'center',
    padding: 8,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'dotted',  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
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
    borderColor: '#2563EB',
    borderWidth: 1,
    padding: 6,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
    alignItems:'center',
    marginBottom:10
  },
  billButtonText: {
    color: '#2563EB',
    fontSize: 9,
    fontWeight: 'bold',
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
});

export default Sales