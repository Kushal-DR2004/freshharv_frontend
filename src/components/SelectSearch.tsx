import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";

interface SelectSearchProps {
  name: string;
  handleSelect: (e: SelectChangeEvent) => void;
  options?: string[];
  value: string;
}

const SelectSearch = ({
  name,
  handleSelect,
  options = [],
  value,
}: SelectSearchProps) => {
  return (
    <FormControl sx={{ minWidth: 150, width: "fit-content" }} size="small">
      <InputLabel id={`${name}-label`}>{name}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        name={name}
        onChange={handleSelect}
        value={value}
        label={name}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((opt, index) => (
          <MenuItem key={index} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectSearch;
