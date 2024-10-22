import { useState } from "react";
import "./App.css";
import explorer from "./data/folder";
import Folder from "./component/Folder";
import useTraverseTree, { Tree } from "./hooks/useTraverseTree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { addFileOrFolder, editFileOrFolderName, deleteFileOrFolder } =
    useTraverseTree();

  const handleNode = (
    folderId: string,
    item: string,
    clickFrom: string,
    isFolder?: boolean
  ) => {
    let newTree: any;
    if (clickFrom === "add") {
      newTree = addFileOrFolder(explorerData, folderId, item, isFolder);
    }
    if (clickFrom === "edit") {
      newTree = editFileOrFolderName(explorerData, folderId, item);
    }
    if (clickFrom === "delete") {
      newTree = deleteFileOrFolder(explorerData, folderId);
    }
    setExplorerData(newTree);
  };
  return (
    <>
      <Folder explorer={explorerData} handleNode={handleNode} />
    </>
  );
}

export default App;
