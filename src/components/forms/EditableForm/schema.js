import * as yup from "yup";

export const schema = yup.object().shape({
  productName: yup
    .string("must be a string")
    .min(3, "must have at least 3 characters")
    .max(20, "must have max 20 characters")
    .required("required"),
  productPrice: yup
    .number("must be a number")
    .positive("must be an integer")
    .required("required"),
  origin: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable()
    .required("required"),
});
