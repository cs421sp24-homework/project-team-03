import { useEffect, useState } from "react";
import { HousingItem, Post, User } from "@/lib/types"
import UserAvatar from "./user-avatar"
import { Button } from "../ui/button"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { useStore } from "@/lib/store";
import useMutationUser from "@/hooks/use-mutations-users";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";

import { EmailDialog } from "../email/send-email-dialog";
import { findAllFavoriteHousings, findAllFavoritePosts } from "@/lib/api";

export const UserProfile = ({ user }: { user: User }) => {
    const { toast } = useToast();
    const loggedUser = useStore((state) => state.user);
    const { editUsers } = useMutationUser();
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [bio, setBio] = useState(user.bio);
    const [avatar, setAvatar] = useState(user.avatar);
    const navigate = useNavigate();
    const [favoritePosts, setFavoritePosts] = useState<Post[]>([]);
    const [favoriteHousings, setFavoriteHousings] = useState<HousingItem[]>([]);

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

    // const fetchFavoritePosts = async () => {
    //     try {
    //         const posts = await findAllFavoritePosts(user.id);
    //         setFavoritePosts(posts || []);
    //     } catch (error) {
    //         console.error("Error fetching favorite posts:", error);
    //     }
    // };

    // const fetchFavoriteHousings = async () => {
    //     try {
    //         const housings = await findAllFavoriteHousings(user.id);
    //         setFavoriteHousings(housings || []);
    //     } catch (error) {
    //         console.error("Error fetching favorite housings:", error);
    //     }
    // };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!firstName || !lastName) {
            toast({
              variant: "destructive",
              title: "Sorry! FirstName, or LastName cannot be empty! 🙁",
              description: `Please enter the required information to save.`,
            });
            return;
        }
        editUsers(user.id, firstName, lastName, avatar, bio);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        if (loggedUser) {
            setFirstName(loggedUser.firstName);
            setLastName(loggedUser.lastName);
            setBio(loggedUser.bio); 
            setAvatar(loggedUser.avatar);   
        }
        setIsEditing(false);
    };

    

    return (
        <div className="flex flex-col w-screen min-h-screen border-x-2 border-slate-400 md:max-w-4xl">
            <div className="flex">
                <div className="p-4 pl-8">
                    <UserAvatar imageUrl={avatar} displayName={`${firstName} ${lastName}`} />
                </div>
                <div className="w-full pt-10 pr-8 text-3xl flex flex-col">
                    <div className="flex items-center">
                        <div>{`${firstName} ${lastName}`}</div>
                        {(loggedUser?.email == user.email) && <Button id="edit-profile" variant="ghost" size="sm" onClick={handleEdit}><Pencil1Icon /></Button>}
                    </div>
                    <div>
                        <EmailDialog userProf={user}/>
                    </div>
                </div>
            </div>
            <div className="p-4 pl-8 pr-8">
                <h2 className="text-xl font-semibold mb-2">Bio</h2>
                {isEditing ? (
                    <>
                        <input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                            placeholder="First Name"
                        />
                        <input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                            placeholder="Last Name"
                        />
                        <input
                            id="avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                            placeholder="Avatar URL"
                        />
                        <textarea
                            id="bio"
                            value={bio ? bio : ""}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full h-32 border border-gray-300 rounded-lg p-2 mb-2"
                            placeholder="Bio"
                        />
                        <div>
                            <Button onClick={handleSave}>Save</Button>
                            <Button onClick={handleCancelEdit} variant="secondary">Cancel</Button>
                        </div>
                    </>
                ) : (
                    <div className="bg-white p-12 border border-gray-300 rounded-lg shadow">
                        {bio}
                    </div>
                )}
                <h2 className="text-xl font-semibold mb-2 mt-4 border-b-2 border-gray-300 flex items-center">
                    Favorite Posts &#128172;
                </h2>
                {favoritePosts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {favoritePosts.map((post) => (
                            <div key={post.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                {/* Render post info here */}
                                <div>Title: {post.title}</div>
                                <div>Content: {post.content}</div>
                                {/* Add more details as needed */}
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
                                {/* Render housing info here */}
                                <div>Name: {housing.name}</div>
                                <div>Address: {housing.address}</div>
                                {/* Add more details as needed */}
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
