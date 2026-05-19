// import { useState } from 'react'
import "./App.css";
import { CardList } from "./components/card-list/CardList";
import { useAppStore } from "../store/useAppStore";
import { useEffect } from "react";

function App() {
  const loadData = useAppStore((s) => s.loadData);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <h1>Hello</h1>
      <CardList />
    </>
  );
}

export default App;
