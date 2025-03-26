import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Typography, Button, Dialog, DialogTitle, DialogContent, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Drawer, AppBar, Toolbar, CssBaseline, List, ListItem, ListItemText } from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
import { Search, Chat, Terminal, Settings } from "@mui/icons-material";
import AICopilot from "./AICopilot";
import mockIncidents from "./incidents.json"; // Mock incident data
import SummarizeRCA from "./SummarizeRCA"
import HealthCheck from "./HealthCheck";

export default function MainWorkspace() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const incidentId = searchParams.get("id");
  const [incident, setIncident] = useState(null);
  const [relatedIncidents, setRelatedIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const foundIncident = mockIncidents.find((inc) => inc.id === incidentId);
    setIncident(foundIncident);
  }, [incidentId]);

  const fetchRelatedIncidents = async () => {
    setLoading(true);
    setOpenModal(true);

    try {
      const response = await fetch("http://localhost:5000/get_related_incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incident.title)
      });

      const data = await response.json();
      setRelatedIncidents(data.related_incidents);
    } catch (error) {
      console.error("Error fetching related incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!incident) {
    return <Typography variant="h6" style={{ textAlign: "center", marginTop: "50px" }}>Incident not found.</Typography>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <CssBaseline />
      {/* Top Navigation Bar */}
      <AppBar position="sticky" style={{ backgroundColor: "#b71c1c" }}>
        <Toolbar>
          {/* Hamburger Menu Icon */}
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)} aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Incident Management
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer (hidden initially, can be toggled via hamburger icon) */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List style={{ width: "250px" }}>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemText primary="Search Incidents" />
          </ListItem>
          <ListItem button onClick={() => navigate("/ai-copilot")}>
            <ListItemText primary="AI Copilot" />
          </ListItem>
          <ListItem button onClick={() => navigate("/automations")}>
            <ListItemText primary="Automations" />
          </ListItem>
          <ListItem button onClick={() => navigate("/settings")}>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {/* Incident Details */}
        <Card style={{ borderLeft: "5px solid #FFD700", marginBottom: "20px" }}>
          <CardHeader title={incident.title} />
          <CardContent>
            <Typography><strong>ID:</strong> {incident.id}</Typography>
            <Typography><strong>Status:</strong> {incident.status}</Typography>
            <Typography><strong>Priority:</strong> {incident.priority}</Typography>
            <Typography><strong>Description:</strong> {incident.description}</Typography>
          </CardContent>
        </Card>

        {/* AI Copilot & Automation */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {/* AI Chatbot */}
          <AICopilot />

          {/* Automations Panel */}
          <Card>
            <CardHeader title="Agentic Automations" />
            <CardContent>
              <Button fullWidth variant="contained" style={{ backgroundColor: "#FFD700", color: "#000", marginBottom: "10px" }}>
                <HealthCheck />
              </Button>
              <Button fullWidth variant="contained" style={{ backgroundColor: "#FFD700", color: "#000", marginBottom: "10px" }}>
                <SummarizeRCA incident={incident} />
              </Button>
              <Button fullWidth variant="contained" style={{ backgroundColor: "#FFD700", color: "#000" }} onClick={fetchRelatedIncidents}>
                Get Related Incidents
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Related Incidents Modal */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            Related Incidents
            <IconButton style={{ position: "absolute", right: 10, top: 10 }} onClick={() => setOpenModal(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {loading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <CircularProgress />
                <Typography>Fetching related incidents...</Typography>
              </div>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>ID</strong></TableCell>
                      <TableCell><strong>Title</strong></TableCell>
                      <TableCell><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {relatedIncidents.map((inc) => (
                      <TableRow key={inc.id}>
                        <TableCell>{inc.id}</TableCell>
                        <TableCell>{inc.body}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary" onClick={() => navigate(`/incident?id=${inc.id}`)}>
                            View Incident
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
