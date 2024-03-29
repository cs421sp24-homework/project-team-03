import { BellIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useStore } from "@/lib/store";


const NotificationBadge = ({ count }: {count: number}) => {
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
  const notificationCount = user?.notifications;

  return (
    <Popover>
      <PopoverTrigger>
        <div style={{ 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', }}>
          <BellIcon className="w-5 h-5" />
          <NotificationBadge count={notificationCount ? notificationCount : 0} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="relative">
        You have {notificationCount ? notificationCount : 0} new emails. Check your inbox!
      </PopoverContent>
    </Popover>
  );
};

export default Inbox;
