export default class ContactHelper {

    constructor() {
    }

    isEmpty(contact) {
        return !contact || !contact.name || !contact.value || contact.value.trim() === '';
    }

    isAddress(contact) {
        return contact.name.toLowerCase().includes("адрес");
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
        return contact.name.toLowerCase().includes("сайт") || contact.name.toLowerCase().includes("соц");
    }

    isResearchId(contact) {
        return contact.name.toLowerCase().includes("research");
    }

    isScopusId(contact) {
        return contact.name.toLowerCase().includes("scopus");
    }

    isGoogleScholarId(contact) {
        return contact.name.toLowerCase().includes("google");
    }

    isTelegram(contact) {
        return contact.name.toLowerCase().includes("telegram")
    }

    renderOrcidIdLink(contact) {
        return "https://orcid.org/" + contact.value;
    }

    renderEmailLink(contact) {
        return "mailto:" + contact.value;
    }

    renderPhoneLink(contact) {
        return "tel:" + contact.value;
    }

    renderSkypeLink(contact) {
        return "skype:" + contact.value;
    }

    renderWebSiteLink(contact) {
        return contact.value;
    }

    renderResearchIdLink(contact) {
        return "https://publons.com/researcher/" + contact.value;
    }

    renderScopusIdLink(contact) {
        return "https://www.scopus.com/authid/detail.uri?authorId=" + contact.value;
    }

    renderGoogleScholarIdLink(contact) {
        return "https://scholar.google.com/citations?hl=uk&user=" + contact.value;
    }

    renderTelegramLink(contact) {
        return "https://t.me/" + contact.value.replace("@", "");
    }

    renderWebSiteTitle(contact) {
        return contact.value.replace('https://', '').replace('http://', '');
    }

    renderAddress(contact) {
        return 'https://maps.google.com/?q=' + contact.value;
    }
}
