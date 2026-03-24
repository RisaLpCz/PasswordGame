import {useState} from "react";

type PasswordInputProps = {
    value: string;
    onChange: (value: string) => void;
};

const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <label
                className="mb-2 block text-sm font-medium text-[var(--text-color)]"
            >
                Heslo
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Zadej heslo..."
                    className="flex-1 rounded-2xl px-4 py-3 outline-none transition input-custom"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="rounded-2xl px-5 py-3 font-semibold transition btn-primary whitespace-nowrap"
                >
                    {showPassword ? "Skrýt" : "Zobrazit"}
                </button>
            </div>

            <p className="mt-2 text-xs text-[var(--muted-text)]">
                Kliknutím na tlačítko můžeš heslo zobrazit nebo skrýt.
            </p>
        </div>
    );
};

export default PasswordInput;