import { useEffect } from "react";
import { BellIcon, CheckboxIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useStore } from "@/lib/store";
import { Button } from "../ui/button";
import useMutationUser from "@/hooks/use-mutations-users";
import { getNotifications } from "@/lib/api";

const NotificationBadge = ({ count }: { count: number }) => {
    return (
        <div
            id="notification-count"
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
    const { clearNotif } = useMutationUser();
    const notifications = useStore((state) => state.notifications);
    const setNotifications = useStore((state) => state.userNotificationCount)

    useEffect(() => {
        const fetchNotifications = async () => {
            if (user) {
                try {
                    const notificationCount = await getNotifications(user.email);
                    setNotifications(notificationCount);
                } catch (error) {
                    console.error("Error fetching notifications:", error);
                }
            }
        };

        fetchNotifications();
    }, [user]);

    const clearNotifications = async () => {
        if (user) {
            clearNotif(user.email);
            setNotifications(0); 
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
                    <BellIcon id="inbox" className="w-5 h-5" />
                    {notifications != 0 && <NotificationBadge count={notifications} />} 
                </div>
            </PopoverTrigger>
            <PopoverContent id="inbox-content" className="relative">
                You have {notifications} new emails. {notifications != 0 && "Check your inbox!"}
                {notifications != 0 && <Button id="clear-inbox" variant="ghost" size="sm" onClick={clearNotifications}><CheckboxIcon /></Button>}
            </PopoverContent>
        </Popover>
    );
};

export default Inbox;
