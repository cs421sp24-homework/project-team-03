import SearchInput from "../catalog/search-input";
import { AddReviewDialog } from "./add-review-dialog";

  
const Header = ({ housingId }: { housingId: string }) => {
    return (
        <div className="flex flex-wrap max-w p-5 items-left justify-between">
            <div style={{ flexBasis: '100%', marginBottom: '1rem' }}>
                <h2 className="text-lg font-semibold">Here’s what students have to say:</h2>
            </div>
            <div style={{ paddingRight: '2%' }}>
                <SearchInput />
            </div>
            <AddReviewDialog housingId={housingId} />
        </div>
    );
};

export default Header;
