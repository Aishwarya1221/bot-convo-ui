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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import mockIncidents from "./incidents.json"; // Import mock incident data

export default function SearchIncidents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const incidentsPerPage = 10;

  useEffect(() => {
    setIncidents(mockIncidents); // Load mock data
  }, []);

  // Filtering logic to only show incidents with ID starting with 'INC-1'
  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.id.toLowerCase().startsWith("inc-1") &&
      incident.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastIncident = currentPage * incidentsPerPage;
  const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;
  const currentIncidents = filteredIncidents.slice(indexOfFirstIncident, indexOfLastIncident);

  const handleIncidentClick = (incidentId) => {
    window.location.href = `/incident?id=${incidentId}`;
  };

  return (
    <Box sx={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "rgb(183, 28, 28)" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Incident Management
          </Typography>
          <a color="inherit">Welcome Back, Lakshay Chandra</a>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ padding: "20px" }}>
        <Grid container spacing={3}>
          {/* Search Bar */}
          <Grid item xs={12}>
            <Card sx={{ padding: "20px", boxShadow: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SearchIcon sx={{ marginRight: "10px", color: "#757575" }} />
                <TextField
                  fullWidth
                  label="Search Incidents"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>
            </Card>
          </Grid>

          {/* Incident Table */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 3 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "rgb(183, 28, 28)" }}>
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
                          "&:hover": { backgroundColor: "#f0f0f0" },
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
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
