import { useTransition } from "react";
import { Button } from "../button";
import { Trash2 } from "lucide-react";
import { deleteJobApplication } from "@/actions/jobApplication";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/components/alert-dialog";

interface JobAppDeleteButtonProps {
  jobId: string;
  title: string;
}

export function JobAppDeleteButton({ jobId, title }: JobAppDeleteButtonProps) {
  const [isDeleting, startDeleting] = useTransition();

  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);

    startDeleting(async () => {
      try {
        await deleteJobApplication(jobId);
        toast.success("Job application deleted", { position: "top-center" });
      } catch (error) {
        console.error("Failed to delete job application:", error);
        toast.error("Failed to delete job application", {
          position: "top-center",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground hover:text-destructive shrink-0"
          aria-label={`Delete ${title}`}
          disabled={isDeleting}
          onClick={stopPropagation}
          onKeyDown={stopPropagation}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        size="sm"
        onClick={stopPropagation}
        onKeyDown={stopPropagation}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Job Application?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this job application?{" "}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
