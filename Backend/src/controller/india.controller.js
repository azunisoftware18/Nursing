import axios from "axios";

export const getIndiaStatesCities = async (req, res) => {
  try {
    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      { country: "India" }
    );

    res.json({
      success: true,
      data: response.data.data.states,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch states & cities",
    });
  }
};

export const getCitiesByState = async (req, res) => {
  try {
    const { state } = req.query;

    if (!state) {
      return res.status(400).json({
        success: false,
        message: "State is required",
      });
    }

    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        country: "India",
        state,
      }
    );

    res.json({
      success: true,
      data: response.data.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cities",
    });
  }
};
