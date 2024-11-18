import styled from "styled-components";
import { ReactNode } from "react";
import { colors } from "../../theme/colors";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  children: ReactNode;
};

export const IconButton = ({ icon, children, ...props }: IconButtonProps) => {
  return (
    <StyledButton {...props}>
      {icon}
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: inherit;
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover:not(:disabled) {
    background: ${colors.interactive.hover};
  }

  &:disabled {
    color: ${colors.interactive.disabled};
    cursor: not-allowed;
  }
`;
