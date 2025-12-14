"use client"
import { useState } from "react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { MdOutlineWebhook } from "react-icons/md";
import { FaDiscord, FaSlack } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Loader from "@/components/global/loader";

const integrationsChannels = [
    { type: "email", label: "Email", logo: <IoIosMail /> },
    { type: "slack", label: "Slack", logo: <FaSlack /> },
    { type: "discord", label: "Discord", logo: <FaDiscord /> },
    { type: "webhook", label: "Webhook", logo: <MdOutlineWebhook /> },
] as const;

type ChannelType = typeof integrationsChannels[number]["type"];

const IntegrationsPage = () => {
    const [selectedChannel, setSelectedChannel] = useState<ChannelType>("email");
    const { data: integrations, isPending } = api.integration.getAll.useQuery();

    if (isPending) return <Loader loadingText='Loading integrations...' />;

    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/dashboard/integrations">Integrations</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="flex flex-1 gap-4 pt-0">
                {/* Sidebar */}
                <div className="flex flex-col gap-3 px-4 border-r w-[25%]">
                    {integrationsChannels.map(channel => {
                        const hasIntegration = integrations?.some(integration => integration.type === channel.type);
                        return (
                            <Button
                                key={channel.type}
                                className={cn(
                                    "justify-start relative",
                                    selectedChannel === channel.type && "bg-accent/50"
                                )}
                                variant="ghost"
                                onClick={() => setSelectedChannel(channel.type)}
                            >
                                <div className="flex items-center">
                                    {channel.logo}
                                    <span className="ml-2">{channel.label}</span>
                                </div>
                                {hasIntegration && (
                                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                                )}
                            </Button>
                        );
                    })}
                </div>

                {/* Main content */}
                <div className="flex-1 p-4">
                    <ChannelIntegration
                        key={selectedChannel}
                        type={selectedChannel}
                        existingIntegration={integrations?.find(i => i.type === selectedChannel)}
                    />
                </div>
            </div>
        </>
    );
};

export default IntegrationsPage;

interface Integration {
    id: string;
    userId: string;
    type: ChannelType;
    value: string;
    createdAt: Date;
    updatedAt: Date;
}

const ChannelIntegration = ({ type, existingIntegration }: {
    type: ChannelType;
    existingIntegration?: Integration;
}) => {
    const [inputValue, setInputValue] = useState(existingIntegration?.value || "");
    const [isEditing, setIsEditing] = useState(false);

    const utils = api.useUtils();

    const createMutation = api.integration.create.useMutation({
        onSuccess: () => {
            toast.success(`${type} integration saved successfully!`);
            utils.integration.getAll.invalidate();
            setIsEditing(false);
        },
        onError: (error) => {
            toast.error(`Failed to save ${type} integration: ${error.message}`);
        },
    });

    const updateMutation = api.integration.update.useMutation({
        onSuccess: () => {
            toast.success(`${type} integration updated successfully!`);
            utils.integration.getAll.invalidate();
            setIsEditing(false);
        },
        onError: (error) => {
            toast.error(`Failed to update ${type} integration: ${error.message}`);
        },
    });

    const deleteMutation = api.integration.remove.useMutation({
        onSuccess: () => {
            toast.success(`${type} integration removed successfully!`);
            utils.integration.getAll.invalidate();
            setInputValue("");
        },
        onError: (error) => {
            toast.error(`Failed to remove ${type} integration: ${error.message}`);
        },
    });

    const isLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    const handleSave = async () => {
        const trimmedValue = inputValue.trim();
        if (!trimmedValue) {
            toast.error("Please enter a valid value");
            return;
        }

        try {
            if (existingIntegration) {
                await updateMutation.mutateAsync({
                    id: existingIntegration.id,
                    value: trimmedValue
                });
            } else {
                await createMutation.mutateAsync({
                    type,
                    value: trimmedValue
                });
            }
        } catch (error) {
            // Error handling is done in mutation callbacks
        }
    };

    const handleDelete = async () => {
        if (!existingIntegration?.id) return;

        try {
            await deleteMutation.mutateAsync({ id: existingIntegration.id });
        } catch (error) {
            // Error handling is done in mutation callbacks
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setInputValue(existingIntegration?.value || "");
    };

    const handleCancel = () => {
        setIsEditing(false);
        setInputValue(existingIntegration?.value || "");
    };

    const labels: Record<ChannelType, string> = {
        email: "Email Notifications",
        slack: "Slack Integration",
        discord: "Discord Integration",
        webhook: "Webhook Integration",
    };

    const descriptions: Record<ChannelType, string> = {
        email: "Receive notifications directly to your email inbox.",
        slack: "Send notifications to your Slack workspace via webhook.",
        discord: "Send notifications to your Discord server via webhook.",
        webhook: "Send notifications to any custom webhook endpoint.",
    };

    const placeholders: Record<ChannelType, string> = {
        email: "user@example.com",
        slack: "https://hooks.slack.com/services/...",
        discord: "https://discord.com/api/webhooks/...",
        webhook: "https://your-endpoint.com/webhook",
    };

    return (
        <div className="max-w-2xl">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">{labels[type]}</h2>
                <p className="text-muted-foreground">{descriptions[type]}</p>
            </div>

            {/* Current Integration Display */}
            {existingIntegration && !isEditing && (
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="font-medium">Active Integration</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Current {type}:</p>
                            <code className="bg-background px-2 py-1 rounded text-sm">
                                {existingIntegration.value}
                            </code>
                            <p className="text-xs text-muted-foreground mt-2">
                                Last updated: {existingIntegration.updatedAt.toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleEdit}>
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleDelete}
                                disabled={isLoading}
                            >
                                {deleteMutation.isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <XCircle className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Integration Form */}
            {(!existingIntegration || isEditing) && (
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            {type === "email" ? "Email Address" : `${labels[type]} URL`}
                        </label>
                        <Input
                            type={type === "email" ? "email" : "url"}
                            placeholder={placeholders[type]}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="max-w-md"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={handleSave}
                            disabled={isLoading || !inputValue.trim()}
                        >
                            {(createMutation.isPending || updateMutation.isPending) && (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            )}
                            {existingIntegration ? "Update" : "Save"} Integration
                        </Button>

                        {isEditing && (
                            <Button variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* Help Text */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h4 className="font-medium mb-2">Setup Instructions:</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                    {type === "email" && (
                        <p>Simply enter your email address to receive notifications.</p>
                    )}
                    {type === "slack" && (
                        <>
                            <p>1. Go to your Slack workspace settings</p>
                            <p>2. Create a new incoming webhook</p>
                            <p>3. Copy the webhook URL and paste it above</p>
                        </>
                    )}
                    {type === "discord" && (
                        <>
                            <p>1. Go to your Discord server settings</p>
                            <p>2. Navigate to Integrations → Webhooks</p>
                            <p>3. Create a new webhook and copy the URL</p>
                        </>
                    )}
                    {type === "webhook" && (
                        <>
                            <p>1. Set up an endpoint that accepts POST requests</p>
                            <p>2. Ensure your endpoint can handle JSON payloads</p>
                            <p>3. Enter your endpoint URL above</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};