const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role']
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;
        if (password) user.password = password; // Hook will hash it

        await user.save();
        res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
         res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
