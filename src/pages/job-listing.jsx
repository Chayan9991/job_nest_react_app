import React, {useEffect, useState} from 'react';
import {getJobs} from "@/api/apiJobs.js";
import {useUser} from "@clerk/clerk-react";
import useFetch from "@/hooks/use-fetch.jsx";
import {BarLoader} from "react-spinners";
import JobCard from "@/components/job-card.jsx";
import {getCompanies} from "@/api/apiCompanies.js";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";
import {State} from "country-state-city";


const JobListing = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [company_id, setCompany_Id] = useState('');
    const {isLoaded} = useUser();

    const {
        fn: fnJobs,
        data: jobs,
        loading: loadingJobs
    } =
        useFetch(getJobs, {location, company_id, searchQuery});

    const {
        fn: fnCompanies,
        data: companies,
        loading: loadingCompanies
    } = useFetch(getCompanies);

    useEffect(() => {
        if (isLoaded) {
            fnCompanies();
        }
    }, [isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            fnJobs();
        }
    }, [isLoaded, location, company_id, searchQuery]);


    if (!isLoaded) {
        return <BarLoader className='mb-4' width={"100%"} color={"green"}/>
    }

    const handleSearch = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        const query = formData.get('search-query');
        if(query) setSearchQuery(query);
    }

    const clearFilters = () => {
        setSearchQuery("");
        setCompany_Id("");
        setLocation("");
    }
    return (
        <div>
            <h1 className="gradient-title font-extrabold text-4xl mt-10 sm:mt-0 sm:text-7xl text-center pb-8">Latest
                Jobs</h1>

            {/*Add Filters Here*/}
            <form action="" onSubmit={handleSearch} className='h-10 flex w-full gap-2 items-center mb-3'>
                <Input type='text' placeholder='Search Jobs by Title..' name='search-query' className='h-full flex-1 px-4 text-md'/>
                <Button className="h-full sm:w-28" type='submit' variant='blue_gradient'>Submit</Button>
            </form>

            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Select value={location} onValueChange={(value) => setLocation(value)}>
                    <SelectTrigger className="w-full sm:flex-1">
                        <SelectValue placeholder="Filter by Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {State.getStatesOfCountry("IN").map((state) => (
                                <SelectItem key={state.isoCode} value={state.name}>
                                    {state.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={company_id} onValueChange={(value) => setCompany_Id(value)}>
                    <SelectTrigger className="w-full sm:flex-1">
                        <SelectValue placeholder="Filter by Company" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {companies?.map(({ name, id }) => (
                                <SelectItem key={id} value={id}>
                                    {name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button
                    variant="destructive"
                    className="w-full sm:flex-1"
                    onClick={clearFilters}
                >
                    Clear Filter
                </Button>
            </div>


            {
                loadingJobs && (
                    <BarLoader className='mt-4' width={"100%"} color={'gray'}/>
                )
            }
            {
                loadingJobs === false && (
                    jobs?.length > 0 ? (
                        <div className="mt-8 w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {jobs.map((job) => {
                               return <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0}/>
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 mt-8">No Jobs Found...</div>
                    )
                )
            }

        </div>
    );
};

export default JobListing;