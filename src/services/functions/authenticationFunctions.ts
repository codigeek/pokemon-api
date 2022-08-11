
export const getUserPermissions = (userType: string) => {
    const permissions = {
        isAdmin: false,
        isBrandAdmin: false,
        isBranchAdmin: false,
        isSales: false,
        isClient: false
    };
    switch (userType) {
        // ADMIN
        case "62255abf045b1c5795a6028a":
            permissions.isAdmin = true;
            break;
        // BRAND MANAGER
        case "621c677d6329a6c34f9e9aa5":
            permissions.isBrandAdmin = true;
            break;
        // BRANCH MANAGER
        case "621c67956329a6c34f9e9ab2":
            permissions.isBranchAdmin = true;
            break;
        // SALES
        case "621c7b93e49d8d94cdf082aa":
            permissions.isSales = true;
            break;
        // CLIENT
        case "6232733976bd9ac409606de3":
            permissions.isClient = true;
            break;
        default:
            break;
    }
    return permissions;
}