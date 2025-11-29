// Doctor Model
// Represents doctor/physician information in the system

export const doctorSchema = {
    tableName: 'doctors',
    fields: {
        id: 'uuid',
        doctor_id: 'text', // Unique doctor registration ID
        name: 'text',
        email: 'text',
        phone: 'text',

        // Professional details
        specialization: 'text',
        qualification: 'text',
        registration_number: 'text',
        registration_council: 'text',

        // Hospital/Clinic details
        hospital_name: 'text',
        hospital_address: 'text',
        city: 'text',
        state: 'text',
        pincode: 'text',

        // Verification
        is_verified: 'boolean',
        verification_status: 'text', // pending, verified, rejected
        verified_by: 'text',
        verification_date: 'timestamp',

        // Profile
        avatar_url: 'text',
        experience_years: 'integer',

        // Authentication
        password_hash: 'text',

        // Timestamps
        created_at: 'timestamp',
        updated_at: 'timestamp',
        last_login: 'timestamp'
    }
};

// Helper functions for doctor operations
export const DoctorModel = {
    /**
     * Get doctor by ID
     * @param {Object} supabase - Supabase client
     * @param {string} doctorId - Doctor ID
     * @returns {Promise<Object>} Doctor data
     */
    async getById(supabase, doctorId) {
        const { data, error } = await supabase
            .from('doctors')
            .select('*')
            .eq('id', doctorId)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Get doctor by doctor registration ID
     * @param {Object} supabase - Supabase client
     * @param {string} doctorRegId - Doctor registration ID
     * @returns {Promise<Object>} Doctor data
     */
    async getByDoctorId(supabase, doctorRegId) {
        const { data, error } = await supabase
            .from('doctors')
            .select('*')
            .eq('doctor_id', doctorRegId)
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update doctor profile
     * @param {Object} supabase - Supabase client
     * @param {string} doctorId - Doctor ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Updated doctor data
     */
    async update(supabase, doctorId, updates) {
        const { data, error } = await supabase
            .from('doctors')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', doctorId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Update last login timestamp
     * @param {Object} supabase - Supabase client
     * @param {string} doctorId - Doctor ID
     * @returns {Promise<Object>} Updated doctor data
     */
    async updateLastLogin(supabase, doctorId) {
        const { data, error } = await supabase
            .from('doctors')
            .update({ last_login: new Date().toISOString() })
            .eq('id', doctorId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    /**
     * Create new doctor
     * @param {Object} supabase - Supabase client
     * @param {Object} doctorData - Doctor information
     * @returns {Promise<Object>} Created doctor data
     */
    async create(supabase, doctorData) {
        const { data, error } = await supabase
            .from('doctors')
            .insert([{
                ...doctorData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};

export default DoctorModel;
