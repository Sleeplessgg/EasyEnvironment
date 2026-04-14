const START_DATE = new Date("2026-03-02");
const WEEKS_PER_SET = 6;
const SET_COUNT = 4;

function getCurrentSetIndex() {
  const now = new Date();

  const diffMs = now - START_DATE;
  const weeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));

  const setIndex = Math.floor(weeks / WEEKS_PER_SET) % SET_COUNT;

  return setIndex;
}


// index 0 = SPRING, 1 = SUMMER, 2 = AUTUMN, 3 = WINTER
module.exports = {
  getCurrentSetIndex
};