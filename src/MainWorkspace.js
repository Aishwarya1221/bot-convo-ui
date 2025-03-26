import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Typography, Button, Dialog, DialogTitle, DialogContent, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Search, Chat, Terminal, Settings } from "@mui/icons-material";
import AICopilot from "./AICopilot";
import { mockIncidents } from "./mockIncidents"; // Mock incident data
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
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Sidebar */}
      <aside style={{
        width: "250px",
        backgroundColor: "#b71c1c",
        padding: "20px",
        color: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        overflowY: "auto",
        boxShadow: "2px 0 5px rgba(0,0,0,0.2)"
      }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>IPE Console</Typography>
        <nav style={{ marginTop: "20px" }}>
          <Button startIcon={<Search />} fullWidth style={{ color: "#FFD700", justifyContent: "flex-start" }} onClick={() => navigate("/")}>
            Search Incidents
          </Button>
          <Button startIcon={<Chat />} fullWidth style={{ color: "#fff", justifyContent: "flex-start" }} onClick={() => navigate("/ai-copilot")}>
            AI Copilot
          </Button>
          <Button startIcon={<Terminal />} fullWidth style={{ color: "#fff", justifyContent: "flex-start" }} onClick={() => navigate("/automations")}>
            Automations
          </Button>
          <Button startIcon={<Settings />} fullWidth style={{ color: "#fff", justifyContent: "flex-start" }} onClick={() => navigate("/settings")}>
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", marginLeft: "250px", overflowY: "auto", height: "100vh" }}>
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
