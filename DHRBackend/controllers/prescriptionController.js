import supabase from "../services/supabaseClient.js";
import PrescriptionModel from "../models/prescriptionModel.js";

/**
 * Prescription Controller
 * Handles prescription CRUD operations
 */

/**
 * Create new prescription
 * POST /api/prescription
 * Body: { patient_id, doctor_id, medical_record_id, medicine_name, dosage, frequency, duration, instructions }
 */
export const createPrescription = async (req, res) => {
    try {
        const prescriptionData = req.body;

        // Validate required fields
        if (!prescriptionData.patient_id || !prescriptionData.doctor_id || !prescriptionData.medicine_name) {
            return res.status(400).json({
                error: "Patient ID, Doctor ID, and Medicine Name are required"
            });
        }

        const prescription = await PrescriptionModel.create(supabase, prescriptionData);

        res.status(201).json({
            success: true,
            message: "Prescription created successfully",
            prescription: prescription
        });

    } catch (error) {
        console.error("Create prescription error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get prescriptions for a patient
 * GET /api/prescription/patient/:patientId
 */
export const getPatientPrescriptions = async (req, res) => {
    try {
        const { patientId } = req.params;

        const prescriptions = await PrescriptionModel.getByPatientId(supabase, patientId);

        res.json({
            success: true,
            count: prescriptions.length,
            prescriptions: prescriptions
        });

    } catch (error) {
        console.error("Get patient prescriptions error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get prescriptions for a medical record
 * GET /api/prescription/medical-record/:recordId
 */
export const getMedicalRecordPrescriptions = async (req, res) => {
    try {
        const { recordId } = req.params;

        const prescriptions = await PrescriptionModel.getByMedicalRecordId(supabase, recordId);

        res.json({
            success: true,
            count: prescriptions.length,
            prescriptions: prescriptions
        });

    } catch (error) {
        console.error("Get medical record prescriptions error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get prescription by ID
 * GET /api/prescription/:prescriptionId
 */
export const getPrescriptionById = async (req, res) => {
    try {
        const { prescriptionId } = req.params;

        const prescription = await PrescriptionModel.getById(supabase, prescriptionId);

        if (!prescription) {
            return res.status(404).json({
                error: "Prescription not found"
            });
        }

        res.json({
            success: true,
            prescription: prescription
        });

    } catch (error) {
        console.error("Get prescription error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Update prescription
 * PUT /api/prescription/:prescriptionId
 * Body: { medicine_name, dosage, frequency, duration, instructions, status }
 */
export const updatePrescription = async (req, res) => {
    try {
        const { prescriptionId } = req.params;
        const updates = req.body;

        // Don't allow updating certain fields
        delete updates.id;
        delete updates.patient_id;
        delete updates.doctor_id;
        delete updates.prescribed_date;
        delete updates.created_at;

        const updatedPrescription = await PrescriptionModel.update(supabase, prescriptionId, updates);

        res.json({
            success: true,
            message: "Prescription updated successfully",
            prescription: updatedPrescription
        });

    } catch (error) {
        console.error("Update prescription error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Delete prescription
 * DELETE /api/prescription/:prescriptionId
 */
export const deletePrescription = async (req, res) => {
    try {
        const { prescriptionId } = req.params;

        const deletedPrescription = await PrescriptionModel.delete(supabase, prescriptionId);

        res.json({
            success: true,
            message: "Prescription deleted successfully",
            prescription: deletedPrescription
        });

    } catch (error) {
        console.error("Delete prescription error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Create multiple prescriptions at once
 * POST /api/prescription/bulk
 * Body: { patient_id, doctor_id, medical_record_id, prescriptions: [...] }
 */
export const createBulkPrescriptions = async (req, res) => {
    try {
        const { patient_id, doctor_id, medical_record_id, prescriptions } = req.body;

        // Validate required fields
        if (!patient_id || !doctor_id || !prescriptions || !Array.isArray(prescriptions)) {
            return res.status(400).json({
                error: "Patient ID, Doctor ID, and prescriptions array are required"
            });
        }

        // Create all prescriptions
        const createdPrescriptions = [];
        for (const prescriptionData of prescriptions) {
            const prescription = await PrescriptionModel.create(supabase, {
                ...prescriptionData,
                patient_id,
                doctor_id,
                medical_record_id
            });
            createdPrescriptions.push(prescription);
        }

        res.status(201).json({
            success: true,
            message: `${createdPrescriptions.length} prescriptions created successfully`,
            count: createdPrescriptions.length,
            prescriptions: createdPrescriptions
        });

    } catch (error) {
        console.error("Create bulk prescriptions error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};
