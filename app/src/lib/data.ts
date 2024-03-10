import type { HousingItem, Review } from "./types"

export const housingItems: HousingItem[] = [
    {
      id: "a78aca8d-249b-46e5-8601-1ad61160f954",
      name: "The Marylander Apartment Homes",
      address: "3501 St Paul St, Baltimore, MD 21218",
      imageURL: "https://images1.apartments.com/i2/ZiJDyfDpBumQ08URhtmRjKs3p3dVi4G_k-6uocwe5l0/111/the-marylander-apartment-homes-baltimore-md-building-photo.jpg",
      avgRating: 3,
      reviewCount: 10,
      distance:  0.2,
      price: '$$'
    },
    {
      id: "23d5c330-ae33-47d5-ae6e-7df67baa56a0",
      name: "University One Condominium",
      address: "1 E University Pkwy #110, Baltimore, MD 21218",
      imageURL: "https://img.offcampusimages.com/WMdfztiK-Qcdrn1cXelHn3-FyXE=/660x440/left/top/smart/images/4a1oycohrsw4y3j_rocoolg_gniszl91q8prtypms2c.jpeg",
      avgRating: 2,
      reviewCount: 20,
      distance: 0.3,
      price: '$'
    },
    {
      id: "9fa6478f-0778-4b71-9408-4dcfde343c19",
      name: "St. Paul Courts Apartments",
      address: "3120 St Paul St, Baltimore, MD 21218",
      imageURL: "https://images1.apartments.com/i2/VBGUg5hSulDMsCJqDeJg8E5jfBmGx7gEQHP6IaVxrmw/111/saint-paul-courts-baltimore-md-building.jpg",
      avgRating: 4,
      reviewCount: 20,
      distance: 0.2,
      price: '$$'
    },
    {
      id: "dc524bc0-2767-498c-beec-8fbe00a08f88",
      name: "The Telephone Building",
      address: "220 E 31st St, Baltimore, MD 21218",
      imageURL: "https://images1.apartments.com/i2/CAPTa-6eDPAAcVm7GqFyGvD6tv1beHZoJ-7_L7mbrtQ/111/the-telephone-building-baltimore-md-primary-photo.jpg",
      avgRating: 3,
      reviewCount: 20,
      distance: 0.3,
      price: '$$$'
    },
]


export const reviews: Review[] = [
  {
    id: 'uuid-1234',
    content: 'Great place to live! Close to campus and very clean.',
    timestamp: '2024-03-08T12:00:00Z',
    rating: 5,
    upvoteCount: 15,
    userId: 1,
    housingId: 'housing-uuid-1234'
  },
  {
    id: 'uuid-5678',
    content: 'Reasonable price for the location, but the walls are thin.',
    timestamp: '2024-03-09T08:30:00Z',
    rating: 3,
    upvoteCount: 5,
    userId: 2,
    housingId: 'housing-uuid-5678'
  },
  {
    id: 'uuid-9012',
    content: 'The staff is friendly and maintenance is quick to respond to issues.',
    timestamp: '2024-03-07T16:45:00Z',
    rating: 4,
    upvoteCount: 10,
    userId: 3,
    housingId: 'housing-uuid-9012'
  },
  {
    id: 'uuid-3456',
    content: 'Not satisfied with the amenities offered. The gym is too small.',
    timestamp: '2024-03-10T10:15:00Z',
    rating: 2,
    upvoteCount: 2,
    userId: 4,
    housingId: 'housing-uuid-3456'
  },
  {
    id: 'uuid-7890',
    content: 'Fantastic location right by the park, with modern appliances and fixtures.',
    timestamp: '2024-03-06T19:30:00Z',
    rating: 5,
    upvoteCount: 20,
    userId: 5,
    housingId: 'housing-uuid-7890'
  }
];
