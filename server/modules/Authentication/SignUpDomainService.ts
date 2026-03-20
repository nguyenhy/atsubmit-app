import DisposableDomains from "disposable-domains";

export const hasMxRecord = async (domain: string) => {
    const url = new URL("https://cloudflare-dns.com/dns-query");
    url.searchParams.set("type", "MX");
    url.searchParams.set("name", domain);

    const res = await fetch(url.toString(), {
        headers: {
            accept: "application/dns-json",
        },
    });
    const data = await res.json();

    return (
        typeof data === "object" &&
        !!data &&
        "Answer" in data &&
        Array.isArray(data.Answer) &&
        data.Answer.length > 0
    );
};

export const DISPOSABLE_EMAIL_DOMAIN: string[] = [...DisposableDomains];
export const isDisposableEmailDomain = (domain: string): boolean => {
    return inDomainList(DISPOSABLE_EMAIL_DOMAIN, domain);
};

export const RESERVED_EMAIL_DOMAIN: string[] = ["atsubmit.com"];
export const isReservedEmailDomain = (domain: string): boolean => {
    return inDomainList(RESERVED_EMAIL_DOMAIN, domain);
};

export const inDomainList = (domains: string[], domain: string): boolean => {
    return domains.some(
        (item) => domain === item || domain.endsWith("." + item),
    );
};
