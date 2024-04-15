import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { GearIcon, ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons"
import { ChangeEvent, useState } from "react"
import { useToast } from "../ui/use-toast"
import { User } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { editUser } from "@/lib/api"

export function UpdateProfileDialog({ user, onUpdateProfile }: { user: User, onUpdateProfile: (updatedUserData: User | void) => void  }) {
    const { toast } = useToast();

    const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
    const [formData, setFormData] = useState({
        firstName: user.firstName || '' ,
        lastName: user.lastName || '' ,
        avatar: user.avatar || '' ,
        bio: user.bio || '' ,
        age: user.age || '' ,
        gender: user.gender || '',
        major: user.major || '',
        gradYear: user.gradYear || '',
        stayLength: user.stayLength || '',
        budget: user.budget || '',
        idealDistance: user.idealDistance || '',
        petPreference: user.petPreference || '',
        cleanliness: user.cleanliness || '',
        smoker: user.smoker || '',
        socialPreference: user.socialPreference || '',
        peakProductivity: user.peakProductivity || '',
    });

    const handleNextDialog = () => {
        setCurrentDialogIndex((prevIndex) => Math.min(prevIndex + 1, dialogs.length - 1));
    };
    
    const handlePrevDialog = () => {
        setCurrentDialogIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleSave = async () => {
        const { firstName, lastName, avatar, bio, age, gender, major, gradYear, stayLength, budget, idealDistance, petPreference, cleanliness, smoker, socialPreference, peakProductivity } = formData
        if (!firstName || !lastName || !age || !gender || !major || !gradYear || !stayLength || !budget || !idealDistance || !petPreference || !cleanliness || !smoker || !socialPreference || !peakProductivity) {
            toast({
                variant: "destructive",
                title: "Sorry! All fields must be completed! 🙁",
                description: `Please enter the missing fields of your profile.`,
            });
            clearForm()
            return;
        }

        // grad year should only be four digits
        if (!/^\d+$/.test(age) || !/^\d{4}$/.test(gradYear)) {
            toast({
                variant: "destructive",
                title: "Sorry! Age and graduation year must be valid numbers! 🙁",
                description: "Please enter valid numbers for age and graduation year.",
            });
            clearForm();
            return;
        }
        const updatedUserData = await editUser(user.id, firstName, lastName, avatar, bio, age, gender, major, gradYear, stayLength, budget, idealDistance, petPreference, cleanliness, smoker, socialPreference, peakProductivity)
        onUpdateProfile(updatedUserData);
        clearForm();
    }
    
    const clearForm = () => {
        setFormData({
            firstName: formData.firstName || '' ,
            lastName: formData.lastName || '' ,
            avatar: formData.avatar || '' ,
            bio: formData.bio || '' ,
            age: formData.age || '' ,
            gender: formData.gender || '',
            major: formData.major || '',
            gradYear: formData.gradYear || '',
            stayLength: formData.stayLength || '',
            budget: formData.budget || '',
            idealDistance: formData.idealDistance || '',
            petPreference: formData.petPreference || '',
            cleanliness: formData.cleanliness || '',
            smoker: formData.smoker || '',
            socialPreference: formData.socialPreference || '',
            peakProductivity: formData.peakProductivity || '',
        });
        setCurrentDialogIndex(0)
    }
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const dialogs = [
        {
            title: 'Basic Info',
            content: (
              <>
                <label htmlFor="firstName">First Name:</label>
                <Input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Please enter your first name"/>
                <br />
                <label htmlFor="lastName">Last Name:</label>
                <Input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Please enter your last name" />
                <br />
                <label htmlFor="avatar">Avatar URL:</label>
                <Input type="text" id="avatar" name="avatar" value={formData.avatar} onChange={handleInputChange} placeholder="Please enter a URL" />
                <br />
                <label htmlFor="bio">Bio:</label>
                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleTextAreaChange} placeholder="Please enter your bio" />
              </>
            ),
          },
        {
          title: 'Demographics & Education',
          content: (
            <>
              <label htmlFor="age">Age:</label>
              <Input type="text" id="age" name="age" value={formData.age} onChange={handleInputChange} placeholder="Please enter your age"/>
              <br />
              <label htmlFor="gender">Gender:</label>
              <Input type="text" id="gender" name="gender" value={formData.gender} onChange={handleInputChange} placeholder="Please enter your gender" />
              <br />
              <label htmlFor="major">Major:</label>
              <Input type="text" id="major" name="major" value={formData.major} onChange={handleInputChange} placeholder="Please enter your major" />
              <br />
              <label htmlFor="gradYear">Graduation Year:</label>
              <Input type="text" id="gradYear" name="gradYear" value={formData.gradYear} onChange={handleInputChange} placeholder="Please enter your grad year" />
            </>
          ),
        },
        {
          title: 'Housing Preferences',
          content: (
            <>
            <div style={{ marginBottom: "0.1px" }}>
                <label htmlFor="stayLength" style={{ marginRight: "7px" }}>{'Length of Stay:  '}</label>
                        <select id="stayLength" name="stayLength" color="indigo" value={formData.stayLength} onChange={handleSelectChange}>
                            <option value="">Select</option>
                            <option value="Summer Lease">Summer Lease</option>
                            <option value="6-Month Lease">6-Month Lease</option>
                            <option value="9-Month Lease">9-Month Lease</option>
                            <option value="12-Month Lease">12-Month Lease</option>
                        </select>
            </div>
            <br />
            <div style={{ marginBottom: "0.1px" }}>
                <label htmlFor="budget" style={{ marginRight: "7px" }}>Monthly Rent Budget: </label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleSelectChange}>
                        <option value="">Select</option>
                        <option value="<$900">{'<$900'}</option>
                        <option value="$900-$1200">$900-$1200</option>
                        <option value="$1200-$1600">$1200-$1600</option>
                        <option value="$1600-$2000">$1600-$2000</option>
                        <option value=">$2000">{'>$2000'}</option>
                    </select>
            </div>
            <br />
            <div style={{ marginBottom: "0.1px" }}>
                <label htmlFor="idealDistance" style={{ marginRight: "7px" }}>Ideal Distance from Campus: </label>
                    <select id="idealDistance" name="idealDistance" value={formData.idealDistance} onChange={handleSelectChange}>
                        <option value="">Select</option>
                        <option value="<0.3 miles">{'<0.3 miles'}</option>
                        <option value="0.3-0.6 miles">0.3-0.6 miles</option>
                        <option value="0.6-0.9 miles">0.6-0.9 miles</option>
                        <option value=">0.9 miles">{'>0.9 miles'}</option>
                    </select>
            </div>
            <br />
                <label htmlFor="petPreference" style={{ marginRight: "7px" }}>Pet Preference: </label>
                    <select id="petPreference" name="petPreference" value={formData.petPreference} onChange={handleSelectChange}>
                        <option value="">Select</option>
                        <option value="Pet-Friendly">Pet-Friendly</option>
                        <option value="Pet-Free">Pet-Free</option>
                    </select>
                <br />
            </>
          ),
        },
        {
            title: 'Lifestyle Preferences',
            content: (
              <>
              <div style={{ marginBottom: "0.1px" }}>
                <label htmlFor="cleanliness" style={{ marginRight: "7px" }}>Cleanliness Level: </label>
                    <select id="cleanliness" name="cleanliness" value={formData.cleanliness} onChange={handleSelectChange}>
                        <option value="">Select</option>
                        <option value="Very Clean">Very Clean</option>
                        <option value="Somewhat Clean">Somewhat Clean</option>
                        <option value="Not Clean">Not Clean</option>
                    </select>
                </div>
                <br />
                <div style={{ marginBottom: "0.1px" }}>
                <label htmlFor="smoker" style={{ marginRight: "7px" }}>Smoking Habits: </label>
                    <select id="smoker" name="smoker" value={formData.smoker} onChange={handleSelectChange}>
                        <option value="">Select</option>
                        <option value="Non-Smoker">Non-Smoker</option>
                        <option value="Smoker">Smoker</option>
                    </select>
                    </div>
                <br />
                <div style={{ marginBottom: "0.1px" }}>
                <label htmlFor="socialPreference" style={{ marginRight: "7px" }}>Personality Type: </label>
                    <select id="socialPreference" name="socialPreference" value={formData.socialPreference} onChange={handleSelectChange}>
                        <option value="">Select</option>
                        <option value="Extrovert">Extrovert</option>
                        <option value="Ambivert">Ambivert</option>
                        <option value="Introvert">Introvert</option>
                    </select>
                    </div>
                <br />
                <label htmlFor="peakProductivity" style={{ marginRight: "7px" }}>Peak Productivity Time: </label>
                    <select id="peakProductivity" name="peakProductivity" value={formData.peakProductivity} onChange={handleSelectChange}>
                        <option value="">Select</option>
                        <option value="Early Bird">Early Bird</option>
                        <option value="Afternoon Person">Afternoon Person</option>
                        <option value="Night Owl">Night Owl</option>
                    </select>
                </>
            ),
          },
      ];

      return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button id="update-profile" variant="ghost" size="sm" ><GearIcon /></Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogs[currentDialogIndex].title}</DialogTitle>
                        {currentDialogIndex === 0 && (
                            <DialogDescription> First name and last name are required to be filled in.</DialogDescription>
                        )}
                        {currentDialogIndex !== 0 && (
                            <DialogDescription> All fields required to be filled in.</DialogDescription>
                        )}
                </DialogHeader>
                    <form onSubmit={(e) => e.preventDefault()}>
                        {dialogs[currentDialogIndex].content}
                    </form>
                    <DialogFooter>
                        <div>
                            {currentDialogIndex === 0 && (
                                <Button type="button" onClick={handleNextDialog} style={{ backgroundColor: "lightgrey", color: "black" }}><ArrowRightIcon/></Button>
                            )}
                            {(currentDialogIndex === 1 || currentDialogIndex ===  2) && (
                            <>
                                <Button type="button" variant="ghost" onClick={handlePrevDialog} style={{ backgroundColor: "lightgrey", color: "black", marginRight: "10px" }}><ArrowLeftIcon/></Button>
                                <Button type="button" variant="ghost" onClick={handleNextDialog} style={{ backgroundColor: "lightgrey", color: "black" }}><ArrowRightIcon/></Button>
                            </>
                            )}
                            {currentDialogIndex === 3 && (
                                <Button type="button" variant="ghost" onClick={handlePrevDialog} style={{ backgroundColor: "lightgrey", color: "black" }}><ArrowLeftIcon/></Button>
                            )}
                        </div>
                        {currentDialogIndex === 3 && (
                            <DialogClose asChild>
                                <Button type="submit" onClick={handleSave}>
                                    Done
                                </Button>
                            </DialogClose>
                        )}
                        <DialogClose asChild>
                             <Button variant="secondary" type="reset" onClick={clearForm}>
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
      );
}