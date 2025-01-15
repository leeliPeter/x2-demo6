"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
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
import { tableData } from "./stepTwoInput";

interface CardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Card({ isOpen, onClose }: CardProps) {
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showStructure, setShowStructure] = useState(false);
  const [selectedKnowledgeDocs, setSelectedKnowledgeDocs] = useState<string[]>(
    []
  );
  const totalSteps = 4;
  const [isCreating, setIsCreating] = useState(false);
  const [tableStructure, setTableStructure] = useState(tableData);

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
    if (currentStep === totalSteps) {
      setIsCreating(true);
      // Simulate API call with timeout
      setTimeout(() => {
        setIsCreating(false);
        router.push("/project");
        onClose();
      }, 3000);
    } else if (currentStep < totalSteps) {
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
        return (
          <StepOneUpload
            onFileChange={setUploadedFile}
            initialFile={uploadedFile}
          />
        );
      case 2:
        return (
          <StepTwoInput
            showStructure={showStructure}
            onGenerateStructure={() => setShowStructure(true)}
            tableData={tableStructure}
            onTableDataChange={setTableStructure}
          />
        );
      case 3:
        return (
          <StepThreeSelect
            selectedDocs={selectedKnowledgeDocs}
            onDocsChange={setSelectedKnowledgeDocs}
          />
        );
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

          <div className="overflow-hidden">
            <div
              className={cn(
                "transition-all duration-300 ease-in-out",
                currentStep === 1 && "h-[250px]",
                currentStep === 2 && "h-[420px]",
                currentStep === 3 && "h-[420px]",
                currentStep === 4 && "h-[200px]"
              )}
            >
              {renderStep()}
            </div>
          </div>
          {/* line */}
          <div className="relative mt-6 -mx-6">
            <div className="border-t border-border" />
          </div>
          {/* progree bar */}
          {isCreating && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <div className="w-[80%] space-y-2">
                <Progress value={100} className="animate-progress" />
                <p className="text-center text-sm text-muted-foreground">
                  Creating your project...
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? handleClose : handleBack}
              disabled={isCreating}
            >
              {currentStep === 1 ? "Cancel" : "Previous"}
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                isCreating ||
                (currentStep === 1 && !uploadedFile) ||
                (currentStep === 2 && !showStructure) ||
                (currentStep === 3 && selectedKnowledgeDocs.length === 0)
              }
              className={cn(
                currentStep === totalSteps &&
                  "bg-orange-800 hover:bg-orange-700"
              )}
            >
              {isCreating
                ? "Creating..."
                : currentStep === totalSteps
                ? "Create"
                : "Next"}
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
