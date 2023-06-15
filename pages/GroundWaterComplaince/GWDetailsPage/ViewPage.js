import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, Platform,ActivityIndicator } from "react-native";
import { Badge, Button } from "@rneui/themed";
import { NetworkStatusToast } from "../../../components";

import styles from "./style";
import { ScrollView } from "react-native-gesture-handler";

const ViewPage=(props)=>
{

    

    const [scores, setScores] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading,setLoading]=useState(false);

  const [scoresWithQueMax,setScoresWithQueMax]=useState([]);
  const [commentWithQue,setCommentWithQue]=useState([]);

  const [error,setError]=useState([]);
  const [submitError,setSubmitError]=useState('');
  const [success,setSuccess]=useState('');

  const [data,setData]=useState([]);

    const {complainceDataUpdated,scoresData}=props;
   

    const filtedScores=scoresData?.filter(
        (question)=>question.PermitNumber==complainceDataUpdated.PermitNumber
    )

    const filteredQuestions = filtedScores?.filter(
        (question) => question.factorId === complainceDataUpdated.factorId
      );

      

    let printedCriteriaNames=[];
    let  totalScore=0;
      return(
        
            <ScrollView>
        {/* <Button title="know" onPress={onPress}/> */}
      <View style={styles.containerView}>
        <NetworkStatusToast />
        {filteredQuestions?.map((fQuestion, i) => {
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
                  style={[styles.scoreInput,{color:'black'}]}
                  placeholder="score"
                  readOnly
                  value={fQuestion.score.toString()} // use the score for the corresponding question
                  keyboardType={"number-pad"}
                  inputMode={"numeric"}
                />
  
                <TextInput
                  style={[styles.userView, { width: 275 ,color:'black'}]}
                  placeholder="comment"      
                  readOnly
                  value={fQuestion.comment.toString()} // use the comment for the corresponding question
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
               
                {i + 1}. {fQuestion?.question}
              </Text>
              <View style={styles.questionRowView}>
                <Badge
                 value={'maxScore '+fQuestion?.maxScore}
                  status="primary"
                  containerStyle={styles.badgeView}
                />
                <TextInput
                  style={[styles.scoreInput,{color:'black'}]}
                  placeholder="score"       
                  readOnly       
                  value={fQuestion.score.toString()} // use the score for the corresponding question
                  keyboardType={"number-pad"}
                  inputMode={"numeric"}
                />
  
                <TextInput
                  style={[styles.userView, { width: 275 ,color:'black'}]}
                  placeholder="comment"       
                  readOnly        
                  value={fQuestion.comment.toString()} // use the comment for the corresponding question
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
                  style={[styles.scoreInput,{color:'black'}]}
                  placeholder="score"            
                  readOnly   
                  value={fQuestion.score.toString()} // use the score for the corresponding question
                  keyboardType={"number-pad"}
                  inputMode={"numeric"}
                />
  
                <TextInput
                  style={[styles.userView, { width: 275,color:'black' }]}
                  placeholder="comment"       
                  readOnly         
                  value={fQuestion.comment.toString()} // use the comment for the corresponding question
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
            readOnly
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
          {/* <Button
            loading={false}
            loadingProps={{ size: "small", color: "white" }}
            title="Submit"
            type="solid"
            containerStyle={{
              marginHorizontal: 30,
              marginVertical: 10,
            }}
            onPress={handleSubmit}
          /> */}
        </View>
      </View>
      </ScrollView>
      )
}

export default ViewPage;