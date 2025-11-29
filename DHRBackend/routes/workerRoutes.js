import express from "express";
import QRCode from "qrcode";
import supabase from "../services/supabaseClient.js";

import { createWorker,showHealthCard } from "../controllers/workerController.js";

const router = express.Router();
// POST /api/worker
// Body: { "health_id": "HID12345678" }

// BASE url:- /api/worker 


router.post("/", async (req, res) => {
  const { health_id } = req.body;

  // Validate request body
  if (!health_id) {
    return res.status(400).json({ error: "health_id is required" });
  }

  try {
    // Fetch worker from Supabase using health_id
    const { data: worker, error } = await supabase
      .from("workers")
      .select("*")
      .eq("health_id",health_id)
      .maybeSingle();

    console.log("Worker query result:", worker);
    console.log("Worker query error:", error);

    if (error || !worker) {
      return res.status(404).json({ error: "Worker not found" });
    }

    // Generate QR code (link to health ID)
    const qrCode = await QRCode.toDataURL(`health-id:${worker.health_id}`);

    res.json({ worker, qrCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//show health card /api/worker/health-card
router.post("/health-card",showHealthCard);

export default router;

