import React, { createContext, useContext, useState } from "react";

interface SelectedValuesContextType {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedUtbud: string;
  setSelectedUtbud: React.Dispatch<React.SetStateAction<string>>;
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
