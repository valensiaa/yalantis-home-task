import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import style from "./EditableForm.module.css";
import { Controller, useForm } from "react-hook-form";
import { selectStylesModal } from "./selectStylesOrigin";
import ReactSelect from "react-select";
import { schema } from "./schema";
import { stateMyAccount } from "../../../bus/myAccount/selectors";

const EditableForm = ({
  handlerResetCancelClick,
  titleButton,
  productEdit,
  handlerClick,
  resetCancelTitle,
}) => {
  const state = useSelector(stateMyAccount);
  const { origins } = state;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  let defaultValues;
  if (productEdit !== undefined) {
    console.log(productEdit)
    defaultValues = {
      productName: productEdit.name,
      productPrice: productEdit.price,
      origin: {value:productEdit.origin, label:productEdit.origin},
    };
  } else {
    defaultValues = {
      productName: null,
      productPrice: null,
      origin: {value:null, label:null},
    };
  }

  const [isFetching, setIsFetching] = useState(false);
  const onSubmitHandler = (data) => {
    console.log('data',data)
    const bodyArr = [
      {
        product: {
          name: data.productName,
          price: data.productPrice,
          origin: data.origin.value,
        },
      },
      { id: productEdit === undefined ? null : productEdit.id },
    ];

    setIsFetching(true);
    handlerClick(bodyArr);
    setIsFetching(false);
  };
  useEffect(() => {
    setIsFetching(false);
  }, [isFetching]);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={style.fieldModal}>
        <input
          className={style.modalNameProduct}
          placeholder="product name"
          defaultValue={defaultValues.productName}
          {...register("productName")}
        />
        <p>{errors.productName?.message}</p>
      </div>
      <div className={style.fieldModal}>
        <input
          className={style.modalPrice}
          defaultValue={defaultValues.productPrice}
          type="number"
          placeholder="product price"
          {...register("productPrice")}
        />
        <p>{errors.productPrice?.message}</p>
      </div>
      <div className={style.fieldModal}>
        <Controller
          name="origin"
          control={control}
          defaultValue={defaultValues.origin.value}
          shouldUnregister={true}
          render={({ field: { ref, value, onChange } }) => (
            <ReactSelect
              className={style.chooseOriginSelect}
              styles={selectStylesModal}
              inputRef={ref}
              options={origins}
              onChange={onChange}
              value={origins.find((c) => c.value === value)}
              placeholder="choose origin"
            />
          )}
        />
        <p>{errors.origin?.message}</p>
      </div>
      <div className={style.buttonsModal}>
        <button disabled={!isDirty || isFetching} type="submit">
          {titleButton}
        </button>
        <button onClick={() => handlerResetCancelClick()}>
          {resetCancelTitle}
        </button>
      </div>
    </form>
  );
};

export default EditableForm;
