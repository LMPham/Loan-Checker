import React, { memo, useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { CustomMenu } from "./CustomMenu";
import CustomMenuWithSearch from "./CustomMenuWithSearch";
import { CustomToggle } from "./CustomToggle";

type Props = React.HTMLProps<HTMLSelectElement> & {
  externalValue?: string;
  setExternalValue: (value?: any) => void;
  maxLength?: number;
  options: { value: string | number; displayValue: string }[];
  defaultValue?: string;
  isInvalid?: boolean;
  withSearch?: boolean;
  withDisplaySort?: boolean;
  externalOnBlur?: () => any;
  hideEmptyOption?: boolean;
};

const DropdownInput = React.forwardRef(
  (
    {
      externalValue,
      setExternalValue,
      disabled,
      options,
      isInvalid = undefined,
      withSearch,
      externalOnBlur = () => {},
      onBlur,
      onFocus,
      name,
      defaultValue,
      placeholder,
      maxLength,
      hideEmptyOption,
    }: Props,
    ref
  ) => {
    const wrapperRef = useRef<any | null>(null);
    const [isFocused, setIsFocused] = useState<boolean | null>(null);
    useEffect(() => {
      if (isFocused === false) externalOnBlur();
    }, [isFocused]);
    useEffect(() => {
      function handleFocus(event: any) {
        if (wrapperRef.current)
          if (wrapperRef.current.contains(event.target)) {
            onFocus && onFocus(event);
            setIsFocused(true);
          } else
            setIsFocused((prev) => {
              if (prev === null) return null;
              else {
                onBlur && onBlur(event);
                externalOnBlur();
                return false;
              }
            });
      }

      document.addEventListener("mousedown", handleFocus);
      return () => {
        document.removeEventListener("mousedown", handleFocus);
      };
    }, [wrapperRef]);

    const renderValue = () => {
      if (!externalValue) {
        return !placeholder ? (
          "Select"
        ) : (
          <span className="text-secondary">{placeholder}</span>
        );
      }

      const found = options.find(
        (o) => o.value.toString() === externalValue.toString()
      );

      if (!found) return defaultValue;
      return found.displayValue;
    };

    return (
      <Dropdown ref={wrapperRef} className={isInvalid ? "is-invalid" : ""}>
        <Dropdown.Toggle
          name={name}
          as={CustomToggle}
          disabled={disabled}
          $isInvalid={isInvalid}
          $isDisabled={disabled}
        >
          {renderValue()}
        </Dropdown.Toggle>

        <Dropdown.Menu
          as={!withSearch ? CustomMenu : CustomMenuWithSearch}
          {...(withSearch && { maxLength: maxLength })}
        >
          {!hideEmptyOption && (
            <Dropdown.Item
              onClick={() => {
                setExternalValue(null);
                externalOnBlur();
              }}
            >
              {!placeholder ? "Select" : placeholder}
            </Dropdown.Item>
          )}
          {options.map((o) => (
            <Dropdown.Item
              key={o.value}
              onClick={() => {
                if (externalValue !== o.value) setExternalValue(o.value);
                externalOnBlur();
              }}
              active={externalValue === o.value}
            >
              {o.displayValue}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
);
export default memo(DropdownInput);
