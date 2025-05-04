import React, { memo, useEffect, useRef, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import { CustomMenu } from "./CustomMenu";
import CustomMenuWithSearch from "./CustomMenuWithSearch";
import { CustomToggle } from "./CustomToggle";
import { Input } from "./styles";

type Props = React.HTMLProps<HTMLSelectElement> & {
  externalValue?: string;
  setExternalValue: (value?: any) => void;
  maxLength?: number;
  options: { value: string | number; displayValue: string }[];
  isInvalid?: boolean;
  withSearch?: boolean;
  externalOnBlur?: () => any;
  hideEmptyOption?: boolean;
};

const ComboboxInput = React.forwardRef(
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
      placeholder,
      maxLength,
      hideEmptyOption,
    }: Props,
    ref
  ) => {
    const wrapperRef = useRef<any | null>(null);
    const [isFocused, setIsFocused] = useState<boolean | null>(null);
    const [inputValue, setInputValue] = useState<string>("");

    // Sync the input value with the external value
    useEffect(() => {
      const found = options.find(
        (o) => o.value.toString() === externalValue?.toString()
      );
      setInputValue(found?.displayValue || externalValue || "");
    }, [externalValue, options]);

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

    return (
      <Dropdown ref={wrapperRef} className={isInvalid ? "is-invalid" : ""}>
        <Dropdown.Toggle
          name={name}
          as={CustomToggle}
          disabled={disabled}
          $isInvalid={isInvalid}
          $isDisabled={disabled}
        >
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setExternalValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              externalOnBlur();
            }}
            placeholder={placeholder ?? "Select or type"}
            disabled={disabled}
            maxLength={maxLength}
            autoComplete="off"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu
          as={!withSearch ? CustomMenu : CustomMenuWithSearch}
          {...(withSearch && { maxLength: maxLength })}
          style={{
            width: wrapperRef.current?.offsetWidth || "auto",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {!hideEmptyOption && (
            <Dropdown.Item
              onClick={() => {
                setExternalValue(null);
                setInputValue("");
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
                setExternalValue(o.value);
                setInputValue(o.displayValue);
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

export default memo(ComboboxInput);
