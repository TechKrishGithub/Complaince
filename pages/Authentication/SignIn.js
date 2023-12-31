// import React, { useState,useEffect } from "react";
// import {
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   Text,
//   SafeAreaView,
//   Alert
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import styles from "./style";
// import db from "../../permitsDb";
// import NetInfo from '@react-native-community/netinfo';
// import { apiEndpoints } from "../../config/endpoints";
// import { ActivityIndicator } from "react-native-paper";

// const SignInScreen = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [isLoading,setIsLoading]=useState(false);

//   const [error,setError]=useState('');
//   const [success,setSuccess]=useState('');

//   const navigation = useNavigation();

//   useEffect(()=>
//   {
//     createTables();
//     setTimeout(()=>
//     {
//       createTables();
//     },500)
//   },[])

//   const createTables=()=>
//   {
//     db.transaction(tx => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS User_Master (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR, password VARCHAR,userid INTEGER,token VARCHAR)',
//       );
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS ComplianceSubfacterQuetions(id INTEGER PRIMARY KEY AUTOINCREMENT,criteriaId VARCHAR,factorId VARCHAR,criteriaName TEXT,subCriteria VARCHAR,maxScore INTEGER,permittype VARCHAR)'
//       )
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS ComplianceFacters(id INTEGER PRIMARY KEY AUTOINCREMENT,factorId VARCHAR,factorName TEXT,factorDescription VARCHAR,permitTypeId VARCHAR)'
//       )
//     });
//   }

//   const checkTableIsEmptyOrNot=(TableName)=>
//   {

//     const isTableEmpty = () => {
//       return new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//           tx.executeSql(
//             'SELECT COUNT(*) as count FROM '+TableName+'',
//             [],
//             (_, result) => {
//               const count = result.rows.item(0).count;
//               resolve(count === 0);
//             },
//             (_, error) => {
//               reject(error);
//             }
//           );
//         });
//       });
//     };
//      return isTableEmpty();
//   }


//   const dataInsertingIntoTables=()=>
//   {
//     checkTableIsEmptyOrNot('ComplianceSubfacterQuetions').then(async (empty)=>
//       {
//         const response = await fetch(apiEndpoints.getComplianceSubfacterQuetions);
//           const responseData = await response.json();
//         if(empty)
//         {
//           if(responseData)
//           {
//             const result=JSON.parse(responseData);
//             db.transaction(tx => {
//               result.map((i)=>
//               {
//                 tx.executeSql('INSERT INTO  ComplianceSubfacterQuetions (criteriaId,factorId,criteriaName,subCriteria,maxScore,permittype) VALUES (?, ? , ? , ? , ?, ?)', [i.criteriaId, i.factorId,i.criteriaName,i.subCriteria,i.maxScore,i.permittype], (tx, results) => {
//                   if (results.rowsAffected > 0)
//                    {
//                     console.log('ComplianceSubfacterQuetions Successful');
//                   } else 
//                   {
//                     console.log('Error adding');
//                   }
//               })
//             })
//           })
//           }
//         }
//         else
//         {
//           console.log('ComplianceSubfacterQuetions This Table Already Having Data')
//         }
//       })
//       checkTableIsEmptyOrNot('ComplianceFacters').then(async(empty)=>
//         {
//           const response = await fetch(apiEndpoints.getComplainceFactors);
//           const responseData = await response.json();
//           if(empty)
//           {
//             const result=JSON.parse(responseData);
//             db.transaction(tx => {
//               result.map((i)=>
//               {
//                 tx.executeSql('INSERT INTO  ComplianceFacters (factorId,factorName,factorDescription,permitTypeId) VALUES (?, ? , ? , ?)', [i.factorId,i.factorName,i.factorDescription,i.permitTypeId], (tx, results) => {
//                   if (results.rowsAffected > 0)
//                    {
//                     console.log('ComplianceFacters Successful');
//                   } else 
//                   {
//                     console.log('Error adding');
//                   }
//               })
//             })
//           })
//           }
//           else
//           {
//             console.log('ComplianceFacters This Table Already Having Data')
//           }
//         })
//   }


