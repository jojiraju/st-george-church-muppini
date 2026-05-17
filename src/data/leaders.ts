export interface ClergyProfile {
  id: string;
  name: string;
  role: string;
  designation: string;
  image: string;
  description: string;
  contact?: string;
  email?: string;
  order: number;
}

export interface CouncilMember {
  id: string;
  name: string;
  role: string;
  ward: string;
  phone?: string;
  image?: string;
}

export const clergyProfiles: ClergyProfile[] = [
  {
    id: "catholicos",
    name: "Moran Mor Baselios Cleemis Catholicos",
    role: "Major Archbishop-Catholicos",
    designation: "Head of the Syro-Malankara Catholic Church",
    image: "/images/mor-baselios-cleemis.jpg", // Real Catholicos image uploaded by user!
    description: "His Beatitude Moran Mor Baselios Cleemis Catholicos is the Major Archbishop-Catholicos of the Syro-Malankara Catholic Church and the Archbishop of Trivandrum. He is the shepherd of our universal Malankara Catholic community, guiding us with apostolic wisdom, peace, and spiritual strength.",
    order: 1
  },
  {
    id: "bishop",
    name: "His Excellency Dr. Joseph Mar Thomas",
    role: "Diocesan Archbishop",
    designation: "Bishop of the Eparchy of Bathery",
    image: "/images/joseph-mar-thomas.jpg", // Real Bishop image uploaded by user!
    description: "His Excellency Dr. Joseph Mar Thomas is the Bishop of the Eparchy of Sultan Bathery, under which St. George Church Edakkara is canonically administered. An outstanding spiritual shepherd, scholar, and social builder, he guides our diocese with developmental vision and theological clarity.",
    order: 2
  },
  {
    id: "vicar",
    name: "Rev. Fr. Thomas Kaloor",
    role: "Parish Vicar",
    designation: "Chief Shepherd of St. George Edakkara",
    image: "/images/fr-thomas-kaloor.jpg", // Real vicar image uploaded by user!
    description: "Rev. Fr. Thomas Kaloor serves as the Parish Vicar of St. George Church, Edakkara. Leading with pastoral zeal, deep spiritual commitment, and community outreach, Father Thomas administers liturgical services, guides the parish administration, and provides spiritual counsel to all parish families.",
    contact: "+91 94473 60714",
    email: "thomaskaloor.vicar@gmail.com",
    order: 3
  },
];

export const councilMembers: CouncilMember[] = [
  {
    id: "trustee-1",
    name: "Mr. Abraham Valel (എബ്രഹാം വാലേൽ)",
    role: "Parish Trustee (ട്രസ്റ്റി)",
    ward: "St. Thomas Ward (Edakkara Town)",
    phone: "+91 94471 00010",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300" // elegant dummy image
  },
  {
    id: "secretary",
    name: "Mr. Josh Mayilil (ജോഷ് മലയിൽ)",
    role: "Parish Secretary (സെക്രട്ടറി)",
    ward: "St. Sebastian's Ward (Kozhikkode Road)",
    phone: "+91 94473 00020",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" // elegant dummy image
  },
  {
    id: "trustee-2",
    name: "Mr. Shaji Varghese Vadakkethil",
    role: "Parish Joint Trustee",
    ward: "St. Mary's Ward (Munda)",
    phone: "+91 94472 00002",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300" // elegant dummy image
  },
];
