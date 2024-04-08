import CircularProgress from "./CircularProgress";
import { formatDate } from "../utils";

export default function UserCard({ user, onRemove }) {
  return (
    <div className="border border-black">
      <header className="flex items-center justify-between border-b border-b-black p-3">
        <p className="text-xl font-bold">{user.fullname}</p>
        <CircularProgress value={user.twubric.total} max={10} />
      </header>
      <div className="flex justify-between text-center">
        <div className="flex-1 p-3">
          {user.twubric.friends}
          <br />
          Friends
        </div>
        <div className="flex-1 border-l border-r border-black p-3">
          {user.twubric.influence}
          <br />
          Influence
        </div>
        <div className="flex-1 p-3">
          {user.twubric.chirpiness}
          <br />
          Chirpiness
        </div>
      </div>
      <footer className="flex items-center justify-between border-t border-t-black p-3">
        <p>{formatDate(new Date(user.join_date))}</p>
        <button className="border px-2 py-1" onClick={onRemove}>
          Remove
        </button>
      </footer>
    </div>
  );
}
