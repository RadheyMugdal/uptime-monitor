'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/authClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

type FormData = z.infer<typeof formSchema>

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter()
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function extractNameFromEmail(email: string): string {
        const localPart = email.split('@')[0] || '';
        const cleaned = localPart.replace(/[._-]+/g, ' ');
        return cleaned
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const onSubmit = async (data: FormData) => {
        const name = extractNameFromEmail(data.email);

        await authClient.signUp.email({
            email: data.email,
            name,
            password: data.password,
        },
            {
                onSuccess: () => {
                    router.push('/dashboard/monitors')

                },
                onError: (error) => {
                    toast.error(error.error.message || error.error.statusText)
                }
            }
        );
    };

    return (
        <div className={cn("flex flex-col w-full h-full items-center justify-center gap-6", className)} {...props}>
            <Card className="shrink-0 min-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create an account</CardTitle>
                    <CardDescription>
                        Get started with Google or Github account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="w-full" type="button" onClick={async () => {
                                    await authClient.signIn.social({
                                        provider: "google",
                                    },
                                        {
                                            onSuccess: () => {
                                                router.push('/dashboard/monitors')

                                            },
                                            onError: (error) => {
                                                toast.error(error.error.message || error.error.statusText)
                                            }
                                        }
                                    )
                                }}>
                                    <FcGoogle />
                                    Login with Google
                                </Button>
                                <Button variant="outline" className="w-full" type="button" onClick={async () => {
                                    await authClient.signIn.social({
                                        provider: "github",
                                    },
                                        {
                                            onSuccess: () => {
                                                router.push('/dashboard/monitors')

                                            },
                                            onError: (error) => {
                                                toast.error(error.error.message || error.error.statusText)
                                            }
                                        }
                                    )
                                }}>
                                    <FaGithub />
                                    Login with Github
                                </Button>
                            </div>

                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    Or continue with
                                </span>
                            </div>

                            <div className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="m@example.com" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <PasswordInput type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full">
                                    Sign up
                                </Button>
                            </div>

                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/signin" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
