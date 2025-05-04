import supabaseClient, {supabaseUrl} from "@/utils/supabase.js";

export async function applyToJobs(token,_,jobData) {
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() * 90000);
    const fileName = `resume-${random}-${jobData.candidate_id}`;


  const {error:storageError} = await supabase.storage.from('resumes').upload(fileName, jobData.resume);
    if(storageError) {
        console.error("Error uploading resume", error);
        return null ;
    }

    const resumeUrl = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

    const {data, error} = await supabase
        .from("applications").insert([
            {
                ...jobData,
                resumeUrl,
            }
        ]).select();
    if(error) {
        console.error("Error submitting application", error);
        return null ;
    }

    return {data};
}