import React,{Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
var validator = require("email-validator");

export default class extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      refresh:0
    }
  }

  addEmployee = () => {
    const data =         {
      name:'Name',
      email:'Email',
      password:'Password',
      namecheck:'Invalid Name',
      emailcheck:'Invalid Email',
      passwordcheck:'Invalid Password',
      passwordshow:true
    };
    this.state.data.push(data);
    let ref = this.state.refresh;
    this.setState({refresh:ref+1})
  };

  removeEmployee = () => {
    const arr = this.state.data;
    const index = this.state.data.length-1;
    let ref = this.state.refresh;
    if (index >=  0) {
      arr.splice(index, 1);
    }
    this.setState({data:arr,refresh:ref-1})
  };

  showhidepassword = (i) => {
    let ref = this.state.refresh;
    if(this.state.data[i].passwordshow === true){
      this.state.data[i].passwordshow=false;
      this.setState({refresh:ref+1})
    } else {
      this.state.data[i].passwordshow=true;
      this.setState({refresh:ref-1})
    }
  }

  submit = (i) => {
    const valid = validator.validate(this.state.data[i].email);
    if(this.state.data[i].name.length > 4 && valid && this.state.data[i].password.length > 6){
      this.state.data[i].namecheck = 'Valid Name'
      this.state.data[i].emailcheck = 'Valid Email'
      this.state.data[i].passwordcheck = 'Valid Password'
    } 
    let ref = this.state.refresh;
    this.setState({refresh:ref+1})
  }

  render(){
    return(
      <View style={styles.container}>
        <SafeAreaView/>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {this.removeEmployee()}}>
          <AntDesign name={'minuscircle'} color={'#000'} size={26}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.addEmployee()}}>
          <AntDesign name={'pluscircle'} color={'#000'} size={26}/>
          </TouchableOpacity>
        </View>
        <ScrollView>
        {this.state.data.map((item,i) => {
          return(
        <View key={i} style={styles.employeeform}>
          <Text style={styles.employeText}>Employee Form {i+1}</Text>
          <View style={styles.inputView}>
            <TextInput
            style={styles.input}
            placeholder={'Name'}
            placeholderTextColor={'#000'}
            onChangeText={(name) => {this.state.data[i].name = name}}/>
          </View>
          <Text style={{color:item.namecheck === 'Invalid Name'?'red':'green',marginLeft:h('4%')}}>{item.namecheck}</Text>
          <View style={styles.inputView}>
            <TextInput
            style={styles.input}
            placeholder={'Email'}
            placeholderTextColor={'#000'}
            onChangeText={(email) => {this.state.data[i].email = email}}/>
          </View>
          <Text style={{color:item.emailcheck === 'Invalid Email'?'red':'green',marginLeft:h('4%')}}>{item.emailcheck}</Text>
          <View style={styles.passwordInput}>
            <TextInput
            style={styles.input}
            secureTextEntry={item.passwordshow}
            placeholder={'Password'}
            placeholderTextColor={'#000'}
            onChangeText={(password) => {this.state.data[i].password = password}}/>
            {item.passwordshow === true ? (
              <TouchableOpacity
              onPress={() => {this.showhidepassword(i)}}>
              <Entypo name={'eye'} color={'#000'} size={22} style={{marginRight:h('2%')}} />
              </TouchableOpacity>
            ):
            <TouchableOpacity
            onPress={() => {this.showhidepassword(i)}}>
            <Entypo name={'eye-with-line'} color={'#000'} size={22} style={{marginRight:h('2%')}} />
            </TouchableOpacity>
            }
          </View>
          <Text style={{color:item.passwordcheck === 'Invalid Password'?'red':'green',marginLeft:h('4%')}}>{item.passwordcheck}</Text>
          <TouchableOpacity 
          onPress={() => {this.submit(i)}}
          style={styles.button}>
            <Text style={{color:'#fff'}}>Submit</Text>
          </TouchableOpacity>
        </View>
        )
      })}        
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height:h('7%'),
    width:'90%',
    // backgroundColor:'#ada',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    alignSelf:'center'
  },
  employeeform: {
    borderTopWidth:h('.11%'),
    marginTop:h('1%'),
    marginBottom:h('1%')
  },
  employeText:{
    color:'#000',
    marginLeft:h('3%'),
    marginTop:h('1%')
  },
  inputView: {
    height:h('6%'),
    width:'86%',
    // backgroundColor:'#ada',
    alignSelf:'center',
    borderRadius:h('1%'),
    marginTop:h('1%'),
    borderWidth:h('.1%'),
    borderColor:'#0004'
  },
  passwordInput: {
    height:h('6%'),
    width:'86%',
    // backgroundColor:'#ada',
    alignSelf:'center',
    borderRadius:h('1%'),
    marginTop:h('1%'),
    borderWidth:h('.1%'),
    borderColor:'#0004',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  input: {
    paddingLeft:h('1%'),
    color:'#000'
  },
  button: {
    height:h('6%'),
    width:'86%',
    backgroundColor:'red',
    alignSelf:'center',
    borderRadius:h('1%'),
    marginTop:h('1%'),
    alignItems:'center',
    justifyContent:'center'
  }
});
