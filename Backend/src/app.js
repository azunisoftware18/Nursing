import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import collegeRoutes from "./routes/college.route.js";
import courseRoutes from "./routes/course.route.js";
import blogRoutes from "./routes/blog.route.js";
import path from "path";
import leadRoutes from "./routes/lead.route.js";
import auditRoutes from "./routes/audit.routes.js";
import indiaRoutes from "./routes/india.routes.js";
import dashboardRoutes from "./routes/dashboard.route.js";


// import indexRoutes from './routes/index.js';

const app = express();

// HEALTH
app.get('/v1/health', (req, res) => {
  res.status(200).send('OK');
});

// ---------- MIDDLEWARE ----------
app.use(cors({ origin: true, credentials: true }));
app.set('trust proxy', 1);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false, 
  })
);


//    API
// app.use('/v1', indexRoutes);
app.use('/v1/auth', authRoutes); 
app.use('/v1/user', userRoutes); 
app.use("/v1/college", collegeRoutes);
app.use("/v1/course", courseRoutes);
app.use("/v1/blog", blogRoutes);
app.use("/v1/leads", leadRoutes);
app.use("/v1/audit-logs", auditRoutes);
app.use("/v1/college/india", indiaRoutes);
app.use("/v1/dashboard", dashboardRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "/uploads")));


export default app;