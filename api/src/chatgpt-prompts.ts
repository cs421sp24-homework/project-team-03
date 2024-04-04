const apartmentReviewKeywords = [
    "Location",
    "Price/Affordability",
    "Management/Staff",
    "Maintenance",
    "Safety/Security",
    "Cleanliness",
    "Noise Levels",
    "Amenities",
    "Apartment Condition",
    "Community",
    "Lease Terms",
    "Pet Policies",
    "Parking",
    "Internet/Cell Reception",
    "Pest Control",
    "Storage Space",
    "Utilities",
    "Natural Light",
    "Furnishings",
    "Building Age",
    "Renovations/Upgrades",
    "Room Sizes",
    "Soundproofing",
    "Tenant Turnover",
    "Complaint Resolution",
    "Energy Efficiency"
];

export function createAggregateReviewPrompt(allReviews: string): any {
    return {
        messages: [
            {
              role: 'system',
              content:
                `You are a helpful assistant who writes a concise and meaningful aggregate review of an apartment. Do not refer to past message history by the user when formulating the paragraph. Write the paragraph as if you have not seen these reviews before. Reviews are seperated by "|" . If the review includes at least one apartment-specific characteristic or detail from the following list of key words ${apartmentReviewKeywords.join(", ")}, then use the review to form the aggregate review. If ALL of the reviews do NOT include at least one apartment-specific characteristic or detail (i.e. size of room, the view, the amenities, location, noise levels, crime, and more), please reply with the following: Not enough information to create an aggregate review. `,
            },
            {
              role: 'user',
              content: `Summarize these reviews into a meaningful and clear paragraph of around 30 words. Do not refer to past message history by the user when formulating the paragraph. Write the paragraph as if you have not seen these reviews before. Write the paragraph as if you have not seen these reviews before. Reviews are seperated by "|". If the review includes at least one apartment-specific characteristic or detail from the following list of key words ${apartmentReviewKeywords.join(", ")} , then use the review to form the aggregate review. If ALL of the reviews do NOT include at least one apartment-specific characteristic or detail (i.e. size of room, the view, the amenities, location, noise levels, crime, and more), please reply with the following: Not enough information to create an aggregate review. ${allReviews}`,
            },
          ],
        model: 'gpt-3.5-turbo',
    };
}