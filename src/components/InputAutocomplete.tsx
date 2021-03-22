import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import logoGoogle from '../img/powered_by_google.png';
import {log} from "util";

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
        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
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
                    {...getSuggestionItemProps(suggestion, {style})}
                    key={suggestion.placeId}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
              {suggestions.length > 0 &&
              <div className="mt-1 w-full flex justify-end">
                <img src={logoGoogle} className="w-40"/>
              </div>}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default InputAutocomplete;
