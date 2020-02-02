module.exports = (res, refreshToken) => {
    res.cookie('jid', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // send only on https
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }); 
};