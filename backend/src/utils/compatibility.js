// ---------------- HEIGHT PARSER ----------------
const parseHeightToInches = (val) => {
  if (!val) return null;

  const match = val.match(/(\d+)'(\d+)/);
  if (!match) return null;

  const feet = parseInt(match[1]);
  const inches = parseInt(match[2]);

  return feet * 12 + inches;
};

// ---------------- MAIN FUNCTION ----------------
export const calculateCompatibility = (userPref, profile) => {
  let score = 0;
  let total = 0;

  const weights = {
    age: 15,
    height: 10,
    location: 15,
    education: 15,
    religion: 20,
    caste: 10,
    maritalStatus: 10,
    income: 5,
  };

  // ---------------- AGE ----------------
  if (userPref.ageMin || userPref.ageMax) {
    total += weights.age;

    if (
      (!userPref.ageMin || profile.age >= userPref.ageMin) &&
      (!userPref.ageMax || profile.age <= userPref.ageMax)
    ) {
      score += weights.age;
    }
  }

  // ---------------- HEIGHT ----------------
  if (userPref.heightMin || userPref.heightMax) {
    total += weights.height;

    const minH = parseHeightToInches(userPref.heightMin);
    const maxH = parseHeightToInches(userPref.heightMax);
    const profileH = parseHeightToInches(profile.height);

    if (
      profileH &&
      (!minH || profileH >= minH) &&
      (!maxH || profileH <= maxH)
    ) {
      score += weights.height;
    }
  }

  // ---------------- LOCATION ----------------
  if (userPref.location) {
    total += weights.location;

    if (
      userPref.location === "Any" ||
      userPref.location === profile.location
    ) {
      score += weights.location;
    }
  }

  // ---------------- EDUCATION ----------------
  if (userPref.education && userPref.education.length > 0) {
    total += weights.education;

    if (userPref.education.includes(profile.education)) {
      score += weights.education;
    }
  }

  // ---------------- RELIGION (HARD FILTER) ----------------
  if (userPref.religion) {
    if (userPref.religion !== profile.religion) {
      return 0; // reject completely
    }
    total += weights.religion;
    score += weights.religion;
  }

  // ---------------- CASTE (HARD FILTER) ----------------
  if (userPref.caste) {
    if (userPref.caste !== profile.caste) {
      return 0;
    }
    total += weights.caste;
    score += weights.caste;
  }

  // ---------------- MARITAL STATUS ----------------
  if (userPref.maritalStatus) {
    total += weights.maritalStatus;

    if (userPref.maritalStatus === profile.maritalStatus) {
      score += weights.maritalStatus;
    }
  }

  // ---------------- INCOME ----------------
  if (userPref.incomeMin || userPref.incomeMax) {
    total += weights.income;

    if (
      (!userPref.incomeMin || profile.income >= userPref.incomeMin) &&
      (!userPref.incomeMax || profile.income <= userPref.incomeMax)
    ) {
      score += weights.income;
      // score=100;
    }
  }

  // ---------------- FINAL PERCENT ----------------
  const percentage =
    total === 0 ? 0 : Math.round((score / total) * 100);
   console.log(score);
  return percentage;
};