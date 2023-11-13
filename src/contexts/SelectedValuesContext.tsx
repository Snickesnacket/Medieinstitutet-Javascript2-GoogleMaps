import React, { createContext, useContext, useState } from "react";

interface SelectedValuesContextType {
  valdKategori: string;
  setValdKategori: React.Dispatch<React.SetStateAction<string>>;
  valdUtbud: string;
  setValdUtbud: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValues: SelectedValuesContextType = {
  valdKategori: "",
  setValdKategori: () => {},
  valdUtbud: "",
  setValdUtbud: () => {},
};

type SelectedValueContextProps = {
  children: React.ReactNode;
};

export const SelectedValuesContext =
  createContext<SelectedValuesContextType>(defaultValues);

// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedValues = () => useContext(SelectedValuesContext);

export const SelectedValuesProvider: React.FC<SelectedValueContextProps> = ({
  children,
}) => {
  const [valdKategori, setValdKategori] = useState<string>("");
  const [valdUtbud, setValdUtbud] = useState<string>("");

  return (
    <SelectedValuesContext.Provider
      value={{
        valdKategori: valdKategori,
        setValdKategori: setValdKategori,
        valdUtbud: valdUtbud,
        setValdUtbud: setValdUtbud,
      }}
    >
      {children}
    </SelectedValuesContext.Provider>
  );
};
