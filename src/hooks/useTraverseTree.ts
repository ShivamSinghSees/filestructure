export interface Tree {
  id: string;
  name: string;
  isFolder?: boolean;
  item: {
    id: string;
    name: string;
    isFolder?: boolean;
    item: {
      id: string;
      name: string;
      isFolder?: boolean;
      item: {
        id: string;
        name: string;
        isFolder?: boolean;
      }[];
    }[];
  }[];
}

interface Props {
  addFileOrFolder: (
    nodes: Tree,
    folderId: string,
    item: string,
    isFolder?: boolean
  ) => void;
  editFileOrFolderName: (nodes: Tree, folderId: string, item: string) => void;
  deleteFileOrFolder: (nodes: Tree, folderId: string) => void;
}
const useTraverseTree = (): Props => {
  function addFileOrFolder(
    tree: Tree,
    folderId: string,
    item: string,
    isFolder?: boolean
  ): Tree {
    if (folderId === tree.id && tree.isFolder) {
      tree.item.unshift({
        id: String(new Date().getTime()),
        name: item,
        isFolder,
        item: [],
      });
      return tree;
    }
    const newItem = tree?.item?.map((nodes: any) =>
      addFileOrFolder(nodes, folderId, item, isFolder)
    );
    return { ...tree, item: newItem };
  }
  function editFileOrFolderName(
    tree: Tree,
    folderId: string,
    item: string
  ): Tree {
    if (folderId === tree.id) {
      tree.name = item;
      return tree;
    }
    const newItem = tree?.item?.map((nodes: any) =>
      editFileOrFolderName(nodes, folderId, item)
    );
    return { ...tree, item: newItem };
  }

  function deleteFileOrFolder(tree: Tree, folderId: string): any {
    if (folderId === tree.id) {
      return {};
    }
    const newItem = tree?.item?.map((nodes: any) =>
      deleteFileOrFolder(nodes, folderId)
    );
    return { ...tree, item: newItem };
  }

  return { addFileOrFolder, editFileOrFolderName, deleteFileOrFolder };
};

export default useTraverseTree;