//   const handleLogIn = async () => {
//     // Perform sign-in logic
//     const netInfo = await NetInfo.fetch();
//     const isConnected = netInfo.isConnected;    
//     if (isConnected==false) {
//       Alert.alert(
//         'No Network Connection',
//         'Please connect to a network and try again.',
//         [{ text: 'OK' }],
//         { cancelable: false }
//       );
//     }
//     else
//     {
//       if (username && password) {
//         // calling Api and saving user credentials to AsyncStorage
//         fetch('http://182.18.181.115:8084/api/login/loginservice?username='+username+'&password='+password+'').
//         then(response=>response.json()).
//         then(responseText=>JSON.parse(responseText)).
//         then(async (result)=>{
    
//           if(result.length!==0)
//           {
//             setIsLoading(true);
//             dataInsertingIntoTables();
//             try {
//               console.log(result[0].userid);
//               console.log(result[0].token);
//               await AsyncStorage.setItem("username", username);
//               await AsyncStorage.setItem("password", password);
//               checkTableIsEmptyOrNot('User_Master').then(empty=>
//                 {
//                   if(empty)
//                   {
//                     db.transaction(tx => {
//                       tx.executeSql('INSERT INTO User_Master (username, password, userid,token) VALUES (? ,? ,?, ?)', [username,password,result[0].userid,result[0].token], (tx, results) => {
//                         if (results.rowsAffected > 0) {
//                           console.log('User added');
//                         } else {
//                           console.log('Error adding user');
//                         }
//                       });
//                     }); 
//                   }
//                   else
//                   {
//                     console.log('User_Master Data Already Exists')
//                   }
//                 })
              
//               // Navigate to the NavigationDrawer page
//               setError('');
//               setSuccess('Login Success')
//               setTimeout(()=>
//               {
//                 navigation.navigate('PinGeneration');
//                 console.log("Credentials saved successfully.");
//                 setSuccess('');
//                 setUsername('');
//                 setPassword('');
//                 setIsLoading(false)
//               },1500)
             
//             } catch (error) {
//               console.log("Error saving credentials:", error);
//             }
//           }
//           else
//           {
//             setSuccess('');
//             setIsLoading(false)
//             setError('Sorry Please Enter Valid Username And Password')
//           }
//         })
        
//         }
//       else
//       {
//         setSuccess('');
//         setIsLoading(false)
//         setError('Please Enter Username And Password')
//       }
//     }

    
//   };



//   const handleForgotPassword = () => {
//     // Handle forgot password action
//   };

//   const handlePress = () => {
//     // Handle press event
//   };

//   return (
//     <SafeAreaView style={styles.container}>
 
      
//         <Image
//           source={require("../../assets/wiselogo.png")}
//           style={styles.logo}
//         />
        
//         {/* Sign In form */}
//         <Text style={styles.signInText}>Please login when you are online</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           onChangeText={(text) => 
//             {
//               error?setError(''):'';
//               setUsername(text)
//             }
//             }
//           value={username}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           onChangeText={(text) => 
//             {
//               error?setError(''):'';
//               setPassword(text)}
//             }
           
//           value={password}
//           secureTextEntry
//         />
//         {
//           success?
//              <Text style={styles.successText}>{success}</Text>
//              :
//              null
//         }
//         {
//           error?
//           <Text style={styles.errorText}>{error}</Text>
//           :
//           null
//         }
//         {isLoading&&
//         <ActivityIndicator
//         size="small"
//         color="blue"
//         />
//         }
//         {!isLoading&&
//         <TouchableOpacity style={styles.button} onPress={handleLogIn}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//         }
//         {/* <TouchableOpacity onPress={handleForgotPassword}>
//           <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//         </TouchableOpacity> */}
    
   
//     </SafeAreaView>
//   );
// };

// export default SignInScreen;

