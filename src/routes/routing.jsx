import {createBrowserRouter} from "react-router-dom";
import AppLayout from "@/layout/app_layout.jsx";
import LandingPage from "@/pages/landing-page.jsx";
import React from "react";
import Job from "@/pages/job.jsx";
import Onboarding from "@/pages/onboarding.jsx";
import JobListing from "@/pages/job-listing.jsx";
import PostJobs from "@/pages/post-jobs.jsx";
import SavedJobs from "@/pages/save-jobs.jsx";
import MyJobs from "@/pages/my-jobs.jsx";
import ProtectedRoute from "@/routes/protected-routes.jsx";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <AppLayout/>,
        children: [
            {
                index: true,
                element: <LandingPage/>,
            },
            {
                path: 'home',
                element: <LandingPage/>,
            },
            {
                path: 'jobs',
                element: (
                    <ProtectedRoute>
                        <JobListing/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'job/:id',
                element: (
                    <ProtectedRoute>
                        <Job/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'onboarding',
                element: (
                    <ProtectedRoute>
                        <Onboarding/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'saved-jobs',
                element: (
                    <ProtectedRoute>
                        <SavedJobs/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'post-job',
                element: (
                    <ProtectedRoute>
                        <PostJobs/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'my-jobs',
                element:(
                    <ProtectedRoute>
                        <MyJobs/>
                    </ProtectedRoute>
                ),
            }
        ]
    }
]);
