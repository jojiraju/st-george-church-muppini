export interface Ministry {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  president: string;
  membersCount: number;
  meetingTime: string;
  iconName: string; // Lucide icon mapping name
  image: string;
  activities: string[];
}

export const ministriesData: Ministry[] = [
  {
    id: "sunday-school",
    name: "Catechism School (St. George Faith Formation)",
    shortDescription: "Spiritual, biblical, and liturgical formation for children from Grade 1 to 12.",
    fullDescription: "The Sunday Catechism School is the backbone of our parish's faith transmission. Our dedicated team of 18 catechists educates over 250 students weekly in the Catholic faith, Holy Scripture, church history, liturgy, and Christian morals, ensuring a strong spiritual foundation.",
    president: "Mr. Thomas Abraham (Headmaster)",
    membersCount: 260,
    meetingTime: "Every Sunday 08:30 AM - 10:00 AM",
    iconName: "BookOpen",
    image: "/images/ministries-school.jpg",
    activities: [
      "Weekly doctrinal and biblical lessons",
      "Annual Bible Kalotsavam (Arts & Scripture Quiz Festival)",
      "Preparation for Holy Communion and Solemn Profession of Faith",
      "Summer VBS (Vacation Bible School) camps"
    ]
  },
  {
    id: "mcym",
    name: "Malankara Catholic Youth Movement (MCYM)",
    shortDescription: "Empowering Catholic youth (15-30 years) to live out their faith in prayer, service, and action.",
    fullDescription: "MCYM Edakkara Unit is an active, vibrant organization dedicated to the holistic growth of parish youth. Following the pillars of Prayer, Study, Social Service, and Fellowship, the youth take a leading role in community building and parish administration.",
    president: "Mr. Amal Joseph (President)",
    membersCount: 85,
    meetingTime: "Every Sunday 11:30 AM (Catechism Hall)",
    iconName: "Users",
    image: "/images/ministries-mcym.jpg",
    activities: [
      "Parish community service & blood donation camps",
      "Youth retreats, conventions, and dynamic seminars",
      "Liturgical choir assistance and festival coordination",
      "Charity visits to orphanages and old age homes"
    ]
  },
  {
    id: "mathruvedi",
    name: "Mathruvedi (Mothers' Association)",
    shortDescription: "Spiritual fellowship, family counseling, and parish welfare activities for mothers.",
    fullDescription: "Mathruvedi brings together the mothers of the parish, offering a supportive environment to grow in holiness and nurture Christian values in their families. Modelled after Saint Mary, the mothers actively organize family prayers, parish feasts, and direct support to poor families.",
    president: "Mrs. Leelamma George (President)",
    membersCount: 140,
    meetingTime: "First Sunday of every month at 11:30 AM",
    iconName: "Heart",
    image: "/images/ministries-mothers.jpg",
    activities: [
      "Koodarayogam (Ward prayer meeting) coordination",
      "Family counseling seminars and health checkup drives",
      "Cooking, flower arrangements, and support during parish festivals",
      "Widow welfare funds and student scholarship programs"
    ]
  },
  {
    id: "mca",
    name: "Malankara Catholic Association (MCA)",
    shortDescription: "Lay organization for male adult members, focused on social responsibility and parish development.",
    fullDescription: "MCA is the primary lay organization that unites the fathers and adult men of our parish. MCA is deeply committed to supporting the administrative needs of the church, protecting the civil rights of minorities, and initiating socio-economic development projects.",
    president: "Mr. Jacob Mathew (President)",
    membersCount: 110,
    meetingTime: "Second Sunday of every month at 11:30 AM",
    iconName: "Shield",
    image: "/images/ministries-mca.jpg",
    activities: [
      "Church maintenance and infrastructural development projects",
      "Awareness seminars on social, educational, and public issues",
      "Organizing parish feasts and logistical setups",
      "Financial assistance for marriages and medical emergencies"
    ]
  },
  {
    id: "vincent-de-paul",
    name: "St. Vincent De Paul Society (SVP)",
    shortDescription: "Dedicated lay charity society serving the poorest, sick, and marginalized families.",
    fullDescription: "SVP Edakkara Unit is an internationally affiliated charity group within the parish. Actively looking for the 'face of Christ' in the poor, the members raise and distribute funds, provide food rations, support medical treatments, and build homes for the destitute without distinction of creed or class.",
    president: "Mr. Varghese Joseph (President)",
    membersCount: 30,
    meetingTime: "Every Sunday 08:30 AM (SVP Office)",
    iconName: "Gift",
    image: "/images/ministries-svp.jpg",
    activities: [
      "Weekly home visits to distressed families",
      "Monthly grocery kits distribution to 40+ families",
      "Sponsorship of school books and educational expenses for poor kids",
      "Critical medical surgery funding and home renovations"
    ]
  },
  {
    id: "church-choir",
    name: "St. George Sacred Liturgical Choir",
    shortDescription: "Enriching the Holy Qurbana through angelic West Syrian chants and classical hymns.",
    fullDescription: "Our parish choir is dedicated to elevating the sacred liturgy through rich West Syrian liturgical singing. With over 25 talented vocalists and keyboard accompanists, the choir guides the assembly to full spiritual participation in Sunday Qurbanas and major church feasts.",
    president: "Mr. Jose Sebastian (Choir Master)",
    membersCount: 28,
    meetingTime: "Every Friday at 05:00 PM (Church Gallery)",
    iconName: "Music",
    image: "/images/ministries-choir.jpg",
    activities: [
      "Liturgy singing for all Sundays and feasts",
      "Weekly choir practice and learning traditional Syriac hymns",
      "Annual Christmas Carol service and parish musical programs",
      "Recording devotionals and participating in inter-parish competitions"
    ]
  }
];
