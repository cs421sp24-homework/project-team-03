import { useState } from "react";
import { User } from "@/lib/types"
import UserAvatar from "./user-avatar"
import { Button } from "../ui/button"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { useStore } from "@/lib/store";
import useMutationUser from "@/hooks/use-mutations-users";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import useQueryUserReviews from "@/hooks/use-query-user-reviews";
import { EmailDialog } from "../email/send-email-dialog";
import UserReview from "./user-reviews";
import { UpdateProfileDialog } from "./update-profile-dialog";
import useQueryUser from "@/hooks/use-query-user";
import { FaSoap } from "react-icons/fa6";
import { TbSunMoon } from "react-icons/tb";
import { IoPeopleSharp } from "react-icons/io5";
import { LuCigarette } from "react-icons/lu";

export const UserProfile = ({ user }: { user: User }) => {
    const { toast } = useToast();
    const loggedUser = useStore((state) => state.user);
    const { editUsers } = useMutationUser();
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [bio, setBio] = useState(user.bio);
    const [avatar, setAvatar] = useState(user.avatar);
    const { userReviews } = useQueryUserReviews(user.email)
    const { currentUser } = useQueryUser(user.email)
    const navigate = useNavigate();

    if (!loggedUser) {
        navigate("/");
    }

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
                <div className="p-4 pl-10 pt-10">
                    <UserAvatar imageUrl={currentUser?.avatar} displayName={`${currentUser?.firstName} ${currentUser?.lastName}`} />
                </div>
                <div className="w-full pt-10 text-3xl flex flex-col">
                    <div className="flex items-center">
                        <div className="mx-5 mt-10 mb-2" style={{ fontSize: '35px', fontWeight: '600' }}>
                            <div>{`${currentUser?.firstName} ${currentUser?.lastName}`}</div>
                        </div>
                        <div className="mt-10 mb-2">
                            {(loggedUser?.email == user.email) && <Button id="edit-profile" variant="ghost" size="sm" onClick={handleEdit}><Pencil1Icon /></Button>}
                            <EmailDialog userProf={user}/>
                            <UpdateProfileDialog user={user}/>
                        </div>
                    </div>
                    <div className="mx-5" style={{ fontSize: '18px', color: 'grey', lineHeight: '1.2' }}>
                        {currentUser?.age !== null && currentUser?.gender !== null && (
                            <div><em>{currentUser?.age}, {currentUser?.gender}</em></div>
                        )}
                        {currentUser?.gradYear !== null && (
                            <div><em>Class of {currentUser?.gradYear}</em></div>
                        )}
                        {currentUser?.major !== null && (
                            <div><em>{currentUser?.major}</em></div>
                        )}
                    </div>
                </div>
            </div>
        <div>
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
                        {currentUser?.bio}
                    </div>
                )}
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
                                <div className="pl-8 mt-8 mb-4" style={{ fontSize: '18px', fontWeight: '400' }}><em>{currentUser?.socialPreference}</em></div>
                                <div className="pl-8 mt-9 pt-7" style={{ fontSize: '18px', fontWeight: '400' }}><em>{currentUser?.peakProductivity}</em></div>
                                <div className="pl-8 mt-7 pt-8" style={{ fontSize: '18px', fontWeight: '400' }}><em>{currentUser?.cleanliness}</em></div>
                                <div className="pl-8 mt-7 pt-8" style={{ fontSize: '18px', fontWeight: '400' }}><em>{currentUser?.smoker}</em></div>
                            </div>
                        </div>
                    </div>
                    <div className="pl-8">
                        <div className="text-xl font-semibold mt-5 mb-2 ml-30">Housing Preferences</div>
                        <div className="flex bg-white border border-gray-300 rounded-lg shadow" style={{ width: '380px', height: '400px' }}>
                        <div>
                            <div className="pl-8 mt-5 pt-5">
                                <div className="" style={{ fontSize: '18px', fontWeight: '400' }}><em>I am looking for a...</em></div>
                                <div className="" style={{ fontSize: '18px', fontWeight: '700' }}><em>{currentUser?.stayLength}</em></div>
                            </div>
                            <div className="pl-8 mt-5 pt-4">
                                <div className="" style={{ fontSize: '18px', fontWeight: '400' }}><em>My monthly rent budget is...</em></div>
                                <div className="" style={{ fontSize: '18px', fontWeight: '700' }}><em>{currentUser?.budget}</em></div>
                            </div>
                            <div className="pl-8 mt-5 pt-3">
                                <div className="" style={{ fontSize: '18px', fontWeight: '400' }}><em>My ideal distance away from campus is...</em></div>
                                <div className="" style={{ fontSize: '18px', fontWeight: '700' }}><em>{currentUser?.idealDistance}</em></div>
                            </div>
                            <div className="pl-8 mt-5 pt-3">
                                <div className="" style={{ fontSize: '18px', fontWeight: '400' }}><em>I prefer my housing to be...</em></div>
                                <div className="" style={{ fontSize: '18px', fontWeight: '700' }}><em>{currentUser?.petPreference}</em></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                {userReviews.length !== 0 && (
                    <h2 className="text-xl font-semibold mt-10 mb-2">Reviews</h2>
                )}
                {userReviews && userReviews.map((review) => (
                    <UserReview review={review} housingId={review.housingId} key={review.id} />
                ))}
            </div>
        </div>
    )
}
