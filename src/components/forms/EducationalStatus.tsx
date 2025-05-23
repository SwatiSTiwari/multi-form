import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext, EducationalStatusType } from "../../context/FormContext";
import FormField from "../ui/FormField";

// Validation schema
const educationalStatusSchema = z.object({
  isStudying: z.boolean(),
  studyingAt: z
    .string()
    .optional()
    .refine(
      (val, ctx) => {
        if (ctx.parent.isStudying && (!val || val.trim() === "")) {
          return false;
        }
        return true;
      },
      {
        message: "Please specify where you are studying",
      }
    ),
});

const EducationalStatus = () => {
  const { formData, saveAndContinue, goBack } = useFormContext();
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EducationalStatusType>({
    resolver: zodResolver(educationalStatusSchema),
    defaultValues: formData.educationalStatus,
  });

  // Load saved data
  useEffect(() => {
    reset(formData.educationalStatus);
  }, [formData.educationalStatus, reset]);

  // Watch for the isStudying value
  const isStudying = watch("isStudying");

  const onSubmit = async (data: EducationalStatusType) => {
    await saveAndContinue("educationalStatus", data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Educational Status</h2>
        <p className="text-gray-500 mt-1">
          Please provide information about your current educational status
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Are you still studying?
          </label>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                id="studying-yes"
                type="radio"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                value="true"
                {...register("isStudying", { 
                  setValueAs: (value) => value === "true" 
                })}
              />
              <label 
                htmlFor="studying-yes" 
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                Yes
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="studying-no"
                type="radio"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                value="false"
                {...register("isStudying", { 
                  setValueAs: (value) => value === "true" 
                })}
              />
              <label 
                htmlFor="studying-no" 
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                No
              </label>
            </div>
          </div>
          {errors.isStudying && (
            <p className="mt-1 text-sm text-red-600">{errors.isStudying.message}</p>
          )}
        </div>

        {/* Conditional field that appears when isStudying is true */}
        {isStudying && (
          <FormField
            label="Where are you studying?"
            name="studyingAt"
            register={register}
            error={errors.studyingAt}
            placeholder="Enter your school/university name"
          />
        )}
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={goBack}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
          >
            Back
          </button>
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

export default EducationalStatus;