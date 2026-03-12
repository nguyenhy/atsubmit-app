const getOffsetTimezone = (timeZone = "UTC", date = new Date()) => {
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
    return (tzDate.getTime() - utcDate.getTime()) / (3600 * 1000);
};

export const getSupportedTimezones = () => {
    const now = new Date();

    return Intl.supportedValuesOf("timeZone")
        .map((tz) => {
            const offset = getOffsetTimezone(tz, now);

            const sign = offset >= 0 ? "+" : "-";
            const abs = Math.abs(offset);
            const hours = Math.floor(abs);
            const minutes = Math.round((abs - hours) * 60);

            const offsetLabel =
                minutes === 0
                    ? `${sign}${hours}`
                    : `${sign}${hours}:${minutes.toString().padStart(2, "0")}`;

            return {
                offset,
                value: tz,
                label: `(UTC${offsetLabel}) ${tz.replace(/_/g, " ")}`,
            };
        })
        .sort((a, b) => a.offset - b.offset);
};

export const SUPPORTED_TIMEZONE_OPTIONS = [
    {
        offset: -11,
        value: "Pacific/Midway",
        label: "(UTC-11) Pacific/Midway",
    },
    {
        offset: -11,
        value: "Pacific/Niue",
        label: "(UTC-11) Pacific/Niue",
    },
    {
        offset: -11,
        value: "Pacific/Pago_Pago",
        label: "(UTC-11) Pacific/Pago Pago",
    },
    {
        offset: -10,
        value: "Pacific/Honolulu",
        label: "(UTC-10) Pacific/Honolulu",
    },
    {
        offset: -10,
        value: "Pacific/Rarotonga",
        label: "(UTC-10) Pacific/Rarotonga",
    },
    {
        offset: -10,
        value: "Pacific/Tahiti",
        label: "(UTC-10) Pacific/Tahiti",
    },
    {
        offset: -9.5,
        value: "Pacific/Marquesas",
        label: "(UTC-9:30) Pacific/Marquesas",
    },
    {
        offset: -9,
        value: "America/Adak",
        label: "(UTC-9) America/Adak",
    },
    {
        offset: -9,
        value: "Pacific/Gambier",
        label: "(UTC-9) Pacific/Gambier",
    },
    {
        offset: -8,
        value: "America/Anchorage",
        label: "(UTC-8) America/Anchorage",
    },
    {
        offset: -8,
        value: "America/Juneau",
        label: "(UTC-8) America/Juneau",
    },
    {
        offset: -8,
        value: "America/Metlakatla",
        label: "(UTC-8) America/Metlakatla",
    },
    {
        offset: -8,
        value: "America/Nome",
        label: "(UTC-8) America/Nome",
    },
    {
        offset: -8,
        value: "America/Sitka",
        label: "(UTC-8) America/Sitka",
    },
    {
        offset: -8,
        value: "America/Yakutat",
        label: "(UTC-8) America/Yakutat",
    },
    {
        offset: -8,
        value: "Pacific/Pitcairn",
        label: "(UTC-8) Pacific/Pitcairn",
    },
    {
        offset: -7,
        value: "America/Creston",
        label: "(UTC-7) America/Creston",
    },
    {
        offset: -7,
        value: "America/Dawson",
        label: "(UTC-7) America/Dawson",
    },
    {
        offset: -7,
        value: "America/Dawson_Creek",
        label: "(UTC-7) America/Dawson Creek",
    },
    {
        offset: -7,
        value: "America/Fort_Nelson",
        label: "(UTC-7) America/Fort Nelson",
    },
    {
        offset: -7,
        value: "America/Hermosillo",
        label: "(UTC-7) America/Hermosillo",
    },
    {
        offset: -7,
        value: "America/Los_Angeles",
        label: "(UTC-7) America/Los Angeles",
    },
    {
        offset: -7,
        value: "America/Mazatlan",
        label: "(UTC-7) America/Mazatlan",
    },
    {
        offset: -7,
        value: "America/Phoenix",
        label: "(UTC-7) America/Phoenix",
    },
    {
        offset: -7,
        value: "America/Tijuana",
        label: "(UTC-7) America/Tijuana",
    },
    {
        offset: -7,
        value: "America/Vancouver",
        label: "(UTC-7) America/Vancouver",
    },
    {
        offset: -7,
        value: "America/Whitehorse",
        label: "(UTC-7) America/Whitehorse",
    },
    {
        offset: -6,
        value: "America/Bahia_Banderas",
        label: "(UTC-6) America/Bahia Banderas",
    },
    {
        offset: -6,
        value: "America/Belize",
        label: "(UTC-6) America/Belize",
    },
    {
        offset: -6,
        value: "America/Boise",
        label: "(UTC-6) America/Boise",
    },
    {
        offset: -6,
        value: "America/Cambridge_Bay",
        label: "(UTC-6) America/Cambridge Bay",
    },
    {
        offset: -6,
        value: "America/Chihuahua",
        label: "(UTC-6) America/Chihuahua",
    },
    {
        offset: -6,
        value: "America/Ciudad_Juarez",
        label: "(UTC-6) America/Ciudad Juarez",
    },
    {
        offset: -6,
        value: "America/Costa_Rica",
        label: "(UTC-6) America/Costa Rica",
    },
    {
        offset: -6,
        value: "America/Denver",
        label: "(UTC-6) America/Denver",
    },
    {
        offset: -6,
        value: "America/Edmonton",
        label: "(UTC-6) America/Edmonton",
    },
    {
        offset: -6,
        value: "America/El_Salvador",
        label: "(UTC-6) America/El Salvador",
    },
    {
        offset: -6,
        value: "America/Guatemala",
        label: "(UTC-6) America/Guatemala",
    },
    {
        offset: -6,
        value: "America/Inuvik",
        label: "(UTC-6) America/Inuvik",
    },
    {
        offset: -6,
        value: "America/Managua",
        label: "(UTC-6) America/Managua",
    },
    {
        offset: -6,
        value: "America/Merida",
        label: "(UTC-6) America/Merida",
    },
    {
        offset: -6,
        value: "America/Mexico_City",
        label: "(UTC-6) America/Mexico City",
    },
    {
        offset: -6,
        value: "America/Monterrey",
        label: "(UTC-6) America/Monterrey",
    },
    {
        offset: -6,
        value: "America/Regina",
        label: "(UTC-6) America/Regina",
    },
    {
        offset: -6,
        value: "America/Swift_Current",
        label: "(UTC-6) America/Swift Current",
    },
    {
        offset: -6,
        value: "America/Tegucigalpa",
        label: "(UTC-6) America/Tegucigalpa",
    },
    {
        offset: -6,
        value: "Pacific/Galapagos",
        label: "(UTC-6) Pacific/Galapagos",
    },
    {
        offset: -5,
        value: "America/Bogota",
        label: "(UTC-5) America/Bogota",
    },
    {
        offset: -5,
        value: "America/Cancun",
        label: "(UTC-5) America/Cancun",
    },
    {
        offset: -5,
        value: "America/Cayman",
        label: "(UTC-5) America/Cayman",
    },
    {
        offset: -5,
        value: "America/Chicago",
        label: "(UTC-5) America/Chicago",
    },
    {
        offset: -5,
        value: "America/Coral_Harbour",
        label: "(UTC-5) America/Coral Harbour",
    },
    {
        offset: -5,
        value: "America/Eirunepe",
        label: "(UTC-5) America/Eirunepe",
    },
    {
        offset: -5,
        value: "America/Guayaquil",
        label: "(UTC-5) America/Guayaquil",
    },
    {
        offset: -5,
        value: "America/Indiana/Knox",
        label: "(UTC-5) America/Indiana/Knox",
    },
    {
        offset: -5,
        value: "America/Indiana/Tell_City",
        label: "(UTC-5) America/Indiana/Tell City",
    },
    {
        offset: -5,
        value: "America/Jamaica",
        label: "(UTC-5) America/Jamaica",
    },
    {
        offset: -5,
        value: "America/Lima",
        label: "(UTC-5) America/Lima",
    },
    {
        offset: -5,
        value: "America/Matamoros",
        label: "(UTC-5) America/Matamoros",
    },
    {
        offset: -5,
        value: "America/Menominee",
        label: "(UTC-5) America/Menominee",
    },
    {
        offset: -5,
        value: "America/North_Dakota/Beulah",
        label: "(UTC-5) America/North Dakota/Beulah",
    },
    {
        offset: -5,
        value: "America/North_Dakota/Center",
        label: "(UTC-5) America/North Dakota/Center",
    },
    {
        offset: -5,
        value: "America/North_Dakota/New_Salem",
        label: "(UTC-5) America/North Dakota/New Salem",
    },
    {
        offset: -5,
        value: "America/Ojinaga",
        label: "(UTC-5) America/Ojinaga",
    },
    {
        offset: -5,
        value: "America/Panama",
        label: "(UTC-5) America/Panama",
    },
    {
        offset: -5,
        value: "America/Rankin_Inlet",
        label: "(UTC-5) America/Rankin Inlet",
    },
    {
        offset: -5,
        value: "America/Resolute",
        label: "(UTC-5) America/Resolute",
    },
    {
        offset: -5,
        value: "America/Rio_Branco",
        label: "(UTC-5) America/Rio Branco",
    },
    {
        offset: -5,
        value: "America/Winnipeg",
        label: "(UTC-5) America/Winnipeg",
    },
    {
        offset: -5,
        value: "Pacific/Easter",
        label: "(UTC-5) Pacific/Easter",
    },
    {
        offset: -4,
        value: "America/Anguilla",
        label: "(UTC-4) America/Anguilla",
    },
    {
        offset: -4,
        value: "America/Antigua",
        label: "(UTC-4) America/Antigua",
    },
    {
        offset: -4,
        value: "America/Aruba",
        label: "(UTC-4) America/Aruba",
    },
    {
        offset: -4,
        value: "America/Barbados",
        label: "(UTC-4) America/Barbados",
    },
    {
        offset: -4,
        value: "America/Blanc-Sablon",
        label: "(UTC-4) America/Blanc-Sablon",
    },
    {
        offset: -4,
        value: "America/Boa_Vista",
        label: "(UTC-4) America/Boa Vista",
    },
    {
        offset: -4,
        value: "America/Campo_Grande",
        label: "(UTC-4) America/Campo Grande",
    },
    {
        offset: -4,
        value: "America/Caracas",
        label: "(UTC-4) America/Caracas",
    },
    {
        offset: -4,
        value: "America/Cuiaba",
        label: "(UTC-4) America/Cuiaba",
    },
    {
        offset: -4,
        value: "America/Curacao",
        label: "(UTC-4) America/Curacao",
    },
    {
        offset: -4,
        value: "America/Detroit",
        label: "(UTC-4) America/Detroit",
    },
    {
        offset: -4,
        value: "America/Dominica",
        label: "(UTC-4) America/Dominica",
    },
    {
        offset: -4,
        value: "America/Grand_Turk",
        label: "(UTC-4) America/Grand Turk",
    },
    {
        offset: -4,
        value: "America/Grenada",
        label: "(UTC-4) America/Grenada",
    },
    {
        offset: -4,
        value: "America/Guadeloupe",
        label: "(UTC-4) America/Guadeloupe",
    },
    {
        offset: -4,
        value: "America/Guyana",
        label: "(UTC-4) America/Guyana",
    },
    {
        offset: -4,
        value: "America/Havana",
        label: "(UTC-4) America/Havana",
    },
    {
        offset: -4,
        value: "America/Indiana/Marengo",
        label: "(UTC-4) America/Indiana/Marengo",
    },
    {
        offset: -4,
        value: "America/Indiana/Petersburg",
        label: "(UTC-4) America/Indiana/Petersburg",
    },
    {
        offset: -4,
        value: "America/Indiana/Vevay",
        label: "(UTC-4) America/Indiana/Vevay",
    },
    {
        offset: -4,
        value: "America/Indiana/Vincennes",
        label: "(UTC-4) America/Indiana/Vincennes",
    },
    {
        offset: -4,
        value: "America/Indiana/Winamac",
        label: "(UTC-4) America/Indiana/Winamac",
    },
    {
        offset: -4,
        value: "America/Indianapolis",
        label: "(UTC-4) America/Indianapolis",
    },
    {
        offset: -4,
        value: "America/Iqaluit",
        label: "(UTC-4) America/Iqaluit",
    },
    {
        offset: -4,
        value: "America/Kentucky/Monticello",
        label: "(UTC-4) America/Kentucky/Monticello",
    },
    {
        offset: -4,
        value: "America/Kralendijk",
        label: "(UTC-4) America/Kralendijk",
    },
    {
        offset: -4,
        value: "America/La_Paz",
        label: "(UTC-4) America/La Paz",
    },
    {
        offset: -4,
        value: "America/Louisville",
        label: "(UTC-4) America/Louisville",
    },
    {
        offset: -4,
        value: "America/Lower_Princes",
        label: "(UTC-4) America/Lower Princes",
    },
    {
        offset: -4,
        value: "America/Manaus",
        label: "(UTC-4) America/Manaus",
    },
    {
        offset: -4,
        value: "America/Marigot",
        label: "(UTC-4) America/Marigot",
    },
    {
        offset: -4,
        value: "America/Martinique",
        label: "(UTC-4) America/Martinique",
    },
    {
        offset: -4,
        value: "America/Montserrat",
        label: "(UTC-4) America/Montserrat",
    },
    {
        offset: -4,
        value: "America/Nassau",
        label: "(UTC-4) America/Nassau",
    },
    {
        offset: -4,
        value: "America/New_York",
        label: "(UTC-4) America/New York",
    },
    {
        offset: -4,
        value: "America/Port-au-Prince",
        label: "(UTC-4) America/Port-au-Prince",
    },
    {
        offset: -4,
        value: "America/Port_of_Spain",
        label: "(UTC-4) America/Port of Spain",
    },
    {
        offset: -4,
        value: "America/Porto_Velho",
        label: "(UTC-4) America/Porto Velho",
    },
    {
        offset: -4,
        value: "America/Puerto_Rico",
        label: "(UTC-4) America/Puerto Rico",
    },
    {
        offset: -4,
        value: "America/Santo_Domingo",
        label: "(UTC-4) America/Santo Domingo",
    },
    {
        offset: -4,
        value: "America/St_Barthelemy",
        label: "(UTC-4) America/St Barthelemy",
    },
    {
        offset: -4,
        value: "America/St_Kitts",
        label: "(UTC-4) America/St Kitts",
    },
    {
        offset: -4,
        value: "America/St_Lucia",
        label: "(UTC-4) America/St Lucia",
    },
    {
        offset: -4,
        value: "America/St_Thomas",
        label: "(UTC-4) America/St Thomas",
    },
    {
        offset: -4,
        value: "America/St_Vincent",
        label: "(UTC-4) America/St Vincent",
    },
    {
        offset: -4,
        value: "America/Toronto",
        label: "(UTC-4) America/Toronto",
    },
    {
        offset: -4,
        value: "America/Tortola",
        label: "(UTC-4) America/Tortola",
    },
    {
        offset: -3,
        value: "America/Araguaina",
        label: "(UTC-3) America/Araguaina",
    },
    {
        offset: -3,
        value: "America/Argentina/La_Rioja",
        label: "(UTC-3) America/Argentina/La Rioja",
    },
    {
        offset: -3,
        value: "America/Argentina/Rio_Gallegos",
        label: "(UTC-3) America/Argentina/Rio Gallegos",
    },
    {
        offset: -3,
        value: "America/Argentina/Salta",
        label: "(UTC-3) America/Argentina/Salta",
    },
    {
        offset: -3,
        value: "America/Argentina/San_Juan",
        label: "(UTC-3) America/Argentina/San Juan",
    },
    {
        offset: -3,
        value: "America/Argentina/San_Luis",
        label: "(UTC-3) America/Argentina/San Luis",
    },
    {
        offset: -3,
        value: "America/Argentina/Tucuman",
        label: "(UTC-3) America/Argentina/Tucuman",
    },
    {
        offset: -3,
        value: "America/Argentina/Ushuaia",
        label: "(UTC-3) America/Argentina/Ushuaia",
    },
    {
        offset: -3,
        value: "America/Asuncion",
        label: "(UTC-3) America/Asuncion",
    },
    {
        offset: -3,
        value: "America/Bahia",
        label: "(UTC-3) America/Bahia",
    },
    {
        offset: -3,
        value: "America/Belem",
        label: "(UTC-3) America/Belem",
    },
    {
        offset: -3,
        value: "America/Buenos_Aires",
        label: "(UTC-3) America/Buenos Aires",
    },
    {
        offset: -3,
        value: "America/Catamarca",
        label: "(UTC-3) America/Catamarca",
    },
    {
        offset: -3,
        value: "America/Cayenne",
        label: "(UTC-3) America/Cayenne",
    },
    {
        offset: -3,
        value: "America/Cordoba",
        label: "(UTC-3) America/Cordoba",
    },
    {
        offset: -3,
        value: "America/Coyhaique",
        label: "(UTC-3) America/Coyhaique",
    },
    {
        offset: -3,
        value: "America/Fortaleza",
        label: "(UTC-3) America/Fortaleza",
    },
    {
        offset: -3,
        value: "America/Glace_Bay",
        label: "(UTC-3) America/Glace Bay",
    },
    {
        offset: -3,
        value: "America/Goose_Bay",
        label: "(UTC-3) America/Goose Bay",
    },
    {
        offset: -3,
        value: "America/Halifax",
        label: "(UTC-3) America/Halifax",
    },
    {
        offset: -3,
        value: "America/Jujuy",
        label: "(UTC-3) America/Jujuy",
    },
    {
        offset: -3,
        value: "America/Maceio",
        label: "(UTC-3) America/Maceio",
    },
    {
        offset: -3,
        value: "America/Mendoza",
        label: "(UTC-3) America/Mendoza",
    },
    {
        offset: -3,
        value: "America/Moncton",
        label: "(UTC-3) America/Moncton",
    },
    {
        offset: -3,
        value: "America/Montevideo",
        label: "(UTC-3) America/Montevideo",
    },
    {
        offset: -3,
        value: "America/Paramaribo",
        label: "(UTC-3) America/Paramaribo",
    },
    {
        offset: -3,
        value: "America/Punta_Arenas",
        label: "(UTC-3) America/Punta Arenas",
    },
    {
        offset: -3,
        value: "America/Recife",
        label: "(UTC-3) America/Recife",
    },
    {
        offset: -3,
        value: "America/Santarem",
        label: "(UTC-3) America/Santarem",
    },
    {
        offset: -3,
        value: "America/Santiago",
        label: "(UTC-3) America/Santiago",
    },
    {
        offset: -3,
        value: "America/Sao_Paulo",
        label: "(UTC-3) America/Sao Paulo",
    },
    {
        offset: -3,
        value: "America/Thule",
        label: "(UTC-3) America/Thule",
    },
    {
        offset: -3,
        value: "Antarctica/Palmer",
        label: "(UTC-3) Antarctica/Palmer",
    },
    {
        offset: -3,
        value: "Antarctica/Rothera",
        label: "(UTC-3) Antarctica/Rothera",
    },
    {
        offset: -3,
        value: "Atlantic/Bermuda",
        label: "(UTC-3) Atlantic/Bermuda",
    },
    {
        offset: -3,
        value: "Atlantic/Stanley",
        label: "(UTC-3) Atlantic/Stanley",
    },
    {
        offset: -2.5,
        value: "America/St_Johns",
        label: "(UTC-2:30) America/St Johns",
    },
    {
        offset: -2,
        value: "America/Godthab",
        label: "(UTC-2) America/Godthab",
    },
    {
        offset: -2,
        value: "America/Miquelon",
        label: "(UTC-2) America/Miquelon",
    },
    {
        offset: -2,
        value: "America/Noronha",
        label: "(UTC-2) America/Noronha",
    },
    {
        offset: -2,
        value: "America/Scoresbysund",
        label: "(UTC-2) America/Scoresbysund",
    },
    {
        offset: -2,
        value: "Atlantic/South_Georgia",
        label: "(UTC-2) Atlantic/South Georgia",
    },
    {
        offset: -1,
        value: "Atlantic/Azores",
        label: "(UTC-1) Atlantic/Azores",
    },
    {
        offset: -1,
        value: "Atlantic/Cape_Verde",
        label: "(UTC-1) Atlantic/Cape Verde",
    },
    {
        offset: 0,
        value: "Africa/Abidjan",
        label: "(UTC+0) Africa/Abidjan",
    },
    {
        offset: 0,
        value: "Africa/Accra",
        label: "(UTC+0) Africa/Accra",
    },
    {
        offset: 0,
        value: "Africa/Bamako",
        label: "(UTC+0) Africa/Bamako",
    },
    {
        offset: 0,
        value: "Africa/Banjul",
        label: "(UTC+0) Africa/Banjul",
    },
    {
        offset: 0,
        value: "Africa/Bissau",
        label: "(UTC+0) Africa/Bissau",
    },
    {
        offset: 0,
        value: "Africa/Casablanca",
        label: "(UTC+0) Africa/Casablanca",
    },
    {
        offset: 0,
        value: "Africa/Conakry",
        label: "(UTC+0) Africa/Conakry",
    },
    {
        offset: 0,
        value: "Africa/Dakar",
        label: "(UTC+0) Africa/Dakar",
    },
    {
        offset: 0,
        value: "Africa/El_Aaiun",
        label: "(UTC+0) Africa/El Aaiun",
    },
    {
        offset: 0,
        value: "Africa/Freetown",
        label: "(UTC+0) Africa/Freetown",
    },
    {
        offset: 0,
        value: "Africa/Lome",
        label: "(UTC+0) Africa/Lome",
    },
    {
        offset: 0,
        value: "Africa/Monrovia",
        label: "(UTC+0) Africa/Monrovia",
    },
    {
        offset: 0,
        value: "Africa/Nouakchott",
        label: "(UTC+0) Africa/Nouakchott",
    },
    {
        offset: 0,
        value: "Africa/Ouagadougou",
        label: "(UTC+0) Africa/Ouagadougou",
    },
    {
        offset: 0,
        value: "Africa/Sao_Tome",
        label: "(UTC+0) Africa/Sao Tome",
    },
    {
        offset: 0,
        value: "America/Danmarkshavn",
        label: "(UTC+0) America/Danmarkshavn",
    },
    {
        offset: 0,
        value: "Antarctica/Troll",
        label: "(UTC+0) Antarctica/Troll",
    },
    {
        offset: 0,
        value: "Atlantic/Canary",
        label: "(UTC+0) Atlantic/Canary",
    },
    {
        offset: 0,
        value: "Atlantic/Faeroe",
        label: "(UTC+0) Atlantic/Faeroe",
    },
    {
        offset: 0,
        value: "Atlantic/Madeira",
        label: "(UTC+0) Atlantic/Madeira",
    },
    {
        offset: 0,
        value: "Atlantic/Reykjavik",
        label: "(UTC+0) Atlantic/Reykjavik",
    },
    {
        offset: 0,
        value: "Atlantic/St_Helena",
        label: "(UTC+0) Atlantic/St Helena",
    },
    {
        offset: 0,
        value: "Europe/Dublin",
        label: "(UTC+0) Europe/Dublin",
    },
    {
        offset: 0,
        value: "Europe/Guernsey",
        label: "(UTC+0) Europe/Guernsey",
    },
    {
        offset: 0,
        value: "Europe/Isle_of_Man",
        label: "(UTC+0) Europe/Isle of Man",
    },
    {
        offset: 0,
        value: "Europe/Jersey",
        label: "(UTC+0) Europe/Jersey",
    },
    {
        offset: 0,
        value: "Europe/Lisbon",
        label: "(UTC+0) Europe/Lisbon",
    },
    {
        offset: 0,
        value: "Europe/London",
        label: "(UTC+0) Europe/London",
    },
    {
        offset: 1,
        value: "Africa/Algiers",
        label: "(UTC+1) Africa/Algiers",
    },
    {
        offset: 1,
        value: "Africa/Bangui",
        label: "(UTC+1) Africa/Bangui",
    },
    {
        offset: 1,
        value: "Africa/Brazzaville",
        label: "(UTC+1) Africa/Brazzaville",
    },
    {
        offset: 1,
        value: "Africa/Ceuta",
        label: "(UTC+1) Africa/Ceuta",
    },
    {
        offset: 1,
        value: "Africa/Douala",
        label: "(UTC+1) Africa/Douala",
    },
    {
        offset: 1,
        value: "Africa/Kinshasa",
        label: "(UTC+1) Africa/Kinshasa",
    },
    {
        offset: 1,
        value: "Africa/Lagos",
        label: "(UTC+1) Africa/Lagos",
    },
    {
        offset: 1,
        value: "Africa/Libreville",
        label: "(UTC+1) Africa/Libreville",
    },
    {
        offset: 1,
        value: "Africa/Luanda",
        label: "(UTC+1) Africa/Luanda",
    },
    {
        offset: 1,
        value: "Africa/Malabo",
        label: "(UTC+1) Africa/Malabo",
    },
    {
        offset: 1,
        value: "Africa/Ndjamena",
        label: "(UTC+1) Africa/Ndjamena",
    },
    {
        offset: 1,
        value: "Africa/Niamey",
        label: "(UTC+1) Africa/Niamey",
    },
    {
        offset: 1,
        value: "Africa/Porto-Novo",
        label: "(UTC+1) Africa/Porto-Novo",
    },
    {
        offset: 1,
        value: "Africa/Tunis",
        label: "(UTC+1) Africa/Tunis",
    },
    {
        offset: 1,
        value: "Arctic/Longyearbyen",
        label: "(UTC+1) Arctic/Longyearbyen",
    },
    {
        offset: 1,
        value: "Europe/Amsterdam",
        label: "(UTC+1) Europe/Amsterdam",
    },
    {
        offset: 1,
        value: "Europe/Andorra",
        label: "(UTC+1) Europe/Andorra",
    },
    {
        offset: 1,
        value: "Europe/Belgrade",
        label: "(UTC+1) Europe/Belgrade",
    },
    {
        offset: 1,
        value: "Europe/Berlin",
        label: "(UTC+1) Europe/Berlin",
    },
    {
        offset: 1,
        value: "Europe/Bratislava",
        label: "(UTC+1) Europe/Bratislava",
    },
    {
        offset: 1,
        value: "Europe/Brussels",
        label: "(UTC+1) Europe/Brussels",
    },
    {
        offset: 1,
        value: "Europe/Budapest",
        label: "(UTC+1) Europe/Budapest",
    },
    {
        offset: 1,
        value: "Europe/Busingen",
        label: "(UTC+1) Europe/Busingen",
    },
    {
        offset: 1,
        value: "Europe/Copenhagen",
        label: "(UTC+1) Europe/Copenhagen",
    },
    {
        offset: 1,
        value: "Europe/Gibraltar",
        label: "(UTC+1) Europe/Gibraltar",
    },
    {
        offset: 1,
        value: "Europe/Ljubljana",
        label: "(UTC+1) Europe/Ljubljana",
    },
    {
        offset: 1,
        value: "Europe/Luxembourg",
        label: "(UTC+1) Europe/Luxembourg",
    },
    {
        offset: 1,
        value: "Europe/Madrid",
        label: "(UTC+1) Europe/Madrid",
    },
    {
        offset: 1,
        value: "Europe/Malta",
        label: "(UTC+1) Europe/Malta",
    },
    {
        offset: 1,
        value: "Europe/Monaco",
        label: "(UTC+1) Europe/Monaco",
    },
    {
        offset: 1,
        value: "Europe/Oslo",
        label: "(UTC+1) Europe/Oslo",
    },
    {
        offset: 1,
        value: "Europe/Paris",
        label: "(UTC+1) Europe/Paris",
    },
    {
        offset: 1,
        value: "Europe/Podgorica",
        label: "(UTC+1) Europe/Podgorica",
    },
    {
        offset: 1,
        value: "Europe/Prague",
        label: "(UTC+1) Europe/Prague",
    },
    {
        offset: 1,
        value: "Europe/Rome",
        label: "(UTC+1) Europe/Rome",
    },
    {
        offset: 1,
        value: "Europe/San_Marino",
        label: "(UTC+1) Europe/San Marino",
    },
    {
        offset: 1,
        value: "Europe/Sarajevo",
        label: "(UTC+1) Europe/Sarajevo",
    },
    {
        offset: 1,
        value: "Europe/Skopje",
        label: "(UTC+1) Europe/Skopje",
    },
    {
        offset: 1,
        value: "Europe/Stockholm",
        label: "(UTC+1) Europe/Stockholm",
    },
    {
        offset: 1,
        value: "Europe/Tirane",
        label: "(UTC+1) Europe/Tirane",
    },
    {
        offset: 1,
        value: "Europe/Vaduz",
        label: "(UTC+1) Europe/Vaduz",
    },
    {
        offset: 1,
        value: "Europe/Vatican",
        label: "(UTC+1) Europe/Vatican",
    },
    {
        offset: 1,
        value: "Europe/Vienna",
        label: "(UTC+1) Europe/Vienna",
    },
    {
        offset: 1,
        value: "Europe/Warsaw",
        label: "(UTC+1) Europe/Warsaw",
    },
    {
        offset: 1,
        value: "Europe/Zagreb",
        label: "(UTC+1) Europe/Zagreb",
    },
    {
        offset: 1,
        value: "Europe/Zurich",
        label: "(UTC+1) Europe/Zurich",
    },
    {
        offset: 2,
        value: "Africa/Blantyre",
        label: "(UTC+2) Africa/Blantyre",
    },
    {
        offset: 2,
        value: "Africa/Bujumbura",
        label: "(UTC+2) Africa/Bujumbura",
    },
    {
        offset: 2,
        value: "Africa/Cairo",
        label: "(UTC+2) Africa/Cairo",
    },
    {
        offset: 2,
        value: "Africa/Gaborone",
        label: "(UTC+2) Africa/Gaborone",
    },
    {
        offset: 2,
        value: "Africa/Harare",
        label: "(UTC+2) Africa/Harare",
    },
    {
        offset: 2,
        value: "Africa/Johannesburg",
        label: "(UTC+2) Africa/Johannesburg",
    },
    {
        offset: 2,
        value: "Africa/Juba",
        label: "(UTC+2) Africa/Juba",
    },
    {
        offset: 2,
        value: "Africa/Khartoum",
        label: "(UTC+2) Africa/Khartoum",
    },
    {
        offset: 2,
        value: "Africa/Kigali",
        label: "(UTC+2) Africa/Kigali",
    },
    {
        offset: 2,
        value: "Africa/Lubumbashi",
        label: "(UTC+2) Africa/Lubumbashi",
    },
    {
        offset: 2,
        value: "Africa/Lusaka",
        label: "(UTC+2) Africa/Lusaka",
    },
    {
        offset: 2,
        value: "Africa/Maputo",
        label: "(UTC+2) Africa/Maputo",
    },
    {
        offset: 2,
        value: "Africa/Maseru",
        label: "(UTC+2) Africa/Maseru",
    },
    {
        offset: 2,
        value: "Africa/Mbabane",
        label: "(UTC+2) Africa/Mbabane",
    },
    {
        offset: 2,
        value: "Africa/Tripoli",
        label: "(UTC+2) Africa/Tripoli",
    },
    {
        offset: 2,
        value: "Africa/Windhoek",
        label: "(UTC+2) Africa/Windhoek",
    },
    {
        offset: 2,
        value: "Asia/Beirut",
        label: "(UTC+2) Asia/Beirut",
    },
    {
        offset: 2,
        value: "Asia/Famagusta",
        label: "(UTC+2) Asia/Famagusta",
    },
    {
        offset: 2,
        value: "Asia/Gaza",
        label: "(UTC+2) Asia/Gaza",
    },
    {
        offset: 2,
        value: "Asia/Hebron",
        label: "(UTC+2) Asia/Hebron",
    },
    {
        offset: 2,
        value: "Asia/Jerusalem",
        label: "(UTC+2) Asia/Jerusalem",
    },
    {
        offset: 2,
        value: "Asia/Nicosia",
        label: "(UTC+2) Asia/Nicosia",
    },
    {
        offset: 2,
        value: "Europe/Athens",
        label: "(UTC+2) Europe/Athens",
    },
    {
        offset: 2,
        value: "Europe/Bucharest",
        label: "(UTC+2) Europe/Bucharest",
    },
    {
        offset: 2,
        value: "Europe/Chisinau",
        label: "(UTC+2) Europe/Chisinau",
    },
    {
        offset: 2,
        value: "Europe/Helsinki",
        label: "(UTC+2) Europe/Helsinki",
    },
    {
        offset: 2,
        value: "Europe/Kaliningrad",
        label: "(UTC+2) Europe/Kaliningrad",
    },
    {
        offset: 2,
        value: "Europe/Kiev",
        label: "(UTC+2) Europe/Kiev",
    },
    {
        offset: 2,
        value: "Europe/Mariehamn",
        label: "(UTC+2) Europe/Mariehamn",
    },
    {
        offset: 2,
        value: "Europe/Riga",
        label: "(UTC+2) Europe/Riga",
    },
    {
        offset: 2,
        value: "Europe/Sofia",
        label: "(UTC+2) Europe/Sofia",
    },
    {
        offset: 2,
        value: "Europe/Tallinn",
        label: "(UTC+2) Europe/Tallinn",
    },
    {
        offset: 2,
        value: "Europe/Vilnius",
        label: "(UTC+2) Europe/Vilnius",
    },
    {
        offset: 3,
        value: "Africa/Addis_Ababa",
        label: "(UTC+3) Africa/Addis Ababa",
    },
    {
        offset: 3,
        value: "Africa/Asmera",
        label: "(UTC+3) Africa/Asmera",
    },
    {
        offset: 3,
        value: "Africa/Dar_es_Salaam",
        label: "(UTC+3) Africa/Dar es Salaam",
    },
    {
        offset: 3,
        value: "Africa/Djibouti",
        label: "(UTC+3) Africa/Djibouti",
    },
    {
        offset: 3,
        value: "Africa/Kampala",
        label: "(UTC+3) Africa/Kampala",
    },
    {
        offset: 3,
        value: "Africa/Mogadishu",
        label: "(UTC+3) Africa/Mogadishu",
    },
    {
        offset: 3,
        value: "Africa/Nairobi",
        label: "(UTC+3) Africa/Nairobi",
    },
    {
        offset: 3,
        value: "Antarctica/Syowa",
        label: "(UTC+3) Antarctica/Syowa",
    },
    {
        offset: 3,
        value: "Asia/Aden",
        label: "(UTC+3) Asia/Aden",
    },
    {
        offset: 3,
        value: "Asia/Amman",
        label: "(UTC+3) Asia/Amman",
    },
    {
        offset: 3,
        value: "Asia/Baghdad",
        label: "(UTC+3) Asia/Baghdad",
    },
    {
        offset: 3,
        value: "Asia/Bahrain",
        label: "(UTC+3) Asia/Bahrain",
    },
    {
        offset: 3,
        value: "Asia/Damascus",
        label: "(UTC+3) Asia/Damascus",
    },
    {
        offset: 3,
        value: "Asia/Kuwait",
        label: "(UTC+3) Asia/Kuwait",
    },
    {
        offset: 3,
        value: "Asia/Qatar",
        label: "(UTC+3) Asia/Qatar",
    },
    {
        offset: 3,
        value: "Asia/Riyadh",
        label: "(UTC+3) Asia/Riyadh",
    },
    {
        offset: 3,
        value: "Europe/Istanbul",
        label: "(UTC+3) Europe/Istanbul",
    },
    {
        offset: 3,
        value: "Europe/Kirov",
        label: "(UTC+3) Europe/Kirov",
    },
    {
        offset: 3,
        value: "Europe/Minsk",
        label: "(UTC+3) Europe/Minsk",
    },
    {
        offset: 3,
        value: "Europe/Moscow",
        label: "(UTC+3) Europe/Moscow",
    },
    {
        offset: 3,
        value: "Europe/Simferopol",
        label: "(UTC+3) Europe/Simferopol",
    },
    {
        offset: 3,
        value: "Europe/Volgograd",
        label: "(UTC+3) Europe/Volgograd",
    },
    {
        offset: 3,
        value: "Indian/Antananarivo",
        label: "(UTC+3) Indian/Antananarivo",
    },
    {
        offset: 3,
        value: "Indian/Comoro",
        label: "(UTC+3) Indian/Comoro",
    },
    {
        offset: 3,
        value: "Indian/Mayotte",
        label: "(UTC+3) Indian/Mayotte",
    },
    {
        offset: 3.5,
        value: "Asia/Tehran",
        label: "(UTC+3:30) Asia/Tehran",
    },
    {
        offset: 4,
        value: "Asia/Baku",
        label: "(UTC+4) Asia/Baku",
    },
    {
        offset: 4,
        value: "Asia/Dubai",
        label: "(UTC+4) Asia/Dubai",
    },
    {
        offset: 4,
        value: "Asia/Muscat",
        label: "(UTC+4) Asia/Muscat",
    },
    {
        offset: 4,
        value: "Asia/Tbilisi",
        label: "(UTC+4) Asia/Tbilisi",
    },
    {
        offset: 4,
        value: "Asia/Yerevan",
        label: "(UTC+4) Asia/Yerevan",
    },
    {
        offset: 4,
        value: "Europe/Astrakhan",
        label: "(UTC+4) Europe/Astrakhan",
    },
    {
        offset: 4,
        value: "Europe/Samara",
        label: "(UTC+4) Europe/Samara",
    },
    {
        offset: 4,
        value: "Europe/Saratov",
        label: "(UTC+4) Europe/Saratov",
    },
    {
        offset: 4,
        value: "Europe/Ulyanovsk",
        label: "(UTC+4) Europe/Ulyanovsk",
    },
    {
        offset: 4,
        value: "Indian/Mahe",
        label: "(UTC+4) Indian/Mahe",
    },
    {
        offset: 4,
        value: "Indian/Mauritius",
        label: "(UTC+4) Indian/Mauritius",
    },
    {
        offset: 4,
        value: "Indian/Reunion",
        label: "(UTC+4) Indian/Reunion",
    },
    {
        offset: 4.5,
        value: "Asia/Kabul",
        label: "(UTC+4:30) Asia/Kabul",
    },
    {
        offset: 5,
        value: "Antarctica/Mawson",
        label: "(UTC+5) Antarctica/Mawson",
    },
    {
        offset: 5,
        value: "Antarctica/Vostok",
        label: "(UTC+5) Antarctica/Vostok",
    },
    {
        offset: 5,
        value: "Asia/Almaty",
        label: "(UTC+5) Asia/Almaty",
    },
    {
        offset: 5,
        value: "Asia/Aqtau",
        label: "(UTC+5) Asia/Aqtau",
    },
    {
        offset: 5,
        value: "Asia/Aqtobe",
        label: "(UTC+5) Asia/Aqtobe",
    },
    {
        offset: 5,
        value: "Asia/Ashgabat",
        label: "(UTC+5) Asia/Ashgabat",
    },
    {
        offset: 5,
        value: "Asia/Atyrau",
        label: "(UTC+5) Asia/Atyrau",
    },
    {
        offset: 5,
        value: "Asia/Dushanbe",
        label: "(UTC+5) Asia/Dushanbe",
    },
    {
        offset: 5,
        value: "Asia/Karachi",
        label: "(UTC+5) Asia/Karachi",
    },
    {
        offset: 5,
        value: "Asia/Oral",
        label: "(UTC+5) Asia/Oral",
    },
    {
        offset: 5,
        value: "Asia/Qostanay",
        label: "(UTC+5) Asia/Qostanay",
    },
    {
        offset: 5,
        value: "Asia/Qyzylorda",
        label: "(UTC+5) Asia/Qyzylorda",
    },
    {
        offset: 5,
        value: "Asia/Samarkand",
        label: "(UTC+5) Asia/Samarkand",
    },
    {
        offset: 5,
        value: "Asia/Tashkent",
        label: "(UTC+5) Asia/Tashkent",
    },
    {
        offset: 5,
        value: "Asia/Yekaterinburg",
        label: "(UTC+5) Asia/Yekaterinburg",
    },
    {
        offset: 5,
        value: "Indian/Kerguelen",
        label: "(UTC+5) Indian/Kerguelen",
    },
    {
        offset: 5,
        value: "Indian/Maldives",
        label: "(UTC+5) Indian/Maldives",
    },
    {
        offset: 5.5,
        value: "Asia/Calcutta",
        label: "(UTC+5:30) Asia/Calcutta",
    },
    {
        offset: 5.5,
        value: "Asia/Colombo",
        label: "(UTC+5:30) Asia/Colombo",
    },
    {
        offset: 5.75,
        value: "Asia/Katmandu",
        label: "(UTC+5:45) Asia/Katmandu",
    },
    {
        offset: 6,
        value: "Asia/Bishkek",
        label: "(UTC+6) Asia/Bishkek",
    },
    {
        offset: 6,
        value: "Asia/Dhaka",
        label: "(UTC+6) Asia/Dhaka",
    },
    {
        offset: 6,
        value: "Asia/Omsk",
        label: "(UTC+6) Asia/Omsk",
    },
    {
        offset: 6,
        value: "Asia/Thimphu",
        label: "(UTC+6) Asia/Thimphu",
    },
    {
        offset: 6,
        value: "Asia/Urumqi",
        label: "(UTC+6) Asia/Urumqi",
    },
    {
        offset: 6,
        value: "Indian/Chagos",
        label: "(UTC+6) Indian/Chagos",
    },
    {
        offset: 6.5,
        value: "Asia/Rangoon",
        label: "(UTC+6:30) Asia/Rangoon",
    },
    {
        offset: 6.5,
        value: "Indian/Cocos",
        label: "(UTC+6:30) Indian/Cocos",
    },
    {
        offset: 7,
        value: "Antarctica/Davis",
        label: "(UTC+7) Antarctica/Davis",
    },
    {
        offset: 7,
        value: "Asia/Bangkok",
        label: "(UTC+7) Asia/Bangkok",
    },
    {
        offset: 7,
        value: "Asia/Barnaul",
        label: "(UTC+7) Asia/Barnaul",
    },
    {
        offset: 7,
        value: "Asia/Hovd",
        label: "(UTC+7) Asia/Hovd",
    },
    {
        offset: 7,
        value: "Asia/Jakarta",
        label: "(UTC+7) Asia/Jakarta",
    },
    {
        offset: 7,
        value: "Asia/Krasnoyarsk",
        label: "(UTC+7) Asia/Krasnoyarsk",
    },
    {
        offset: 7,
        value: "Asia/Novokuznetsk",
        label: "(UTC+7) Asia/Novokuznetsk",
    },
    {
        offset: 7,
        value: "Asia/Novosibirsk",
        label: "(UTC+7) Asia/Novosibirsk",
    },
    {
        offset: 7,
        value: "Asia/Phnom_Penh",
        label: "(UTC+7) Asia/Phnom Penh",
    },
    {
        offset: 7,
        value: "Asia/Pontianak",
        label: "(UTC+7) Asia/Pontianak",
    },
    {
        offset: 7,
        value: "Asia/Ho_Chi_Minh",
        label: "(UTC+7) Asia/Ho_Chi_Minh",
    },
    {
        offset: 7,
        value: "Asia/Tomsk",
        label: "(UTC+7) Asia/Tomsk",
    },
    {
        offset: 7,
        value: "Asia/Vientiane",
        label: "(UTC+7) Asia/Vientiane",
    },
    {
        offset: 7,
        value: "Indian/Christmas",
        label: "(UTC+7) Indian/Christmas",
    },
    {
        offset: 8,
        value: "Antarctica/Casey",
        label: "(UTC+8) Antarctica/Casey",
    },
    {
        offset: 8,
        value: "Asia/Brunei",
        label: "(UTC+8) Asia/Brunei",
    },
    {
        offset: 8,
        value: "Asia/Hong_Kong",
        label: "(UTC+8) Asia/Hong Kong",
    },
    {
        offset: 8,
        value: "Asia/Irkutsk",
        label: "(UTC+8) Asia/Irkutsk",
    },
    {
        offset: 8,
        value: "Asia/Kuala_Lumpur",
        label: "(UTC+8) Asia/Kuala Lumpur",
    },
    {
        offset: 8,
        value: "Asia/Kuching",
        label: "(UTC+8) Asia/Kuching",
    },
    {
        offset: 8,
        value: "Asia/Macau",
        label: "(UTC+8) Asia/Macau",
    },
    {
        offset: 8,
        value: "Asia/Makassar",
        label: "(UTC+8) Asia/Makassar",
    },
    {
        offset: 8,
        value: "Asia/Manila",
        label: "(UTC+8) Asia/Manila",
    },
    {
        offset: 8,
        value: "Asia/Shanghai",
        label: "(UTC+8) Asia/Shanghai",
    },
    {
        offset: 8,
        value: "Asia/Singapore",
        label: "(UTC+8) Asia/Singapore",
    },
    {
        offset: 8,
        value: "Asia/Taipei",
        label: "(UTC+8) Asia/Taipei",
    },
    {
        offset: 8,
        value: "Asia/Ulaanbaatar",
        label: "(UTC+8) Asia/Ulaanbaatar",
    },
    {
        offset: 8,
        value: "Australia/Perth",
        label: "(UTC+8) Australia/Perth",
    },
    {
        offset: 8.75,
        value: "Australia/Eucla",
        label: "(UTC+8:45) Australia/Eucla",
    },
    {
        offset: 9,
        value: "Asia/Chita",
        label: "(UTC+9) Asia/Chita",
    },
    {
        offset: 9,
        value: "Asia/Dili",
        label: "(UTC+9) Asia/Dili",
    },
    {
        offset: 9,
        value: "Asia/Jayapura",
        label: "(UTC+9) Asia/Jayapura",
    },
    {
        offset: 9,
        value: "Asia/Khandyga",
        label: "(UTC+9) Asia/Khandyga",
    },
    {
        offset: 9,
        value: "Asia/Pyongyang",
        label: "(UTC+9) Asia/Pyongyang",
    },
    {
        offset: 9,
        value: "Asia/Seoul",
        label: "(UTC+9) Asia/Seoul",
    },
    {
        offset: 9,
        value: "Asia/Tokyo",
        label: "(UTC+9) Asia/Tokyo",
    },
    {
        offset: 9,
        value: "Asia/Yakutsk",
        label: "(UTC+9) Asia/Yakutsk",
    },
    {
        offset: 9,
        value: "Pacific/Palau",
        label: "(UTC+9) Pacific/Palau",
    },
    {
        offset: 9.5,
        value: "Australia/Darwin",
        label: "(UTC+9:30) Australia/Darwin",
    },
    {
        offset: 10,
        value: "Antarctica/DumontDUrville",
        label: "(UTC+10) Antarctica/DumontDUrville",
    },
    {
        offset: 10,
        value: "Asia/Ust-Nera",
        label: "(UTC+10) Asia/Ust-Nera",
    },
    {
        offset: 10,
        value: "Asia/Vladivostok",
        label: "(UTC+10) Asia/Vladivostok",
    },
    {
        offset: 10,
        value: "Australia/Brisbane",
        label: "(UTC+10) Australia/Brisbane",
    },
    {
        offset: 10,
        value: "Australia/Lindeman",
        label: "(UTC+10) Australia/Lindeman",
    },
    {
        offset: 10,
        value: "Pacific/Guam",
        label: "(UTC+10) Pacific/Guam",
    },
    {
        offset: 10,
        value: "Pacific/Port_Moresby",
        label: "(UTC+10) Pacific/Port Moresby",
    },
    {
        offset: 10,
        value: "Pacific/Saipan",
        label: "(UTC+10) Pacific/Saipan",
    },
    {
        offset: 10,
        value: "Pacific/Truk",
        label: "(UTC+10) Pacific/Truk",
    },
    {
        offset: 10.5,
        value: "Australia/Adelaide",
        label: "(UTC+10:30) Australia/Adelaide",
    },
    {
        offset: 10.5,
        value: "Australia/Broken_Hill",
        label: "(UTC+10:30) Australia/Broken Hill",
    },
    {
        offset: 11,
        value: "Antarctica/Macquarie",
        label: "(UTC+11) Antarctica/Macquarie",
    },
    {
        offset: 11,
        value: "Asia/Magadan",
        label: "(UTC+11) Asia/Magadan",
    },
    {
        offset: 11,
        value: "Asia/Sakhalin",
        label: "(UTC+11) Asia/Sakhalin",
    },
    {
        offset: 11,
        value: "Asia/Srednekolymsk",
        label: "(UTC+11) Asia/Srednekolymsk",
    },
    {
        offset: 11,
        value: "Australia/Hobart",
        label: "(UTC+11) Australia/Hobart",
    },
    {
        offset: 11,
        value: "Australia/Lord_Howe",
        label: "(UTC+11) Australia/Lord Howe",
    },
    {
        offset: 11,
        value: "Australia/Melbourne",
        label: "(UTC+11) Australia/Melbourne",
    },
    {
        offset: 11,
        value: "Australia/Sydney",
        label: "(UTC+11) Australia/Sydney",
    },
    {
        offset: 11,
        value: "Pacific/Bougainville",
        label: "(UTC+11) Pacific/Bougainville",
    },
    {
        offset: 11,
        value: "Pacific/Efate",
        label: "(UTC+11) Pacific/Efate",
    },
    {
        offset: 11,
        value: "Pacific/Guadalcanal",
        label: "(UTC+11) Pacific/Guadalcanal",
    },
    {
        offset: 11,
        value: "Pacific/Kosrae",
        label: "(UTC+11) Pacific/Kosrae",
    },
    {
        offset: 11,
        value: "Pacific/Noumea",
        label: "(UTC+11) Pacific/Noumea",
    },
    {
        offset: 11,
        value: "Pacific/Ponape",
        label: "(UTC+11) Pacific/Ponape",
    },
    {
        offset: 12,
        value: "Asia/Anadyr",
        label: "(UTC+12) Asia/Anadyr",
    },
    {
        offset: 12,
        value: "Asia/Kamchatka",
        label: "(UTC+12) Asia/Kamchatka",
    },
    {
        offset: 12,
        value: "Pacific/Fiji",
        label: "(UTC+12) Pacific/Fiji",
    },
    {
        offset: 12,
        value: "Pacific/Funafuti",
        label: "(UTC+12) Pacific/Funafuti",
    },
    {
        offset: 12,
        value: "Pacific/Kwajalein",
        label: "(UTC+12) Pacific/Kwajalein",
    },
    {
        offset: 12,
        value: "Pacific/Majuro",
        label: "(UTC+12) Pacific/Majuro",
    },
    {
        offset: 12,
        value: "Pacific/Nauru",
        label: "(UTC+12) Pacific/Nauru",
    },
    {
        offset: 12,
        value: "Pacific/Norfolk",
        label: "(UTC+12) Pacific/Norfolk",
    },
    {
        offset: 12,
        value: "Pacific/Tarawa",
        label: "(UTC+12) Pacific/Tarawa",
    },
    {
        offset: 12,
        value: "Pacific/Wake",
        label: "(UTC+12) Pacific/Wake",
    },
    {
        offset: 12,
        value: "Pacific/Wallis",
        label: "(UTC+12) Pacific/Wallis",
    },
    {
        offset: 13,
        value: "Antarctica/McMurdo",
        label: "(UTC+13) Antarctica/McMurdo",
    },
    {
        offset: 13,
        value: "Pacific/Apia",
        label: "(UTC+13) Pacific/Apia",
    },
    {
        offset: 13,
        value: "Pacific/Auckland",
        label: "(UTC+13) Pacific/Auckland",
    },
    {
        offset: 13,
        value: "Pacific/Enderbury",
        label: "(UTC+13) Pacific/Enderbury",
    },
    {
        offset: 13,
        value: "Pacific/Fakaofo",
        label: "(UTC+13) Pacific/Fakaofo",
    },
    {
        offset: 13,
        value: "Pacific/Tongatapu",
        label: "(UTC+13) Pacific/Tongatapu",
    },
    {
        offset: 13.75,
        value: "Pacific/Chatham",
        label: "(UTC+13:45) Pacific/Chatham",
    },
    {
        offset: 14,
        value: "Pacific/Kiritimati",
        label: "(UTC+14) Pacific/Kiritimati",
    },
];

export const SUPPORTED_TIMEZONE = SUPPORTED_TIMEZONE_OPTIONS.map(
    (item) => item.value,
);
