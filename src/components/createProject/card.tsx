"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import StepOneUpload from "./stepOneUpload";
import StepTwoInput from "./stepTwoInput";
import StepThreeSelect from "./stepThreeSelect";
import StepFourConfirm from "./stepFourConfirm";
import { cn } from "@/lib/utils";

interface CardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Card({ isOpen, onClose }: CardProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const stepProgress = {
    1: 5,
    2: 35,
    3: 70,
    4: 100,
  };

  const getCurrentProgress = () => {
    return stepProgress[currentStep as keyof typeof stepProgress] || 0;
  };

  const handleClose = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    setCurrentStep(1);
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirmDialog(false);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOneUpload />;
      case 2:
        return <StepTwoInput />;
      case 3:
        return <StepThreeSelect />;
      case 4:
        return <StepFourConfirm />;
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent
          className="w-[1220px]"
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 mt-2">
            <div className="relative">
              <Progress value={getCurrentProgress()} />
              <div className="flex justify-between mt-1 pt-2 mb-4 text-sm font-semibold">
                <div
                  className={cn(
                    "absolute left-[8%]  text-start -translate-x-1/2",
                    currentStep === 1
                      ? "text-foreground"
                      : "text-muted-foreground -ml-10"
                  )}
                >
                  Step 1
                  {currentStep === 1 && (
                    <>
                      :<p>Upload Sample Report</p>
                    </>
                  )}
                </div>
                <div
                  className={cn(
                    "absolute left-[35%] flex flex-col items-center -translate-x-1/2",
                    currentStep === 2
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Step 2
                  {currentStep === 2 && (
                    <>
                      :<p>Extract Report Structure</p>
                    </>
                  )}
                </div>
                <div
                  className={cn(
                    "absolute left-[70%] flex flex-col items-center -translate-x-1/2",
                    currentStep === 3
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Step 3
                  {currentStep === 3 && (
                    <>
                      :<p>Select Knowledge Set</p>
                    </>
                  )}
                </div>
                <div
                  className={cn(
                    "absolute left-[99%] w-full flex flex-col items-end -translate-x-full",
                    currentStep === 4
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Step 4
                  {currentStep === 4 && (
                    <>
                      :<p>Create Project</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* line */}
          <div className="relative mt-6 -mx-6">
            <div className="border-t border-border" />
          </div>

          <div className="mt-6">{renderStep()}</div>
          {/* line */}
          <div className="relative mt-6 -mx-6">
            <div className="border-t border-border" />
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? handleClose : handleBack}
            >
              {currentStep === 1 ? "Cancel" : "Previous"}
            </Button>
            <Button onClick={handleNext} disabled={currentStep === totalSteps}>
              Next
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to cancel?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost if you cancel the project creation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelClose}>
              No, continue editing
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClose}>
              Yes, cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
