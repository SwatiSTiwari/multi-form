import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext, PersonalInfoType } from "../../context/FormContext";
import FormField from "../ui/FormField";

// Validation schema
const personalInfoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipcode: z.string().min(5, "Valid zipcode is required"),
});

const PersonalInfo = () => {
  const { formData, saveAndContinue } = useFormContext();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData.personalInfo,
  });

  // Load saved data
  useEffect(() => {
    reset(formData.personalInfo);
  }, [formData.personalInfo, reset]);

  const onSubmit = async (data: PersonalInfoType) => {
    await saveAndContinue("personalInfo", data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
        <p className="text-gray-500 mt-1">
          Please provide your contact information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          label="Full Name"
          name="name"
          register={register}
          error={errors.name}
          placeholder="John Doe"
        />
        
        <FormField
          label="Email Address"
          name="email"
          register={register}
          error={errors.email}
          type="email"
          placeholder="john.doe@example.com"
        />
        
        <FormField
          label="Address Line 1"
          name="addressLine1"
          register={register}
          error={errors.addressLine1}
          placeholder="123 Main Street"
        />
        
        <FormField
          label="Address Line 2 (Optional)"
          name="addressLine2"
          register={register}
          error={errors.addressLine2}
          placeholder="Apartment, suite, unit, etc."
          required={false}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <FormField
              label="City"
              name="city"
              register={register}
              error={errors.city}
              placeholder="New York"
            />
          </div>
          
          <div className="md:col-span-1">
            <FormField
              label="State"
              name="state"
              register={register}
              error={errors.state}
              placeholder="NY"
            />
          </div>
          
          <div className="md:col-span-1">
            <FormField
              label="Zipcode"
              name="zipcode"
              register={register}
              error={errors.zipcode}
              placeholder="10001"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;