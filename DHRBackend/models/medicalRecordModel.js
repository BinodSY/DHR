// Medical Record Model
// Represents patient medical records and visits

export const medicalRecordSchema = {
    tableName: 'medical_records',
    fields: {
        id: 'uuid',
        patient_id: 'uuid', // Foreign key to patients
        doctor_id: 'uuid', // Foreign key to doctors

        // Visit information
        visit_date: 'timestamp',
        visit_type: 'text', // consultation, follow-up, emergency

        // Symptoms and diagnosis
        symptoms: 'text',
        diagnosis: 'text',
        diagnosis_code: 'text', // ICD-10 code if applicable

        // Disease status
        disease_status: 'text', // resolved, ongoing, infectious

        // Clinical information
        clinical_notes: 'text',
        treatment_plan: 'text',
        patient_progress: 'text', // improving, stable, deteriorating

        // Test results
        test_results: 'jsonb', // Store test result data
        uploaded_files: 'jsonb', // Array of file URLs

        // Communication
        health_education_sent: 'boolean',
        preferred_language: 'text',
        communication_method: 'jsonb', // Array of methods (sms, whatsapp, voice)

        // Status
        is_active: 'boolean',
        completed_at: 'timestamp',

        // Timestamps
        created_at: 'timestamp',
        updated_at: 'timestamp'
    }
};

// Helper functions for medical record operations
export const MedicalRecordModel = {
    /**
     * Create new medical record
     * @param {Object} supabase - Supabase client
     * @param {Object} recordData - Medical record details
     * @returns {Promise<Object>} Created medical record
     */
    async create(supabase, recordData) {
        const { data, error } = await supabase
            .from('medical_records')
            .insert([{
                ...recordData,
                visit_date: recordData.visit_date || new Date().toISOString(),
                is_active: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get medical records for a patient
     * @param {Object} supabase - Supabase client
     * @param {string} patientId - Patient ID
     * @returns {Promise<Array>} List of medical records
     */
    async getByPatientId(supabase, patientId) {
        const { data, error } = await supabase
            .from('medical_records')
            .select(`
        *,
        doctor:doctors(name, specialization, hospital_name),
        patient:patients(name, age, gender)
      `)
            .eq('patient_id', patientId)
            .order('visit_date', { ascending: false });

        if (error) throw error;
        return data;
    },

    /**
     * Get active medical record for a patient
     * @param {Object} supabase - Supabase client
     * @param {string} patientId - Patient ID
     * @returns {Promise<Object>} Active medical record
     */
    async getActiveByPatientId(supabase, patientId) {
        const { data, error } = await supabase
            .from('medical_records')
            .select(`
        *,
        doctor:doctors(name, specialization),
        patient:patients(name, age, gender)
      `)
            .eq('patient_id', patientId)
            .eq('is_active', true)
            .order('visit_date', { ascending: false })
            .limit(1)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get medical record by ID
     * @param {Object} supabase - Supabase client
     * @param {string} recordId - Medical record ID
     * @returns {Promise<Object>} Medical record
     */
    async getById(supabase, recordId) {
        const { data, error } = await supabase
            .from('medical_records')
            .select(`
        *,
        doctor:doctors(name, specialization, hospital_name),
        patient:patients(name, age, gender, health_id)
      `)
            .eq('id', recordId)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update medical record
     * @param {Object} supabase - Supabase client
     * @param {string} recordId - Medical record ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Updated medical record
     */
    async update(supabase, recordId, updates) {
        const { data, error } = await supabase
            .from('medical_records')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', recordId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Add uploaded file to medical record
     * @param {Object} supabase - Supabase client
     * @param {string} recordId - Medical record ID
     * @param {Object} fileInfo - File information {name, url, type}
     * @returns {Promise<Object>} Updated medical record
     */
    async addUploadedFile(supabase, recordId, fileInfo) {
        // Get current files
        const { data: record } = await supabase
            .from('medical_records')
            .select('uploaded_files')
            .eq('id', recordId)
            .single();

        const uploadedFiles = record.uploaded_files || [];
        uploadedFiles.push({
            ...fileInfo,
            uploaded_at: new Date().toISOString()
        });

        return await this.update(supabase, recordId, { uploaded_files: uploadedFiles });
    },

    /**
     * Complete/close medical record
     * @param {Object} supabase - Supabase client
     * @param {string} recordId - Medical record ID
     * @returns {Promise<Object>} Updated medical record
     */
    async complete(supabase, recordId) {
        const { data, error } = await supabase
            .from('medical_records')
            .update({
                is_active: false,
                completed_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .eq('id', recordId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get medical records by doctor
     * @param {Object} supabase - Supabase client
     * @param {string} doctorId - Doctor ID
     * @param {number} limit - Number of records to return
     * @returns {Promise<Array>} List of medical records
     */
    async getByDoctorId(supabase, doctorId, limit = 50) {
        const { data, error } = await supabase
            .from('medical_records')
            .select(`
        *,
        patient:patients(name, age, gender, health_id)
      `)
            .eq('doctor_id', doctorId)
            .order('visit_date', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data;
    }
};

export default MedicalRecordModel;
