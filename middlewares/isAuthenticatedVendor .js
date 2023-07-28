const isAuthenticatedVendor = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401));
    }

    const decoded = jwt.verify(token, "WFFWf15115U842UGUBWF81EE858UYBY51BGBJ5E51Q");
    req.vendor = await Vendor.findById(decoded.id);

    if (!req.vendor) {
        return next(new ErrorHandler('Vendor not found.', 404));
    }

    next();
});
