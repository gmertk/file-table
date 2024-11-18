import { useId } from "react";
import styled from "styled-components";

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: string;
  indeterminate?: boolean;
};

export const Checkbox = ({
  indeterminate,
  label,
  id,
  ...props
}: CheckboxProps) => {
  const generatedId = useId();
  const checkboxId = id || `checkbox-${generatedId}`;

  return (
    <CheckboxContainer>
      <StyledCheckbox
        type="checkbox"
        id={checkboxId}
        ref={(input) => {
          if (input) {
            input.indeterminate = indeterminate ?? false;
          }
        }}
        {...props}
      />
      {label && <StyledLabel htmlFor={checkboxId}>{label}</StyledLabel>}
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.div`
  display: table-cell;
`;

const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 0;
  vertical-align: middle;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const StyledLabel = styled.label`
  cursor: pointer;
  padding-left: 8px;
`;
