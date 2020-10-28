import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

interface Input {
  updateInputAddress: (evt: any) => void;
  label: string;
  placeholder: string;
}

function InputAutocomplete(props: Input) {
  const [address, setAddress] = React.useState("");

  const handleSelect = async (address: string) => {
    setAddress(address);
    props.updateInputAddress(address);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleSelect}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="mt-6">
            <label className="text-green-500">{props.label}</label>
            <input
              {...getInputProps({})}
              className="mt-1 p-2 flex items-center border border-gray-400 rounded w-full"
              name={props.label}
              placeholder={props.placeholder}
            />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#c6f6d5" : "#fff",
                };

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={suggestion.placeId}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
export default InputAutocomplete;
