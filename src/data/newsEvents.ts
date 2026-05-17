export interface NewsEvent {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  type: "news" | "event";
  date: string;
  time?: string;
  location?: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const newsEventsData: NewsEvent[] = [
  {
    id: "st-george-feast-2026",
    title: "Annual Grand Feast of St. George (Edakkara Perunnal 2026)",
    excerpt: "Join us in celebrating our Patron Saint George's Feast. Ten days of prayer, solemn liturgy, traditional procession (Rasa), and devotional cultural programs.",
    content: `We joyfully invite all the faithful to our parish's most sacred event of the year – the Annual Feast of St. George (Edakkara Perunnal 2026), celebrated from April 24th to May 3rd, 2026.

This year's feast will be blessed by the presence of our Bishop and visiting clergy from the Archparchy.

### Key Highlights of the Celebration:
*   **Flag Hoisting (Kodiyeettu):** April 24, 05:30 PM by Parish Vicar Rev. Fr. Thomas Kaloor.
*   **Daily Devotion:** 06:30 AM Holy Qurbana, followed by Novena of St. George & special blessings of vehicles, agricultural crops, and families.
*   **Solemn Liturgical Celebrations:** Presided over by high dignitaries.
*   **Grand Liturgical Procession (Rasa):** May 2nd, starting at 05:00 PM. Thousands of faithful carrying traditional decorated silk umbrellas (Muthukkuda), gold crosses, and candles will march through Edakkara town reciting prayers.
*   **Eucharistic Benediction & Feast Day Liturgy:** May 3rd, 09:30 AM, led by His Excellency.
*   **Love Feast (Nercha Sadhya):** Traditional lunch distributed to all attendees on the final day.

Come, seek the powerful intercession of St. George, the valiant martyr who conquered the dragon of evil, and receive abundant graces.`,
    type: "event",
    date: "2026-04-24",
    time: "07:00 AM - 09:00 PM",
    location: "St. George Church Campus & Edakkara Town",
    image: "/images/st-george-feast.jpg",
    tags: ["Feast", "Solemn Liturgy", "Procession"],
    featured: true
  },
  {
    id: "snehasparsham-housing-project",
    title: "Snehasparsham 2026: Building Homes for the Homeless",
    excerpt: "St. George Parish launches 'Snehasparsham' community housing project, targeting to build 5 concrete homes for underprivileged families in Edakkara parish territory.",
    content: `Under the guidance of the Parish Council and in remembrance of the golden jubilee of our parish foundation, St. George Malankara Catholic Church is proud to launch **'Snehasparsham 2026'**.

This social charity mission aims to construct five sustainable concrete homes for families who do not own land or have safe houses, regardless of their caste or religion.

### How You Can Participate:
1.  **Direct Donation:** You can sponsor a full room, a concrete slab, or make a general donation towards the construction fund via our Donations portal.
2.  **Volunteer Labor:** Join our construction brigade on Saturdays. We welcome volunteers to help with masonry, painting, and landscaping.
3.  **Material Contribution:** Donations in the form of cement, bricks, steel, or sand are highly welcomed. Please contact the Parish Office or Church Trustees.

### Timeline:
*   **Phase 1 (Site Selection & Foundation):** May 2026
*   **Phase 2 (Structure & Roofing):** July 2026
*   **Phase 3 (Finishing & Key Handover):** September 2026 (On the Feast of Nativity of Mary)

Let us show our faith through acts of mercy and love. 'Truly I tell you, whatever you did for one of the least of these brothers and sisters of mine, you did for me.' (Matthew 25:40)`,
    type: "news",
    date: "2026-05-15",
    image: "/images/charity-housing.jpg",
    tags: ["Charity", "Social Work", "Snehasparsham"],
    featured: true
  },
  {
    id: "catechism-reopening-2026",
    title: "Sunday Catechism School Re-Opening for Academic Year 2026-27",
    excerpt: "Catechism classes resume on June 7th. Registration open for new students (Grade 1-12). Holy Qurbana blessing ceremony will be held for all children.",
    content: `We are gearing up for the next session of spiritual learning and moral formation. The Sunday Catechism School (St. George Faith Formation Directorate) will reopen for the Academic Year 2026-2027 on **Sunday, June 7th, 2026**.

All children of the parish are required to attend these classes to strengthen their faith and understanding of the Catholic Church's traditions.

### Re-Opening Day Schedule:
*   **08:30 AM:** Solemn Holy Liturgy for children and parents.
*   **09:45 AM:** Special Rite of Blessing & Anointing of the Holy Spirit for students, teachers, and textbooks.
*   **10:15 AM:** Assembly in the Parish Hall, followed by classroom distribution and introductory sessions with class teachers.

### Registration Details:
*   New admissions (Grade 1 students and children newly moved to the parish) can register at the Parish Office.
*   Please bring the Child's Baptism Certificate copy and Parish Family Book.
*   Registration forms are available online and at the church entrance counters.

Let us assist our young minds to grow in wisdom, age, and grace.`,
    type: "event",
    date: "2026-06-07",
    time: "08:30 AM - 11:30 AM",
    location: "Church & Parish Catechism Block",
    image: "/images/catechism.jpg",
    tags: ["Sunday School", "Faith Formation", "Children"],
    featured: false
  },
  {
    id: "parish-council-election-results",
    title: "New Parish Council and Trustees Appointed for 2026-2028",
    excerpt: "Parish assembly elects new trustees and parish council council members. Rev. Fr. Thomas Kaloor welcomes the new leadership team.",
    content: `The General Parish Assembly (Pothuyogam) of St. George Malankara Catholic Church Edakkara, held on May 10th, 2026, has elected the new Parish Council and Administrative Trustees for the biennial term of **2026-2028**.

The election was held under the supervision of Rev. Fr. Thomas Kaloor, Vicar, and was confirmed by the Archparchy office.

### Appointed Office Bearers:
*   **Vicar & President:** Rev. Fr. Thomas Kaloor
*   **Parish Trustee (Finance & Admin):** Mr. Abraham Valel (എബ്രഹാം വാലേൽ)
*   **Parish Joint Trustee:** Mr. Shaji Varghese Vadakkethil
*   **Parish Council Secretary:** Mr. Josh Mayilil (ജോഷ് മലയിൽ)

Over 25 wards representatives were elected to serve the various prayer groups (Koodara Yogams) across the Edakkara parish boundaries. We express our deepest gratitude to the outgoing council for their selfless service, especially in leading the golden jubilee infrastructure renovations.

Let us pray for the new leaders that they may guide our parish with wisdom, humility, and spiritual foresight.`,
    type: "news",
    date: "2026-05-12",
    image: "/images/council-meeting.jpg",
    tags: ["Parish Council", "Administration", "Election"],
    featured: false
  },
  {
    id: "mcym-youth-bible-convention",
    title: "MCYM Diocesan Youth Convention & Retreat 2026",
    excerpt: "A three-day spiritual empowerment camp for youngsters aged 15-30, filled with praise and worship, dynamic sessions, counseling, and communion.",
    content: `The Malankara Catholic Youth Movement (MCYM) of Edakkara Unit is organizing the Diocesan Youth Convention & Spiritual Retreat from **May 22 to May 24, 2026**.

This retreat is designed to help the youth connect deeper with Jesus Christ amidst the noise of the modern digital world.

### Theme:
*"You are the light of the world. A town built on a hill cannot be hidden."* - Matthew 5:14

### Program Activities:
*   **Praise and Worship:** Energetic gospel band music and Eucharistic Adoration.
*   **Keynote Seminars:** Led by renowned Catholic speakers and counselors on topics like career, relationships, digital mental health, and modern Catholic ethics.
*   **Counseling & Confession:** Dedicated spiritual direction and sacramental reconciliation slots.
*   **Campfire Communion:** Inter-parish interactive games, sharing circles, and acoustic music.

### Registration:
*   Open to all youth members.
*   Registration fee: ₹150 (Includes food and study kits).
*   Register online through the Parish MCYM portal or with the MCYM secretary.

Be ready to be transformed!`,
    type: "event",
    date: "2026-05-22",
    time: "Friday 04:00 PM - Sunday 05:00 PM",
    location: "Mount Carmel Retreat Centre & Parish Hall",
    image: "/images/youth-camp.jpg",
    tags: ["MCYM", "Youth", "Retreat", "Convention"],
    featured: false
  }
];
