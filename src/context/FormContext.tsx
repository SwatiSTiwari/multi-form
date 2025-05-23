import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formApi } from "../api/formApi";

// Types
export type PersonalInfoType = {
  name: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipcode: string;
};

export type EducationalStatusType = {
  isStudying: boolean;
  studyingAt?: string;
};

export type ProjectType = {
  id: string;
  name: string;
  description: string;
};

export type FormDataType = {
  personalInfo: PersonalInfoType;
  educationalStatus: EducationalStatusType;
  projects: ProjectType[];
};

interface FormContextType {
  formData: FormDataType;
  currentStep: number;
  updateFormData: (
    section: keyof FormDataType,
    data: Partial<PersonalInfoType | EducationalStatusType | ProjectType[]>
  ) => void;
  saveAndContinue: (section: keyof FormDataType, data: any) => Promise<void>;
  goBack: () => void;
}

// Initial form data
const initialFormData: FormDataType = {
  personalInfo: {
    name: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: "",
  },
  educationalStatus: {
    isStudying: false,
    studyingAt: "",
  },
  projects: [{ id: crypto.randomUUID(), name: "", description: "" }],
};

// Create context
const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  // Fetch existing form data on initial load
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const data = await formApi.getFormData();
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    
    fetchFormData();
  }, []);

  const updateFormData = (
    section: keyof FormDataType,
    data: Partial<PersonalInfoType | EducationalStatusType | ProjectType[]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const saveAndContinue = async (section: keyof FormDataType, data: any) => {
    try {
      // Update local state
      const updatedFormData = {
        ...formData,
        [section]: data,
      };
      setFormData(updatedFormData);
      
      // Save to backend using the appropriate API function
      if (section === "personalInfo") {
        await formApi.savePersonalInfo(data);
        setCurrentStep(2);
        navigate("/education");
      } else if (section === "educationalStatus") {
        await formApi.saveEducationalStatus(data);
        setCurrentStep(3);
        navigate("/projects");
      } else if (section === "projects") {
        await formApi.saveProjects(data);
        // Complete form submission
        await formApi.completeForm(updatedFormData);
        alert("Form submitted successfully!");
      }
    } catch (error) {
      console.error(`Error saving ${section} data:`, error);
    }
  };

  const goBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      navigate("/");
    } else if (currentStep === 3) {
      setCurrentStep(2);
      navigate("/education");
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        updateFormData,
        saveAndContinue,
        goBack,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;