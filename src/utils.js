export function sortAndFilterUsers(users, options = {}) {
  let result = users;
  const msInDay = 24 * 60 * 60 * 1000 - 1;
  // Filter
  if (options.startDate) {
    result = result.filter((user) => user.join_date >= options.startDate);
  }
  if (options.endDate) {
    result = result.filter(
      (user) => user.join_date <= options.endDate.getTime() + msInDay,
    );
  }

  // Sort
  if (options.sortBy) {
    const [sortBy, reverse] = options.sortBy.split(" ");
    switch (sortBy) {
      case "total":
        result.sort((a, b) => a.twubric.total - b.twubric.total);
        break;
      case "friends":
        result.sort((a, b) => a.twubric.friends - b.twubric.friends);
        break;
      case "influence":
        result.sort((a, b) => a.twubric.influence - b.twubric.influence);
        break;
      case "chirpiness":
        result.sort((a, b) => a.twubric.chirpiness - b.twubric.chirpiness);
        break;
    }
    if (reverse) {
      result.reverse();
    }
  }

  return result;
}

export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
  });
}
