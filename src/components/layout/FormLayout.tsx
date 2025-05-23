import { Outlet } from "react-router-dom";
import { useFormContext } from "../../context/FormContext";
import { ClipboardList } from "lucide-react";

const FormLayout = () => {
  const { currentStep } = useFormContext();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Multi-Page Form</h1>
          </div>
          <p className="mt-2 text-blue-100">Please complete all required information</p>
          
          {/* Progress indicator */}
          <div className="mt-6 mb-2">
            <div className="flex justify-between">
              <div className="text-sm font-medium">Personal Info</div>
              <div className="text-sm font-medium">Education</div>
              <div className="text-sm font-medium">Projects</div>
            </div>
            <div className="mt-2 h-2 flex rounded-full bg-blue-200 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500 ease-in-out" 
                style={{ 
                  width: 
                    currentStep === 1 ? "33.33%" : 
                    currentStep === 2 ? "66.66%" : 
                    "100%"
                }}
              />
            </div>
            <div className="mt-1 text-sm text-blue-100 text-right">
              Step {currentStep} of 3
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FormLayout;