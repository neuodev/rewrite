import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { Shortcut } from "../types";
import { Stack } from "@mui/system";

const ShortcutItem: React.FC<{ shortcut: Shortcut }> = ({ shortcut }) => {
  const { prefix, command, text } = shortcut;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Typography
            sx={{
              width: "25%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              bgcolor: "grey.300",
              p: "4px 8px",
              borderRadius: "8px",
              textAlign: "center",
            }}
            fontWeight={500}
          >
            {prefix}
            {command}
          </Typography>
          <Typography
            sx={{
              width: "75%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="caption"
          >
            {text}
          </Typography>
        </Stack>
      </ListItemText>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ minWidth: "300px" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ToggleOnIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Disable</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </ListItem>
  );
};

export default ShortcutItem;
