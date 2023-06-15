import React, { useState } from "react";
import { View, Text } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { Ionicons } from "@expo/vector-icons";
import { DynamicForm, LocationInfo } from "../../components";
import PermitInfoForm from "./PermitInfoForm";
import OfficeForm from "./OfficeForm";
import QualityDataTableFormat from "./QualityDataTableFormat";
import styles from "./styles";

export default function StepperContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [permitformData, setPermitFormData] = useState("");

  const onNextStep = (data) => {
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
            <OfficeForm />
          </View>
        </ProgressStep>
        <ProgressStep label="Step 4">
          <View style={styles.stepView}>
            <QualityDataTableFormat />
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}
