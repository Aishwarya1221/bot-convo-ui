import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Typography, Button } from "@mui/material";
import { Search, Chat, Terminal, Settings } from "@mui/icons-material";
import AICopilot from "./AICopilot";
import { mockIncidents } from "./mockIncidents"; // Mock incident data
import IncidentDetails from "./IncidentDetails";

export default function MainWorkspace() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const incidentId = searchParams.get("id"); // Get incident ID from URL
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    // Fetch the selected incident based on the ID
    const foundIncident = mockIncidents.find((inc) => inc.id === incidentId);
    setIncident(foundIncident);
  }, [incidentId]);

  if (!incident) {
    return <Typography variant="h6" style={{ textAlign: "center", marginTop: "50px" }}>Incident not found.</Typography>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Sidebar (Fixed) */}
      <aside style={{
        width: "200px",
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

      {/* Main Content (Scrollable) */}
      <div style={{ flex: 1, padding: "20px", marginLeft: "250px", overflowY: "auto", height: "100vh" }}>
        {/* Incident Details */}
        <Card style={{ borderLeft: "5px solid #FFD700", marginBottom: "20px" }}>
          <CardHeader title={incident.title} />
          <CardContent>
            <Typography><strong>Status:</strong> {incident.status}</Typography>
            <Typography><strong>Priority:</strong> {incident.priority}</Typography>
            <Typography><strong>Description:</strong> {incident.description}</Typography>
          </CardContent>
        </Card>

        {/* <IncidentDetails/> */}

        {/* AI Copilot & Automation */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {/* AI Chatbot Panel */}
          <AICopilot />

          {/* Automations Panel */}
          <Card>
            <CardHeader title="Agentic Automations" />
            <CardContent>
              <Button fullWidth variant="contained" style={{ backgroundColor: "#FFD700", color: "#000", marginBottom: "10px" }}>
                Run Health Check
              </Button>
              <Button fullWidth variant="contained" style={{ backgroundColor: "#FFD700", color: "#000" }}>
                Summarize RCA
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}