import React, {useEffect, useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import {SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser} from "@clerk/clerk-react";
import {BriefcaseBusinessIcon, HeartIcon, PenBox} from "lucide-react";

const Header = () => {
    const [showSignInDialog, setShowSignInDialog] = useState(false);
    const [search , setSearch] = useSearchParams();
    const  {user} = useUser();


    useEffect(() => {
        if(search.get("sign-in")) {
            setShowSignInDialog(true);
        }
    }, [search]);


    return (
        <>
            <nav className="py-4">
                <div className="mx-auto flex justify-between items-center px-4">
                    <Link to="/">
                        <img src="/jobnest.png" alt="logo" className="h-8 sm:h-12" />
                    </Link>

                    <div className="flex gap-4 items-center">
                        <SignedOut>
                            <Button variant="outline" onClick={() => setShowSignInDialog(true)}>
                                Login
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            {user?.unsafeMetadata?.role === "recruiter" && (
                                <Link to="/post-job">
                                    <Button variant="pink_gradient" className="rounded-full">
                                        <PenBox size={20} className="mr-2" />
                                        Post a job
                                    </Button>
                                </Link>
                            )}
                            <UserButton appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10 rounded-full",
                                }
                            }}>
                                <UserButton.MenuItems>
                                    <UserButton.Link href='/my-jobs' label="My Jobs" labelIcon={<BriefcaseBusinessIcon size={15}/> }/>

                                    <UserButton.Link href='/saved-jobs' label="Saved Jobs" labelIcon={<HeartIcon size={15}/> }/>
                                </UserButton.MenuItems>

                            </UserButton>
                        </SignedIn>
                    </div>
                </div>
            </nav>

            {/* SignIn Modal */}
            {showSignInDialog && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                    onClick={() => setShowSignInDialog(false)} // Close on background click
                >
                    <div onClick={(e) => {
                        e.stopPropagation();
                        setSearch({});
                    }}>
                        <SignIn
                            signUpForceRedirectUrl="/onboarding"
                            signUpFallbackRedirectUrl="/onboarding"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
