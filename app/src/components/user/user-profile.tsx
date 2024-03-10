import { useState } from "react";
import { User } from "@/lib/types"
import UserAvatar from "./user-avatar"
import { Button } from "../ui/button"
import { EnvelopeClosedIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { useStore } from "@/lib/store";
import useMutationUser from "@/hooks/use-mutations-users";

export const UserProfile = ({ user }: { user: User }) => {
    const loggedUser = useStore((state) => state.user);
    const { editUsers } = useMutationUser();
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [bio, setBio] = useState(user.bio);
    const [avatar, setAvatar] = useState(user.avatar);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        editUsers(user.id, firstName, lastName, avatar, bio);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setBio(user.bio); 
        setAvatar(user.avatar);
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
                        {(loggedUser?.email == user.email) && <Button variant="ghost" size="sm" onClick={handleEdit}><Pencil1Icon /></Button>}
                    </div>
                    <div>
                        <Button variant="ghost" size="sm"><EnvelopeClosedIcon /></Button>
                    </div>
                </div>
            </div>
            <div className="p-4 pl-8 pr-8">
                <h2 className="text-xl font-semibold mb-2">Bio</h2>
                {isEditing ? (
                    <>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                            placeholder="First Name"
                        />
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                            placeholder="Last Name"
                        />
                        <input
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-2"
                            placeholder="Avatar URL"
                        />
                        <textarea
                            value={bio}
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
            </div>
        </div>
    )
}
