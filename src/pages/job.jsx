import React, {useEffect} from 'react';
import useFetch from "@/hooks/use-fetch.jsx";
import {getSingleJob, updateHiringStatus} from "@/api/apiJobs.js";
import {useUser} from "@clerk/clerk-react";
import {useParams} from "react-router-dom";
import {BarLoader} from "react-spinners";
import {BriefcaseIcon, DoorClosed, DoorOpen, MapPinIcon} from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import ApplyJobDrawer from "@/components/apply_job.jsx";
import ApplicationCard from "@/components/application-card.jsx";

const Job = () => {
    const { id } = useParams();
    const { isLoaded, user } = useUser();

    const {
        loading: loadingJob,
        data: job,
        fn: fnJob,
    } = useFetch(getSingleJob, {
        job_id: id,
    });

    useEffect(() => {
        if (isLoaded) fnJob();
    }, [isLoaded]);


    const {
        loading: loadingHiringStatus,
        data: status,
        fn: fnHiringStatus,
    } = useFetch(updateHiringStatus, {
        job_id: id,
    });

   const handleStatusChange = (value) => {
       const isOpen = value === "open";
       fnHiringStatus(isOpen).then(()=>fnJob());
   }

    if(!isLoaded || loadingJob) {
        return <BarLoader className='mb-4' width={'100%'} color='#36d7b7'/>
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
                <h1 className="gradient-title font-extrabold pb-3 text-3xl sm:text-5xl">
                    {job?.title}
                </h1>
                <img src={job?.company?.logo_url} alt={job?.title} className="h-12" />
            </div>

            <div className="flex flex-wrap gap-4 justify-between text-gray-300">
                <div className="flex gap-2 items-center">
                    <MapPinIcon />
                    {job?.location}
                </div>
                <div className="flex gap-2 items-center">
                    <BriefcaseIcon />
                    {job?.applications?.length} Applicants
                </div>
                <div className="flex gap-2 items-center">
                    {job?.isOpen ? (
                        <div className='text-green-500'>
                            <DoorOpen /> Open
                        </div>
                    ) : (
                        <div className='text-red-500'>
                            <DoorClosed /> Closed
                        </div>
                    )}
                </div>
            </div>

            {/*Hiring Status*/}
            {loadingHiringStatus && <BarLoader width={'100%'} color='grey'/>}
            {job?.recruiter_id === user?.id && (
                <div className="max-w-xs">
                    <Select onValueChange={handleStatusChange}>
                        <SelectTrigger
                            className='w-full'
                        >
                            <SelectValue placeholder={`Hiring Status: ${job?.isOpen ? 'Open' : 'Closed'}`} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}

            <div>
                <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
                <p className="sm:text-lg text-gray-200">{job?.description}</p>
            </div>

            <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">What we are looking for</h2>
                <div className="prose prose-invert max-w-none sm:text-lg">
                    <MDEditor.Markdown source={job?.requirements} />
                </div>
            </div>

            {/*Render Applications*/}
            <div className="">
                {
                    job?.recruiter_id !== user?.id && <ApplyJobDrawer job={job} user={user} fetchJob={fnJob} applied={job?.applications?.find((ap)=>ap.candidate_id === user.id)}/>
                }
            </div>
            {
                job?.applications?.length > 0 && job?.recruiter_id === user?.id &&(
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>
                        {
                            job?.applications.map((application)=>{
                                return <ApplicationCard key={application.id} application={application} />
                            })
                        }
                    </div>
                )
            }
        </div>

    );
};

export default Job;