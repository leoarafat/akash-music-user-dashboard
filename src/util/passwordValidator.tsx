const passwordValidator = async(_rule: any, value: string) => {
    if (!value) {
        return null;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value.match(passwordRegex)) {
        throw new Error(
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
    }
}

export default passwordValidator