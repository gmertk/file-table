import { files } from "./data/files";
import { FileTable } from "./containers/FileTable/FileTable";

function App() {
  return <FileTable files={files} />;
}

export default App;
