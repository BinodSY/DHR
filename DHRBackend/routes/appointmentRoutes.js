import express from "express";
import {
    createAppointment,
    getPatientAppointments,
    getDoctorAppointments,
    getUpcomingAppointments,
    getAppointmentById,
    updateAppointment,
    cancelAppointment,
    completeAppointment,
    markReminderSent,
    getAppointmentsByDateRange
} from "../controllers/appointmentController.js";

const router = express.Router();

/**
 * Appointment Routes
 * Base path: /api/appointment
 */

// Create appointment
router.post("/", createAppointment);

// Get appointment by ID
router.get("/:appointmentId", getAppointmentById);

// Get patient appointments
router.get("/patient/:patientId", getPatientAppointments);

// Get doctor appointments
router.get("/doctor/:doctorId", getDoctorAppointments);

// Get upcoming appointments for a doctor
router.get("/doctor/:doctorId/upcoming", getUpcomingAppointments);

// Get appointments by date range
router.post("/doctor/:doctorId/date-range", getAppointmentsByDateRange);

// Update appointment
router.put("/:appointmentId", updateAppointment);

// Cancel appointment
router.post("/:appointmentId/cancel", cancelAppointment);

// Complete appointment
router.post("/:appointmentId/complete", completeAppointment);

// Mark reminder as sent
router.post("/:appointmentId/reminder-sent", markReminderSent);

export default router;
