import { useMemo, useState } from "react";
import styled from "styled-components";
import { Column, Table } from "../../components/Table/Table";
import { Checkbox } from "../../components/Checkbox/Checkbox";

export type FileStatus = "available" | "scheduled";

export type FileData = {
  name: string;
  device: string;
  path: string;
  status: FileStatus;
};

export type FileTableProps = {
  files: FileData[];
};

export const FileTable = ({ files }: FileTableProps) => {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const availableFiles = useMemo(
    () => files.filter((file) => file.status === "available"),
    [files]
  );

  const handleSelectAll = () => {
    if (selectedFiles.size === availableFiles.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(availableFiles.map((file) => file.path)));
    }
  };

  const getSelectAllCheckboxState = () => {
    if (selectedFiles.size === 0) return false;
    if (selectedFiles.size === files.length) return true;
    return "indeterminate";
  };

  const handleDownload = () => {
    const selectedFileDetails = files
      .filter((file) => selectedFiles.has(file.path))
      .map((file) => `${file.device}: ${file.path}`)
      .join("\n");
    alert(selectedFileDetails);
  };

  const columns: Column<FileData>[] = [
    { key: "name", header: "Name" },
    { key: "device", header: "Device" },
    { key: "path", header: "Path" },
    { key: "status", header: "Status" },
  ];

  return (
    <div>
      <TableControls>
        <Checkbox
          checked={getSelectAllCheckboxState() === true}
          indeterminate={getSelectAllCheckboxState() === "indeterminate"}
          onChange={handleSelectAll}
          label={
            selectedFiles.size === 0
              ? "None Selected"
              : `Selected ${selectedFiles.size}`
          }
          aria-label={
            selectedFiles.size === 0
              ? "Select all available files"
              : selectedFiles.size === availableFiles.length
              ? "Deselect all files"
              : "Select all available files"
          }
        />
        <button
          disabled={selectedFiles.size === 0}
          onClick={handleDownload}
          aria-label={`Download ${selectedFiles.size} selected files`}
        >
          Download Selected
        </button>
      </TableControls>

      <Table
        data={files}
        columns={columns}
        keyExtractor={(file) => file.path}
        selectedRows={selectedFiles}
        onSelectionChange={setSelectedFiles}
        isRowSelectable={(file) => file.status === "available"}
      />
    </div>
  );
};

const TableControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
`;
