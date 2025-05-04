import { Col, Row } from 'react-bootstrap';
import { Label, LabelDescription, LabelDescriptionList } from './styles';
import { useFormContext } from 'react-hook-form';
import InputErrorMessage from '@/components/Inputs/InputErrorMessage';
import Tooltip from '@/components/Tooltip';
import { IconHelpCircleFilled } from '@tabler/icons-react';

interface Props {
  name: string;
  label: string;
  labelDescriptions?: string[];
  children: React.ReactNode;
  tooltipContent?: string;
  hasAsterisk?: boolean;
}

function LabelledInputWrapper({
  name,
  label,
  labelDescriptions,
  children,
  tooltipContent,
  hasAsterisk,
}: Readonly<Props>) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Col>
      <Row>
        <Label className="p-0 mb-1">
          {label}
          {hasAsterisk && (
            <span className="ms-1 p-0 text-danger fw-bold">*</span>
          )}
          {tooltipContent && (
            <Tooltip content={tooltipContent}>
              <IconHelpCircleFilled className="ms-2" size={20} />
            </Tooltip>
          )}
        </Label>
      </Row>
      {labelDescriptions && labelDescriptions.length > 0 && (
        <Row className="mb-2">
          <LabelDescriptionList>
            {labelDescriptions.map((description) => (
              <LabelDescription key={description}>
                {description}
              </LabelDescription>
            ))}
          </LabelDescriptionList>
        </Row>
      )}
      <Row>{children}</Row>
      <Row>
        <InputErrorMessage errors={errors} name={name} />
      </Row>
    </Col>
  );
}

export default LabelledInputWrapper;
