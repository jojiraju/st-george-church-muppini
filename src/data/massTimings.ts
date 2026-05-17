export interface MassTiming {
  day: string;
  time: string;
  type: string;
  language: string;
  notes?: string;
}

export interface ConfessionTiming {
  day: string;
  time: string;
  location: string;
}

export interface NovenaTiming {
  name: string;
  day: string;
  time: string;
  details: string;
}

export const weeklyMassSchedule: MassTiming[] = [
  {
    day: "Sunday (ഞായർ)",
    time: "07:00 AM",
    type: "Morning Prayers & Holy Qurbana (പ്രഭാത നമസ്കാരം, വിശുദ്ധ കുർബ്ബാന)",
    language: "Malayalam",
    notes: "Solemn Syro-Malankara Divine Liturgy"
  },
  {
    day: "Weekdays (തിങ്കൾ - ശനി)",
    time: "07:00 AM",
    type: "Holy Qurbana (വിശുദ്ധ കുർബ്ബാന)",
    language: "Malayalam",
    notes: "Daily Holy Qurbana"
  }
];

export const confessionSchedule: ConfessionTiming[] = [
  {
    day: "Saturday",
    time: "04:30 PM - 06:00 PM",
    location: "Main Confessional Booths"
  },
  {
    day: "Sunday",
    time: "06:30 AM - 07:00 AM",
    location: "Main Confessional Booths"
  },
  {
    day: "Weekdays",
    time: "Upon request before/after Liturgy",
    location: "Vicar's Office / Confessional Booth"
  }
];

export const novenaSchedule: NovenaTiming[] = [
  {
    name: "Novena of St. George",
    day: "Saturday",
    time: "08:00 AM (Immediately after Holy Qurbana)",
    details: "Intercession prayers for protection, spiritual strength, and victory over evil forces. Special blessing of relics."
  },
  {
    name: "Novena of Our Lady of Perpetual Help",
    day: "Saturday",
    time: "06:30 PM",
    details: "Evening rosary, solemn novena prayers, and Eucharistic benediction."
  },
  {
    name: "Novena of St. Anthony of Padua",
    day: "Tuesday",
    time: "07:15 AM",
    details: "Devotion for lost things, recovery, and blessing of bread for the underprivileged."
  }
];

export const liturgicalSeasons = {
  currentSeason: "Season of Pentecost (Slihe)",
  liturgicalRite: "Syro-Malankara Catholic Rite (West Syrian Liturgical Tradition)",
  colors: {
    name: "Red / White",
    significance: "Martyrdom of St. George / Apostolic Descent of the Holy Spirit"
  }
};
