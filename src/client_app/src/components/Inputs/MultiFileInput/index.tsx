import React, { memo, useRef, useState } from "react";
import {
  FileUploadContentWrapper,
  DragFileElement,
  FileNameTooltip,
  FileNameWrapper,
  FileUploadForm,
  FullFileName,
  Input,
  FileUploadLabel,
  ShortFileName,
} from "./styles";
import { IconFileCheck, IconFileUpload, IconX } from "@tabler/icons-react";
import { Button, OverlayTrigger } from "react-bootstrap";

export type MultiFileInputProps = React.HTMLProps<HTMLInputElement> & {
  externalValue: FileList | null | undefined;
  setExternalValue: (value: FileList | null | undefined) => void;
  isInvalid?: boolean;
  externalOnFocus?: () => any;
  externalOnBlur?: () => any;
};

const MultiFileInput = memo(
  React.forwardRef(
    (
      {
        externalValue,
        setExternalValue,
        isInvalid,
        externalOnFocus = () => {},
        externalOnBlur = () => {},
        onBlur,
        onFocus,
        disabled,
        name,
      }: MultiFileInputProps,
      ref
    ) => {
      const wrapperRef = useRef<any | null>(null);

      const isExistFile = true;

      const [dragActive, setDragActive] = useState<boolean>(false);

      const addFiles = function (files: any) {
        if (files) {
          const newFiles = Array.from(files as FileList);

          const existingFileNames = externalValue
            ? Array.from(externalValue).map((file) => file.name)
            : [];

          const filteredFiles = newFiles.filter(
            (file) => !existingFileNames.includes(file.name)
          );

          if (filteredFiles.length > 0) {
            const dataTransfer = new DataTransfer();

            if (externalValue) {
              Array.from(externalValue).forEach((file) =>
                dataTransfer.items.add(file)
              );
            }

            filteredFiles.forEach((file) => dataTransfer.items.add(file));
            setExternalValue(dataTransfer.files);
          }
        }
      };

      const handleDrag = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
          setDragActive(false);
        }
      };

      const handleDrop = function (e: any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        addFiles(e.dataTransfer.files);
      };

      const handleChange = function (e: any) {
        e.preventDefault();
        addFiles(e.target.files);
      };

      const onButtonClick = () => {
        if (wrapperRef.current) {
          wrapperRef.current.click();
        }
      };

      const clearFile = (e: any, fileName: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (externalValue) {
          const remainingFiles = Array.from(externalValue).filter(
            (file) => file.name !== fileName
          );

          const dataTransfer = new DataTransfer();
          remainingFiles.forEach((file) => dataTransfer.items.add(file));

          setExternalValue(
            dataTransfer.files.length > 0 ? dataTransfer.files : null
          );
        }
      };

      return (
        <FileUploadForm
          onDragEnter={handleDrag}
          data-testid="multifile-input"
          $disabled={disabled}
        >
          <Input
            ref={wrapperRef}
            name={name}
            type="file"
            id="input-file-upload"
            onChange={handleChange}
            onFocus={(e: any) => {
              if (onFocus) {
                onFocus(e);
              }
              externalOnFocus();
            }}
            onBlur={(e: any) => {
              if (onBlur) {
                onBlur(e);
              }
              externalOnBlur();
            }}
            isInvalid={isInvalid}
            disabled={disabled}
            multiple
          />
          <FileUploadContentWrapper
            $hasFile={!!externalValue}
            $disabled={disabled}
          >
            <FileUploadLabel
              htmlFor="input-file-upload"
              $active={dragActive}
              $isInvalid={isInvalid}
              $disabled={disabled}
            >
              {isExistFile ? (
                <IconFileCheck size={40} className="mt-2" />
              ) : (
                <IconFileUpload size={40} className="mt-2" />
              )}
              <p>Drop file to upload or Browse Files</p>
              <Button
                onClick={onButtonClick}
                disabled={disabled}
                className="mb-2"
              >
                Upload
              </Button>

              {externalValue &&
                Array.from(externalValue).map((file) => {
                  return (
                    <FileNameWrapper key={file.name} className="mt-0 mb-2">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <FileNameTooltip>
                            <FullFileName>{file.name}</FullFileName>
                          </FileNameTooltip>
                        }
                      >
                        <ShortFileName>{file.name}</ShortFileName>
                      </OverlayTrigger>

                      <Button
                        variant="outline-light"
                        onClick={(e) => clearFile(e, file.name)}
                        disabled={disabled}
                      >
                        <IconX size={20} />
                      </Button>
                    </FileNameWrapper>
                  );
                })}
            </FileUploadLabel>
          </FileUploadContentWrapper>
          {dragActive && (
            <DragFileElement
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              data-testid="dropZone"
            />
          )}
        </FileUploadForm>
      );
    }
  )
);

export default MultiFileInput;
