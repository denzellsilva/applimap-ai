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
import { JobFieldsSkeleton } from "./job-fields-skeleton";
import { useActionState, useEffect, useState, startTransition } from "react";
import { getJobApplicationById, State } from "@/actions/jobApplication";
import { toast } from "sonner";
import { Spinner } from "@/ui/components/spinner";
import { Button } from "@/ui/components/button";
import { SheetClose, SheetFooter } from "@/ui/components/sheet";
import {
  useKanbanAction,
  useKanbanActionDispatch,
} from "@/ui/components/job-applications/job-application-context";

interface JobFieldsProps {
  id?: string | null;
}

const initialState: State = { message: null, errors: {} };

export function JobFields({ id }: JobFieldsProps) {
  const kanbanAction = useKanbanAction();
  const kanbanActionDispatch = useKanbanActionDispatch();
  const [state, formAction, pending] = useActionState(
    kanbanAction.action,
    initialState,
  );
  const [jobApplication, setJobApplication] = useState<Awaited<
    ReturnType<typeof getJobApplicationById>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));

  // Fetch job application data if an ID is provided
  useEffect(() => {
    let ignore = false;

    if (!id) {
      return;
    }

    const jobId: string = id;

    async function fetchJobApplication() {
      const jobApplication = await getJobApplicationById(jobId);
      if (!ignore) {
        setJobApplication(jobApplication);
        setIsLoading(false);
      }
    }

    fetchJobApplication();

    return () => {
      ignore = true;
    };
  }, [id]);

  // Handle success messages and close the sheet
  useEffect(() => {
    if (
      state.message !== "Job application added successfully" &&
      state.message !== "Job application updated successfully"
    ) {
      return;
    }

    startTransition(() => {
      kanbanActionDispatch({ type: "close" });
    });
    toast.success(state.message, { position: "top-center" });
  }, [state.message, kanbanActionDispatch]);

  if (isLoading) {
    return <JobFieldsSkeleton />;
  }

  const fields = jobApplication ?? state.fields;
  return (
    <>
      <form
        className="flex flex-1 flex-col space-y-4 overflow-y-auto px-4"
        id="job-application-form"
        action={formAction}
      >
        <div>
          <FieldGroup className="md:grid md:grid-cols-2 md:gap-6">
            <Field data-invalid={state.errors?.title ? true : false}>
              <FieldLabel htmlFor="title">Job Title *</FieldLabel>
              <Input
                id="title"
                name="title"
                defaultValue={fields?.title || ""}
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
                defaultValue={fields?.companyName || ""}
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
              <Select name="status" defaultValue={fields?.status || ""}>
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
                defaultValue={fields?.location || ""}
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
                defaultValue={fields?.salaryRange || ""}
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
                defaultValue={fields?.url || ""}
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
              defaultValue={fields?.description || ""}
              className="resize-none"
              placeholder="Any details about the job, requirements, etc."
              aria-invalid={state.errors?.description ? true : false}
            />
            {state.errors?.description && (
              <FieldError>{state.errors.description[0]}</FieldError>
            )}
          </Field>
        </div>
      </form>
      <SheetFooter>
        <Button type="submit" form="job-application-form" disabled={pending}>
          {pending ? <Spinner /> : "Save Job Application"}
        </Button>
        <SheetClose asChild>
          <Button
            type="button"
            variant="outline"
            onClick={() => kanbanActionDispatch({ type: "close" })}
          >
            Cancel
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  );
}
