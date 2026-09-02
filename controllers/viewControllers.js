import { prisma } from "../lib/prisma.js";

export const getIndex = async (req, res, next) => {
    try {

        if (req.user) {
            // V.2 - Get folder, show contents
            const folder = await prisma.folder.findUnique({
                where: {
                    name: "My Documents",
                    userId: req.user.id
                },
                include: {
                    files: true,
                    children: true
                }
            });

            console.log(folder);

            res.render("index", { user: req.user, folder: folder, currentPath: req.originalUrl });
        } else {
            res.render("index", { user: req.user });
        }
    } catch (error) {
        next(error);
    }
}

export const getLogin = (req, res) => {
    res.render("login");
}

export const getSignUp = (req, res) => {
    res.render("sign-up");
}

export const getFile = async (req, res, next) => {
    try {
        const folderName = req.params.folderName;
        const fileId = req.params.fileId;

        console.log(folderName);

        const file = await prisma.file.findUnique({
            where: {
                id: fileId
            }
        })

        res.render("viewFileDetails", { file: file });
    } catch (error) {
        next(error);
    }   
}

// -------------------------------------------------

export const getFolder = async (req, res, next) => {
    try {
        const folderName = req.params.folderName;

        const subFolder = await prisma.folder.findFirst({
            where: {
                name: folderName
            },
            include: {
                parent: true,
                children: true,
                files: true
            }
        });

        console.log("Sub Folder: ");
        console.log(subFolder);

        // -----------------------------------------
        // Check if Parent folder also has a parent.

        

        // -----------------------------------------

        res.render("index", { user: req.user, parentFolder: subFolder.parent, folder: subFolder, currentPath: req.originalUrl });
    } catch (error) {
        next(error);
    }
}