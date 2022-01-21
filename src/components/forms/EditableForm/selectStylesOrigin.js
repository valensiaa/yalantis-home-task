export const selectStylesModal = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "none" : "1px solid #fff",
    boxShadow: state.isFocused ? "none" : "0 0 0 0 #5c4c75",
    borderRadius: "0px",
    ":hover": {
      border: "1px solid #5c4c75",
      transition: "border 300ms",
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: "12px",
  }),
  option: (provided, state) => ({
     ...provided,
     
     ':hover': {
        backgroundColor: "#331f53",
        color: '#fff',
        opacity: state.isSelected ? 0.5 : 1,
        transition: "all 300ms"
     }
  })
};
