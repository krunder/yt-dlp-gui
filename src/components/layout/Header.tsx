import { Theme } from '@mui/material';
import { JSX } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = (): JSX.Element => (
  <AppBar position="absolute" elevation={1} sx={{
    zIndex: (theme: Theme): number => theme.zIndex.drawer + 1,
  }}>
    <Toolbar sx={{ pr: '24px' }}>
      {/*<IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>*/}
      {/*  <MenuIcon />*/}
      {/*</IconButton>*/}

      <Typography variant="h6" sx={{ mr: 2 }}>YT-DLP Download Manager</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
