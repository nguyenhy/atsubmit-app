export interface Meta {
    title: string;
    description: string;
}

export const httpStatus301: Meta = {
    title: "Moved Permanently",
    description: "This page has permanently moved to a new location.",
};
export const httpStatus302: Meta = {
    title: "Found",
    description: "This page has temporarily moved to another location.",
};
export const httpStatus400: Meta = {
    title: "Bad Request",
    description: "The request could not be understood by the server.",
};
export const httpStatus401: Meta = {
    title: "Unauthorized",
    description: "You must authenticate to access this resource.",
};
export const httpStatus402: Meta = {
    title: "Payment Required",
    description: "This resource requires payment before access is granted.",
};
export const httpStatus403: Meta = {
    title: "Forbidden",
    description: "You don't have permission to access this resource.",
};
export const httpStatus404: Meta = {
    title: "Not Found",
    description: "The page you're looking for does not exist.",
};
export const httpStatus405: Meta = {
    title: "Method Not Allowed",
    description: "The request method is not allowed for this endpoint.",
};
export const httpStatus406: Meta = {
    title: "Not Acceptable",
    description: "The server cannot generate a response matching your request.",
};
export const httpStatus407: Meta = {
    title: "Proxy Authentication Required",
    description: "Authentication with a proxy server is required.",
};
export const httpStatus408: Meta = {
    title: "Request Timeout",
    description: "The server timed out waiting for the request.",
};
export const httpStatus409: Meta = {
    title: "Conflict",
    description:
        "The request conflicts with the current state of the resource.",
};
export const httpStatus410: Meta = {
    title: "Gone",
    description:
        "This resource is no longer available and has been permanently removed.",
};
export const httpStatus500: Meta = {
    title: "Internal Server Error",
    description: "Something went wrong on our end.",
};
export const httpStatus501: Meta = {
    title: "Not Implemented",
    description: "The server does not support this functionality.",
};
export const httpStatus502: Meta = {
    title: "Bad Gateway",
    description:
        "The server received an invalid response from an upstream server.",
};
export const httpStatus503: Meta = {
    title: "Service Unavailable",
    description:
        "The server is temporarily unavailable. Please try again later.",
};

export const META_OF_STATUS: Record<
    string,
    { title: string; description: string }
> = {
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

export const META_OF_PAGE: Record<
    string,
    { title: string; description: string }
> = {
    "/dashboard": {
        title: "Dashboard",
        description:
            "Overview of your forms, submissions, and recent activity.",
    },

    "/login": {
        title: "Login",
        description: "Access your account to manage forms and submissions.",
    },

    "/logout": {
        title: "Logout",
        description: "Sign out of your account securely.",
    },

    "/signup": {
        title: "Sign Up",
        description: "Create an account to start receiving form submissions.",
    },

    "/signup-success": {
        title: "Signup Successful",
        description: "Your account has been created successfully.",
    },

    "/verify-email": {
        title: "Verify Email",
        description: "Confirm your email address to activate your account.",
    },

    "/forgot-password": {
        title: "Forgot Password",
        description: "Reset your password to regain access to your account.",
    },

    "/forgot-password-submitted": {
        title: "Request Sent",
        description:
            "Password reset instructions have been sent to your email.",
    },

    "/reset-password-success": {
        title: "Password Reset Successful",
        description: "Your password has been updated successfully.",
    },

    "/reset-password-used": {
        title: "Link Already Used",
        description:
            "This password reset link has already been used or expired.",
    },

    "/forms": {
        title: "Forms",
        description: "Manage all your forms and endpoints.",
    },

    "/forms/new": {
        title: "Create Form",
        description: "Create a new form endpoint to receive submissions.",
    },

    "/form/:slug": {
        title: "Form Overview",
        description: "View form details, endpoint, and recent submissions.",
    },

    "/form/:slug/general": {
        title: "General Settings",
        description: "Configure basic information for your form.",
    },

    "/form/:slug/processing": {
        title: "Processing Settings",
        description: "Control how submissions are handled and processed.",
    },

    "/form/:slug/domains": {
        title: "Allowed Domains",
        description: "Restrict which domains can submit to this form.",
    },

    "/form/:slug/notifications": {
        title: "Notifications",
        description: "Configure email and alert settings for this form.",
    },

    "/submissions": {
        title: "Submissions",
        description: "Browse and manage all received form submissions.",
    },

    "/submission/:id": {
        title: "Submission Detail",
        description: "View full details of a specific submission.",
    },

    "/settings": {
        title: "Settings",
        description: "Manage your account and platform preferences.",
    },

    "/settings/profile": {
        title: "Profile Settings",
        description: "Update your personal information and account details.",
    },

    "/settings/processing": {
        title: "Processing Settings",
        description: "Configure default submission processing behavior.",
    },

    "/settings/domains": {
        title: "Domain Settings",
        description: "Manage allowed domains across your account.",
    },

    "/settings/notifications": {
        title: "Notification Settings",
        description: "Control how and when you receive notifications.",
    },
};
