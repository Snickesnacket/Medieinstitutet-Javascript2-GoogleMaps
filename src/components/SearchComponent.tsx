import { ReactSearchAutocomplete } from "react-search-autocomplete";
import usePlacesAutocomplete from "use-places-autocomplete";

type Item = {
  id: string;
  name: string;
};

type Props = {
  handleOnSelect: (item: Item) => Promise<void>;
};

export const SearchComponent = ({ handleOnSelect }: Props) => {
  const {
    suggestions: { data },
    setValue,
  } = usePlacesAutocomplete();

  const suggestion = data ? data : [];

  const handleOnSearch = (searchString: string) => {
    setValue(searchString);
  };

  return (
    <div style={{ width: 400 }}>
      <ReactSearchAutocomplete
        items={suggestion.map((s) => ({
          id: s.place_id,
          name: s.description,
        }))}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        autoFocus
      />
    </div>
  );
};
