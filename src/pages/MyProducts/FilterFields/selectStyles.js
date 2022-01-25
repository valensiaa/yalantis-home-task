export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "none" : "1px solid #fff",
    boxShadow: state.isFocused ? "none" : "0 0 0 0 #f6c717",
    borderRadius: "0px",
    ":hover": {
      border: "1px solid #331f53",
      transition: "border 300ms",
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: "12px",
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#fff",
  }),
  option: (provided, state) => ({
     ...provided,
     
     ':hover': {
        backgroundColor: "#331f53",
        color:'#fff',
        opacity: state.isSelected ? 0.5 : 1,
        transition: "all 300ms"
     }
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    ':hover': {
      backgroundColor: '#5c4c75',
      color: '#fff',
      transition: "all 300ms"
    },
  })
};
