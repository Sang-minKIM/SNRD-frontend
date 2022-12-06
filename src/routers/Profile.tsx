import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  console.log(id);
  return <>{id}</>;
}
export default Profile;
