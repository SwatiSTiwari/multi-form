import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormContext, ProjectType } from "../../context/FormContext";
import { Plus, Trash } from "lucide-react";

// Validation schema
const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const projectsSchema = z.object({
  projects: z.array(projectSchema).min(1, "At least one project is required"),
});

const Projects = () => {
  const { formData, saveAndContinue, goBack } = useFormContext();
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ projects: ProjectType[] }>({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      projects: formData.projects.length > 0 
        ? formData.projects 
        : [{ id: crypto.randomUUID(), name: "", description: "" }],
    },
  });

  // Field array for dynamic projects
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  // Load saved data
  useEffect(() => {
    if (formData.projects.length > 0) {
      reset({ projects: formData.projects });
    }
  }, [formData.projects, reset]);

  const onSubmit = async (data: { projects: ProjectType[] }) => {
    await saveAndContinue("projects", data.projects);
  };

  const addProject = () => {
    append({ id: crypto.randomUUID(), name: "", description: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
        <p className="text-gray-500 mt-1">
          Please add information about your projects
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div 
            key={field.id} 
            className="p-5 border border-gray-200 rounded-lg bg-gray-50 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Project {index + 1}</h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none transition-colors"
                >
                  <Trash className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                {...register(`projects.${index}.name`)}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.projects?.[index]?.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                placeholder="Enter project name"
              />
              {errors.projects?.[index]?.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.projects[index]?.name?.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Description
              </label>
              <textarea
                {...register(`projects.${index}.description`)}
                rows={3}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.projects?.[index]?.description
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
                placeholder="Describe your project"
              />
              {errors.projects?.[index]?.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.projects[index]?.description?.message}
                </p>
              )}
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addProject}
          className="flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Project
        </button>
        
        {errors.projects && errors.projects.message && (
          <p className="mt-1 text-sm text-red-600">{errors.projects.message}</p>
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
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Projects;