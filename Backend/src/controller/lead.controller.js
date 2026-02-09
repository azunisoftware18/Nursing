import { createLead, getLeads, deleteLead } from "../services/lead.service.js";
import { createAuditLog } from "../services/audit.service.js";

export const addLead = async (req, res) => {
  try {
    await createLead(req.body);

    await createAuditLog({
      action: "CREATE",
      module: "Lead",
      description: `Lead created: ${req.body.name || "Unknown"}`,
      userAgent: req.headers["user-agent"],
    });

    res.json({
      success: true,
      message: "Lead added successfully",
    });
  } catch (error) {
    console.error("ADD LEAD ERROR:", error);

    await createAuditLog({
      action: "FAILED_CREATE",
      module: "Lead",
      description: `Failed to create lead`,
      userAgent: req.headers["user-agent"],
    });

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const data = await getLeads();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeLead = async (req, res) => {
  try {
    await deleteLead(req.params.id);

    await createAuditLog({
      action: "DELETE",
      module: "Lead",
      description: `Lead deleted: ID ${req.params.id}`,
      userAgent: req.headers["user-agent"],
    });

    res.json({
      success: true,
      message: "Lead deleted",
    });
  } catch (error) {
    console.error("DELETE LEAD ERROR:", error);

    await createAuditLog({
      action: "FAILED_DELETE",
      module: "Lead",
      description: `Failed to delete lead ID: ${req.params.id}`,
      userAgent: req.headers["user-agent"],
    });

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
