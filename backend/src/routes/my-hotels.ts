import express ,{Request, Response}from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import { verify } from "crypto";
import verifyToken from "../middleware/auth";
import { body, validationResult } from "express-validator";


const router = express.Router();
const storgae = multer.memoryStorage();
const upload = multer({
    storage: storgae,
    limits:{
        fileSize: 5*1024*1024

    }
})


router.post("/", verifyToken, upload.array("imageFiles", 6), async (req: Request, res: Response): Promise<void> => {
try{
    console.log("=== HOTEL CREATION REQUEST ===");
    console.log("Raw request body:", req.body);
    console.log("Request headers:", req.headers);
    console.log("Files received:", req.files);
    console.log("User ID from token:", req.userId);
    console.log("User ID type:", typeof req.userId);
    
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: any = req.body;
    
    // Log all form fields
    console.log("All form fields:");
    Object.keys(req.body).forEach(key => {
        console.log(`${key}:`, req.body[key]);
    });
    
    // Validate required fields manually
    const requiredFields = ['name', 'city', 'country', 'description', 'type', 'pricePerNight', 'starRating', 'adultCount', 'childCount'];
    const missingFields = requiredFields.filter(field => !newHotel[field]);
    
    console.log("Required fields check:");
    requiredFields.forEach(field => {
        console.log(`${field}:`, newHotel[field] ? "✓ Present" : "✗ Missing");
    });
    
    if (missingFields.length > 0) {
        console.log("Missing fields:", missingFields);
        res.status(400).json({ 
            message: "Missing required fields", 
            missingFields 
        });
        return;
    }
    
         // Parse facilities from FormData
     let facilities: string[] = [];
     
     // Check if facilities is sent as a JSON string
     if (req.body.facilities) {
         try {
             // If it's already an array, use it directly
             if (Array.isArray(req.body.facilities)) {
                 facilities = req.body.facilities;
             } else {
                 // If it's a JSON string, parse it
                 facilities = JSON.parse(req.body.facilities);
             }
         } catch (error) {
             console.log("Error parsing facilities:", error);
         }
     }
     
     // Fallback: check for individual facilities fields
     if (facilities.length === 0) {
         Object.keys(req.body).forEach(key => {
             if (key.startsWith('facilities[')) {
                 facilities.push(req.body[key]);
             }
         });
     }
     
     console.log("Facilities found:", facilities);
     
     if (facilities.length === 0) {
         console.log("No facilities found in request");
         res.status(400).json({ 
             message: "At least one facility is required" 
         });
         return;
     }
    
    newHotel.facilities = facilities;
    
    // Ensure numeric fields are numbers
    newHotel.pricePerNight = Number(newHotel.pricePerNight);
    newHotel.starRating = Number(newHotel.starRating);
    newHotel.adultCount = Number(newHotel.adultCount);
    newHotel.childCount = Number(newHotel.childCount);
    
    console.log("Processed hotel data:", newHotel);
    console.log("Image files count:", imageFiles ? imageFiles.length : 0);

    let imageUrls: string[] = [];
    
    if (imageFiles && imageFiles.length > 0) {
        try {
            const uploadPromises = imageFiles.map(async(image)=>{
                const b64 = Buffer.from(image.buffer).toString("base64");
                let dataURI= "data:" + image.mimetype + ";base64," + b64;
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            });
            imageUrls = await Promise.all(uploadPromises);
        } catch (cloudinaryError) {
            console.log("Cloudinary upload error:", cloudinaryError);
            // Continue without images if Cloudinary fails
            imageUrls = [];
        }
    }
                 newHotel.imageUrls = imageUrls;
         newHotel.lastUpdated = new Date();
         
         // Ensure userId is set
         if (!req.userId) {
             console.log("ERROR: userId is undefined!");
             res.status(401).json({ 
                 message: "User not authenticated" 
             });
             return;
         }
         
         newHotel.userId = req.userId;
         
         console.log("Final hotel data to save:", newHotel);
        
        const hotel = new Hotel(newHotel);
        await hotel.save();
        console.log("Hotel saved successfully:", hotel._id);
        res.status(201).send(hotel);



}
catch(e){
    console.log("Error creating Hotels:",e);
    res.status(500).json({
        message:
            "Something Went Wrong" });
}
});

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
      const hotels = await Hotel.find({ userId: req.userId });
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Error fetching hotels" });
    }
  });
export default router;
