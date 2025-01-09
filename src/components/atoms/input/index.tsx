import { Input, InputRef, Spin, Tooltip } from "antd";
import React, {
  type ChangeEvent,
  forwardRef,
  type MouseEvent,
  useEffect,
  useState,
} from "react";
import type { IInputPropTypes } from "./types";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { Icon } from "@/components";
import { LoadingOutlined } from "@ant-design/icons";

const InputComponent = forwardRef<InputRef, IInputPropTypes>(
  (
    {
      labelIcon,
      isLoading,
      placeholder,
      error,
      errorText,
      tooltipText,
      disabled,
      inputType,
      label,
      isRequired,
      maxLength,
      minLength,
      readOnly,
      onBlur,
      onFocus,
      onKeyDown,
      value,
      name,
      onChange,
      onClick,
      size,
      prefix,
      suffix,
      onClickSuffixIcon,
      onClickPrefixIcon,
      warningText,
      isOptional,
      tooltipTitle,
      darkMode,
      purpleMode,
      grayMode,
      showArrows,
      showArrowMaxValue,
      ...rest
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string | number | undefined>(
      value ?? ""
    );
    const [passwordVisible, setPasswordVisible] = useState(false);

    function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
      e.preventDefault();
      setInputValue(e.target.value);
      onChange?.(e);
    }

    function onBlurInput(e: ChangeEvent<HTMLInputElement>) {
      e.preventDefault();
      onBlur?.(e);
    }

    function onFocusInput(e: ChangeEvent<HTMLInputElement>) {
      e.preventDefault();
      onFocus?.(e);
    }

    const handlerClick = (data: MouseEvent<HTMLInputElement>) => {
      onClick?.(data);
    };

    const onIncrease = () => {
      if (typeof inputValue === "number" || Number(inputValue) === 0) {
        const newValue = Number(inputValue) + 1;
        setInputValue(newValue);
          onChange?.({
            target: { value: newValue, name } as unknown,
          } as ChangeEvent<HTMLInputElement>);
      }
    };

    const onDecrease = () => {
      if (typeof inputValue === "number") {
        const newValue = Math.max(0, inputValue - 1);
        setInputValue(newValue);
          onChange?.({
            target: { value: newValue, name } as unknown,
          } as ChangeEvent<HTMLInputElement>);
      }
    };

    useEffect(() => {
        setInputValue(value ?? "");
    }, [value]);

    return (
      <div
        className={classNames(styles.input, disabled && styles.disabled)}
        onClick={handlerClick}
      >
        {tooltipText && tooltipTitle && !label && (
          <Tooltip title={tooltipTitle} placement={"right"} trigger="hover">
            <div className={styles.tooltip}>
              <h2>{tooltipText}</h2>
              <Icon icon="IconWarningCircle" />
            </div>
          </Tooltip>
        )}
        {label && !tooltipText && (
          <p
            className={classNames(
              styles.input__label,
              isRequired && styles.align
            )}
          >
            {label}
            {labelIcon && <Icon icon={labelIcon} />}
            {isOptional && (
              <span className={styles.input__label__optional}>(optional)</span>
            )}
            {isRequired && <b>*</b>}
          </p>
        )}
        <div
          className={classNames(
            styles.input__box,
            darkMode && styles.dark_mode,
            purpleMode && styles.purple_mode,
            grayMode && styles.grey_mode
          )}
        >
          <Input
            onWheel={(e) => {
              const inputElement = e.target as HTMLInputElement;
              return inputElement.blur();
            }}
            className={
              darkMode
                ? "dark_mode_input"
                : purpleMode
                ? "purple_mode_input"
                : grayMode
                ? "gray_mode_input"
                : ""
            }
            status={error ? "error" : ""}
            size={size}
            ref={ref}
            type={passwordVisible ? "text" : inputType}
            name={name}
            required={isRequired}
            defaultValue={inputValue}
            value={inputValue}
            onChange={onChangeInput}
            placeholder={isLoading ? "Loading..." : placeholder}
            onBlur={onBlurInput}
            onFocus={onFocusInput}
            disabled={isLoading || disabled}
            onKeyDown={onKeyDown}
            maxLength={maxLength}
            minLength={minLength}
            readOnly={readOnly}
            prefix={
              isLoading ? (
                <span>
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 24,
                          color: "#7a58d0",
                          marginRight: "5px",
                        }}
                        spin
                      />
                    }
                  />
                </span>
              ) : (
                <span
                  onClick={(e) => onClickPrefixIcon && onClickPrefixIcon(e)}
                  style={{ marginRight: "4px", color: "#282529" }}
                >
                  {prefix}
                </span>
              )
            }
            suffix={
              inputType === "password" ? (
                passwordVisible ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setPasswordVisible(false)}
                  >
                    <Icon icon={"IconEye"} />
                  </span>
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setPasswordVisible(true)}
                  >
                    <Icon icon={"IconEyeSlash"} />
                  </span>
                )
              ) : (
                <span
                  onClick={(e) => onClickSuffixIcon && onClickSuffixIcon(e)}
                >
                  {suffix}
                </span>
              )
            }
            {...rest}
            style={{
              borderRadius: "8px",
            }}
            aria-invalid={error}
          />
        </div>
        {showArrows && (
          <div className={styles.numeric_arrows}>
            <span
              onClick={onIncrease}
              className={classNames(
                showArrowMaxValue &&
                  Number(inputValue) >= showArrowMaxValue &&
                  styles.arrow_disabled
              )}
            >
              <Icon icon="IconChevronUp" svgProps={{ color: "#C1C1C1" }} />
            </span>
            <span
              onClick={onDecrease}
              className={classNames(inputValue === 1 && styles.arrow_disabled)}
            >
              <Icon icon="IconChevronDown" svgProps={{ color: "#C1C1C1" }} />
            </span>
          </div>
        )}
        {error && errorText && (
          <p className={styles.input__error_text}>
            <span>
              <Icon
                icon={"IconErrorIcon"}
                svgProps={{
                  width: "14px",
                  height: "14px",
                }}
              />
            </span>
            <span>{errorText}</span>
          </p>
        )}
        {warningText && !error && !errorText && (
          <p className={styles.input__warning_text}>
            <span>
              <Icon
                icon={"IconWarningCircle"}
                svgProps={{
                  width: "14px",
                  height: "14px",
                  fill: "green",
                }}
              />
            </span>
            <span>{warningText}</span>
          </p>
        )}
      </div>
    );
  }
);

InputComponent.displayName = "InputComponent";

export default InputComponent;
