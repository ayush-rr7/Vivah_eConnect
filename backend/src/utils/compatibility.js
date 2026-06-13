// ---------------- HEIGHT PARSER ----------------
const parseHeightToInches = (val) => {
  if (!val) return null;

  const match = val.match(/(\d+)'(\d+)/);
  if (!match) return null;

  const feet = parseInt(match[1]);
  const inches = parseInt(match[2]);

  return feet * 12 + inches;
};

// ---------------- EDUCATION LEVELS ----------------
const educationLevels = {
  "10th": 1,
  "12th": 2,

  "BA": 3,
  "BSc": 3,
  "BCom": 3,

  "BTech": 4.5,
  "BE": 4.5,
  "MBBS": 4.5,
  "LLB": 4.5,
  "MBA": 4.5,

  "MTech": 5,
  "MD": 5,
  "LLM": 5,

  "PhD": 5.5,
};

// ---------------- FEATURE SIMILARITY ----------------
const getSimilarity = (diff, maxDiff) => {
  return Math.max(0, 1 - diff / maxDiff);
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

    let similarity = 0;

    if (
      (!userPref.ageMin || profile.age >= userPref.ageMin) &&
      (!userPref.ageMax || profile.age <= userPref.ageMax)
    ) {
      similarity = 1;
    } else {
      const target =
        userPref.ageMin || userPref.ageMax;

      const diff = Math.abs(profile.age - target);

      similarity = getSimilarity(diff, 10);
    }

    score += similarity * weights.age;
  }

  // ---------------- HEIGHT ----------------
  if (userPref.heightMin || userPref.heightMax) {
    total += weights.height;

    const minH = parseHeightToInches(userPref.heightMin);
    const maxH = parseHeightToInches(userPref.heightMax);
    const profileH = parseHeightToInches(profile.height);

    let similarity = 0;

    if (profileH) {
      if (
        (!minH || profileH >= minH) &&
        (!maxH || profileH <= maxH)
      ) {
        similarity = 1;
      } else {
        const target = minH || maxH;
        const diff = Math.abs(profileH - target);

        similarity = getSimilarity(diff, 10);
      }
    }

    score += similarity * weights.height;
  }

  // ---------------- LOCATION ----------------
  if (userPref.location) {
    total += weights.location;

    let similarity = 0;

    if (userPref.location === "Any") {
      similarity = 1;
    } else if (
      userPref.location.toLowerCase() ===
      profile.location?.toLowerCase()
    ) {
      similarity = 1;
    } else {
      similarity = 0.4;
    }

    score += similarity * weights.location;
  }

  // ---------------- EDUCATION ----------------
  if (userPref.education?.length > 0) {
    total += weights.education;

    let bestSimilarity = 0;

    for (const prefEdu of userPref.education) {
      const prefLevel = educationLevels[prefEdu] || 0;
      const profileLevel =
        educationLevels[profile.education] || 0;

      if (prefEdu === profile.education) {
        bestSimilarity = 1;
        break;
      }

      const diff = Math.abs(
        prefLevel - profileLevel
      );

      const similarity = getSimilarity(diff, 5);

      bestSimilarity = Math.max(
        bestSimilarity,
        similarity
      );
    }

    score += bestSimilarity * weights.education;
  }

  // ---------------- RELIGION ----------------
  if (userPref.religion) {
    if (userPref.religion !== profile.religion) {
      return 0;
    }

    total += weights.religion;
    score += weights.religion;
  }

  // ---------------- CASTE ----------------
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

    if (
      userPref.maritalStatus ===
      profile.maritalStatus
    ) {
      score += weights.maritalStatus;
    } else {
      score += weights.maritalStatus * 0.3;
    }
  }

  // ---------------- INCOME ----------------
  if (userPref.incomeMin || userPref.incomeMax) {
    total += weights.income;

    let similarity = 0;

    if (
      (!userPref.incomeMin ||
        profile.income >= userPref.incomeMin) &&
      (!userPref.incomeMax ||
        profile.income <= userPref.incomeMax)
    ) {
      similarity = 1;
    } else {
      const target =
        userPref.incomeMin || userPref.incomeMax;

      const diff = Math.abs(
        profile.income - target
      );

      similarity = getSimilarity(diff, 1000000);
    }

    score += similarity * weights.income;
  }

  // ---------------- FINAL PERCENT ----------------
  const percentage =
    total === 0
      ? 0
      : Math.round((score / total) * 100);

  return percentage;
};



















