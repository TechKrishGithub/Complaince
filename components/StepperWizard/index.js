import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Ionicons } from "@expo/vector-icons";
import DynamicForm from "../DynamicForm/index";
import LocationInfo from "../LocationInfo";
import PermitInfoForm from "../../pages/WasteWaterDischargePermitHolders/PermitInfoForm";
import styles from "./styles";

export default function StepperWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const onNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const onPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onStepCompleted = () => {
    console.log(`Step ${currentStep} completed`);
  };

  return (
    <View style={styles.container}>
      <ProgressSteps
        activeStep={currentStep}
        completedStepIcon={
          <Ionicons name="checkmark" size={24} color="green" />
        }
        completedProgressBarColor="#3A88C8"
        activeStepIconBorderColor="#3A88C8"
        activeLabelColor="#3A88C8"
        progressBarColor="gray"
        disabledStepNumColor="gray"
        marginBottom={20}
        completedStepNumColor="green"
        activeStepNumColor="#3A88C8"
        borderWidth={2}
        borderStyle={"solid"}
        labels={["Step 1", "Step 2", "Step 3", "Step 4"]}
        onNext={onNextStep}
        onPrevious={onPrevStep}
        onStepComplete={onStepCompleted}
        topOffset={30}
        scrollViewProps={{ contentContainerStyle: styles.contentContainer }}
      >
        <ProgressStep label="Step 1">
          <View style={styles.stepView}>
            <PermitInfoForm />
            <LocationInfo />
          </View>
        </ProgressStep>
        <ProgressStep label="Step 2">
          <View style={styles.stepView}>
            <DynamicForm />
          </View>
        </ProgressStep>
        <ProgressStep label="Step 3">
          <View style={styles.stepView}>
            <Text>Step 3</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Step 4">
          <View style={styles.stepView}>
            <Text>Step 4</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}
