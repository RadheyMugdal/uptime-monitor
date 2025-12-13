"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createStatusPageSchema } from "../validations";
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
import { Plus } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";

type Monitor = {
    id: string;
    name: string;
    url: string;
};

export function CreateStatusPageForm({ monitors }: { monitors: Monitor[] }) {
    const router = useRouter();
    const createStatusPage = api.statusPage.create.useMutation({
        onSuccess: () => {
            toast.success("Status page created");
            router.push("/dashboard/status-pages");
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong");
        },
    });

    const form = useForm<z.infer<typeof createStatusPageSchema>>({
        resolver: zodResolver(createStatusPageSchema),
        defaultValues: {
            title: "",
            slug: "",
            description: "",
            monitorIds: [],
        },
    });

    function onSubmit(values: z.infer<typeof createStatusPageSchema>) {
        createStatusPage.mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card/60 p-6  rounded-md">
                <div className="grid grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="My Status Page" {...field} onChange={(e) => {
                                        field.onChange(e);
                                        // Auto-generate slug if not manually edited (simplified logic)
                                        if (!form.getValues("slug")) {
                                            form.setValue("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
                                        }
                                    }} />
                                </FormControl>
                                <FormDescription className=" text-xs opacity-60">
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
                                <FormDescription className=" text-xs opacity-60">
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
                            <FormDescription className=" text-xs opacity-60">
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
                        <FormItem >
                            <FormLabel>Monitors</FormLabel>
                            <FormControl>
                                <MultiSelect
                                    options={monitors.map((m) => ({ label: m.name, value: m.id }))}
                                    selected={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select monitors..."

                                    className=" w-[300px]"
                                />
                            </FormControl>
                            <FormDescription className=" text-xs opacity-75">
                                Select the monitors you want to display on this status page.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className=" flex justify-end">
                    <Button type="submit" disabled={createStatusPage.isPending}>
                        <Plus />
                        {createStatusPage.isPending ? "Creating..." : "Create Status Page"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
