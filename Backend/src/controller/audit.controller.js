import { db } from "../database/db.js";
import { auditLogsTable } from "../models/auditLog.schema.js";

export const getAuditLogs = async (req, res) => {
  const logs = await db
    .select()
    .from(auditLogsTable)
    .orderBy(auditLogsTable.createdAt);

  res.json({
    success: true,
    data: logs,
  });
};
