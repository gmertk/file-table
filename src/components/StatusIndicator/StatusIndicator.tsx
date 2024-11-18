import styled from "styled-components";
import { colors } from "../../theme/colors";

export type StatusType = keyof typeof colors.status | "none";

type StatusIndicatorProps = {
  status: StatusType;
  children: React.ReactNode;
};

export const StatusIndicator = ({ status, children }: StatusIndicatorProps) => {
  return (
    <Container>
      <StatusDot
        color={
          status !== "none"
            ? colors.status[status as keyof typeof colors.status]
            : "transparent"
        }
      />
      {children}
    </Container>
  );
};

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const StatusDot = styled.span<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ color }) => color};
`;
