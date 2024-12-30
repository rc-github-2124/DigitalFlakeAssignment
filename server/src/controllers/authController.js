const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const aws = require('aws-sdk');
const User = require('../models/User');

// AWS SES setup
const ses = new aws.SES({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// User registration
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already exists' });

        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.RESET_TOKEN_EXPIRY });
        const resetLink = `${process.env.FRONTEND_RESET_LINK}?token=${resetToken}`;

        const params = {
            Source: 'your_verified_email@example.com',
            Destination: { ToAddresses: [email] },
            Message: {
                Subject: { Data: 'Password Reset' },
                Body: { Text: { Data: `Reset your password using this link: ${resetLink}` } },
            },
        };

        await ses.sendEmail(params).promise();
        res.json({ message: 'Reset link sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email' });
    }
};

// Blacklist logic (optional) - implement only if you maintain a token blacklist
const tokenBlacklist = new Set();

exports.logout = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token
    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    // Optionally, add token to the blacklist
    tokenBlacklist.add(token);

    res.status(200).json({ message: 'Logout successful' });
};
