import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { Shortcut } from "../types";
import { Stack } from "@mui/system";
import storage from "../chrome/storage";
import Switch from "./common/Switch";

const ShortcutItem: React.FC<{ shortcut: Shortcut }> = ({ shortcut }) => {
  const { prefix, command, text, enabled } = shortcut;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const listItems = [
    {
      label: enabled ? "Disable" : "Enable",
      icon: <Switch />,
      onClick: () => {},
    },
    {
      label: "Edit",
      icon: <EditIcon />,
      onClick: () => {
        handleClose();
      },
    },
    {
      label: "Delete",
      icon: <DeleteIcon />,
      onClick: () => {
        storage.deleteShortcut(prefix, command);
        handleClose();
      },
    },
  ];
  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={handleClick} edge="end">
          <MenuIcon />
        </IconButton>
      }
    >
      <ListItemText>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Tooltip
            arrow
            placement="top"
            title={
              <Typography>
                {prefix}
                {command}
              </Typography>
            }
          >
            <Typography
              sx={{
                width: "30%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                bgcolor: "grey.300",
                p: "4px 8px",
                borderRadius: "8px",
                textAlign: "center",
                fontFamily: "monospace",
              }}
              fontWeight={500}
            >
              {prefix}
              {command}
            </Typography>
          </Tooltip>
          <Tooltip
            arrow
            placement="top"
            title={<Typography>{text}</Typography>}
          >
            <Typography
              sx={{
                width: "70%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              variant="caption"
            >
              {text}
            </Typography>
          </Tooltip>
        </Stack>
      </ListItemText>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ minWidth: "300px" }}
      >
        {listItems.map(({ icon, onClick, label }) => (
          <MenuItem key={label} sx={{ minWidth: "150px" }} onClick={onClick}>
            <ListItemIcon sx={{ width: "40px" }}>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </ListItem>
  );
};

export default ShortcutItem;
