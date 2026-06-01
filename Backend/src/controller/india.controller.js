import { State, City } from "country-state-city";

export const getIndiaStatesCities = async (req, res) => {
  try {
    const states = State.getStatesOfCountry("IN");

    res.json({
      success: true,
      data: states,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch states",
    });
  }
};

export const getCitiesByState = async (req, res) => {
  try {
    const { stateCode } = req.params;


    const cities = City.getCitiesOfState("IN", stateCode.toUpperCase());

    res.json({
      success: true,
      data: cities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cities",
    });
  }
};
