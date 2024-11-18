import { files } from "./data/files";

import { Table } from "./components/Table/Table";
import { useState } from "react";

function App() {
  const columns = [
    { key: "name", header: "Name" },
    { key: "device", header: "Device" },
    { key: "path", header: "Path" },
    { key: "status", header: "Status" },
  ];

  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  return (
    <Table
      data={files}
      columns={columns}
      keyExtractor={(file) => file.path}
      selectedRows={selectedFiles}
      onSelectionChange={setSelectedFiles}
      isRowSelectable={(file) => file.status === "available"}
    />
  );
}

export default App;
