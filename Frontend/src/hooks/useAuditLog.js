import { useEffect, useState } from "react";
import api from "../lib/axios.config";

export const useAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuditLogs = async () => {
    try {
      const res = await api.get("/audit-logs");
      setLogs(res.data.data);
    } catch (err) {
      setError("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  return { logs, loading, error };
};
