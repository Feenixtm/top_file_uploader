export const deleteFile = async (req, res, next) => {
    try {
        const cuid = req.params.cuid;
        console.log(cuid);
        console.log("Deleting...");
    } catch (error) {
        next(error);
    }
}