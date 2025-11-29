import supabase from "../services/supabaseClient.js";
import AppointmentModel from "../models/appointmentModel.js";

/**
 * Appointment Controller
 * Handles appointment scheduling and management
 */

/**
 * Create new appointment
 * POST /api/appointment
 * Body: { patient_id, doctor_id, appointment_date, appointment_type, reason, etc. }
 */
export const createAppointment = async (req, res) => {
    try {
        const appointmentData = req.body;

        // Validate required fields
        if (!appointmentData.patient_id || !appointmentData.doctor_id || !appointmentData.appointment_date) {
            return res.status(400).json({
                error: "Patient ID, Doctor ID, and Appointment Date are required"
            });
        }

        const appointment = await AppointmentModel.create(supabase, appointmentData);

        res.status(201).json({
            success: true,
            message: "Appointment scheduled successfully",
            appointment: appointment
        });

    } catch (error) {
        console.error("Create appointment error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get appointments for a patient
 * GET /api/appointment/patient/:patientId
 */
export const getPatientAppointments = async (req, res) => {
    try {
        const { patientId } = req.params;

        const appointments = await AppointmentModel.getByPatientId(supabase, patientId);

        res.json({
            success: true,
            count: appointments.length,
            appointments: appointments
        });

    } catch (error) {
        console.error("Get patient appointments error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get appointments for a doctor
 * GET /api/appointment/doctor/:doctorId
 */
export const getDoctorAppointments = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const appointments = await AppointmentModel.getByDoctorId(supabase, doctorId);

        res.json({
            success: true,
            count: appointments.length,
            appointments: appointments
        });

    } catch (error) {
        console.error("Get doctor appointments error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get upcoming appointments for a doctor
 * GET /api/appointment/doctor/:doctorId/upcoming
 */
export const getUpcomingAppointments = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const appointments = await AppointmentModel.getUpcomingByDoctorId(supabase, doctorId);

        res.json({
            success: true,
            count: appointments.length,
            appointments: appointments
        });

    } catch (error) {
        console.error("Get upcoming appointments error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get appointment by ID
 * GET /api/appointment/:appointmentId
 */
export const getAppointmentById = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await AppointmentModel.getById(supabase, appointmentId);

        if (!appointment) {
            return res.status(404).json({
                error: "Appointment not found"
            });
        }

        res.json({
            success: true,
            appointment: appointment
        });

    } catch (error) {
        console.error("Get appointment error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Update appointment
 * PUT /api/appointment/:appointmentId
 * Body: { appointment_date, reason, notes, etc. }
 */
export const updateAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const updates = req.body;

        // Don't allow updating certain fields
        delete updates.id;
        delete updates.patient_id;
        delete updates.doctor_id;
        delete updates.created_at;
        delete updates.reminder_sent;
        delete updates.reminder_sent_at;

        const updatedAppointment = await AppointmentModel.update(supabase, appointmentId, updates);

        res.json({
            success: true,
            message: "Appointment updated successfully",
            appointment: updatedAppointment
        });

    } catch (error) {
        console.error("Update appointment error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Cancel appointment
 * POST /api/appointment/:appointmentId/cancel
 * Body: { reason, cancelled_by }
 */
export const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { reason, cancelled_by } = req.body;

        if (!reason) {
            return res.status(400).json({
                error: "Cancellation reason is required"
            });
        }

        const cancelledAppointment = await AppointmentModel.cancel(
            supabase,
            appointmentId,
            reason,
            cancelled_by || 'doctor'
        );

        res.json({
            success: true,
            message: "Appointment cancelled successfully",
            appointment: cancelledAppointment
        });

    } catch (error) {
        console.error("Cancel appointment error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Complete appointment
 * POST /api/appointment/:appointmentId/complete
 */
export const completeAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const completedAppointment = await AppointmentModel.complete(supabase, appointmentId);

        res.json({
            success: true,
            message: "Appointment marked as completed",
            appointment: completedAppointment
        });

    } catch (error) {
        console.error("Complete appointment error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Mark reminder as sent
 * POST /api/appointment/:appointmentId/reminder-sent
 */
export const markReminderSent = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const updatedAppointment = await AppointmentModel.markReminderSent(supabase, appointmentId);

        res.json({
            success: true,
            message: "Reminder marked as sent",
            appointment: updatedAppointment
        });

    } catch (error) {
        console.error("Mark reminder sent error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get appointments for a specific date range
 * POST /api/appointment/doctor/:doctorId/date-range
 * Body: { start_date, end_date }
 */
export const getAppointmentsByDateRange = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { start_date, end_date } = req.body;

        if (!start_date || !end_date) {
            return res.status(400).json({
                error: "Start date and end date are required"
            });
        }

        const { data: appointments, error } = await supabase
            .from('appointments')
            .select(`
        *,
        patient:patients(name, phone, age, gender)
      `)
            .eq('doctor_id', doctorId)
            .gte('appointment_date', start_date)
            .lte('appointment_date', end_date)
            .order('appointment_date', { ascending: true });

        if (error) throw error;

        res.json({
            success: true,
            count: appointments?.length || 0,
            appointments: appointments || []
        });

    } catch (error) {
        console.error("Get appointments by date range error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};
