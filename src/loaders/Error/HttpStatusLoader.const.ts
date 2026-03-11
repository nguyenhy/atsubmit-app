import type { Action } from "@/layouts/ErrorLayout.types";
import {
    ArrowRight,
    FileWarning,
    Lock,
    Ban,
    Search,
    AlertTriangle,
    ServerCrash,
} from "lucide-vue-next";

export interface HttpStatusViewProps {
    code: string;
    title: string;
    description: string;
    action: Action;
}
export const httpStatus301: HttpStatusViewProps = {
    code: "301",
    title: "Moved Permanently",
    description: "This page has permanently moved to a new location.",
    action: {
        icon: ArrowRight,
        label: "Go to homepage",
        href: "/",
    },
};
export const httpStatus302: HttpStatusViewProps = {
    code: "302",
    title: "Found",
    description: "This page has temporarily moved to another location.",
    action: {
        icon: ArrowRight,
        label: "Continue",
        href: "/",
    },
};
export const httpStatus400: HttpStatusViewProps = {
    code: "400",
    title: "Bad Request",
    description: "The request could not be understood by the server.",
    action: {
        icon: FileWarning,
    },
};
export const httpStatus401: HttpStatusViewProps = {
    code: "401",
    title: "Unauthorized",
    description: "You must authenticate to access this resource.",
    action: {
        icon: Lock,
        label: "Login",
        href: "/login",
    },
};
export const httpStatus402: HttpStatusViewProps = {
    code: "402",
    title: "Payment Required",
    description: "This resource requires payment before access is granted.",
    action: {
        icon: Lock,
    },
};
export const httpStatus403: HttpStatusViewProps = {
    code: "403",
    title: "Forbidden",
    description: "You don't have permission to access this resource.",
    action: {
        icon: Ban,
    },
};
export const httpStatus404: HttpStatusViewProps = {
    code: "404",
    title: "Not Found",
    description: "The page you're looking for does not exist.",
    action: {
        icon: Search,
        label: "Go Home",
        href: "/",
    },
};
export const httpStatus405: HttpStatusViewProps = {
    code: "405",
    title: "Method Not Allowed",
    description: "The request method is not allowed for this endpoint.",
    action: {
        icon: Ban,
    },
};
export const httpStatus406: HttpStatusViewProps = {
    code: "406",
    title: "Not Acceptable",
    description: "The server cannot generate a response matching your request.",
    action: {
        icon: FileWarning,
    },
};
export const httpStatus407: HttpStatusViewProps = {
    code: "407",
    title: "Proxy Authentication Required",
    description: "Authentication with a proxy server is required.",
    action: {
        icon: Lock,
    },
};
export const httpStatus408: HttpStatusViewProps = {
    code: "408",
    title: "Request Timeout",
    description: "The server timed out waiting for the request.",
    action: {
        icon: AlertTriangle,
    },
};
export const httpStatus409: HttpStatusViewProps = {
    code: "409",
    title: "Conflict",
    description:
        "The request conflicts with the current state of the resource.",
    action: {
        icon: AlertTriangle,
    },
};
export const httpStatus410: HttpStatusViewProps = {
    code: "410",
    title: "Gone",
    description:
        "This resource is no longer available and has been permanently removed.",
    action: {
        icon: Search,
    },
};
export const httpStatus500: HttpStatusViewProps = {
    code: "500",
    title: "Internal Server Error",
    description: "Something went wrong on our end.",
    action: {
        icon: ServerCrash,
        label: "Refresh",
        onClick: () => window.location.reload(),
    },
};
export const httpStatus501: HttpStatusViewProps = {
    code: "501",
    title: "Not Implemented",
    description: "The server does not support this functionality.",
    action: {
        icon: ServerCrash,
    },
};
export const httpStatus502: HttpStatusViewProps = {
    code: "502",
    title: "Bad Gateway",
    description:
        "The server received an invalid response from an upstream server.",
    action: {
        icon: ServerCrash,
    },
};
export const httpStatus503: HttpStatusViewProps = {
    code: "503",
    title: "Service Unavailable",
    description:
        "The server is temporarily unavailable. Please try again later.",
    action: {
        icon: ServerCrash,
        label: "Retry",
        onClick: () => window.location.reload(),
    },
};

export const errorViews: Record<string, HttpStatusViewProps> = {
    "301": httpStatus301,
    "302": httpStatus302,

    "400": httpStatus400,
    "401": httpStatus401,
    "402": httpStatus402,
    "403": httpStatus403,
    "404": httpStatus404,
    "405": httpStatus405,
    "406": httpStatus406,
    "407": httpStatus407,
    "408": httpStatus408,
    "409": httpStatus409,
    "410": httpStatus410,

    "500": httpStatus500,
    "501": httpStatus501,
    "502": httpStatus502,
    "503": httpStatus503,
};

export const getSupportedHttpStatusProp = (code: string) =>
    errorViews[code] || null;
