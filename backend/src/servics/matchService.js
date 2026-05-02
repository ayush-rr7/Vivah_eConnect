import Profile from "../models/Profile.js";
import PartnerPreference from "../models/PartnerPreference.js";
import { calculateCompatibility } from "../utils/compatibility.js";

export const getMatches = async (profileId) => {
  // ---------------- GET USER PREFERENCE ----------------
  const prefDoc = await PartnerPreference.findOne({ profileId });
  

  if (!prefDoc) {
    throw new Error("Partner preferences not found");
  }

  const pref = prefDoc;

  // ---------------- BASE QUERY ----------------
  const query = {
    _id: { $ne: profileId },
  };

  // ---------------- HARD FILTERS (DB LEVEL) ----------------
  // if (pref.religion) query.religion = pref.religion;
  // if (pref.caste) query.caste = pref.caste;

  // ---------------- FETCH PROFILES ----------------
  const profiles = await Profile.find(query)
    .select("Name Age Location Height_Ft Height_In Education Income Martial_Status Relegion Caste Images")
    .limit(50); // keep limit for performance
 
  // ---------------- CALCULATE COMPATIBILITY ----------------
  const results = profiles
  .map((p) => {

    const mappedProfile = {
      age: Number(p.Age),
      height: `${p.Height_Ft || 0}'${p.Height_In || 0}"`,
      religion: p.Relegion,
      caste: p.Caste,
      education: p.Education,
      location: p.Location,
      income: Number(p.Income),
      image:p.Images,
      maritalStatus: p.Martial_Status,
    };
    

    const compatibility = calculateCompatibility(pref, mappedProfile);

    return {
      _id: p._id,
      name: p.Name,
      age: p.Age,
      location: p.Location,
      income:p.Income,
       images: p.Images,
      compatibility,
    };
  })
  .filter((p) => p.compatibility > 0);
  // ---------------- SORT ----------------
  results.sort((a, b) => b.compatibility - a.compatibility);

  // ---------------- GROUPING ----------------
  const perfect = [];
  const strong = [];
  const explore = [];

  for (const p of results) {
    // console.log(compatibility);
    if (p.compatibility >= 90) {
      if (perfect.length < 5) {
        perfect.push(p);
      }
    } else if (p.compatibility >= 70) {
      if (strong.length < 20) {
        strong.push(p);
      }
    } else {
      explore.push(p);
    }
  }

  // ---------------- FINAL RESPONSE ----------------
  return {
    perfect,
    strong,
    explore,
  };
};