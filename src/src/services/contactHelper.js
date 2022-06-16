export default class ContactHelper {

    constructor() {
    }

    isOrcidId(contact) {
        return contact.name.toLowerCase().includes("orcid");
    }

    isEmail(contact) {
        return contact.name.toLowerCase().includes("e-mail");
    }

    isPhone(contact) {
        return contact.name.toLowerCase().includes("телефон");
    }

    isSkype(contact) {
        return contact.name.toLowerCase().includes("skype")
    }

    isWebSite(contact) {
        return contact.name.toLowerCase().includes("сайт");
    }

    isResearchId(contact) {
        return contact.name.toLowerCase().includes("research");
    }

    isScopusId(contact) {
        return contact.name.toLowerCase().includes("scopus");
    }

    isGoogleScholarid(contact) {
        return contact.name.toLowerCase().includes("google");
    }

    isTelegram(contact) {
        return contact.name.toLowerCase().includes("telegram")
    }
}

// export default new ContactHelper();