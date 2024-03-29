import { BellIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";


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
  // Set your notification count here
  const notificationCount = 5;

  return (
    <Popover>
      <PopoverTrigger>
        <div style={{ 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', }}>
          <BellIcon className="w-5 h-5" />
          <NotificationBadge count={notificationCount} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="relative">
        Place content for the popover here.
      </PopoverContent>
    </Popover>
  );
};

export default Inbox;
