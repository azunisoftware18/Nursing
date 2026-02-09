import { db } from "../database/db.js";
import { auditLogsTable } from "../models/auditLog.schema.js";

export const createAuditLog = async ({
  action,
  module,
  description,
  userAgent,
}) => {
  try {
    await db.insert(auditLogsTable).values({
      action,
      module,
      description,
      userAgent,
    });
  } catch (error) {
    console.error("Audit Log Error:", error.message);
  }
};
