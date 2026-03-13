export function isValidDomain(domain: string): boolean {
    const domainRegex = /^(?!:\/\/)([a-z0-9-]{1,63}\.)+[a-z]{2,63}$/;

    return domainRegex.test(domain);
}

export function isValidDomainGlob(domain: string): boolean {
    const domainRegex = /^(?:\*\.)?([a-z0-9-]{1,63}\.)+[a-z]{2,63}$/;

    return domainRegex.test(domain);
}
