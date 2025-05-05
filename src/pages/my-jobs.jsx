import React from 'react';
import {useUser} from "@clerk/clerk-react";
import {BarLoader} from "react-spinners";
import CreatedApplications from "@/components/created-applications.jsx";
import CreatedJobs from "@/components/created-jobs.jsx";



const MyJobs = () => {
    const{user, isLoaded} = useUser();

    if (!isLoaded ) {
        return <BarLoader className='mb-4' width={"100%"} color={"cyan"}/>
    }
    return (
        <div>
            <h1 className="gradient-title font-extrabold text-5xl sm:text-6xl text-center pb-8">
                {
                    user?.unsafeMetadata?.role === "candidate" ? "My Applications" : "My Jobs"
                }
            </h1>
            {
                user?.unsafeMetadata?.role === "candidate" ? <CreatedApplications/> : <CreatedJobs/>
            }
        </div>
    );
};

export default MyJobs;