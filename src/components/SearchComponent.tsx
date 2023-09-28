import { Dropdown } from "react-bootstrap";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useSelectedValues } from "../contexts/SelectedValuesContext.tsx";

type Item = {
  id: string;
  name: string;
};

type Props = {
  handleOnSelect: (item: Item) => Promise<void>;
};

export const SearchComponent = ({ handleOnSelect }: Props) => {
  const { setSelectedCategory, setSelectedUtbud } = useSelectedValues();
  const {
    suggestions: { data },
    setValue,
  } = usePlacesAutocomplete();

  const suggestion = data ? data : [];

  const handleOnSearch = (searchString: string) => {
    setValue(searchString);
  };

  return (
    <>
      <div style={{ width: 400 }}>
        <ReactSearchAutocomplete
          items={suggestion.map((s) => ({
            id: s.place_id,
            name: s.description,
          }))}
          onSearch={handleOnSearch}
          onSelect={(item) => handleOnSelect(item)}
          autoFocus
        />
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Kategorier
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSelectedCategory("Cafè")}>
            Cafè
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedCategory("Restaurang")}>
            Restaurang
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedCategory("Snabbtmat")}>
            Snabbtmat
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedCategory("Foodtruck")}>
            Foodtruck
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Utbud
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSelectedUtbud("Fika")}>
            Fika
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedUtbud("Lunch")}>
            Lunch
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedUtbud("After_Work")}>
            After Work
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedUtbud("Middag")}>
            Middag
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
