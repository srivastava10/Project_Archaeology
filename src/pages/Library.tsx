import React from 'react';
import { Book, Users } from 'lucide-react';

const Library = () => {
  const manuscripts = [
    {
      id: 1,
      title: "Ancient Indian Architecture",
      author: "Dr. R. S. Sharma",
      year: "1985",
      description: "A comprehensive study of ancient Indian architectural styles and techniques.",
      category: "Architecture"
    },
    {
      id: 2,
      title: "Harappan Civilization: A Study",
      author: "Prof. B. B. Lal",
      year: "1997",
      description: "Detailed analysis of the Harappan civilization's urban planning and culture.",
      category: "Archaeology"
    },
    {
      id: 3,
      title: "Temple Architecture of South India",
      author: "Dr. M. A. Dhaky",
      year: "2001",
      description: "In-depth exploration of Dravidian temple architecture and its evolution.",
      category: "Architecture"
    },
    {
      id: 4,
      title: "Buddhist Art and Architecture",
      author: "Dr. A. K. Singh",
      year: "2000",
      description: "Study of Buddhist art forms and architectural elements across India.",
      category: "Art History"
    },
    {
      id: 5,
      title: "Chola Manuscripts",
      author: "Dr. B.K Aggarwal",
      year: "1983",
      description: "Digital Manuscripts of Chola Dynasty",
      category: "Manuscripts"
    },
    {
      id: 6,
      title: "Weapons of the Pandya Dynasty",
      author: "Dr. K.P. Smitha",
      year: "2005",
      description: "Study of Buddhist art forms and architectural elements across India.",
      category: "Art History"
    }
  ];

  // Sample data for archaeologists
  const archaeologists = [
    {
      id: 1,
      name: "Archaeologist 1",
      specialization: "Artefact Analysis",
      achievements: [
        "Advanced analysis of artefacts",
        "Authored 20+ research papers",
        "Recipient of Archaeological Society of India Award"
      ],
      image: ""
    },
    {
      id: 2,
      name: "Archaeologist 2",
      specialization: "Indus Valley Civilization",
      achievements: [
        "Led excavations at Kalibangan",
        "Pioneered research in Harappan studies",
        "Authored seminal works on ancient India"
      ],
      image: ""
    },
    {
      id: 3,
      name: "Archaeologist 3",
      specialization: "Prehistoric Archaeology",
      achievements: [
        "Expert in Stone Age cultures",
        "Discovered important prehistoric sites",
        "Mentored numerous archaeologists"
      ],
      image: ""
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-texture">
      <div className="container py-8">
        {/* Manuscripts Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Book className="h-6 w-6 text-terracotta" />
            <h2 className="text-2xl font-bold text-stone">Digital Archaeological Library</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manuscripts.map((manuscript) => (
              <div
                key={manuscript.id}
                className="bg-parchment/80 backdrop-blur-sm border border-bronze/30 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-stone mb-2">{manuscript.title}</h3>
                <p className="text-stone/80 mb-1">
                  <span className="font-medium">Author:</span> {manuscript.author}
                </p>
                <p className="text-stone/80 mb-1">
                  <span className="font-medium">Year:</span> {manuscript.year}
                </p>
                <p className="text-stone/80 mb-2">
                  <span className="font-medium">Category:</span> {manuscript.category}
                </p>
                <p className="text-stone/80">{manuscript.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Archaeologists Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-6 w-6 text-terracotta" />
            <h2 className="text-2xl font-bold text-stone">Meet Other Archaeologists</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archaeologists.map((archaeologist) => (
              <div
                key={archaeologist.id}
                className="bg-parchment/80 backdrop-blur-sm border border-bronze/30 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square w-full bg-stone/10 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-stone/40">Image Placeholder</span>
                </div>
                <h3 className="text-xl font-semibold text-stone mb-2">{archaeologist.name}</h3>
                <p className="text-stone/80 mb-2">
                  <span className="font-medium">Specialization:</span> {archaeologist.specialization}
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-stone">Known For:</p>
                  <ul className="list-disc list-inside text-stone/80">
                    {archaeologist.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Library; 