import React, {useEffect} from 'react';
import useFetch from "@/hooks/use-fetch.jsx";
import {getSavedJobs} from "@/api/apiJobs.js";
import {useUser} from "@clerk/clerk-react";
import {BarLoader} from "react-spinners";
import JobCard from "@/components/job-card.jsx";

const SavedJobs = () => {

    const {isLoaded} = useUser();

    const {loading:loadingSavedJobs, error:savedJobError, fn:fnSavedJobs,data:savedJobs} = useFetch(getSavedJobs)
    useEffect(() => {
        if(isLoaded) fnSavedJobs();
    },[isLoaded])


    if (!isLoaded || loadingSavedJobs) {
        return <BarLoader className='mb-4' width={"100%"} color={"cyan"}/>
    }

    return (
        <div>
            <h1 className="gradient-title font-extrabold text-5xl sm:text-6xl text-center pb-8">
                Saved Jobs
            </h1>

            {
                loadingSavedJobs === false && (
                    savedJobs?.length > 0 ? (
                        <div className="mt-8 w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {savedJobs?.map((savedJob) => {
                                return <JobCard key={savedJob.id} job={savedJob?.job} savedInit={true} onJobSaved={fnSavedJobs}/>
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 mt-8">No Saved Jobs Found...</div>
                    )
                )
            }
        </div>
    );
};

export default SavedJobs;