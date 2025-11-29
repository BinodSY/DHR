import supabase from "../services/supabaseClient.js";
import MedicalRecordModel from "../models/medicalRecordModel.js";

/**
 * Medical Record Controller
 * Handles medical record operations for patient visits
 */

/**
 * Create new medical record
 * POST /api/medical-record
 * Body: { patient_id, doctor_id, visit_type, symptoms, diagnosis, clinical_notes, etc. }
 */
export const createMedicalRecord = async (req, res) => {
    try {
        const recordData = req.body;

        // Validate required fields
        if (!recordData.patient_id || !recordData.doctor_id) {
            return res.status(400).json({
                error: "Patient ID and Doctor ID are required"
            });
        }

        const record = await MedicalRecordModel.create(supabase, recordData);

        res.status(201).json({
            success: true,
            message: "Medical record created successfully",
            medical_record: record
        });

    } catch (error) {
        console.error("Create medical record error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get medical records for a patient
 * GET /api/medical-record/patient/:patientId
 */
export const getPatientMedicalRecords = async (req, res) => {
    try {
        const { patientId } = req.params;

        const records = await MedicalRecordModel.getByPatientId(supabase, patientId);

        res.json({
            success: true,
            count: records.length,
            medical_records: records
        });

    } catch (error) {
        console.error("Get patient medical records error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get active medical record for a patient
 * GET /api/medical-record/patient/:patientId/active
 */
export const getActiveMedicalRecord = async (req, res) => {
    try {
        const { patientId } = req.params;

        const record = await MedicalRecordModel.getActiveByPatientId(supabase, patientId);

        if (!record) {
            return res.status(404).json({
                error: "No active medical record found"
            });
        }

        res.json({
            success: true,
            medical_record: record
        });

    } catch (error) {
        console.error("Get active medical record error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get medical record by ID
 * GET /api/medical-record/:recordId
 */
export const getMedicalRecordById = async (req, res) => {
    try {
        const { recordId } = req.params;

        const record = await MedicalRecordModel.getById(supabase, recordId);

        if (!record) {
            return res.status(404).json({
                error: "Medical record not found"
            });
        }

        res.json({
            success: true,
            medical_record: record
        });

    } catch (error) {
        console.error("Get medical record error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Update medical record
 * PUT /api/medical-record/:recordId
 * Body: { symptoms, diagnosis, clinical_notes, disease_status, treatment_plan, etc. }
 */
export const updateMedicalRecord = async (req, res) => {
    try {
        const { recordId } = req.params;
        const updates = req.body;

        // Don't allow updating certain fields
        delete updates.id;
        delete updates.patient_id;
        delete updates.doctor_id;
        delete updates.visit_date;
        delete updates.created_at;

        const updatedRecord = await MedicalRecordModel.update(supabase, recordId, updates);

        res.json({
            success: true,
            message: "Medical record updated successfully",
            medical_record: updatedRecord
        });

    } catch (error) {
        console.error("Update medical record error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Add file upload to medical record
 * POST /api/medical-record/:recordId/upload
 * Body: { file_name, file_url, file_type }
 */
export const addFileToMedicalRecord = async (req, res) => {
    try {
        const { recordId } = req.params;
        const { file_name, file_url, file_type } = req.body;

        if (!file_name || !file_url) {
            return res.status(400).json({
                error: "File name and URL are required"
            });
        }

        const fileInfo = {
            name: file_name,
            url: file_url,
            type: file_type || 'unknown'
        };

        const updatedRecord = await MedicalRecordModel.addUploadedFile(supabase, recordId, fileInfo);

        res.json({
            success: true,
            message: "File added to medical record successfully",
            medical_record: updatedRecord
        });

    } catch (error) {
        console.error("Add file to medical record error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Complete/close medical record
 * POST /api/medical-record/:recordId/complete
 */
export const completeMedicalRecord = async (req, res) => {
    try {
        const { recordId } = req.params;

        const completedRecord = await MedicalRecordModel.complete(supabase, recordId);

        res.json({
            success: true,
            message: "Medical record completed successfully",
            medical_record: completedRecord
        });

    } catch (error) {
        console.error("Complete medical record error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get medical records by doctor
 * GET /api/medical-record/doctor/:doctorId
 * Query params: limit (optional)
 */
export const getDoctorMedicalRecords = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const limit = parseInt(req.query.limit) || 50;

        const records = await MedicalRecordModel.getByDoctorId(supabase, doctorId, limit);

        res.json({
            success: true,
            count: records.length,
            medical_records: records
        });

    } catch (error) {
        console.error("Get doctor medical records error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get comprehensive patient record with all related data
 * GET /api/medical-record/:recordId/comprehensive
 */
export const getComprehensiveMedicalRecord = async (req, res) => {
    try {
        const { recordId } = req.params;

        // Get medical record
        const record = await MedicalRecordModel.getById(supabase, recordId);

        if (!record) {
            return res.status(404).json({
                error: "Medical record not found"
            });
        }

        // Get associated prescriptions
        const { data: prescriptions, error: prescError } = await supabase
            .from('prescriptions')
            .select('*')
            .eq('medical_record_id', recordId)
            .order('created_at', { ascending: false });

        // Get associated vitals
        const { data: vitals, error: vitalsError } = await supabase
            .from('vitals')
            .select('*')
            .eq('medical_record_id', recordId);

        if (prescError || vitalsError) {
            throw new Error("Error fetching related data");
        }

        res.json({
            success: true,
            medical_record: {
                ...record,
                prescriptions: prescriptions || [],
                vitals: vitals || null
            }
        });

    } catch (error) {
        console.error("Get comprehensive medical record error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};
