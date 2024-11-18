import styled from "styled-components";
import { colors } from "../../theme/colors";

const { tableColors } = colors;
export type Column<T> = {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
};

export function Table<T>({ data, columns, keyExtractor }: TableProps<T>) {
  return (
    <TableWrapper>
      <thead>
        <tr>
          {columns.map((column) => (
            <Th key={column.key}>{column.header}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const key = keyExtractor(row);

          return (
            <Tr key={key}>
              {columns.map((column) => (
                <Td key={`${key}-${column.key}`}>
                  {column.render
                    ? column.render(row)
                    : (row as any)[column.key]}
                </Td>
              ))}
            </Tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
}

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th<{ width?: string }>`
  padding: 12px;
  text-align: left;
  font-weight: 500;
  font-size: 1.05rem;
  border-block: 1px solid ${tableColors.border};
  width: ${(props) => props.width || "auto"};
`;

const Tr = styled.tr<{ selected?: boolean; $selectable?: boolean }>`
  background-color: ${(props) =>
    props.selected ? tableColors.rowSelected : tableColors.rowDefault};
  cursor: ${(props) => (props.$selectable ? "pointer" : "default")};
  &:hover {
    background-color: ${(props) =>
      props.selected ? tableColors.rowSelectedHover : tableColors.rowHover};
  }
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${tableColors.border};
  vertical-align: middle;
`;