import React, { useState,useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import db from "../../permitsDb";
import NetInfo from '@react-native-community/netinfo';
import { apiEndpoints } from "../../config/endpoints";
import { ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

const SignInScreen=()=>
{
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading,setIsLoading]=useState(false);

  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');

  const navigation = useNavigation();

  useEffect(()=>
  {
    createTables();
    setTimeout(()=>
    {
      createTables();
    },500)
  },[])

  const createTables=()=>
  {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS User_Master (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR, password VARCHAR,userid INTEGER,token VARCHAR)',
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ComplianceSubfacterQuetions(id INTEGER PRIMARY KEY AUTOINCREMENT,criteriaId VARCHAR,factorId VARCHAR,criteriaName TEXT,subCriteria VARCHAR,maxScore INTEGER,permittype VARCHAR)'
      )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ComplianceFacters(id INTEGER PRIMARY KEY AUTOINCREMENT,factorId VARCHAR,factorName TEXT,factorDescription VARCHAR,permitTypeId VARCHAR)'
      )
    });
  }

  const checkTableIsEmptyOrNot=(TableName)=>
  {

    const isTableEmpty = () => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT COUNT(*) as count FROM '+TableName+'',
            [],
            (_, result) => {
              const count = result.rows.item(0).count;
              resolve(count === 0);
            },
            (_, error) => {
              reject(error);
            }
          );
        });
      });
    };
     return isTableEmpty();
  }


  const dataInsertingIntoTables=()=>
  {
    checkTableIsEmptyOrNot('ComplianceSubfacterQuetions').then(async (empty)=>
      {
        const response = await fetch(apiEndpoints.getComplianceSubfacterQuetions);
          const responseData = await response.json();
        if(empty)
        {
          if(responseData)
          {
            const result=JSON.parse(responseData);
            db.transaction(tx => {
              result.map((i)=>
              {
                tx.executeSql('INSERT INTO  ComplianceSubfacterQuetions (criteriaId,factorId,criteriaName,subCriteria,maxScore,permittype) VALUES (?, ? , ? , ? , ?, ?)', [i.criteriaId, i.factorId,i.criteriaName,i.subCriteria,i.maxScore,i.permittype], (tx, results) => {
                  if (results.rowsAffected > 0)
                   {
                    console.log('ComplianceSubfacterQuetions Successful');
                  } else 
                  {
                    console.log('Error adding');
                  }
              })
            })
          })
          }
        }
        else
        {
          console.log('ComplianceSubfacterQuetions This Table Already Having Data')
        }
      })
      checkTableIsEmptyOrNot('ComplianceFacters').then(async(empty)=>
        {
          const response = await fetch(apiEndpoints.getComplainceFactors);
          const responseData = await response.json();
          if(empty)
          {
            const result=JSON.parse(responseData);
            db.transaction(tx => {
              result.map((i)=>
              {
                tx.executeSql('INSERT INTO  ComplianceFacters (factorId,factorName,factorDescription,permitTypeId) VALUES (?, ? , ? , ?)', [i.factorId,i.factorName,i.factorDescription,i.permitTypeId], (tx, results) => {
                  if (results.rowsAffected > 0)
                   {
                    console.log('ComplianceFacters Successful');
                  } else 
                  {
                    console.log('Error adding');
                  }
              })
            })
          })
          }
          else
          {
            console.log('ComplianceFacters This Table Already Having Data')
          }
        })
  }


  const handleLogIn = async () => {
    // Perform sign-in logic
    const netInfo = await NetInfo.fetch();
    const isConnected = netInfo.isConnected;    
    if (isConnected==false) {
      Alert.alert(
        'No Network Connection',
        'Please connect to a network and try again.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    else
    {
      if (username && password) {
        // calling Api and saving user credentials to AsyncStorage
        fetch('http://182.18.181.115:8084/api/login/loginservice?username='+username+'&password='+password+'').
        then(response=>response.json()).
        then(responseText=>JSON.parse(responseText)).
        then(async (result)=>{
    
          if(result.length!==0)
          {
            setIsLoading(true);
            dataInsertingIntoTables();
            try {
              console.log(result[0].userid);
              console.log(result[0].token);
              await AsyncStorage.setItem("username", username);
              await AsyncStorage.setItem("password", password);
              checkTableIsEmptyOrNot('User_Master').then(empty=>
                {
                  if(empty)
                  {
                    db.transaction(tx => {
                      tx.executeSql('INSERT INTO User_Master (username, password, userid,token) VALUES (? ,? ,?, ?)', [username,password,result[0].userid,result[0].token], (tx, results) => {
                        if (results.rowsAffected > 0) {
                          console.log('User added');
                        } else {
                          console.log('Error adding user');
                        }
                      });
                    }); 
                  }
                  else
                  {
                    console.log('User_Master Data Already Exists')
                  }
                })
              
              // Navigate to the NavigationDrawer page
              setError('');
              setSuccess('Login Success')
              setTimeout(()=>
              {
                navigation.navigate('PinGeneration');
                console.log("Credentials saved successfully.");
                setSuccess('');
                setUsername('');
                setPassword('');
                setIsLoading(false)
              },1500)
             
            } catch (error) {
              console.log("Error saving credentials:", error);
            }
          }
          else
          {
            setSuccess('');
            setIsLoading(false)
            setError('Sorry Please Enter Valid Username And Password')
          }
        })
        
        }
      else
      {
        setSuccess('');
        setIsLoading(false)
        setError('Please Enter Username And Password')
      }
    }

    
  };



  const handleForgotPassword = () => {
    // Handle forgot password action
  };

  const handlePress = () => {
    // Handle press event
  };
  return(
<SafeAreaView style={{flex:1,backgroundColor:'#e8ecf4'}}>
  <ScrollView>
<View style={styles.container}>
  <View style={styles.header}>
    <Image
    source={require("../../assets/wiselogo.png")}
    style={styles.headerImg}
    alt="Logo"
    />
    <Text style={styles.title}> Sign in to weis</Text>
    <Text style={styles.subtitle}>
    Please login when you are online
    </Text>
  </View>

  <View style={styles.form}>
    <View style={styles.input}>
        <Text style={styles.inputLabel}>Email address</Text>
         <TextInput
          style={[styles.inputControl,{marginBottom:20}]}
          placeholder="Example@gmail.com"
          placeholderTextColor="#6b7280"
          onChangeText={(text) => 
            {
              error?setError(''):'';
              setUsername(text)
            }
            }
          value={username}
        />
        
       <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.inputControl}
          placeholder="************"
          placeholderTextColor="#6b7280"
          onChangeText={(text) => 
            {
              error?setError(''):'';
              setPassword(text)}
            }
           
          value={password}
          secureTextEntry
        />
    </View>

         {
          success?
             <Text style={styles.successText}>{success}</Text>
             :
            null
        }
        {
          error?
          <Text style={styles.errorText}>{error}</Text>
          :
          null
        }
        {isLoading&&
        <ActivityIndicator
        size="small"
        color="blue"
        />
        }
   {!isLoading&&
   <View style={styles.formAction}>
            <TouchableOpacity
            style={styles.btn}
            onPress={handleLogIn}
            >
              <Text style={styles.btnText}>Sign in</Text>

            </TouchableOpacity>
   </View>
  }
  </View>
</View>
</ScrollView>
</SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:
  {
    padding:24,
    marginTop:50,
    flex:1,
    marginTop:150
  },
  header:
  {
    marginVertical:36
  },
  headerImg:
  {
    height:80,
    width:150,
    alignSelf:'center',
    marginBottom:36
  },
  title:
  {
    fontSize:27,
    fontWeight:'700',
    color:'#1e1e1e',
    marginBottom:6,
    textAlign:'center'
  },
  subtitle:
  {
    fontSize:15,
    fontWeight:'500',
    color:'#929292',
    textAlign:'center'
  },
  input:
  {
    marginBottom:8,
    padding:10
  },  
  inputLabel:
  {
    fontSize:17,
    fontWeight:'700',
    color:'#222',
    marginBottom:10
  },
  inputControl:
  {
    backgroundColor:'#fff',
    height:44,
    paddingHorizontal:16,
    borderRadius:12,
    fontSize:16,
    fontWeight:'500',
    color:'#222'
  },
  formAction:
  {
    marginVertical:14,
    padding:10
  },
  btn:
  {
    backgroundColor:'#075eec',
    paddingVertical:10,
    paddingHorizontal:20,
    borderWidth:1,
    borderRadius:8,
    borderColor:'#075eec',
    justifyContent:'center',
    alignItems:'center'
  },
  btnText:
  {
    fontSize:18,
    fontWeight:'600',
    color:'#fff'
  },
  errorText:
  {
    color:'red'
  },
  successText:
  {
    color:'green',
    textAlign:'center'
  }
  
})

export default SignInScreen;
