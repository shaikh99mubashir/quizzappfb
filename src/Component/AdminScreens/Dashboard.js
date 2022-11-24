import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const auth = getAuth();
  // const navigate = useNavigate();
  const signoutUser = () => {
    signOut(auth)
      .then((success) => {
        navigate('/')
        // alert(success)
      })
      .catch((error) => {
        alert("error");
      });
  }; 
  const settings = [
    { name: "Home", route: "/admin" },
    { name: "User Data", route: "/admin/userdata" },
    { name: "Student Info", route: "/admin/studentinfo" },
    { name: "Add Quiz", route: "/admin/addquiz" },
    { name: "Quiz Data", route: "/admin/quizdata" },
    { name: "Create Course", route: "/admin/course" },
    { name: "Course Quiz", route: "/admin/coursequiz" },
    { name: "Course Quiz Data", route: "/admin/coursequizdata" },
    { name: "Create Result", route: "/admin/createresult" },
    { name: "Add Countries", route: "/admin/addcountries" },
    { name: "Add Cities", route: "/admin/addcities" },
    { name: "Form Control", route: "/admin/formcontrol" },
    { name: "Form Control Data", route: "/admin/formcontroldata" },
    { name: "Trainer Registraation Data", route: "/admin/trainerdata" },
  ];
  return (
    <Box sx={{ display: "flex" ,padding:'none',}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{padding:'none',}}>
        <Toolbar sx={{ justifyContent: "space-between",padding:'none' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none",padding:'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white" }} onClick={signoutUser}>
              signOut
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          padding:'none',
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {settings.map((text, index) => (
            <Link
            key={index}
              to={text.route}
              style={{ textDecoration: "none", color: "black" }}
            > 
              <ListItem
                onClick={() => setOpen(false)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader>
          
        </DrawerHeader>
      </Main>
    </Box>
  );
}
