import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import style from "./EditableForm.module.css";
import { Controller, useForm } from "react-hook-form";
import { selectStylesModal } from "./selectStylesOrigin";
import Select from "react-select";
import { schema } from "./schema";
import { ButtonStyled } from "../../button/ButtonStyled";
import { useDispatch, useSelector } from "react-redux";
import { stateOrigins } from "../../../bus/origins/selectors";
import { getOrigins } from "../../../bus/origins/thunks";

const EditableForm = ({
  titleButton,
  productEdit,
  handlerClick,
  resetCancelTitle,
  primaryButton,
  hide,
}) => {
  const defaultValues =
    productEdit !== undefined
      ? {
          productName: productEdit.name,
          productPrice: productEdit.price,
          origin: { value: productEdit.origin, label: productEdit.origin },
        }
      : {
          productName: null,
          productPrice: null,
          origin: { value: "", label: "" },
        };

  const dispatch = useDispatch();
  const state = useSelector(stateOrigins);
  const { origins } = state;

  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    dispatch(getOrigins());
    setIsFetching(false);
  }, [isFetching, dispatch]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
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

  const handlerResetCancelClick = () => {
    productEdit === undefined ? hide() : reset();
  };

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
          rules={{ required: true }}
          control={control}
          defaultValue={defaultValues.origin.label}
          shouldUnregister={true}
          render={({ field: { value, onChange } }) => (
            <Select
              className={style.chooseOriginSelect}
              styles={selectStylesModal}
              options={origins}
              onChange={(e) => onChange(e)}
              value={origins.find((c) => c.value === value)}
              placeholder="choose origin"
            />
          )}
        />
        <p>{errors.origin?.message}</p>
      </div>
      <div className={style.buttonsModal}>
        <ButtonStyled
          primary={primaryButton}
          disabled={!isDirty || isFetching}
          type="submit"
        >
          {titleButton}
        </ButtonStyled>
        <ButtonStyled
          primary={primaryButton}
          type="button"
          onClick={() => handlerResetCancelClick()}
        >
          {resetCancelTitle}
        </ButtonStyled>
      </div>
    </form>
  );
};

export default EditableForm;
