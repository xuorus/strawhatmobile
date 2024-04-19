import {StyleSheet } from "react-native";

const Styles = StyleSheet.create({

  scrollViewContentContainer: {
    flexGrow:1,
    paddingBottom: 20 // Adjust this value as needed
  },
  
  MainContainer: {
    flex:1,
    overflow:'scroll',
    alignContent:'center',
  },
  HeaderContainer:{
    display:'flex',
    flexDirection:'row',
    height: 105,
    backgroundColor: '#1A1851',
    alignItems:'center',
    justifyContent:'space-evenly',
  },

  title:{
    textAlign: 'center',
    fontSize: 20, 
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFF',
    justifyContent: 'center',
    marginTop: 23,
  },

  CourseText:{
    fontSize: 20, 
    fontStyle: 'normal',
    color: '#1A1851',
  },

  CourseContainer:{
    display:'flex',
    height:100,
    flexDirection:'column',
    alignItems:'center',
    paddingHorizontal:50,
    justifyContent:'space-evenly'

  },

  textContainer:{
    display:'flex',
    justifyContent:'flex-start'
  },

  buttonLable:{
    marginHorizontal: 10,
    color: 'white'
  },

  buttonsContainer:{
    flexDirection:'row',
    alignItems:'center'
  },

  tableContainer:{
    marginHorizontal: 25,
    marginVertical: 30,
    borderStyle: 'solid',
    borderWidth: 2, 
    borderColor: '#1A1851',
    overflow: 'scroll'
  },


  firstrow:{
    height:200,
    backgroundColor:'#1A1851',
    justifyContent:'space-evenly',
    alignItems:'center',
  },

  secondrow:{
    display:'flex',
    flexDirection:'row',
    height: 70,
    backgroundColor:'#0D4A77',
    justifyContent:'space-evenly',
    alignItems:'center',
  },

  textStyle:{
      marginRight:22
  },

  colorText:{
    fontSize: 15,
    color:'white'
  },

  thirdrow:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    marginBottom: 5,
  },

  inputStyles:{
    marginTop:5,
    fontSize: 15,
    borderWidth:1,
    borderColor:'#1A1851',
    textAlign:"center",
    width:150,
    height:30,
  },

  pickerStyle:{
    width: 270,
    color: '#1A1851',
    borderRadius:20,
    backgroundColor:'white'
  },

  ResultStyle:{
    display:"flex",
    flexDirection: 'row',
    backgroundColor:'#1A1851',
    alignItems:'center',
    justifyContent:'space-around',
    borderTopColor:'white',
    borderWidth:2,
    height: 70,
  },

  footerContainer:{
    marginVertical:10,
    marginHorizontal: 25,
  },

  footerButton:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal: 60,
    paddingVertical: 10,
  },

  noteStyle:{
      display:'flex',
      margin:10,
      color:'#1A1851',
      textAlign:'justify'
  
  },

  buttonStyles:{
    width: '37.625rem',
    height: '3.75rem',
    flexShrink: 0,
    backgroundColor:'#FCB315'
  }

  


  
});

export default Styles;
