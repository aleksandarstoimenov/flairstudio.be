/* Flair Studio — liste des projets.
   Pour ajouter un projet : copier un bloc { ... }, changer les textes et les images (dans assets/img/).
   "ratio" = largeur / hauteur de l'image, "video": chemin d'une vidéo (assets/vid/…) à lire à la place de l'image dans le diaporama ; l'image sert d'aperçu.
   "stages" = étapes pour les filtres de la page Work (Competition, Permit, Design process, Marketing, Animation) ;
   les projets sans architecte n'en ont pas.
   "hidden": true garde le projet ici mais le retire du site (navigation projet précédent / suivant). */
window.FLAIR_PROJECTS = [
  {
    "id": "maison-des-pins",
    "title": "Maison des Pins",
    "client": "Atelier Grès",
    "programme": "Private residence",
    "location": "Belgium",
    "work": "3D renders, 3D animation",
    "stages": [
      "Marketing",
      "Animation"
    ],
    "text": "A timber house among pine trees, built around a planted courtyard. We kept the light soft and the forest close in every view, so the house reads as part of its site rather than placed on it. The film follows the same quiet rhythm, from the path through the trees to the rooms inside.",
    "images": [
      {
        "src": "assets/img/maison-des-pins-2.jpg",
        "ratio": "4 / 5",
        "alt": "Frame from the film: the house among the pines",
        "video": "assets/vid/video_001.mp4"
      },
      {
        "src": "assets/img/maison-des-pins-1.jpg",
        "ratio": "1700 / 1153",
        "alt": "The courtyard seen from under the timber roof",
        "video": false
      },
      {
        "src": "assets/img/maison-des-pins-3.jpg",
        "ratio": "1120 / 1600",
        "alt": "Living room with a fireplace and a view of the garden",
        "video": false
      },
      {
        "src": "assets/img/maison-des-pins-4.jpg",
        "ratio": "1 / 1",
        "alt": "The house seen through the pine forest",
        "video": false
      },
      {
        "src": "assets/img/maison-des-pins-5.jpg",
        "ratio": "1485 / 1600",
        "alt": "The house above the shore, framed by pine branches",
        "video": false
      }
    ]
  },
  {
    "id": "jules-cesar",
    "title": "Jules Cesar",
    "client": "Sogerim",
    "programme": "Apartments",
    "location": "Woluwe-Saint-Pierre, Belgium",
    "work": "3D renders, 3D animation",
    "stages": [
      "Design process",
      "Marketing",
      "Animation"
    ],
    "text": "Interiors for a residential project, made to sell the apartments before they were built. Oak, cane and linen set a warm, lived-in tone, and daylight from the garden carries from one room to the next.",
    "images": [
      {
        "src": "assets/img/jules-cesar-2.jpg",
        "ratio": "4 / 5",
        "alt": "Frame from the film: dining table facing the garden",
        "video": "assets/vid/video_002.mp4"
      },
      {
        "src": "assets/img/jules-cesar-3.jpg",
        "ratio": "1352 / 1700",
        "alt": "Kitchen and dining area with pendant lights",
        "video": false
      },
      {
        "src": "assets/img/jules-cesar-1.jpg",
        "ratio": "1700 / 771",
        "alt": "Living room opening onto the garden",
        "video": false
      },
      {
        "src": "assets/img/jules-cesar-4.jpg",
        "ratio": "3 / 2",
        "alt": "Bedroom with dressing room and garden view",
        "video": false
      },
      {
        "src": "assets/img/jules-cesar-7.jpg",
        "ratio": "2000 / 1111",
        "alt": "Study with a desk facing tall windows",
        "video": false
      },
      {
        "src": "assets/img/jules-cesar-9.jpg",
        "ratio": "2000 / 1328",
        "alt": "Bright study with a table and bookshelves",
        "video": false
      }
    ]
  },
  {
    "id": "docks",
    "title": "Docks",
    "client": "Hamburg Team",
    "programme": "Waterfront buildings",
    "location": "HafenCity, Hamburg, Germany",
    "work": "3D renders, design process",
    "stages": [
      "Permit",
      "Design process",
      "Marketing"
    ],
    "text": "Brick-framed buildings on the Hamburg waterfront, rendered while the design was still moving. Views from across the water and from the new square helped the team judge rhythm, depth and material at the scale of the quay.",
    "images": [
      {
        "src": "assets/img/docks-1.jpg",
        "ratio": "1237 / 1700",
        "alt": "The buildings seen across the water at dusk",
        "video": false
      },
      {
        "src": "assets/img/docks-2.jpg",
        "ratio": "1360 / 1700",
        "alt": "Brick-framed buildings around a planted square",
        "video": false
      }
    ]
  },
  {
    "id": "lux-46",
    "title": "Lux 46",
    "client": "A229",
    "programme": "Competition",
    "location": "Etterbeek, Belgium",
    "work": "Photo insertion",
    "stages": [
      "Competition"
    ],
    "text": "A new building on a Brussels street corner, inserted into a photograph of the existing street. Its deep window grid and ground-floor arcade sit in the same soft light as the neighbouring facades, so the jury could judge how it joins the street.",
    "images": [
      {
        "src": "assets/img/lux-46-1.jpg",
        "ratio": "1128 / 1600",
        "alt": "Building with a deep window grid inserted into a street photograph",
        "video": false
      },
      {
        "src": "assets/img/lux-46-2.jpg",
        "ratio": "1400 / 2000",
        "alt": "The building seen from a planted path between gardens",
        "video": false
      },
      {
        "src": "assets/img/lux-46-3.jpg",
        "ratio": "1334 / 2000",
        "alt": "The building at the end of a busy square with a statue",
        "video": false
      }
    ]
  },
  {
    "id": "ulb-auditorium",
    "title": "ULB Auditorium",
    "client": "TANK Architectes",
    "programme": "Auditorium",
    "location": "Ixelles, Belgium",
    "work": "3D render, design process",
    "stages": [
      "Design process"
    ],
    "text": "A timber-lined auditorium for the ULB, shown in use. A lecturer and a few students give the room its scale, and the warm wood and linear lights show how the space will feel during a class.",
    "images": [
      {
        "src": "assets/img/ulb-auditorium-1.jpg",
        "ratio": "1445 / 1700",
        "alt": "Timber-lined auditorium with a lecturer and students",
        "video": false
      }
    ]
  },
  {
    "id": "base-nautique",
    "title": "Base Nautique",
    "client": "Peaks Architectes",
    "programme": "Water sports centre, competition",
    "location": "Mantes-la-Jolie, France",
    "work": "3D render",
    "stages": [
      "Competition"
    ],
    "text": "The interior of a water sports centre, for a competition. Pale timber, stepped seating and wide windows onto the river describe a calm room for gathering before and after time on the water.",
    "images": [
      {
        "src": "assets/img/base-nautique-1.jpg",
        "ratio": "1175 / 1600",
        "alt": "Timber room with stepped seating and windows onto the river",
        "video": false
      },
      {
        "src": "assets/img/base-nautique-2.jpg",
        "ratio": "1553 / 2000",
        "alt": "The red building seen across the river",
        "video": false
      },
      {
        "src": "assets/img/base-nautique-3.jpg",
        "ratio": "1335 / 2000",
        "alt": "The red tower framed by trees on the riverbank",
        "video": false
      }
    ]
  },
  {
    "id": "wevelgem-bridge",
    "title": "Wevelgem Bridge",
    "client": "Fallow",
    "programme": "Footbridge",
    "location": "Wevelgem, Belgium",
    "work": "3D renders",
    "stages": [
      "Permit",
      "Design process"
    ],
    "text": "",
    "images": [
      {
        "src": "assets/img/wevelgem-bridge-2.jpg",
        "ratio": "1400 / 2000",
        "alt": "Aerial view of the bridge and its looping ramp in the fields",
        "video": false
      },
      {
        "src": "assets/img/wevelgem-bridge-1.jpg",
        "ratio": "2000 / 1000",
        "alt": "Slender footbridge crossing a motorway at dusk",
        "video": false
      }
    ]
  },
  {
    "id": "radhime",
    "title": "Radhime",
    "client": "Manuelle Gautrand Architecture",
    "programme": "",
    "location": "",
    "work": "3D renders",
    "stages": [
      "Design process"
    ],
    "text": "",
    "images": [
      {
        "src": "assets/img/radhime-6.jpg",
        "ratio": "1592 / 1992",
        "alt": "The buildings lit at dusk above the sea",
        "video": false
      },
      {
        "src": "assets/img/radhime-4.jpg",
        "ratio": "1592 / 1992",
        "alt": "The arcaded facades rising above a garden",
        "video": false
      },
      {
        "src": "assets/img/radhime-5.jpg",
        "ratio": "1392 / 1992",
        "alt": "Corner of the building against a blue sky",
        "video": false
      },
      {
        "src": "assets/img/radhime-7.jpg",
        "ratio": "1592 / 1992",
        "alt": "The buildings glowing at night",
        "video": false
      },
      {
        "src": "assets/img/radhime-1.jpg",
        "ratio": "2000 / 1107",
        "alt": "Two arcaded red buildings in a dry landscape below the mountains",
        "video": false
      },
      {
        "src": "assets/img/radhime-2.jpg",
        "ratio": "2000 / 1108",
        "alt": "The two buildings under a clear sky, among olive trees",
        "video": false
      },
      {
        "src": "assets/img/radhime-3.jpg",
        "ratio": "1400 / 2000",
        "alt": "Close view of the arched facades at dusk",
        "video": false
      }
    ]
  },
  {
    "id": "ilot-130",
    "title": "Îlot 130",
    "client": "a2o",
    "programme": "Urban block, tender",
    "location": "Brussels, Belgium",
    "work": "3D renders",
    "stages": [
      "Permit",
      "Design process"
    ],
    "text": "Images for a tender on an urban block in Brussels. We followed the project from the planted courtyard to the entrance hall and the workspaces, showing how one calm palette of materials runs through every part of it.",
    "images": [
      {
        "src": "assets/img/ilot-130-1.jpg",
        "ratio": "1275 / 1700",
        "alt": "Planted courtyard between brick buildings",
        "video": false
      },
      {
        "src": "assets/img/ilot-130-2.jpg",
        "ratio": "1193 / 990",
        "alt": "Double-height entrance hall with pendant lights",
        "video": false
      },
      {
        "src": "assets/img/ilot-130-3.jpg",
        "ratio": "2 / 1",
        "alt": "Open workspace with large windows",
        "video": false
      }
    ]
  },
  {
    "id": "tirana-tower",
    "title": "Tirana Tower",
    "client": "Taller Héctor Barroso",
    "programme": "Tower, competition",
    "location": "Tirana, Albania",
    "work": "3D renders",
    "stages": [
      "Competition"
    ],
    "text": "A competition entry for a tower in Tirana. We worked on two moments: the base at dusk, with its colonnade and terraces opening onto the city, and the lobby, where a sculptural bench and planting slow the pace down.",
    "images": [
      {
        "src": "assets/img/tirana-tower-1.jpg",
        "ratio": "1280 / 1600",
        "alt": "The base of the tower at dusk, with a terrace under the colonnade",
        "video": false
      },
      {
        "src": "assets/img/tirana-tower-2.jpg",
        "ratio": "3 / 2",
        "alt": "Lobby with a sculptural bench and planting",
        "video": false
      }
    ]
  },
  {
    "id": "schweitzer",
    "title": "Schweitzer",
    "client": "Fallow and UMA Architecten",
    "programme": "Municipal crèche, competition",
    "location": "Anderlecht, Belgium",
    "work": "Photo insertion",
    "stages": [
      "Competition"
    ],
    "text": "A new municipal crèche inserted into a photograph of the actual street corner. Keeping the real traffic lights, tram wires and neighbouring houses showed the jury exactly how the building would sit in its context. The project won the competition.",
    "images": [
      {
        "src": "assets/img/schweitzer-1.jpg",
        "ratio": "1700 / 1331",
        "alt": "Green brick crèche inserted into a photograph of a street corner",
        "video": false
      }
    ]
  },
  {
    "id": "chardons",
    "title": "Chardons",
    "client": "A229",
    "programme": "Housing, competition",
    "location": "Schaerbeek, Belgium",
    "work": "3D render",
    "stages": [
      "Competition",
      "Design process"
    ],
    "text": "Two housing blocks around a shared garden, for a competition. The view stays at eye level from the park, so the planted balconies and the open ground floor carry the idea of the project: living together around green space.",
    "images": [
      {
        "src": "assets/img/chardons-1.jpg",
        "ratio": "1700 / 1000",
        "alt": "Two housing blocks with balconies around a shared garden",
        "video": false
      }
    ]
  },
  {
    "id": "farm-house",
    "title": "Farm House",
    "client": "Rock Architects",
    "programme": "Private house",
    "location": "Salisbury, United Kingdom",
    "work": "3D render, marketing",
    "stages": [
      "Marketing"
    ],
    "text": "A house of two gables in brick and metal, set in an open meadow. Soft English daylight and long grass keep the image quiet and honest, the way the house is meant to be lived in.",
    "images": [
      {
        "src": "assets/img/farm-house-1.jpg",
        "ratio": "1600 / 889",
        "alt": "Two-gabled house in brick and metal in a meadow",
        "video": false
      },
      {
        "src": "assets/img/farm-house-2.jpg",
        "ratio": "2000 / 1000",
        "alt": "Pitched-roof houses in a wide meadow",
        "video": false
      }
    ]
  },
  {
    "id": "living",
    "title": "Living",
    "client": "Landmarken AG",
    "programme": "Apartments",
    "location": "Bochum, Germany",
    "work": "3D renders, marketing",
    "text": "Interiors for a residential development in Bochum. Open kitchens, terraces and plenty of daylight, staged simply so buyers can picture themselves living there.",
    "images": [
      {
        "src": "assets/img/living-1.jpg",
        "ratio": "1700 / 944",
        "alt": "Bright living room with a terrace",
        "video": false
      },
      {
        "src": "assets/img/living-2.jpg",
        "ratio": "1700 / 944",
        "alt": "Kitchen with a timber island and dining table",
        "video": false
      }
    ],
    "hidden": true
  },
  {
    "id": "beaulieu",
    "title": "Beaulieu",
    "client": "VELD",
    "programme": "Housing",
    "location": "",
    "work": "3D renders",
    "stages": [
      "Permit",
      "Marketing"
    ],
    "text": "",
    "images": [
      {
        "src": "assets/img/beaulieu-1.jpg",
        "ratio": "2000 / 2000",
        "alt": "Brick housing blocks around a wild green garden",
        "video": false
      },
      {
        "src": "assets/img/beaulieu-2.jpg",
        "ratio": "1500 / 2000",
        "alt": "Planted lane between brick buildings",
        "video": false
      }
    ]
  },
  {
    "id": "tower-in-the-garden",
    "title": "Tower in the Garden",
    "client": "",
    "programme": "Housing and mixed use, permit",
    "location": "Anderlecht, Belgium",
    "work": "Photo insertion",
    "text": "A residential tower inserted into a photograph of the site, seen across an existing courtyard garden. Keeping the mature trees in the foreground showed how the new building would sit in the neighbourhood. A second view, taken from the busy junction nearby, shows the horizontal bands and set-back upper floors in the real evening light of the street.",
    "images": [
      {
        "src": "assets/img/tower-in-the-garden-2.jpg",
        "ratio": "1208 / 1600",
        "alt": "Building with horizontal bands at a road junction",
        "video": false
      },
      {
        "src": "assets/img/tower-in-the-garden-1.jpg",
        "ratio": "1120 / 1600",
        "alt": "Residential tower seen across a courtyard garden",
        "video": false
      }
    ]
  },
  {
    "id": "warehouse-conversion",
    "title": "Warehouse Conversion",
    "client": "",
    "programme": "Conversion",
    "location": "Laeken, Belgium",
    "work": "3D render",
    "text": "A former warehouse turned into a working space. The original timber trusses stay visible above a long central aisle, while curtains and shelving bring the scale down to people.",
    "images": [
      {
        "src": "assets/img/warehouse-conversion-1.jpg",
        "ratio": "1200 / 1600",
        "alt": "Long aisle under timber trusses in a converted warehouse",
        "video": false
      }
    ]
  },
  {
    "id": "glass-offices",
    "title": "Glass Offices",
    "client": "",
    "programme": "Offices",
    "location": "Auderghem, Belgium",
    "work": "Photo insertion",
    "text": "Layered glass office buildings inserted into a photograph of the street. The facades pick up the sky and the trees around them, showing how light the volumes will feel from the pavement.",
    "images": [
      {
        "src": "assets/img/glass-offices-1.jpg",
        "ratio": "1193 / 1600",
        "alt": "Layered glass office buildings along a street",
        "video": false
      }
    ]
  },
  {
    "id": "sports-hall",
    "title": "Sports Hall",
    "client": "",
    "programme": "Sports hall",
    "location": "Brussels, Belgium",
    "work": "3D renders, photo insertion",
    "text": "A sports hall under a steel roof, with a band of glazing letting daylight across the court. A few players are enough to give the space its scale. Outside, the glazed roof is inserted into a photograph of the existing brick complex along the canal, where it reads as a light addition to the old industrial skyline.",
    "images": [
      {
        "src": "assets/img/sports-hall-1.jpg",
        "ratio": "1200 / 1600",
        "alt": "Sports hall with steel roof trusses and a glazed band",
        "video": false
      },
      {
        "src": "assets/img/sports-hall-2.jpg",
        "ratio": "1600 / 2000",
        "alt": "The hall in soft morning light, seen from the edge of the court",
        "video": false
      },
      {
        "src": "assets/img/sports-hall-3.jpg",
        "ratio": "1600 / 1068",
        "alt": "Glazed roof above a brick industrial complex along the canal",
        "video": false
      }
    ]
  },
  {
    "id": "winter-gallery",
    "title": "Winter Gallery",
    "client": "",
    "programme": "Art gallery",
    "location": "",
    "work": "3D render",
    "text": "A glazed gallery stretched above a frozen landscape. Cold blue light and reflections in the ice give the project a strong, quiet image.",
    "images": [
      {
        "src": "assets/img/winter-gallery-1.jpg",
        "ratio": "1299 / 1600",
        "alt": "Glazed gallery above a frozen landscape",
        "video": false
      }
    ]
  },
  {
    "id": "city-loft",
    "title": "City Loft",
    "client": "",
    "programme": "Housing",
    "location": "",
    "work": "3D render",
    "text": "An open-plan apartment with floor-to-ceiling glass and a wide view over the city. Concrete floors, linen curtains and very little furniture leave the space and the light to do the work.",
    "images": [
      {
        "src": "assets/img/city-loft-1.jpg",
        "ratio": "1600 / 889",
        "alt": "Open-plan apartment with floor-to-ceiling windows over the city",
        "video": false
      }
    ]
  },
  {
    "id": "brick-offices",
    "title": "Brick Offices",
    "client": "",
    "programme": "Offices",
    "location": "Etterbeek, Belgium",
    "work": "Photo insertion",
    "text": "An office building in red brick, inserted into a photograph of a wide road junction. Its regular grid of windows is shown at dusk, in the same light as the photograph.",
    "images": [
      {
        "src": "assets/img/brick-offices-1.jpg",
        "ratio": "1053 / 1600",
        "alt": "Red brick office building at a road junction",
        "video": false
      }
    ]
  },
  {
    "id": "terrace-housing",
    "title": "Terrace Housing",
    "client": "",
    "programme": "Housing",
    "location": "Anderlecht, Belgium",
    "work": "Photo insertion",
    "text": "A long residential block with stepped terraces, inserted into a photograph of a busy crossing. Pedestrians, cars and traffic lights stay as they were, so the building is seen in everyday life.",
    "images": [
      {
        "src": "assets/img/terrace-housing-1.jpg",
        "ratio": "1600 / 1068",
        "alt": "Residential block with terraces behind a busy crossing",
        "video": false
      }
    ]
  },
  {
    "id": "brick-hall",
    "title": "Brick Hall",
    "client": "",
    "programme": "Cultural centre",
    "location": "Etterbeek, Belgium",
    "work": "3D render",
    "text": "A double-height hall for a cultural centre, framed by brick columns and galleries. Soft light from the roof keeps the space open and ready for events of every kind.",
    "images": [
      {
        "src": "assets/img/brick-hall-1.jpg",
        "ratio": "1280 / 1600",
        "alt": "Double-height hall with brick columns and galleries",
        "video": false
      }
    ]
  },
  {
    "id": "forest-cabin",
    "title": "Forest Cabin",
    "client": "",
    "programme": "Cabin",
    "location": "",
    "work": "Photo insertion",
    "text": "A steep timber frame inserted into a photograph of dense forest. The open lattice lets the green show through, so the cabin feels half built, half grown.",
    "images": [
      {
        "src": "assets/img/forest-cabin-1.jpg",
        "ratio": "1013 / 1600",
        "alt": "Steep timber frame among dense trees",
        "video": false
      }
    ]
  }
];
