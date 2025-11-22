"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { updateStatusPageSchema } from "../validations";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
} from "@/components/ui/alert-dialog";
import { Save, Trash2 } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";

type Monitor = {
    id: string;
    name: string;
    url: string;
};

type StatusPage = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    monitors: { monitorId: string }[];
};

export function EditStatusPageForm({ monitors, statusPage }: { monitors: Monitor[], statusPage: StatusPage }) {
    const router = useRouter();
    const updateStatusPage = api.statusPage.update.useMutation({
        onSuccess: () => {
            toast.success("Status page updated");
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong");
        },
    });

    const deleteStatusPage = api.statusPage.delete.useMutation({
        onSuccess: () => {
            toast.success("Status page deleted");
            router.push("/dashboard/status-pages");
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong");
        },
    });

    const form = useForm<z.infer<typeof updateStatusPageSchema>>({
        resolver: zodResolver(updateStatusPageSchema),
        defaultValues: {
            id: statusPage.id,
            title: statusPage.title,
            slug: statusPage.slug,
            description: statusPage.description || "",
            monitorIds: statusPage.monitors.map(m => m.monitorId),
        },
    });

    function onSubmit(values: z.infer<typeof updateStatusPageSchema>) {
        updateStatusPage.mutate(values);
    }

    function onDelete() {
        deleteStatusPage.mutate({ id: statusPage.id });
    }

    return (
        <div className="space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6 bg-card/60  rounded-md">



                    <div className=" grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="My Status Page" {...field} onChange={(e) => {
                                            field.onChange(e);
                                            // Only auto-update slug if it matches the old title slugified
                                            // But here we might not want to be too aggressive on edits
                                        }} />
                                    </FormControl>
                                    <FormDescription className="text-xs  opacity-75">
                                        The title of your status page.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="my-status-page" {...field} />
                                    </FormControl>
                                    <FormDescription className="text-xs  opacity-75">
                                        The URL slug for your status page.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="System status and updates." {...field} />
                                </FormControl>
                                <FormDescription className="text-xs  opacity-75">
                                    A brief description of your status page.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="monitorIds"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Monitors</FormLabel>
                                <FormControl>
                                    <MultiSelect
                                        options={monitors.map((m) => ({ label: m.name, value: m.id }))}
                                        selected={field.value}
                                        onChange={field.onChange}
                                        placeholder="Select monitors..."
                                    />
                                </FormControl>
                                <FormDescription>
                                    Select the monitors you want to display on this status page.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex  justify-end mt-4 gap-4">
                        <Button type="submit" disabled={updateStatusPage.isPending}>
                            <Save />
                            {updateStatusPage.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" disabled={deleteStatusPage.isPending}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Status Page
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        status page.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </form>
            </Form>


        </div>
    );
}
