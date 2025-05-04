import React, {useEffect, useState} from 'react';
import {useUser} from "@clerk/clerk-react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {HeartIcon, MapPinIcon, TrashIcon} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import useFetch from "@/hooks/use-fetch.jsx";
import {getJobs, saveJob} from "@/api/apiJobs.js";

const JobCard = ({job, isMyJob = false, savedInit = false, onJobSaved=()=>{}}) => {

    const {user} = useUser();
    const[saved, setSaved] = useState(savedInit);

    const {
        fn: fnSavedJob,
        data: savedJob,
        loading: loadingSavedJobs,
    } = useFetch(saveJob,{alreadySaved: saved});

    const handleSavedJob = async() => {
        await fnSavedJob({user_id: user.id, job_id: job.id});
        onJobSaved();
    }

    useEffect(() => {
        if(savedJob !== undefined) {
            setSaved(savedJob?.length >0);
        }
    },[savedJob]);

    return (
        <Card className='flex flex-col'>
            <CardHeader className='flex justify-between font-bold'>
                <CardTitle className='font-bold text-2xl'>{job.title}</CardTitle>
                {
                    isMyJob && (<TrashIcon className='text-red-300 cursor-pointer' fill='red' size={18}/>)
                }
            </CardHeader>
            <CardContent className='flex flex-col gap-4 flex-1'>
                <div className="flex justify-between">
                    {job.company?.logo_url && (
                        <img src={job.company.logo_url} alt="Company Logo" className="h-6" />
                    )}
                    <div className="flex gap-2 items-center">
                        <MapPinIcon size={15}/>{job.location}
                    </div>
                </div>
                <hr/>
                {job.description.substring(0, job.description.indexOf('.'))}
            </CardContent>
            <CardFooter className='flex gap-2'>
                <Link className="flex-1" to={`/job/${job.id}`}>
                    <Button className="w-full" variant='secondary'>
                         More Details
                    </Button>
                </Link>

                {
                    !isMyJob && (
                        <Button className="w-15" variant='outline' onClick={handleSavedJob} disabled={loadingSavedJobs}>
                            {
                                saved ? <HeartIcon className='' size={25} fill='red' stroke='red' /> : <HeartIcon className='' size={20} />

                            }
                        </Button>
                    )
                }

            </CardFooter>
        </Card>
    );
};

export default JobCard;