import { JSX } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import DownloadIcon from '@mui/icons-material/Download';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Sidebar = (): JSX.Element => (
  <Drawer variant="permanent" sx={{ width: 200, maxWidth: 250, height: '100vh' }}>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
    />
    <Paper elevation={1} sx={{ width: 200, height: '100%'}}>
      <List component="nav">
        <ListItem key={`sidebar_item_0`} component="div" disablePadding>
          <ListItemButton alignItems="center" sx={{ height: 60 }}>
            <ListItemIcon sx={{ minWidth: 45 }}>
              <DownloadIcon />
            </ListItemIcon>
            <ListItemText primary="Downloads" />
          </ListItemButton>
        </ListItem>
        <ListItem key={`sidebar_item_0`} component="div" disablePadding>
          <ListItemButton alignItems="center" sx={{ height: 60 }}>
            <ListItemIcon sx={{ minWidth: 45 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  </Drawer>
);

export default Sidebar;
