type CharacterSequenceValidatorProps = {
    password: string;
};

const CharacterSequenceValidator = ({
                                        password,
                                    }: CharacterSequenceValidatorProps) => {
    const sequenceRegex = /[a-z][A-Z][0-9][!@#$%^&*]/;
    const foundSequence = sequenceRegex.test(password);
    const matches = password.match(/[a-z][A-Z][0-9][!@#$%^&*]/g);
    const count = matches ? matches.length : 0;

    return (
        <div>
            <h2 className="mb-4 text-xl font-semibold">Sekvence znaků</h2>

            <div className={`rule-item ${foundSequence ? "valid" : "invalid"}`}>
                Jeden malý znak, jeden velký znak, jedno číslo a jeden speciální znak za
                sebou: {foundSequence ? "✅" : "❌"}
            </div>

            <div className="mt-3 rounded-2xl info-box p-4">
                <p className="font-medium">
                    Počet nalezených sekvencí:{" "}
                    <span className="text-[var(--primary-color)] font-bold">{count}</span>
                </p>
                <p className="mt-2 text-sm text-[var(--muted-text)]">
                    Kontroluje se výskyt posloupnosti ve formátu malé písmeno → velké
                    písmeno → číslo → speciální znak.
                </p>
            </div>
        </div>
    );
};

export default CharacterSequenceValidator;