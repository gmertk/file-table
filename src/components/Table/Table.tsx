export type Column<T> = {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
};

export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.render ? column.render(row) : (row as any)[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
