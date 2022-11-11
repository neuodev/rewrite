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
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { Shortcut } from "../types";
import { Stack } from "@mui/system";
import Switch from "./common/Switch";
import { useShortcut } from "../state/shortcuts/hooks";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";

const ShortcutItem: React.FC<{ shortcut: Shortcut }> = ({ shortcut }) => {
  const { deleteShortcut, toggleShortcut } = useShortcut();
  const navigate = useNavigate();
  const { prefix, command, text, enabled, id } = shortcut;
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
      label: "Edit",
      icon: <EditIcon />,
      onClick: () => {
        console.log({ id });
        navigate(`${ROUTES.NEW_SHORTCUT}?id=${id}`);
        handleClose();
      },
    },
    {
      label: "Delete",
      icon: <DeleteIcon />,
      onClick: () => {
        deleteShortcut(id);
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
            followCursor
            title={
              <Typography sx={{ fontFamily: "monospace" }}>
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
            followCursor
            title={<Typography>{text}</Typography>}
          >
            <Typography
              sx={{
                width: "70%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              variant="subtitle2"
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
        <MenuItem sx={{ minWidth: "180px" }}>
          <FormControlLabel
            sx={{ px: "12px" }}
            value={enabled}
            control={
              <Switch
                color="primary"
                onChange={() => toggleShortcut(id, !enabled)}
                checked={enabled}
              />
            }
            label={
              <Typography sx={{ ml: "12px" }}>
                {" "}
                {enabled ? "Enabled" : "Disabled"}{" "}
              </Typography>
            }
            labelPlacement="end"
          />
        </MenuItem>
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
