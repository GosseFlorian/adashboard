// import { useState } from 'react'
import "./App.css";
import { CardList } from "./components/card-list/CardList";
import { FormAddSkills } from "./components/form-add-skills/FormAddSkills";
import { useAppStore } from "../store/useAppStore";
import { useEffect } from "react";

function App() {
  const loadData = useAppStore((s) => s.loadData);
  const showFormForTheme = useAppStore((s) => s.showFormForTheme);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <h1>Adashboard</h1>
      <CardList />
      {showFormForTheme !== null && (
        <FormAddSkills themeId={showFormForTheme} />
      )}
    </>
  );
}

export default App;
