import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel.jsx";
import Autoplay from "embla-carousel-autoplay"
import partnerCompanies from '../data/partner_companies.json';
import freqAskedQuestions from '../data/faq.json';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.jsx";

const LandingPage = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000})
    )
    return (
        <main className="constainer flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
            <section className="text-center">
                <h1 className="flex flex-col items-center justify-center gradient-title text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter py-4">
                    Land Your Dream Job<span>or Hire Top Talent</span>
                </h1>
                <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
                    Explore thousands of job listings or find the perfect candidate — all in one platform.
                </p>
            </section>

            <div className="">
                {/*Button*/}
                <div className="flex flex-row items-center justify-center gap-8">
                    <Link to='/jobs' className="">
                        <Button className='h-12' variant='blue_gradient' size='xl'>Find Jobs</Button>
                    </Link>
                    <Link to='/post-jobs' className="">
                        <Button className='h-12' variant='pink_gradient' size='xl'>Post Jobs</Button>
                    </Link>
                </div>
                {/*Carousel*/}
                <Carousel className="w-full py-10 overflow-visible" plugins={[plugin.current]}>
                    <CarouselContent className="flex gap-5 sm:gap-20 items-center">
                        {partnerCompanies.map(({ name, id, path }) => (
                            <CarouselItem
                                key={id}
                                className="basis-1/3 sm:basis-1/6 flex justify-center items-center"
                            >
                                <img
                                    src={path}
                                    alt={name}
                                    className="max-h-16 h-auto object-contain"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

            </div>
            {/* Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                <img
                    src="/banner.webp"
                    alt="Banner 1"
                    className="w-full sm:w-auto max-w-md sm:max-w-md h-auto"
                />
                <img
                    src="/banner2.webp"
                    alt="Banner 2"
                    className="w-full hidden sm:block sm:w-auto max-w-xs sm:max-w-md h-auto"
                />
            </div>
             {/*Cards*/}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 px-4 sm:px-0">
                <Card className="shadow-md border border-border bg-background rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight">
                            For Job Seekers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            Search and apply for jobs, track your applications, and take the next step in your career.
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-md border border-border bg-background rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight">
                            For Employers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            Post job listings, manage applications, and find the perfect candidate effortlessly.
                        </p>
                    </CardContent>
                </Card>
            </section>

            {/*Accordion*/}

                <Accordion type="single" collapsible>
                    <p1 className="text-2xl font-bold">FAQs</p1>
                    {
                        freqAskedQuestions.map(({ question, answer }, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{`${index + 1}. ${question}`}</AccordionTrigger>
                                <AccordionContent>
                                    {answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>

        </main>
    );
};

export default LandingPage;