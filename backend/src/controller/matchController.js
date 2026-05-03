import { getMatches } from "../servics/matchService.js";

 const fetchMatches = async (req, res) => {
  try {
    
    const { profileId } = req.params;
// console.log(profileId);
    const data = await getMatches(profileId);

    res.json(data);
    console.log(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching matches" });
  }
};


export default {fetchMatches};