import { useEffect, useState } from "react";

type CountryFlagValidatorProps = {
    password: string;
};

const countries = [
    "AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ",
    "BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS",
    "BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN",
    "CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE",
    "EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF",
    "GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM",
    "HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM",
    "JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC",
    "LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK",
    "ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA",
    "NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG",
    "PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW",
    "SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS",
    "ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO",
    "TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI",
    "VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"
];

const CountryFlagValidator = ({ password }: CountryFlagValidatorProps) => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const randomCountry =
            countries[Math.floor(Math.random() * countries.length)];
        setSelectedCountry(randomCountry);
    }, []);

    useEffect(() => {
        if (!selectedCountry) return;

        const normalizedPassword = password.toUpperCase();
        const normalizedCountry = selectedCountry.toUpperCase();

        setIsValid(normalizedPassword.includes(normalizedCountry));
    }, [password, selectedCountry]);

    const flagUrl = selectedCountry
        ? `https://flagsapi.com/${selectedCountry}/flat/64.png`
        : "";

    return (
        <div>
            <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">Validace podle vlajky</h2>
                <span className="rounded-full px-3 py-1 text-sm font-semibold badge-soft">
                    {selectedCountry ? `Země: ${selectedCountry}` : "Načítání..."}
                </span>
            </div>

            {selectedCountry && (
                <div className="mb-4 flex items-center gap-4">
                    <img
                        src={flagUrl}
                        alt={`Vlajka státu ${selectedCountry}`}
                        className="h-12 w-auto rounded-md border"
                    />

                    <div>
                        <p className="font-medium">
                            Heslo musí obsahovat zkratku země: <strong>{selectedCountry}</strong>
                        </p>
                        <p className="text-sm text-[var(--muted-text)]">
                            Kontrola probíhá bez ohledu na velikost písmen.
                        </p>
                    </div>
                </div>
            )}

            {password.length > 0 && selectedCountry && (
                <div className={`rule-item ${isValid ? "valid" : "invalid"}`}>
                    {isValid
                        ? `Heslo obsahuje zkratku země: ${selectedCountry} ✅`
                        : `Heslo neobsahuje zkratku země: ${selectedCountry} ❌`}
                </div>
            )}

            {password.length === 0 && (
                <div className="rule-item invalid">
                    Nejprve zadej heslo pro ověření této podmínky.
                </div>
            )}
        </div>
    );
};

export default CountryFlagValidator;