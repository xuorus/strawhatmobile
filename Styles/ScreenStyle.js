import { StyleSheet } from "react-native";

const Save = StyleSheet.create({

    tableContainer:{
    marginVertical: 15,
    marginHorizontal:15,
    overflow: 'scroll'
    },
   
    firstrow:{
        display:'flex',
        flexDirection:'row',
        height:75,
        backgroundColor:'#1A1851',
        justifyContent:'space-evenly',
        alignItems:'center',
      },

      colorText:{
        fontSize: 18,
        color:'white'
      },
    secondrow:{
        display:'flex',
        flexDirection:'row',
        height: 70,
        backgroundColor:'#0D4A77',
        paddingHorizontal:15,
        justifyContent:'space-around',
        alignItems:'center',
    },

    thirdrow:{
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:15,
        justifyContent:'space-around',
        alignItems:'center',
        borderStyle: 'solid',
        borderRightWidth:2,
        borderLeftWidth:2,
        borderColor: '#1A1851',
      },

    thirdrowAlignment:
    {
        marginTop:5,
        fontSize: 15,
        textAlign:"center",
        width:120,
        height:30,
        paddingHorizontal:15
    },

    textStyle:{
        marginRight:12,
        fontSize: 15,
        color:'white'
    },

    ResultStyle:{
      display:"flex",
      flexDirection: 'row',
      backgroundColor:'#FCB315',
      alignItems:'center',
      justifyContent:'space-around',
      borderTopColor:'white',
      borderWidth:2,
      height: 70,
      marginBottom:25,
    },
});

export default Save;