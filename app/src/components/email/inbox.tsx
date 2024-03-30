import { BellIcon, CheckboxIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useStore } from "@/lib/store";
import { Button } from "../ui/button";
import useMutationUser from "@/hooks/use-mutations-users";


const NotificationBadge = ({ count }: { count: number }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '14px',
            }}
        >
            {count}
        </div>
    );
};

const Inbox = () => {
    const user = useStore((state) => state.user);
    let notificationCount = user?.notifications;
    const { editUsers } = useMutationUser();
    
    const clearNotifications = async () => {
        if (user && user.notifications) {
            user.notifications = 0;
            notificationCount = 0;
            editUsers(user.id, user.firstName, user.lastName, user.avatar, user.bio, 0);   
        }
    }

    return (
        <Popover>
            <PopoverTrigger>
                <div style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <BellIcon className="w-5 h-5" />
                    <NotificationBadge count={notificationCount ? notificationCount : 0} />
                </div>
            </PopoverTrigger>
            <PopoverContent className="relative">
                You have {notificationCount ? notificationCount : 0} new emails. Check your inbox!
                <Button variant="ghost" size="sm" onClick={clearNotifications}><CheckboxIcon /></Button>
            </PopoverContent>
        </Popover>
    );
};

export default Inbox;
