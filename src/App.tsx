import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormLayout from "./components/layout/FormLayout";
import PersonalInfo from "./components/forms/PersonalInfo";
import EducationalStatus from "./components/forms/EducationalStatus";
import Projects from "./components/forms/Projects";
import FormProvider from "./context/FormContext";
import "./index.css";

function App() {
  return (
    <Router>
      <FormProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<FormLayout />}>
              <Route index element={<PersonalInfo />} />
              <Route path="education" element={<EducationalStatus />} />
              <Route path="projects" element={<Projects />} />
            </Route>
          </Routes>
        </div>
      </FormProvider>
    </Router>
  );
}

export default App;