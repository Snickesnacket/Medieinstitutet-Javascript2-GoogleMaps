import React, { createContext, useContext, useState } from "react";

interface SelectedValuesContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedUtbud: string;
  setSelectedUtbud: (utbud: string) => void;
}
const defaultValues: SelectedValuesContextType = {
  selectedCategory: "",
  setSelectedCategory: () => {},
  selectedUtbud: "",
  setSelectedUtbud: () => {},
};

type SelectedValueContextProps = {
  children: React.ReactNode;
};

export const SelectedValuesContext =
  createContext<SelectedValuesContextType>(defaultValues);

export const useSelectedValues = () => useContext(SelectedValuesContext);

export const SelectedValuesProvider: React.FC<SelectedValueContextProps> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedUtbud, setSelectedUtbud] = useState<string>("");

  return (
    <SelectedValuesContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedUtbud,
        setSelectedUtbud,
      }}
    >
      {children}
    </SelectedValuesContext.Provider>
  );
};
