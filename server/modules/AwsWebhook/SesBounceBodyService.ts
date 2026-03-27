import z from "zod";

/**
 * https://docs.aws.amazon.com/ses/latest/dg/event-publishing-retrieving-sns-contents.html#event-publishing-retrieving-sns-contents-mail-object
 * Base shared mail structure
 */
export interface SesMail {
    /** Time the email was sent */
    timestamp: string;

    /** SES-assigned message ID */
    messageId: string;

    /** Envelope MAIL FROM */
    source: string;

    /** ARN of SES identity used */
    sourceArn?: string;

    /** Sender public IP */
    sourceIp?: string;

    /** AWS account ID */
    sendingAccountId: string;

    /** IAM identity that sent the email */
    callerIdentity?: string;

    /** List of recipients */
    destination: string[];

    /** Whether headers were truncated */
    headersTruncated?: boolean;

    /** Raw headers */
    headers?: { name: string; value: string }[];

    /** Common headers (parsed) */
    commonHeaders?: {
        from?: string[];
        to?: string[];
        subject?: string;
        date?: string;
        messageId?: string;
    };

    /** SES tags (configuration set, IP, etc.) */
    tags?: Record<string, string[]>;
}

/**
 * SES v2 Event Types
 */
export interface SesEvent {
    eventType: string;
    mail: SesMail;
    bounce?: SesBouncePayload;
    complaint?: SesComplaintPayload;
    delivery?: SesDeliveryPayload;
}

/**
 * SEND
 */
export interface SesSendEvent {
    eventType: "Send";
    mail: SesMail;
    send: Record<string, never>; // always empty object
}

export interface SesDeliveryPayload {
    /** Delivery timestamp */
    timestamp: string;

    /** Processing time in ms */
    processingTimeMillis: number;

    /** Successfully delivered recipients */
    recipients: string[];

    /** SMTP response from receiving server */
    smtpResponse: string;

    /** SES mail server hostname */
    reportingMTA: string;

    /** Remote mail server IP */
    remoteMtaIp?: string;
}

/**
 * DELIVERY
 */
export interface SesDeliveryEvent {
    eventType: "Delivery";
    mail: SesMail;
    delivery: SesDeliveryPayload;
}

/**
 * Individual bounced recipient
 */
export interface SesBouncedRecipient {
    /** Email address that failed */
    emailAddress: string;

    /** Action taken (e.g. failed, delayed) */
    action?: string;

    /** SMTP status code */
    status?: string;

    /** Diagnostic message */
    diagnosticCode?: string;
}
export interface SesBouncePayload {
    /** Unique bounce ID */
    feedbackId: string;
    /** Bounce category */
    bounceType: "Permanent" | "Transient" | "Undetermined";
    /** More specific subtype */
    bounceSubType: string;
    /** Affected recipients */
    bouncedRecipients: SesBouncedRecipient[];
    /** Time bounce was generated */
    timestamp: string;
    /** Remote mail server IP */
    remoteMtaIp?: string;
    /** Reporting MTA */
    reportingMTA?: string;
}

/**
 * BOUNCE
 */
export interface SesBounceEvent {
    eventType: "Bounce";
    mail: SesMail;
    bounce: SesBouncePayload;
}

export interface SesComplaintPayload {
    /** Unique complaint ID */
    feedbackId: string;
    /** Complaint subtype */
    complaintSubType: string | null;
    /** List of possible complaining recipients */
    complainedRecipients: {
        emailAddress: string;
    }[];
    /** Complaint timestamp */
    timestamp: string;
    /** Reporting system */
    userAgent?: string;
    /** ISP feedback type (abuse, fraud, etc.) */
    complaintFeedbackType?: string;
    /** When email was received by ISP */
    arrivalDate?: string;
}

/**
 * COMPLAINT
 */
export interface SesComplaintEvent {
    eventType: "Complaint";
    mail: SesMail;
    complaint: SesComplaintPayload;
}

/**
 * REJECT
 */
export interface SesRejectEvent {
    eventType: "Reject";
    mail: SesMail;
    reject: { reason: string };
}

/**
 * Base mail (only what you actually need)
 */
export const MailSchema = z.object({
    messageId: z.string(),
    destination: z.array(z.string()).min(1),
});

/**
 * Bounce
 */
export const SesEventBounceSchema = z.object({
    eventType: z.literal("Bounce"),
    mail: MailSchema,
    bounce: z.object({
        bounceType: z.enum(["Permanent", "Transient", "Undetermined"]),
        bouncedRecipients: z
            .array(
                z.object({
                    emailAddress: z.string().email(),
                }),
            )
            .min(1),
    }),
});

/**
 * Complaint
 */
export const SesEventComplaintSchema = z.object({
    eventType: z.literal("Complaint"),
    mail: MailSchema,
    complaint: z.object({
        complainedRecipients: z
            .array(
                z.object({
                    emailAddress: z.string().email(),
                }),
            )
            .min(1),
    }),
});

/**
 * Delivery
 */
export const SesEventDeliverySchema = z.object({
    eventType: z.literal("Delivery"),
    mail: MailSchema,
    delivery: z.object({
        recipients: z.array(z.string().email()).min(1),
    }),
});

/**
 * Send (optional, usually not needed for logic)
 */
export const SesEventSendSchema = z.object({
    eventType: z.literal("Send"),
    mail: MailSchema,
});

/**
 * Reject
 */
export const SesEventRejectSchema = z.object({
    eventType: z.literal("Reject"),
    mail: MailSchema,
    reject: z.object({
        reason: z.string(),
    }),
});

/**
 * Union
 */
export const SesEventSchema = z.object({
    eventType: z.enum(["Send", "Delivery", "Bounce", "Complaint", "Reject"]),
    mail: MailSchema,
    bounce: z.object().optional(),
    complaint: z.object().optional(),
    delivery: z.object().optional(),
});
