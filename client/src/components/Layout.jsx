import { DarkMode, Favorite, HealthAndSafety, LightMode, Translate } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { Outlet, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, toggleMode } from '../store/preferencesSlice.js';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-semibold transition ${isActive ? 'bg-white/20 text-white' : 'text-white/85 hover:text-white hover:bg-white/10'}`;

export default function Layout() {
  const dispatch = useDispatch();
  const { mode, language } = useSelector((state) => state.preferences);

  return (
    <Box className="min-h-screen bg-medical-50 text-slate-900 transition dark:bg-[#071922] dark:text-slate-100">
      <AppBar position="sticky" elevation={0} color="primary" sx={{ backdropFilter: 'blur(16px)' }}>
        <Toolbar className="gap-3">
          <HealthAndSafety />
          <Typography variant="h6" className="flex-1 font-extrabold">
            GovCare Locator
          </Typography>
          <Box className="hidden gap-1 md:flex">
            <NavLink className={navLinkClass} to="/">
              Home
            </NavLink>
            <NavLink className={navLinkClass} to="/hospitals">
              Hospitals
            </NavLink>
            <NavLink className={navLinkClass} to="/favorites">
              Favorites
            </NavLink>
            <NavLink className={navLinkClass} to="/admin">
              Admin
            </NavLink>
          </Box>
          <Select
            size="small"
            value={language}
            onChange={(event) => dispatch(setLanguage(event.target.value))}
            sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.35)' } }}
            IconComponent={Translate}
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="hi">HI</MenuItem>
            <MenuItem value="te">TE</MenuItem>
          </Select>
          <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
            <IconButton color="inherit" onClick={() => dispatch(toggleMode())}>
              {mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Box className="flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
          <Button color="inherit" component={NavLink} to="/hospitals" startIcon={<HealthAndSafety />}>
            Hospitals
          </Button>
          <Button color="inherit" component={NavLink} to="/favorites" startIcon={<Favorite />}>
            Saved
          </Button>
          <Button color="inherit" component={NavLink} to="/admin">
            Admin
          </Button>
        </Box>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        <Outlet />
      </Container>
    </Box>
  );
}
