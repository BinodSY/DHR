import supabase from "../services/supabaseClient.js";
import DoctorModel from "../models/doctorModel.js";

/**
 * Doctor Authentication Controller
 * Handles doctor login and profile operations
 */

/**
 * Doctor login
 * POST /api/doctor/login
 * Body: { doctor_id, password }
 */
export const loginDoctor = async (req, res) => {
    try {
        const { doctor_id, password } = req.body;

        // Validate input
        if (!doctor_id || !password) {
            return res.status(400).json({
                error: "Doctor ID and password are required"
            });
        }

        // Get doctor by doctor_id
        const doctor = await DoctorModel.getByDoctorId(supabase, doctor_id);

        if (!doctor) {
            return res.status(404).json({
                error: "Doctor not found"
            });
        }

        // In a real application, you would verify the password hash here
        // For now, we'll do a simple comparison (NOT SECURE - implement proper hashing)
        if (doctor.password_hash !== password) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        // Check if doctor is verified
        if (!doctor.is_verified || doctor.verification_status !== 'verified') {
            return res.status(403).json({
                error: "Doctor account is not verified"
            });
        }

        // Update last login
        await DoctorModel.updateLastLogin(supabase, doctor.id);

        // Remove password from response
        delete doctor.password_hash;

        res.json({
            success: true,
            message: "Login successful",
            doctor: doctor
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get doctor profile
 * GET /api/doctor/profile/:doctorId
 */
export const getDoctorProfile = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const doctor = await DoctorModel.getById(supabase, doctorId);

        if (!doctor) {
            return res.status(404).json({
                error: "Doctor not found"
            });
        }

        // Remove sensitive information
        delete doctor.password_hash;

        res.json({
            success: true,
            doctor: doctor
        });

    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Update doctor profile
 * PUT /api/doctor/profile/:doctorId
 * Body: { name, email, phone, specialization, etc. }
 */
export const updateDoctorProfile = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const updates = req.body;

        // Don't allow updating certain fields
        delete updates.id;
        delete updates.doctor_id;
        delete updates.password_hash;
        delete updates.is_verified;
        delete updates.verification_status;
        delete updates.created_at;

        const updatedDoctor = await DoctorModel.update(supabase, doctorId, updates);

        // Remove sensitive information
        delete updatedDoctor.password_hash;

        res.json({
            success: true,
            message: "Profile updated successfully",
            doctor: updatedDoctor
        });

    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get doctor statistics
 * GET /api/doctor/:doctorId/stats
 */
export const getDoctorStats = async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Get total patients treated
        const { data: patients, error: patientsError } = await supabase
            .from('medical_records')
            .select('patient_id', { count: 'exact' })
            .eq('doctor_id', doctorId);

        // Get total appointments
        const { count: appointmentsCount, error: appointmentsError } = await supabase
            .from('appointments')
            .select('*', { count: 'exact', head: true })
            .eq('doctor_id', doctorId);

        // Get total prescriptions
        const { count: prescriptionsCount, error: prescriptionsError } = await supabase
            .from('prescriptions')
            .select('*', { count: 'exact', head: true })
            .eq('doctor_id', doctorId);

        // Get upcoming appointments
        const now = new Date().toISOString();
        const { count: upcomingCount, error: upcomingError } = await supabase
            .from('appointments')
            .select('*', { count: 'exact', head: true })
            .eq('doctor_id', doctorId)
            .eq('status', 'scheduled')
            .gte('appointment_date', now);

        if (patientsError || appointmentsError || prescriptionsError || upcomingError) {
            throw new Error("Error fetching statistics");
        }

        // Get unique patient count
        const uniquePatients = [...new Set(patients?.map(p => p.patient_id) || [])].length;

        res.json({
            success: true,
            stats: {
                total_patients: uniquePatients,
                total_appointments: appointmentsCount || 0,
                total_prescriptions: prescriptionsCount || 0,
                upcoming_appointments: upcomingCount || 0
            }
        });

    } catch (error) {
        console.error("Get stats error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};
