import {useEffect, useState} from "react";
import "./App.css";
import PasswordInput from "./PasswordInput";
import PasswordStrength from "./PasswordStrength";
import CharacterSequenceValidator from "./CharacterSequenceValidator";
import PasswordTimeValidator from "./PasswordTimeValidator";
import CountryFlagValidator from "./CountryFlagValidator.tsx";

function App() {
    const [password, setPassword] = useState("");
    const [createAt, setCreateAt] = useState<Date | null>(null);
    const [score, setScore] = useState(0);

    const handlePasswordChange = (value: string) => {
        if (!createAt && value.length > 0) {
            setCreateAt(new Date());
        }

        if (value.length === 0) {
            setCreateAt(null);
        }

        setPassword(value);
    };

    const evaluatePassword = (password: string) => {
        const score =
            Number(password.length >= 8) +
            Number(/[A-Z]/.test(password)) +
            Number(/\d/.test(password)) +
            Number(/[!@#$%^&*]/.test(password));

        return score;
    };

    const choosePasswordStrenght = () => {
        let output;

        if (score == 0) {
            output = "Zadejte heslo"
        } else if (score == 1) {
            output = "Slabé heslo 🔴";
        } else if (score <= 3) {
            output = "Středně silné heslo 🟡";
        } else {
            output = "Silné heslo 🟢";
        }
        return output;
    }

    useEffect(() => {
        const result = evaluatePassword(password);
        setScore(result);
    }, [password]);

    useEffect(() => {
        const passwordStr = choosePasswordStrenght();
        document.title = `Síla hesla: ${passwordStr}`;
    }, [score]);

    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword(prevPassword => {
                const action = Math.random() < 0.5 ? 'add' : 'remove';
                if (action === 'add') {
                    return prevPassword + "😜";
                } else {
                    if (prevPassword.length === 0) return prevPassword;
                    const index = Math.floor(Math.random() * prevPassword.length);
                    return prevPassword.slice(0, index) + prevPassword.slice(index + 1);
                }
            });
        }, 10000)
        return () => clearInterval(sabotageInterval);
    }, []);

    return (
        <div className="min-h-screen app-shell px-4 py-10">
            <div className="mx-auto w-full max-w-2xl">
                <div className="app-card rounded-3xl border p-6 md:p-8 shadow-2xl">
                    <div className="mb-8 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary-color)]">
                            Password Checker
                        </p>
                        <h1 className="mt-2 text-3xl md:text-4xl font-bold">
                            Kontrola síly hesla
                        </h1>
                        <p className="mt-3 text-sm md:text-base text-[var(--muted-text)]">
                            Aplikace ověřuje základní pravidla silného hesla, kontroluje
                            sekvenci znaků a zkoumá, zda heslo nevzniklo podezřele rychle.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="section-box rounded-2xl p-5">
                            <PasswordInput value={password} onChange={handlePasswordChange} />
                        </div>

                        <div className="section-box rounded-2xl p-5">
                            <PasswordStrength password={password} score={score} />
                        </div>

                        <div className="section-box rounded-2xl p-5">
                            <CountryFlagValidator password={password} />
                        </div>

                        <div className="section-box rounded-2xl p-5">
                            <CharacterSequenceValidator password={password} />
                        </div>

                        {createAt && (
                            <div className="section-box rounded-2xl p-5">
                                <PasswordTimeValidator password={password} createAt={createAt} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;