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

            res.render("index", { user: req.user, folder: folder });
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

export const getSubFolder = async (req, res, next) => {
    try {
        const rootFolderCUID = req.params.rootFolderCUID;
        const subFolderCUID = req.params.subFolderCUID;

        console.log("Root folder CUID: ", rootFolderCUID);
        console.log("Sub folder CUID: ", subFolderCUID);

        const subFolder = await prisma.folder.findUnique({
            where: {
                id: subFolderCUID
            },
            include: {
                parent: true,
                children: true
            }
        })

        res.render("index", { user: req.user, folder: subFolder });
    } catch (error) {
        next(error);
    }
}