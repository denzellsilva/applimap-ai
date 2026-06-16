"use client";

import { Plus } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/components/sheet";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { Textarea } from "@/ui/components/textarea";
import { Field, FieldGroup, FieldLabel } from "@/ui/components/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import { useActionState } from "react";
import { State, createJobApplication } from "@/actions/jobApplication";

const initialState: State = { message: null, errors: {} };

export function AddJobSheet() {
  const [state, formAction, pending] = useActionState(
    createJobApplication,
    initialState,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="mr-1.5 size-4" /> Add job
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-sm md:max-w-xl lg:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Add a Job Application</SheetTitle>
          <SheetDescription>
            Enter the details of the job application you want to track.
          </SheetDescription>
        </SheetHeader>

        <form
          className="flex flex-1 flex-col space-y-4 overflow-y-auto px-4"
          id="create-job-application"
          action={formAction}
        >
          <FieldGroup className="md:grid md:grid-cols-2 md:gap-6">
            <Field>
              <FieldLabel htmlFor="title">Job Title *</FieldLabel>
              <Input
                id="title"
                name="title"
                required
                placeholder="e.g. Software Engineer"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="companyName">Company Name *</FieldLabel>
              <Input
                id="companyName"
                name="companyName"
                required
                placeholder="e.g. Acme Corp"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select name="status" defaultValue="WISH_LIST">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WISH_LIST">Wish List</SelectItem>
                  <SelectItem value="APPLIED">Applied</SelectItem>
                  <SelectItem value="INTERVIEW">Interview</SelectItem>
                  <SelectItem value="OFFER">Offer</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Remote, New York, etc."
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="salaryRange">Salary Range</FieldLabel>
              <Input
                id="salaryRange"
                name="salaryRange"
                placeholder="e.g. $100k - $120k"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="url">Job Posting URL</FieldLabel>
              <Input id="url" name="url" type="url" placeholder="https://..." />
            </Field>
          </FieldGroup>

          <Field className="flex-1">
            <FieldLabel htmlFor="description">Description or Notes</FieldLabel>
            <Textarea
              id="description"
              name="description"
              className="resize-none"
              placeholder="Any details about the job, requirements, etc."
            />
          </Field>
        </form>
        <SheetFooter>
          <Button
            type="submit"
            form="create-job-application"
            disabled={pending}
          >
            Save Job Application
          </Button>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
