//Helper Functions for the Cypress files

export const generateRandomPassword = (length = 8) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Cypress._.random(0, chars.length - 1));
    }
    return password;
  }
  
export const generateRandomName = (length = 6) => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let name = '';
    for (let i = 0; i < length; i++) {
        name += letters.charAt(Cypress._.random(0, letters.length - 1));
    }
    return name;
}

export const generateRandomCost = (length = 4) => {
    const numbers = '123456789';
    let cost = '';
    for (let i = 0; i < length; i++) {
        cost += numbers.charAt(Cypress._.random(0, numbers.length - 1));
    }
    return cost;
}