import Analytics from "../models/analytics.model.js";

// Get all analytics data
export const getAllAnalytics = async (req, res) => {
  try {
    const analyticsData = await Analytics.find();

    if (!analyticsData.length) {
      return res.status(404).json({ message: "No analytics data found" });
    }

    res.status(200).json({
      success: true,
      data: analyticsData,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get analytics by product ID
export const getProductAnalytics = async (req, res) => {
  const { productId } = req.params;

  try {
    const productAnalytics = await Analytics.findOne({ productId });

    if (!productAnalytics) {
      return res.status(404).json({ message: "No analytics found for this product" });
    }

    res.status(200).json({
      success: true,
      data: productAnalytics,
    });
  } catch (error) {
    console.error("Error fetching product analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a view to a product (example)
export const addProductView = async (req, res) => {
  const { productId } = req.body;

  try {
    let analyticsData = await Analytics.findOne({ productId });

    if (!analyticsData) {
      // If no analytics data exists for this product, create it
      analyticsData = new Analytics({
        productId,
        views: 1,
      });
    } else {
      // Otherwise, increment the views
      analyticsData.views += 1;
    }

    await analyticsData.save();

    res.status(200).json({
      success: true,
      message: "Product view added successfully",
      data: analyticsData,
    });
  } catch (error) {
    console.error("Error adding product view:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Example: Get analytics for all products in a specific date range
export const getAnalyticsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const analyticsData = await Analytics.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    if (!analyticsData.length) {
      return res.status(404).json({ message: "No analytics data found for this period" });
    }

    res.status(200).json({
      success: true,
      data: analyticsData,
    });
  } catch (error) {
    console.error("Error fetching analytics by date range:", error);
    res.status(500).json({ message: "Server error" });
  }
};
