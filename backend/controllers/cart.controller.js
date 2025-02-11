import Cart from "../models/cart.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
       cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // If cart exists, check if the product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // If product exists, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product does not exist, add it to the cart
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Get cart by user ID
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Update item quantity in cart
export const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Update the quantity of the item
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item to remove
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear all items from the cart
    cart.items = [];
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};