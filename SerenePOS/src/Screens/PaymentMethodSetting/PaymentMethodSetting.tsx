import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput, Switch } from 'react-native'
import TrashSVG from '../../assets/svgs/TrashSVG'
import CommonLayout from '../../Components/CommonLayout/CommonLayout'
import ImagePicker, { ImageLibraryOptions, ImagePickerResponse  } from 'react-native-image-picker';
import DetailModal from './components/DetailModal/DetailModal'





export interface Coffee {
    id: number;
    title: string;
    price: number;
    image: string;
  }

  interface CustomImagePickerResponse extends ImagePickerResponse {
    uri?: string;
    error?: string;
  }

  interface CategoryOption {
    label: string;
    value: string;
  }

  const temperatureOptions = [
    { id: 'hot', label: 'Hot' },
    { id: 'ice', label: 'Ice' },
    // Add more options as needed
  ];

  const sugarOptions = [
    { id: 'normal', label: 'Normal' },
    { id: 'moreSugar', label: 'More Sugar' },
    { id: 'lessSugar', label: 'Less Sugar' },
    // Add more options as needed
  ];

  const addOnOptions = [
    { id: 'sugarSyrup', label: 'Sugar Syrup' },
    { id: 'bobba', label: 'Bobba' },
    { id: 'grassJelly', label: 'Grass Jelly' },
    { id: 'milk', label: 'Milk' },
    { id: 'cheese', label: 'Cheese' },
    // Add more options as needed
  ];

const PaymentMethodSetting = () => {

    const [coffeeData, setCoffeeData] = React.useState<Coffee[]>([]);
    const [isOpenDetail, setIsOpenDetail] = React.useState(false);
    const [textPrice, setTextPrice] = React.useState('');
  

  const [selectedSugarIds, setSelectedSugarIds] = React.useState<string[]>([]);
  const [sugarInputValues, setSugarInputValues] = React.useState<string[]>(sugarOptions.map(() => ''));
  const [isSugarSubmitting, setIsSugarSubmitting] = React.useState(false); 


  const onOpenDetail = () => {
    setIsOpenDetail(true);
  };

  const onCloseDetail = () => {
    setIsOpenDetail(false);
  };


  const handleTextInputSugarChange = (id: string, text: string) => {
    setSugarInputValues((prevValues) => {
      const index = sugarOptions.findIndex((option) => option.id === id);
      const newValues = [...prevValues];
      newValues[index] = text;
      return newValues;
    });
  };


  const handleOptionSugarChange = (id: string) => {
    setSelectedSugarIds((prevIds) => {
      if (prevIds.includes(id)) {
        // If the ID is already in the array, remove it
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        // If the ID is not in the array, add it
        return [...prevIds, id];
      }
    });
  };
 
    

    const navigation = useNavigation();


    const fetchData = async () => {
        try {
          const response = await axios.get('https://fakestoreapi.com/products?limit=12');
          const data: Coffee[] = response.data;
          setCoffeeData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const categoryOptions: CategoryOption[] = [
        { label: 'Category 1', value: 'category1' },
        { label: 'Category 2', value: 'category2' },
        { label: 'Category 3', value: 'category3' },
        // Add more categories as needed
      ];

     

    


    React.useEffect(() => {
        fetchData();
      }, []);

  return (
    <CommonLayout>
      <View style={{}}>
      <View style={{flexDirection: 'row', justifyContent:'space-between',  marginLeft:10, marginRight:30, marginVertical:10, alignItems:'center'}}>
        <Text style={{fontWeight:"bold", fontSize:12, marginVertical: "auto", justifyContent: 'center', alignItems: 'center', textAlign:'center'}}>Payment Method</Text>
        <View style={{flexDirection:'row', gap:4}}>
        <TouchableOpacity onPress={() => onOpenDetail()} style={{borderWidth:0.5, paddingHorizontal:13, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor: 'green'}}>
            <Text style={{fontWeight:'bold', fontSize:14, color:'black'}}>+</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleDeleteModeToggle} style={{borderWidth:0.5, paddingHorizontal:13, borderRadius:10, justifyContent:'center', alignItems:'center', borderColor:'red'}}>
            <TrashSVG width='12' height='12' color='red'/>
        </TouchableOpacity> */}
      </View>
      </View>
      <View style={{}}>
      <Text style={{ fontSize: 10, marginLeft: 10, color: 'black' }}> {selectedSugarIds.length} payment(s) selected</Text>
        <View style={{width:'100%',}}>

        <View style={{margin:10, width:'80%',  }}>
          <View>
            {sugarOptions.map((option, index) => (
            <View key={option.id} style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                activeOpacity={1}
                onPress={() => handleOptionSugarChange(option.id)}
              >
                <View style={styles.checkbox}>
                  {selectedSugarIds.includes(option.id) && <View style={styles.checkboxInner} />}
                </View>
                <Text style={styles.checkboxLabel}>{option.label}</Text>
              </TouchableOpacity>

            </View>
          ))}
        </View>
        </View>


        <View style={{margin:10, width:'80%',  }}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', backgroundColor:'#2563EB', padding:4, borderRadius:5}}>
                        <Text style={{fontSize:10, color:'white', fontWeight:'500'}}>Save</Text>
                    </TouchableOpacity>     

                    <TouchableOpacity onPress={()=> navigation.goBack()} style={{marginVertical:10, justifyContent:'center', alignItems:'center', borderWidth:0.5, borderColor: '#D2D2D2', padding:4, borderRadius:5}}>
                        <Text style={{fontSize:10, color:'black', fontWeight:'500'}}>Cancel</Text>
                    </TouchableOpacity>       
        </View>

        </View>
      </View>

      

      </View>
        <DetailModal isVisible={isOpenDetail} selectedIds={selectedSugarIds} onClose={onCloseDetail}/>
      
    </CommonLayout>
  )
}

const styles = StyleSheet.create({
    firstRowItem: {
      backgroundColor:"blue",
      justifyContent: 'flex-end',
      width:120, 
      height:70, 
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
      //marginTop:10
    },
    quantityContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        //marginBottom: 10,
        width:'80%'
      },
      quantityButton: {
        backgroundColor: '#2563EB',
        padding:7,
        height:25,
        borderRadius: 3,
        
        marginHorizontal: 5,
      },
      quantityBorder: {
        borderWidth: 0.5,
       borderColor: '#D2D2D2',
        width:'100%',
        height:25,
        //padding: 5,
        alignItems: 'center',
        justifyContent:'center',
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
      dropdownButton: {
        borderWidth: 1,
        padding: 10,
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        width:50
      },
      checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkboxInner: {
        width: 12,
        height: 12,
        borderRadius: 3,
        backgroundColor: '#2563EB',
      },
      checkboxLabel: {
        marginLeft: 8,
        fontSize: 8,
        width:50,
        color:'black'
      },
      servingInput: {
        height: 25,
        width: '60%',
        borderColor: 'gray',
        paddingVertical:5,
        paddingLeft: 8,
        fontSize: 8,
        borderRadius:7,
        marginLeft:20
      },
    
  });

export default PaymentMethodSetting