




export const workerModel = {
    /**
     * Get worker card by health ID
     * @param {Object} supabase - Supabase client
     * @param {string} health_id - Health ID of the worker
     * @returns {Promise<Object>} Worker data
     */

    async getHealthCard(supabase, health_id) {
        const { data, error } = await supabase
            .from('workers')
            .select('*')
            .eq('health_id', health_id)
            .maybeSingle();
        if (error) throw error;
        return data;
    }

    

}

export default workerModel