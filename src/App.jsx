import React from "react";
import DatePicker from "react-datepicker";

import UserCard from "./components/UserCard";
import { sortAndFilterUsers } from "./utils";
import Container from "./components/Container";
import { ALL_USERS } from "./constants";

export default function App() {
  const [users, setUsers] = React.useState([]);
  const [sortBy, setSortBy] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  React.useEffect(() => {
    (async function () {
      const response = await fetch(ALL_USERS);
      const data = await response.json();
      setUsers(data);
    })();
  }, []);

  const removeUser = (uid) => {
    setUsers((value) => value.filter((user) => user.uid !== uid));
  };

  const changeSort = (newSortBy) => {
    setSortBy((value) => {
      if (value === newSortBy) {
        // Clicking twice should reverse the order
        return `${newSortBy} reverse`;
      }
      return newSortBy;
    });
  };

  const usersToRender = sortAndFilterUsers(users, {
    startDate,
    endDate,
    sortBy,
  });

  const renderArrow = (value) => {
    if (sortBy) {
      const [_sortBy, reverse] = sortBy.split(" ");
      if (_sortBy !== value) return null;
      return reverse ? "↓" : "↑";
    }
    return null;
  };

  const removeFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSortBy(null);
  };

  return (
    <Container className="p-5">
      <h1 className="text-center text-3xl font-bold">Twubric</h1>

      <div className="my-5">
        <h2 className="text-2xl font-bold">Sort By</h2>
        <div className="flex flex-wrap items-center justify-between gap-2 border border-black">
          <button
            className="flex-1 p-2 text-center"
            onClick={() => changeSort("total")}
          >
            Twubric Score {renderArrow("total")}
          </button>
          <button
            className="flex-1 border-l border-r border-black p-2 text-center"
            onClick={() => changeSort("friends")}
          >
            Friends {renderArrow("friends")}
          </button>
          <button
            className="flex-1 border-r border-black p-2 text-center"
            onClick={() => changeSort("influence")}
          >
            Influence {renderArrow("influence")}
          </button>
          <button
            className="flex-1 p-2 text-center"
            onClick={() => changeSort("chirpiness")}
          >
            Chirpiness {renderArrow("chirpiness")}
          </button>
        </div>
      </div>

      <div className="my-5">
        <h2 className="text-2xl font-bold">Joined Twitter between</h2>
        <div className="flex flex-wrap gap-2">
          <div>
            <label className="mr-2 cursor-pointer" htmlFor="startDate">
              Start Date
            </label>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(value, _) => setStartDate(new Date(value))}
              dropdownMode="select"
              className="max-w-80 border"
              dateFormat="yyyy/MM/dd"
              showIcon
              showMonthDropdown
              showYearDropdown
            />
          </div>
          <div>
            <label className="mr-2 cursor-pointer" htmlFor="endDate">
              End Date
            </label>
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={(value, _) => setEndDate(new Date(value))}
              dropdownMode="select"
              className="max-w-80 border"
              dateFormat="yyyy/MM/dd"
              showIcon
              showMonthDropdown
              showYearDropdown
            />
          </div>
        </div>
      </div>

      {startDate || endDate || sortBy ? (
        <div className="my-5">
          <button
            onClick={removeFilters}
            className="rounded-full bg-black px-4 py-2 text-white"
          >
            Remove Filters
          </button>
        </div>
      ) : null}

      <div className="my-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {usersToRender.length > 0 ? (
            usersToRender.map((user) => (
              <UserCard
                key={user.uid}
                user={user}
                onRemove={() => removeUser(user.uid)}
              />
            ))
          ) : (
            <p>No records</p>
          )}
        </div>
      </div>
    </Container>
  );
}