// // ---------------- HEIGHT PARSER ----------------
// const parseHeightToInches = (val) => {
//   if (!val) return null;

//   const match = val.match(/(\d+)'(\d+)/);
//   if (!match) return null;

//   const feet = parseInt(match[1]);
//   const inches = parseInt(match[2]);

//   return feet * 12 + inches;
// };

// //feature similarity scoring (0->1)
// //

// // ---------------- MAIN FUNCTION ----------------
// export const calculateCompatibility = (userPref, profile) => {
//   let score = 0;
//   let total = 0;

//   const weights = {
//     age: 15,
//     height: 10,
//     location: 15,
//     education: 15,
//     religion: 20,
//     caste: 10,
//     maritalStatus: 10,
//     income: 5,
//   };

//   // ---------------- AGE ----------------
//   if (userPref.ageMin || userPref.ageMax) {
//     total += weights.age;

//     if (
//       (!userPref.ageMin || profile.age >= userPref.ageMin) &&
//       (!userPref.ageMax || profile.age <= userPref.ageMax)
//     ) {
//       score += weights.age;
//     }
//   }

//   // ---------------- HEIGHT ----------------
//   if (userPref.heightMin || userPref.heightMax) {
//     total += weights.height;

//     const minH = parseHeightToInches(userPref.heightMin);
//     const maxH = parseHeightToInches(userPref.heightMax);
//     const profileH = parseHeightToInches(profile.height);

//     if (
//       profileH &&
//       (!minH || profileH >= minH) &&
//       (!maxH || profileH <= maxH)
//     ) {
//       score += weights.height;
//     }
//   }

//   // ---------------- LOCATION ----------------
//   if (userPref.location) {
//     total += weights.location;

//     if (
//       userPref.location === "Any" ||
//       userPref.location === profile.location
//     ) {
//       score += weights.location;
//     }
//   }

//   // ---------------- EDUCATION ----------------
//   if (userPref.education && userPref.education.length > 0) {
//     total += weights.education;

//     if (userPref.education.includes(profile.education)) {
//       score += weights.education;
//     }
//   }

//   // ---------------- RELIGION (HARD FILTER) ----------------
//   if (userPref.religion) {
//     if (userPref.religion !== profile.religion) {
//       return 0; // reject completely
//     }
//     total += weights.religion;
//     score += weights.religion;
//   }

//   // ---------------- CASTE (HARD FILTER) ----------------
//   if (userPref.caste) {
//     if (userPref.caste !== profile.caste) {
//       return 0;
//     }
//     total += weights.caste;
//     score += weights.caste;
//   }

//   // ---------------- MARITAL STATUS ----------------
//   if (userPref.maritalStatus) {
//     total += weights.maritalStatus;

//     if (userPref.maritalStatus === profile.maritalStatus) {
//       score += weights.maritalStatus;
//     }
//   }

//   // ---------------- INCOME ----------------
//   if (userPref.incomeMin || userPref.incomeMax) {
//     total += weights.income;

//     if (
//       (!userPref.incomeMin || profile.income >= userPref.incomeMin) &&
//       (!userPref.incomeMax || profile.income <= userPref.incomeMax)
//     ) {
//       score += weights.income;
      
//     }
//   }

//   // ---------------- FINAL PERCENT ----------------
//   const percentage =
//     total === 0 ? 0 : Math.round((score / total) * 100);
//   //  console.log(score);
//   return percentage;
// };