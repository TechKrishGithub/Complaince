import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, Platform,ActivityIndicator } from "react-native";
import { Badge, Button } from "@rneui/themed";
import db from "../../../permitsDb/index";
import { NetworkStatusToast } from "../../../components";
import Spinner from 'react-native-loading-spinner-overlay';

import styles from "./style";
import data from "../../../constants"
import {DropDownSearch} from "../../../components";
import { ScrollView } from "react-native-gesture-handler";
import ViewPage from "./ViewPage";
import EditPage from "./EditPage";


const GWDetailsPage = ({ route, navigation }) => {
  const { complainceData, complainceDataEdit,permitNumberEdit ,seletedQuarter,permitNumber , complainceDataUpdated,scoresData} = route.params;



  const [scores, setScores] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading,setLoading]=useState(false);

  const [scoresWithQueMax,setScoresWithQueMax]=useState([]);
  const [commentWithQue,setCommentWithQue]=useState([]);

  const [error,setError]=useState([]);
  const [submitError,setSubmitError]=useState('');
  const [success,setSuccess]=useState('');

  const [seletedQuarterNew, setSelectedQuarterNew] = useState(null);

  const [submitLoading,setSubmitLoading]=useState(false);




  if(complainceDataUpdated)
  {
   return(
    <ViewPage complainceDataUpdated={complainceDataUpdated} scoresData={scoresData}/>
   )
  }


  if(complainceDataEdit&&permitNumberEdit)
  {
    return(
     <EditPage complainceDataEdit={complainceDataEdit} permitNumber={permitNumberEdit} scoresData={scoresData} navigation={navigation}/>
    )
  }


  const [subFactorQuestions, setSubFactorQuestions] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);

  const getComplainceCategoriesQuestions = async () => {
   
    try {
      db.transaction(tx=>
        {
          tx.executeSql('SELECT * FROM ComplianceSubfacterQuetions',
          [],
          (_, { rows })=>
          {
            setSubFactorQuestions(rows._array);
          }
          )
        })
    } catch (error) {
      console.error(error);
      setLoading(false)
      Alert.alert("PERMITS", "Data Not Getting please try again later");
    }
  };



  useEffect(() => {
    setLoading(true);
    setTimeout(()=>
    {
      setLoading(false);
    },1000)
    setTimeout(()=>
    {
      getComplainceCategoriesQuestions();
    },200)
    getComplainceCategoriesQuestions();
    CreateTables();
  }, []);

  const filteredQuestions = subFactorQuestions?.filter(
    (question) => question.factorId === complainceData.factorId
  );



  const CreateTables=()=>
  {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS ScoresTable (id INTEGER PRIMARY KEY AUTOINCREMENT,criteriaId varchar,criteriaName varchar,factorId varchar,maxScore INTEGER,question varchar,score integer,comment varchar,PermitNumber varchar )",
        )
      tx.executeSql(
          "CREATE TABLE IF NOT EXISTS ComplianceFactersAfterUpdating (id INTEGER PRIMARY KEY AUTOINCREMENT,factorId varchar,factorName varchar,PermitNumber varchar, Quarter varchar,permitTypeId varchar)"
      )
      })
  }




  const handleScoreChange = (index, score,question,maxScore,criteriaName,criteriaId,factorId) => {
    setSubmitError('');
    if(parseInt(score)>parseInt(maxScore))
    {
      const Error=[...error];
      Error[index]={index:index,error:'Score must be less than Maxscore !'};
      setError(Error);
    }
    else
    {
      const filterError=error.filter((obj)=>obj?.index!=index);
      setError(filterError);
      const updatedScores = [...scores];
      updatedScores[index] = score;
      setScores(updatedScores);
      
      const myScores=[...scoresWithQueMax];
      myScores[index]={score:score,question:question,maxScore:maxScore,criteriaName:criteriaName,criteriaId:criteriaId,factorId:factorId};
      setScoresWithQueMax(myScores);
    }
    
  };

  const handleCommentChange = (index, comment,criteriaId) => {
    const updatedComments = [...comments];
    updatedComments[index] = comment;
    setComments(updatedComments);

    const myComments=[...commentWithQue];
    myComments[index]={comment:comment,criteriaId:criteriaId};
    setCommentWithQue(myComments);
    };



 

  const totalScore = scores.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue),
    0
  );

  const dataInsert=()=>
  {
    let Quarter='';
    seletedQuarter==undefined?Quarter=seletedQuarterNew:Quarter=seletedQuarter;
    console.log(Quarter)
    db.transaction(tx=>
      {
        tx.executeSql("select * from ComplianceFactersAfterUpdating where factorId=? AND PermitNumber=?",
        [filteredQuestions[0]?.factorId,permitNumber],
        (_,{ rows })=>
        {
          if(rows.length>0)
          {
           console.log('Data Already Exist Basic Info') 
          }
          else
          {
            tx.executeSql("INSERT INTO ComplianceFactersAfterUpdating(factorId,factorName,PermitNumber, Quarter,permitTypeId) values(?,?,?,?,?)",
            [complainceData?.factorId,complainceData?.factorName,permitNumber,Quarter,complainceData?.permitTypeId],
            (tx,resultSet)=>
            {
              console.log('Data inserted successfully');
            },
            (error)=>console.log(error)
            )
          }
        }
        )
      })
    

  }

 

  const handleSubmit=()=>
  {
    db.transaction(tx=>
      {
        tx.executeSql('select * from ScoresTable where factorId=? AND PermitNumber=?',
        [filteredQuestions[0]?.factorId,permitNumber],
        (_, { rows }) => 
        {
           if(rows.length>0)
           {
            setSuccess('');
            setSubmitError('Sorry Data Already saved on this Complain');
           }
           else
           {
              setSubmitError('');
              const filterScores=scoresWithQueMax.filter((obj)=>obj!==undefined);
              const myFilteredScores=filterScores.filter(obj=>obj.score!=='');
              const filterComments=commentWithQue.filter(obj=>obj!==undefined);
          
              if(myFilteredScores.length < filteredQuestions.length)
              {
                setSubmitError('Sorry Scores are mandatory For Every Question !');
              }
              else
              {
                if(seletedQuarter==undefined&&seletedQuarterNew==null)
                {
                  setSubmitError('Sorry Please Select Quarter !');
                }
                else{
                setSubmitError('');
                const mergingData=filterScores.map((item)=>
                {
                  const sameQuestion=filterComments.find((obj)=>obj.criteriaId==item.criteriaId);
            
                  return{
                    ...item,
                    comment:sameQuestion?sameQuestion.comment:''
                  }
            
                })
                dataInsert();
                setSubmitLoading(true);
                db.transaction((tx) => {
                    mergingData.map((v,index)=>
                      {
                        tx.executeSql(
                          "INSERT INTO ScoresTable (criteriaId, criteriaName,factorId,maxScore,question,score,comment,PermitNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                          [v.criteriaId, v.criteriaName, v.factorId, v.maxScore, v.question, v.score, v.comment,permitNumber],
                          (_, resultSet) => { 
                            setSubmitError('');
                            console.log("Data stored successfully !");
                            setSuccess('Data Saved successfully !');
                            if (index === mergingData.length - 1) {                             
                              setTimeout(()=>
                              {
                                setSubmitLoading(false);
                                navigation.goBack();
                              },500)
                            }
                           
                          },
                          (_, error) => {
                            setSuccess('');
                            setSubmitError('Sorry Data Not Saved..')
                            console.log("Error while storing data:", error);
                          }
                        );
                      })
                    },
                    (_, error) => {
                      console.log("Error while creating table:", error);
                    })
              }
            
           }
          }
        }
        )
      })
  }



  const onPress=()=>
  {
    //    db.transaction(tx => {
    //   tx.executeSql('SELECT * FROM ScoresTable', [], (tx, results) => {
    //     const len = results.rows.length;
    
    //     for (let i = 0; i < len; i++) {
    //       const {criteriaId, criteriaName,factorId,maxScore,question,score,comment} = results.rows.item(i);
    //       console.log(`criteriaId: ${criteriaId} , criteriaName: ${criteriaName},factorId: ${factorId},maxScore: ${maxScore},question: ${question},score: ${score},comment: ${comment}`);
    //     }
    //   });
    // });  
   
    //   db.transaction(tx => {
    //   tx.executeSql('SELECT * FROM ComplianceFactersAfterUpdating', [], (tx, results) => {
    //     const len = results.rows.length;
    
    //     for (let i = 0; i < len; i++) {
    //       const { factorId,factorName,PermitNumber, Quarter,permitTypeId} = results.rows.item(i);
    //       console.log(` factorId: ${factorId},factorName: ${factorName},PermitNumber: ${PermitNumber}, Quarter: ${Quarter},permitTypeId: ${permitTypeId}`);
    //     }
    //   });
    // }); 
    console.log(complainceData)
   
  }

  
  const onChangeQuarter = (quarter) => {
    setSelectedQuarterNew(quarter);
  };
  


  if (loading) 
  {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Spinner
          visible={true} // Set this to false when you want to hide the spinner
          size="small"
          color="#fff"
        />
        <Text>Loading...</Text>
      </View>
    );
 };






  let printedCriteriaNames = [];
  return (
    <ScrollView>
      {/* <Button title="know" onPress={onPress}/> */}
      {seletedQuarter==undefined?
      <DropDownSearch
      placeholderText={"Select Quarter"}
      data={data.quarterList}
      label={"Quarter"}
      width={355}
      forPending={true}
      maxHeight={"auto"}
      handleChange={onChangeQuarter}
      selectedValue={seletedQuarterNew}
    />
      :
      null
    }
    <View style={styles.containerView}>
      <NetworkStatusToast />
      {filteredQuestions?.map((fQuestion, i) => {
         if (!printedCriteriaNames.includes(fQuestion.criteriaName)) {
          printedCriteriaNames.push(fQuestion.criteriaName);
        return (
         
          <React.Fragment key={i}>
               <Text style={[styles.criteriaNameStyle,{marginTop:30}]}>{fQuestion.criteriaName}</Text>
            <Text
              style={styles.textLabel}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
             
              {i + 1}. {fQuestion?.subCriteria}
            </Text>
            <View style={styles.questionRowView}>
              
              <Badge
                value={'maxScore '+fQuestion?.maxScore}
                status="primary"
                containerStyle={styles.badgeView}
              />
              <TextInput
                style={styles.scoreInput}
                placeholder="score"
                onChangeText={(score) =>
                  handleScoreChange(i, score.replace(/[^0-9]/g, ""),fQuestion?.subCriteria,fQuestion?.maxScore,fQuestion.criteriaName,fQuestion.criteriaId,fQuestion.factorId)
                }
                value={scores[i] || ""} // use the score for the corresponding question
                keyboardType={"number-pad"}
                inputMode={"numeric"}
              />

              <TextInput
                style={[styles.userView, { width: 275 }]}
                placeholder="comment"
                onChangeText={(comment) => handleCommentChange(i, comment,fQuestion.criteriaId)}
                value={comments[i] || ""} // use the comment for the corresponding question
                inputMode={"text"}
              />
            </View>
            {error[i]&&
            <Text style={styles.error}>{error[i].error}</Text>
         }
          </React.Fragment>
         
        );
              }
              else if (
                i > 0 &&
                fQuestion.criteriaName !== filteredQuestions[i - 1].criteriaName
              ) {
                return (
                  <React.Fragment key={i}>
                       <Text style={[styles.criteriaNameStyle,{marginTop:10}]}>{fQuestion.criteriaName}</Text>
            <Text
              style={styles.textLabel}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
             
              {i + 1}. {fQuestion?.subCriteria}
            </Text>
            <View style={styles.questionRowView}>
              <Badge
               value={'maxScore '+fQuestion?.maxScore}
                status="primary"
                containerStyle={styles.badgeView}
              />
              <TextInput
                style={styles.scoreInput}
                placeholder="score"
                onChangeText={(score) =>
                  handleScoreChange(i, score.replace(/[^0-9]/g, ""),fQuestion?.subCriteria,fQuestion?.maxScore,fQuestion.criteriaName,fQuestion.criteriaId,fQuestion.factorId)
                }
                value={scores[i] || ""} // use the score for the corresponding question
                keyboardType={"number-pad"}
                inputMode={"numeric"}
              />

              <TextInput
                style={[styles.userView, { width: 275 }]}
                placeholder="comment"
                onChangeText={(comment) => handleCommentChange(i, comment,fQuestion.criteriaId)}
                value={comments[i] || ""} // use the comment for the corresponding question
                inputMode={"text"}
              />
            </View>
            {error[i]&&
            <Text style={styles.error}>{error[i].error}</Text>
         }
          </React.Fragment>
         
    );
  } else {
    return (
      <React.Fragment key={i}>
            <Text
              style={styles.textLabel}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
             
              {i + 1}. {fQuestion?.subCriteria}
            </Text>
          
            <View style={styles.questionRowView}>
              <Badge
              value={'maxScore '+fQuestion?.maxScore}
                status="primary"
                containerStyle={styles.badgeView}
              />
              <TextInput
                style={styles.scoreInput}
                placeholder="score"
                onChangeText={(score) =>
                  handleScoreChange(i, score.replace(/[^0-9]/g, ""),fQuestion?.subCriteria,fQuestion?.maxScore,fQuestion.criteriaName,fQuestion.criteriaId,fQuestion.factorId)
                }
                value={scores[i] || ""} // use the score for the corresponding question
                keyboardType={"number-pad"}
                inputMode={"numeric"}
              />

              <TextInput
                style={[styles.userView, { width: 275 }]}
                placeholder="comment"
                onChangeText={(comment) => handleCommentChange(i, comment,fQuestion.criteriaId)}
                value={comments[i] || ""} // use the comment for the corresponding question
                inputMode={"text"}
              />
            </View>
            {error[i]&&
            <Text style={styles.error}>{error[i].error}</Text>
         }
          </React.Fragment>
         
    );
  }

      })}

      <View style={{ flex: 0.35 }}>
        <Button
          title={`Total Score is ${totalScore === 0 ? 0 : totalScore}`}
          buttonStyle={{
            borderColor: "rgba(78, 116, 289, 1)",
          }}
          type="outline"
          raised
          disabled
          titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
          containerStyle={{
            marginHorizontal: 30,
            marginVertical: Platform.OS === "ios" ? 10 : 18,
          }}
        />
        {success&&
        <Text style={[styles.error,{color:'green',paddingLeft:16}]}>{success}</Text>
        }
        {submitError&&
        <Text style={styles.error}>{submitError}</Text>
        }
        <Button
          loadingProps={{ size: "small", color: "white" }}
          title="Submit"
          type="solid"
          containerStyle={{
            marginHorizontal: 30,
            marginVertical: 10,
          }}
          onPress={handleSubmit}
          loading={submitLoading}
        />
      </View>
    </View>
    </ScrollView>
  );
};

export default GWDetailsPage;
