import fs from "fs";

//upload file using base64
export const fileUpload = async (file: string) => {
	if (file?.includes(";base64,")) {
		let base64Image = file?.split(";base64,");
		let extension = base64Image[0].split("/").pop();
		const fileName = `${+new Date()}.${extension}`;

		if (!fs.existsSync(process.env.ASSETS_STORAGE || '')) fs.mkdirSync(process.env.ASSETS_STORAGE || '');
		fs.writeFileSync(`${process.env.ASSETS_STORAGE}/${fileName}`, base64Image[1], { encoding: "base64" });

		return fileName;
	} else {
		return file;
	}
};


