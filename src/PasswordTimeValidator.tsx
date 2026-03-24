type PasswordTimeValidatorProps = {
    password: string;
    createAt: Date;
}

const validatePasswordTime = (createAt: Date): boolean => {
    const now = new Date();
    const diffInSeconds = (now.getTime() - createAt.getTime()) / 1000;

    return diffInSeconds >= 5;
};

const PasswordTimeValidator = ({ password, createAt }: PasswordTimeValidatorProps) => {
    if (!password) return null;

    const isValid = validatePasswordTime(createAt);

    return (
        <div>
            <h2 className="mb-4 text-xl font-semibold">Čas zadání hesla</h2>

            <div className={`rule-item ${isValid ? "valid" : "invalid"}`}>
                Heslo zadáno v dostatečném čase: {isValid ? "✅" : "❌"}
            </div>

            {!isValid && (
                <div className="mt-3 rounded-2xl warning-box p-4">
                    <p className="font-medium">
                        Heslo bylo zadáno příliš rychle — může být automaticky generované.
                    </p>
                </div>
            )}
        </div>
    );
};

export default PasswordTimeValidator;