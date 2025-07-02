
// Get all users - Admin only
export const getAllUsers = async (req, res) => {
  try {

    // Database operations ....
    const users = [
      {
        id: 1,
        email: 'admin@example.com',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User'
      },
      {
        id: 2,
        email: 'user@example.com',
        role: 'user',
        firstName: 'User',
        lastName: 'User'
      }
    ]

    res.status(200).json({
      message: 'Users fetched successfully',
      users
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.user;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Database operations ....
    const user = {
      id: id,
      email: `user${id}@example.com`,
      firstName: `User${id}`,
      lastName: 'Test',
      role: req.user.role || 'user',
    }

    res.status(200).json({
      message: 'Profile fetched successfully',
      user
    });
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.user;
  
  // Remove sensitive fields that shouldn't be updated through this endpoint
  const { password, email, role, active, ...safeUpdateData } = req.body;

  try {

    // Database operations ....
    // update the user with the new data (safeUpdateData)
    const updatedUser = {
      id: id,
      email: `user${id}@example.com`,
      firstName: `User${id}`,
      lastName: 'Test',
      role: req.user.role || 'user',
    }


    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Failed to update profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

