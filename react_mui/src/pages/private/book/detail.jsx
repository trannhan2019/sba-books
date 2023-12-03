import { useParams } from "react-router-dom";

const BookDetail = () => {
  let { id } = useParams();
  return <div>{id}</div>;
};

export default BookDetail;
