export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "none" : "1px solid #fff",
    boxShadow: state.isFocused ? "none" : "0 0 0 0 #f6c717",
    borderRadius: "0px",
    ":hover": {
      border: "1px solid #f6c717",
      transition: "border 300ms",
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: "12px",
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#f6c717",
  }),
  option: (provided, state) => ({
     ...provided,
     
     ':hover': {
        backgroundColor: "#f6c717",
        opacity: state.isSelected ? 0.5 : 1,
        transition: "all 300ms"
     }
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    ':hover': {
      backgroundColor: '#f3d46d',
      transition: "all 300ms"
    },
  })
};
