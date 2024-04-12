

//Creating custom warnings
const SysWarn = Object.freeze({
    MISSING_JWT_TOKEN: 'Unauthorized: Missing token',
    INVALID_JWT_TOKEN: 'Unauthorized: Invalid token',
    CONTACT_NOT_FOUND: 'Contact not found',
    CONTACT_LIST_IS_EMPTY: 'Contact list is empty!!!'
});

module.exports = SysWarn;
