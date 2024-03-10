import type { HousingItem, Review, ReviewWithUserData, User } from "./types"

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

const mockUsers: User[] = [
  { id: 1, email: "user1@example.com", firstName: "Alice", lastName: "Smith" },
  { id: 2, email: "user2@example.com", firstName: "Bob", lastName: "Brown" },
  { id: 3, email: "user3@example.com", firstName: "Carol", lastName: "Johnson" },
  // ... add more mock users as needed
];



export const reviews: ReviewWithUserData[] = [
  // ... existing reviews

  {
    id: 'uuid-9012',
    content: 'The staff is friendly and maintenance is quick to respond to issues.',
    timestamp: '2024-03-07T16:45:00Z',
    rating: 4,
    upvoteCount: 10,
    housingId: '23d5c330-ae33-47d5-ae6e-7df67baa56a0',
    user: mockUsers[2]
  },
  {
    id: 'uuid-3456',
    content: 'Not satisfied with the amenities offered. The gym is too small.',
    timestamp: '2024-03-10T10:15:00Z',
    rating: 2,
    upvoteCount: 2,
    housingId: 'housing-uuid-3456',
    user: mockUsers[0] // Assuming repeating users is fine
  },
  {
    id: 'uuid-7890',
    content: 'Fantastic location right by the park, with modern appliances and fixtures.',
    timestamp: '2024-03-06T19:30:00Z',
    rating: 5,
    upvoteCount: 20,
    housingId: 'housing-uuid-7890',
    user: mockUsers[1] // Assuming repeating users is fine
  },
  // Additional reviews
  {
    id: 'uuid-1011',
    content: 'Quiet neighborhood and spacious rooms, but a bit far from the city center.',
    timestamp: '2024-03-11T09:20:00Z',
    rating: 3,
    upvoteCount: 7,
    housingId: 'housing-uuid-1011',
    user: mockUsers[2] // Reusing a user for example
  },
  {
    id: 'uuid-1112',
    content: 'Newly renovated, but parking is always a hassle.',
    timestamp: '2024-03-05T14:50:00Z',
    rating: 3,
    upvoteCount: 6,
    housingId: 'housing-uuid-1112',
    user: mockUsers[0] // Reusing a user for example
  },
  {
    id: 'uuid-1213',
    content: 'Excellent view from my apartment, and the building is pet-friendly!',
    timestamp: '2024-03-04T20:00:00Z',
    rating: 5,
    upvoteCount: 12,
    housingId: 'housing-uuid-1213',
    user: mockUsers[1] // Reusing a user for example
  }
];
