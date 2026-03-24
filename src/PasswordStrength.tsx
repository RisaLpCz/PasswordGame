type PasswordStrengthProps = {
    password: string;
    score: number;
};

const PasswordStrength = ({ password, score }: PasswordStrengthProps) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    const isValid =
        hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;

    let output = "";
    let barClass = "";

    if (score <= 1) {
        output = "Slabé heslo 🔴";
        barClass = "strength-weak";
    } else if (score <= 3) {
        output = "Středně silné heslo 🟡";
        barClass = "strength-medium";
    } else {
        output = "Silné heslo 🟢";
        barClass = "strength-strong";
    }

    const barWidth = (score / 4) * 100;

    return (
        <div>
            <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">Vyhodnocení hesla</h2>
                <span className="rounded-full px-3 py-1 text-sm font-semibold badge-soft">
          {password ? output : "Zatím bez hesla"}
        </span>
            </div>

            <div className="mb-3 h-3 w-full overflow-hidden rounded-full strength-track">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${barClass}`}
                    style={{ width: `${barWidth}%` }}
                />
            </div>

            <p className="mb-5 text-sm text-[var(--muted-text)]">
                Indikátor síly hesla reaguje na splněná pravidla a používá barvy řízené
                přes CSS proměnné.
            </p>

            <div className="grid gap-3 md:grid-cols-2">
                <div className={`rule-item ${hasMinLength ? "valid" : "invalid"}`}>
                    Délka alespoň 8 znaků: {hasMinLength ? "✅" : "❌"}
                </div>

                <div className={`rule-item ${hasUpperCase ? "valid" : "invalid"}`}>
                    Obsahuje velké písmeno: {hasUpperCase ? "✅" : "❌"}
                </div>

                <div className={`rule-item ${hasNumber ? "valid" : "invalid"}`}>
                    Obsahuje číslo: {hasNumber ? "✅" : "❌"}
                </div>

                <div className={`rule-item ${hasSpecialChar ? "valid" : "invalid"}`}>
                    Obsahuje speciální znak (!@#$%^&*): {hasSpecialChar ? "✅" : "❌"}
                </div>
            </div>

            <div className="mt-5 rounded-2xl info-box p-4">
                <h3 className="font-semibold">
                    {isValid
                        ? "Heslo je dostatečně silné 💪"
                        : "Heslo nesplňuje všechny požadavky ⚠️"}
                </h3>
            </div>
        </div>
    );
};

export default PasswordStrength;