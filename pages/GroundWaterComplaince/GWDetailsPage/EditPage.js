import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, Platform,ActivityIndicator } from "react-native";
import { Badge, Button } from "@rneui/themed";
import { NetworkStatusToast } from "../../../components";
import db from "../../../permitsDb";

import styles from "./style";
import { ScrollView } from "react-native-gesture-handler";

const EditPage=(props)=>
{

  const [loading,setLoading]=useState(false);

  const [error,setError]=useState([]);
  const [submitError,setSubmitError]=useState('');
  const [success,setSuccess]=useState('');

  const [data,setData]=useState([]);

    const {complainceDataEdit,scoresData,permitNumber,navigation}=props;

    useEffect(()=>
    {
        setData(filtedScores?.filter(
            (question) => question.factorId === complainceDataEdit.factorId
          ))
    },[])


    const handleScoreChange = (index, score,question,maxScore,criteriaName) => {
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
          const Updatedata = [...data];

          const detEditIndex = Updatedata.findIndex(
            (item) => item.question === question && item.criteriaName === criteriaName
          );

          if (detEditIndex !== -1) {
            Updatedata[detEditIndex] = {
              ...Updatedata[detEditIndex],
              score: score,
            };
          } 
        
          setData(Updatedata);
        }
        
      };


        const handleCommentChange = (index,comment,question,criteriaName) => {
              const Updatedata = [...data];
    
              const detEditIndex = Updatedata.findIndex(
                (item) => item.question === question && item.criteriaName === criteriaName
              );
    
              if (detEditIndex !== -1) {
                Updatedata[detEditIndex] = {
                  ...Updatedata[detEditIndex],
                  comment: comment,
                };
              } 
              setData(Updatedata);
          };

        


    const filtedScores=scoresData?.filter(
        (question)=>question.PermitNumber==complainceDataEdit.PermitNumber
    )

    const filteredQuestions = filtedScores?.filter(
        (question) => question.factorId === complainceDataEdit.factorId
      );

    const handleSubmit=()=>
    {
    
               const hasInvalidScore = data.some(obj => obj.score === '' || obj.score === null || obj.score === undefined);
               if (hasInvalidScore) {
                 setSubmitError('Sorry Scores are mandatory For Every Question');
              }
              else
              {
                db.transaction(tx=>
                    {
                        setLoading(true)
                      data.map((item,index) => {   
                            tx.executeSql('select * from ScoresTable where factorId=? AND PermitNumber=? AND question=?',
                          [data[0]?.factorId,permitNumber, item.question],
                          (tx, resultSet) => {
                            if (resultSet.rows.length > 0) {
                              // Update the existing record
                              tx.executeSql(
                                'UPDATE ScoresTable SET score = ?, comment = ? WHERE factorId = ? AND PermitNumber = ? AND question = ? AND criteriaName=?',
                                [item.score, item.comment, data[0]?.factorId , permitNumber, item.question, item.criteriaName],
                                (tx, result) => {
                                  // Update success
                                  setSubmitError('');
                                  setSuccess('Data Updated Successfully !');
                                  if (index === data.length - 1) {
                                    // All data has been processed, navigate back to the screen
                                    setTimeout(()=>
                                              { 
                                                navigation.goBack();
                                                setLoading(false)
                                     },200)
                                  }
                                },
                                (tx, error) => {
                                  setSuccess('');
                                  // Update failed
                                  setSubmitError('Sorry, Failed to update data')
                                  console.log('Failed to update data', error);
                                }
                              );
                            } 
                          },
                          (tx, error) => {
                            console.log('Failed to select data', error);
                          }
                      )
                      });
                      
                    })
              }
    }
 



      
    let printedCriteriaNames=[];
    let  totalScore=0;
      return(
        
            <ScrollView>
        {/* <Button title="know" onPress={onPress}/> */}
        <View style={styles.containerView}>
      <NetworkStatusToast />
      {data?.map((fQuestion, i) => {
         totalScore=totalScore+parseInt(fQuestion.score);
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
             
              {i + 1}. {fQuestion?.question}
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
                  handleScoreChange(i, score.replace(/[^0-9]/g, ""),fQuestion?.question,fQuestion?.maxScore,fQuestion.criteriaName,fQuestion.criteriaId,fQuestion.factorId)
                }
                value={fQuestion.score.toString()} // use the score for the corresponding question
                keyboardType={"number-pad"}
                inputMode={"numeric"}
              />

              <TextInput
                style={[styles.userView, { width: 275 }]}
                placeholder="comment"
                onChangeText={(comment) => handleCommentChange(i, comment,fQuestion.question,fQuestion.criteriaName)}
                value={ fQuestion.comment} // use the comment for the corresponding question
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
                fQuestion.criteriaName !== data[i - 1].criteriaName
              ) {
                return (
                  <React.Fragment key={i}>
                       <Text style={[styles.criteriaNameStyle,{marginTop:10}]}>{fQuestion.criteriaName}</Text>
            <Text
              style={styles.textLabel}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
             
              {i + 1}. {fQuestion?.question}
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
                  handleScoreChange(i, score.replace(/[^0-9]/g, ""),fQuestion?.question,fQuestion?.maxScore,fQuestion.criteriaName,fQuestion.criteriaId,fQuestion.factorId)
                }
                value={fQuestion.score.toString()} // use the score for the corresponding question
                keyboardType={"number-pad"}
                inputMode={"numeric"}
              />

              <TextInput
                style={[styles.userView, { width: 275 }]}
                placeholder="comment"
                onChangeText={(comment) => handleCommentChange(i, comment,fQuestion.question,fQuestion.criteriaName)}
                value={ fQuestion.comment} // use the comment for the corresponding question
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
             
              {i + 1}. {fQuestion?.question}
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
                  handleScoreChange(i, score.replace(/[^0-9]/g, ""),fQuestion?.question,fQuestion?.maxScore,fQuestion.criteriaName,fQuestion.criteriaId,fQuestion.factorId)
                }
                value={fQuestion.score.toString()} // use the score for the corresponding question
                keyboardType={"number-pad"}
                inputMode={"numeric"}
              />

              <TextInput
                style={[styles.userView, { width: 275 }]}
                placeholder="comment"
                onChangeText={(comment) => handleCommentChange(i, comment,fQuestion.question,fQuestion.criteriaName)}
                value={ fQuestion.comment} // use the comment for the corresponding question
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
          title={`Total Score is ${totalScore === 0 ? 1 : totalScore}`}
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
          title="Update"
          type="solid"
          containerStyle={{
            marginHorizontal: 30,
            marginVertical: 10,
          }}
         onPress={handleSubmit}
         loading={loading}
        />
      </View>
    </View>
      </ScrollView>
      )
}

export default EditPage;