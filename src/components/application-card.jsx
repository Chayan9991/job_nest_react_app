import React from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Boxes, BriefcaseBusiness, Download, School} from "lucide-react";
import useFetch from "@/hooks/use-fetch.jsx";
import {updateApplicationsStatus} from "@/api/apiApplications.js";
import {BarLoader} from "react-spinners";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";


const ApplicationCard = ({application, isCandidate = false}) => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = application?.resume;
        link.target = "_blank";
        link.click();
    }

    const {
        loading: loadUpdateStatus,
        fn: fnUpdateStatus,
        error: fnUpdateError,
    } = useFetch(updateApplicationsStatus, {job_id: application.job_id});

    const handleStatusChange = (status) => {
        fnUpdateStatus(status);
    }
    return (
        <Card>
            {
                loadUpdateStatus && <BarLoader width={'100%'} color='gray'/>
            }
            <CardHeader>
                <CardTitle className='flex justify-between font-bold'>
                    {
                        isCandidate ? `${application?.job?.title} at ${application?.job?.company?.name}` : application?.name
                    }
                    <Download size={18} className='bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer'
                              onClick={handleDownload}/>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div
                    className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center text-sm text-gray-300">
                    <div className="flex gap-2 items-center">
                        <BriefcaseBusiness size={16} className="text-blue-500"/>
                        <span>{application?.experience} years of experience</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <School size={16} className="text-green-500"/>
                        <span>{application?.education}</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        <Boxes size={16} className="text-yellow-500"/>
                        <span>Skills: {application?.skills}</span>
                    </div>
                </div>

                <hr className="border-gray-700"/>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-400 gap-1">
  <span>
    Applied on: {new Date(application?.created_at).toLocaleString()}
  </span>
                {isCandidate ? (
                    <span className="font-bold text-white">
      Status: <span className="capitalize">{application?.status}</span>
    </span>
                ) : ( <Select onValueChange={handleStatusChange} defaultValue ={application?.status}>
                    <SelectTrigger className='w-52'
                    >
                        <SelectValue placeholder='Application Status' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="interviewing">Interviewing</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>)}
            </CardFooter>


        </Card>
    );
};

export default ApplicationCard;