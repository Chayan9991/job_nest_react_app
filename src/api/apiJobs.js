import supabaseClient from "@/utils/supabase.js";

/**
 * Fetches jobs with optional filters (location, company, search query).
 */
export async function getJobs(token, { location, company_id, searchQuery }) {
    const supabase = await supabaseClient(token);

    let query = supabase
        .from("jobs")
        .select("*, company:companies(name, logo_url), saved:saved_jobs(id)");

    if (location) {
        query = query.eq("location", location);
    }

    if (company_id) {
        query = query.eq("company_id", company_id);
    }

    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching jobs:", error);
    }

    return { data, error };
}


/**
 * Toggles job save status:
 * - Deletes if already saved
 * - Inserts if not saved
 */
export async function saveJob(token, { alreadySaved }, saveData) {
    const supabase = await supabaseClient(token);

    if (alreadySaved) {
        const { error } = await supabase
            .from("saved_jobs")
            .delete()
            .eq("job_id", saveData.job_id);

        if (error) {
            console.error("Error deleting saved job:", error);
        }

        return { data: null, error };
    } else {
        const { data, error } = await supabase
            .from("saved_jobs")
            .insert([saveData]).select();

        if (error) {
            console.error("Error saving job:", error);
        }

        return { data, error };
    }
}



export async function getSingleJob(token,{job_id}) {
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase
        .from("jobs")
        .select("*, company:companies(name, logo_url), applications: applications(*)")
        .eq("id", job_id).single();

    if(error) {
        console.error("Error while fetching a single job", error);
        return null ;
    }
    return {data};
}

export async function updateHiringStatus(token,{job_id}, isOpen) {
    const supabase = await supabaseClient(token);

    const {data, error} = await supabase
        .from("jobs")
        .update({isOpen})
        .eq("id", job_id).select();

    if(error) {
        console.error("Error updating job", error);
        return null ;
    }
    return {data};
}

export async function addNewJobs(token,_, jobData) {
    const supabase = await supabaseClient(token);


    const {data, error} =
        await supabase.
        from('jobs').
        insert([jobData]).select();

    if(error || data.length ===0) {
        console.error("Error Creating jobs", error);
        return null ;
    }
    return {data};
}
