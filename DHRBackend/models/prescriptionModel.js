// Prescription Model
// Represents medication prescriptions

export const prescriptionSchema = {
    tableName: 'prescriptions',
    fields: {
        id: 'uuid',
        patient_id: 'uuid', // Foreign key to patients
        doctor_id: 'uuid', // Foreign key to doctors
        medical_record_id: 'uuid', // Foreign key to medical_records

        // Medicine details
        medicine_name: 'text',
        dosage: 'text',
        frequency: 'text',
        duration: 'text',
        instructions: 'text',

        // Status
        status: 'text', // active, completed, discontinued

        // Timestamps
        prescribed_date: 'timestamp',
        start_date: 'date',
        end_date: 'date',
        created_at: 'timestamp',
        updated_at: 'timestamp'
    }
};

// Helper functions for prescription operations
export const PrescriptionModel = {
    /**
     * Create new prescription
     * @param {Object} supabase - Supabase client
     * @param {Object} prescriptionData - Prescription details
     * @returns {Promise<Object>} Created prescription
     */
    async create(supabase, prescriptionData) {
        const { data, error } = await supabase
            .from('prescriptions')
            .insert([{
                ...prescriptionData,
                prescribed_date: new Date().toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                status: prescriptionData.status || 'active'
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get prescriptions for a patient
     * @param {Object} supabase - Supabase client
     * @param {string} patientId - Patient ID
     * @returns {Promise<Array>} List of prescriptions
     */
    async getByPatientId(supabase, patientId) {
        const { data, error } = await supabase
            .from('prescriptions')
            .select(`
        *,
        doctor:doctors(name, specialization),
        patient:patients(name)
      `)
            .eq('patient_id', patientId)
            .order('prescribed_date', { ascending: false });

        if (error) throw error;
        return data;
    },

    /**
     * Get prescriptions by medical record
     * @param {Object} supabase - Supabase client
     * @param {string} recordId - Medical record ID
     * @returns {Promise<Array>} List of prescriptions
     */
    async getByMedicalRecordId(supabase, recordId) {
        const { data, error } = await supabase
            .from('prescriptions')
            .select('*')
            .eq('medical_record_id', recordId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    /**
     * Update prescription
     * @param {Object} supabase - Supabase client
     * @param {string} prescriptionId - Prescription ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Updated prescription
     */
    async update(supabase, prescriptionId, updates) {
        const { data, error } = await supabase
            .from('prescriptions')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', prescriptionId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Delete prescription
     * @param {Object} supabase - Supabase client
     * @param {string} prescriptionId - Prescription ID
     * @returns {Promise<Object>} Deleted prescription
     */
    async delete(supabase, prescriptionId) {
        const { data, error } = await supabase
            .from('prescriptions')
            .delete()
            .eq('id', prescriptionId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get prescription by ID
     * @param {Object} supabase - Supabase client
     * @param {string} prescriptionId - Prescription ID
     * @returns {Promise<Object>} Prescription data
     */
    async getById(supabase, prescriptionId) {
        const { data, error } = await supabase
            .from('prescriptions')
            .select(`
        *,
        doctor:doctors(name, specialization),
        patient:patients(name)
      `)
            .eq('id', prescriptionId)
            .single();

        if (error) throw error;
        return data;
    }
};

export default PrescriptionModel;
