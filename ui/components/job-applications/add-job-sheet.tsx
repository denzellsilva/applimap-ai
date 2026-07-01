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
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/ui/components/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import { useActionState, useState, useEffect, startTransition } from "react";
import { State, createJobApplication } from "@/actions/jobApplication";
import { toast } from "sonner";
import { Spinner } from "@/ui/components/spinner";

const initialState: State = { message: null, errors: {} };

export function AddJobSheet() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    createJobApplication,
    initialState,
  );

  useEffect(() => {
    if (state.message === "Job application added successfully") {
      startTransition(() => {
        setOpen(false);
      });

      toast.success(state.message, { position: "top-center" });
    }
  }, [state, setOpen]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
            <Field data-invalid={state.errors?.title ? true : false}>
              <FieldLabel htmlFor="title">Job Title *</FieldLabel>
              <Input
                id="title"
                name="title"
                defaultValue={state.fields?.title || ""}
                required
                placeholder="e.g. Software Engineer"
                aria-invalid={state.errors?.title ? true : false}
              />
              {state.errors?.title && (
                <FieldError>{state.errors.title[0]}</FieldError>
              )}
            </Field>

            <Field data-invalid={state.errors?.companyName ? true : false}>
              <FieldLabel htmlFor="companyName">Company Name *</FieldLabel>
              <Input
                id="companyName"
                name="companyName"
                defaultValue={state.fields?.companyName || ""}
                required
                placeholder="e.g. Acme Corp"
                aria-invalid={state.errors?.companyName ? true : false}
              />
              {state.errors?.companyName && (
                <FieldError>{state.errors?.companyName[0]}</FieldError>
              )}
            </Field>

            <Field data-invalid={state.errors?.status ? true : false}>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select name="status" defaultValue={state.fields?.status}>
                <SelectTrigger
                  aria-invalid={state.errors?.status ? true : false}
                >
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
              {state.errors?.status && (
                <FieldError>{state.errors.status[0]}</FieldError>
              )}
            </Field>

            <Field data-invalid={state.errors?.location ? true : false}>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                defaultValue={state.fields?.location || ""}
                placeholder="e.g. Remote, New York, etc."
                aria-invalid={state.errors?.location ? true : false}
              />
              {state.errors?.location && (
                <FieldError>{state.errors.location[0]}</FieldError>
              )}
            </Field>

            <Field data-invalid={state.errors?.salaryRange ? true : false}>
              <FieldLabel htmlFor="salaryRange">Salary Range</FieldLabel>
              <Input
                id="salaryRange"
                name="salaryRange"
                placeholder="e.g. $100k - $120k"
                aria-invalid={state.errors?.salaryRange ? true : false}
              />
              {state.errors?.salaryRange && (
                <FieldError>{state.errors.salaryRange[0]}</FieldError>
              )}
            </Field>

            <Field data-invalid={state.errors?.url ? true : false}>
              <FieldLabel htmlFor="url">Job Posting URL</FieldLabel>
              <Input
                id="url"
                name="url"
                defaultValue={state.fields?.url || ""}
                type="url"
                placeholder="https://..."
                aria-invalid={state.errors?.url ? true : false}
              />
              {state.errors?.url && (
                <FieldError>{state.errors.url[0]}</FieldError>
              )}
            </Field>
          </FieldGroup>

          <Field
            className="flex-1"
            data-invalid={state.errors?.description ? true : false}
          >
            <FieldLabel htmlFor="description">Description or Notes</FieldLabel>
            <Textarea
              id="description"
              name="description"
              defaultValue={state.fields?.description || ""}
              className="resize-none"
              placeholder="Any details about the job, requirements, etc."
              aria-invalid={state.errors?.description ? true : false}
            />
            {state.errors?.description && (
              <FieldError>{state.errors.description[0]}</FieldError>
            )}
          </Field>
        </form>
        <SheetFooter>
          <Button
            type="submit"
            form="create-job-application"
            disabled={pending}
          >
            {pending ? <Spinner /> : "Save Job Application"}
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
