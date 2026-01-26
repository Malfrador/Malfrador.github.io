// Sample event data
const eventsData = {
    // The "Für Dich" section
    carousel: [
        {
            image: 'images/cardimage04.jpg', // Obvious lol
            category: 'Film & Kino', // Tag
            categoryColor: 'from-pink-200 to-pink-400', // Gradient colors for tag
            title: 'FLINTA* Filmeabend', // Event title
            location: 'Ulm Mitte', // Optional: Where the event takes place
            organiser: 'Sophia B.', // Optional: Who organizes the event
            date: '27.01.2026', // Date in DD.MM.YYYY format. Sorting actually works!
            time: '19:30 Uhr',
            description: 'Gemeinsam schauen wir sapphic Filme und diskutieren anschließend in gemütlicher Atmosphäre. Dieser Monat: Eine Auswahl preisgekrönter LGBTQIA+ Kurzfilme aus aller Welt.\n\nSnacks und Getränke sind vorhanden. Bringt gerne Decken und Kissen mit für maximale Gemütlichkeit!'
        },
        {
            image: 'images/cardimage02.jpg',
            category: 'Kultur',
            categoryColor: 'from-orange-200 to-orange-400',
            title: 'Queerer Spaziergang',
            location: 'Friedrichsau',
            organiser: '',
            date: '27.01.2026',
            time: '14:00-18:00',
            description: 'Gemeinsam spazieren wir durch den öffentlichen Raum und schaffen Sichtbarkeit für queeres Leben. Der Spaziergang bietet Raum für Austausch, Begegnung und gemeinsames Erleben in entspannter Atmosphäre. Alle queeren Menschen und Allies sind herzlich willkommen.'
        },
        {
            image: 'images/cardimage07.jpg',
            category: 'Workshop',
            categoryColor: 'from-blue-300 to-blue-500',
            title: 'Pottery Workshop',
            location: 'Künstlerhaus Ulm',
            organiser: 'Künstlerhaus Ulm',
            date: '30.01.2026',
            time: '18:00-20:00',
            description: 'Entdecke die meditative Kunst des Töpferns! In diesem Hands-on Workshop lernen wir die Grundlagen der Keramikgestaltung und erschaffen unsere eigenen Kunstwerke.\n\nAlle Materialien werden gestellt. Perfekt für Anfänger:innen und alle, die kreativ werden möchten. Deine Werke können nach dem Brennen abgeholt werden.'
        },
        {
            image: 'images/cardimage08.jpg',
            category: 'Kultur',
            categoryColor: 'from-purple-300 to-purple-500',
            title: 'Queere Künstler*innen Vernissage',
            location: 'Künstlerhaus Ulm',
            organiser: 'Künstlerhaus Ulm',
            date: '28.01.2026',
            time: '18:30',
            description: 'Diese Vernissage präsentiert Werke queerer Künstler*innen und schafft Raum für vielfältige Perspektiven, Ausdrucksformen und Begegnungen. In offener Atmosphäre laden Kunst und Gespräche dazu ein, queere Sichtbarkeit und Kreativität gemeinsam zu feiern. Alle sind herzlich willkommen.'
        },
        {
            image: 'images/cardimage05.jpg',
            category: 'Workshop',
            categoryColor: 'from-gray-300 to-gray-500',
            title: 'Awareness Workshop',
            location: 'THU Campus',
            organiser: 'PsychoSocial e.V.',
            date: '15.02.2026',
            time: '18:00-20:00',
            description: 'Der Awareness Workshop vermittelt Grundlagen für einen respektvollen und achtsamen Umgang miteinander. Gemeinsam beschäftigen wir uns mit Themen wie Diskriminierung, Grenzen und solidarischem Handeln und stärken so ein bewussteres Miteinander. Offen für alle Interessierten aus der FLINTA* Community.'
        }
    ],
    // The "Alle Events" section below that
    grid: [
        {
            image: 'images/cardimage05.jpg',
            category: 'Workshop',
            categoryColor: 'from-pink-300 to-pink-500',
            title: 'Awareness Workshop',
            location: 'THU Campus',
            organiser: 'PsychoSocial e.V.',
            date: '09.02.2026',
            time: '17:00-19:00',
            visible: true
        },
        {
            image: 'images/cardimage06.jpg',
            category: 'Hobbies & Freizeit',
            categoryColor: 'from-pink-300 to-pink-500',
            title: 'Queerer Buchclub',
            location: 'Stadtbibliothek',
            organiser: 'Privat ',
            date: '21.11.2026',
            time: '12:00-14:30',
            visible: true
        },
        {
            image: 'images/cardimage07.jpg',
            category: 'Workshop',
            categoryColor: 'from-pink-300 to-pink-500',
            title: 'Pottery Workshop',
            location: 'Künstlerhaus Ulm',
            organiser: 'Künstlerhaus Ulm',
            date: '08.08.2026',
            time: '18:00-20:00',
            visible: true
        },
        {
            image: 'images/cardimage01.jpg',
            category: 'Workshop',
            categoryColor: 'from-pink-300 to-pink-500',
            title: 'FLINTA* Coding Workshop',
            location: 'Online',
            organiser: 'THU Diversity Netzwerk',
            date: '15.02.2025',
            time: '19:00-21:00',
            visible: true
        },
        {
            image: 'images/cardimage08.jpg',
            category: 'Kultur',
            categoryColor: 'from-pink-300 to-pink-500',
            title: 'Queere Künstler*innen Vernissage',
            location: 'Künstlerhaus Ulm',
            organiser: 'Künstlerhaus Ulm',
            date: '24.05.2025',
            time: '12:00-22:00',
            visible: true
        },
    
    ]
};
