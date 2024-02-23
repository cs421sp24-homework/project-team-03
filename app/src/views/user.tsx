import { useParams } from "react-router-dom";

function User() {
  // Access the 'jhed' parameter from the URL
  const { jhed } = useParams();
  const email = jhed + "@jhu.edu";

  // then query for that email in the database and display that information

  return (
    <div>
      <h2>User details for {jhed}</h2>
      {/* Add your component logic here */}
    </div>
  );
}

export default User;
