import React, {useEffect} from 'react';
import {useUser} from "@clerk/clerk-react";
import {BarLoader} from 'react-spinners';
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";

const Onboarding = () => {
    const {user, isLoaded} = useUser();
    const navigate =  useNavigate();
    //console.log("onboarding", user);

    const handleRoleSelection = async (role) => {
        await user.update({
            unsafeMetadata: {role},
        }).then(() => {
            navigate(role === 'recruiter' ? '/post-jobs' :'/jobs');
        }).catch((error) => {
            console.error("Error updating user role", error);
        });
    }

    //Now after role is assigned user cannot see Onboarding Screen
    useEffect(() => {
        const role = user?.unsafeMetadata?.role;
        if (role) {
            navigate(role === 'recruiter' ? '/post-jobs' : '/jobs');
        }
    }, [user]);


    if(!isLoaded){
        return <BarLoader className='mb-4' width={"100%"} color={"green"}/>
    }
    return (
        <div className='flex flex-col items-center justify-center mt-32'>
            <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
                 I am a...
            </h2>
            <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
                <Button className='h-36 text-2xl' variant='blue_gradient' onClick={()=>handleRoleSelection("candidate")}>Candidate</Button>
                <Button className='h-36 text-2xl' variant='pink_gradient'onClick={()=>handleRoleSelection("recruiter")}>Recruiter</Button>
            </div>
        </div>
    );
};

export default Onboarding;