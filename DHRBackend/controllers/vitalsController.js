import supabase from "../services/supabaseClient.js";
import VitalsModel from "../models/vitalsModel.js";

/**
 * Vitals Controller
 * Handles patient vitals recording and retrieval
 */

/**
 * Record new vitals
 * POST /api/vitals
 * Body: { patient_id, doctor_id, medical_record_id, blood_pressure_systolic, blood_pressure_diastolic, temperature, etc. }
 */
export const recordVitals = async (req, res) => {
    try {
        const vitalsData = req.body;

        // Validate required fields
        if (!vitalsData.patient_id || !vitalsData.doctor_id) {
            return res.status(400).json({
                error: "Patient ID and Doctor ID are required"
            });
        }

        const vitals = await VitalsModel.create(supabase, vitalsData);

        res.status(201).json({
            success: true,
            message: "Vitals recorded successfully",
            vitals: vitals
        });

    } catch (error) {
        console.error("Record vitals error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get vitals history for a patient
 * GET /api/vitals/patient/:patientId
 * Query params: limit (optional)
 */
export const getPatientVitals = async (req, res) => {
    try {
        const { patientId } = req.params;
        const limit = parseInt(req.query.limit) || 50;

        const vitals = await VitalsModel.getByPatientId(supabase, patientId, limit);

        res.json({
            success: true,
            count: vitals.length,
            vitals: vitals
        });

    } catch (error) {
        console.error("Get patient vitals error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get latest vitals for a patient
 * GET /api/vitals/patient/:patientId/latest
 */
export const getLatestVitals = async (req, res) => {
    try {
        const { patientId } = req.params;

        const vitals = await VitalsModel.getLatestByPatientId(supabase, patientId);

        if (!vitals) {
            return res.status(404).json({
                error: "No vitals found for this patient"
            });
        }

        res.json({
            success: true,
            vitals: vitals
        });

    } catch (error) {
        console.error("Get latest vitals error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get vitals by medical record
 * GET /api/vitals/medical-record/:recordId
 */
export const getVitalsByMedicalRecord = async (req, res) => {
    try {
        const { recordId } = req.params;

        const vitals = await VitalsModel.getByMedicalRecordId(supabase, recordId);

        if (!vitals) {
            return res.status(404).json({
                error: "No vitals found for this medical record"
            });
        }

        res.json({
            success: true,
            vitals: vitals
        });

    } catch (error) {
        console.error("Get vitals by medical record error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Update vitals
 * PUT /api/vitals/:vitalsId
 * Body: { blood_pressure_systolic, temperature, weight, etc. }
 */
export const updateVitals = async (req, res) => {
    try {
        const { vitalsId } = req.params;
        const updates = req.body;

        // Don't allow updating certain fields
        delete updates.id;
        delete updates.patient_id;
        delete updates.doctor_id;
        delete updates.recorded_at;
        delete updates.created_at;

        const updatedVitals = await VitalsModel.update(supabase, vitalsId, updates);

        res.json({
            success: true,
            message: "Vitals updated successfully",
            vitals: updatedVitals
        });

    } catch (error) {
        console.error("Update vitals error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get vitals by ID
 * GET /api/vitals/:vitalsId
 */
export const getVitalsById = async (req, res) => {
    try {
        const { vitalsId } = req.params;

        const vitals = await VitalsModel.getById(supabase, vitalsId);

        if (!vitals) {
            return res.status(404).json({
                error: "Vitals not found"
            });
        }

        res.json({
            success: true,
            vitals: vitals
        });

    } catch (error) {
        console.error("Get vitals error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};

/**
 * Get vitals trends for a patient
 * GET /api/vitals/patient/:patientId/trends
 * Returns summarized vital statistics
 */
export const getVitalsTrends = async (req, res) => {
    try {
        const { patientId } = req.params;
        const limit = parseInt(req.query.limit) || 10;

        const vitals = await VitalsModel.getByPatientId(supabase, patientId, limit);

        if (!vitals || vitals.length === 0) {
            return res.status(404).json({
                error: "No vitals data found"
            });
        }

        // Calculate averages and trends
        const trends = {
            blood_pressure: {
                avg_systolic: 0,
                avg_diastolic: 0,
                readings: []
            },
            temperature: {
                avg: 0,
                readings: []
            },
            weight: {
                avg: 0,
                readings: []
            },
            heart_rate: {
                avg: 0,
                readings: []
            },
            oxygen_saturation: {
                avg: 0,
                readings: []
            }
        };

        let bpCount = 0, tempCount = 0, weightCount = 0, hrCount = 0, o2Count = 0;

        vitals.forEach(vital => {
            if (vital.blood_pressure_systolic && vital.blood_pressure_diastolic) {
                trends.blood_pressure.avg_systolic += vital.blood_pressure_systolic;
                trends.blood_pressure.avg_diastolic += vital.blood_pressure_diastolic;
                trends.blood_pressure.readings.push({
                    date: vital.recorded_at,
                    systolic: vital.blood_pressure_systolic,
                    diastolic: vital.blood_pressure_diastolic
                });
                bpCount++;
            }
            if (vital.temperature) {
                trends.temperature.avg += parseFloat(vital.temperature);
                trends.temperature.readings.push({
                    date: vital.recorded_at,
                    value: vital.temperature
                });
                tempCount++;
            }
            if (vital.weight) {
                trends.weight.avg += parseFloat(vital.weight);
                trends.weight.readings.push({
                    date: vital.recorded_at,
                    value: vital.weight
                });
                weightCount++;
            }
            if (vital.heart_rate) {
                trends.heart_rate.avg += vital.heart_rate;
                trends.heart_rate.readings.push({
                    date: vital.recorded_at,
                    value: vital.heart_rate
                });
                hrCount++;
            }
            if (vital.oxygen_saturation) {
                trends.oxygen_saturation.avg += vital.oxygen_saturation;
                trends.oxygen_saturation.readings.push({
                    date: vital.recorded_at,
                    value: vital.oxygen_saturation
                });
                o2Count++;
            }
        });

        // Calculate averages
        if (bpCount > 0) {
            trends.blood_pressure.avg_systolic = Math.round(trends.blood_pressure.avg_systolic / bpCount);
            trends.blood_pressure.avg_diastolic = Math.round(trends.blood_pressure.avg_diastolic / bpCount);
        }
        if (tempCount > 0) trends.temperature.avg = (trends.temperature.avg / tempCount).toFixed(1);
        if (weightCount > 0) trends.weight.avg = (trends.weight.avg / weightCount).toFixed(1);
        if (hrCount > 0) trends.heart_rate.avg = Math.round(trends.heart_rate.avg / hrCount);
        if (o2Count > 0) trends.oxygen_saturation.avg = Math.round(trends.oxygen_saturation.avg / o2Count);

        res.json({
            success: true,
            trends: trends,
            total_readings: vitals.length
        });

    } catch (error) {
        console.error("Get vitals trends error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
};
