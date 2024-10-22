import { useState } from "react";
import { IconButton, MenuItem, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
interface Props {
  explorer: {
    id: string;
    name: string;
    isFolder: boolean;
    item: {
      id: string;
      name: string;
      isFolder: boolean;
      item: {
        id: string;
        name: string;
        isFolder: boolean;
        item: {
          id: string;
          name: string;
          isFolder: boolean;
        }[];
      }[];
    }[];
  };
  handleNode: (
    folderId: string,
    item: string,
    clickFrom: string,
    isFolder?: boolean
  ) => void;
}

const Folder = ({ explorer, handleNode }: Props) => {
  const [isExpand, setIsExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visibility: false,
    isFolder: false,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isEdit, setIsEdit] = useState(false);
  const handleClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleInputShow(
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    isFolder: boolean
  ) {
    e.stopPropagation();
    setIsExpand(true);
    setShowInput({
      visibility: true,
      isFolder,
    });
    handleClose();
  }

  function onAddFolder(
    event: React.KeyboardEvent<HTMLInputElement>,
    folderId: string,
    isFolder: boolean
  ) {
    const target = event.target as HTMLInputElement;
    if (event.keyCode === 13 && target.value) {
      handleNode(folderId, target.value, "add", isFolder);
      setShowInput({
        ...showInput,
        visibility: false,
      });
    }
  }

  function onEditFolder(
    event: React.KeyboardEvent<HTMLInputElement>,
    folderId: string
  ) {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    if (event.keyCode === 13 && target.value) {
      handleNode(folderId, target.value, "edit");
      setIsEdit(false);
      setAnchorEl(null);
    }
  }

  const handleEditFieldShow = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  const FolderOptions = () => {
    return (
      <span>
        <IconButton onClick={(e) => handleClick(e)}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {explorer?.isFolder ? (
            <>
              <MenuItem onClick={(e) => handleInputShow(e, true)}>
                Folder +
              </MenuItem>
              <MenuItem onClick={(e) => handleInputShow(e, false)}>
                File +
              </MenuItem>
            </>
          ) : null}
          <MenuItem onClick={(e) => handleEditFieldShow(e)}>Rename</MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleNode(explorer.id, "", "delete");
              setAnchorEl(null);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </span>
    );
  };

  if (explorer?.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setIsExpand(!isExpand)}>
          {isEdit ? (
            <input
              onKeyDown={(e) => onEditFolder(e, explorer?.id)}
              onBlur={(e) => {
                e.stopPropagation();
                setIsEdit(false);
              }}
              type="text"
              defaultValue={explorer.name}
              autoFocus
            />
          ) : (
            <>
              <span>📁 {explorer?.name}</span>
              <FolderOptions />
            </>
          )}
        </div>
        {showInput?.visibility ? (
          <div className="addFile">
            <span> {showInput?.isFolder ? "📁" : "📄"} </span>
            <span>
              <input
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  onAddFolder(e, explorer?.id, showInput?.isFolder)
                }
                type="text"
                autoFocus
              />
            </span>
          </div>
        ) : null}

        <div
          style={{ display: isExpand ? "block" : "none", marginLeft: "42px" }}
        >
          {explorer?.item?.map((exp: any, i) => (
            <Folder key={i} explorer={exp} handleNode={handleNode} />
          ))}
        </div>
      </div>
    );
  } else if (explorer?.id) {
    return (
      <div className="file">
        {isEdit ? (
          <input
            onKeyDown={(e) => onEditFolder(e, explorer?.id)}
            onBlur={(e) => {
              e.stopPropagation();
              setIsEdit(false);
            }}
            type="text"
            defaultValue={explorer.name}
            autoFocus
          />
        ) : (
          <>
            <span>📄 {explorer?.name}</span>
            <FolderOptions />
          </>
        )}
      </div>
    );
  }
};

export default Folder;
