// Vitals Model
// Represents patient vital signs and measurements

export const vitalsSchema = {
    tableName: 'vitals',
    fields: {
        id: 'uuid',
        patient_id: 'uuid', // Foreign key to patients
        doctor_id: 'uuid', // Foreign key to doctors
        medical_record_id: 'uuid', // Foreign key to medical_records

        // Vital measurements
        blood_pressure_systolic: 'integer',
        blood_pressure_diastolic: 'integer',
        temperature: 'decimal', // in Fahrenheit
        blood_sugar: 'integer', // mg/dL
        weight: 'decimal', // in kg
        height: 'decimal', // in cm
        bmi: 'decimal',
        heart_rate: 'integer', // bpm
        oxygen_saturation: 'integer', // percentage
        respiratory_rate: 'integer', // breaths per minute

        // Additional measurements
        pulse: 'integer',

        // Notes
        notes: 'text',

        // Timestamps
        recorded_at: 'timestamp',
        created_at: 'timestamp',
        updated_at: 'timestamp'
    }
};

// Helper functions for vitals operations
export const VitalsModel = {
    /**
     * Record new vitals
     * @param {Object} supabase - Supabase client
     * @param {Object} vitalsData - Vitals measurements
     * @returns {Promise<Object>} Created vitals record
     */
    async create(supabase, vitalsData) {
        // Calculate BMI if height and weight are provided
        let bmi = vitalsData.bmi;
        if (vitalsData.weight && vitalsData.height && !bmi) {
            const heightInMeters = vitalsData.height / 100;
            bmi = vitalsData.weight / (heightInMeters * heightInMeters);
            bmi = Math.round(bmi * 10) / 10; // Round to 1 decimal
        }

        const { data, error } = await supabase
            .from('vitals')
            .insert([{
                ...vitalsData,
                bmi,
                recorded_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get vitals history for a patient
     * @param {Object} supabase - Supabase client
     * @param {string} patientId - Patient ID
     * @param {number} limit - Number of records to return
     * @returns {Promise<Array>} List of vitals records
     */
    async getByPatientId(supabase, patientId, limit = 50) {
        const { data, error } = await supabase
            .from('vitals')
            .select(`
        *,
        doctor:doctors(name, specialization)
      `)
            .eq('patient_id', patientId)
            .order('recorded_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data;
    },

    /**
     * Get latest vitals for a patient
     * @param {Object} supabase - Supabase client
     * @param {string} patientId - Patient ID
     * @returns {Promise<Object>} Latest vitals record
     */
    async getLatestByPatientId(supabase, patientId) {
        const { data, error } = await supabase
            .from('vitals')
            .select(`
        *,
        doctor:doctors(name, specialization)
      `)
            .eq('patient_id', patientId)
            .order('recorded_at', { ascending: false })
            .limit(1)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get vitals by medical record
     * @param {Object} supabase - Supabase client
     * @param {string} recordId - Medical record ID
     * @returns {Promise<Object>} Vitals record
     */
    async getByMedicalRecordId(supabase, recordId) {
        const { data, error } = await supabase
            .from('vitals')
            .select('*')
            .eq('medical_record_id', recordId)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update vitals
     * @param {Object} supabase - Supabase client
     * @param {string} vitalsId - Vitals ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Updated vitals
     */
    async update(supabase, vitalsId, updates) {
        // Recalculate BMI if height or weight changed
        if (updates.weight || updates.height) {
            const { data: current } = await supabase
                .from('vitals')
                .select('weight, height')
                .eq('id', vitalsId)
                .single();

            const weight = updates.weight || current.weight;
            const height = updates.height || current.height;

            if (weight && height) {
                const heightInMeters = height / 100;
                updates.bmi = Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
            }
        }

        const { data, error } = await supabase
            .from('vitals')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', vitalsId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get vitals by ID
     * @param {Object} supabase - Supabase client
     * @param {string} vitalsId - Vitals ID
     * @returns {Promise<Object>} Vitals data
     */
    async getById(supabase, vitalsId) {
        const { data, error } = await supabase
            .from('vitals')
            .select(`
        *,
        doctor:doctors(name, specialization),
        patient:patients(name)
      `)
            .eq('id', vitalsId)
            .single();

        if (error) throw error;
        return data;
    }
};

export default VitalsModel;
