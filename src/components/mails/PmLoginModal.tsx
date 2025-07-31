import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

interface PmLoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export const PmLoginModal: React.FC<PmLoginModalProps> = ({ open, onClose, onSuccess }) => {
  const [step, setStep] = useState<"login" | "otp">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_API_ORIGIN = process.env.BACKEND_API_ORIGIN || "http://localhost:8000";

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_API_ORIGIN}/company/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");
      if (data.status === "need_otp") {
        setSessionId(data.session_id);
        setStep("otp");
      } else {
        onSuccess(data);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtp = async () => {
    if (!sessionId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_API_ORIGIN}/company/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "OTP submission failed");
      onSuccess(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setStep("login");
      setUsername("");
      setPassword("");
      setOtp("");
      setSessionId(null);
      setError(null);
      setLoading(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{step === "login" ? "Signin VeSync PM" : "Enter OTP"}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {step === "login" ? (
          <>
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
          </>
        ) : (
          <TextField
            label="OTP Code"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        {step === "login" ? (
          <Button onClick={handleLogin} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Login"}
          </Button>
        ) : (
          <Button onClick={handleOtp} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Submit OTP"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
