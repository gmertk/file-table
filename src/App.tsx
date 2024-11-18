import { files } from "./data/files";

import { Table } from "./components/Table/Table";

function App() {
  const columns = [
    { key: "name", header: "Name" },
    { key: "device", header: "Device" },
    { key: "path", header: "Path" },
    { key: "status", header: "Status" },
  ];

  return (
    <Table data={files} columns={columns} keyExtractor={(file) => file.path} />
  );
}

export default App;
