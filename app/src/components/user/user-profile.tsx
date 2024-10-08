import { useEffect, useState } from "react";
import { HousingItem, Post, User } from "@/lib/types"
import UserAvatar from "./user-avatar"
import { useStore } from "@/lib/store";
import { Link, useNavigate } from "react-router-dom";
import useQueryUserReviews from "@/hooks/use-query-user-reviews";
import { EmailDialog } from "../email/send-email-dialog";
import { useToast } from "../ui/use-toast";
import { findAllFavoriteHousings, findAllFavoritePosts } from "@/lib/api";
import UserReview from "./user-reviews";
import { UpdateProfileDialog } from "./update-profile-dialog";
import { FaSoap } from "react-icons/fa6";
import { TbSunMoon } from "react-icons/tb";
import { IoPeopleSharp } from "react-icons/io5";
import { LuCigarette } from "react-icons/lu";
import StarRating from "../catalog/star-rating";
import { formatTimestamp } from "@/lib/utils";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

export const UserProfile = ({ user }: { user: User }) => {
    const { toast } = useToast();
    const loggedUser = useStore((state) => state.user);
    const { userReviews } = useQueryUserReviews(user.email)
    const navigate = useNavigate();
    const [favoritePosts, setFavoritePosts] = useState<Post[]>([]);
    const [favoriteHousings, setFavoriteHousings] = useState<HousingItem[]>([]);
    const [updatedUser, setUpdatedUser] = useState<User | void>(user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!loggedUser) {
                    navigate("/");
                } else {
                    const posts = await findAllFavoritePosts(user.id);
                    const housings = await findAllFavoriteHousings(user.id);
                    setFavoritePosts(posts || []);
                    setFavoriteHousings(housings || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast({
                    variant: "destructive",
                    title: "Error fetching data",
                    description: "An error occurred while fetching data.",
                });
            }
        };
        fetchData();
    }, [loggedUser, navigate, user.id, toast]);

    useEffect(() => {
        setUpdatedUser(user);
    }, [user])

    const handleUpdateProfile = (updatedUserData: User | void) => {
        setUpdatedUser(updatedUserData);
    }
    return (
        <div className="flex flex-col w-screen min-h-screen border-x-2 border-slate-400 md:max-w-4xl">
            <div className="flex">
                <div className="p-4 pl-10 pt-10">
                    <UserAvatar imageUrl={updatedUser?.avatar} displayName={`${updatedUser?.firstName} ${updatedUser?.lastName}`} />
                </div>
                <div className="w-full pt-10 text-3xl flex flex-col">
                    <div className="flex items-center">
                        <div className="mx-5 mt-10 mb-2" style={{ fontSize: '35px', fontWeight: '600' }}>
                            <div>{`${updatedUser?.firstName} ${updatedUser?.lastName}`}</div>
                        </div>
                        <div className="mt-10 mb-2">
                            <div>
                                <EmailDialog userProf={user}/>
                                {(loggedUser?.email == updatedUser?.email) && <UpdateProfileDialog user={user} onUpdateProfile={handleUpdateProfile}/>}
                            </div>
                        </div>
                    </div>
                    <div className="mx-5" style={{ fontSize: '18px', color: 'grey', lineHeight: '1.2' }}>
                        {updatedUser?.age !== null && updatedUser?.gender !== null && (
                            <div><em>{updatedUser?.age}, {updatedUser?.gender}</em></div>
                        )}
                        {updatedUser?.gradYear !== null && (
                            <div><em>Class of {updatedUser?.gradYear}</em></div>
                        )}
                        {updatedUser?.major !== null && (
                            <div><em>{updatedUser?.major}</em></div>
                        )}
                    </div>
                </div>
            </div>
        <div>
        </div>
            <div className="p-4 pl-8 pr-8">
                <h2 className="text-xl font-semibold mb-2">Bio</h2>
                <div className="bg-white p-12 border border-gray-300 rounded-lg shadow">
                    {updatedUser?.bio}
                </div>
                {updatedUser?.socialPreference !== null && (
                    <div className="grid grid-cols-2 py-1 mt-5">
                        <div className="pr-100">
                            <div className="text-xl font-semibold mt-5 mb-2">Lifestyle Preferences</div>
                            <div className="flex py-5 bg-white border border-gray-300 rounded-lg shadow" style={{ width: '380px', height: '400px' }}>
                                <div>
                                    <div className="w-14 h-14 bg-gray-300 rounded-full ml-8 mt-5 mb-4">
                                        <div><IoPeopleSharp className="pl-3 pt-3 w-11 h-11"/></div>
                                    </div>
                                    <div className="w-14 h-14 bg-gray-300 rounded-full ml-8 mt-8 mb-4">
                                        <div><TbSunMoon className="pl-3 pt-3 w-11 h-11"/></div>
                                    </div>
                                    <div className="w-14 h-14 bg-gray-300 rounded-full ml-8 mt-8 mb-4">
                                        <div><FaSoap className="pl-3 pt-3 w-11 h-11"/></div>
                                    </div>
                                    <div className="w-14 h-14 bg-gray-300 rounded-full ml-8 mt-8 mb-4">
                                        <div><LuCigarette className="pl-3 pt-3 w-11 h-11"/></div> 
                                    </div>
                                </div>
                                <div>
                                    <div className="pl-8 mt-8 mb-4" style={{ fontSize: '18px', fontWeight: '400' }}><em>{updatedUser?.socialPreference}</em></div>
                                    <div className="pl-8 mt-9 pt-7" style={{ fontSize: '18px', fontWeight: '400' }}><em>{updatedUser?.peakProductivity}</em></div>
                                    <div className="pl-8 mt-7 pt-8" style={{ fontSize: '18px', fontWeight: '400' }}><em>{updatedUser?.cleanliness}</em></div>
                                    <div className="pl-8 mt-7 pt-8" style={{ fontSize: '18px', fontWeight: '400' }}><em>{updatedUser?.smoker}</em></div>
                                </div>
                            </div>
                        </div>
                        <div className="pl-8">
                            <div className="text-xl font-semibold mt-5 mb-2 ml-30">Housing Preferences</div>
                            <div className="flex bg-white border border-gray-300 rounded-lg shadow" style={{ width: '380px', height: '400px' }}>
                            <div>
                                <div className="pl-8 mt-5 pt-5">
                                    <div className="" style={{ fontSize: '18px', fontWeight: '400' }}><em>I am looking for a...</em></div>
                                    <div className="" style={{ fontSize: '18px', fontWeight: '700' }}><em>{updatedUser?.stayLength}</em></div>
                                </div>
                                <div className="pl-8 mt-5 pt-4">
                                    <div className="" style={{ fontSize: '18px', fontWeight: '400' }}><em>My monthly rent budget is...</em></div>
                                    <div className="" style={{ fontSize: '18px', fontWeight: '700' }}><em>{updatedUser?.budget}</em></div>
                                </div>
                                <div className="pl-8 mt-5 pt-3">
                                    <div className="" style={{ fontSize: '18px', fontWeight: '400' }}><em>My ideal distance away from campus is...</em></div>
                                    <div className="" style={{ fontSize: '18px', fontWeight: '700' }}><em>{updatedUser?.idealDistance}</em></div>
                                </div>
                                <div className="pl-8 mt-5 pt-3">
                                    <div className="" style={{ fontSize: '18px', fontWeight: '400' }}><em>I prefer my housing to be...</em></div>
                                    <div className="" style={{ fontSize: '18px', fontWeight: '700' }}><em>{updatedUser?.petPreference}</em></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {userReviews.length !== 0 && (
                    <h2 className="text-xl font-semibold mt-10 mb-2">Reviews</h2>
                )}
                {userReviews && userReviews.map((review) => (
                    <UserReview review={review} housingId={review.housingId} key={review.id} />
                ))}
                <h2 className="text-xl font-semibold mb-2 mt-4 border-b-2 border-gray-300 flex items-center">
                    Favorite Posts &#128172;
                </h2>
                {favoritePosts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {favoritePosts.map((post) => (
                            <div key={post.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                <Link to={'/posts'}>
                                {/* Render post info here */}
                                <span style={{ fontWeight: 'bold'}}>Title: </span> 
                                    <span>{post.title}</span>
                                <div>
                                    <span style={{ fontWeight: 'bold'}}>Content: </span> 
                                    <span>{post.content}</span>
                                </div>
                               
                                {post.timestamp && (
                                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <CounterClockwiseClockIcon style={{ marginRight: '0.2em', verticalAlign: 'sub' }} />
                                        {formatTimestamp(post.timestamp)}
                                    </span>
                                )}
                                {/* Add more details as needed */}
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No favorite posts yet.</p>
                )}
                <h2 className="text-xl font-semibold mb-2 mt-4 border-b-2 border-gray-300">
                    Favorite Housings &#x1F3E0;
                </h2>
                {favoriteHousings.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {favoriteHousings.map((housing) => (
                            <div key={housing.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                <Link to={`/housings/${housing.id}`}>
                                <div id={`info-window-${housing.id}`}>
                                    <div style={{fontWeight: "bold"}}>{housing.name}</div>
                                    <div style={{ display:"flex"}}>
                                        <StarRating rating={housing.avgRating} />
                                        <div style={{ marginLeft: '0.2rem', fontSize: '15px'}}> | {housing.reviewCount} reviews</div>
                                    </div>
                                        <div style={{ fontWeight: 'bold'}}>{housing.price}</div>
                                        <span style={{ fontWeight: 'bold'}}>{housing.distance} miles</span> from JHU Homewood
                                </div>
                                {/* Render housing info here */}
                                {/* Add more details as needed */}
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No favorite housings yet.</p>
                )}
            </div>
        </div>
    )
}
