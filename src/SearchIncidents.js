import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Pagination } from "@mui/material";
import mockIncidents from "./incidents.json"; // Import mock incident data

export default function SearchIncidents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const incidentsPerPage = 10;

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

  return (
    <div style={{ padding: "20px" }}>
      <Card style={{ marginBottom: "20px", padding: "10px" }}>
        <TextField
          fullWidth
          label="Search Incidents"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#b71c1c" }}>
              <TableCell style={{ color: "#FFD700", fontWeight: "bold" }}>ID</TableCell>
              <TableCell style={{ color: "#FFD700", fontWeight: "bold" }}>Title</TableCell>
              <TableCell style={{ color: "#FFD700", fontWeight: "bold" }}>Status</TableCell>
              <TableCell style={{ color: "#FFD700", fontWeight: "bold" }}>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentIncidents.map((incident) => (
              <TableRow 
                key={incident.id} 
                style={{ cursor: "pointer" }} 
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

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          count={Math.ceil(filteredIncidents.length / incidentsPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </div>
    </div>
  );
}
