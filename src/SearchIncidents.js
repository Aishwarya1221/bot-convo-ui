import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import mockIncidents from "./incidents.json"; // Import mock incident data

export default function SearchIncidents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
  const [selectedComponent, setSelectedComponent] = useState(""); // State for dropdown
  const incidentsPerPage = 5;

  useEffect(() => {
    setIncidents(mockIncidents); // Load mock data
  }, []);

  const filteredIncidents = incidents.filter((incident) =>
    incident.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastIncident = currentPage * incidentsPerPage;
  const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;
  const currentIncidents = filteredIncidents.slice(indexOfFirstIncident, indexOfLastIncident);

  const handleIncidentClick = (incidentId) => {
    window.location.href = `/incident?id=${incidentId}`;
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Open menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close menu
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logout clicked");
    handleMenuClose();

    // Show loading indicator
    const loadingElement = document.createElement("div");
    loadingElement.textContent = "Logging out...";
    loadingElement.style.position = "fixed";
    loadingElement.style.top = "50%";
    loadingElement.style.left = "50%";
    loadingElement.style.transform = "translate(-50%, -50%)";
    loadingElement.style.backgroundColor = "#fff";
    loadingElement.style.padding = "20px";
    loadingElement.style.borderRadius = "8px";
    loadingElement.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
    document.body.appendChild(loadingElement);

    // Simulate logout process
    setTimeout(() => {
      document.body.removeChild(loadingElement);
      window.location.href = "/"; // Redirect to LoginPage
    }, 1000);
  };

  return (
    <Box sx={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "rgb(183, 28, 28)" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={(event) => setAnchorEl(event.currentTarget)} // Open menu on click
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Incident Management
          </Typography>
          <Avatar
            sx={{ bgcolor: "#ffffff", color: "rgb(183, 28, 28)", cursor: "pointer" }}
            onClick={handleAvatarClick}
          >
            LC
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem onClick={() => console.log("Profile clicked")}>Profile</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ padding: "20px" }}>
        <Grid container spacing={3}>
                <Grid item xs={12}>
                <Card sx={{ padding: "20px", boxShadow: 3, borderRadius: "12px" }}>
                  <FormControl fullWidth>
                  <InputLabel id="component-select-label">Select Component</InputLabel>
                  <Select
                    labelId="component-select-label"
                    value={selectedComponent}
                    onChange={(e) => setSelectedComponent(e.target.value)}
                    label="Select Component"
                    sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                    }}
                  >
                    <MenuItem value="CCDCSN">CCDCSN</MenuItem>
                    <MenuItem value="CCAP" disabled>
                    CCAP
                    </MenuItem>
                    <MenuItem value="CCADMIN" disabled>
                    CCADMIN
                    </MenuItem>
                  </Select>
                  </FormControl>
                </Card>
                </Grid>

                {/* Search Bar */}
          <Grid item xs={12}>
            <Card sx={{ padding: "20px", boxShadow: 3, borderRadius: "12px" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SearchIcon sx={{ marginRight: "10px", color: "#757575" }} />
                <TextField
                  fullWidth
                  label="Search Incidents"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ boxShadow: 3, borderRadius: "12px" }}>
              <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "rgb(249, 42, 6)" }}>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>ID</TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>Title</TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>Status</TableCell>
                      <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>Priority</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentIncidents.map((incident) => (
                      <TableRow
                        key={incident.id}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { backgroundColor: "#f9f9f9", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" },
                          transition: "background-color 0.3s, box-shadow 0.3s",
                        }}
                        onClick={() => handleIncidentClick(incident.id)}
                      >
                        <TableCell>{incident.id}</TableCell>
                        <TableCell>{incident.title}</TableCell>
                        <TableCell>{incident.status}</TableCell>
                        <TableCell>{incident.priority}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          {/* Pagination */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <Pagination
                count={Math.ceil(filteredIncidents.length / incidentsPerPage)}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
