import React from 'react';
import {
    Drawer, DrawerClose,
    DrawerContent, DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/src/index.js";


// Using Zod Validation Library
const schema = z.Object({
    experience: z.number().min(0, {message: "Experience must be at least 0"}).int(),
    skills: z.string().min(1, {message: "Skills are required"}),
    education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {message: "Education is required"}),
    resume: z.any().refine(file=>file[0] && (file[0].type==='application/pdf' ||
        file[0].type==='application/pdf'), {message: 'Only PDF or Word Docs are allowed'})
})

const ApplyJobDrawer = ({job, user, applied, fetchJob}) => {

  const {register, handleSubmit, control, formState:{errors},reset, } =   useForm({
      resolver: zodResolver(schema),
    })

    return <Drawer open={applied ? false : undefined}>
        <DrawerTrigger >
            <Button variant={job?.isOpen && !applied ? 'blue_gradient' : 'destructive'} disabled={!job?.isOpen || applied}>
                {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
                <DrawerDescription>Please fill the form below.</DrawerDescription>
            </DrawerHeader>
            <form className='flex flex-col gap-4 p-4 pb-0'>
                <Input type='number' placeholder="Years of Experience" className='flex-1'
                       {...register("experience", {valueAsNumber: true})}
                />
                {
                    errors.experience && (
                        <p className='text-red-500'>{errors.experience.message}</p>
                    )
                }
                <Input type='text' placeholder="Skills (Comma Seperated)" className='flex-1'  {...register("skills")}/>
                {
                    errors.skills && (
                        <p className='text-red-500'>{errors.skills.message}</p>
                    )
                }

                <Controller name='education' control={control} render={({field})=>(
                    <RadioGroup onChangeValue={field.onChange} {...field}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Intermediate" id="intermediate" />
                            <Label htmlFor="intermediate">Intermediate</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Graduate" id="graduate" />
                            <Label htmlFor="graduate">Graduate</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Post Graduate" id="post-graduate" />
                            <Label htmlFor="post-graduate">Post Graduate</Label>
                        </div>
                    </RadioGroup>
                )}/>
                {
                    errors.education && (
                        <p className='text-red-500'>{errors.education.message}</p>
                    )
                }

                <Input type='file' accept='.pdf, .doc, .docx' className="flex-1 file:text-gray-500"/>

              <Button type='submit' variant='blue_gradient' size='lg'>
                  Apply
              </Button>


            </form>
            <DrawerFooter>
                <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
};

export default ApplyJobDrawer;