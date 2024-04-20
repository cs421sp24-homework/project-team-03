import { AddReviewDialog } from "./add-review-dialog";

const Header = ({ housingId, sortBy, setSortBy }: { housingId: string; sortBy: string; setSortBy: Function }) => {
    return (
        <div className="flex flex-wrap justify-between p-5 max-w items-left">
            <div style={{ flexBasis: '100%', marginBottom: '1rem' }}>
                <h2 className="text-lg font-semibold">Here’s what students have to say:</h2>
            </div>
            <div className="px-4 py-2">
                <select
                    id='sort'
                    className="sort-button rounded text-center"
                    aria-label="Sort"
                    style={{ width: "60px", backgroundColor: "", border: "1px solid black" }}
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value)
                    }}
                >
                    <option value="">Sort</option>
                    <option value="popularity">Popularity &#128077;</option>
                    <option value="recency">Recency &#x1F550;</option>
                    {/* Add more sorting options here */}
                </select>
            </div>
            <AddReviewDialog housingId={housingId} />
        </div>
    );
};

export default Header;
