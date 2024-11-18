import styled from "styled-components";
import { colors } from "../../theme/colors";
import { Checkbox } from "../Checkbox/Checkbox";

const { tableColors } = colors;
export type Column<T> = {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  selectedRows?: Set<string>;
  isRowSelectable?: (item: T) => boolean;
  onSelectionChange?: (selectedIds: Set<string>) => void;
};

export function Table<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  selectedRows = new Set(),
  isRowSelectable,
  onSelectionChange,
}: TableProps<T>) {
  const handleSelectRow = (item: T) => {
    if (!onSelectionChange) return;

    const itemKey = keyExtractor(item);
    const newSelected = new Set(selectedRows);

    if (newSelected.has(itemKey)) {
      newSelected.delete(itemKey);
    } else {
      newSelected.add(itemKey);
    }

    onSelectionChange(newSelected);
  };

  const renderCell = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item);
    }
    return (item as any)[column.key];
  };

  return (
    <TableWrapper>
      <thead>
        <tr>
          {onSelectionChange && (
            <Th width="40px">{/* Empty header cell for checkbox column */}</Th>
          )}
          {columns.map((column) => (
            <Th key={column.key} width={column.width}>
              {column.header}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const key = keyExtractor(item);
          const isSelectable = isRowSelectable?.(item) ?? true;

          return (
            <Tr
              key={key}
              selected={selectedRows.has(key)}
              $selectable={isSelectable}
              onClick={() => {
                if (onRowClick) onRowClick(item);
                if (isSelectable && onSelectionChange) handleSelectRow(item);
              }}
            >
              {onSelectionChange && (
                <CheckboxCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedRows.has(key)}
                    disabled={!isSelectable}
                    onChange={() => handleSelectRow(item)}
                  />
                </CheckboxCell>
              )}
              {columns.map((column) => (
                <Td key={`${key}-${column.key}`}>{renderCell(item, column)}</Td>
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

const CheckboxCell = styled(Td)`
  text-align: center;
  width: 40px;
`;
