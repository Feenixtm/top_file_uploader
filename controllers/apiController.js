import { prisma } from "../lib/prisma.js";

export const deleteFile = async (req, res, next) => {
    try {
        const cuid = req.params.cuid;

        await prisma.file.delete({
            where: {
                id: cuid
            }
        });

        res.redirect("/");
    } catch (error) {
        next(error);
    }
}

export const createFolder = async (req, res, next) => {
    try {
        const folderName = req.body.folderName;
        const rootFolderCUID = req.body.rootFolderCUID;
        const userId = Number(req.body.userId);

        const currentPath = req.body.currentPath;

        // console.log(folderName);
        // console.log(rootFolderCUID);
        // console.log(userId);

        const newSubFolder = await prisma.folder.create({
            data: {
                name: folderName,
                parentId: rootFolderCUID,
                userId: userId
            }
        });

        console.log(newSubFolder);

        res.redirect(currentPath);
    } catch (error) {
        next(error);
    }
}

export const createSubFolder = async (req, res, next) => {
    try {
        const folderName = req.body.folderName;
        const rootFolderId = req.body.rootFolderId;

        const subFolder = await prisma.folder.create({
            data: {
                name: folderName,
                parentId: rootFolderId
            }
        });

        if (!subFolder) {
            console.log("Unable to create subfolder...");
        }

        res.redirect("/");
    } catch (error) {
        next(error);
    }
}